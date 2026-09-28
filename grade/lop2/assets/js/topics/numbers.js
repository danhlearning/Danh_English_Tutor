/* CẬP NHẬT TỐC ĐỘ ĐỌC: Giảm siêu chậm xuống 0.25 */
  const defaultSpeechRate = 0.6;

  /* HỆ THỐNG PHÁT ÂM THANH HIỆU ỨNG (Web Audio API - Tự tạo âm thanh không cần file) */
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
      /* Âm thanh reo hò / đúng (Success chord) */
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
      /* Âm thanh báo sai nhẹ nhàng (Buzz) */
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

  /* Bảng màu rực rỡ ngẫu nhiên cho các thẻ */
  const cardColors = [
    '#E53E3E', '#ED8936', '#ECC94B', '#38A169', '#3182CE',
    '#9F7AEA', '#ED64A6', '#4A90E2', '#319795', '#DD6B20'
  ];

  /* Hàm xáo trộn mảng ngẫu nhiên (Fisher-Yates) */
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* 1. Hàm chuyển đổi con số (1-100) thành Tên Tiếng Anh chuẩn */
  function numberToWords(n) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 
                  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 
                  'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (n === 100) return 'One hundred';
    if (n < 20) return ones[n];
    const digit = n % 10;
    return tens[Math.floor(n / 10)] + (digit !== 0 ? '-' + ones[digit] : '');
  }

  /* 2. Phiên âm IPA mẫu cho các số nền tảng */
  const ipaMap = {
    1: '/wʌn/', 2: '/tuː/', 3: '/θriː/', 4: '/fɔːr/', 5: '/faɪv/',
    6: '/sɪks/', 7: '/ˈsɛvən/', 8: '/eɪt/', 9: '/naɪn/', 10: '/tɛn/',
    11: '/ɪˈlɛvən/', 12: '/twɛlv/', 13: '/ˌθɜːrˈtiːn/', 14: '/ˌfɔːrˈtiːn/', 15: '/ˌfɪfˈtiːn/',
    16: '/ˌsɪksˈtiːn/', 17: '/ˌsɛvənˈtiːn/', 18: '/ˌeɪˈtiːn/', 19: '/ˌnaɪnˈtiːn/', 20: '/ˈtwɛnti/',
    21: '/ˌtwɛnti ˈwʌn/', 22: '/ˌtwɛnti ˈtuː/', 23: '/ˌtwɛnti ˈθriː/', 24: '/ˌtwɛnti ˈfɔːr/', 25: '/ˌtwɛnti ˈfaɪv/',
    26: '/ˌtwɛnti ˈsɪks/', 27: '/ˌtwɛnti ˈsɛvən/', 28: '/ˌtwɛnti ˈeɪt/', 29: '/ˌtwɛnti ˈnaɪn/', 30: '/ˈθɜːrti/',
    99: '/ˌnaɪnti ˈnaɪn/', 100: '/wʌn ˈhʌndrəd/'
  };

  /* 3. TẠO DỮ LIỆU ĐẦY ĐỦ 1 TỚI 100 DÙNG CHO GAME */
  const all100Numbers = [];
  for (let i = 1; i <= 100; i++) {
    const word = numberToWords(i);
    all100Numbers.push({
      num: i,
      name: word,
      ipa: ipaMap[i] || `/${word.toLowerCase()}/`,
      meaning: `Số ${i}`,
      hex: cardColors[i % cardColors.length],
      sentence: `Number ${word.toLowerCase()}.`
    });
  }

  /* 4. DỮ LIỆU DÀNH RIÊNG CHO TRANG TỪ VỰNG (1->30, 99, 100) */
  const vocabNumbers = [
    ...all100Numbers.slice(0, 30),
    all100Numbers.find(item => item.num === 99),
    all100Numbers.find(item => item.num === 100)
  ];

  /* 5. DỮ LIỆU ĐẦY ĐỦ 50 CÂU ĐẾM CHO GAME 4 */
  const countGameQuestions = [
    { count: 13, itemSingular: 'bird', itemPlural: 'birds', emoji: '🐦' },
    { count: 1, itemSingular: 'cat', itemPlural: 'cats', emoji: '🐱' },
    { count: 5, itemSingular: 'dog', itemPlural: 'dogs', emoji: '🐶' },
    { count: 8, itemSingular: 'ruler', itemPlural: 'rulers', emoji: '📏' },
    { count: 3, itemSingular: 'apple', itemPlural: 'apples', emoji: '🍎' },
    { count: 15, itemSingular: 'book', itemPlural: 'books', emoji: '📚' },
    { count: 2, itemSingular: 'car', itemPlural: 'cars', emoji: '🚗' },
    { count: 10, itemSingular: 'pencil', itemPlural: 'pencils', emoji: '✏️' },
    { count: 7, itemSingular: 'ball', itemPlural: 'balls', emoji: '⚽' },
    { count: 4, itemSingular: 'duck', itemPlural: 'ducks', emoji: '🦆' },
    { count: 12, itemSingular: 'star', itemPlural: 'stars', emoji: '⭐' },
    { count: 6, itemSingular: 'fish', itemPlural: 'fish', emoji: '🐟' },
    { count: 14, itemSingular: 'flower', itemPlural: 'flowers', emoji: '🌸' },
    { count: 9, itemSingular: 'pen', itemPlural: 'pens', emoji: '🖊️' },
    { count: 1, itemSingular: 'rabbit', itemPlural: 'rabbits', emoji: '🐰' },
    { count: 11, itemSingular: 'tree', itemPlural: 'trees', emoji: '🌲' },
    { count: 16, itemSingular: 'candy', itemPlural: 'candies', emoji: '🍬' },
    { count: 18, itemSingular: 'balloon', itemPlural: 'balloons', emoji: '🎈' },
    { count: 20, itemSingular: 'bee', itemPlural: 'bees', emoji: '🐝' },
    { count: 7, itemSingular: 'hat', itemPlural: 'hats', emoji: '🧢' },
    { count: 17, itemSingular: 'butterfly', itemPlural: 'butterflies', emoji: '🦋' },
    { count: 19, itemSingular: 'cupcake', itemPlural: 'cupcakes', emoji: '🧁' },
    { count: 1, itemSingular: 'lion', itemPlural: 'lions', emoji: '🦁' },
    { count: 4, itemSingular: 'monkey', itemPlural: 'monkeys', emoji: '🐒' },
    { count: 2, itemSingular: 'elephant', itemPlural: 'elephants', emoji: '🐘' },
    { count: 6, itemSingular: 'frog', itemPlural: 'frogs', emoji: '🐸' },
    { count: 8, itemSingular: 'turtle', itemPlural: 'turtles', emoji: '🐢' },
    { count: 10, itemSingular: 'strawberry', itemPlural: 'strawberries', emoji: '🍓' },
    { count: 13, itemSingular: 'orange', itemPlural: 'oranges', emoji: '🍊' },
    { count: 5, itemSingular: 'banana', itemPlural: 'bananas', emoji: '🍌' },
    { count: 15, itemSingular: 'cookie', itemPlural: 'cookies', emoji: '🍪' },
    { count: 3, itemSingular: 'pizza', itemPlural: 'pizzas', emoji: '🍕' },
    { count: 9, itemSingular: 'ice cream', itemPlural: 'ice creams', emoji: '🍦' },
    { count: 12, itemSingular: 'clock', itemPlural: 'clocks', emoji: '⏰' },
    { count: 14, itemSingular: 'key', itemPlural: 'keys', emoji: '🔑' },
    { count: 1, itemSingular: 'house', itemPlural: 'houses', emoji: '🏠' },
    { count: 16, itemSingular: 'gift', itemPlural: 'gifts', emoji: '🎁' },
    { count: 11, itemSingular: 'ring', itemPlural: 'rings', emoji: '💍' },
    { count: 7, itemSingular: 'umbrella', itemPlural: 'umbrellas', emoji: '☂️' },
    { count: 18, itemSingular: 'cloud', itemPlural: 'clouds', emoji: '☁️' },
    { count: 22, itemSingular: 'sun', itemPlural: 'suns', emoji: '☀️' },
    { count: 5, itemSingular: 'moon', itemPlural: 'moons', emoji: '🌙' },
    { count: 8, itemSingular: 'guitar', itemPlural: 'guitars', emoji: '🎸' },
    { count: 2, itemSingular: 'drum', itemPlural: 'drums', emoji: '🥁' },
    { count: 14, itemSingular: 'robot', itemPlural: 'robots', emoji: '🤖' },
    { count: 10, itemSingular: 'bear', itemPlural: 'bears', emoji: '🐻' },
    { count: 6, itemSingular: 'panda', itemPlural: 'pandas', emoji: '🐼' },
    { count: 15, itemSingular: 'fox', itemPlural: 'foxes', emoji: '🦊' },
    { count: 1, itemSingular: 'unicorn', itemPlural: 'unicorns', emoji: '🦄' },
    { count: 21, itemSingular: 'leaf', itemPlural: 'leaves', emoji: '🍃' }
  ];

  let flashcardDeck = [];

  /* HÀM ĐỌC GIỌNG NÓI CHUẨN TỐC ĐỘ RẤT CHẬM + TỰ ĐỘNG CHỌN GIỌNG NÓI TỰ NHIÊN */
  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = defaultSpeechRate;

      const voices = window.speechSynthesis.getVoices();
      /* Tìm giọng đọc tiếng Anh tự nhiên chất lượng cao nếu có */
      const bestVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Samantha') || v.name.includes('Zira')));
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }

  /* Đảm bảo giọng đọc sẵn sàng khi chuyển đổi */
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {};
  }

  function renderVocabGrid() {
    const grid = document.getElementById('vocab-grid-container');
    grid.innerHTML = '';
    vocabNumbers.forEach(item => {
      const card = document.createElement('div');
      card.className = 'number-card';
      card.style.background = item.hex;

      card.innerHTML = `
        <div class="number-badge-wrapper">
          <span class="number-display">${item.num}</span>
        </div>
        <div class="word-title">${item.name}</div>
        <div class="phonetic">${item.ipa}</div>
        <div class="meaning">${item.meaning}</div>
        <div class="example-box">
          <b>Ví dụ:</b> <i>"I have ${item.num} ${item.num > 1 ? 'items' : 'item'}."</i>
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

  /* GAME 1: FLASHCARD (1-100) */
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
    flashcardDeck = shuffleArray(all100Numbers);
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

    backEl.className = 'flip-card-back';
    backEl.style.background = item.hex;
    backEl.style.color = 'white';
    backEl.style.border = '3px solid white';

    if(cardFrontMode === 'viet') {
      frontEl.innerHTML = `
        <h1 style="font-size: 3.5rem; margin-bottom: 4px; font-weight:900;">${item.num}</h1>
        <h2 style="font-size: 1.4rem; margin-bottom: 8px; font-weight:800;">${item.meaning}</h2>
        <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm vào thẻ để lật)</p>
      `;
      backEl.innerHTML = `
        <h2 style="font-size: 2.2rem; margin-bottom: 4px; font-weight:800;">${item.name}</h2>
        <p style="font-size: 1.1rem; font-weight:700;">${item.ipa}</p>
      `;
    } else {
      /* YÊU CẦU: MẶT TRƯỚC CHỈ CÓ IPA - MẶT SAU CHỈ CÓ SỐ */
      frontEl.innerHTML = `
        <h1 style="font-size: 2.5rem; margin-bottom: 8px; font-weight:800;">${item.ipa}</h1>
        <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm để xem số)</p>
      `;
      backEl.innerHTML = `
        <h1 style="font-size: 4.5rem; font-weight:900;">${item.num}</h1>
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

  /* GAME 2: TRẮC NGHIỆM (1-100) */
  let mcqIdx = 0;
  let mcqTimer = null;
  let mcqList = [];

  function initMcqGame() {
    mcqList = shuffleArray(all100Numbers);
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

    previewBox.innerText = item.num;

    let options = [item.name];
    let otherNumbers = all100Numbers.filter(c => c.name !== item.name);
    otherNumbers = shuffleArray(otherNumbers);
    for(let i = 0; i < 3; i++) {
      options.push(otherNumbers[i].name);
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

  /* GAME 3: CHÍNH TẢ (1-100) + BỘ ĐẾM SỐ CÂU ĐÚNG */
  let spellingIdx = 0;
  let spellingTimer = null;
  let spellingList = [];
  let spellingCorrectCount = 0;

  function initSpellingGame() {
    spellingList = shuffleArray(all100Numbers);
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

    preview.innerText = item.num;
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
    const inputVal = inputEl.value.trim().toLowerCase().replace(/\s+/g, '-');
    const correctVal = spellingList[spellingIdx].name.toLowerCase().replace(/\s+/g, '-');

    if(inputVal === correctVal || inputVal === spellingList[spellingIdx].name.toLowerCase()) {
      inputEl.disabled = true;
      spellingCorrectCount++;
      updateSpellingScore();
      playSoundEffect('correct'); /* ÂM THANH ĐÚNG */
      speak(spellingList[spellingIdx].name);

      spellingTimer = setTimeout(() => {
        spellingIdx = (spellingIdx + 1) % spellingList.length;
        loadSpellingQuestion();
      }, 2000);
    } else {
      playSoundEffect('wrong'); /* ÂM THANH SAI */
      inputEl.style.borderColor = '#E53E3E';
      setTimeout(() => {
        inputEl.style.borderColor = '#CBD5E0';
      }, 1000);
    }
  }

  /* GAME 4: ĐẾM VẬT DỤNG VÀ VIẾT CÂU (50 câu) + BỘ ĐẾM SỐ CÂU ĐÚNG */
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
    feedback.style.color = '#2D3748';
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

    const verb = item.count === 1 ? 'is' : 'are';
    const noun = item.count === 1 ? item.itemSingular : item.itemPlural;
    const numWord = numberToWords(item.count).toLowerCase();

    const validSentence1 = normalizeSentence(`There ${verb} ${item.count} ${noun}`);
    const validSentence2 = normalizeSentence(`There ${verb} ${numWord} ${noun}`);

    if (userInput === validSentence1 || userInput === validSentence2) {
      const spokenSentence = `There ${verb} ${numWord} ${noun}`;
      feedback.style.color = '#38A169';
      feedback.innerText = '🎉 Chính xác! Tuyệt vời!';
      inputEl.disabled = true;
      
      countCorrectCount++;
      updateCountScore();
      playSoundEffect('correct'); /* ÂM THANH ĐÚNG */
      speak(spokenSentence);

      countTimer = setTimeout(() => {
        countIdx = (countIdx + 1) % countList.length;
        loadCountQuestion();
      }, 2500);
    } else {
      playSoundEffect('wrong'); /* ÂM THANH SAI */
      feedback.style.color = '#E53E3E';
      feedback.innerText = '❌ Chưa đúng. Thử lại nhé!';
      inputEl.style.borderColor = '#E53E3E';
      setTimeout(() => {
        inputEl.style.borderColor = '#CBD5E0';
      }, 1200);
    }
  }

  /* BẮT SỰ KIỆN PHÍM ENTER */
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
