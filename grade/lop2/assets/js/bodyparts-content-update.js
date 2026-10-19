/* Keep the original spelling evidence when changing the taught word for bụng. */
(() => {
  'use strict';
  window.DanhBodyPartsContentUpdate = storage => {
    const key = 'danh.learning.bodyparts.v1';
    const marker = 'danh.bodyparts.stomach-word.v1';
    const archive = 'danh.learning.bodyparts.before-stomach.v1';
    try {
      if (storage.getItem(marker)) return false;
      const raw = storage.getItem(key), saved = JSON.parse(raw || 'null');
      if (saved?.version === 1 && saved.rounds?.spelling?.deck?.includes('tummy')) {
        if (!storage.getItem(archive)) storage.setItem(archive, raw);
        delete saved.rounds.spelling;
        if (saved.cards && Array.isArray(saved.cards.seen)) saved.cards.seen = saved.cards.seen.filter(id => id !== 'tummy');
        storage.setItem(key, JSON.stringify(saved));
        storage.setItem(marker, '1');
        return true;
      }
      storage.setItem(marker, '1');
    } catch { /* Existing progress stays intact when storage cannot be written. */ }
    return false;
  };
})();
