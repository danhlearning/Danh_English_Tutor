/* Animals uses the same game surfaces as the other Grade 2 topics. */
(() => {
  'use strict';
  const from = Number(new URLSearchParams(location.search).get('fromGrade'));
  const grade = from >= 1 && from <= 12 ? from : 2;
  document.body.dataset.grade = grade;
  document.addEventListener('DOMContentLoaded', () => {
    const bank = window.DanhSiteLetters.normalize(animalsList);
    const byName = new Map(animalsList.map(word => [word.name, word]));
    const words = bank.map(word => {
      const original = byName.get(word.name);
      return {...word, color: original.hex, visual: original.emoji};
    });
    const byNumber = new Map(animalsList.map(word => [word.num, words.find(w => w.name === word.name).id]));
    let storage;
    try { storage = window.DanhLearners.storage; } catch { /* The common engine supports unavailable storage. */ }
    const key = 'danh.learning.animals.v1';
    try {
      const raw = storage.getItem(key), saved = JSON.parse(raw || 'null');
      if (saved?.version === 1 && Array.isArray(saved.selected) && saved.selected.some(id => typeof id === 'number')) {
        const id = value => byNumber.get(value) || value;
        const ids = list => Array.isArray(list) ? list.map(id) : list;
        if (!storage.getItem(key + '.before-shared')) storage.setItem(key + '.before-shared', raw);
        saved.selected = ids(saved.selected);
        for (const round of Object.values(saved.rounds || {})) {
          round.deck = ids(round.deck);
          for (const answer of round.answers || []) {
            answer.wrongChoices = ids(answer.wrongChoices);
            if (answer.options) answer.options = ids(answer.options);
          }
        }
        if (saved.cards) {
          saved.cards.deck = ids(saved.cards.deck);
          saved.cards.seen = ids(saved.cards.seen);
        }
        storage.setItem(key, JSON.stringify(saved));
      }
    } catch { /* Keep existing data intact when storage is blocked or malformed. */ }
    try {
      const saved = JSON.parse(storage.getItem(key) || 'null');
      const selected = words.filter(word => !saved?.selected || saved.selected.includes(word.id));
      const oldKey = `danh-g${grade}-letter-ladder-site-animals-${window.DanhSiteLetters.fingerprint(selected)}-v1`;
      const newKey = `danh-g${grade}-letter-ladder-animals-v1`;
      const old = storage.getItem(oldKey);
      if (old && !storage.getItem(newKey)) storage.setItem(newKey, old);
    } catch { /* A fresh round remains available without storage. */ }
    window.DanhLesson.mount({topic: 'animals', words, effects: window.DanhLearningEffects, useAnswerSpeech: true});
  });
})();
