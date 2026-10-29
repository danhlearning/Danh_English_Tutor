(() => {
  'use strict';
  const id = document.body.dataset.unit;
  const unit = window.DanhGrade12Units.find(item => item.id === id);
  if (!unit) return;
  const $ = selector => document.querySelector(selector);
  document.title = `Unit ${unit.number} · ${unit.title} · Tiếng Anh lớp 12`;
  $('#unit-number').textContent = `UNIT ${String(unit.number).padStart(2, '0')} · GLOBAL SUCCESS`;
  $('#unit-title').textContent = unit.title;
  $('#unit-meaning').textContent = unit.vietnamese;
  $('#unit-icon').textContent = unit.icon;
  document.documentElement.style.setProperty('--unit-color', unit.color);
  const key = `danh-g12-${id}`;
  let learned = [];
  try {
    const saved = JSON.parse(window.DanhLearners.storage.getItem(key) || '[]');
    if (Array.isArray(saved)) learned = saved.filter(value => Number.isInteger(value) && value >= 1 && value <= unit.words.length);
  } catch { /* Trang vẫn dùng được khi trình duyệt chặn lưu trữ. */ }
  const mastered = new Set(learned);
  const updateProgress = () => { const progress = $('#unit-progress'); progress.textContent = mastered.size ? 'Đã luyện tập' : ''; progress.hidden = !progress.textContent; };
  const mark = word => {
    mastered.add(word.id); updateProgress();
    try { window.DanhLearners.storage.setItem(key, JSON.stringify([...mastered])); } catch { /* Không lưu được trên thiết bị này. */ }
  };
  const speak = term => {
    if(window.DanhListenControls?.isManualRequest())return window.DanhAnswerSpeech.listen(term);
    const status = $('#speech-note');
    if (!window.DanhVocabularyGame.soundEnabled()) { status.textContent = 'Âm thanh đang tắt.'; return; }
    window.DanhAnswerSpeech.say(term);
    status.textContent = `Đang đọc: ${term}`;
  };
  const button = (label, callback, className = '') => {
    const element = document.createElement('button'); element.type = 'button'; element.className = className;
    element.textContent = label; element.addEventListener('click', callback); return element;
  };
  const illustration = (word, className) => {
    const frame = document.createElement('span');
    frame.className = className === 'g6-word-icon' ? 'g6-word-visual' : 'g6-flash-visual';
    if (word.image) {
      const image = document.createElement('img');
      image.className = className; image.src = word.image;
      image.alt = `Minh họa: ${word.meaning}`;
      image.width = 768; image.height = 768; image.loading = 'lazy';
      image.addEventListener('error', () => {
        image.remove();
        const fallback = document.createElement('span');
        fallback.className = `${className} g6-symbol-art`;
        fallback.textContent = word.icon; fallback.setAttribute('aria-hidden', 'true');
        frame.append(fallback);
      }, {once:true});
      frame.append(image); return frame;
    }
    const icon = document.createElement('span'); icon.className = `${className} g6-symbol-art`;
    icon.textContent = word.icon; icon.classList.toggle('g6-composite-symbol', word.icon.includes('\u200d'));
    icon.setAttribute('aria-hidden', 'true'); frame.append(icon); return frame;
  };
  const vocab = $('#vocab-grid');
  for (const word of unit.words) {
    const card = document.createElement('article'); card.className = 'g6-word-card';
    const icon = illustration(word, 'g6-word-icon');
    const title = document.createElement('h3'); title.textContent = word.term;
    const meaning = document.createElement('p'); meaning.className = 'g6-meaning'; meaning.textContent = word.meaning;
    const example = document.createElement('p'); example.className = 'g6-example'; example.textContent = word.example;
    card.append(icon, title, meaning, example, button('🔊 Nghe từ', () => speak(word.term), 'g6-sound'));
    vocab.append(card);
  }
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const tabKey = `danh-g12-${id}-tab-v1`;
  function showTab(name) {
    window.DanhAnswerSpeech?.stop();
    try { window.DanhLearners.storage.setItem(tabKey,name); } catch {}

    for (const tab of tabs) {
      const active = tab.dataset.tab === name;
      tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active));
      document.getElementById(tab.dataset.tab).hidden = !active;
    }
  }
  for (const tab of tabs) tab.addEventListener('click', () => { if(tab.getAttribute('aria-selected')==='true')return; showTab(tab.dataset.tab); window.DanhVocabularyGame.feedback('tap',tab); });
  let initialTab='vocabulary';
  try { const saved=window.DanhLearners.storage.getItem(tabKey); if(tabs.some(t=>t.dataset.tab===saved))initialTab=saved; } catch {}
  const requestedTab=new URLSearchParams(location.search).get('activity');
  if(tabs.some(t=>t.dataset.tab===requestedTab))initialTab=requestedTab;
  showTab(initialTab);
  updateProgress();

  const cards = window.DanhVocabularyGame.flashcards({
    card: $('#flashcard'), words: unit.words, previous: $('#flash-prev'), next: $('#flash-next'),
    illustration: word => illustration(word, 'g6-flash-icon')
  });
  $('#flash-sound').addEventListener('click', () => speak(cards.current().term));

  window.DanhVocabularyGame.mount({
    stage: $('#quiz-stage'), words: unit.words.map(word => ({...word,unit:unit.number})),
    grade: 12, scope: id, mark
  });

  window.DanhGrade12Spelling({stage:$('#spelling-stage'),words:unit.words,unitId:id});
})();
