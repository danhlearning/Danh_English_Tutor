// Mặc định tốc độ đọc là 0.5 (Chậm rõ cho bé)
  const defaultSpeechRate = 0.6;

  /* Bộ Vector SVG hiển thị chuẩn xác từng hình ảnh đồ vật minh họa */
  const svgIcons = {
    apple: `<svg viewBox="0 0 64 64"><path fill="#E53E3E" d="M32 12c-6-6-16-4-20 4-5 10-1 24 8 32 4 4 8 6 12 6s8-2 12-6c9-8 13-22 8-32-4-8-14-10-20-4z"/><path fill="#38A169" d="M32 12c2-4 6-6 10-6-1 3-3 6-6 7-2 1-4 0-4-1z"/><path fill="#744210" d="M31 6h2v7h-2z"/></svg>`,
    umbrella: `<svg viewBox="0 0 64 64"><path fill="#3182CE" d="M32 10C16 10 6 24 6 36h52C58 24 48 10 32 10z"/><path fill="#2B6CB0" d="M32 10c-5 8-5 18 0 26 5-8 5-18 0-26z"/><path fill="#718096" d="M31 36h2v18c0 3-2 5-5 5s-5-2-5-5h2c0 2 1 3 3 3s3-1 3-3V36z"/><path fill="#3182CE" d="M31 6h2v4h-2z"/></svg>`,
    /* Đã cập nhật SVG Chuối Vàng Dài Hơn & Cong Tự Nhiên Hơn */
    banana: `<svg viewBox="0 0 64 64"><path fill="#F6E05E" stroke="#D69E2E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M8 52C16 58 42 56 56 12c-8 3-22 9-32 5C16 13 10 32 8 52z"/><path fill="#744210" d="M55 10l3-3 2 1-2 4zM6 52l2 3-3 1z"/></svg>`,
    leaf: `<svg viewBox="0 0 64 64"><path fill="#38A169" d="M52 12C28 12 12 28 12 52c24 0 40-16 40-40z"/><path fill="#276749" d="M12 52C28 36 40 24 52 12M28 36l-6 6M38 26l-6 6M46 18l-4 4"/></svg>`,
    orange: `<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="22" fill="#ED8936"/><path fill="#38A169" d="M32 12c4-4 10-4 14 0-4 3-8 4-14 0z"/><circle cx="24" cy="28" r="1.5" fill="#DD6B20"/><circle cx="38" cy="38" r="1.5" fill="#DD6B20"/><circle cx="30" cy="44" r="1.5" fill="#DD6B20"/></svg>`,
    grapes: `<svg viewBox="0 0 64 64"><circle cx="26" cy="24" r="7" fill="#9F7AEA"/><circle cx="38" cy="24" r="7" fill="#9F7AEA"/><circle cx="20" cy="34" r="7" fill="#805AD5"/><circle cx="32" cy="34" r="7" fill="#805AD5"/><circle cx="44" cy="34" r="7" fill="#805AD5"/><circle cx="26" cy="44" r="7" fill="#6B46C1"/><circle cx="38" cy="44" r="7" fill="#6B46C1"/><circle cx="32" cy="52" r="7" fill="#553C9A"/><path fill="#38A169" d="M32 14c-6-4-12-2-14 2 6 1 11 0 14-2z"/><path fill="#744210" d="M31 8h2v7h-2z"/></svg>`,
    flower: `<svg viewBox="0 0 64 64"><circle cx="32" cy="20" r="8" fill="#ED64A6"/><circle cx="44" cy="32" r="8" fill="#ED64A6"/><circle cx="32" cy="44" r="8" fill="#ED64A6"/><circle cx="20" cy="32" r="8" fill="#ED64A6"/><circle cx="32" cy="32" r="7" fill="#ECC94B"/></svg>`,
    cat: `<svg viewBox="0 0 64 64"><path fill="#2D3748" d="M16 18l8 10V46h16V28l8-10-8 4c-4-3-12-3-16 0l-8-4z"/><circle cx="26" cy="32" r="2" fill="#ECC94B"/><circle cx="38" cy="32" r="2" fill="#ECC94B"/><path fill="#ED64A6" d="M30 36l2 2 2-2h-4z"/></svg>`,
    dog: `<svg viewBox="0 0 64 64"><path fill="#E2E8F0" d="M18 20c0-6 6-10 14-10s14 4 14 10v20c0 8-6 14-14 14s-14-6-14-14V20z"/><path fill="#A0AEC0" d="M14 22c0 8 4 14 4 14s2-8 0-14-4 0-4 0zM50 22c0 8-4 14-4 14s-2-8 0-14 4 0 4 0z"/><circle cx="26" cy="24" r="2.5" fill="#2D3748"/><circle cx="38" cy="24" r="2.5" fill="#2D3748"/><ellipse cx="32" cy="30" rx="4" ry="3" fill="#2D3748"/></svg>`,
    elephant: `<svg viewBox="0 0 64 64"><path fill="#A0AEC0" d="M12 28c0-10 8-16 20-16s20 6 20 16v18H12V28z"/><path fill="#CBD5E0" d="M8 24c0 8 4 12 8 12V20c-4 0-8 0-8 4zM56 24c0 8-4 12-8 12V20c4 0 8 0 8 4z"/><path fill="#A0AEC0" d="M28 32v16c0 4 3 6 6 6s4-2 2-4v-8"/><circle cx="24" cy="26" r="2" fill="#2D3748"/><circle cx="40" cy="26" r="2" fill="#2D3748"/></svg>`,
    watch: `<svg viewBox="0 0 64 64"><rect x="26" y="6" width="12" height="52" fill="#CBD5E0" rx="3"/><circle cx="32" cy="32" r="16" fill="#E2E8F0" stroke="#718096" stroke-width="3"/><path stroke="#2D3748" stroke-width="2" stroke-linecap="round" d="M32 32V22M32 32h6"/></svg>`,
    bear: `<svg viewBox="0 0 64 64"><circle cx="18" cy="18" r="7" fill="#744210"/><circle cx="46" cy="18" r="7" fill="#744210"/><circle cx="32" cy="32" r="20" fill="#8C521F"/><ellipse cx="32" cy="38" rx="8" ry="6" fill="#D69E2E"/><circle cx="25" cy="28" r="2" fill="#2D3748"/><circle cx="39" cy="28" r="2" fill="#2D3748"/><ellipse cx="32" cy="36" rx="3" ry="2" fill="#2D3748"/></svg>`,
    bottle: `<svg viewBox="0 0 64 64"><path fill="rgba(255,255,255,0.4)" stroke="#4A5568" stroke-width="2.5" stroke-linejoin="round" d="M26 12h12v6l5 6v28c0 3-2 4-5 4H26c-3 0-5-1-5-4V24l5-6v-6z"/><path fill="#CBD5E0" d="M24 8h16v4H24z"/><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" d="M25 28c3 2 8 2 12 0M25 36c3 2 8 2 12 0"/></svg>`
  };

  /* Dữ liệu 13 Từ Vựng Tiếng Anh */
  const colorsData = [
    { name: 'Red', ipa: '/rɛd/', meaning: 'Màu đỏ', hex: '#E53E3E', textColor: '#FFF', icon: svgIcons.apple, example: 'Red apple 🍎', sentence: 'It is a red apple.' },
    { name: 'Blue', ipa: '/bluː/', meaning: 'Màu xanh dương', hex: '#3182CE', textColor: '#FFF', icon: svgIcons.umbrella, example: 'Blue umbrella ☂️', sentence: 'The umbrella is blue.' },
    { name: 'Yellow', ipa: '/ˈjɛloʊ/', meaning: 'Màu vàng', hex: '#ECC94B', textColor: '#2D3748', icon: svgIcons.banana, example: 'Yellow banana 🍌', sentence: 'I have a yellow banana.' },
    { name: 'Green', ipa: '/ɡriːn/', meaning: 'Màu xanh lá', hex: '#38A169', textColor: '#FFF', icon: svgIcons.leaf, example: 'Green leaf 🍃', sentence: 'The leaf is green.' },
    { name: 'Orange', ipa: '/ˈɔːrɪndʒ/', meaning: 'Màu cam', hex: '#ED8936', textColor: '#FFF', icon: svgIcons.orange, example: 'Orange fruit 🍊', sentence: 'It is an orange fruit.' },
    { name: 'Purple', ipa: '/ˈpɜːrpəl/', meaning: 'Màu tím', hex: '#9F7AEA', textColor: '#FFF', icon: svgIcons.grapes, example: 'Purple grapes 🍇', sentence: 'The grapes are purple.' },
    { name: 'Pink', ipa: '/pɪŋk/', meaning: 'Màu hồng', hex: '#ED64A6', textColor: '#FFF', icon: svgIcons.flower, example: 'Pink flower 🌸', sentence: 'I like the pink flower.' },
    { name: 'Black', ipa: '/blæk/', meaning: 'Màu đen', hex: '#2D3748', textColor: '#FFF', icon: svgIcons.cat, example: 'Black cat 🐈‍⬛', sentence: 'The cat is black.' },
    { name: 'White', ipa: '/waɪt/', meaning: 'Màu trắng', hex: '#FFFFFF', textColor: '#2D3748', border: '2px solid #CBD5E0', icon: svgIcons.dog, example: 'White dog 🐕', sentence: 'The dog is white.' },
    { name: 'Gray', ipa: '/ɡreɪ/', meaning: 'Màu xám', hex: '#A0AEC0', textColor: '#FFF', icon: svgIcons.elephant, example: 'Gray elephant 🐘', sentence: 'It is a gray elephant.' },
    { name: 'Silver', ipa: '/ˈsɪlvər/', meaning: 'Màu bạc', hex: '#E2E8F0', textColor: '#2D3748', border: '2px solid #A0AEC0', icon: svgIcons.watch, example: 'Silver watch ⌚', sentence: 'The watch is silver.' },
    { name: 'Brown', ipa: '/braʊn/', meaning: 'Màu nâu', hex: '#744210', textColor: '#FFF', icon: svgIcons.bear, example: 'Brown bear 🐻', sentence: 'It is a brown bear.' },
    { name: 'Transparent', ipa: '/trænˈspærənt/', meaning: 'Trong suốt', isTransparent: true, textColor: '#2D3748', border: '2px solid #A0AEC0', icon: svgIcons.bottle, example: 'Transparent glass bottle 🫙', sentence: 'The glass bottle is transparent.' }
  ];

  let flashcardDeck = [...colorsData];

  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = defaultSpeechRate;
      window.speechSynthesis.speak(utterance);
    }
  }

  function renderVocabGrid() {
    const grid = document.getElementById('vocab-grid-container');
    grid.innerHTML = '';
    colorsData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'color-card' + (item.isTransparent ? ' transparent-bg-pattern' : '');
      if(!item.isTransparent) {
        card.style.background = item.hex;
      }
      if(item.textColor) card.style.color = item.textColor;
      if(item.border) card.style.border = item.border;

      card.innerHTML = `
        <div class="real-obj-wrapper">${item.icon}</div>
        <div class="word-title">${item.name}</div>
        <div class="phonetic">${item.ipa}</div>
        <div class="meaning">${item.meaning}</div>
        <div class="example-box">
          <b>Ví dụ:</b> ${item.example}<br>
          <i>"${item.sentence}"</i>
        </div>
        <button class="audio-btn" onclick="speak('${item.name}. ${item.sentence}')">🔊</button>
      `;
      grid.appendChild(card);
    });
  }
  renderVocabGrid();

  function switchTab(tabId, evt) {
    clearTimeout(singleCardTimer);
    clearTimeout(mcqTimer);
    clearTimeout(spellingTimer);

    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    if(evt && evt.target) {
      evt.target.classList.add('active');
    }

    if(tabId === 'game-flip') initSingleCardGame();
    if(tabId === 'game-mcq') initMcqGame();
    if(tabId === 'game-spelling') initSpellingGame();
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

  function shuffleCards() {
    clearTimeout(singleCardTimer);
    for (let i = flashcardDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flashcardDeck[i], flashcardDeck[j]] = [flashcardDeck[j], flashcardDeck[i]];
    }
    singleCardIdx = 0;
    changeCardWithAnimation();
  }

  function initSingleCardGame() {
    singleCardIdx = 0;
    flashcardDeck = [...colorsData];
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
    frontEl.style.background = 'linear-gradient(135deg, #4A90E2, #67B26F)';
    frontEl.style.color = 'white';

    if(cardFrontMode === 'viet') {
      frontEl.innerHTML = `
        <h2 style="font-size: 1.8rem; margin-bottom: 8px; font-weight:800;">${item.meaning}</h2>
        <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm vào thẻ để lật)</p>
      `;
    } else {
      frontEl.innerHTML = `
        <h2 style="font-size: 2.1rem; margin-bottom: 8px; font-weight:700;">${item.ipa}</h2>
        <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm vào thẻ để xem đáp án)</p>
      `;
    }

    backEl.className = 'flip-card-back' + (item.isTransparent ? ' transparent-bg-pattern' : '');
    if(!item.isTransparent) {
      backEl.style.background = item.hex;
    } else {
      backEl.style.background = 'transparent';
    }
    backEl.style.color = item.textColor || 'white';
    if(item.border) backEl.style.border = item.border;
    else backEl.style.border = '3px solid white';

    backEl.innerHTML = `
      <h2 style="font-size: 2.3rem; margin-bottom: 4px; font-weight:800;">${item.name}</h2>
      <p style="font-size: 1.2rem; font-weight:700;">${item.ipa}</p>
    `;
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

  function initMcqGame() {
    mcqIdx = 0;
    loadMcqQuestion();
  }

  function loadMcqQuestion() {
    clearTimeout(mcqTimer);
    const item = colorsData[mcqIdx];
    const previewBox = document.getElementById('mcq-color-preview');
    const optionsGrid = document.getElementById('mcq-options-container');
    const mcqFeedback = document.getElementById('mcq-feedback');
    mcqFeedback.textContent = '';

    if(item.isTransparent) previewBox.className = 'color-preview-box transparent-bg-pattern';
    else previewBox.className = 'color-preview-box';

    previewBox.innerHTML = item.icon;

    let options = [item.name];
    let otherColors = colorsData.filter(c => c.name !== item.name);
    otherColors.sort(() => Math.random() - 0.5);
    for(let i = 0; i < 5; i++) {
      options.push(otherColors[i].name);
    }
    options.sort(() => Math.random() - 0.5);

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

  function initSpellingGame() {
    spellingIdx = 0;
    loadSpellingQuestion();
  }

  function loadSpellingQuestion() {
    clearTimeout(spellingTimer);
    const item = colorsData[spellingIdx];
    const preview = document.getElementById('spelling-preview');
    const input = document.getElementById('spelling-input');
    
    if(item.isTransparent) preview.className = 'spelling-img-preview transparent-bg-pattern';
    else preview.className = 'spelling-img-preview';

    preview.innerHTML = item.icon;

    input.value = '';
    input.disabled = false;
    speak(item.name);
  }

  function playSpellingAudio() {
    speak(colorsData[spellingIdx].name);
  }

  function checkSpelling() {
    const inputEl = document.getElementById('spelling-input');
    const inputVal = inputEl.value.trim().toLowerCase();
    const correctVal = colorsData[spellingIdx].name.toLowerCase();

    if(inputVal === correctVal) {
      inputEl.disabled = true;
      speak(colorsData[spellingIdx].name);

      spellingTimer = setTimeout(() => {
        spellingIdx = (spellingIdx + 1) % colorsData.length;
        loadSpellingQuestion();
      }, 1000);
    } else {
      inputEl.style.borderColor = '#E53E3E';
      setTimeout(() => {
        inputEl.style.borderColor = '#CBD5E0';
      }, 1000);
    }
  }
