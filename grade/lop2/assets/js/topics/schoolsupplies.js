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
  }

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* DỮ LIỆU TỪ VỰNG DỤNG CỤ HỌC TẬP (ĐÃ LOẠI BỎ 5 TỪ YÊU CẦU) */
  const schoolSupplies = [
    { num: 1, name: 'Pencil', ipa: '/ˈpɛnsəl/', meaning: 'Bút chì', emoji: '✏️', hex: '#E53E3E' },
    { num: 2, name: 'Pen', ipa: '/pɛn/', meaning: 'Bút mực / Bút bi', emoji: '🖊️', hex: '#ED8936' },
    { num: 3, name: 'Eraser', ipa: '/ɪˈreɪzər/', meaning: 'Cục tẩy / Cục gôm', emoji: '🧽', hex: '#ECC94B' },
    { num: 4, name: 'Ruler', ipa: '/ˈruːlər/', meaning: 'Thước kẻ', emoji: '📏', hex: '#38A169' },
    { num: 5, name: 'Book', ipa: '/bʊk/', meaning: 'Sách', emoji: '📖', hex: '#3182CE' },
    { num: 6, name: 'School bag', ipa: '/skuːl bæɡ/', meaning: 'Cặp sách', emoji: '🎒', hex: '#ED64A6' },
    { num: 7, name: 'Scissors', ipa: '/ˈsɪzərz/', meaning: 'Cây kéo', emoji: '✂️', hex: '#4A90E2' },
    { num: 8, name: 'Glue', ipa: '/ɡluː/', meaning: 'Keo dán / Hồ dán', emoji: '🧴', hex: '#319795' },
    { num: 9, name: 'Crayon', ipa: '/ˈkreɪɒn/', meaning: 'Bút màu sáp', emoji: '🖍️', hex: '#DD6B20' },
    { num: 10, name: 'Pencil case', ipa: '/ˈpɛnsəl keɪs/', meaning: 'Hộp bút', emoji: '👝', hex: '#E53E3E' },
    { num: 11, name: 'Chair', ipa: '/ʧɛr/', meaning: 'Ghế ngồi', emoji: '🪑', hex: '#38A169' },
    { num: 12, name: 'Blackboard', ipa: '/ˈblækˌbɔːrd/', meaning: 'Bảng đen', emoji: '⬛', hex: '#3182CE' },
    { num: 13, name: 'Paper', ipa: '/ˈpeɪpər/', meaning: 'Tờ giấy', emoji: '📄', hex: '#ED64A6' },
    { num: 14, name: 'Folder', ipa: '/ˈfoʊldər/', meaning: 'Bìa đựng tài liệu', emoji: '📁', hex: '#4A90E2' },
    { num: 15, name: 'Calculator', ipa: '/ˈkælkjəˌleɪtər/', meaning: 'Máy tính bỏ túi', emoji: '🧮', hex: '#319795' },
    { num: 16, name: 'Globe', ipa: '/ɡloʊb/', meaning: 'Quả địa cầu', emoji: '🌐', hex: '#DD6B20' },
    { num: 17, name: 'Compass', ipa: '/ˈkʌmpəs/', meaning: 'Com-pa', emoji: '🧭', hex: '#E53E3E' },
    { num: 18, name: 'Paintbrush', ipa: '/ˈpeɪntˌbrʌʃ/', meaning: 'Cọ vẽ', emoji: '🖌️', hex: '#ED8936' },
    { num: 19, name: 'Palette', ipa: '/ˈpælɪt/', meaning: 'Khay pha màu', emoji: '🎨', hex: '#ECC94B' },
    { num: 20, name: 'Paperclip', ipa: '/ˈpeɪpərˌklɪp/', meaning: 'Kẹp giấy', emoji: '📎', hex: '#38A169' },
    { num: 21, name: 'Stapler', ipa: '/ˈsteɪplər/', meaning: 'Cái dập ghim', emoji: '📌', hex: '#3182CE' },
    { num: 22, name: 'Dictionary', ipa: '/ˈdɪkʃəˌnɛri/', meaning: 'Từ điển', emoji: '📚', hex: '#ED64A6' },
    { num: 23, name: 'Highlighter', ipa: '/ˈhaɪˌlaɪtər/', meaning: 'Bút dạ quang', emoji: '🖊️', hex: '#4A90E2' },
    { num: 24, name: 'Protractor', ipa: '/proʊˈtræktər/', meaning: 'Thước đo độ', emoji: '📐', hex: '#319795' },
    { num: 25, name: 'Backpack', ipa: '/ˈbækˌpæk/', meaning: 'Balo học sinh', emoji: '🎒', hex: '#DD6B20' }
  ];

  /* DỮ LIỆU CÂU ĐẾM GAME 4 (ĐÃ LOẠI BỎ 5 TỪ TRÊN) */
  const countGameQuestions = [
    { count: 3, itemSingular: 'pencil', itemPlural: 'pencils', emoji: '✏️' },
    { count: 5, itemSingular: 'book', itemPlural: 'books', emoji: '📖' },
    { count: 2, itemSingular: 'ruler', itemPlural: 'rulers', emoji: '📏' },
    { count: 4, itemSingular: 'eraser', itemPlural: 'erasers', emoji: '🧽' },
    { count: 1, itemSingular: 'school bag', itemPlural: 'school bags', emoji: '🎒' },
    { count: 6, itemSingular: 'pen', itemPlural: 'pens', emoji: '🖊️' },
    { count: 8, itemSingular: 'crayon', itemPlural: 'crayons', emoji: '🖍️' },
    { count: 2, itemSingular: 'scissors', itemPlural: 'scissors', emoji: '✂️' },
    { count: 7, itemSingular: 'paperclip', itemPlural: 'paperclips', emoji: '📎' },
    { count: 4, itemSingular: 'glue', itemPlural: 'glues', emoji: '🧴' },
    { count: 1, itemSingular: 'calculator', itemPlural: 'calculators', emoji: '🧮' },
    { count: 9, itemSingular: 'paper', itemPlural: 'papers', emoji: '📄' },
    { count: 2, itemSingular: 'globe', itemPlural: 'globes', emoji: '🌐' },
    { count: 4, itemSingular: 'paintbrush', itemPlural: 'paintbrushes', emoji: '🖌️' },
    { count: 6, itemSingular: 'folder', itemPlural: 'folders', emoji: '📁' },
    { count: 5, itemSingular: 'chair', itemPlural: 'chairs', emoji: '🪑' }
  ];

  let flashcardDeck = [];

  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = defaultSpeechRate;

      const voices = window.speechSynthesis.getVoices();
      const bestVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (bestVoice) utterance.voice = bestVoice;

      window.speechSynthesis.speak(utterance);
    }
  }

  function renderVocabGrid() {
    const grid = document.getElementById('vocab-grid-container');
    grid.innerHTML = '';
    schoolSupplies.forEach(item => {
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
          <b>Ví dụ:</b> <i>"This is my ${item.name.toLowerCase()}."</i>
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
    if(evt && evt.target) evt.target.classList.add('active');

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
    flashcardDeck = shuffleArray(schoolSupplies);
    renderSingleCardContent();
  }

  function changeCardWithAnimation() {
    clearTimeout(singleCardTimer);
    const cardEl = document.getElementById('single-card-el');
    if (cardEl.classList.contains('flipped')) {
      cardEl.classList.remove('flipped');
      setTimeout(() => renderSingleCardContent(), 600);
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
    frontEl.style.background = 'linear-gradient(135deg, #4A90E2, #67B26F)';
    
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
  }

  function flipSingleCard() {
    const cardEl = document.getElementById('single-card-el');
    if(!cardEl.classList.contains('flipped')) {
      cardEl.classList.add('flipped');
      const item = flashcardDeck[singleCardIdx];
      speak(item.name);

      clearTimeout(singleCardTimer);
      singleCardTimer = setTimeout(() => nextSingleCard(true), 3000);
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
    mcqList = shuffleArray(schoolSupplies);
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
    let otherItems = schoolSupplies.filter(c => c.name !== item.name);
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
    spellingList = shuffleArray(schoolSupplies);
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
      setTimeout(() => inputEl.style.borderColor = '#CBD5E0', 1000);
    }
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
    document.getElementById('spelling-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkSpelling();
    });

    document.getElementById('count-sentence-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkCountSentence();
    });
  });
