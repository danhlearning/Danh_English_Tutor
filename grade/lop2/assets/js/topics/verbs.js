/* Đã cập nhật tốc độ phát âm đọc chậm rõ rệt (0.3) */
  const defaultSpeechRate = 0.6;

  /* HỆ THỐNG PHÁT ÂM THANH HIỆU ỨNG (Web Audio API) */
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playSoundEffect(type) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'correct') {
      const now = audioCtx.currentTime;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
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
  }

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* DỮ LIỆU TỪ VỰNG CHỦ ĐỀ BASIC VERBS */
  const verbVocabulary = [
    { name: 'Run', emoji: '<svg class="vocab-photo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="./assets/images/approved/verbs/run-photo-v1.webp" width="120" height="120"/></svg>', photo: '<svg class="vocab-photo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="./assets/images/approved/verbs/run-photo-v1.webp" width="120" height="120"/></svg>', ipa: '/rʌn/', meaning: 'Chạy', sentence: 'I can run fast.', hex: '#FF6B6B' },
    { name: 'Walk', emoji: '🚶', ipa: '/wɔːk/', meaning: 'Đi bộ', sentence: 'I walk to school.', hex: '#4ECDC4' },
    { name: 'Jump', emoji: '🤸', ipa: '/dʒʌmp/', meaning: 'Nhảy', sentence: 'He can jump high.', hex: '#FFE66D' },
    { name: 'Swim', emoji: '🏊', ipa: '/swɪm/', meaning: 'Bơi', sentence: 'She can swim well.', hex: '#4A90E2' },
    { name: 'Eat', emoji: '🍽️', ipa: '/iːt/', meaning: 'Ăn', sentence: 'I eat breakfast every day.', hex: '#FF7675' },
    { name: 'Drink', emoji: '🥤', ipa: '/drɪŋk/', meaning: 'Uống', sentence: 'I drink water every day.', hex: '#00CEC9' },
    { name: 'Sleep', emoji: '😴', ipa: '/sliːp/', meaning: 'Ngủ', sentence: 'The baby is sleeping.', hex: '#6C5CE7' },
    { name: 'Read', emoji: '📖', ipa: '/riːd/', meaning: 'Đọc', sentence: 'I read books every night.', hex: '#00B894' },
    { name: 'Write', emoji: '✏️', ipa: '/raɪt/', meaning: 'Viết', sentence: 'I write my name.', hex: '#0984E3' },
    { name: 'Sing', emoji: '🎤', ipa: '/sɪŋ/', meaning: 'Hát', sentence: 'She can sing very well.', hex: '#E84393' },
    { name: 'Dance', emoji: '💃', ipa: '/dæns/', meaning: 'Nhảy múa', sentence: 'They dance every night.', hex: '#FD79A8' },
    { name: 'Play', emoji: '⚽', ipa: '/pleɪ/', meaning: 'Chơi', sentence: 'I play football with my friends.', hex: '#48BB78' },
    { name: 'Cook', emoji: '🍳', ipa: '/kʊk/', meaning: 'Nấu ăn', sentence: 'Mom cooks dinner for us.', hex: '#E17055' },
    { name: 'Draw', emoji: '🎨', ipa: '/drɔː/', meaning: 'Vẽ', sentence: 'I draw a picture.', hex: '#D63031' },
    { name: 'Listen', emoji: '🎧', ipa: "/ˈlɪsn/", meaning: 'Nghe', sentence: 'I listen to music.', hex: '#6C5CE7' },
    { name: 'Watch', emoji: '📺', ipa: '/wɒtʃ/', meaning: 'Xem', sentence: 'I watch TV every day.', hex: '#2D3436' },
    { name: 'Sit', emoji: '🪑', ipa: '/sɪt/', meaning: 'Ngồi', sentence: 'Please sit down.', hex: '#FDCB6E' },
    { name: 'Stand', emoji: '🧍', ipa: '/stænd/', meaning: 'Đứng', sentence: 'Stand up, please.', hex: '#4A90E2' },
    { name: 'Ride', emoji: '🚲', ipa: '/raɪd/', meaning: 'Đi (xe đạp)', sentence: 'I ride my bike to school.', hex: '#00B894' },
    { name: 'Fly', emoji: '🪁', ipa: '/flaɪ/', meaning: 'Bay', sentence: 'The kite flies high in the sky.', hex: '#4ECDC4' }
  ];

  /* DỮ LIỆU CÂU HỎI CHO GAME 4 (30 CÂU HOÀN CHỈNH) */
  const sentenceQuestions = [
    { target: 'run', emoji: '🏃', prompt: 'Tôi có thể chạy nhanh. (Dùng "I can...")', answer: 'I can run fast', altAnswer: 'i can run fast.' },
    { target: 'walk', emoji: '🚶', prompt: 'Tôi đi bộ đến trường. (Dùng thì hiện tại đơn)', answer: 'I walk to school', altAnswer: 'i walk to school.' },
    { target: 'jump', emoji: '🤸', prompt: 'Cậu ấy có thể nhảy cao. (Dùng "He can...")', answer: 'He can jump high', altAnswer: 'he can jump high.' },
    { target: 'swim', emoji: '🏊', prompt: 'Cô ấy bơi giỏi. (Dùng "She can...")', answer: 'She can swim well', altAnswer: 'she can swim well.' },
    { target: 'eat', emoji: '🍽️', prompt: 'Tôi ăn sáng mỗi ngày. (Dùng "I...")', answer: 'I eat breakfast every day', altAnswer: 'i eat breakfast every day.' },
    { target: 'drink', emoji: '🥤', prompt: 'Tôi uống nước mỗi ngày. (Dùng "I...")', answer: 'I drink water every day', altAnswer: 'i drink water every day.' },
    { target: 'sleep', emoji: '😴', prompt: 'Em bé đang ngủ. (Dùng "The baby is...")', answer: 'The baby is sleeping', altAnswer: 'the baby is sleeping.' },
    { target: 'read', emoji: '📖', prompt: 'Tôi đọc sách mỗi tối. (Dùng "I...")', answer: 'I read books every night', altAnswer: 'i read books every night.' },
    { target: 'write', emoji: '✏️', prompt: 'Tôi viết tên của tôi. (Dùng "I...")', answer: 'I write my name', altAnswer: 'i write my name.' },
    { target: 'sing', emoji: '🎤', prompt: 'Cô ấy có thể hát rất hay. (Dùng "She can...")', answer: 'She can sing very well', altAnswer: 'she can sing very well.' },
    { target: 'dance', emoji: '💃', prompt: 'Họ nhảy múa mỗi tối. (Dùng "They...")', answer: 'They dance every night', altAnswer: 'they dance every night.' },
    { target: 'play', emoji: '⚽', prompt: 'Tôi chơi bóng đá với bạn của tôi. (Dùng "I...")', answer: 'I play football with my friends', altAnswer: 'i play football with my friends.' },
    { target: 'cook', emoji: '🍳', prompt: 'Mẹ nấu bữa tối cho chúng tôi. (Dùng "Mom...")', answer: 'Mom cooks dinner for us', altAnswer: 'mom cooks dinner for us.' },
    { target: 'draw', emoji: '🎨', prompt: 'Tôi vẽ một bức tranh. (Dùng "I...")', answer: 'I draw a picture', altAnswer: 'i draw a picture.' },
    { target: 'listen', emoji: '🎧', prompt: 'Tôi nghe nhạc. (Dùng "I...")', answer: 'I listen to music', altAnswer: 'i listen to music.' },
    { target: 'watch', emoji: '📺', prompt: 'Tôi xem TV mỗi ngày. (Dùng "I...")', answer: 'I watch TV every day', altAnswer: 'i watch tv every day.' },
    { target: 'sit', emoji: '🪑', prompt: 'Hãy ngồi xuống. (Câu mệnh lệnh)', answer: 'Sit down', altAnswer: 'sit down.' },
    { target: 'stand', emoji: '🧍', prompt: 'Hãy đứng lên. (Câu mệnh lệnh)', answer: 'Stand up', altAnswer: 'stand up.' },
    { target: 'ride', emoji: '🚲', prompt: 'Tôi đi xe đạp đến trường. (Dùng "I...")', answer: 'I ride my bike to school', altAnswer: 'i ride my bike to school.' },
    { target: 'fly', emoji: '🪁', prompt: 'Con diều bay cao trên bầu trời. (Dùng "The kite...")', answer: 'The kite flies high in the sky', altAnswer: 'the kite flies high in the sky.' },
    { target: 'run negative', emoji: '🏃', prompt: 'Đừng chạy trong lớp học. (Câu mệnh lệnh phủ định)', answer: `Don't run in the classroom`, altAnswer: 'do not run in the classroom' },
    { target: 'what can you do', emoji: '❓', prompt: 'Bạn có thể làm gì? (Đặt câu hỏi với "What...")', answer: 'What can you do', altAnswer: 'what can you do?' },
    { target: 'can you swim', emoji: '🏊', prompt: 'Bạn có thể bơi không? (Đặt câu hỏi Yes/No với "Can...")', answer: 'Can you swim', altAnswer: 'can you swim?' },
    { target: 'jump negative', emoji: '🤸', prompt: `Tôi không thể nhảy cao. (Dùng "I can't...")`, answer: `I can't jump high`, altAnswer: 'i cannot jump high' },
    { target: 'read command', emoji: '📖', prompt: 'Hãy đọc to lên. (Câu mệnh lệnh)', answer: 'Read loudly', altAnswer: 'read loudly.' },
    { target: 'write command', emoji: '✏️', prompt: 'Hãy viết tên của bạn. (Câu mệnh lệnh)', answer: 'Write your name', altAnswer: 'write your name.' },
    { target: 'listen command', emoji: '🎧', prompt: 'Hãy lắng nghe cô giáo. (Câu mệnh lệnh)', answer: 'Listen to the teacher', altAnswer: 'listen to the teacher.' },
    { target: 'stand negative', emoji: '🧍', prompt: 'Đừng đứng lên. (Câu mệnh lệnh phủ định)', answer: `Don't stand up`, altAnswer: 'do not stand up' },
    { target: 'like to play', emoji: '⚽', prompt: 'Tôi thích chơi bóng đá. (Dùng "I like to...")', answer: 'I like to play football', altAnswer: 'i like playing football' },
    { target: 'dance well', emoji: '💃', prompt: 'Cô ấy có thể nhảy múa giỏi. (Dùng "She can...")', answer: 'She can dance well', altAnswer: 'she can dance well.' }
  ];

  let flashcardDeck = [];

  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = defaultSpeechRate;

      const voices = window.speechSynthesis.getVoices();
      const bestVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Samantha') || v.name.includes('Zira')));
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  function renderVocabGrid() {
    const grid = document.getElementById('vocab-grid-container');
    grid.innerHTML = '';
    verbVocabulary.forEach(item => {
      const card = document.createElement('div');
      card.className = 'vocab-card';
      card.style.background = item.hex;

      card.innerHTML = `
        <div class="emoji-badge-wrapper">
          <span class="emoji-display">${item.emoji}</span>
        </div>
        <div class="word-title">${item.name}</div>
        <div class="phonetic">${item.ipa}</div>
        <div class="meaning">${item.meaning}</div>
        <div class="example-box">
          <b>Ví dụ:</b> <i>"${item.sentence}"</i>
        </div>
        <button class="audio-btn" onclick="speak('${item.name}')">🔊</button>
      `;
      grid.appendChild(card);
    });
  }
  renderVocabGrid();

  function switchTab(tabId, evt) {
    clearTimeout(singleCardTimer);
    clearTimeout(mcqTimer);
    clearTimeout(spellingTimer);
    clearTimeout(countTimer);

    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    if(evt && evt.target) {
      evt.target.classList.add('active');
    }

    if(tabId === 'game-flip') initSingleCardGame();
    if(tabId === 'game-mcq') initMcqGame();
    if(tabId === 'game-spelling') initSpellingGame();
    if(tabId === 'game-count') initCountGame();
  }

  /* GAME 1: FLASHCARD */
  let singleCardIdx = 0;
  let singleCardTimer = null;
  let cardFrontMode = 'viet';

  function setCardFrontMode(mode, btnEl) {
    cardFrontMode = mode;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    if(btnEl) btnEl.classList.add('active');
    renderSingleCardContent();
  }

  function initSingleCardGame() {
    singleCardIdx = 0;
    flashcardDeck = shuffleArray(verbVocabulary);
    renderSingleCardContent();
  }

  function changeCardWithAnimation() {
    clearTimeout(singleCardTimer);
    const cardEl = document.getElementById('single-card-el');

    if (cardEl.classList.contains('flipped')) {
      cardEl.classList.remove('flipped');
      setTimeout(() => {
        renderSingleCardContent();
      }, 600);
    } else {
      renderSingleCardContent();
    }
  }

  function renderSingleCardContent() {
    const item = flashcardDeck[singleCardIdx];
    const cardEl = document.getElementById('single-card-el');
    const frontEl = document.getElementById('card-front-content');
    const backEl = document.getElementById('card-back-content');
    const counterEl = document.getElementById('card-counter-text');

    cardEl.classList.remove('flipped');
    counterEl.innerText = `Thẻ ${singleCardIdx + 1} / ${flashcardDeck.length}`;

    frontEl.className = 'flip-card-front';
    frontEl.style.background = 'linear-gradient(135deg, #FF6B6B, #FF8E53)';
    frontEl.style.color = 'white';

    backEl.className = 'flip-card-back';
    backEl.style.background = item.hex;
    backEl.style.color = 'white';
    backEl.style.border = '3px solid white';

    if(cardFrontMode === 'viet') {
      frontEl.innerHTML = `
        <span style="font-size: 3.8rem; margin-bottom: 4px;">${item.emoji}</span>
        <h2 style="font-size: 1.4rem; margin-bottom: 8px; font-weight:800;">${item.meaning}</h2>
        <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm vào thẻ để lật)</p>
      `;
      backEl.innerHTML = `
        <h2 style="font-size: 2.2rem; margin-bottom: 4px; font-weight:800;">${item.name}</h2>
        <p style="font-size: 1.1rem; font-weight:700;">${item.ipa}</p>
        <p style="font-size: 0.95rem; margin-top: 8px; font-style: italic;">"${item.sentence}"</p>
      `;
    } else {
      frontEl.innerHTML = `
        <h1 style="font-size: 2.2rem; margin-bottom: 8px; font-weight:800;">${item.ipa}</h1>
        <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm để xem từ vựng)</p>
      `;
      backEl.innerHTML = `
        <span style="font-size: 3rem; margin-bottom: 4px;">${item.emoji}</span>
        <h1 style="font-size: 2.2rem; font-weight:900;">${item.name}</h1>
      `;
    }
  }

  function flipSingleCard() {
    const cardEl = document.getElementById('single-card-el');
    if(!cardEl.classList.contains('flipped')) {
      cardEl.classList.add('flipped');
      const item = flashcardDeck[singleCardIdx];
      speak(item.name);

      clearTimeout(singleCardTimer);
      singleCardTimer = setTimeout(() => {
        nextSingleCard(true);
      }, 3000);
    }
  }

  function nextSingleCard(isAuto = false) {
    clearTimeout(singleCardTimer);
    singleCardIdx = (singleCardIdx + 1) % flashcardDeck.length;
    changeCardWithAnimation();
  }

  function prevSingleCard() {
    clearTimeout(singleCardTimer);
    singleCardIdx = (singleCardIdx - 1 + flashcardDeck.length) % flashcardDeck.length;
    changeCardWithAnimation();
  }

  /* GAME 2: TRẮC NGHIỆM */
  let mcqIdx = 0;
  let mcqTimer = null;
  let mcqList = [];

  function initMcqGame() {
    mcqList = shuffleArray(verbVocabulary);
    mcqIdx = 0;
    loadMcqQuestion();
  }

  function loadMcqQuestion() {
    clearTimeout(mcqTimer);
    const item = mcqList[mcqIdx];
    const previewBox = document.getElementById('mcq-number-preview');
    const optionsGrid = document.getElementById('mcq-options-container');
    const mcqFeedback = document.getElementById('mcq-feedback');
    mcqFeedback.textContent = '';

    previewBox.innerHTML = item.emoji;

    let options = [item.name];
    let otherItems = verbVocabulary.filter(c => c.name !== item.name);
    otherItems = shuffleArray(otherItems);
    for(let i = 0; i < 3; i++) {
      options.push(otherItems[i].name);
    }
    options = shuffleArray(options);

    optionsGrid.innerHTML = '';
    options.forEach(optName => {
      const btn = document.createElement('button');
      btn.className = 'mcq-btn';
      btn.innerText = optName;
      btn.onclick = () => handleMcqChoice(btn, optName, item.name);
      optionsGrid.appendChild(btn);
    });
  }

  function handleMcqChoice(btn, selectedName, correctName) {
    const allBtns = document.querySelectorAll('#mcq-options-container .mcq-btn');
    const feedback = document.getElementById('mcq-feedback');
    if (selectedName !== correctName) {
      btn.disabled = true;
      btn.classList.add('wrong');
      feedback.style.color = '#C53030';
      feedback.textContent = '❌ Chưa đúng. Thử lựa chọn khác nhé!';
      playSoundEffect('wrong');
      return;
    }

    allBtns.forEach(button => { button.disabled = true; });
    btn.classList.add('correct');
    feedback.style.color = '#276749';
    feedback.textContent = '✅ Chính xác!';
    playSoundEffect('correct');
    speak(correctName);
    mcqTimer = setTimeout(() => {
      mcqIdx = (mcqIdx + 1) % mcqList.length;
      loadMcqQuestion();
    }, 2000);
  }

  /* GAME 3: CHÍNH TẢ */
  let spellingIdx = 0;
  let spellingTimer = null;
  let spellingList = [];
  let spellingCorrectCount = 0;

  function initSpellingGame() {
    spellingList = shuffleArray(verbVocabulary);
    spellingIdx = 0;
    spellingCorrectCount = 0;
    updateSpellingScore();
    loadSpellingQuestion();
  }

  function updateSpellingScore() {
    document.getElementById('spelling-score').innerText = `🎯 Đã đúng: ${spellingCorrectCount} / ${spellingList.length} câu`;
  }

  function loadSpellingQuestion() {
    clearTimeout(spellingTimer);
    const item = spellingList[spellingIdx];
    const preview = document.getElementById('spelling-preview');
    const input = document.getElementById('spelling-input');

    preview.innerHTML = item.emoji;
    input.value = '';
    input.disabled = false;
    input.focus();
    speak(item.name);
  }

  function playSpellingAudio() {
    speak(spellingList[spellingIdx].name);
  }

  function checkSpelling() {
    const inputEl = document.getElementById('spelling-input');
    const inputVal = inputEl.value.trim().toLowerCase();
    const correctVal = spellingList[spellingIdx].name.toLowerCase();

    if(inputVal === correctVal) {
      inputEl.disabled = true;
      spellingCorrectCount++;
      updateSpellingScore();
      playSoundEffect('correct');
      speak(spellingList[spellingIdx].name);

      spellingTimer = setTimeout(() => {
        spellingIdx = (spellingIdx + 1) % spellingList.length;
        loadSpellingQuestion();
      }, 2000);
    } else {
      playSoundEffect('wrong');
      inputEl.style.borderColor = '#E53E3E';
      setTimeout(() => {
        inputEl.style.borderColor = '#CBD5E0';
      }, 1000);
    }
  }

  /* GAME 4: VIẾT CÂU HOÀN CHỈNH */
  let countIdx = 0;
  let countTimer = null;
  let countList = [];
  let countCorrectCount = 0;

  function initCountGame() {
    countList = shuffleArray(sentenceQuestions);
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
    feedback.style.color = '#2D3748';
    input.value = '';
    input.disabled = false;
    input.style.borderColor = '#CBD5E0';
    input.focus();

    container.innerHTML = `
      <div class="item-emoji">${item.emoji}</div>
      <div style="font-size: 1.2rem; font-weight: 700; color: #2B6CB0;">${item.prompt}</div>
    `;
  }

  function normalizeSentence(str) {
    return str.toLowerCase()
              .replace(/[.,?!]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
  }

  function checkCountSentence() {
    const item = countList[countIdx];
    const inputEl = document.getElementById('count-sentence-input');
    const feedback = document.getElementById('count-feedback');
    const userInput = normalizeSentence(inputEl.value);

    const validSentence1 = normalizeSentence(item.answer);
    const validSentence2 = normalizeSentence(item.altAnswer || '');

    if (userInput === validSentence1 || (validSentence2 && userInput === validSentence2)) {
      feedback.style.color = '#38A169';
      feedback.innerText = '🎉 Chính xác! Tuyệt vời!';
      inputEl.disabled = true;

      countCorrectCount++;
      updateCountScore();
      playSoundEffect('correct');
      speak(item.answer);

      countTimer = setTimeout(() => {
        countIdx = (countIdx + 1) % countList.length;
        loadCountQuestion();
      }, 2500);
    } else {
      playSoundEffect('wrong');
      feedback.style.color = '#E53E3E';
      feedback.innerText = '❌ Chưa đúng. Thử lại nhé!';
      inputEl.style.borderColor = '#E53E3E';
      setTimeout(() => {
        inputEl.style.borderColor = '#CBD5E0';
      }, 1200);
    }
  }

  function revealCountAnswer() {
    const item = countList[countIdx];
    const input = document.getElementById('count-sentence-input');
    const feedback = document.getElementById('count-feedback');
    feedback.style.color = '#DD6B20';
    feedback.innerText = `💡 Đáp án: "${item.answer}"`;
    input.value = item.answer;
    speak(item.answer);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('spelling-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        checkSpelling();
      }
    });

    document.getElementById('count-sentence-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        checkCountSentence();
      }
    });
  });
