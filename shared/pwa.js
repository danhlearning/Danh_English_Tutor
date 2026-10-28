/* Retire this site's old offline worker; never install an offline package. */
(function () {
  'use strict';
  if (window.DanhPWA) return;
  const root = new URL('../', document.currentScript.src);
  async function retire() {
    if (!('serviceWorker' in navigator)) return null;
    const registration = await navigator.serviceWorker.getRegistration(root.href);
    if (!registration || registration.scope !== root.href) return null;
    const worker = registration.active || registration.waiting || registration.installing;
    if (!worker || new URL(worker.scriptURL).href !== new URL('sw.js', root).href) return null;
    // Updating reaches the small retirement worker, which claims already-open
    // pages without reloading a game. Failure must not prevent unregistering.
    try { await registration.update(); } catch {}
    await registration.unregister();
    if ('caches' in window) {
      const prefix = 'danh-offline:' + encodeURIComponent(root.pathname) + ':';
      const names = await caches.keys();
      await Promise.all(names.filter(name => name.startsWith(prefix)).map(name => caches.delete(name)));
    }
    return null;
  }
  const ready = retire().catch(() => null);
  window.DanhPWA = {root: root.href, supported: false, retired: true, ready};
})();
