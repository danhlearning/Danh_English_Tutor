/* Preserve the previous lesson before shortening this topic's active word list. */
(() => {
  'use strict';
  window.DanhSchoolSuppliesMigration = (storage, ids) => {
    const key = 'danh.learning.schoolsupplies.v1';
    const archive = 'danh.learning.schoolsupplies.before-short-words.v1';
    const retired = new Set(['eraser', 'pencil case', 'calculator', 'paperclip', 'dictionary', 'highlighter', 'protractor']);
    try {
      const raw = storage.getItem(key), saved = JSON.parse(raw || 'null');
      if (saved?.version !== 1 || !Array.isArray(saved.selected) ||
          !saved.selected.some(id => retired.has(id)) ||
          saved.selected.some(id => !ids.includes(id) && !retired.has(id))) return { changed: false };
      // Write the complete original first; if it cannot be saved, leave it untouched.
      if (!storage.getItem(archive)) storage.setItem(archive, raw);
      const selected = [...new Set(saved.selected.filter(id => ids.includes(id)))];
      const next = { ...saved, selected: selected.length ? selected : [...ids], rounds: {}, cards: null };
      storage.setItem(key, JSON.stringify(next));
      return { changed: true };
    } catch { return { changed: false }; }
  };
})();
