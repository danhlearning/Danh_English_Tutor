(function () {
  'use strict';
  if (window.DanhSitePreload || !/^https?:$/.test(location.protocol)) return;
  const root = new URL('../', document.currentScript.src);
  const connection = navigator.connection;
  const queue = [], pending = new Set(), done = new Set(), active = new Set();
  const MAX_PAGES = 4, MAX_ASSETS = 24, MAX_BYTES = 3 * 1024 * 1024;
  let pages = 0, assets = 0, bytes = 0, started = false, stopped = false;
  const allowed = () => !stopped && !document.hidden && navigator.onLine !== false &&
    !connection?.saveData && !/^(slow-2g|2g|3g)$/.test(connection?.effectiveType || '');

  function localURL(value, base = document.baseURI) {
    try {
      const url = new URL(value, base);
      if (url.origin !== root.origin || !url.pathname.startsWith(root.pathname) || url.username || url.password) return null;
      url.hash = '';
      return url;
    } catch { return null; }
  }
  function enqueue(value, kind, base) {
    const url = localURL(value, base);
    if (!url || !allowed() || bytes >= MAX_BYTES || pending.has(url.href) || done.has(url.href)) return;
    if (kind === 'page') {
      if (!/\.html$/i.test(url.pathname) || url.pathname === location.pathname || pages >= MAX_PAGES) return;
      pages++;
    } else {
      if (!/\.(?:css|js|woff2|webp|png|jpe?g|svg|avif)$/i.test(url.pathname) || assets >= MAX_ASSETS) return;
      if (performance.getEntriesByName(url.href).some(entry => entry.responseEnd > 0)) return;
      assets++;
    }
    pending.add(url.href);
    // A chosen destination goes ahead of speculative images.
    if (kind === 'page') queue.unshift({url, kind});
    else queue.push({url, kind});
    pump();
  }
  function discover(html, pageURL) {
    // Inert template: inspecting a destination must never execute its lessons,
    // start media, load image elements, or create a learner session.
    const template = document.createElement('template');
    template.innerHTML = html;
    const doc = template.content;
    const base = localURL(doc.querySelector('base[href]')?.getAttribute('href') || pageURL, pageURL);
    if (!base) return;
    for (const node of doc.querySelectorAll('link[rel="stylesheet"][href],script[src]')) {
      enqueue(node.getAttribute('href') || node.getAttribute('src'), 'asset', base);
    }
    for (const node of [...doc.querySelectorAll('img[src]:not([loading="lazy"])')].slice(0, 3)) {
      enqueue(node.getAttribute('src'), 'asset', base);
    }
  }
  async function load(item, controller) {
    const timeout = setTimeout(() => controller.abort(), 6000);
    try {
      const response = await fetch(item.url.href, {
        signal: controller.signal, credentials: 'same-origin', priority: 'low',
        // Keep the server's normal freshness/revalidation rules; no forced
        // permanent cache and no service worker holding on to older lessons.
        cache: 'default', redirect: 'error',
        headers: item.kind === 'page' ? {Accept: 'text/html'} : undefined
      });
      if (!response.ok || (item.kind === 'page' && !/text\/html/i.test(response.headers.get('content-type') || ''))) {
        await response.body?.cancel();
        return;
      }
      const limit = Math.min(MAX_BYTES - bytes, item.kind === 'page' ? 512 * 1024 : 1024 * 1024);
      if (Number(response.headers.get('content-length')) > limit) {
        await response.body?.cancel();
        return;
      }
      const reader = response.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder(), text = [];
      let received = 0;
      const isText = item.kind === 'page' || /\.css$/i.test(item.url.pathname);
      while (true) {
        const part = await reader.read();
        if (part.done) break;
        received += part.value.byteLength;
        bytes += part.value.byteLength;
        if (received > limit || bytes > MAX_BYTES || !allowed()) {
          await reader.cancel();
          return;
        }
        if (isText) text.push(decoder.decode(part.value, {stream: true}));
      }
      done.add(item.url.href);
      if (isText) text.push(decoder.decode());
      if (item.kind === 'page') discover(text.join(''), item.url.href);
      else if (isText) {
        for (const match of text.join('').matchAll(/url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g)) {
          enqueue(match[1], 'asset', item.url.href);
        }
      }
    } catch { /* Preloading is optional; a normal navigation can retry. */ }
    finally { clearTimeout(timeout); }
  }
  function pump() {
    if (!started || !allowed() || bytes >= MAX_BYTES) return;
    while (active.size < 2 && queue.length && bytes < MAX_BYTES) {
      const item = queue.shift(), controller = new AbortController();
      active.add(controller);
      load(item, controller).finally(() => {
        pending.delete(item.url.href);
        active.delete(controller);
        pump();
      });
    }
  }
  function intent(event) {
    const link = event.target.closest?.('a[href]');
    if (!link || link.hasAttribute('download') || (link.target && link.target !== '_self') || link.getAttribute('href').startsWith('#')) return;
    enqueue(link.href, 'page');
  }
  function pause() { for (const controller of active) controller.abort(); }
  function begin() {
    if (stopped) return;
    started = true;
    // Warm only two visible choices. More destinations need user intent.
    if (allowed()) {
      let count = 0;
      for (const link of document.querySelectorAll('main a[href]')) {
        const rect = link.getBoundingClientRect();
        const url = localURL(link.href);
        if (rect.width && rect.height && rect.bottom > 0 && rect.top < innerHeight &&
            url && /\.html$/i.test(url.pathname) && url.pathname !== location.pathname) {
          enqueue(url.href, 'page');
          if (++count === 2) break;
        }
      }
    }
    pump();
  }
  const schedule = () => {
    if (window.requestIdleCallback) window.requestIdleCallback(begin, {timeout: 2500});
    else setTimeout(begin, 800);
  };
  document.addEventListener('pointerover', intent, {passive: true});
  document.addEventListener('touchstart', intent, {passive: true});
  document.addEventListener('focusin', intent);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); else pump(); });
  window.addEventListener('offline', pause);
  window.addEventListener('online', begin);
  connection?.addEventListener?.('change', () => { if (!allowed()) pause(); else begin(); });
  window.addEventListener('pagehide', () => { stopped = true; pause(); queue.length = 0; });
  window.addEventListener('pageshow', event => { if (event.persisted) { stopped = false; begin(); } });
  window.DanhSitePreload = {get stats() { return {pages, assets, bytes, completed: done.size, active: active.size}; }};
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, {once: true});
})();
