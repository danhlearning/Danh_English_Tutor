/* SPEECH SYNTHESIS & SOUND EFFECTS */
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
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (type === 'wrong') {
      const now = audioCtx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(130, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    }
  }

  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.6;

      const voices = window.speechSynthesis.getVoices();
      const bestVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira')));
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      window.speechSynthesis.speak(utterance);
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

  /* DATA: 18 FRUITS */
  const fruitVocab = [
    { icon: '<svg class="vocab-photo" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><image href="./assets/images/approved/fruits/apple-photo-v1.webp" width="120" height="120"/></svg>', name: 'Apple', plural: 'apples', ipa: '/ˈæp.əl/', meaning: 'Quả táo', hex: '#E53E3E', article: 'an' },
    { icon: '🍌', name: 'Banana', plural: 'bananas', ipa: '/bəˈnɑː.nə/', meaning: 'Quả chuối', hex: '#D69E2E', article: 'a' },
    { icon: '🍊', name: 'Orange', plural: 'oranges', ipa: '/ˈɒr.ɪndʒ/', meaning: 'Quả cam', hex: '#DD6B20', article: 'an' },
    { icon: '🍇', name: 'Grape', plural: 'grapes', ipa: '/ɡreɪp/', meaning: 'Quả nho', hex: '#805AD5', article: 'a' },
    { icon: '🍉', name: 'Watermelon', plural: 'watermelons', ipa: '/ˈwɔː.təˌmel.ən/', meaning: 'Quả dưa hấu', hex: '#38A169', article: 'a' },
    { icon: '🍓', name: 'Strawberry', plural: 'strawberries', ipa: '/ˈstrɔː.bər.i/', meaning: 'Quả dâu tây', hex: '#E53E3E', article: 'a' },
    { icon: '🥭', name: 'Mango', plural: 'mangoes', ipa: '/ˈmæŋ.ɡəʊ/', meaning: 'Quả xoài', hex: '#ED8936', article: 'a' },
    { icon: '🍍', name: 'Pineapple', plural: 'pineapples', ipa: '/ˈpaɪnˌæp.əl/', meaning: 'Quả dứa (thơm)', hex: '#ECC94B', article: 'a' },
    { icon: '🥑', name: 'Avocado', plural: 'avocados', ipa: '/ˌæv.əˈkɑː.dəʊ/', meaning: 'Quả bơ', hex: '#2F855A', article: 'an' },
    { icon: '🍑', name: 'Peach', plural: 'peaches', ipa: '/piːtʃ/', meaning: 'Quả đào', hex: '#ED64A6', article: 'a' },
    { icon: '🍒', name: 'Cherry', plural: 'cherries', ipa: '/ˈtʃer.i/', meaning: 'Quả anh đào', hex: '#9B2C2C', article: 'a' },
    { icon: '🍋', name: 'Lemon', plural: 'lemons', ipa: '/ˈlem.ən/', meaning: 'Quả chanh vàng', hex: '#D69E2E', article: 'a' },
    { icon: '🍈', name: 'Melon', plural: 'melons', ipa: '/ˈmel.ən/', meaning: 'Quả dưa lưới', hex: '#48BB78', article: 'a' },
    { icon: '🍐', name: 'Pear', plural: 'pears', ipa: '/peə/', meaning: 'Quả lê', hex: '#38A169', article: 'a' },
    { icon: '🥝', name: 'Kiwi', plural: 'kiwis', ipa: '/ˈkiː.wiː/', meaning: 'Quả kiwi', hex: '#2F855A', article: 'a' },
    { icon: '🥥', name: 'Coconut', plural: 'coconuts', ipa: '/ˈkəʊ.kə.nʌt/', meaning: 'Quả dừa', hex: '#718096', article: 'a' },
    { icon: '🍈', name: 'Papaya', plural: 'papayas', ipa: '/pəˈpaɪ.ə/', meaning: 'Quả đu đủ', hex: '#DD6B20', article: 'a' },
    { icon: '🍏', name: 'Guava', plural: 'guavas', ipa: '/ˈɡwɑː.və/', meaning: 'Quả ổi', hex: '#48BB78', article: 'a' }
  ];

  /* GENERATE 50 QUESTIONS FOR GAME 4 */
  function buildGame4Questions() {
    const list = [];
    
    // Pattern A: Multi-fruit counting questions (e.g. 20 strawberries, 5 apples, 12 bananas...)
    const countConfigs = [
      { fruit: 'Strawberry', count: 20, vn: '20 quả dâu tây' },
      { fruit: 'Apple', count: 5, vn: '5 quả táo' },
      { fruit: 'Banana', count: 12, vn: '12 quả chuối' },
      { fruit: 'Orange', count: 8, vn: '8 quả cam' },
      { fruit: 'Grape', count: 15, vn: '15 quả nho' },
      { fruit: 'Mango', count: 6, vn: '6 quả xoài' },
      { fruit: 'Watermelon', count: 3, vn: '3 quả dưa hấu' },
      { fruit: 'Cherry', count: 18, vn: '18 quả anh đào' },
      { fruit: 'Peach', count: 7, vn: '7 quả đào' },
      { fruit: 'Lemon', count: 10, vn: '10 quả chanh vàng' },
      { fruit: 'Pineapple', count: 4, vn: '4 quả dứa' },
      { fruit: 'Avocado', count: 9, vn: '9 quả bơ' },
      { fruit: 'Pear', count: 14, vn: '14 quả lê' },
      { fruit: 'Kiwi', count: 11, vn: '11 quả kiwi' },
      { fruit: 'Coconut', count: 2, vn: '2 quả dừa' },
      { fruit: 'Papaya', count: 5, vn: '5 quả đu đủ' },
      { fruit: 'Guava', count: 16, vn: '16 quả ổi' },
      { fruit: 'Melon', count: 4, vn: '4 quả dưa lưới' },
      
      { fruit: 'Strawberry', count: 10, vn: '10 quả dâu tây' },
      { fruit: 'Apple', count: 20, vn: '20 quả táo' },
      { fruit: 'Banana', count: 15, vn: '15 quả chuối' },
      { fruit: 'Orange', count: 12, vn: '12 quả cam' },
      { fruit: 'Grape', count: 20, vn: '20 quả nho' },
      { fruit: 'Mango', count: 8, vn: '8 quả xoài' },
      { fruit: 'Cherry', count: 12, vn: '12 quả anh đào' },
      { fruit: 'Lemon', count: 6, vn: '6 quả chanh vàng' },
      { fruit: 'Peach', count: 10, vn: '10 quả đào' },
      { fruit: 'Kiwi', count: 8, vn: '8 quả kiwi' },
      { fruit: 'Avocado', count: 15, vn: '15 quả bơ' },
      { fruit: 'Pineapple', count: 6, vn: '6 quả dứa' },
      { fruit: 'Pear', count: 9, vn: '9 quả lê' }
    ];

    countConfigs.forEach(item => {
      const fObj = fruitVocab.find(f => f.name === item.fruit);
      if (fObj) {
        list.push({
          type: 'plural',
          icon: fObj.icon,
          count: item.count,
          vnText: `Đếm: ${item.vn}`,
          fruitName: fObj.name,
          pluralName: fObj.plural,
          targetSentence: `There are ${item.count} ${fObj.plural}`,
          altSentence: `${item.count} ${fObj.plural}`
        });
      }
    });

    // Pattern B: Single fruit questions (1 fruit -> It is an apple / It is a banana)
    fruitVocab.forEach(fObj => {
      list.push({
        type: 'single',
        icon: fObj.icon,
        count: 1,
        vnText: `Đây là: ${fObj.meaning}`,
        fruitName: fObj.name,
        article: fObj.article,
        targetSentence: `It is ${fObj.article} ${fObj.name.toLowerCase()}`,
        altSentence: `${fObj.article} ${fObj.name.toLowerCase()}`
      });
    });

    // Ensure we have exactly 50 or shuffle to get top 50
    const shuffled = shuffleArray(list);
    return shuffled.slice(0, 50);
  }

  const fruitQuestions = buildGame4Questions();

  /* TAB CONTROL */
  function switchTab(tabId, evt) {
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

  /* RENDER TAB 1 VOCABULARY */
  function renderVocabGrid() {
    const grid = document.getElementById('vocab-grid-container');
    grid.innerHTML = '';
    fruitVocab.forEach(item => {
      const card = document.createElement('div');
      card.className = 'number-card';
      card.style.background = item.hex;

      card.innerHTML = `
        <div class="number-badge-wrapper">
          <span class="number-display">${item.icon}</span>
        </div>
        <div class="word-title">${item.name}</div>
        <div class="phonetic">${item.ipa}</div>
        <div class="meaning">${item.meaning}</div>
        <div class="example-box">
          <b>Ví dụ:</b> <i>"It is ${item.article} ${item.name.toLowerCase()}."</i>
        </div>
        <button class="audio-btn" onclick="speak('${item.name}')">🔊</button>
      `;
      grid.appendChild(card);
    });
  }

  /* GAME 1: FLASHCARD */
  let flashcardDeck = [];
  let singleCardIdx = 0;

  function initSingleCardGame() {
    singleCardIdx = 0;
    flashcardDeck = shuffleArray(fruitVocab);
    renderSingleCardContent();
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
    frontEl.style.background = 'linear-gradient(135deg, #48BB78, #38A169)';

    backEl.className = 'flip-card-back';
    backEl.style.background = item.hex;

    frontEl.innerHTML = `
      <div style="font-size: 3.5rem; margin-bottom: 2px;">${item.icon}</div>
      <h2 style="font-size: 1.6rem; font-weight:800;">${item.meaning}</h2>
      <p style="font-size: 0.85rem; opacity: 0.85; margin-top:4px;">(Chạm vào thẻ để lật xem tiếng Anh)</p>
    `;
    backEl.innerHTML = `
      <h2 style="font-size: 2.2rem; margin-bottom: 4px; font-weight:800;">${item.name}</h2>
      <p style="font-size: 1.1rem; font-weight:700;">${item.ipa}</p>
    `;
  }

  function flipSingleCard() {
    const cardEl = document.getElementById('single-card-el');
    cardEl.classList.toggle('flipped');
    if(cardEl.classList.contains('flipped')) {
      const item = flashcardDeck[singleCardIdx];
      speak(item.name);
    }
  }

  function nextSingleCard() {
    singleCardIdx = (singleCardIdx + 1) % flashcardDeck.length;
    renderSingleCardContent();
  }

  function prevSingleCard() {
    singleCardIdx = (singleCardIdx - 1 + flashcardDeck.length) % flashcardDeck.length;
    renderSingleCardContent();
  }

  /* GAME 2: TRẮC NGHIỆM */
  let mcqIdx = 0;
  let mcqList = [];
  let mcqTimer = null;

  function initMcqGame() {
    mcqList = shuffleArray(fruitVocab);
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

    previewBox.innerHTML = `<div style="font-size:3.5rem; line-height:1;">${item.icon}</div><div style="font-size:1.1rem; font-weight:700; color:#4A5568;">${item.meaning}</div>`;

    let options = [item.name];
    let otherItems = fruitVocab.filter(c => c.name !== item.name);
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
  let spellingList = [];
  let spellingCorrectCount = 0;

  function initSpellingGame() {
    spellingList = shuffleArray(fruitVocab);
    spellingIdx = 0;
    spellingCorrectCount = 0;
    updateSpellingScore();
    loadSpellingQuestion();
  }

  function updateSpellingScore() {
    document.getElementById('spelling-score').innerText = `🎯 Đã đúng: ${spellingCorrectCount} / ${spellingList.length} câu`;
  }

  function loadSpellingQuestion() {
    const item = spellingList[spellingIdx];
    const preview = document.getElementById('spelling-preview');
    const input = document.getElementById('spelling-input');
    const feedback = document.getElementById('spelling-feedback');

    preview.innerHTML = `<div style="font-size:3.5rem; line-height:1;">${item.icon}</div><div style="font-size:1.1rem; font-weight:700; color:#4A5568;">${item.meaning}</div>`;
    
    feedback.innerText = '';
    input.value = '';
    input.disabled = false;
    input.style.borderColor = '#CBD5E0';
    input.focus();
    speak(item.name);
  }

  function playSpellingAudio() {
    speak(spellingList[spellingIdx].name);
  }

  function checkSpelling() {
    const inputEl = document.getElementById('spelling-input');
    const feedback = document.getElementById('spelling-feedback');
    const inputVal = inputEl.value.trim().toLowerCase();
    const correctVal = spellingList[spellingIdx].name.toLowerCase();

    if(inputVal === correctVal) {
      feedback.style.color = '#38A169';
      feedback.innerText = '🎉 Chính xác! Tuyệt vời!';
      inputEl.disabled = true;
      spellingCorrectCount++;
      updateSpellingScore();
      playSoundEffect('correct');
      speak(spellingList[spellingIdx].name);

      setTimeout(() => {
        spellingIdx = (spellingIdx + 1) % spellingList.length;
        loadSpellingQuestion();
      }, 1800);
    } else {
      playSoundEffect('wrong');
      feedback.style.color = '#E53E3E';
      feedback.innerText = '❌ Chưa đúng. Thử lại nhé!';
      inputEl.style.borderColor = '#E53E3E';
    }
  }

  function revealSpellingAnswer() {
    const feedback = document.getElementById('spelling-feedback');
    const inputEl = document.getElementById('spelling-input');
    const correctName = spellingList[spellingIdx].name;
    
    feedback.style.color = '#DD6B20';
    feedback.innerText = `💡 Đáp án: ${correctName}`;
    inputEl.value = correctName;
    speak(correctName);
  }

  /* GAME 4: ĐẾM SỐ LƯỢNG & VIẾT MẪU CÂU (50 CÂU) */
  let countIdx = 0;
  let countCorrectCount = 0;

  function initCountGame() {
    countIdx = 0;
    countCorrectCount = 0;
    updateCountScore();
    loadCountQuestion();
  }

  function updateCountScore() {
    document.getElementById('count-score').innerText = `🎯 Đã đúng: ${countCorrectCount} / ${fruitQuestions.length} câu`;
  }

  function loadCountQuestion() {
    const item = fruitQuestions[countIdx];
    const itemsContainer = document.getElementById('fruit-items-container');
    const subBox = document.getElementById('fruit-sub-display');
    const input = document.getElementById('count-sentence-input');
    const feedback = document.getElementById('count-feedback');
    const counterText = document.getElementById('count-counter-text');

    counterText.innerText = `Câu ${countIdx + 1} / ${fruitQuestions.length}`;
    feedback.innerText = '';
    feedback.style.color = '#2D3748';
    input.value = '';
    input.disabled = false;
    input.style.borderColor = '#CBD5E0';

    // Build fruit emoji grid dynamically based on count
    itemsContainer.innerHTML = '';
    
    // Display up to the actual count of fruits
    for(let i = 0; i < item.count; i++) {
      const span = document.createElement('span');
      span.className = 'fruit-icon-item';
      span.innerHTML = item.icon;
      itemsContainer.appendChild(span);
    }

    subBox.innerText = item.vnText;
    input.focus();
  }

  function normalizeText(str) {
    return str.toLowerCase()
              .replace(/’/g, "'")
              .replace(/[.,?!]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
  }

  function checkCountSentence() {
    const item = fruitQuestions[countIdx];
    const inputEl = document.getElementById('count-sentence-input');
    const feedback = document.getElementById('count-feedback');
    const userInput = normalizeText(inputEl.value);

    // Build accepted answers list
    const validAnswers = [];

    if (item.type === 'plural') {
      // e.g. "There are 20 strawberries"
      validAnswers.push(normalizeText(`There are ${item.count} ${item.pluralName}`));
      validAnswers.push(normalizeText(`They are ${item.count} ${item.pluralName}`));
      validAnswers.push(normalizeText(`${item.count} ${item.pluralName}`));
      // Forgiving fallback if student forgets plural 's'
      validAnswers.push(normalizeText(`There are ${item.count} ${item.fruitName}`));
      validAnswers.push(normalizeText(`${item.count} ${item.fruitName}`));
    } else {
      // Single fruit e.g. "It is an apple"
      validAnswers.push(normalizeText(`It is ${item.article} ${item.fruitName}`));
      validAnswers.push(normalizeText(`It's ${item.article} ${item.fruitName}`));
      validAnswers.push(normalizeText(`This is ${item.article} ${item.fruitName}`));
      validAnswers.push(normalizeText(`${item.article} ${item.fruitName}`));
      validAnswers.push(normalizeText(item.fruitName));
    }

    if (validAnswers.includes(userInput)) {
      feedback.style.color = '#38A169';
      feedback.innerText = '🎉 Chính xác! Tuyệt vời!';
      inputEl.disabled = true;
      
      countCorrectCount++;
      updateCountScore();
      playSoundEffect('correct');
      speak(item.targetSentence);

      setTimeout(() => {
        countIdx = (countIdx + 1) % fruitQuestions.length;
        loadCountQuestion();
      }, 2200);
    } else {
      playSoundEffect('wrong');
      feedback.style.color = '#E53E3E';
      feedback.innerText = '❌ Chưa đúng. Thử lại nhé!';
      inputEl.style.borderColor = '#E53E3E';
    }
  }

  function revealCountAnswer() {
    const item = fruitQuestions[countIdx];
    const feedback = document.getElementById('count-feedback');
    const inputEl = document.getElementById('count-sentence-input');

    feedback.style.color = '#DD6B20';
    feedback.innerText = `💡 Đáp án: ${item.targetSentence} (hoặc "${item.altSentence}")`;
    inputEl.value = item.targetSentence;
    speak(item.targetSentence);
  }

  /* INITIALIZATION */
  document.addEventListener('DOMContentLoaded', () => {
    renderVocabGrid();

    document.getElementById('spelling-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkSpelling();
    });

    document.getElementById('count-sentence-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkCountSentence();
    });
  });
