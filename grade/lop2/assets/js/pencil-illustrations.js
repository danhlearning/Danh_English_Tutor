/* Shared artwork lookup for supplementary topics; no learning state is changed. */
(() => {
  'use strict';
  const manifest = window.DanhGrade2PencilManifest || {};
  const normalize = value => String(value).trim().toLowerCase();
  function picture(topic, name) {
    const key = normalize(name);
    const file = manifest[topic]?.[key] || (topic === 'dates' ? manifest.dates?.[key.split(/\s+/)[0]] : null);
    if (!file) return null;
    // Native lazy images keep long word grids from downloading every illustration
    // before the learner reaches it. The existing frame and artwork stay intact.
    return `<img class="pencil-art" src="./assets/images/pencil/compact/${file}" srcset="./assets/images/pencil/compact/${file} 480w, ./assets/images/pencil/${file} 768w" sizes="(max-width:480px) 220px, 240px" width="768" height="768" alt="" loading="lazy" decoding="async" draggable="false">`;
  }
  function apply(topic, words) {
    if (!manifest[topic]) return;
    for (const word of words) {
      const art = picture(topic, word.name);
      if (!art) continue;
      word.photo = word.svg = word.visual = word.icon = word.emoji = art;
      if ('diagramSvg' in word) word.diagramSvg = art;
    }
  }
  function questions(topic, items, vocabulary) {
    if (!manifest[topic]) return;
    const longest = [...vocabulary].sort((a,b) => b.name.length-a.name.length);
    for (const item of items) {
      const target = item.target || item.itemSingular || item.fruitName;
      const alias = topic === 'familyfriends' && target === 'friends these' ? 'friend' : null;
      const word = longest.find(w => (alias || target) && normalize(w.name) === normalize(alias || target)) ||
        longest.find(w => new RegExp(`\\b${w.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(`${target || ''} ${item.answer || ''}`)) ||
        (topic === 'verbs' && target === 'what can you do' ? longest.find(w => normalize(w.name) === 'play') : null);
      const art = word ? picture(topic, word.name) : topic === 'numbers' && target ?
        ['schoolsupplies','fruits','transport','toys','householditems'].map(group => picture(group, target)).find(Boolean) : null;
      if (art) { item.svg = item.emoji = item.icon = art; }
    }
  }
  window.DanhPencil = { picture, apply, questions };
  document.addEventListener('DOMContentLoaded', () => {
    if (!location.pathname.endsWith('/dates.html')) return;
    const note = document.createElement('p');
    note.className = 'pencil-date-key';
    note.textContent = 'Lịch tuần: 7 ô từ thứ Hai đến Chủ nhật, ô màu chỉ ngày cần nhớ. Trên lịch tháng, chữ số chỉ số thứ tự của tháng.';
    document.querySelector('header')?.append(note);
  });
})();
