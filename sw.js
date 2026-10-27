/* Offline packages are explicit, versioned, verified and independent of learner data. */
'use strict';
importScripts('./offline-catalog.js');
const catalog = self.DANH_OFFLINE_CATALOG;
const base = new URL('./', self.location.href);
const prefix = 'danh-offline:' + encodeURIComponent(base.pathname) + ':';
// Content-addressed files are shared by releases: a 515 MB update must not require
// another 515 MB merely to copy unchanged audio and illustrations.
const packageCache = prefix + 'files';
const stateCache = prefix + 'state';
const shellCache = prefix + 'shell:' + catalog.version;
const absolute = file => new URL(file, base).href;
const fileKey = file => absolute('__danh_offline_files__/' + file.hash);
const entries = new Map(catalog.files.map((file, index) => [absolute(file.url), {...file, index}]));
const digest = async buffer => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', buffer)), b => b.toString(16).padStart(2, '0')).join('');
const controllers = new Set();
let paused = false;
const shell = [
  'index.html', 'offline.html', 'manifest.webmanifest', 'avatar.jpg',
  'assets/css/pages/index.css', 'assets/images/home/skills-pencil-v1.webp', 'assets/images/home/grades-pencil-v1.webp',
  'assets/icons/app-180.png', 'assets/icons/app-192.png', 'assets/icons/app-512.png',
  'assets/fonts/nunito/latin.woff2', 'assets/fonts/nunito/latin-ext.woff2', 'assets/fonts/nunito/vietnamese.woff2',
  'shared/pwa.js', 'shared/offline.js', 'shared/offline.css', 'shared/contact-footer.js',
  'shared/learner-profile-core.js', 'shared/learner-profile.js', 'shared/learner-profile.css',
  'shared/learner-controls.js', 'shared/site-preload.js', 'shared/learner-font.css', 'shared/exercise-gaps.js'
];

async function verifiedResponse(response, file) {
  if (!response.ok || response.status !== 200 || response.type === 'opaque' || response.redirected) throw Error('FILE_UNAVAILABLE');
  let data = await response.arrayBuffer();
  // Git/hosts may convert Windows CRLF to LF. Hash and store one canonical UTF-8 representation.
  if (file.text) data = new TextEncoder().encode(new TextDecoder('utf-8', {ignoreBOM:true}).decode(data).replace(/\r\n/g, '\n')).buffer;
  if (data.byteLength !== file.bytes || await digest(data) !== file.hash) throw Error('FILE_CHANGED');
  const headers = new Headers(response.headers);
  headers.delete('content-encoding'); headers.delete('transfer-encoding');
  headers.set('content-length', String(data.byteLength)); headers.set('x-danh-sha256', file.hash);
  return new Response(data, {status: 200, headers});
}
async function fetchFile(file) {
  const controller = new AbortController();
  controllers.add(controller);
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    return await verifiedResponse(await fetch(absolute(file.url), {cache: 'no-store', credentials: 'same-origin', redirect: 'error', signal: controller.signal}), file);
  } finally { clearTimeout(timer); controllers.delete(controller); }
}
self.addEventListener('install', event => {
  // No skipWaiting: an update must never replace a running game underneath it.
  event.waitUntil((async () => {
    const cache = await caches.open(shellCache);
    for (const url of shell) {
      const file = entries.get(absolute(url));
      if (!file) throw Error('Missing shell file: ' + url);
      await cache.put(absolute(url), await fetchFile(file));
    }
  })());
});
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

async function status() {
  const cache = await caches.open(packageCache);
  const urls = new Set((await cache.keys()).map(request => request.url));
  const saved = catalog.files.flatMap((file, index) => urls.has(fileKey(file)) ? [index] : []);
  return {version: catalog.version, files: catalog.files.length, bytes: catalog.bytes, saved,
    savedBytes: saved.reduce((sum, index) => sum + catalog.files[index].bytes, 0)};
}
let busy = false;
async function batch(indexes, verify) {
  if (busy) throw Error('BUSY');
  busy = true;
  paused = false;
  try {
    if (!Array.isArray(indexes) || indexes.length > 6 || indexes.some(i => !Number.isInteger(i) || !catalog.files[i])) throw Error('INVALID_BATCH');
    const cache = await caches.open(packageCache);
    const oldNames = (await caches.keys()).filter(name => name.startsWith(prefix) && name !== packageCache && name !== stateCache);
    const result = {saved: [], failed: []};
    let cursor = 0;
    const run = async () => {
      while (cursor < indexes.length && !paused) {
        const index = indexes[cursor++], file = catalog.files[index], url = absolute(file.url), key = fileKey(file);
        try {
          let response = await cache.match(key);
          if (response) {
            try {
              if (verify) await verifiedResponse(response.clone(), file);
              else if (response.headers.get('x-danh-sha256') !== file.hash) throw Error('FILE_CHANGED');
              result.saved.push(index); continue;
            } catch { await cache.delete(key); }
          }
          if (verify) { result.failed.push({index, code: 'FILE_MISSING'}); continue; }
          response = null;
          // Reuse only a file whose content digest matches this release.
          for (const name of oldNames) {
            const candidate = await (await caches.open(name)).match(url);
            if (candidate?.headers.get('x-danh-sha256') === file.hash) {
              try { response = await verifiedResponse(candidate, file); break; } catch { /* Retry a damaged old copy from the server. */ }
            }
          }
          await cache.put(key, response || await fetchFile(file));
          result.saved.push(index);
        } catch (error) {
          result.failed.push({index, code: error.name === 'QuotaExceededError' ? 'STORAGE_FULL' : error.message === 'FILE_CHANGED' ? 'FILE_CHANGED' : 'NETWORK'});
        }
      }
    };
    await Promise.all([run(), run()]);
    return result;
  } finally { busy = false; }
}
async function cleanup() {
  const current = await status();
  if (current.saved.length !== current.files) throw Error('INCOMPLETE');
  const cache = await caches.open(packageCache), keep = new Set(catalog.files.map(fileKey));
  for (const request of await cache.keys()) if (!keep.has(request.url)) await cache.delete(request);
  const state = await caches.open(stateCache), stateKey = absolute('__danh_offline_state__');
  const previous = await state.match(stateKey);
  let completed = [];
  try { completed = (await previous?.json())?.completed || []; } catch { /* Rebuild disposable download metadata. */ }
  for (const version of completed) if (version !== catalog.version) await caches.delete(prefix + 'shell:' + version);
  for (const name of await caches.keys()) {
    if (name.startsWith(prefix) && !name.startsWith(prefix + 'shell:') && name !== packageCache && name !== stateCache) {
      await caches.delete(name);
      await caches.delete(prefix + 'shell:' + name.slice(prefix.length));
    }
  }
  await state.put(stateKey, new Response(JSON.stringify({completed:[catalog.version]}), {headers:{'Content-Type':'application/json'}}));
}
self.addEventListener('message', event => {
  const port = event.ports[0];
  if (!port || !event.source?.url?.startsWith(base.href)) return;
  event.waitUntil((async () => {
    try {
      let data;
      switch (event.data?.type) {
        case 'STATUS': data = await status(); break;
        case 'BATCH': data = await batch(event.data.indexes, !!event.data.verify); break;
        case 'CLEANUP': await cleanup(); data = {}; break;
        case 'PAUSE': paused = true; for (const controller of controllers) controller.abort(); data = {}; break;
        case 'ACTIVATE': await self.skipWaiting(); data = {}; break;
        default: throw Error('UNKNOWN_COMMAND');
      }
      port.postMessage({ok: true, data});
    } catch (error) { port.postMessage({ok: false, error: error.message}); }
  })());
});

async function rangeResponse(response, range) {
  // Safari requests byte ranges even for short local WAV files.
  const data = await response.arrayBuffer(), size = data.byteLength;
  const match = /^bytes=(\d*)-(\d*)$/.exec(range);
  let start, end;
  if (match && (match[1] || match[2])) {
    start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
    end = match[1] && match[2] ? Math.min(size - 1, Number(match[2])) : size - 1;
  }
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= size || start > end) {
    return new Response(null, {status: 416, headers: {'Content-Range': `bytes */${size}`}});
  }
  const headers = new Headers(response.headers);
  headers.set('Accept-Ranges', 'bytes'); headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  return new Response(data.slice(start, end + 1), {status: 206, headers});
}
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  url.search = ''; url.hash = '';
  if (url.pathname.endsWith('/')) url.pathname += 'index.html';
  if (!entries.has(url.href) && request.mode !== 'navigate') return;
  event.respondWith((async () => {
    const file = entries.get(url.href);
    const response = (file && await (await caches.open(packageCache)).match(fileKey(file))) || await (await caches.open(shellCache)).match(url.href);
    if (response) return request.headers.has('range') ? rangeResponse(response, request.headers.get('range')) : response;
    try { return await fetch(request); }
    catch {
      if (request.mode === 'navigate') {
        return Response.redirect(absolute('offline.html'), 302);
      }
      return Response.error();
    }
  })());
});
