const defaultSpeechRate = 0.85;

  /* HỆ THỐNG PHÁT ÂM THANH HIỆU ỨNG (Web Audio API) */
  let audioCtx = null;

  function playSoundEffect(type) {
    try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'correct') {
      const now = audioCtx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      osc.frequency.setValueAtTime(1046.50, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'wrong') {
      const now = audioCtx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(130, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
    } catch (error) { /* Bài học vẫn chạy nếu thiết bị không phát được âm thanh. */ }
  }

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* DỮ LIỆU TỪ VỰNG ĐỘNG VẬT (50 CON) */
  const animalsList = [
    { num: 1, name: 'Dog', ipa: '/dɑːɡ/', meaning: 'Con chó', emoji: '<svg class="vocab-photo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="./assets/images/approved/animals/dog-photo-v1.webp" width="120" height="120"/></svg>', hex: '#E53E3E' },
    { num: 2, name: 'Cat', ipa: '/kæt/', meaning: 'Con mèo', emoji: '🐱', hex: '#ED8936' },
    { num: 3, name: 'Mouse', ipa: '/maʊs/', meaning: 'Con chuột', emoji: '🐭', hex: '#ECC94B' },
    { num: 4, name: 'Rabbit', ipa: '/ˈræb.ɪt/', meaning: 'Con thỏ', emoji: '🐰', hex: '#38A169' },
    { num: 5, name: 'Hamster', ipa: '/ˈhæm.stɚ/', meaning: 'Chuột hamster', emoji: '🐹', hex: '#3182CE' },
    { num: 6, name: 'Fox', ipa: '/fɑːks/', meaning: 'Con cáo', emoji: '🦊', hex: '#ED64A6' },
    { num: 7, name: 'Bear', ipa: '/ber/', meaning: 'Con gấu', emoji: '🐻', hex: '#4A90E2' },
    { num: 8, name: 'Panda', ipa: '/ˈpæn.də/', meaning: 'Gấu trúc', emoji: '🐼', hex: '#319795' },
    { num: 9, name: 'Tiger', ipa: '/ˈtaɪ.ɡɚ/', meaning: 'Con hổ', emoji: '🐯', hex: '#DD6B20' },
    { num: 10, name: 'Lion', ipa: '/ˈlaɪ.ən/', meaning: 'Sư tử', emoji: '🦁', hex: '#E53E3E' },
    { num: 11, name: 'Cow', ipa: '/kaʊ/', meaning: 'Bò sữa', emoji: '🐮', hex: '#38A169' },
    { num: 12, name: 'Pig', ipa: '/pɪɡ/', meaning: 'Con lợn / Heo', emoji: '🐷', hex: '#ED64A6' },
    { num: 13, name: 'Frog', ipa: '/frɑːɡ/', meaning: 'Con ếch', emoji: '🐸', hex: '#38A169' },
    { num: 14, name: 'Monkey', ipa: '/ˈmʌŋ.ki/', meaning: 'Con khỉ', emoji: '🐵', hex: '#DD6B20' },
    { num: 15, name: 'Chicken', ipa: '/ˈtʃɪk.ɪn/', meaning: 'Con gà', emoji: '🐔', hex: '#E53E3E' },
    { num: 16, name: 'Duck', ipa: '/dʌk/', meaning: 'Con vịt', emoji: '🦆', hex: '#ECC94B' },
    { num: 17, name: 'Bird', ipa: '/bɝːd/', meaning: 'Con chim', emoji: '🐦', hex: '#4A90E2' },
    { num: 18, name: 'Eagle', ipa: '/ˈiː.ɡəl/', meaning: 'Đại bàng', emoji: '🦅', hex: '#718096' },
    { num: 19, name: 'Owl', ipa: '/aʊl/', meaning: 'Cú mèo', emoji: '🦉', hex: '#805AD5' },
    { num: 20, name: 'Penguin', ipa: '/ˈpeŋ.ɡwɪn/', meaning: 'Chim cánh cụt', emoji: '🐧', hex: '#2B6CB0' },
    { num: 21, name: 'Bat', ipa: '/bæt/', meaning: 'Con dơi', emoji: '🦇', hex: '#4A5568' },
    { num: 22, name: 'Wolf', ipa: '/wʊlf/', meaning: 'Chó sói', emoji: '🐺', hex: '#718096' },
    { num: 23, name: 'Horse', ipa: '/hɔːrs/', meaning: 'Con ngựa', emoji: '🐴', hex: '#DD6B20' },
    { num: 24, name: 'Zebra', ipa: '/ˈziː.brə/', meaning: 'Ngựa vằn', emoji: '🦓', hex: '#4A5568' },
    { num: 25, name: 'Giraffe', ipa: '/dʒɪˈræf/', meaning: 'Hươu cao cổ', emoji: '🦒', hex: '#ECC94B' },
    { num: 26, name: 'Elephant', ipa: '/ˈel.ə.fənt/', meaning: 'Con voi', emoji: '🐘', hex: '#718096' },
    { num: 27, name: 'Rhinoceros', ipa: '/raɪˈnɑː.sɚ.əs/', meaning: 'Tê giác', emoji: '🦏', hex: '#A0AEC0' },
    { num: 28, name: 'Hippopotamus', ipa: '/ˌhɪp.əˈpɑː.t̬ə.məs/', meaning: 'Hà mã', emoji: '🦛', hex: '#718096' },
    { num: 29, name: 'Crocodile', ipa: '/ˈkrɑː.kə.daɪl/', meaning: 'Cá sấu', emoji: '🐊', hex: '#38A169' },
    { num: 30, name: 'Snake', ipa: '/sneɪk/', meaning: 'Con rắn', emoji: '🐍', hex: '#48BB78' },
    { num: 31, name: 'Turtle', ipa: '/ˈtɝː.t̬əl/', meaning: 'Con rùa', emoji: '🐢', hex: '#38A169' },
    { num: 32, name: 'Whale', ipa: '/weɪl/', meaning: 'Cá voi', emoji: '🐳', hex: '#3182CE' },
    { num: 33, name: 'Dolphin', ipa: '/ˈdɑːl.fɪn/', meaning: 'Cá heo', emoji: '🐬', hex: '#4A90E2' },
    { num: 34, name: 'Seal', ipa: '/siːl/', meaning: 'Hải cẩu', emoji: '🦭', hex: '#A0AEC0' },
    { num: 35, name: 'Fish', ipa: '/fɪʃ/', meaning: 'Con cá', emoji: '🐟', hex: '#4299E1' },
    { num: 36, name: 'Shark', ipa: '/ʃɑːrk/', meaning: 'Cá mập', emoji: '🦈', hex: '#718096' },
    { num: 37, name: 'Octopus', ipa: '/ˈɑːk.tə.pəs/', meaning: 'Bạch tuộc', emoji: '🐙', hex: '#9F7AEA' },
    { num: 38, name: 'Crab', ipa: '/kræb/', meaning: 'Con cua', emoji: '🦀', hex: '#E53E3E' },
    { num: 39, name: 'Butterfly', ipa: '/ˈbʌt̬.ɚ.flaɪ/', meaning: 'Con bướm', emoji: '🦋', hex: '#4A90E2' },
    { num: 40, name: 'Bee', ipa: '/biː/', meaning: 'Con ong', emoji: '🐝', hex: '#ECC94B' },
    { num: 41, name: 'Ant', ipa: '/ænt/', meaning: 'Con kiến', emoji: '🐜', hex: '#E53E3E' },
    { num: 42, name: 'Spider', ipa: '/ˈspaɪ.dɚ/', meaning: 'Con nhện', emoji: '🕷️', hex: '#4A5568' },
    { num: 43, name: 'Kangaroo', ipa: '/ˌkæŋ.ɡəˈruː/', meaning: 'Chuột túi', emoji: '🦘', hex: '#DD6B20' },
    { num: 44, name: 'Camel', ipa: '/ˈkæm.əl/', meaning: 'Lạc đà', emoji: '🐫', hex: '#D69E2E' },
    { num: 45, name: 'Sheep', ipa: '/ʃiːp/', meaning: 'Con cừu', emoji: '🐑', hex: '#CBD5E0' },
    { num: 46, name: 'Goat', ipa: '/ɡoʊt/', meaning: 'Con dê', emoji: '🐐', hex: '#A0AEC0' },
    { num: 47, name: 'Deer', ipa: '/dɪr/', meaning: 'Hươu / Nai', emoji: '🦌', hex: '#D69E2E' },
    { num: 48, name: 'Squirrel', ipa: '/ˈskwɝː.əl/', meaning: 'Con sóc', emoji: '🐿️', hex: '#DD6B20' },
    { num: 49, name: 'Snail', ipa: '/sneɪl/', meaning: 'Ốc sên', emoji: '🐌', hex: '#A0AEC0' },
    { num: 50, name: 'Koala', ipa: '/koʊˈɑː.lə/', meaning: 'Gấu Koala', emoji: '🐨', hex: '#718096' }
  ];

  /* DỮ LIỆU CÂU ĐẾM GAME 4 (Bao gồm số nhiều bất quy tắc) */
  const countGameQuestions = [
    { count: 3, itemSingular: 'cat', itemPlural: 'cats', emoji: '🐱' },
    { count: 5, itemSingular: 'dog', itemPlural: 'dogs', emoji: '🐶' },
    { count: 2, itemSingular: 'fox', itemPlural: 'foxes', emoji: '🦊' }, // Số nhiều thêm 'es'
    { count: 4, itemSingular: 'mouse', itemPlural: 'mice', emoji: '🐭' }, // Bất quy tắc
    { count: 1, itemSingular: 'elephant', itemPlural: 'elephants', emoji: '🐘' },
    { count: 6, itemSingular: 'bird', itemPlural: 'birds', emoji: '🐦' },
    { count: 8, itemSingular: 'fish', itemPlural: 'fish', emoji: '🐟' }, // Bất quy tắc (giữ nguyên)
    { count: 3, itemSingular: 'sheep', itemPlural: 'sheep', emoji: '🐑' }, // Bất quy tắc (giữ nguyên)
    { count: 7, itemSingular: 'bee', itemPlural: 'bees', emoji: '🐝' },
    { count: 2, itemSingular: 'butterfly', itemPlural: 'butterflies', emoji: '🦋' }, // y -> ies
    { count: 4, itemSingular: 'monkey', itemPlural: 'monkeys', emoji: '🐵' },
    { count: 1, itemSingular: 'tiger', itemPlural: 'tigers', emoji: '🐯' },
    { count: 5, itemSingular: 'penguin', itemPlural: 'penguins', emoji: '🐧' },
    { count: 9, itemSingular: 'ant', itemPlural: 'ants', emoji: '🐜' },
    { count: 2, itemSingular: 'turtle', itemPlural: 'turtles', emoji: '🐢' },
    { count: 3, itemSingular: 'kangaroo', itemPlural: 'kangaroos', emoji: '🦘' }
  ];

  let flashcardDeck = [];
  let finishCurrentSpeech = null;
  let activeWordAudio = null;
  let speechSerial = 0;
  let usVoice = null;
  const wordAudioFiles = new Map(animalsList.map(item => [item.name.toLowerCase(),
    `./assets/audio/animals/${item.name.toLowerCase()}.mp3?v=us-ljspeech-2`]));

  function refreshUSVoice() {
    try {
      usVoice = window.speechSynthesis.getVoices().find(voice =>
        voice.lang.replace('_', '-').toLowerCase() === 'en-us') || null;
    } catch { usVoice = null; }
  }
  if ('speechSynthesis' in window) {
    refreshUSVoice();
    window.speechSynthesis.addEventListener?.('voiceschanged', refreshUSVoice);
  }

  function stopSpeech() {
    speechSerial++;
    if (finishCurrentSpeech) finishCurrentSpeech();
    if (activeWordAudio) {
      try { activeWordAudio.pause(); activeWordAudio.currentTime = 0; }
      catch { /* Audio may still be loading. */ }
      activeWordAudio = null;
    }
    try {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } catch { /* Audio is optional. */ }
  }

  function playWordAudio(source) {
    return new Promise(resolve => {
      let audio;
      try { audio = new Audio(source); }
      catch { resolve(false); return; }
      activeWordAudio = audio;
      audio.preload = 'auto';
      let finished = false;
      const timeout = setTimeout(() => finish(false), 8000);
      function finish(result) {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        audio.onended = audio.onerror = null;
        if (result !== true) {
          try { audio.pause(); audio.currentTime = 0; } catch { /* Audio may still be loading. */ }
        }
        if (activeWordAudio === audio) activeWordAudio = null;
        if (finishCurrentSpeech === cancel) finishCurrentSpeech = null;
        resolve(result);
      }
      const cancel = () => finish(null);
      finishCurrentSpeech = cancel;
      audio.onended = () => finish(true);
      audio.onerror = () => finish(false);
      try { audio.play().catch(() => finish(false)); }
      catch { finish(false); }
    });
  }

  function speakWithDevice(text, serial) {
    if (serial !== speechSerial || !('speechSynthesis' in window) ||
        typeof SpeechSynthesisUtterance === 'undefined') return Promise.resolve();
    return new Promise(resolve => {
      let finished = false;
      const timeout = setTimeout(finish, 8000);
      function finish() {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        if (finishCurrentSpeech === finish) finishCurrentSpeech = null;
        resolve();
      }
      finishCurrentSpeech = finish;
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = defaultSpeechRate;
        refreshUSVoice();
        if (usVoice) utterance.voice = usVoice;
        utterance.onend = utterance.onerror = finish;
        window.speechSynthesis.speak(utterance);
      } catch { finish(); }
    });
  }

  async function speak(text) {
    stopSpeech();
    const serial = speechSerial;
    const source = wordAudioFiles.get(String(text).trim().toLowerCase());
    if (source) {
      const result = await playWordAudio(source);
      if (result === true || result === null || serial !== speechSerial) return;
      const note = document.getElementById('animals-audio-note');
      if (note) note.textContent = 'Không tải được âm mẫu. Trang đang dùng giọng đọc tiếng Anh của thiết bị.';
    }
    return speakWithDevice(text, serial);
  }

  function renderVocabGrid() {
    const grid = document.getElementById('vocab-grid-container');
    grid.innerHTML = '';
    animalsList.forEach(item => {
      const card = document.createElement('div');
      card.className = 'number-card';
      card.style.background = item.hex;

      card.innerHTML = `
        <div class="number-badge-wrapper">
          <span class="number-display">${item.emoji}</span>
        </div>
        <div class="word-title">${item.name}</div>
        <div class="phonetic">${item.ipa}</div>
        <div class="meaning">${item.meaning}</div>
        <div class="example-box">
          <b>Ví dụ:</b> <i>"The ${item.name.toLowerCase()} is cute."</i>
        </div>
        <button class="audio-btn" onclick="speak('${item.name}')">🔊</button>
      `;
      grid.appendChild(card);
    });
  }
  renderVocabGrid();

  function switchTab(tabId, evt) {
    cancelLearningTimers();
    clearTimeout(countTimer);
    activeLearningTab = tabId;

    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    if(evt && evt.target) evt.target.classList.add('active');

    learning.state.lastTab = tabId; learning.save();
    resumeLearningGame();
    if(tabId === 'game-count') initCountGame();
  }

  /* Versioned learning data is independent of DOM, speech and rendering. */
  const LEARNING_KEY = 'danh.learning.animals.v1';
  const ANSWER_DELAY_MS = 1000;
  const FLIP_DURATION_MS = 160;
  class AnimalsLearning {
    constructor(storage, now = () => Date.now()) {
      this.storage = storage;
      this.now = now;
      this.storageAvailable = true;
      this.ids = animalsList.map(item => item.num);
      this.state = { version: 1, selected: [...this.ids], best: { mcq: 0, spelling: 0 }, history: [], rounds: {}, cards: null };
      try {
        const saved = JSON.parse(storage.getItem(LEARNING_KEY) || 'null');
        if (saved && saved.version === 1 && this.validDeck(saved.selected)) {
          this.state.selected = saved.selected;
          for (const game of ['mcq', 'spelling']) {
            const best = saved.best?.[game];
            this.state.best[game] = Number.isInteger(best) && best >= 0 && best <= this.ids.length ? best : 0;
            const round = saved.rounds?.[game];
            if (this.validRound(round)) this.state.rounds[game] = round;
          }
          if (Array.isArray(saved.history)) this.state.history = saved.history.filter(h =>
            h && typeof h.id === 'string' && ['mcq','spelling'].includes(h.game) &&
            Number.isFinite(h.completedAt) && Number.isInteger(h.total) && h.total > 0 && h.total <= 50 &&
            Number.isInteger(h.score) && h.score >= 0 && h.score <= h.total * 14 &&
            Number.isInteger(h.firstTry) && h.firstTry >= 0 && h.firstTry <= h.total &&
            Number.isInteger(h.peak) && h.peak >= 0 && h.peak <= h.total
          ).slice(-50);
          const cards = saved.cards;
          if (cards && this.sameSelection(cards.deck) && Number.isInteger(cards.index) && cards.index >= 0 && cards.index < cards.deck.length) {
            this.state.cards = { deck: cards.deck, index: cards.index, mode: cards.mode === 'ipa' ? 'ipa' : 'viet', seen: Array.isArray(cards.seen) ? [...new Set(cards.seen.filter(id => cards.deck.includes(id)))] : [] };
          }
        }
      } catch { /* Missing or damaged progress must not block the lesson. */ }
    }
    validDeck(ids) { return Array.isArray(ids) && ids.length > 0 && ids.length <= 50 && new Set(ids).size === ids.length && ids.every(id => this.ids.includes(id)); }
    sameSelection(deck) { return this.validDeck(deck) && deck.length === this.state.selected.length && deck.every(id => this.state.selected.includes(id)); }
    validRound(r) {
      if (!r || typeof r.id !== 'string' || !this.sameSelection(r.deck) || !Number.isInteger(r.index) || r.index < 0 || r.index > r.deck.length || !Array.isArray(r.answers) || r.answers.length !== r.deck.length) return false;
      return r.answers.every((a,i) => a && typeof a.solved === 'boolean' && Number.isInteger(a.mistakes) && a.mistakes >= 0 &&
        Number.isFinite(a.solvedAt) && Array.isArray(a.wrongChoices) && a.wrongChoices.every(id => r.deck.includes(id)) &&
        (i >= r.index || a.solved) && (i <= r.index || !a.solved));
    }
    save() {
      try { this.storage.setItem(LEARNING_KEY, JSON.stringify(this.state)); this.storageAvailable = true; }
      catch { this.storageAvailable = false; }
    }
    select(ids) {
      if (!this.validDeck(ids)) return false;
      this.state.selected = [...ids]; this.state.rounds = {}; this.state.cards = null; this.save(); return true;
    }
    newRound(game) {
      const deck = shuffleArray(this.state.selected);
      const r = { id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : this.now() + '-' + Math.random().toString(36).slice(2), deck, index: 0, answers: deck.map(() => ({ solved: false, mistakes: 0, wrongChoices: [], solvedAt: 0 })) };
      this.state.rounds[game] = r; this.save(); return r;
    }
    round(game) { return this.state.rounds[game] || this.newRound(game); }
    cards() {
      if (!this.state.cards) { this.state.cards = { deck: shuffleArray(this.state.selected), index: 0, mode: 'viet', seen: [] }; this.save(); }
      return this.state.cards;
    }
    totals(r) {
      let score = 0, streak = 0, peak = 0, firstTry = 0, completed = 0;
      for (const a of r.answers) {
        if (a.mistakes) streak = 0;
        if (a.solved) {
          completed++;
          if (!a.mistakes) { firstTry++; streak++; score += 10 + (streak % 5 === 0 ? 20 : 0); peak = Math.max(peak, streak); }
        }
      }
      return { score, streak, peak, firstTry, completed };
    }
    answer(game, correct, wrongChoice = null) {
      const r = this.round(game), a = r.answers[r.index];
      if (!a || a.solved) return null;
      const before = this.totals(r).score;
      if (correct) { a.solved = true; a.solvedAt = this.now(); }
      else {
        if (wrongChoice !== null && a.wrongChoices.includes(wrongChoice)) return null;
        a.mistakes++; if (wrongChoice !== null) a.wrongChoices.push(wrongChoice);
      }
      const totals = this.totals(r);
      this.state.best[game] = Math.max(this.state.best[game], totals.peak);
      this.save(); return { ...totals, earned: totals.score - before };
    }
    advance(game) {
      const r = this.round(game), a = r.answers[r.index];
      if (!a?.solved || this.now() < a.solvedAt + ANSWER_DELAY_MS) return false;
      r.index++;
      if (r.index === r.deck.length && !this.state.history.some(h => h.id === r.id)) {
        const t = this.totals(r);
        this.state.history.push({ id: r.id, game, completedAt: this.now(), total: r.deck.length, score: t.score, firstTry: t.firstTry, peak: t.peak });
        this.state.history = this.state.history.slice(-50);
      }
      this.save(); return true;
    }
  }
  let learningStorage;
  try { learningStorage = window.localStorage; } catch { learningStorage = { getItem() { return null; }, setItem() { throw new Error('Storage unavailable'); } }; }
  const learning = new AnimalsLearning(learningStorage);
  let activeLearningTab = 'vocab';
  let singleCardIdx = 0, singleCardTimer = null, singleCardRevealTimer = null, cardFrontMode = 'viet';
  let mcqTimer = null, spellingTimer = null, spellingLocked = false;
  const answerSchedule = { mcq: 0, spelling: 0 };
  let pickerDraft = new Set();
  const wordById = id => animalsList.find(item => item.num === id);
  const learningElement = id => document.getElementById(id);

  function cancelCardTimers() {
    clearTimeout(singleCardTimer); clearTimeout(singleCardRevealTimer);
    singleCardTimer = singleCardRevealTimer = null;
  }
  function cancelLearningTimers() {
    cancelCardTimers(); clearTimeout(mcqTimer); clearTimeout(spellingTimer);
    mcqTimer = spellingTimer = null;
    answerSchedule.mcq++; answerSchedule.spelling++;
    stopSpeech();
  }
  function setGameFeedback(id, message = '', state = 'hint') {
    const el = learningElement(id); el.textContent = message; el.dataset.state = state;
  }
  function updateLearningToolbar() {
    learningElement('learning-toolbar').hidden = !['game-flip','game-mcq','game-spelling'].includes(activeLearningTab);
    learningElement('choose-vocabulary').textContent = '⚙️ Chọn từ luyện tập · ' + learning.state.selected.length + ' từ';
    learningElement('storage-note').textContent = learning.storageAvailable ? 'Lựa chọn, tiến độ và kỷ lục được lưu trên thiết bị này.' : 'Trình duyệt chưa lưu được tiến độ. Bạn vẫn có thể chơi trong phiên này.';
  }
  function showStats(game) {
    const t = learning.totals(learning.round(game));
    learningElement(game + '-points').textContent = t.score;
    learningElement(game + '-streak').textContent = t.streak;
    learningElement(game + '-best').textContent = learning.state.best[game];
    updateLearningToolbar();
  }
  function correctMessage(game) {
    const r = learning.round(game), a = r.answers[r.index];
    if (a.mistakes) return '✅ Đã sửa đúng! Nghe xong sẽ chuyển câu.';
    const streak = learning.totals(r).streak;
    return streak % 5 === 0 ? '🔥 Chuỗi ' + streak + '! +10 điểm, thưởng +20. Tiếp tục nhé!' : '✅ Chính xác! +10 điểm. Nghe xong sẽ chuyển câu.';
  }
  function resumeLearningGame() {
    if (activeLearningTab === 'game-flip') initSingleCardGame();
    if (activeLearningTab === 'game-mcq') loadMcqQuestion();
    if (activeLearningTab === 'game-spelling') loadSpellingQuestion();
    updateLearningToolbar();
  }
  function scheduleAnswerAdvance(game, speechFinished = Promise.resolve()) {
    const r = learning.round(game), a = r.answers[r.index];
    if (!a?.solved) return;
    const scheduleId = ++answerSchedule[game];
    const roundId = r.id, questionIndex = r.index;
    const delay = Math.max(0, a.solvedAt + ANSWER_DELAY_MS - Date.now());
    const minimumWait = new Promise(resolve => {
      if (game === 'mcq') {
        clearTimeout(mcqTimer);
        mcqTimer = setTimeout(resolve, delay);
      } else {
        clearTimeout(spellingTimer);
        spellingTimer = setTimeout(resolve, delay);
      }
    });
    Promise.all([minimumWait, speechFinished]).then(() => {
      if (answerSchedule[game] !== scheduleId) return;
      if (activeLearningTab !== (game === 'mcq' ? 'game-mcq' : 'game-spelling') || learningElement('vocabulary-picker').open) return;
      const current = learning.round(game);
      if (current.id !== roundId || current.index !== questionIndex) return;
      if (learning.advance(game)) game === 'mcq' ? loadMcqQuestion() : loadSpellingQuestion();
      else scheduleAnswerAdvance(game);
    });
  }

  /* Vocabulary picker edits a draft; Cancel never changes a learning round. */
  function openVocabularyPicker() {
    cancelLearningTimers();
    pickerDraft = new Set(learning.state.selected);
    learningElement('vocab-search').value = '';
    renderVocabularyPicker();
    learningElement('vocabulary-picker').showModal();
    learningElement('vocab-search').focus();
  }
  function closeVocabularyPicker() { learningElement('vocabulary-picker').close(); }
  function normalizeSearch(text) { return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd'); }
  function renderVocabularyPicker() {
    const query = normalizeSearch(learningElement('vocab-search').value.trim());
    const words = animalsList.filter(w => normalizeSearch(w.name + ' ' + w.meaning).includes(query));
    const list = learningElement('vocab-choices'); list.replaceChildren();
    words.forEach(word => {
      const label = document.createElement('label'); label.className = 'vocab-choice';
      const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.value = word.num; checkbox.checked = pickerDraft.has(word.num);
      checkbox.addEventListener('change', () => { checkbox.checked ? pickerDraft.add(word.num) : pickerDraft.delete(word.num); updatePickerCount(); });
      const emoji = document.createElement('span'); emoji.className = 'choice-emoji'; emoji.innerHTML = word.emoji; emoji.setAttribute('aria-hidden','true');
      const description = document.createElement('span');
      const name = document.createElement('strong'); name.textContent = word.name;
      const meaning = document.createElement('small'); meaning.textContent = word.meaning;
      description.append(name, meaning); label.append(checkbox, emoji, description); list.appendChild(label);
    });
    learningElement('vocab-search-status').textContent = words.length ? 'Hiển thị ' + words.length + ' / 50 từ' : 'Không tìm thấy từ phù hợp. Thử từ khóa khác nhé.';
    updatePickerCount();
  }
  function updatePickerCount() {
    const n = pickerDraft.size;
    learningElement('vocab-selected-count').textContent = 'Đã chọn ' + n + ' / 50 từ';
    learningElement('apply-vocabulary').textContent = n ? 'Bắt đầu với ' + n + ' từ đã chọn' : 'Chọn ít nhất 1 từ';
    learningElement('apply-vocabulary').disabled = n === 0;
    learningElement('vocab-selection-hint').textContent = n === 1 ? '1 từ: chơi được Game 1 và 3. Game 2 cần ít nhất 2 từ.' : 'Bộ từ dùng chung cho Game 1–3. Game 2 có tối đa 4 lựa chọn mỗi câu.';
  }
  function selectAllVocabulary(checked) { pickerDraft = new Set(checked ? animalsList.map(w => w.num) : []); renderVocabularyPicker(); }
  function applyVocabularySelection() {
    if (!learning.select(animalsList.filter(w => pickerDraft.has(w.num)).map(w => w.num))) return;
    cancelLearningTimers();
    stopSpeech();
    updateLearningToolbar(); closeVocabularyPicker();
  }
  function renderHistory() {
    const list = learningElement('learning-history'); list.replaceChildren();
    const history = learning.state.history.slice(-10).reverse();
    if (!history.length) { const p = document.createElement('p'); p.textContent = 'Hoàn thành một lượt Game 2 hoặc 3 để xem kết quả tại đây.'; list.append(p); return; }
    history.forEach(h => {
      const item = document.createElement('li');
      const title = document.createElement('strong'); title.textContent = (h.game === 'mcq' ? 'Game 2 · Trắc nghiệm' : 'Game 3 · Chính tả') + ' — ' + h.score + ' điểm';
      const info = document.createElement('span'); info.textContent = h.total + ' từ · Đúng lần đầu ' + h.firstTry + '/' + h.total + ' · Chuỗi tốt nhất ' + h.peak;
      const date = document.createElement('small'); date.textContent = new Date(h.completedAt).toLocaleString('vi-VN');
      item.append(title, info, date); list.append(item);
    });
  }
  function showRoundSummary(game) {
    const r = learning.round(game), t = learning.totals(r), panel = learningElement(game + '-summary');
    panel.hidden = false;
    learningElement(game + '-summary-score').textContent = t.score + ' điểm';
    learningElement(game + '-summary-detail').textContent = 'Đúng ngay lần đầu: ' + t.firstTry + ' / ' + r.deck.length + ' · Chuỗi tốt nhất lượt này: ' + t.peak;
    learningElement(game + '-summary-message').textContent = t.firstTry === r.deck.length ? 'Tuyệt vời! Bạn đã trả lời đúng ngay lần đầu tất cả các từ.' : 'Bạn đã hoàn thành bộ từ! Luyện lại để phá kỷ lục của mình nhé.';
    renderHistory();
  }

  /* GAME 1: flashcards record unique viewed words, never award answer points. */
  function setCardFrontMode(mode, btnEl) {
    cancelCardTimers(); cardFrontMode = mode;
    learning.cards().mode = mode; learning.save();
    document.querySelectorAll('#game-flip .mode-btn').forEach(b => b.classList.toggle('active', b.id === 'mode-' + mode));
    renderSingleCardContent(); updateLearningToolbar();
  }
  function initSingleCardGame() {
    cancelCardTimers();
    const cards = learning.cards(); flashcardDeck = cards.deck.map(wordById); singleCardIdx = cards.index; cardFrontMode = cards.mode;
    document.querySelectorAll('#game-flip .mode-btn').forEach(b => b.classList.toggle('active', b.id === 'mode-' + cardFrontMode));
    renderSingleCardContent();
  }
  function renderSingleCardContent() {
    const item = flashcardDeck[singleCardIdx];
    const cardEl = document.getElementById('single-card-el');
    const frontEl = document.getElementById('card-front-content');
    const backEl = document.getElementById('card-back-content');
    const counterEl = document.getElementById('card-counter-text');

    cardEl.classList.add('resetting');
    cardEl.classList.remove('flipped');
    cardEl.setAttribute('aria-pressed', 'false');
    frontEl.setAttribute('aria-hidden', 'false');
    backEl.setAttribute('aria-hidden', 'true');
    counterEl.innerText = `Thẻ ${singleCardIdx + 1} / ${flashcardDeck.length}`;

    frontEl.className = 'flip-card-front';
    frontEl.style.background = 'linear-gradient(135deg, #38A169, #4FD1C5)';
    
    backEl.className = 'flip-card-back';
    backEl.style.background = item.hex;

    if(cardFrontMode === 'viet') {
      frontEl.innerHTML = `
        <h1 style="font-size: 3.8rem; margin-bottom: 4px;">${item.emoji}</h1>
        <h2 style="font-size: 1.5rem; font-weight:800;">${item.name}</h2>
        <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm để xem nghĩa)</p>
      `;
      backEl.innerHTML = `
        <h2 style="font-size: 1.8rem; font-weight:800; margin-bottom:4px;">${item.meaning}</h2>
        <p style="font-size: 1.1rem; font-weight:700;">${item.ipa}</p>
      `;
    } else {
      frontEl.innerHTML = `
        <h1 style="font-size: 3.5rem; margin-bottom: 4px;">${item.emoji}</h1>
        <h2 style="font-size: 1.3rem; font-weight:800;">${item.ipa}</h2>
        <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm để xem tên)</p>
      `;
      backEl.innerHTML = `
        <h1 style="font-size: 2rem; font-weight:900;">${item.name}</h1>
        <p style="font-size: 1.1rem; font-weight:700;">${item.meaning}</p>
      `;
    }
    // Reset the old flip in the same frame: no extra 600 ms before the next card.
    void cardEl.offsetWidth;
    cardEl.classList.remove('resetting');
    updateViewedCount();
  }
  function flipSingleCard() {
    const el = learningElement('single-card-el');
    if (activeLearningTab !== 'game-flip' || el.classList.contains('flipped') || learningElement('vocabulary-picker').open) return;
    el.classList.add('flipped'); el.setAttribute('aria-pressed','true');
    learningElement('card-front-content').setAttribute('aria-hidden','true'); learningElement('card-back-content').setAttribute('aria-hidden','false');
    const cards = learning.cards(), id = cards.deck[cards.index];
    if (!cards.seen.includes(id)) cards.seen.push(id);
    learning.save(); updateViewedCount(); updateLearningToolbar(); cancelCardTimers();
    singleCardRevealTimer = setTimeout(() => {
      singleCardRevealTimer = null; singleCardTimer = setTimeout(() => nextSingleCard(true), ANSWER_DELAY_MS);
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : FLIP_DURATION_MS);
    playSingleCardAudio();
  }
  function updateViewedCount() { const cards = learning.cards(); learningElement('card-viewed').textContent = '📖 Đã xem ' + cards.seen.length + ' / ' + cards.deck.length + ' từ'; }
  function playSingleCardAudio() { if (activeLearningTab === 'game-flip') speak(flashcardDeck[singleCardIdx].name); }
  function moveSingleCard(step, isAuto = false) {
    cancelCardTimers(); if (activeLearningTab !== 'game-flip') return;
    if (!isAuto) stopSpeech();
    const cards = learning.cards(); cards.index = (cards.index + step + cards.deck.length) % cards.deck.length;
    singleCardIdx = cards.index; learning.save(); renderSingleCardContent(); updateLearningToolbar();
  }
  function nextSingleCard(isAuto = false) { moveSingleCard(1, isAuto); }
  function prevSingleCard() { moveSingleCard(-1); }

  /* GAME 2: one answer transaction per word, wrong options survive navigation. */
  function initMcqGame() { cancelLearningTimers(); learning.newRound('mcq'); loadMcqQuestion(); }
  function loadMcqQuestion() {
    clearTimeout(mcqTimer); mcqTimer = null;
    const grid = learningElement('mcq-options-container'); grid.replaceChildren();
    const tooSmall = learning.state.selected.length < 2;
    learningElement('mcq-game-content').hidden = tooSmall;
    learningElement('mcq-unavailable').hidden = !tooSmall;
    if (tooSmall) return;
    const r = learning.round('mcq');
    learningElement('mcq-summary').hidden = true;
    showStats('mcq');
    if (r.index === r.deck.length) {
      learningElement('mcq-number-preview').textContent = '🏆';
      learningElement('mcq-progress').textContent = 'Hoàn thành ' + r.deck.length + ' / ' + r.deck.length + ' câu';
      setGameFeedback('mcq-feedback'); showRoundSummary('mcq'); return;
    }
    const item = wordById(r.deck[r.index]), a = r.answers[r.index];
    learningElement('mcq-number-preview').innerHTML = item.emoji;
    learningElement('mcq-progress').textContent = 'Câu ' + (r.index + 1) + ' / ' + r.deck.length;
    if (!Array.isArray(a.options) || a.options.length !== Math.min(4,r.deck.length) || !a.options.includes(item.num) || new Set(a.options).size !== a.options.length || a.options.some(id => !r.deck.includes(id))) {
      a.options = shuffleArray([item.num, ...shuffleArray(r.deck.filter(id => id !== item.num)).slice(0,3)]); learning.save();
    }
    a.options.forEach(id => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'mcq-btn'; button.textContent = wordById(id).name;
      button.disabled = a.solved || a.wrongChoices.includes(id);
      button.classList.toggle('wrong', a.wrongChoices.includes(id)); button.classList.toggle('correct', a.solved && id === item.num);
      button.onclick = () => handleMcqChoice(button, id, item.num); grid.appendChild(button);
    });
    setGameFeedback('mcq-feedback', a.solved ? correctMessage('mcq') : a.mistakes ? '❌ Chưa đúng. Chọn lại nhé! Streak đã về 0.' : '', a.solved ? 'correct' : a.mistakes ? 'wrong' : 'hint');
    if (a.solved) scheduleAnswerAdvance('mcq');
  }
  function handleMcqChoice(button, selectedId, correctId) {
    if (activeLearningTab !== 'game-mcq' || button.disabled || learningElement('vocabulary-picker').open) return;
    const correct = selectedId === correctId;
    const result = learning.answer('mcq', correct, correct ? null : selectedId);
    if (!result) return;
    if (correct) {
      document.querySelectorAll('#mcq-options-container button').forEach(b => b.disabled = true); button.classList.add('correct');
      setGameFeedback('mcq-feedback',correctMessage('mcq'),'correct');
      const speechFinished = speak(wordById(correctId).name);
      scheduleAnswerAdvance('mcq', speechFinished);
    } else {
      button.classList.add('wrong'); button.disabled = true;
      setGameFeedback('mcq-feedback','❌ Chưa đúng. Chọn lại nhé! Streak đã về 0.','wrong');
    }
    showStats('mcq'); playSoundEffect(correct ? 'correct' : 'wrong');
  }

  /* GAME 3: empty input is not an attempt; corrections complete without points. */
  function initSpellingGame() { cancelLearningTimers(); learning.newRound('spelling'); loadSpellingQuestion(); }
  function updateSpellingScore() {
    const r = learning.round('spelling'), t = learning.totals(r);
    learningElement('spelling-score').textContent = '🎯 Đã hoàn thành: ' + t.completed + ' / ' + r.deck.length + ' câu'; showStats('spelling');
  }
  function loadSpellingQuestion() {
    clearTimeout(spellingTimer); spellingTimer = null;
    const r = learning.round('spelling'), input = learningElement('spelling-input');
    learningElement('spelling-summary').hidden = true;
    input.value = ''; input.classList.remove('correct','wrong'); input.removeAttribute('aria-invalid');
    updateSpellingScore();
    const finished = r.index === r.deck.length, a = r.answers[r.index];
    spellingLocked = finished || a.solved;
    input.disabled = learningElement('spelling-check').disabled = learningElement('spelling-audio').disabled = spellingLocked;
    if (finished) {
      learningElement('spelling-preview').textContent = '🏆';
      learningElement('spelling-progress').textContent = 'Hoàn thành ' + r.deck.length + ' / ' + r.deck.length + ' câu';
      setGameFeedback('spelling-feedback'); showRoundSummary('spelling'); return;
    }
    const item = wordById(r.deck[r.index]);
    learningElement('spelling-preview').innerHTML = item.emoji;
    learningElement('spelling-progress').textContent = 'Câu ' + (r.index + 1) + ' / ' + r.deck.length;
    if (a.solved) {
      input.value = item.name; input.classList.add('correct'); setGameFeedback('spelling-feedback',correctMessage('spelling'),'correct'); scheduleAnswerAdvance('spelling');
    } else {
      input.value = typeof a.draft === 'string' ? a.draft.slice(0,100) : '';
      setGameFeedback('spelling-feedback',a.mistakes ? 'Nghe lại và thử tiếp nhé. Điểm đã kiếm được giữ nguyên.' : '');
      input.focus({preventScroll:true}); playSpellingAudio();
    }
  }
  function playSpellingAudio() {
    if (activeLearningTab !== 'game-spelling' || spellingLocked) return;
    const r = learning.round('spelling'); if (r.deck[r.index]) speak(wordById(r.deck[r.index]).name);
  }
  function checkSpelling() {
    if (activeLearningTab !== 'game-spelling' || spellingLocked || learningElement('vocabulary-picker').open) return;
    const input = learningElement('spelling-input'), value = input.value.trim().toLowerCase();
    if (!value) { setGameFeedback('spelling-feedback','✏️ Nhập tên con vật trước nhé.'); input.focus({preventScroll:true}); return; }
    const r = learning.round('spelling'), correct = value === wordById(r.deck[r.index]).name.toLowerCase();
    const result = learning.answer('spelling',correct); if (!result) return;
    if (correct) {
      spellingLocked = true; input.disabled = learningElement('spelling-check').disabled = learningElement('spelling-audio').disabled = true;
      input.classList.remove('wrong'); input.classList.add('correct'); input.removeAttribute('aria-invalid');
      setGameFeedback('spelling-feedback',correctMessage('spelling'),'correct');
      const speechFinished = speak(wordById(r.deck[r.index]).name);
      scheduleAnswerAdvance('spelling', speechFinished);
    } else {
      input.classList.add('wrong'); input.setAttribute('aria-invalid','true');
      setGameFeedback('spelling-feedback','❌ Chưa đúng. Nghe lại và sửa nhé! Streak đã về 0.','wrong'); input.focus({preventScroll:true});
    }
    updateSpellingScore(); playSoundEffect(correct ? 'correct' : 'wrong');
  }


  /* GAME 4: ĐẾM VẬT DỤNG VÀ VIẾT CÂU */
  let countIdx = 0;
  let countTimer = null;
  let countList = [];
  let countCorrectCount = 0;

  function initCountGame() {
    countList = shuffleArray(countGameQuestions);
    countIdx = 0;
    countCorrectCount = 0;
    updateCountScore();
    loadCountQuestion();
  }

  function updateCountScore() {
    document.getElementById('count-score').innerText = `🎯 Đã đúng: ${countCorrectCount} / ${countList.length} câu`;
  }

  function loadCountQuestion() {
    clearTimeout(countTimer);
    const item = countList[countIdx];
    const container = document.getElementById('count-items-container');
    const input = document.getElementById('count-sentence-input');
    const feedback = document.getElementById('count-feedback');
    const counterText = document.getElementById('count-counter-text');

    counterText.innerText = `Câu ${countIdx + 1} / ${countList.length}`;
    feedback.innerText = '';
    input.value = '';
    input.disabled = false;
    input.style.borderColor = '#CBD5E0';
    input.focus();

    container.innerHTML = '';
    for(let i = 0; i < item.count; i++) {
      const span = document.createElement('span');
      span.className = 'item-emoji';
      span.innerText = item.emoji;
      container.appendChild(span);
    }
  }

  function normalizeSentence(str) {
    return str.toLowerCase().replace(/[.,?!]/g, '').replace(/\s+/g, ' ').trim();
  }

  function checkCountSentence() {
    const item = countList[countIdx];
    const inputEl = document.getElementById('count-sentence-input');
    const feedback = document.getElementById('count-feedback');
    const userInput = normalizeSentence(inputEl.value);

    const verb = item.count === 1 ? 'is' : 'are';
    const noun = item.count === 1 ? item.itemSingular : item.itemPlural;

    const validSentence = normalizeSentence(`There ${verb} ${item.count} ${noun}`);

    if (userInput === validSentence) {
      const spokenSentence = `There ${verb} ${item.count} ${noun}`;
      feedback.style.color = '#38A169';
      feedback.innerText = '🎉 Chính xác! Tuyệt vời!';
      inputEl.disabled = true;
      
      countCorrectCount++;
      updateCountScore();
      playSoundEffect('correct');
      speak(spokenSentence);

      countTimer = setTimeout(() => {
        countIdx = (countIdx + 1) % countList.length;
        loadCountQuestion();
      }, 2500);
    } else {
      playSoundEffect('wrong');
      feedback.style.color = '#E53E3E';
      feedback.innerText = '❌ Chưa đúng. Thử lại nhé!';
      inputEl.style.borderColor = '#E53E3E';
      setTimeout(() => inputEl.style.borderColor = '#CBD5E0', 1200);
    }
  }

  function revealCountAnswer() {
    const item = countList[countIdx];
    const sentence = `There ${item.count === 1 ? 'is' : 'are'} ${item.count} ${item.count === 1 ? item.itemSingular : item.itemPlural}`;
    const input = document.getElementById('count-sentence-input');
    const feedback = document.getElementById('count-feedback');
    feedback.style.color = '#DD6B20';
    feedback.innerText = `💡 Đáp án: "${sentence}"`;
    input.value = sentence;
    speak(sentence);
  }

  document.addEventListener('DOMContentLoaded', () => {
    learningElement('vocabulary-picker').addEventListener('close', () => resumeLearningGame());
    if (['game-flip','game-mcq','game-spelling'].includes(learning.state.lastTab)) {
      const name = learning.state.lastTab;
      const button = document.querySelector('nav [data-game-nav]');
      switchTab(name, {target:button});
    }
    document.getElementById('spelling-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.repeat && !e.isComposing) { e.preventDefault(); checkSpelling(); }
    });

    document.getElementById('spelling-input').addEventListener('input', (e) => {
      if (spellingLocked) return;
      e.target.classList.remove('wrong');
      e.target.removeAttribute('aria-invalid');
      setGameFeedback('spelling-feedback');
      const round = learning.round('spelling');
      if (round.answers[round.index]) round.answers[round.index].draft = e.target.value.slice(0,100);
      learning.save(); updateLearningToolbar();
    });
    document.getElementById('single-card-el').addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); flipSingleCard(); }
    });

    document.getElementById('count-sentence-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkCountSentence();
    });
  });
