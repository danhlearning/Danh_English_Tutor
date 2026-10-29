/* Migration only. No fetch handler, offline catalog, shell or download queue. */
'use strict';
self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event => event.waitUntil((async () => {
  const root = new URL('./', self.location.href);
  const prefix = 'danh-offline:' + encodeURIComponent(root.pathname) + ':';
  await self.clients.claim();
  for (const name of await caches.keys()) if (name.startsWith(prefix)) await caches.delete(name);
  await self.registration.unregister();
})()));
