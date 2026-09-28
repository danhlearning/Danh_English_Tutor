const defaultSpeechRate = 0.6;
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playSoundEffect(type) {
    if (audioCtx.state === 'suspended') { audioCtx.resume(); }
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
      osc.start(now); osc.stop(now + 0.6);
    } else if (type === 'wrong') {
      const now = audioCtx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(130, now + 0.15);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now); osc.stop(now + 0.4);
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

  /* BỘ TỪ VỰNG HOUSEHOLD ITEMS SVG VẼ TAY CHI TIẾT */
  const vocabList = [
    { name: 'Table', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="10" y="35" width="80" height="10" rx="2" fill="#A1887F" stroke="#4E342E" stroke-width="2.5"/>
        <rect x="18" y="45" width="8" height="40" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
        <rect x="74" y="45" width="8" height="40" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
      </svg>`, ipa: '/ˈteɪ.bəl/', meaning: 'Cái bàn', sentence: 'We eat dinner on the table.', hex: '#8D6E63' },
    { name: 'Chair', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="25" y="10" width="45" height="10" rx="2" fill="#8D6E63" stroke="#4E342E" stroke-width="2.5"/>
        <rect x="25" y="20" width="8" height="35" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
        <rect x="62" y="20" width="8" height="35" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
        <rect x="20" y="52" width="55" height="10" rx="2" fill="#A1887F" stroke="#4E342E" stroke-width="2.5"/>
        <rect x="25" y="62" width="8" height="28" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
        <rect x="62" y="62" width="8" height="28" fill="#8D6E63" stroke="#4E342E" stroke-width="2"/>
      </svg>`, ipa: '/tʃeər/', meaning: 'Cái ghế', sentence: 'Please sit on the chair.', hex: '#A1887F' },
    { name: 'Bed', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="10" y="55" width="80" height="25" rx="4" fill="#90CAF9" stroke="#1565C0" stroke-width="2.5"/>
        <rect x="10" y="40" width="24" height="20" rx="4" fill="#FFFFFF" stroke="#1565C0" stroke-width="2.5"/>
        <rect x="8" y="78" width="8" height="12" fill="#5D4037"/>
        <rect x="84" y="78" width="8" height="12" fill="#5D4037"/>
      </svg>`, ipa: '/bed/', meaning: 'Cái giường', sentence: 'I sleep on my bed.', hex: '#64B5F6' },
    { name: 'Door', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="25" y="10" width="50" height="82" rx="3" fill="#A1887F" stroke="#4E342E" stroke-width="2.5"/>
        <rect x="33" y="18" width="34" height="30" rx="2" fill="#D7CCC8" stroke="#4E342E" stroke-width="1.5"/>
        <circle cx="64" cy="55" r="3.5" fill="#FFD54F" stroke="#4E342E" stroke-width="1"/>
      </svg>`, ipa: '/dɔːr/', meaning: 'Cánh cửa', sentence: 'Close the door, please.', hex: '#BCAAA4' },
    { name: 'Window', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="15" y="15" width="70" height="70" rx="3" fill="#B3E5FC" stroke="#0288D1" stroke-width="3"/>
        <line x1="50" y1="15" x2="50" y2="85" stroke="#0288D1" stroke-width="3"/>
        <line x1="15" y1="50" x2="85" y2="50" stroke="#0288D1" stroke-width="3"/>
      </svg>`, ipa: '/ˈwɪn.dəʊ/', meaning: 'Cửa sổ', sentence: 'Open the window for fresh air.', hex: '#4FC3F7' },
    { name: 'Television', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="10" y="20" width="80" height="50" rx="4" fill="#37474F" stroke="#000000" stroke-width="2.5"/>
        <rect x="16" y="26" width="68" height="38" fill="#4FC3F7"/>
        <rect x="42" y="70" width="16" height="10" fill="#37474F"/>
        <rect x="30" y="80" width="40" height="6" rx="3" fill="#263238"/>
      </svg>`, ipa: '/ˈtel.ɪ.vɪʒ.ən/', meaning: 'Ti vi', sentence: 'We watch television in the evening.', hex: '#37474F' },
    { name: 'Refrigerator', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="25" y="8" width="50" height="84" rx="4" fill="#ECEFF1" stroke="#607D8B" stroke-width="2.5"/>
        <line x1="25" y1="35" x2="75" y2="35" stroke="#607D8B" stroke-width="2"/>
        <rect x="63" y="15" width="4" height="12" rx="2" fill="#607D8B"/>
        <rect x="63" y="45" width="4" height="20" rx="2" fill="#607D8B"/>
      </svg>`, ipa: '/rɪˈfrɪdʒ.ər.eɪ.tər/', meaning: 'Tủ lạnh', sentence: 'Put the milk in the refrigerator.', hex: '#90A4AE' },
    { name: 'Sofa', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="10" y="45" width="80" height="30" rx="8" fill="#EF5350" stroke="#B71C1C" stroke-width="2.5"/>
        <rect x="10" y="30" width="16" height="30" rx="6" fill="#E53935" stroke="#B71C1C" stroke-width="2.5"/>
        <rect x="74" y="30" width="16" height="30" rx="6" fill="#E53935" stroke="#B71C1C" stroke-width="2.5"/>
        <rect x="26" y="35" width="48" height="20" rx="6" fill="#EF5350" stroke="#B71C1C" stroke-width="2"/>
        <rect x="14" y="75" width="8" height="10" fill="#4E342E"/>
        <rect x="78" y="75" width="8" height="10" fill="#4E342E"/>
      </svg>`, ipa: '/ˈsəʊ.fə/', meaning: 'Ghế sofa', sentence: 'They are sitting on the sofa.', hex: '#EF5350' },
    { name: 'Lamp', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <path d="M 30 25 L 70 25 L 60 50 L 40 50 Z" fill="#FFD54F" stroke="#F57F17" stroke-width="2.5"/>
        <line x1="50" y1="50" x2="50" y2="85" stroke="#616161" stroke-width="3"/>
        <ellipse cx="50" cy="88" rx="20" ry="5" fill="#757575"/>
      </svg>`, ipa: '/læmp/', meaning: 'Đèn bàn', sentence: "Turn on the lamp, it's dark.", hex: '#FFCA28' },
    { name: 'Clock', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="38" fill="#FFFFFF" stroke="#37474F" stroke-width="3"/>
        <line x1="50" y1="50" x2="50" y2="25" stroke="#37474F" stroke-width="3"/>
        <line x1="50" y1="50" x2="65" y2="55" stroke="#37474F" stroke-width="3"/>
        <circle cx="50" cy="50" r="4" fill="#E53935"/>
      </svg>`, ipa: '/klɒk/', meaning: 'Đồng hồ', sentence: 'The clock is on the wall.', hex: '#78909C' },
    { name: 'Mirror', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <ellipse cx="50" cy="45" rx="30" ry="38" fill="#B3E5FC" stroke="#78909C" stroke-width="4"/>
        <rect x="45" y="80" width="10" height="14" fill="#78909C"/>
        <rect x="35" y="92" width="30" height="6" rx="3" fill="#546E7A"/>
      </svg>`, ipa: '/ˈmɪr.ər/', meaning: 'Gương', sentence: 'She looks in the mirror.', hex: '#4DD0E1' },
    { name: 'Sink', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="15" y="30" width="70" height="10" rx="3" fill="#B0BEC5" stroke="#455A64" stroke-width="2"/>
        <path d="M 20 40 Q 20 65 50 65 Q 80 65 80 40 Z" fill="#CFD8DC" stroke="#455A64" stroke-width="2.5"/>
        <rect x="45" y="15" width="6" height="18" fill="#78909C"/>
        <circle cx="48" cy="14" r="4" fill="#607D8B"/>
      </svg>`, ipa: '/sɪŋk/', meaning: 'Bồn rửa', sentence: 'Wash your hands in the sink.', hex: '#B0BEC5' },
    { name: 'Stove', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="12" y="20" width="76" height="60" rx="4" fill="#37474F" stroke="#000000" stroke-width="2.5"/>
        <circle cx="32" cy="38" r="10" fill="#616161" stroke="#000" stroke-width="1.5"/>
        <circle cx="68" cy="38" r="10" fill="#616161" stroke="#000" stroke-width="1.5"/>
        <rect x="22" y="58" width="56" height="14" rx="2" fill="#263238"/>
      </svg>`, ipa: '/stəʊv/', meaning: 'Bếp nấu', sentence: 'Mom is cooking on the stove.', hex: '#616161' },
    { name: 'Wardrobe', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <rect x="18" y="8" width="64" height="84" rx="3" fill="#8D6E63" stroke="#4E342E" stroke-width="2.5"/>
        <line x1="50" y1="8" x2="50" y2="92" stroke="#4E342E" stroke-width="2.5"/>
        <circle cx="44" cy="50" r="2.5" fill="#FFD54F"/>
        <circle cx="56" cy="50" r="2.5" fill="#FFD54F"/>
      </svg>`, ipa: '/ˈwɔː.drəʊb/', meaning: 'Tủ quần áo', sentence: 'My clothes are in the wardrobe.', hex: '#6D4C41' },
    { name: 'Telephone', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <path d="M 30 20 C 20 25 20 35 30 45 C 38 53 47 62 55 70 C 65 80 75 80 80 70 L 72 58 C 68 62 64 60 58 54 C 52 48 50 44 54 40 L 42 28 C 38 24 34 24 30 20 Z" fill="#42A5F5" stroke="#0D47A1" stroke-width="2.5"/>
      </svg>`, ipa: '/ˈtel.ɪ.fəʊn/', meaning: 'Điện thoại', sentence: 'The telephone is ringing.', hex: '#42A5F5' },
    { name: 'Fan', svg: `<svg class="svg-icon" viewBox="0 0 100 100">
        <circle cx="50" cy="45" r="5" fill="#607D8B"/>
        <ellipse cx="50" cy="25" rx="10" ry="18" fill="#81D4FA" stroke="#0288D1" stroke-width="2"/>
        <ellipse cx="30" cy="58" rx="10" ry="18" fill="#81D4FA" stroke="#0288D1" stroke-width="2" transform="rotate(-120 30 58)"/>
        <ellipse cx="70" cy="58" rx="10" ry="18" fill="#81D4FA" stroke="#0288D1" stroke-width="2" transform="rotate(120 70 58)"/>
        <rect x="46" y="45" width="8" height="45" fill="#455A64"/>
        <ellipse cx="50" cy="92" rx="20" ry="5" fill="#607D8B"/>
      </svg>`, ipa: '/fæn/', meaning: 'Quạt máy', sentence: "Turn on the fan, it's hot.", hex: '#4FC3F7' }
  ];

  /* DỮ LIỆU CÂU HỎI GAME 4 */
  const sentenceQuestions = [
    { svg: vocabList[0].svg, vietnamese: 'Chúng tôi ăn tối trên bàn.', hint: 'Chúng tôi + ăn tối + trên + cái bàn', answer: 'We eat dinner on the table' },
    { svg: vocabList[1].svg, vietnamese: 'Hãy ngồi lên ghế.', hint: 'Xin hãy + ngồi + lên + cái ghế', answer: 'Please sit on the chair' },
    { svg: vocabList[2].svg, vietnamese: 'Tôi ngủ trên giường của mình.', hint: 'Tôi + ngủ + trên + giường của tôi', answer: 'I sleep on my bed' },
    { svg: vocabList[3].svg, vietnamese: 'Hãy đóng cửa lại.', hint: 'Đóng + cánh cửa + lại', answer: 'Close the door please' },
    { svg: vocabList[4].svg, vietnamese: 'Mở cửa sổ để đón không khí trong lành.', hint: 'Mở + cửa sổ + để có + không khí trong lành', answer: 'Open the window for fresh air' },
    { svg: vocabList[5].svg, vietnamese: 'Chúng tôi xem ti vi vào buổi tối.', hint: 'Chúng tôi + xem + ti vi + vào buổi tối', answer: 'We watch television in the evening' },
    { svg: vocabList[6].svg, vietnamese: 'Hãy cất sữa vào tủ lạnh.', hint: 'Cất + sữa + vào + tủ lạnh', answer: 'Put the milk in the refrigerator' },
    { svg: vocabList[7].svg, vietnamese: 'Họ đang ngồi trên ghế sofa.', hint: 'Họ + đang ngồi + trên + ghế sofa', answer: 'They are sitting on the sofa' },
    { svg: vocabList[8].svg, vietnamese: 'Hãy bật đèn lên, trời tối rồi.', hint: "Bật + đèn + trời tối rồi", answer: "Turn on the lamp it's dark" },
    { svg: vocabList[9].svg, vietnamese: 'Cái đồng hồ ở trên tường.', hint: 'Cái đồng hồ + thì + ở trên tường', answer: 'The clock is on the wall' },
    { svg: vocabList[10].svg, vietnamese: 'Cô ấy soi gương.', hint: 'Cô ấy + nhìn + vào + gương', answer: 'She looks in the mirror' },
    { svg: vocabList[11].svg, vietnamese: 'Hãy rửa tay ở bồn rửa.', hint: 'Rửa + tay bạn + ở + bồn rửa', answer: 'Wash your hands in the sink' },
    { svg: vocabList[12].svg, vietnamese: 'Mẹ đang nấu ăn trên bếp.', hint: 'Mẹ + đang nấu ăn + trên + bếp', answer: 'Mom is cooking on the stove' },
    { svg: vocabList[13].svg, vietnamese: 'Quần áo của tôi ở trong tủ.', hint: 'Quần áo của tôi + thì + ở trong + tủ', answer: 'My clothes are in the wardrobe' },
    { svg: vocabList[14].svg, vietnamese: 'Điện thoại đang reo.', hint: 'Điện thoại + đang + reo', answer: 'The telephone is ringing' },
    { svg: vocabList[15].svg, vietnamese: 'Hãy bật quạt lên, trời nóng quá.', hint: "Bật + quạt + trời nóng quá", answer: "Turn on the fan it's hot" }
  ];

  let flashcardDeck = [];

  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = defaultSpeechRate;
      const voices = window.speechSynthesis.getVoices();
      const bestVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Samantha')));
      if (bestVoice) utterance.voice = bestVoice;
      window.speechSynthesis.speak(utterance);
    }
  }

  function renderVocabGrid() {
    const grid = document.getElementById('vocab-grid-container');
    grid.innerHTML = '';
    vocabList.forEach(item => {
      const card = document.createElement('div');
      card.className = 'vocab-card';
      card.style.background = item.hex;
      card.innerHTML = `
        <div class="image-badge-wrapper">${item.svg}</div>
        <div class="word-title">${item.name}</div>
        <div class="phonetic">${item.ipa}</div>
        <div class="meaning">${item.meaning}</div>
        <div class="example-box"><b>Ví dụ:</b> <i>"${item.sentence}"</i></div>
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
    flashcardDeck = shuffleArray(vocabList);
    renderSingleCardContent();
  }

  function changeCardWithAnimation() {
    clearTimeout(singleCardTimer);
    const cardEl = document.getElementById('single-card-el');
    if (cardEl.classList.contains('flipped')) {
      cardEl.classList.remove('flipped');
      setTimeout(() => { renderSingleCardContent(); }, 600);
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
    frontEl.style.background = 'linear-gradient(135deg, #5E35B1, #7E57C2)';
    frontEl.style.color = 'white';

    backEl.className = 'flip-card-back';
    backEl.style.background = item.hex;
    backEl.style.color = 'white';

    if(cardFrontMode === 'viet') {
      frontEl.innerHTML = `
        <div style="width:100px; height:85px; border-radius:10px; overflow:hidden; margin-bottom:6px; background:white; padding:4px; display:flex; justify-content:center; align-items:center;">${item.svg}</div>
        <h2 style="font-size: 1.3rem; margin-bottom: 2px; font-weight:800;">${item.meaning}</h2>
        <p style="font-size: 0.8rem; opacity: 0.85;">(Chạm để lật thẻ)</p>
      `;
      backEl.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 4px; font-weight:800;">${item.name}</h2>
        <p style="font-size: 1.1rem; font-weight:700;">${item.ipa}</p>
        <p style="font-size: 0.9rem; margin-top: 8px; font-style: italic;">"${item.sentence}"</p>
      `;
    } else {
      frontEl.innerHTML = `
        <h1 style="font-size: 2.2rem; margin-bottom: 8px; font-weight:800;">${item.ipa}</h1>
        <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm để xem từ vựng)</p>
      `;
      backEl.innerHTML = `
        <div style="width:100px; height:85px; border-radius:10px; overflow:hidden; margin-bottom:6px; background:white; padding:4px; display:flex; justify-content:center; align-items:center;">${item.svg}</div>
        <h1 style="font-size: 2rem; font-weight:900;">${item.name}</h1>
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
      singleCardTimer = setTimeout(() => { nextSingleCard(true); }, 3000);
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
    mcqList = shuffleArray(vocabList);
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

    previewBox.innerHTML = item.svg;

    let options = [item.name];
    let otherItems = vocabList.filter(c => c.name !== item.name);
    otherItems = shuffleArray(otherItems);
    for(let i = 0; i < 3; i++) options.push(otherItems[i].name);
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
    spellingList = shuffleArray(vocabList);
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
    preview.innerHTML = item.svg;
    input.value = '';
    input.disabled = false;
    input.focus();
    speak(item.name);
  }

  function playSpellingAudio() { speak(spellingList[spellingIdx].name); }

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
      inputEl.style.borderColor = '#E53935';
      setTimeout(() => { inputEl.style.borderColor = '#B39DDB'; }, 1000);
    }
  }

  /* GAME 4: VIẾT CÂU */
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
    feedback.style.color = '#311B92';
    input.value = '';
    input.disabled = false;
    input.style.borderColor = '#B39DDB';
    input.focus();

    container.innerHTML = `
      <div style="width:110px; height:90px; border-radius:12px; overflow:hidden; box-shadow:0 4px 8px rgba(0,0,0,0.1); background:white; padding:6px; display:flex; align-items:center; justify-content:center;">${item.svg}</div>
      <div style="font-size: 1.3rem; font-weight: 800; color: #4527A0;">"${item.vietnamese}"</div>
      <div style="font-size: 0.9rem; font-weight: 600; color: #311B92; background: #EDE7F6; padding: 4px 12px; border-radius: 8px;">💡 Cấu trúc gợi ý: ${item.hint}</div>
    `;
  }

  function normalizeSentence(str) {
    return str.toLowerCase().replace(/[.,?!]/g, '').replace(/\s+/g, ' ').trim();
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
      setTimeout(() => { inputEl.style.borderColor = '#B39DDB'; }, 1200);
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
    document.getElementById('spelling-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') checkSpelling(); });
    document.getElementById('count-sentence-input').addEventListener('keydown', (e) => { if (e.key === 'Enter') checkCountSentence(); });
  });
