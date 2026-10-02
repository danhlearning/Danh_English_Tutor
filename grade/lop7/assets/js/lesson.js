(() => {
  'use strict';
  const id = document.body.dataset.unit;
  const unit = window.DanhGrade7Units.find(item => item.id === id);
  if (!unit) return;
  const $ = selector => document.querySelector(selector);
  document.title = `Unit ${unit.number} · ${unit.title} · Tiếng Anh lớp 7`;
  $('#unit-number').textContent = `UNIT ${String(unit.number).padStart(2, '0')} · GLOBAL SUCCESS`;
  $('#unit-title').textContent = unit.title;
  $('#unit-meaning').textContent = unit.vietnamese;
  $('#unit-icon').textContent = unit.icon;
  document.documentElement.style.setProperty('--unit-color', unit.color);
  const key = `danh-g7-${id}`;
  let learned = [];
  try {
    const saved = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(saved)) learned = saved.filter(value => Number.isInteger(value) && value >= 1 && value <= unit.words.length);
  } catch { /* Trang vẫn dùng được khi trình duyệt chặn lưu trữ. */ }
  const mastered = new Set(learned);
  const updateProgress = () => { $('#unit-progress').textContent = `Đã trả lời đúng ${mastered.size}/${unit.words.length} từ`; };
  const mark = word => {
    mastered.add(word.id); updateProgress();
    try { localStorage.setItem(key, JSON.stringify([...mastered])); } catch { /* Không lưu được trên thiết bị này. */ }
  };
  const speak = term => {
    const status = $('#speech-note');
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
    if (word.image) {
      const image = document.createElement('img');
      image.className = className; image.src = word.image;
      image.alt = `Minh họa: ${word.meaning}`;
      image.width = 768; image.height = 768; image.loading = 'lazy';
      return image;
    }
    const icon = document.createElement('span');
    icon.className = className; icon.textContent = word.icon;
    icon.setAttribute('aria-hidden', 'true'); return icon;
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
  for (const tab of tabs) tab.addEventListener('click', () => showTab(tab.dataset.tab));
  showTab('vocabulary');
  updateProgress();

  let cardIndex = 0, flipped = false;
  const flash = $('#flashcard');
  function renderCard() {
    const word = unit.words[cardIndex];
    flash.replaceChildren();
    const position = document.createElement('p'); position.className = 'g6-card-position'; position.textContent = `THẺ ${cardIndex + 1}/${unit.words.length}`;
    const main = document.createElement('strong'); main.textContent = flipped ? word.meaning : word.term;
    const prompt = document.createElement('span'); prompt.textContent = flipped ? word.example : 'Chạm để xem nghĩa';
    flash.append(position);
    if (flipped) flash.append(illustration(word, 'g6-flash-icon'));
    flash.append(main, prompt);
    flash.setAttribute('aria-label', flipped ? `Nghĩa: ${word.meaning}. Chạm để xem từ tiếng Anh.` : `${word.term}. Chạm để xem nghĩa.`);
  }
  flash.addEventListener('click', () => { flipped = !flipped; renderCard(); });
  $('#flash-prev').addEventListener('click', () => { cardIndex = (cardIndex - 1 + unit.words.length) % unit.words.length; flipped = false; renderCard(); });
  $('#flash-next').addEventListener('click', () => { cardIndex = (cardIndex + 1) % unit.words.length; flipped = false; renderCard(); });
  $('#flash-sound').addEventListener('click', () => speak(unit.words[cardIndex].term));
  renderCard();

  const randomOrder = () => [...unit.words.keys()].sort(() => Math.random() - 0.5);
  let quizOrder = randomOrder(), quizPosition = 0, quizScore = 0;
  const quizStage = $('#quiz-stage');
  function renderQuiz() {
    quizStage.replaceChildren();
    if (quizPosition >= quizOrder.length) {
      const heading = document.createElement('h3'); heading.textContent = `Hoàn thành: ${quizScore}/${unit.words.length} câu đúng ngay lần đầu`;
      const info = document.createElement('p'); info.textContent = 'Em có thể chơi lại để luyện những từ chưa chắc.';
      quizStage.append(heading, info, button('Luyện lại', () => { quizOrder = randomOrder(); quizPosition = 0; quizScore = 0; renderQuiz(); }, 'g6-primary'));
      return;
    }
    const word = unit.words[quizOrder[quizPosition]];
    const choices = [word, ...unit.words.filter(item => item !== word).sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5);
    const position = document.createElement('p'); position.className = 'g6-card-position'; position.textContent = `CÂU ${quizPosition + 1}/${unit.words.length}`;
    const question = document.createElement('h3'); question.textContent = `“${word.term}” nghĩa là gì?`;
    const choicesBox = document.createElement('div'); choicesBox.className = 'g6-choices';
    const feedback = document.createElement('p'); feedback.className = 'g6-feedback'; feedback.setAttribute('role', 'status');
    let attempts = 0, solved = false;
    const next = button('Câu tiếp theo →', () => { quizPosition++; renderQuiz(); }, 'g6-primary'); next.hidden = true;
    for (const choice of choices) {
      const option = button(choice.meaning, () => {
        if (solved || option.disabled) return;
        if (choice === word) {
          solved = true; option.classList.add('correct');
          choicesBox.querySelectorAll('button').forEach(item => { item.disabled = true; });
          if (attempts === 0) { quizScore++; mark(word); }
          feedback.textContent = attempts === 0 ? 'Chính xác! 🌟' : 'Đúng rồi. Em hãy nhớ lại từ này nhé.';
          next.hidden = false;
        } else { attempts++; option.disabled = true; option.classList.add('wrong'); feedback.textContent = 'Chưa đúng, em chọn lại nhé.'; }
      }, 'g6-choice');
      choicesBox.append(option);
    }
    quizStage.append(position, question, choicesBox, feedback, next);
  }
  renderQuiz();

  let spellingOrder = randomOrder(), spellingPosition = 0, spellingScore = 0;
  const spellingStage = $('#spelling-stage');
  function renderSpelling() {
    spellingStage.replaceChildren();
    if (spellingPosition >= spellingOrder.length) {
      const heading = document.createElement('h3'); heading.textContent = `Hoàn thành: ${spellingScore}/${unit.words.length} từ đúng ngay lần đầu`;
      spellingStage.append(heading, button('Luyện lại', () => { spellingOrder = randomOrder(); spellingPosition = 0; spellingScore = 0; renderSpelling(); }, 'g6-primary'));
      return;
    }
    const word = unit.words[spellingOrder[spellingPosition]];
    const position = document.createElement('p'); position.className = 'g6-card-position'; position.textContent = `TỪ ${spellingPosition + 1}/${unit.words.length}`;
    const question = document.createElement('h3'); question.textContent = `Gõ tiếng Anh cho: ${word.meaning}`;
    const form = document.createElement('form'); form.className = 'g6-answer';
    const input = document.createElement('input'); input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false; input.setAttribute('aria-label', `Gõ tiếng Anh cho ${word.meaning}`);
    const submit = document.createElement('button'); submit.type = 'submit'; submit.className = 'g6-primary'; submit.textContent = 'Kiểm tra';
    const feedback = document.createElement('p'); feedback.className = 'g6-feedback'; feedback.setAttribute('role', 'status');
    const next = button('Từ tiếp theo →', () => { spellingPosition++; renderSpelling(); }, 'g6-primary'); next.hidden = true;
    const reveal = button('Hiện đáp án', () => {
      feedback.textContent = `Đáp án: ${word.term}. Em hãy đọc và ghi nhớ từ này.`;
      input.disabled = true; submit.disabled = true; reveal.hidden = true; next.hidden = false;
    }, 'g6-secondary'); reveal.hidden = true;
    let attempts = 0;
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!input.value.trim()) { feedback.textContent = 'Em hãy gõ một từ trước nhé.'; input.focus(); return; }
      const answer = input.value.trim().toLocaleLowerCase('en').replace(/\s+/g, ' ');
      if (answer === word.term.toLocaleLowerCase('en')) {
        if (attempts === 0) { spellingScore++; mark(word); }
        feedback.textContent = 'Đúng rồi! 🌟'; input.disabled = true; submit.disabled = true; reveal.hidden = true; next.hidden = false; speak(word.term);
      } else { attempts++; feedback.textContent = 'Chưa đúng, em thử lại nhé.'; reveal.hidden = attempts < 2; input.focus(); input.select(); }
    });
    form.append(input, submit);
    spellingStage.append(position, question, form, reveal, feedback, next);
  }
  renderSpelling();
})();
