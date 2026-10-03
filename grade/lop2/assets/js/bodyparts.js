/* Body Parts keeps its approved content and sentence practice; Games 1–3 use DanhLesson. */
(() => {
  'use strict';
  const lesson = window.bodyPartsLesson;
  const words = lesson.vocabulary;
  const byId = new Map(words.map(word => [word.id, word]));
  const normalize = window.Lop2Lesson.normalizeSentence;
  const shuffle = window.Lop2Lesson.shuffle;
  const grid = document.getElementById('vocab-grid-container');
  let selected = words.map(word => word.id);
  let activeTab = 'vocab';
  let round = null;
  let timer = null;
  let token = 0;
  let audioContext = null;
  let finishSpeech = null;

  function stop() {
    token++;
    clearTimeout(timer);
    timer = null;
    if (finishSpeech) finishSpeech();
    try { window.speechSynthesis?.cancel(); } catch { /* Optional audio. */ }
  }
  function speak(text) {
    if (finishSpeech) finishSpeech();
    try { window.speechSynthesis?.cancel(); } catch { /* Optional audio. */ }
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') return Promise.resolve();
    return new Promise(resolve => {
      let done = false;
      const fallback = setTimeout(finish, 8000);
      function finish() {
        if (done) return;
        done = true;
        clearTimeout(fallback);
        if (finishSpeech === finish) finishSpeech = null;
        resolve();
      }
      finishSpeech = finish;
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lesson.speechLocale;
        utterance.rate = 0.6;
        const voices = window.speechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.lang.replace('_', '-').toLowerCase() === lesson.speechLocale.toLowerCase()) || null;
        utterance.onend = finish;
        utterance.onerror = finish;
        window.speechSynthesis.speak(utterance);
      } catch { finish(); }
    });
  }
  function sound(kind) {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      if (!audioContext) audioContext = new Audio();
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      const now = audioContext.currentTime;
      oscillator.type = kind === 'correct' ? 'triangle' : 'sawtooth';
      oscillator.frequency.setValueAtTime(kind === 'correct' ? 660 : 180, now);
      gain.gain.setValueAtTime(0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      oscillator.start(now);
      oscillator.stop(now + 0.3);
    } catch { /* Optional sound effect. */ }
  }
  function renderVocab() {
    for (const word of words) {
      const card = document.createElement('div');
      card.className = 'vocab-card';
      card.style.background = word.hex;
      const image = document.createElement('div');
      image.className = 'image-badge-wrapper';
      image.innerHTML = word.diagramSvg || word.svg;
      const name = document.createElement('div');
      name.className = 'word-title';
      name.textContent = word.name;
      const ipa = document.createElement('div');
      ipa.className = 'phonetic';
      ipa.textContent = word.ipa;
      const meaning = document.createElement('div');
      meaning.className = 'meaning';
      meaning.textContent = word.meaning;
      const example = document.createElement('div');
      example.className = 'example-box';
      example.textContent = `Ví dụ: “${word.sentence}”`;
      const audio = document.createElement('button');
      audio.type = 'button';
      audio.className = 'audio-btn';
      audio.textContent = '🔊';
      audio.setAttribute('aria-label', `Nghe ${word.name}`);
      audio.addEventListener('click', () => speak(word.name));
      card.append(image, name, ipa, meaning, example, audio);
      grid.append(card);
    }
  }
  function makeRound() {
    const available = lesson.questions.filter(question => question.targetWordIds.every(id => selected.includes(id)));
    round = { deck: shuffle(available), index: 0, firstTry: 0, retry: 0, revealed: 0, mistakes: 0, viewed: false, locked: false, draft: '', result: '' };
  }
  function score() {
    const box = document.getElementById('count-score');
    const completed = round.firstTry + round.retry + round.revealed;
    box.textContent = `🎯 Hoàn thành: ${completed} / ${round.deck.length} · Đúng ngay ${round.firstTry} · Sửa đúng ${round.retry} · Xem đáp án ${round.revealed}`;
  }
  function feedback(message, color = '#BF360C') {
    const box = document.getElementById('count-feedback');
    box.textContent = message;
    box.style.color = color;
  }
  function renderQuestion() {
    if (!round) makeRound();
    const input = document.getElementById('count-sentence-input');
    const check = document.getElementById('count-check');
    const reveal = document.getElementById('count-reveal');
    const next = document.getElementById('count-next');
    const container = document.getElementById('count-items-container');
    const counter = document.getElementById('count-counter-text');
    score();
    input.value = round.draft;
    input.disabled = false;
    input.style.borderColor = '#FFCC80';
    check.disabled = false;
    reveal.disabled = false;
    next.hidden = true;
    feedback('');
    container.replaceChildren();
    if (!round.deck.length) {
      counter.textContent = 'Chưa có câu phù hợp';
      feedback('Hãy chọn thêm từ để có câu luyện viết.');
      input.disabled = check.disabled = reveal.disabled = true;
      return;
    }
    if (round.index >= round.deck.length) {
      if (!round.saved) {
        window.DanhGrade2Progress?.record(lesson.id, { total: round.deck.length, first: round.firstTry, retry: round.retry, revealed: round.revealed });
        round.saved = true;
      }
      counter.textContent = 'Hoàn thành lượt!';
      feedback(`Đúng ngay ${round.firstTry}, sửa đúng ${round.retry}, xem đáp án ${round.revealed}.`, '#2E7D32');
      input.disabled = check.disabled = reveal.disabled = true;
      const again = document.createElement('button');
      again.type = 'button';
      again.className = 'btn-action';
      again.textContent = 'Chơi lại';
      again.addEventListener('click', () => { stop(); makeRound(); renderQuestion(); });
      container.append(again);
      return;
    }
    const item = round.deck[round.index];
    counter.textContent = `Câu ${round.index + 1} / ${round.deck.length}`;
    const image = document.createElement('div');
    image.className = 'count-image';
    image.setAttribute('aria-hidden', 'true');
    image.innerHTML = byId.get(item.imageWordId).svg;
    const question = document.createElement('div');
    question.className = 'count-meaning';
    question.textContent = `“${item.vietnamese}”`;
    const hint = document.createElement('div');
    hint.className = 'count-hint';
    hint.textContent = `💡 Cấu trúc gợi ý: ${item.hint}`;
    container.append(image, question, hint);
    if (round.locked) {
      input.disabled = check.disabled = reveal.disabled = true;
      next.hidden = false;
      feedback(round.result, round.viewed ? '#A15B00' : '#2E7D32');
    } else input.focus({ preventScroll: true });
  }
  function afterCorrect(speechFinished) {
    const currentToken = ++token;
    const wait = new Promise(resolve => { timer = setTimeout(resolve, 1000); });
    Promise.all([wait, speechFinished]).then(() => {
      if (currentToken !== token || activeTab !== 'game-count') return;
      nextCountQuestion();
    });
  }
  function checkCountSentence() {
    if (!round || round.index >= round.deck.length || round.locked) return;
    const item = round.deck[round.index];
    const input = document.getElementById('count-sentence-input');
    const value = normalize(input.value);
    if (!value) { feedback('✏️ Nhập câu tiếng Anh trước nhé.'); input.focus(); return; }
    if (!item.acceptedAnswers.map(normalize).includes(value)) {
      round.mistakes++;
      input.style.borderColor = '#E53935';
      feedback('❌ Chưa đúng. Em thử lại nhé!', '#C62828');
      sound('wrong');
      input.focus();
      return;
    }
    round.locked = true;
    round.draft = input.value;
    input.disabled = true;
    document.getElementById('count-check').disabled = true;
    document.getElementById('count-reveal').disabled = true;
    if (round.viewed) round.revealed++;
    else if (round.mistakes) round.retry++;
    else round.firstTry++;
    score();
    round.result = round.mistakes ? '✅ Em đã sửa đúng!' : '✅ Chính xác!';
    feedback(round.result, '#2E7D32');
    document.getElementById('count-next').hidden = false;
    sound('correct');
    afterCorrect(speak(item.answer));
  }
  function revealCountSentence() {
    if (!round || round.index >= round.deck.length || round.locked) return;
    stop();
    const item = round.deck[round.index];
    round.viewed = true;
    round.locked = true;
    round.revealed++;
    score();
    round.result = `💡 Đáp án: “${item.answer}”`;
    feedback(round.result, '#A15B00');
    document.getElementById('count-sentence-input').disabled = true;
    document.getElementById('count-check').disabled = true;
    document.getElementById('count-reveal').disabled = true;
    document.getElementById('count-next').hidden = false;
    speak(item.answer);
  }
  function nextCountQuestion() {
    if (!round?.locked) return;
    stop();
    round.index++;
    round.mistakes = 0;
    round.viewed = false;
    round.locked = false;
    round.draft = '';
    round.result = '';
    renderQuestion();
  }
  function switchTab(tabId, event) {
    stop();
    activeTab = tabId;
    document.querySelectorAll('.tab-content').forEach(node => node.classList.remove('active'));
    document.querySelectorAll('nav .nav-btn').forEach(node => node.classList.remove('active'));
    document.getElementById(tabId)?.classList.add('active');
    if (event?.currentTarget) event.currentTarget.classList.add('active');
    if (tabId === 'game-count') renderQuestion();
  }
  function migrateSelection() {
    try {
      const storage = (window.DanhLearners?.storage || window.localStorage);
      const currentKey = 'danh.learning.bodyparts.v1';
      const current = JSON.parse(storage.getItem(currentKey) || 'null');
      if (current?.version === 1 && Array.isArray(current.selected) && current.selected.length &&
          new Set(current.selected).size === current.selected.length && current.selected.every(id => byId.has(id))) return;
      const old = JSON.parse(storage.getItem('danh:lop2:bodyparts:selected-words:v1') || 'null');
      const valid = Array.isArray(old) ? [...new Set(old)].filter(id => byId.has(id)) : [];
      if (valid.length >= 4) storage.setItem(currentKey, JSON.stringify({ version: 1, selected: valid }));
    } catch { /* Storage is optional. */ }
  }
  function onSelectionChange(ids, restart = false) {
    if (!restart && selected.length === ids.length && selected.every(id => ids.includes(id))) return;
    stop();
    selected = [...ids];
    makeRound();
    if (activeTab === 'game-count') renderQuestion();
  }
  renderVocab();
  window.speak = speak;
  window.switchTab = switchTab;
  window.checkCountSentence = checkCountSentence;
  window.revealCountSentence = revealCountSentence;
  window.nextCountQuestion = nextCountQuestion;
  document.getElementById('count-sentence-input').addEventListener('input', event => {
    if (round && !round.locked) round.draft = event.target.value;
  });
  document.getElementById('count-sentence-input').addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.repeat && !event.isComposing) {
      event.preventDefault();
      checkCountSentence();
    }
  });
  window.mountBodyParts = () => {
    migrateSelection();
    window.DanhLesson.mount({
      topic: lesson.id,
      words: words.map(word => ({ id: word.id, name: word.name, meaning: word.meaning,
        ipa: word.ipa, color: word.hex, visual: word.svg })),
      speechLocale: lesson.speechLocale,
      onSelectionChange
    });
  };
})();
