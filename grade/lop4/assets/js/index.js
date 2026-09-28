/* Demo catalogue and cross-unit review for Grade 4. */
(() => {
  'use strict';
  const units = Object.values(window.DanhGrade4Units || {});
  const storage = (() => {
    try { return window.localStorage; }
    catch { return { getItem: () => null, setItem: () => { throw Error('Storage blocked'); } }; }
  })();
  const store = window.DanhGrade4Progress.createStore(storage);
  const all = units.flatMap(unit => unit.words.map(word => ({ ...word, unit, key: `${unit.id}:${word.id}` })));
  const byKey = new Map(all.map(word => [word.key, word]));
  const el = id => document.getElementById(id);
  const normal = value => String(value).trim().toLowerCase().replace(/\s+/g, ' ');
  let queue = [], position = 0, mistakes = 0, timer = null;
  function speak(value) {
    try {
      if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') return;
      window.speechSynthesis.cancel();
      const voice = new SpeechSynthesisUtterance(value); voice.lang = 'en-GB'; voice.rate = .7;
      window.speechSynthesis.speak(voice);
    } catch { /* Audio is optional. */ }
  }
  function button(label, action, className = '') {
    const item = document.createElement('button'); item.type = 'button'; item.textContent = label; item.className = className;
    item.addEventListener('click', action); return item;
  }
  function update() {
    const due = store.due(all.map(word => word.key));
    el('review-count').textContent = due.length ? `${due.length} từ cần ôn hôm nay` : 'Chưa có từ cần ôn. Hãy luyện Unit 1 hoặc Unit 2 trước nhé.';
    el('review-start').disabled = due.length === 0;
    for (const unit of units) {
      const sum = store.summary(unit.words.map(word => `${unit.id}:${word.id}`));
      el(`${unit.id}-status`).textContent = `Đã luyện ${sum.practised}/${unit.words.length} từ · Cần ôn ${sum.due}`;
    }
  }
  function next() { clearTimeout(timer); timer = null; position++; mistakes = 0; renderReview(); }
  function renderReview() {
    clearTimeout(timer); timer = null;
    const stage = el('review-stage'); stage.replaceChildren();
    if (position >= queue.length) {
      const result = document.createElement('p'); result.className = 'g4-result'; result.textContent = 'Đã xong lượt ôn! Những từ chưa chắc sẽ tiếp tục xuất hiện trong mục này.';
      stage.append(result, button('Ôn lượt mới', start, 'g4-primary')); update(); return;
    }
    const word = byKey.get(queue[position]);
    const heading = document.createElement('p'); heading.className = 'g4-question-count';
    heading.textContent = `Từ ${position + 1}/${queue.length} · ${word.unit.title}`;
    const art = document.createElement('span'); art.className = 'g4-visual g4-question-art'; art.innerHTML = word.visual;
    art.setAttribute('role', 'img'); art.setAttribute('aria-label', word.meaning);
    const meaning = document.createElement('p'); meaning.className = 'g4-context-prompt'; meaning.textContent = word.meaning;
    const answerLine = document.createElement('div'); answerLine.className = 'g4-answer-line';
    const input = document.createElement('input'); input.type = 'text'; input.autocomplete = 'off'; input.placeholder = 'Gõ từ tiếng Anh'; input.setAttribute('aria-label', 'Gõ từ tiếng Anh cần ôn');
    const feedback = document.createElement('p'); feedback.className = 'g4-feedback'; feedback.setAttribute('role', 'status');
    const nextButton = button('Từ tiếp theo →', next, 'g4-primary'); nextButton.hidden = true;
    const check = button('Kiểm tra', () => {
      if (input.disabled) return;
      if (!normal(input.value)) { feedback.textContent = 'Hãy gõ từ trước nhé.'; input.focus(); return; }
      if (normal(input.value) === normal(word.name)) {
        store.review(word.key, mistakes === 0);
        feedback.textContent = mistakes ? '✅ Em đã sửa đúng. Từ này sẽ được ôn lại.' : '✅ Chính xác! Hẹn gặp lại từ này vào lần ôn sau.';
        input.disabled = check.disabled = true; reveal.hidden = true; nextButton.hidden = false;
        clearTimeout(timer); timer = null; speak(word.name); update();
      } else {
        mistakes++; store.review(word.key, false); feedback.textContent = 'Chưa đúng, em thử lại nhé.';
        input.focus(); update();
      }
    }, 'g4-primary');
    input.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.isComposing) check.click(); });
    const revealAt = Date.now() + 10000;
    const reveal = button('💡 Hiện đáp án', () => {
      if (Date.now() < revealAt || input.disabled || normal(input.value) === normal(word.name)) return;
      store.review(word.key, false); input.value = word.name; input.disabled = check.disabled = true;
      reveal.hidden = true; nextButton.hidden = false;
      feedback.textContent = `💡 Đáp án: ${word.name}. Từ này sẽ được ôn lại.`;
      speak(word.name); update();
    }, 'g4-reveal');
    reveal.hidden = true;
    const syncReveal = () => {
      reveal.hidden = input.disabled || document.hidden || Date.now() < revealAt || normal(input.value) === normal(word.name);
    };
    input.addEventListener('input', syncReveal);
    timer = setTimeout(syncReveal, 10000);
    answerLine.append(input, check);
    stage.append(heading, art, meaning, button('🔊 Nghe', () => speak(word.name), 'g4-sound'), answerLine, reveal, feedback, nextButton);
    input.focus({ preventScroll: true });
  }
  function start() {
    queue = store.due(all.map(word => word.key)); position = 0; mistakes = 0;
    el('review-stage').hidden = false; renderReview();
  }
  el('review-start').addEventListener('click', start);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { clearTimeout(timer); timer = null; }
    else if (!el('review-stage').hidden && position < queue.length) renderReview();
  });
  update();
})();
