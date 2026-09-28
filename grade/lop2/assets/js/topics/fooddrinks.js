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

  /* DỮ LIỆU TỪ VỰNG CHỦ ĐỀ FOOD AND DRINKS */
  const foodVocabulary = [
    { name: 'Pizza', emoji: '🍕', ipa: '/ˈpiːtsə/', meaning: 'Bánh Pizza', sentence: 'I like pizza.', hex: '#FF7043' },
    { name: 'Hamburger', emoji: '🍔', ipa: '/ˈhæmbɜːɡər/', meaning: 'Bánh Hamburger', sentence: 'I want a hamburger.', hex: '#FFA726' },
    { name: 'Sandwich', emoji: '🥪', ipa: '/ˈsænwɪtʃ/', meaning: 'Bánh Kẹp', sentence: 'I eat a sandwich.', hex: '#FB8C00' },
    { name: 'Bread', emoji: '🍞', ipa: '/bred/', meaning: 'Bánh Mỳ', sentence: 'I eat bread.', hex: '#8D6E63' },
    { name: 'Rice', emoji: '🍚', ipa: '/raɪs/', meaning: 'Cơm / Gạo', sentence: 'I eat rice.', hex: '#78909C' },
    { name: 'Noodles', emoji: '🍜', ipa: '/ˈnuːdlz/', meaning: 'Mì / Bún', sentence: 'I like noodles.', hex: '#F4511E' },
    { name: 'Chicken', emoji: '🍗', ipa: '/ˈtʃɪkɪn/', meaning: 'Thịt Gà', sentence: 'I like chicken.', hex: '#FFA000' },
    { name: 'Fish', emoji: '🐟', ipa: '/fɪʃ/', meaning: 'Cá', sentence: 'I eat fish.', hex: '#29B6F6' },
    { name: 'Egg', emoji: '🥚', ipa: '/eɡ/', meaning: 'Trứng', sentence: 'I eat an egg.', hex: '#FDD835' },
    { name: 'Soup', emoji: '🥣', ipa: '/suːp/', meaning: 'Súp / Canh', sentence: 'I like soup.', hex: '#FF7043' },
    { name: 'Salad', emoji: '🥗', ipa: '/ˈsæləd/', meaning: 'Rau Trộn / Salad', sentence: 'I eat salad.', hex: '#66BB6A' },
    { name: 'Ice cream', emoji: '🍦', ipa: '/ˈaɪs kriːm/', meaning: 'Kem', sentence: 'I like ice cream.', hex: '#EC407A' },
    { name: 'Cake', emoji: '🍰', ipa: '/keɪk/', meaning: 'Bánh Ngọt', sentence: 'This is a cake.', hex: '#AB47BC' },
    { name: 'Apple', emoji: '🍎', ipa: '/ˈæpl/', meaning: 'Quả Táo', sentence: 'This is an apple.', hex: '#E53935' },
    { name: 'Banana', emoji: '🍌', ipa: '/bəˈnɑːnə/', meaning: 'Quả Chuối', sentence: 'I eat a banana.', hex: '#FBC02D' },
    { name: 'Milk', emoji: '🥛', ipa: '/mɪlk/', meaning: 'Sữa', sentence: 'I drink milk.', hex: '#78909C' },
    { name: 'Water', emoji: '💧', ipa: '/ˈwɔːtər/', meaning: 'Nước Lọc', sentence: 'I drink water.', hex: '#42A5F5' },
    { name: 'Juice', emoji: '🧃', ipa: '/dʒuːs/', meaning: 'Nước Ép Trái Cây', sentence: 'I drink juice.', hex: '#FF9800' },
    { name: 'Tea', emoji: '🍵', ipa: '/tiː/', meaning: 'Trà', sentence: 'I drink tea.', hex: '#4CAF50' },
    { name: 'Cookie', emoji: '🍪', ipa: '/ˈkʊki/', meaning: 'Bánh Quy', sentence: 'I want a cookie.', hex: '#8D6E63' }
  ];

  /* DỮ LIỆU CÂU HỎI GAME 4: NGỮ PHÁP CỰC KỲ ĐƠN GIẢN CẤP TIỂU HỌC */
  const sentenceQuestions = [
    { emoji: '🍕', vietnamese: 'Tôi thích bánh pizza.', hint: 'Tôi + thích + [Món ăn]', answer: 'I like pizza' },
    { emoji: '🍔', vietnamese: 'Tôi muốn một cái bánh hamburger.', hint: 'Tôi + muốn + [Một cái bánh]', answer: 'I want a hamburger' },
    { emoji: '🥛', vietnamese: 'Tôi uống sữa.', hint: 'Tôi + uống + [Đồ uống]', answer: 'I drink milk' },
    { emoji: '🍦', vietnamese: 'Món ăn yêu thích của tôi là kem.', hint: 'Món ăn yêu thích của tôi + là + [Món ăn]', answer: 'My favorite food is ice cream' },
    { emoji: '💧', vietnamese: 'Tôi uống nước.', hint: 'Tôi + uống + [Loại nước]', answer: 'I drink water' },
    { emoji: '🍎', vietnamese: 'Đây là một quả táo.', hint: 'Đây + là + [Một quả trái cây]', answer: 'This is an apple' },
    { emoji: '🍌', vietnamese: 'Tôi ăn một quả chuối.', hint: 'Tôi + ăn + [Một quả trái cây]', answer: 'I eat a banana' },
    { emoji: '🍗', vietnamese: 'Tôi thích thịt gà.', hint: 'Tôi + thích + [Món ăn]', answer: 'I like chicken' },
    { emoji: '🧃', vietnamese: 'Tôi uống nước ép.', hint: 'Tôi + uống + [Đồ uống]', answer: 'I drink juice' },
    { emoji: '🍞', vietnamese: 'Tôi ăn bánh mỳ.', hint: 'Tôi + ăn + [Món ăn]', answer: 'I eat bread' },
    { emoji: '🍚', vietnamese: 'Tôi ăn cơm.', hint: 'Tôi + ăn + [Món ăn]', answer: 'I eat rice' },
    { emoji: '🍜', vietnamese: 'Tôi thích mì.', hint: 'Tôi + thích + [Món ăn]', answer: 'I like noodles' },
    { emoji: '🍰', vietnamese: 'Đây là một chiếc bánh ngọt.', hint: 'Đây + là + [Một chiếc bánh]', answer: 'This is a cake' },
    { emoji: '🐟', vietnamese: 'Tôi thích cá.', hint: 'Tôi + thích + [Món ăn]', answer: 'I like fish' },
    { emoji: '🥚', vietnamese: 'Tôi ăn một quả trứng.', hint: 'Tôi + ăn + [Một quả trứng]', answer: 'I eat an egg' },
    { emoji: '🥣', vietnamese: 'Tôi thích súp.', hint: 'Tôi + thích + [Món ăn]', answer: 'I like soup' },
    { emoji: '🥗', vietnamese: 'Tôi ăn salad.', hint: 'Tôi + ăn + [Món ăn]', answer: 'I eat salad' },
    { emoji: '🍵', vietnamese: 'Tôi uống trà.', hint: 'Tôi + uống + [Đồ uống]', answer: 'I drink tea' },
    { emoji: '🍪', vietnamese: 'Tôi muốn một chiếc bánh quy.', hint: 'Tôi + muốn + [Một chiếc bánh]', answer: 'I want a cookie' },
    { emoji: '🥪', vietnamese: 'Tôi ăn một chiếc bánh kẹp.', hint: 'Tôi + ăn + [Một chiếc bánh]', answer: 'I eat a sandwich' }
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

  function renderVocabGrid() {
    const grid = document.getElementById('vocab-grid-container');
    grid.innerHTML = '';
    foodVocabulary.forEach(item => {
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
    flashcardDeck = shuffleArray(foodVocabulary);
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
    frontEl.style.background = 'linear-gradient(135deg, #FF7043, #FFB74D)';
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
    mcqList = shuffleArray(foodVocabulary);
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
    let otherItems = foodVocabulary.filter(c => c.name !== item.name);
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
    spellingList = shuffleArray(foodVocabulary);
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
        inputEl.style.borderColor = '#BCAAA4';
      }, 1000);
    }
  }

  /* GAME 4: VIẾT CÂU TIỂU HỌC (ĐÃ SỬA THEO YÊU CẦU NÚT HIỆN ĐÁP ÁN & KHÔNG TỰ HIỆN ĐÁP ÁN KHI LÀM SAI) */
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
    feedback.style.color = '#3E2723';
    input.value = '';
    input.disabled = false;
    input.style.borderColor = '#BCAAA4';
    input.focus();

    container.innerHTML = `
      <div class="item-emoji">${item.emoji}</div>
      <div style="font-size: 1.4rem; font-weight: 800; color: #E65100;">"${item.vietnamese}"</div>
      <div style="font-size: 0.95rem; font-weight: 600; color: #6D4C41; background: #FFE0B2; padding: 4px 12px; border-radius: 8px;">💡 Cấu trúc gợi ý: ${item.hint}</div>
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
    const validSentence = normalizeSentence(item.answer);

    if (userInput === validSentence) {
      feedback.style.color = '#43A047';
      feedback.innerText = '🎉 Chính xác! Bạn giỏi quá!';
      inputEl.disabled = true;
      
      countCorrectCount++;
      updateCountScore();
      playSoundEffect('correct');
      speak(item.answer);

      countTimer = setTimeout(() => {
        countIdx = (countIdx + 1) % countList.length;
        loadCountQuestion();
      }, 2000);
    } else {
      playSoundEffect('wrong');
      feedback.style.color = '#E53935';
      feedback.innerText = '❌ Chưa đúng. Thử lại nhé!';
      inputEl.style.borderColor = '#E53935';
      setTimeout(() => {
        inputEl.style.borderColor = '#BCAAA4';
      }, 1200);
    }
  }

  function revealCountSentence() {
    const item = countList[countIdx];
    const feedback = document.getElementById('count-feedback');
    feedback.style.color = '#FF9800';
    feedback.innerText = `💡 Đáp án gợi ý: "${item.answer}"`;
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
