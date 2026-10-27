(function () {
  'use strict';
  if (window.DanhPWA) return;
  const root = new URL('../', document.currentScript.src);
  function link(rel, href) {
    if (document.querySelector(`link[rel="${rel}"]`)) return;
    const node = document.createElement('link'); node.rel = rel; node.href = new URL(href, root).href; document.head.append(node);
  }
  link('manifest', 'manifest.webmanifest');
  link('apple-touch-icon', 'assets/icons/app-180.png');
  for (const [name, content] of Object.entries({'theme-color':'#fffaf0','apple-mobile-web-app-capable':'yes','apple-mobile-web-app-title':'Học cùng Danh'})) {
    if (document.querySelector(`meta[name="${name}"]`)) continue;
    const node = document.createElement('meta'); node.name = name; node.content = content; document.head.append(node);
  }
  const supported = window.isSecureContext && 'serviceWorker' in navigator;
  // Waiting updates are applied only from the offline page, never during a game.
  const ready = supported ? navigator.serviceWorker.register(new URL('sw.js', root).href, {scope: root.pathname, updateViaCache: 'none'}) : Promise.resolve(null);
  ready.catch(() => {});
  window.DanhPWA = {root: root.href, supported, ready};
})();
