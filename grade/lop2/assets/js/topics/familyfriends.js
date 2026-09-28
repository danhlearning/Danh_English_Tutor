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

  const cardColors = [
    '#FF6B6B', '#4ECDC4', '#4A90E2', '#6C5CE7', '#FD79A8',
    '#00B894', '#E17055', '#00CEC9', '#6C5CE7', '#FDCB6E'
  ];

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* DỮ LIỆU TỪ VỰNG CHỦ ĐỀ FAMILY AND FRIENDS */
  const familyVocabulary = [
    { name: 'Father', emoji: '👨', ipa: '/ˈfɑːðər/', meaning: 'Bố / Cha', sentence: 'This is my father.', hex: '#4A90E2' },
    { name: 'Mother', emoji: '👩', ipa: '/ˈmʌðər/', meaning: 'Mẹ', sentence: 'This is my mother.', hex: '#FF6B6B' },
    { name: 'Brother', emoji: '👦', ipa: '/ˈbrʌðər/', meaning: 'Anh / Em trai', sentence: 'He is my brother.', hex: '#4ECDC4' },
    { name: 'Sister', emoji: '👧', ipa: '/ˈsɪstər/', meaning: 'Chị / Em gái', sentence: 'She is my sister.', hex: '#FD79A8' },
    { name: 'Grandfather', emoji: '👴', ipa: '/ˈɡræn.fɑː.ðər/', meaning: 'Ông', sentence: 'He is my grandfather.', hex: '#00B894' },
    { name: 'Grandmother', emoji: '👵', ipa: '/ˈɡræn.mʌðər/', meaning: 'Bà', sentence: 'She is my grandmother.', hex: '#6C5CE7' },
    { name: 'Baby', emoji: '👶', ipa: '/ˈbeɪbi/', meaning: 'Em bé', sentence: 'Look at the baby.', hex: '#FFE66D' },
    { name: 'Parents', emoji: '👨‍👩‍👦', ipa: '/ˈpeərənts/', meaning: 'Bố mẹ', sentence: 'I love my parents.', hex: '#E17055' },
    { name: 'Friend', emoji: '🧑‍🤝‍🧑', ipa: '/frend/', meaning: 'Bạn bè', sentence: 'He is my friend.', hex: '#00CEC9' },
    { name: 'Best friend', emoji: '👫', ipa: '/best frend/', meaning: 'Bạn thân', sentence: 'She is my best friend.', hex: '#FF7675' },
    { name: 'Uncle', emoji: '🧔', ipa: '/ˈʌŋkl/', meaning: 'Chú / Bác / Cậu', sentence: 'He is my uncle.', hex: '#0984E3' },
    { name: 'Aunt', emoji: '👩‍🦰', ipa: '/ɑːnt/', meaning: 'Cô / Dì / Thím', sentence: 'She is my aunt.', hex: '#E84393' },
    { name: 'Cousin', emoji: '🧒', ipa: '/ˈkʌzn/', meaning: 'Anh chị em họ', sentence: 'This is my cousin.', hex: '#6C5CE7' },
    { name: 'Family', emoji: '👨‍👩‍👧‍👦', ipa: '/ˈfæməli/', meaning: 'Gia đình', sentence: 'I have a happy family.', hex: '#D63031' },
    { name: 'Son', emoji: '👦', ipa: '/sʌn/', meaning: 'Con trai', sentence: 'He is their son.', hex: '#00B894' },
    { name: 'Daughter', emoji: '👧', ipa: '/ˈdɔːtər/', meaning: 'Con gái', sentence: 'She is their daughter.', hex: '#FD79A8' },
    { name: 'Classmate', emoji: '🎒', ipa: '/ˈklɑːs.meɪt/', meaning: 'Bạn cùng lớp', sentence: 'We are classmates.', hex: '#4A90E2' },
    { name: 'Neighbor', emoji: '🏡', ipa: '/ˈneɪbər/', meaning: 'Hàng xóm', sentence: 'He is my neighbor.', hex: '#FDCB6E' },
    { name: 'Husband', emoji: '🤵', ipa: '/ˈhʌzbənd/', meaning: 'Chồng', sentence: 'He is her husband.', hex: '#2D3436' },
    { name: 'Wife', emoji: '👰', ipa: '/waɪf/', meaning: 'Vợ', sentence: 'She is his wife.', hex: '#E84393' }
  ];

  /* DỮ LIỆU CÂU HỎI CHO GAME 4 (30 CÂU HOÀN CHỈNH) */
  const sentenceQuestions = [
    { target: 'father', emoji: '👨', prompt: 'Đây là bố tôi. (Giới thiệu dùng "This is...")', answer: 'This is my father', altAnswer: 'this is my father.' },
    { target: 'mother', emoji: '👩', prompt: 'Bà ấy là mẹ tôi. (Dùng đại từ "She...")', answer: 'She is my mother', altAnswer: 'she is my mother.' },
    { target: 'brother', emoji: '👦', prompt: 'Anh ấy là anh trai tôi. (Dùng đại từ "He...")', answer: 'He is my brother', altAnswer: 'he is my brother.' },
    { target: 'sister', emoji: '👧', prompt: 'Cô ấy là chị gái tôi. (Dùng đại từ "She...")', answer: 'She is my sister', altAnswer: 'she is my sister.' },
    { target: 'grandfather', emoji: '👴', prompt: 'Đây là ông tôi. (Giới thiệu dùng "This is...")', answer: 'This is my grandfather', altAnswer: 'this is my grandfather.' },
    { target: 'grandmother', emoji: '👵', prompt: 'Bà ấy là bà của tôi. (Dùng đại từ "She...")', answer: 'She is my grandmother', altAnswer: 'she is my grandmother.' },
    { target: 'friend', emoji: '🧑‍🤝‍🧑', prompt: 'Anh ấy là bạn của tôi. (Dùng đại từ "He...")', answer: 'He is my friend', altAnswer: 'he is my friend.' },
    { target: 'best friend', emoji: '👫', prompt: 'Cô ấy là bạn thân nhất của tôi. (Dùng "She is...")', answer: 'She is my best friend', altAnswer: 'she is my best friend.' },
    { target: 'family', emoji: '👨‍👩‍👧‍👦', prompt: 'Tôi yêu gia đình của tôi. (Viết câu "I love...")', answer: 'I love my family', altAnswer: 'i love my family.' },
    { target: 'parents', emoji: '👨‍👩‍👦', prompt: 'Đây là bố mẹ tôi. (Giới thiệu số nhiều "These are...")', answer: 'These are my parents', altAnswer: 'these are my parents.' },
    { target: 'uncle', emoji: '🧔', prompt: 'Chú ấy là chú của tôi. (Dùng đại từ "He...")', answer: 'He is my uncle', altAnswer: 'he is my uncle.' },
    { target: 'aunt', emoji: '👩‍🦰', prompt: 'Cô ấy là cô/dì của tôi. (Dùng đại từ "She...")', answer: 'She is my aunt', altAnswer: 'she is my aunt.' },
    { target: 'cousin', emoji: '🧒', prompt: 'Đây là anh em họ của tôi. (Giới thiệu dùng "This is...")', answer: 'This is my cousin', altAnswer: 'this is my cousin.' },
    { target: 'classmate', emoji: '🎒', prompt: 'Cô ấy là bạn cùng lớp của tôi. (Dùng "She is...")', answer: 'She is my classmate', altAnswer: 'she is my classmate.' },
    { target: 'baby', emoji: '👶', prompt: 'Đây là em bé. (Giới thiệu dùng "This is...")', answer: 'This is the baby', altAnswer: 'this is a baby' },
    { target: 'neighbor', emoji: '🏡', prompt: 'Ông ấy là hàng xóm của tôi. (Dùng "He is...")', answer: 'He is my neighbor', altAnswer: 'he is my neighbor.' },
    { target: 'husband', emoji: '🤵', prompt: 'Anh ấy là chồng của cô ấy. (Dùng "He is her...")', answer: 'He is her husband', altAnswer: 'he is her husband.' },
    { target: 'wife', emoji: '👰', prompt: 'Cô ấy là vợ của anh ấy. (Dùng "She is his...")', answer: 'She is his wife', altAnswer: 'she is his wife.' },
    { target: 'son', emoji: '👦', prompt: 'Cậu ấy là con trai của họ. (Dùng "He is their...")', answer: 'He is their son', altAnswer: 'he is their son.' },
    { target: 'daughter', emoji: '👧', prompt: 'Cô ấy là con gái của họ. (Dùng "She is their...")', answer: 'She is their daughter', altAnswer: 'she is their daughter.' },
    { target: 'best friend boy', emoji: '👦', prompt: 'Anh ấy là bạn thân nhất của tôi. (Dùng "He is...")', answer: 'He is my best friend', altAnswer: 'he is my best friend.' },
    { target: 'who is this', emoji: '❓', prompt: 'Đây là ai? (Đặt câu hỏi với "Who is...")', answer: 'Who is this', altAnswer: 'who is this?' },
    { target: 'who is that', emoji: '👉', prompt: 'Kia là ai? (Đặt câu hỏi với "Who is...")', answer: 'Who is that', altAnswer: 'who is that?' },
    { target: 'father this', emoji: '👨', prompt: 'Đây là bố tôi. (Giới thiệu dùng "This is...")', answer: 'This is my father', altAnswer: 'this is my father.' },
    { target: 'grandfather he', emoji: '👴', prompt: 'Ông ấy là ông của tôi. (Dùng "He is...")', answer: 'He is my grandfather', altAnswer: 'he is my grandfather.' },
    { target: 'neighbor she', emoji: '🏡', prompt: 'Bà ấy là hàng xóm của tôi. (Dùng "She is...")', answer: 'She is my neighbor', altAnswer: 'she is my neighbor.' },
    { target: 'classmate he', emoji: '🎒', prompt: 'Cậu ấy là bạn cùng lớp của tôi. (Dùng "He is...")', answer: 'He is my classmate', altAnswer: 'he is my classmate.' },
    { target: 'uncle this', emoji: '🧔', prompt: 'Đây là chú của tôi. (Giới thiệu dùng "This is...")', answer: 'This is my uncle', altAnswer: 'this is my uncle.' },
    { target: 'aunt this', emoji: '👩‍🦰', prompt: 'Đây là cô/dì của tôi. (Giới thiệu dùng "This is...")', answer: 'This is my aunt', altAnswer: 'this is my aunt.' },
    { target: 'friends these', emoji: '🧑‍🤝‍🧑', prompt: 'Đây là những người bạn của tôi. (Số nhiều "These are...")', answer: 'These are my friends', altAnswer: 'these are my friends.' }
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
    familyVocabulary.forEach(item => {
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
    flashcardDeck = shuffleArray(familyVocabulary);
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
    mcqList = shuffleArray(familyVocabulary);
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

    previewBox.innerText = item.emoji;

    let options = [item.name];
    let otherItems = familyVocabulary.filter(c => c.name !== item.name);
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
    spellingList = shuffleArray(familyVocabulary);
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

    preview.innerText = item.emoji;
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
