/* CẤU HÌNH TỐC ĐỘ ĐỌC: 0.3 */
  const defaultSpeechRate = 0.6;

  /* WEBAUDIO API FOR SOUND EFFECTS */
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

  /* DỮ LIỆU TỪ VỰNG THỨ & THÁNG */
  const daysAndMonthsVocab = [
    { num: 'Mon', name: 'Monday', ipa: '/ˈmʌndeɪ/', meaning: 'Thứ Hai', hex: '#3182CE', category: 'day' },
    { num: 'Tue', name: 'Tuesday', ipa: '/ˈtjuːzdeɪ/', meaning: 'Thứ Ba', hex: '#ED8936', category: 'day' },
    { num: 'Wed', name: 'Wednesday', ipa: '/ˈwɛnzdeɪ/', meaning: 'Thứ Tư', hex: '#38A169', category: 'day' },
    { num: 'Thu', name: 'Thursday', ipa: '/ˈθɜːzdeɪ/', meaning: 'Thứ Năm', hex: '#9F7AEA', category: 'day' },
    { num: 'Fri', name: 'Friday', ipa: '/ˈfraɪdeɪ/', meaning: 'Thứ Sáu', hex: '#ED64A6', category: 'day' },
    { num: 'Sat', name: 'Saturday', ipa: '/ˈsætədeɪ/', meaning: 'Thứ Bảy', hex: '#E53E3E', category: 'day' },
    { num: 'Sun', name: 'Sunday', ipa: '/ˈsʌndeɪ/', meaning: 'Chủ Nhật', hex: '#ECC94B', category: 'day' },
    
    { num: 'Jan', name: 'January', ipa: '/ˈdʒænjʊəri/', meaning: 'Tháng 1', hex: '#4A90E2', category: 'month' },
    { num: 'Feb', name: 'February', ipa: '/ˈfɛbrʊəri/', meaning: 'Tháng 2', hex: '#319795', category: 'month' },
    { num: 'Mar', name: 'March', ipa: '/mɑːtʃ/', meaning: 'Tháng 3', hex: '#DD6B20', category: 'month' },
    { num: 'Apr', name: 'April', ipa: '/ˈeɪprəl/', meaning: 'Tháng 4', hex: '#2B6CB0', category: 'month' },
    { num: 'May', name: 'May', ipa: '/meɪ/', meaning: 'Tháng 5', hex: '#2F855A', category: 'month' },
    { num: 'Jun', name: 'June', ipa: '/dʒuːn/', meaning: 'Tháng 6', hex: '#805AD5', category: 'month' },
    { num: 'Jul', name: 'July', ipa: '/dʒuːˈlaɪ/', meaning: 'Tháng 7', hex: '#C53030', category: 'month' },
    { num: 'Aug', name: 'August', ipa: '/ɔːˈɡʌst/', meaning: 'Tháng 8', hex: '#D69E2E', category: 'month' },
    { num: 'Sep', name: 'September', ipa: '/sɛpˈtɛmbə/', meaning: 'Tháng 9', hex: '#3182CE', category: 'month' },
    { num: 'Oct', name: 'October', ipa: '/ɒkˈtəʊbə/', meaning: 'Tháng 10', hex: '#ED8936', category: 'month' },
    { num: 'Nov', name: 'November', ipa: '/nəʊˈvɛmbə/', meaning: 'Tháng 11', hex: '#38A169', category: 'month' },
    { num: 'Dec', name: 'December', ipa: '/dɪˈsɛmbə/', meaning: 'Tháng 12', hex: '#9F7AEA', category: 'month' }
  ];

  /* DỮ LIỆU GAME 4: BỘ ĐỀ 50 CÂU HỎI */
  const dateQuestions = [
    { main: 'T.2', sub: 'Thứ Hai', target: 'Monday', answer: 'It is Monday' },
    { main: 'T.3', sub: 'Thứ Ba', target: 'Tuesday', answer: 'It is Tuesday' },
    { main: 'T.4', sub: 'Thứ Tư', target: 'Wednesday', answer: 'It is Wednesday' },
    { main: 'T.5', sub: 'Thứ Năm', target: 'Thursday', answer: 'It is Thursday' },
    { main: 'T.6', sub: 'Thứ Sáu', target: 'Friday', answer: 'It is Friday' },
    { main: 'T.7', sub: 'Thứ Bảy', target: 'Saturday', answer: 'It is Saturday' },
    { main: 'C.N', sub: 'Chủ Nhật', target: 'Sunday', answer: 'It is Sunday' },
    { main: 'T.2', sub: 'Đầu tuần', target: 'Monday', answer: 'It is Monday' },
    { main: 'T.3', sub: 'Ngày thứ 3 trong tuần', target: 'Tuesday', answer: 'It is Tuesday' },
    { main: 'T.4', sub: 'Giữa tuần', target: 'Wednesday', answer: 'It is Wednesday' },
    { main: 'T.5', sub: 'Thứ 5', target: 'Thursday', answer: 'It is Thursday' },
    { main: 'T.6', sub: 'Cuối tuần làm việc', target: 'Friday', answer: 'It is Friday' },
    { main: 'T.7', sub: 'Ngày nghỉ', target: 'Saturday', answer: 'It is Saturday' },
    { main: 'C.N', sub: 'Cuối tuần', target: 'Sunday', answer: 'It is Sunday' },

    { main: '01/01', sub: 'Ngày 1 tháng 1', target: 'January 1st', answer: 'It is January 1st' },
    { main: '14/02', sub: 'Ngày 14 tháng 2', target: 'February 14th', answer: 'It is February 14th' },
    { main: '08/03', sub: 'Ngày 8 tháng 3', target: 'March 8th', answer: 'It is March 8th' },
    { main: '30/04', sub: 'Ngày 30 tháng 4', target: 'April 30th', answer: 'It is April 30th' },
    { main: '01/05', sub: 'Ngày 1 tháng 5', target: 'May 1st', answer: 'It is May 1st' },
    { main: '01/06', sub: 'Ngày 1 tháng 6', target: 'June 1st', answer: 'It is June 1st' },
    { main: '04/07', sub: 'Ngày 4 tháng 7', target: 'July 4th', answer: 'It is July 4th' },
    { main: '15/08', sub: 'Ngày 15 tháng 8', target: 'August 15th', answer: 'It is August 15th' },
    { main: '02/09', sub: 'Ngày 2 tháng 9', target: 'September 2nd', answer: 'It is September 2nd' },
    { main: '20/10', sub: 'Ngày 20 tháng 10', target: 'October 20th', answer: 'It is October 20th' },
    { main: '20/11', sub: 'Ngày 20 tháng 11', target: 'November 20th', answer: 'It is November 20th' },
    { main: '25/12', sub: 'Ngày 25 tháng 12', target: 'December 25th', answer: 'It is December 25th' },
    { main: '02/01', sub: 'Ngày 2 tháng 1', target: 'January 2nd', answer: 'It is January 2nd' },
    { main: '03/02', sub: 'Ngày 3 tháng 2', target: 'February 3rd', answer: 'It is February 3rd' },
    { main: '04/03', sub: 'Ngày 4 tháng 3', target: 'March 4th', answer: 'It is March 4th' },
    { main: '05/04', sub: 'Ngày 5 tháng 4', target: 'April 5th', answer: 'It is April 5th' },
    { main: '10/05', sub: 'Ngày 10 tháng 5', target: 'May 10th', answer: 'It is May 10th' },
    { main: '12/06', sub: 'Ngày 12 tháng 6', target: 'June 12th', answer: 'It is June 12th' },
    { main: '21/07', sub: 'Ngày 21 tháng 7', target: 'July 21st', answer: 'It is July 21st' },
    { main: '22/08', sub: 'Ngày 22 tháng 8', target: 'August 22nd', answer: 'It is August 22nd' },
    { main: '23/09', sub: 'Ngày 23 tháng 9', target: 'September 23rd', answer: 'It is September 23rd' },
    { main: '31/10', sub: 'Ngày 31 tháng 10', target: 'October 31st', answer: 'It is October 31st' },
    { main: '11/11', sub: 'Ngày 11 tháng 11', target: 'November 11th', answer: 'It is November 11th' },
    { main: '31/12', sub: 'Ngày 31 tháng 12', target: 'December 31st', answer: 'It is December 31st' },
    { main: '05/01', sub: 'Ngày 5 tháng 1', target: 'January 5th', answer: 'It is January 5th' },
    { main: '10/02', sub: 'Ngày 10 tháng 2', target: 'February 10th', answer: 'It is February 10th' },
    { main: '15/03', sub: 'Ngày 15 tháng 3', target: 'March 15th', answer: 'It is March 15th' },
    { main: '18/04', sub: 'Ngày 18 tháng 4', target: 'April 18th', answer: 'It is April 18th' },
    { main: '19/05', sub: 'Ngày 19 tháng 5', target: 'May 19th', answer: 'It is May 19th' },
    { main: '20/06', sub: 'Ngày 20 tháng 6', target: 'June 20th', answer: 'It is June 20th' },
    { main: '27/07', sub: 'Ngày 27 tháng 7', target: 'July 27th', answer: 'It is July 27th' },
    { main: '08/08', sub: 'Ngày 8 tháng 8', target: 'August 8th', answer: 'It is August 8th' },
    { main: '09/09', sub: 'Ngày 9 tháng 9', target: 'September 9th', answer: 'It is September 9th' },
    { main: '10/10', sub: 'Ngày 10 tháng 10', target: 'October 10th', answer: 'It is October 10th' },
    { main: '15/11', sub: 'Ngày 15 tháng 11', target: 'November 15th', answer: 'It is November 15th' },
    { main: '24/12', sub: 'Ngày 24 tháng 12', target: 'December 24th', answer: 'It is December 24th' }
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
    daysAndMonthsVocab.forEach(item => {
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
          <b>Ví dụ:</b> <i>"${item.category === 'day' ? 'See you on ' + item.name : 'My birthday is in ' + item.name}."</i>
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

  function initSingleCardGame() {
    singleCardIdx = 0;
    flashcardDeck = shuffleArray(daysAndMonthsVocab);
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

    frontEl.innerHTML = `
      <h1 style="font-size: 2.8rem; margin-bottom: 4px; font-weight:900;">${item.meaning}</h1>
      <p style="font-size: 0.85rem; opacity: 0.85;">(Chạm vào thẻ để lật)</p>
    `;
    backEl.innerHTML = `
      <h2 style="font-size: 2.2rem; margin-bottom: 4px; font-weight:800;">${item.name}</h2>
      <p style="font-size: 1.1rem; font-weight:700;">${item.ipa}</p>
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
  let mcqList = [];

  function initMcqGame() {
    mcqList = shuffleArray(daysAndMonthsVocab);
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

    previewBox.innerText = item.meaning;

    let options = [item.name];
    let otherItems = daysAndMonthsVocab.filter(c => c.name !== item.name);
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

  /* GAME 3: CHÍNH TẢ (BỔ SUNG BẤM ĐÁP ÁN & HIỂN THỊ KHI SAI) */
  let spellingIdx = 0;
  let spellingTimer = null;
  let spellingList = [];
  let spellingCorrectCount = 0;

  function initSpellingGame() {
    spellingList = shuffleArray(daysAndMonthsVocab);
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
    const feedback = document.getElementById('spelling-feedback');

    preview.innerText = item.meaning;
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
      feedback.innerText = '🎉 Chính xác!';
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

  /* GAME 4: BỔ SUNG NÚT XEM ĐÁP ÁN VÀ HIỂN THỊ KHI SAI */
  let countIdx = 0;
  let countTimer = null;
  let countList = [];
  let countCorrectCount = 0;

  function initCountGame() {
    countList = shuffleArray(dateQuestions);
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
    const mainBox = document.getElementById('calendar-main-display');
    const subBox = document.getElementById('calendar-sub-display');
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

    mainBox.innerText = item.main;
    subBox.innerText = item.sub;
  }

  function normalizeText(str) {
    return str.toLowerCase()
              .replace(/’/g, "'")
              .replace(/[.,?!]/g, '')
              .replace(/\s+/g, ' ')
              .trim();
  }

  function checkCountSentence() {
    const item = countList[countIdx];
    const inputEl = document.getElementById('count-sentence-input');
    const feedback = document.getElementById('count-feedback');
    const userInput = normalizeText(inputEl.value);
    
    const targetVal = normalizeText(item.target);
    const validAnswers = [
      normalizeText(`It is ${targetVal}`),
      normalizeText(`It's ${targetVal}`),
      normalizeText(`Today is ${targetVal}`),
      normalizeText(`Today's ${targetVal}`),
      targetVal
    ];

    if (validAnswers.includes(userInput)) {
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
    }
  }

  function revealCountAnswer() {
    const item = countList[countIdx];
    const feedback = document.getElementById('count-feedback');
    const inputEl = document.getElementById('count-sentence-input');

    feedback.style.color = '#DD6B20';
    feedback.innerText = `💡 Đáp án: ${item.answer} (hoặc It's ${item.target})`;
    inputEl.value = item.answer;
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
