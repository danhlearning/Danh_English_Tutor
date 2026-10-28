// Slow listening practice; keep the recorded voice's pitch and vowel quality.
const wordPlaybackRate = window.DanhYoungSpeech.audioRate;
const speechTimeoutMs = window.DanhYoungSpeech.timeoutFor();

  /* HỆ THỐNG PHÁT ÂM THANH HIỆU ỨNG (Web Audio API) */
  let audioCtx = null;
  let activeEffectOscillator = null;

  function playSoundEffect(type) {
    // The model pronunciation must remain audible after a correct answer.
    if (activeWordAudio || finishCurrentSpeech) return;
    try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
    const osc = audioCtx.createOscillator();
    activeEffectOscillator = osc;
    osc.onended = () => { if (activeEffectOscillator === osc) activeEffectOscillator = null; };
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
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'wrong') {
      const now = audioCtx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(130, now + 0.15);
      gain.gain.setValueAtTime(0.025, now);
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
  if (window.speechSynthesis) {
    refreshUSVoice();
    window.speechSynthesis.addEventListener?.('voiceschanged', refreshUSVoice);
  }

  function stopSpeech() {
    speechSerial++;
    if (activeEffectOscillator) {
      try { activeEffectOscillator.stop(); } catch { /* Already ended. */ }
      activeEffectOscillator = null;
    }
    if (finishCurrentSpeech) finishCurrentSpeech();
    if (activeWordAudio) {
      try { activeWordAudio.pause(); activeWordAudio.currentTime = 0; }
      catch { /* Audio may still be loading. */ }
      activeWordAudio = null;
    }
    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    } catch { /* Audio is optional. */ }
  }

  window.addEventListener('pagehide', stopSpeech);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopSpeech();
  });

  function playWordAudio(source) {
    return new Promise(resolve => {
      let audio;
      try { audio = new Audio(source); }
      catch { resolve(false); return; }
      activeWordAudio = audio;
      audio.preload = 'auto';
      audio.preservesPitch = true;
      audio.playbackRate = wordPlaybackRate;
      audio.defaultPlaybackRate = wordPlaybackRate;
      let finished = false;
      const timeout = setTimeout(() => finish(false), speechTimeoutMs);
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
    if (serial !== speechSerial) return Promise.resolve();
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      setAudioNote('Thiết bị không hỗ trợ giọng đọc câu. Bạn vẫn có thể nghe các từ bằng âm mẫu.');
      return Promise.resolve();
    }
    refreshUSVoice();
    if (!usVoice) {
      setAudioNote('Thiết bị chưa có giọng đọc Anh–Mỹ. Hãy thử nghe lại hoặc dùng thiết bị có giọng này.');
      return Promise.resolve();
    }
    return new Promise(resolve => {
      let finished = false;
      let utterance;
      const timeout = setTimeout(() => {
        try { window.speechSynthesis.cancel(); } catch { /* Device speech unavailable. */ }
        finish();
      }, window.DanhYoungSpeech.timeoutFor(text));
      function finish() {
        if (finished) return;
        finished = true;
        clearTimeout(timeout);
        if (utterance) utterance.onend = utterance.onerror = null;
        if (finishCurrentSpeech === finish) finishCurrentSpeech = null;
        resolve();
      }
      finishCurrentSpeech = finish;
      try {
        utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.voice = usVoice;
        utterance.onend = finish;
        utterance.onerror = () => {
          if (serial === speechSerial) setAudioNote('Chưa phát được giọng đọc. Bấm loa để thử lại nhé.');
          finish();
        };
        window.DanhYoungSpeech.configure(utterance);
        window.speechSynthesis.speak(utterance);
      } catch { finish(); }
    });
  }

  function setAudioNote(message) {
    const note = document.getElementById('animals-audio-note');
    if (note) note.textContent = message;
  }

  async function speak(text) {
    if(window.DanhListenControls?.isManualRequest())return window.DanhAnswerSpeech.listen(text);
    if(window.DanhAnswerSpeech)return window.DanhAnswerSpeech.say(text);
    stopSpeech();
    setAudioNote('Nghe chậm · Giọng Anh–Mỹ');
    const serial = speechSerial;
    const source = wordAudioFiles.get(String(text).trim().toLowerCase());
    if (source) {
      const result = await playWordAudio(source);
      if (result === true || result === null || serial !== speechSerial) return;
      setAudioNote('Không tải được âm mẫu. Đang dùng giọng Anh–Mỹ đọc chậm của thiết bị.');
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
    clearTimeout(countTimer);
    if (finishCurrentSpeech) finishCurrentSpeech();
    if (activeWordAudio) { activeWordAudio.pause(); activeWordAudio = null; }
    try { window.speechSynthesis?.cancel(); } catch {}
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('nav .nav-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    (evt?.currentTarget || evt?.target)?.classList.add('active');
    if (tabId === 'game-count') initCountGame();
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
    document.getElementById('count-sentence-input').addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.repeat && !event.isComposing) {
        event.preventDefault(); checkCountSentence();
      }
    });
  });
