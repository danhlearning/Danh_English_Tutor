/* Page shell for the six data-driven Grade 2 topics. Games 1–3 use learning-core.js. */
(() => {
  'use strict';
  const topic = window.grade2ExtendedTopics?.[document.body.dataset.topic];
  if (!topic) throw new Error('Không tìm thấy dữ liệu chủ đề Lớp 2.');
  const byId = new Map(topic.words.map(word => [word.id, word]));
  const shuffle = items => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
  };
  const normalize = value => String(value).toLowerCase().replace(/[’]/g, "'").replace(/[.,?!]/g, '').replace(/\s+/g, ' ').trim();
  let selected = topic.words.map(word => word.id);
  let selectedReady = false;
  let round = null;
  let activeTab = 'vocab';
  let timer = null;
  let token = 0;
  let finishSpeech = null;
  let audioContext = null;
  const el = id => document.getElementById(id);

  function stop() {
    token++;
    clearTimeout(timer);
    timer = null;
    if (finishSpeech) finishSpeech();
    try { window.speechSynthesis?.cancel(); } catch { /* Audio is optional. */ }
  }
  function speak(value) {
    if (finishSpeech) finishSpeech();
    try { window.speechSynthesis?.cancel(); } catch { /* Audio is optional. */ }
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
        const utterance = new SpeechSynthesisUtterance(value);
        utterance.lang = 'en-GB';
        utterance.rate = .6;
        const voices = window.speechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.lang.replace('_','-').toLowerCase() === 'en-gb') || null;
        utterance.onend = finish;
        utterance.onerror = finish;
        window.speechSynthesis.speak(utterance);
      } catch { finish(); }
    });
  }
  function sound(correct) {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      if (!audioContext) audioContext = new Audio();
      if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.connect(gain); gain.connect(audioContext.destination);
      oscillator.type = correct ? 'triangle' : 'sawtooth';
      const now = audioContext.currentTime;
      oscillator.frequency.setValueAtTime(correct ? 659 : 180, now);
      gain.gain.setValueAtTime(.12, now);
      gain.gain.exponentialRampToValueAtTime(.001, now + .25);
      oscillator.start(now); oscillator.stop(now + .25);
    } catch { /* Sound never blocks learning. */ }
  }
  function newRound() {
    const questions = topic.questions.filter(question => question.targetWordIds.every(id => selected.includes(id)));
    round = { deck: shuffle(questions), index: 0, first: 0, retry: 0, revealed: 0,
      mistakes: 0, locked: false, viewed: false, draft: '', result: '' };
  }
  function sentenceStatus(message, type = '') {
    const box = el('sentence-feedback');
    box.textContent = message;
    box.dataset.kind = type;
  }
  function renderSentence() {
    if (!round) newRound();
    const stage = el('sentence-stage');
    const input = el('sentence-input');
    const check = el('sentence-check');
    const reveal = el('sentence-reveal');
    const next = el('sentence-next');
    stage.replaceChildren();
    input.value = round.draft;
    input.disabled = check.disabled = reveal.disabled = false;
    next.hidden = true;
    sentenceStatus('');
    el('sentence-score').textContent = `Đã học ${round.first + round.retry + round.revealed}/${round.deck.length} · Đúng ngay ${round.first} · Sửa đúng ${round.retry} · Xem đáp án ${round.revealed}`;
    if (!round.deck.length) {
      stage.textContent = 'Bộ từ này chưa có câu phù hợp. Hãy chọn thêm từ trong Game 1–3.';
      input.disabled = check.disabled = reveal.disabled = true;
      return;
    }
    if (round.index >= round.deck.length) {
      stage.textContent = 'Hoàn thành lượt luyện câu!';
      sentenceStatus(`Đúng ngay ${round.first}, sửa đúng ${round.retry}, xem đáp án ${round.revealed}.`, 'correct');
      input.disabled = check.disabled = reveal.disabled = true;
      const again = document.createElement('button');
      again.type = 'button'; again.className = 'g2-practice-button'; again.textContent = 'Chơi lại';
      again.addEventListener('click', () => { stop(); newRound(); renderSentence(); });
      stage.append(again);
      return;
    }
    const question = round.deck[round.index];
    const count = document.createElement('p');
    count.className = 'g2-practice-count';
    count.textContent = `Câu ${round.index + 1} / ${round.deck.length}`;
    const image = document.createElement('div');
    image.className = 'g2-practice-image';
    image.setAttribute('role', 'img');
    image.setAttribute('aria-label', byId.get(question.imageWordId).meaning);
    image.innerHTML = byId.get(question.imageWordId).visual;
    const meaning = document.createElement('p');
    meaning.className = 'g2-practice-meaning';
    meaning.textContent = question.vietnamese;
    const hint = document.createElement('p');
    hint.className = 'g2-practice-hint';
    hint.textContent = `Gợi ý cấu trúc: ${topic.pattern}`;
    stage.append(count, image, meaning, hint);
    if (round.locked) {
      input.disabled = check.disabled = reveal.disabled = true;
      next.hidden = false;
      sentenceStatus(round.result, round.viewed ? 'revealed' : 'correct');
    } else input.focus({ preventScroll: true });
  }
  function nextSentence() {
    if (!round?.locked) return;
    stop();
    round.index++;
    round.mistakes = 0;
    round.locked = false;
    round.viewed = false;
    round.draft = '';
    round.result = '';
    renderSentence();
  }
  function checkSentence() {
    if (!round || round.index >= round.deck.length || round.locked) return;
    const question = round.deck[round.index];
    const input = el('sentence-input');
    const answer = normalize(input.value);
    if (!answer) { sentenceStatus('Nhập câu tiếng Anh trước nhé.'); input.focus(); return; }
    if (!question.acceptedAnswers.some(value => normalize(value) === answer)) {
      round.mistakes++;
      sentenceStatus('Chưa đúng. Em thử lại nhé!', 'wrong');
      input.setAttribute('aria-invalid', 'true');
      sound(false);
      input.focus();
      return;
    }
    round.locked = true;
    round.draft = input.value;
    if (round.mistakes) round.retry++;
    else round.first++;
    round.result = round.mistakes ? 'Em đã sửa đúng!' : 'Chính xác!';
    input.removeAttribute('aria-invalid');
    input.disabled = el('sentence-check').disabled = el('sentence-reveal').disabled = true;
    el('sentence-next').hidden = false;
    sentenceStatus(round.result, 'correct');
    el('sentence-score').textContent = `Đã học ${round.first + round.retry + round.revealed}/${round.deck.length} · Đúng ngay ${round.first} · Sửa đúng ${round.retry} · Xem đáp án ${round.revealed}`;
    sound(true);
    const currentToken = ++token;
    const wait = new Promise(resolve => { timer = setTimeout(resolve, 1000); });
    Promise.all([wait, speak(question.answer)]).then(() => {
      if (currentToken === token && activeTab === 'game-count') nextSentence();
    });
  }
  function revealSentence() {
    if (!round || round.index >= round.deck.length || round.locked) return;
    stop();
    const question = round.deck[round.index];
    round.locked = round.viewed = true;
    round.revealed++;
    round.result = `Đáp án: “${question.answer}”`;
    el('sentence-input').disabled = el('sentence-check').disabled = el('sentence-reveal').disabled = true;
    el('sentence-next').hidden = false;
    sentenceStatus(round.result, 'revealed');
    el('sentence-score').textContent = `Đã học ${round.first + round.retry + round.revealed}/${round.deck.length} · Đúng ngay ${round.first} · Sửa đúng ${round.retry} · Xem đáp án ${round.revealed}`;
    speak(question.answer);
  }
  function switchTab(id, event) {
    stop();
    activeTab = id;
    document.querySelectorAll('.tab-content').forEach(node => node.classList.remove('active'));
    document.querySelectorAll('nav .nav-btn').forEach(node => node.classList.remove('active'));
    el(id)?.classList.add('active');
    if (event?.currentTarget) event.currentTarget.classList.add('active');
    if (id === 'game-count') renderSentence();
  }
  function onSelectionChange(ids, restart = false) {
    if (selectedReady && !restart && selected.length === ids.length && selected.every(id => ids.includes(id))) return;
    selectedReady = true;
    stop();
    selected = [...ids];
    newRound();
    if (activeTab === 'game-count') renderSentence();
  }
  function renderLesson() {
    document.title = `${topic.title} · Tiếng Anh Lớp 2`;
    el('topic-title').textContent = `${topic.icon} ${topic.title.toUpperCase()}`;
    el('topic-description').textContent = topic.description;
    el('vocab-title').textContent = `Từ vựng · ${topic.title}`;
    el('sentences-title').textContent = `Mẫu câu · ${topic.title}`;
    const grid = el('vocab-grid-container');
    for (const word of topic.words) {
      const card = document.createElement('article'); card.className = 'vocab-card g2-vocab-card';
      const image = document.createElement('div'); image.className = 'g2-vocab-image';
      image.setAttribute('role', 'img'); image.setAttribute('aria-label', word.meaning);
      image.innerHTML = word.visual;
      const english = document.createElement('h3'); english.textContent = word.name;
      const ipa = document.createElement('p'); ipa.className = 'g2-ipa'; ipa.textContent = word.ipa;
      const meaning = document.createElement('p'); meaning.textContent = word.meaning;
      const audio = document.createElement('button'); audio.type = 'button'; audio.className = 'g2-audio';
      audio.textContent = '🔊 Nghe'; audio.setAttribute('aria-label', `Nghe từ ${word.name}`);
      audio.addEventListener('click', () => speak(word.name));
      card.append(image, english, ipa, meaning, audio); grid.append(card);
    }
    el('sentence-pattern').textContent = topic.pattern;
    const list = el('sentence-examples');
    for (const question of topic.questions.slice(0, 6)) {
      const card = document.createElement('li'); card.className = 'g2-example';
      const english = document.createElement('strong'); english.textContent = question.answer;
      const vietnamese = document.createElement('span'); vietnamese.textContent = question.vietnamese;
      const audio = document.createElement('button'); audio.type = 'button'; audio.className = 'g2-audio';
      audio.textContent = '🔊'; audio.setAttribute('aria-label', `Nghe câu: ${question.answer}`);
      audio.addEventListener('click', () => speak(question.answer));
      card.append(english, vietnamese, audio); list.append(card);
    }
  }
  window.switchTab = switchTab;
  document.addEventListener('DOMContentLoaded', () => {
    renderLesson();
    el('sentence-input').addEventListener('input', event => {
      if (round && !round.locked) round.draft = event.target.value;
      event.target.removeAttribute('aria-invalid');
      if (el('sentence-feedback').dataset.kind === 'wrong') sentenceStatus('');
    });
    el('sentence-input').addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.repeat && !event.isComposing) { event.preventDefault(); checkSentence(); }
    });
    el('sentence-check').addEventListener('click', checkSentence);
    el('sentence-reveal').addEventListener('click', revealSentence);
    el('sentence-next').addEventListener('click', nextSentence);
    window.DanhLesson.mount({ topic: topic.id, words: topic.words, speechLocale: 'en-GB', onSelectionChange });
  });
})();
