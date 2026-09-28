/* Grade 4 demo page: original Unit prompts plus the shared flashcard/game engine. */
(() => {
  'use strict';
  const unit = window.DanhGrade4Units?.[document.body.dataset.unit];
  if (!unit || !window.DanhLesson || !window.DanhGrade4Progress) throw new Error('Thiếu dữ liệu bài học lớp 4.');
  const wordsById = new Map(unit.words.map(word => [word.id, word]));
  const storage = (() => {
    try { return window.localStorage; }
    catch { return { getItem: () => null, setItem: () => { throw Error('Storage blocked'); } }; }
  })();
  const store = window.DanhGrade4Progress.createStore(storage);
  const key = word => `${unit.id}:${word.id}`;
  const el = id => document.getElementById(id);
  let selectedIds = unit.words.map(word => word.id);
  let contextRound = null;
  let contextTimer = null;
  const shuffle = list => [...list].sort(() => Math.random() - .5);
  const normal = value => String(value).trim().toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ');

  function speak(value) {
    try {
      if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
        el('speech-note').textContent = 'Trình duyệt này chưa hỗ trợ đọc tiếng Anh.';
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(value);
      utterance.lang = 'en-GB';
      utterance.rate = .7;
      window.speechSynthesis.speak(utterance);
    } catch { el('speech-note').textContent = 'Không thể phát âm trên thiết bị này.'; }
  }
  function visual(word, className = '') {
    const box = document.createElement('span');
    box.className = `g4-visual ${className}`.trim();
    box.setAttribute('role', 'img');
    box.setAttribute('aria-label', word.meaning);
    box.innerHTML = word.visual;
    return box;
  }
  function button(label, action, className = '') {
    const control = document.createElement('button');
    control.type = 'button'; control.textContent = label; control.className = className;
    control.addEventListener('click', action);
    return control;
  }
  function updateSummary() {
    const ids = unit.words.map(key);
    const sum = store.summary(ids);
    el('unit-progress').textContent = `Đã luyện ${sum.practised}/${ids.length} từ · Cần ôn ${sum.due}`;
    for (const word of unit.words) {
      const row = el(`status-${word.id}`);
      if (!row) continue;
      const skills = store.get(key(word))?.skills || {};
      row.textContent = [
        `${skills.listening ? '✓' : '○'} Nghe`,
        `${skills.spelling ? '✓' : '○'} Gõ`,
        `${skills.context ? '✓' : '○'} Câu`
      ].join('  ·  ');
    }
  }
  function renderVocab() {
    const grid = el('vocab-grid-container');
    grid.replaceChildren();
    for (const word of unit.words) {
      const card = document.createElement('article'); card.className = 'g4-word-card';
      card.append(visual(word));
      const body = document.createElement('div');
      const title = document.createElement('h3'); title.textContent = word.name;
      const meaning = document.createElement('p'); meaning.textContent = word.meaning;
      const ipa = document.createElement('small'); ipa.textContent = word.ipa;
      const status = document.createElement('small'); status.id = `status-${word.id}`; status.className = 'g4-word-status';
      body.append(title, meaning, ipa, status);
      card.append(body, button('🔊 Nghe', () => speak(word.name), 'g4-sound'));
      grid.append(card);
    }
    updateSummary();
  }
  function renderPatterns() {
    const area = el('patterns'); area.replaceChildren();
    for (const pattern of unit.patterns) {
      const card = document.createElement('article'); card.className = 'g4-pattern';
      const note = document.createElement('strong'); note.textContent = pattern.note;
      const question = document.createElement('p'); question.textContent = pattern.question;
      const answer = document.createElement('p'); answer.textContent = pattern.answer;
      card.append(note, question, answer, button('🔊 Nghe mẫu', () => speak(`${pattern.question} ${pattern.answer}`), 'g4-sound'));
      area.append(card);
    }
  }
  function clearContextTimer() { clearTimeout(contextTimer); contextTimer = null; }
  function newContextRound() {
    clearContextTimer();
    contextRound = { deck: shuffle(selectedIds), index: 0, mistakes: 0, solved: false, revealed: false, first: 0, corrected: 0, viewed: 0 };
    renderContext();
  }
  function renderContext() {
    clearContextTimer();
    const stage = el('context-stage'); stage.replaceChildren();
    if (!contextRound) contextRound = { deck: shuffle(selectedIds), index: 0, mistakes: 0, solved: false, revealed: false, first: 0, corrected: 0, viewed: 0 };
    const round = contextRound;
    if (round.index >= round.deck.length) {
      const title = document.createElement('h3'); title.textContent = 'Hoàn thành lượt dùng từ!';
      const detail = document.createElement('p');
      detail.textContent = `Đúng ngay ${round.first} · Sửa đúng ${round.corrected} · Xem đáp án ${round.viewed}`;
      stage.append(title, detail, button('Luyện lại', newContextRound, 'g4-primary'));
      return;
    }
    const word = wordsById.get(round.deck[round.index]);
    const progress = document.createElement('p'); progress.className = 'g4-question-count';
    progress.textContent = `Câu ${round.index + 1}/${round.deck.length}`;
    stage.append(progress, visual(word, 'g4-question-art'));
    const prompt = document.createElement('p'); prompt.className = 'g4-context-prompt';
    const [before, after] = word.context.split('____');
    prompt.append(document.createTextNode(before));
    const blank = document.createElement('strong'); blank.textContent = '_____'; prompt.append(blank, document.createTextNode(after || ''));
    stage.append(prompt);
    const line = document.createElement('div'); line.className = 'g4-answer-line';
    const input = document.createElement('input'); input.type = 'text'; input.autocomplete = 'off'; input.placeholder = 'Gõ từ hoặc cụm từ tiếng Anh';
    input.setAttribute('aria-label', 'Điền từ vào câu');
    const feedback = document.createElement('p'); feedback.className = 'g4-feedback'; feedback.setAttribute('role', 'status');
    const next = button('Câu tiếp theo →', () => { round.index++; round.mistakes = 0; round.solved = round.revealed = false; renderContext(); }, 'g4-primary');
    next.hidden = true;
    const check = button('Kiểm tra', () => {
      if (round.solved) return;
      const attempt = normal(input.value);
      if (!attempt) { feedback.textContent = 'Hãy gõ câu trả lời trước nhé.'; input.focus(); return; }
      if (attempt === normal(word.name)) {
        const firstTry = round.mistakes === 0;
        store.practice(key(word), 'context', { correct: true, firstTry });
        if (firstTry) round.first++; else round.corrected++;
        round.solved = true; clearContextTimer(); reveal.hidden = true;
        input.disabled = check.disabled = true; next.hidden = false;
        feedback.textContent = firstTry ? '✅ Đúng rồi!' : '✅ Em đã sửa đúng!';
        speak(word.name); updateSummary();
      } else {
        round.mistakes++;
        store.practice(key(word), 'context', { correct: false });
        feedback.textContent = 'Chưa đúng. Nhìn tranh và thử lại nhé!';
        input.setAttribute('aria-invalid', 'true'); input.focus(); updateSummary();
      }
    }, 'g4-primary');
    input.addEventListener('input', () => input.removeAttribute('aria-invalid'));
    input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.isComposing) check.click(); });
    const revealAt = Date.now() + 10000;
    const reveal = button('💡 Hiện đáp án', () => {
      if (Date.now() < revealAt || round.solved || normal(input.value) === normal(word.name) ||
          !el('game-context').classList.contains('active')) return;
      round.solved = round.revealed = true; round.viewed++;
      store.practice(key(word), 'context', { correct: false, revealed: true });
      input.value = word.name; input.disabled = check.disabled = true;
      reveal.hidden = true; next.hidden = false;
      feedback.textContent = `💡 Đáp án: ${word.name}. Từ này sẽ xuất hiện trong phần ôn.`;
      speak(word.name); updateSummary();
    }, 'g4-reveal');
    reveal.hidden = true;
    const syncReveal = () => {
      reveal.hidden = round.solved || !el('game-context').classList.contains('active') || document.hidden ||
        Date.now() < revealAt || normal(input.value) === normal(word.name);
    };
    input.addEventListener('input', syncReveal);
    contextTimer = setTimeout(syncReveal, 10000);
    line.append(input, check); stage.append(line, reveal, feedback, next);
  }
  window.switchTab = (tab, event) => {
    clearContextTimer();
    for (const section of document.querySelectorAll('.tab-content')) section.classList.toggle('active', section.id === tab);
    for (const control of document.querySelectorAll('[data-tab]')) {
      const selected = control.dataset.tab === tab;
      control.classList.toggle('active', selected);
      control.setAttribute('aria-pressed', String(selected));
    }
    if (tab === 'game-context') renderContext();
    if (tab === 'vocab') updateSummary();
    if (event?.currentTarget) event.currentTarget.focus({ preventScroll: true });
  };
  for (const control of document.querySelectorAll('[data-tab]')) {
    control.addEventListener('click', event => window.switchTab(control.dataset.tab, event));
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearContextTimer();
    else if (el('game-context').classList.contains('active') && contextRound && !contextRound.solved) renderContext();
  });
  el('unit-number').textContent = `UNIT ${unit.number}`;
  el('unit-title').textContent = unit.title;
  el('unit-subtitle').textContent = unit.subtitle;
  el('unit-focus').textContent = unit.focus;
  renderVocab(); renderPatterns();
  window.DanhLesson.mount({
    topic: `g4${unit.id}`, words: unit.words, speechLocale: 'en-GB',
    mcqMode: 'listen-picture', revealSpellingAfterMs: 10000, initialCardMode: 'picture', cardRevealMs: 2200,
    onSelectionChange(ids, changed) { selectedIds = ids; if (changed) contextRound = null; },
    onResult({ word, game, correct, firstTry, revealed }) {
      store.practice(key(word), game, { correct, firstTry, revealed });
      updateSummary();
    }
  });
})();
