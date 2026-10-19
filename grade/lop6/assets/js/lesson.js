(() => {
  'use strict';
  const id = document.body.dataset.unit;
  const unit = window.DanhGrade6Units.find(item => item.id === id);
  if (!unit) return;
  const $ = selector => document.querySelector(selector);
  document.title = `Unit ${unit.number} · ${unit.title} · Tiếng Anh lớp 6`;
  $('#unit-number').textContent = `UNIT ${String(unit.number).padStart(2, '0')} · GLOBAL SUCCESS`;
  $('#unit-title').textContent = unit.title;
  $('#unit-meaning').textContent = unit.vietnamese;
  $('#unit-icon').textContent = unit.icon;
  document.documentElement.style.setProperty('--unit-color', unit.color);
  const key = `danh-g6-${id}`;
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
    const status = $('#speech-note');
    if (!window.DanhVocabularyGame.soundEnabled()) { status.textContent = 'Âm thanh đang tắt. Bật âm thanh để nghe từ nhé.'; return; }
    if (!('speechSynthesis' in window)) { status.textContent = 'Trình duyệt này chưa hỗ trợ giọng đọc.'; return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(term);
    utterance.lang = 'en-GB'; utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
    status.textContent = `Đang đọc: ${term}`;
  };
  const button = (label, callback, className = '') => {
    const element = document.createElement('button'); element.type = 'button'; element.className = className;
    element.textContent = label; element.addEventListener('click', callback); return element;
  };
  const illustration = (word, className) => {
    const frame = document.createElement('span');
    frame.className = className === 'g6-word-icon' ? 'g6-word-visual' : 'g6-flash-visual';
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
  function showTab(name) {
    for (const tab of tabs) {
      const active = tab.dataset.tab === name;
      tab.classList.toggle('active', active); tab.setAttribute('aria-selected', String(active));
      document.getElementById(tab.dataset.tab).hidden = !active;
    }
  }
  for (const tab of tabs) tab.addEventListener('click', () => { showTab(tab.dataset.tab); window.DanhVocabularyGame.feedback('tap',tab); });
  showTab('vocabulary');
  updateProgress();

  const cards = window.DanhVocabularyGame.flashcards({
    card: $('#flashcard'), words: unit.words, previous: $('#flash-prev'), next: $('#flash-next'),
    illustration: word => illustration(word, 'g6-flash-icon')
  });
  $('#flash-sound').addEventListener('click', () => speak(cards.current().term));

  const randomOrder = () => window.DanhVocabularyGame.shuffle([...unit.words.keys()]);
  window.DanhVocabularyGame.mount({
    stage: $('#quiz-stage'), words: unit.words.map(word => ({...word,unit:unit.number})),
    grade: 6, scope: id, mark
  });

  let spellingOrder = randomOrder(), spellingPosition = 0, spellingScore = 0, spellingStreak = 0;
  const spellingStage = $('#spelling-stage');
  function renderSpelling() {
    spellingStage.replaceChildren();
    if (spellingPosition >= spellingOrder.length) {
      const heading = document.createElement('h3'); heading.textContent = `Hoàn thành: ${spellingScore}/${unit.words.length} câu đúng ngay lần đầu`;
      spellingStage.append(heading, button('Luyện lại', () => { spellingOrder = randomOrder(); spellingPosition = 0; spellingScore = 0; spellingStreak = 0; renderSpelling(); window.DanhVocabularyGame.feedback('start',spellingStage); }, 'g6-primary'));
      return;
    }
    const word = unit.words[spellingOrder[spellingPosition]];
    const position = document.createElement('p'); position.className = 'g6-card-position'; position.textContent = `Câu ${spellingPosition + 1}/${unit.words.length}`;
    const streak = document.createElement('p'); streak.className='vg-streak'; streak.textContent=`🔥 ${spellingStreak} câu đúng liên tiếp`;
    const question = document.createElement('h3'); question.textContent = `Gõ tiếng Anh cho: ${word.meaning}`;
    const form = document.createElement('form'); form.className = 'g6-answer';
    const input = document.createElement('input'); input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false; input.setAttribute('aria-label', `Gõ tiếng Anh cho ${word.meaning}`);
    const submit = document.createElement('button'); submit.type = 'submit'; submit.className = 'g6-primary'; submit.textContent = 'Kiểm tra';
    const feedback = document.createElement('p'); feedback.className = 'g6-feedback'; feedback.setAttribute('role', 'status');
    const next = button('Từ tiếp theo →', () => { if (next.disabled) return; next.disabled = true; spellingPosition++; renderSpelling(); window.DanhVocabularyGame.feedback(spellingPosition >= spellingOrder.length ? 'complete' : 'next',spellingStage); }, 'g6-primary'); next.hidden = true;
    const reveal = button('Hiện đáp án', () => {
      if (solved) return; solved = true; spellingStreak = 0; streak.textContent = '🔥 0 câu đúng liên tiếp';
      window.DanhVocabularyGame.feedback('help',spellingStage);
      feedback.textContent = `Đáp án: ${word.term}. Em hãy đọc và ghi nhớ từ này.`;
      input.disabled = true; submit.disabled = true; reveal.hidden = true; next.hidden = false;
    }, 'g6-secondary'); reveal.hidden = true;
    let attempts = 0, solved = false;
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (solved) return;
      if (!input.value.trim()) { feedback.textContent = 'Em hãy gõ một từ trước nhé.'; input.focus(); return; }
      const answer = input.value.trim().toLocaleLowerCase('en').replace(/\s+/g, ' ');
      if (answer === word.term.toLocaleLowerCase('en')) {
        solved = true;
        if (attempts === 0) { spellingScore++; spellingStreak++; mark(word); } else spellingStreak=0;
        streak.textContent=`🔥 ${spellingStreak} câu đúng liên tiếp`;
        window.DanhVocabularyGame.feedback(attempts ? 'corrected' : window.DanhVocabularyGame.isMilestone(spellingStreak) ? 'streak' : 'good',spellingStage); feedback.textContent = 'Đúng rồi! 🌟'; input.disabled = true; submit.disabled = true; reveal.hidden = true; next.hidden = false; window.DanhVocabularyGame.afterFeedback(() => speak(word.term));
      } else { spellingStreak=0;streak.textContent='🔥 0 câu đúng liên tiếp';window.DanhVocabularyGame.feedback('bad',form); attempts++; feedback.textContent = 'Chưa đúng, em thử lại nhé.'; reveal.hidden = attempts < 2; input.focus(); input.select(); }
    });
    form.append(input, submit);
    spellingStage.append(position, streak, question, form, reveal, feedback, next);
  }
  renderSpelling();
})();
