/* Per-word Grade 4 progress. Storage remains local to this browser. */
(() => {
  'use strict';
  const KEY = 'danh.grade4.words.v1';
  const DAY = 86400000;
  const reviewGaps = [1, 3, 7, 14];
  const modes = ['listening', 'spelling', 'context'];
  function createStore(storage, now = () => Date.now()) {
    let data = { version: 1, words: {} };
    try {
      const saved = JSON.parse(storage.getItem(KEY) || 'null');
      if (saved?.version === 1 && saved.words && typeof saved.words === 'object' && !Array.isArray(saved.words)) data = saved;
    } catch { /* Learning remains usable when storage is blocked. */ }
    function save() {
      try { storage.setItem(KEY, JSON.stringify(data)); return true; }
      catch { return false; }
    }
    function entry(id) {
      if (!data.words[id] || typeof data.words[id] !== 'object') {
        data.words[id] = { skills: {}, reviewStage: 0, dueAt: null, attempts: 0 };
      }
      return data.words[id];
    }
    function practice(id, mode, result) {
      if (!modes.includes(mode) || !result || typeof id !== 'string') return;
      const item = entry(id);
      item.attempts++;
      if (result.correct && result.firstTry && !result.revealed) {
        item.skills[mode] = true;
        if (item.dueAt === null || item.dueAt === undefined) item.dueAt = now() + DAY;
      } else if (!result.correct || result.revealed) {
        item.dueAt = now();
      }
      save();
    }
    function review(id, correct) {
      const item = entry(id);
      if (correct) {
        item.reviewStage = Math.min(4, (Number(item.reviewStage) || 0) + 1);
        item.dueAt = now() + reviewGaps[item.reviewStage - 1] * DAY;
        item.skills.spelling = true;
      } else {
        item.reviewStage = 0;
        item.dueAt = now();
      }
      save();
    }
    function get(id) { return data.words[id] || null; }
    function due(ids) { return ids.filter(id => Number.isFinite(data.words[id]?.dueAt) && data.words[id].dueAt <= now()); }
    function summary(ids) {
      const entries = ids.map(get).filter(Boolean);
      return {
        practised: entries.length,
        due: due(ids).length,
        strong: entries.filter(item => modes.every(mode => item.skills?.[mode]) && item.reviewStage >= 2).length
      };
    }
    return { practice, review, get, due, summary, key: KEY };
  }
  if (typeof window !== 'undefined') window.DanhGrade4Progress = { createStore, KEY, DAY };
  if (typeof module !== 'undefined' && module.exports) module.exports = { createStore, KEY, DAY };
})();
