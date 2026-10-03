/* Shared learning state and Game 1–3 interface for grade topics. */
(() => {
  'use strict';

  const DELAY = 1000;
  const shuffle = values => {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  const searchText = value => String(value).toLowerCase().normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');

  class LearningState {
    constructor(topic, words, storage, now = () => Date.now(), initialCardMode = 'viet') {
      this.key = `danh.learning.${topic}.v1`;
      this.ids = words.map(word => word.id);
      this.storage = storage;
      this.now = now;
      this.initialCardMode = initialCardMode;
      this.storageAvailable = true;
      this.state = { version: 1, selected: [...this.ids], best: { mcq: 0, spelling: 0 }, history: [], rounds: {}, cards: null };
      try {
        const saved = JSON.parse(storage.getItem(this.key) || 'null');
        if (saved?.version !== 1 || !this.validDeck(saved.selected)) return;
        this.state.selected = [...saved.selected];
        if (['game-flip', 'game-mcq', 'game-spelling'].includes(saved.lastTab)) this.state.lastTab = saved.lastTab;
        for (const game of ['mcq', 'spelling']) {
          const best = saved.best?.[game];
          if (Number.isInteger(best) && best >= 0 && best <= this.ids.length) this.state.best[game] = best;
          if (this.validRound(saved.rounds?.[game])) this.state.rounds[game] = saved.rounds[game];
        }
        if (Array.isArray(saved.history)) this.state.history = saved.history.filter(entry =>
          entry && typeof entry.id === 'string' && ['mcq', 'spelling'].includes(entry.game) &&
          Number.isFinite(entry.completedAt) && Number.isInteger(entry.total) && entry.total > 0 && entry.total <= this.ids.length &&
          Number.isInteger(entry.score) && entry.score >= 0 && entry.score <= entry.total * 14 &&
          Number.isInteger(entry.firstTry) && entry.firstTry >= 0 && entry.firstTry <= entry.total &&
          Number.isInteger(entry.peak) && entry.peak >= 0 && entry.peak <= entry.total
        ).slice(-50);
        const cards = saved.cards;
        if (cards && this.sameSelection(cards.deck) && Number.isInteger(cards.index) && cards.index >= 0 && cards.index < cards.deck.length) {
          this.state.cards = {
            deck: cards.deck, index: cards.index, mode: ['viet', 'ipa', 'picture'].includes(cards.mode) ? cards.mode : 'viet',
            seen: Array.isArray(cards.seen) ? [...new Set(cards.seen.filter(id => cards.deck.includes(id)))] : []
          };
        }
      } catch { /* Damaged or blocked storage starts a fresh local session. */ }
    }
    validDeck(ids) {
      return Array.isArray(ids) && ids.length > 0 && ids.length <= this.ids.length &&
        new Set(ids).size === ids.length && ids.every(id => this.ids.includes(id));
    }
    sameSelection(deck) {
      return this.validDeck(deck) && deck.length === this.state.selected.length &&
        deck.every(id => this.state.selected.includes(id));
    }
    validRound(round) {
      if (!round || typeof round.id !== 'string' || !this.sameSelection(round.deck) ||
          !Number.isInteger(round.index) || round.index < 0 || round.index > round.deck.length ||
          !Array.isArray(round.answers) || round.answers.length !== round.deck.length) return false;
      return round.answers.every((answer, index) => answer && typeof answer.solved === 'boolean' &&
        Number.isInteger(answer.mistakes) && answer.mistakes >= 0 && Number.isFinite(answer.solvedAt) &&
        Array.isArray(answer.wrongChoices) && answer.wrongChoices.every(id => round.deck.includes(id)) &&
        (index >= round.index || answer.solved) && (index <= round.index || !answer.solved));
    }
    save() {
      try { this.storage.setItem(this.key, JSON.stringify(this.state)); this.storageAvailable = true; }
      catch { this.storageAvailable = false; }
    }
    select(ids) {
      if (!this.validDeck(ids)) return false;
      this.state.selected = [...ids];
      this.state.rounds = {};
      this.state.cards = null;
      this.save();
      return true;
    }
    newRound(game) {
      const deck = shuffle(this.state.selected);
      const round = {
        id: globalThis.crypto?.randomUUID?.() || `${this.now()}-${Math.random().toString(36).slice(2)}`,
        deck, index: 0,
        answers: deck.map(() => ({ solved: false, mistakes: 0, wrongChoices: [], solvedAt: 0 }))
      };
      this.state.rounds[game] = round;
      this.save();
      return round;
    }
    round(game) { return this.state.rounds[game] || this.newRound(game); }
    cards() {
      if (!this.state.cards) {
        this.state.cards = { deck: shuffle(this.state.selected), index: 0, mode: this.initialCardMode, seen: [] };
        this.save();
      }
      return this.state.cards;
    }
    totals(round) {
      let score = 0, streak = 0, peak = 0, firstTry = 0, completed = 0;
      for (const answer of round.answers) {
        if (answer.mistakes) streak = 0;
        if (!answer.solved) continue;
        completed++;
        if (!answer.mistakes) {
          firstTry++;
          streak++;
          score += 10 + (streak % 5 === 0 ? 20 : 0);
          peak = Math.max(peak, streak);
        }
      }
      return { score, streak, peak, firstTry, completed };
    }
    answer(game, correct, wrongChoice = null) {
      const round = this.round(game), answer = round.answers[round.index];
      if (!answer || answer.solved) return null;
      if (!correct && wrongChoice !== null && answer.wrongChoices.includes(wrongChoice)) return null;
      const before = this.totals(round).score;
      if (correct) { answer.solved = true; answer.solvedAt = this.now(); }
      else {
        answer.mistakes++;
        if (wrongChoice !== null) answer.wrongChoices.push(wrongChoice);
      }
      const totals = this.totals(round);
      this.state.best[game] = Math.max(this.state.best[game], totals.peak);
      this.save();
      return { ...totals, earned: totals.score - before };
    }
    reveal(game) {
      const round = this.round(game), answer = round.answers[round.index];
      if (!answer || answer.solved) return false;
      answer.solved = true;
      answer.revealed = true;
      answer.mistakes = Math.max(1, answer.mistakes);
      answer.solvedAt = this.now();
      this.save();
      return true;
    }
    advance(game) {
      const round = this.round(game), answer = round.answers[round.index];
      if (!answer?.solved || this.now() < answer.solvedAt + DELAY) return false;
      round.index++;
      if (round.index === round.deck.length && !this.state.history.some(entry => entry.id === round.id)) {
        const totals = this.totals(round);
        this.state.history.push({ id: round.id, game, completedAt: this.now(), total: round.deck.length,
          score: totals.score, firstTry: totals.firstTry, peak: totals.peak });
        this.state.history = this.state.history.slice(-50);
      }
      this.save();
      return true;
    }
  }

  // Small, local illustrations replace misleading emoji in Game 1–3.
  const svg = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true">${body}</svg>`;
  const illustrations = {
    fruits: {
      Papaya: svg('<ellipse cx="59" cy="62" rx="38" ry="52" fill="#f2a23a" stroke="#549846" stroke-width="5"/><ellipse cx="59" cy="64" rx="16" ry="34" fill="#f8c75d"/><ellipse cx="59" cy="64" rx="10" ry="28" fill="#493123"/><g fill="#211810"><circle cx="55" cy="44" r="2"/><circle cx="63" cy="51" r="2"/><circle cx="54" cy="62" r="2"/><circle cx="64" cy="72" r="2"/><circle cx="55" cy="82" r="2"/></g>'),
      Guava: svg('<ellipse cx="60" cy="62" rx="45" ry="39" fill="#86ba60" stroke="#528d42" stroke-width="5"/><ellipse cx="60" cy="63" rx="33" ry="28" fill="#f7e4cb"/><ellipse cx="60" cy="64" rx="23" ry="19" fill="#e996a0"/><g fill="#fbeac7"><circle cx="49" cy="61" r="2"/><circle cx="58" cy="55" r="2"/><circle cx="68" cy="63" r="2"/><circle cx="58" cy="73" r="2"/></g><path d="M60 23q4-11 15-12" fill="none" stroke="#528d42" stroke-width="5"/>')
    },
    schoolsupplies: {
      'School bag': svg('<path d="M42 31V24q0-12 18-12t18 12v7" fill="none" stroke="#554877" stroke-width="7"/><rect x="20" y="28" width="80" height="78" rx="12" fill="#8e77c4" stroke="#554877" stroke-width="4"/><path d="M21 55h78" stroke="#554877" stroke-width="4"/><rect x="43" y="53" width="34" height="28" rx="5" fill="#d8b667" stroke="#92712c" stroke-width="3"/><rect x="55" y="47" width="10" height="13" rx="2" fill="#f8e2a9"/>'),
      Glue: svg('<rect x="38" y="32" width="44" height="75" rx="6" fill="#f8f4e9" stroke="#64738d" stroke-width="4"/><rect x="42" y="48" width="36" height="36" rx="3" fill="#73b7e4"/><path d="M45 20h30l4 13H41Z" fill="#df674f" stroke="#8a3b32" stroke-width="3"/><path d="M49 11h22v9H49Z" fill="#d9dfe9"/><text x="60" y="70" text-anchor="middle" fill="#204e71" font-size="14" font-weight="700">GLUE</text>'),
      Eraser: svg('<path d="M16 75 68 27q7-6 14 0l25 25q6 7 0 14L57 111H36L16 91q-6-7 0-16Z" fill="#f9a8b9" stroke="#91536c" stroke-width="4"/><path d="m46 47 43 43-32 21H36L16 91Z" fill="#80b7e5" stroke="#526d9d" stroke-width="3"/><path d="m46 47 43 43" stroke="#fff" stroke-width="4"/>'),
      'Pencil case': svg('<rect x="13" y="38" width="94" height="57" rx="13" fill="#67b6d2" stroke="#2e647b" stroke-width="4"/><path d="M17 53h86" stroke="#29495f" stroke-width="5"/><path d="M33 55h46" stroke="#fff" stroke-width="3" stroke-dasharray="5 4"/><rect x="77" y="47" width="10" height="15" rx="2" fill="#f3cf66"/>'),
      Blackboard: svg('<rect x="10" y="12" width="100" height="75" rx="4" fill="#775637"/><rect x="18" y="19" width="84" height="60" rx="2" fill="#263d3c"/><path d="M32 29h42M32 41h29" stroke="#e5ebdf" stroke-width="3"/><path d="M27 87v25m66-25v25" stroke="#775637" stroke-width="7"/>'),
      Globe: svg('<circle cx="60" cy="46" r="35" fill="#73bce3" stroke="#2d6890" stroke-width="4"/><path d="M30 40q16-19 27-14l10 11-8 12-18 3-8 18" fill="#6bb36c"/><path d="M67 56q19-13 28-1L78 77 62 69Z" fill="#6bb36c"/><path d="M60 82v20m-25 0h50" stroke="#465d70" stroke-width="6" fill="none"/>'),
      Compass: svg('<circle cx="61" cy="21" r="8" fill="#718aa1" stroke="#344b60" stroke-width="4"/><path d="M58 29 34 101m30-72 24 72" fill="none" stroke="#586e83" stroke-width="9" stroke-linecap="round"/><path d="m30 102 4 11 5-11m44 0 5 11 4-11" fill="#d8964a" stroke="#674522" stroke-width="2"/><path d="M23 104h75" stroke="#7899ad" stroke-width="3"/>'),
      Stapler: svg('<path d="M20 84h80q7 0 7 7v11H13V91q0-7 7-7Z" fill="#6a7887" stroke="#33475c" stroke-width="4"/><path d="M18 67 88 46q12-4 17 5l3 9-81 28Z" fill="#4d91c5" stroke="#2d5d86" stroke-width="4"/><circle cx="94" cy="82" r="5" fill="#34475a"/>'),
      Highlighter: svg('<path d="m30 22 60 9-11 55-58-10Z" fill="#f4e455" stroke="#8c8128" stroke-width="4"/><path d="m21 76 58 10-5 15-54-9Z" fill="#777f87"/><path d="m29 96 43 8-12 10-29-5Z" fill="#e9d150" stroke="#635b24" stroke-width="3"/><path d="m45 36 27 4" stroke="#fff6ae" stroke-width="6"/>'),
      Protractor: svg('<path d="M11 96a49 49 0 0 1 98 0Z" fill="#9ed8e6" fill-opacity=".75" stroke="#407b90" stroke-width="5"/><path d="M42 96a18 18 0 0 1 36 0" fill="none" stroke="#407b90" stroke-width="3"/><path d="M60 48v13m-23-7 6 10m-22 6 11 6m51-22-6 10m22 6-11 6" stroke="#407b90" stroke-width="3"/><circle cx="60" cy="96" r="4" fill="#407b90"/>')
    },
    ...(window.DanhScenes || {})
  };
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  function calendarVisual(name) {
    const day = dayNames.indexOf(name), month = monthNames.indexOf(name);
    if (day < 0 && month < 0) return null;
    const header = day >= 0 ? 'THỨ' : 'THÁNG';
    const number = day >= 0 ? (day + 2) % 8 || 'CN' : month + 1;
    return svg(`<rect x="12" y="16" width="96" height="94" rx="10" fill="#fff" stroke="#6685a1" stroke-width="4"/><path d="M12 27q0-11 10-11h76q10 0 10 11v24H12Z" fill="#e25c62"/><circle cx="33" cy="16" r="5" fill="#475b6c"/><circle cx="87" cy="16" r="5" fill="#475b6c"/><text x="60" y="42" text-anchor="middle" fill="#fff" font-size="17" font-weight="700">${header}</text><text x="60" y="93" text-anchor="middle" fill="#2e526e" font-size="43" font-weight="800">${number}</text>`);
  }

  function mount({ topic, words, speechLocale = 'en-US', onSelectionChange,
    mcqMode = 'name-choice', onResult, revealSpellingAfterMs = 0, initialCardMode = 'viet', cardRevealMs = DELAY }) {
    if (!/^[a-z0-9]+$/.test(topic) || !Array.isArray(words) || words.length < 1 ||
        words.some(word => !word.name || !word.meaning || typeof word.id !== 'string' || !word.id)) return;
    const byId = new Map(words.map(word => [word.id, word]));
    if (byId.size !== words.length) return;
    const vocabularyGrid = document.getElementById('vocab-grid-container');
    if (vocabularyGrid && (illustrations[topic] || topic === 'dates')) {
      words.forEach((word, index) => {
        const picture = vocabularyGrid.children[index]?.querySelector('.number-display, .emoji-display');
        const art = word.photo || illustrations[topic]?.[word.name] || (topic === 'dates' ? calendarVisual(word.name) : null);
        if (picture && art) {
          picture.innerHTML = art;
          picture.classList.add('learning-vocab-picture');
        }
      });
    }
    let storage;
    try { storage = (window.DanhLearners?.storage || window.localStorage); }
    catch { storage = { getItem: () => null, setItem: () => { throw Error('Storage blocked'); } }; }
    const learning = new LearningState(topic, words, storage, () => Date.now(), initialCardMode);
    const originalSwitchTab = window.switchTab;
    let active = null, timer = null, revealTimer = null, draft = new Set();
    let scheduleToken = 0, finishCurrentSpeech = null;
    const el = id => document.getElementById(id);
    const cancel = () => { clearTimeout(timer); clearTimeout(revealTimer); timer = revealTimer = null; scheduleToken++; };
    const stopSpeech = () => {
      if (finishCurrentSpeech) finishCurrentSpeech();
      try { window.speechSynthesis?.cancel(); } catch { /* Audio is optional. */ }
    };
    const speakWord = word => {
      stopSpeech();
      if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') return Promise.resolve();
      return new Promise(resolve => {
        let finished = false;
        const timeout = setTimeout(finish, 8000);
        function finish() {
          if (finished) return;
          finished = true;
          clearTimeout(timeout);
          if (finishCurrentSpeech === finish) finishCurrentSpeech = null;
          resolve();
        }
        finishCurrentSpeech = finish;
        try {
          const utterance = new SpeechSynthesisUtterance(word.name);
          utterance.lang = speechLocale;
          utterance.rate = 0.6;
          const voices = window.speechSynthesis.getVoices();
          const voice = voices.find(item => item.lang.replace('_', '-').toLowerCase() === speechLocale.toLowerCase() &&
            (item.name.includes('Natural') || item.name.includes('Google') || item.name.includes('Samantha'))) ||
            voices.find(item => item.lang.replace('_', '-').toLowerCase() === speechLocale.toLowerCase()) ||
            voices.find(item => item.lang.toLowerCase().startsWith('en'));
          if (voice) utterance.voice = voice;
          utterance.onend = finish;
          utterance.onerror = finish;
          window.speechSynthesis.speak(utterance);
        } catch { finish(); }
      });
    };
    let audioContext = null;
    const sound = kind => {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        if (!audioContext) audioContext = new AudioContextClass();
        if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
        const oscillator = audioContext.createOscillator(), gain = audioContext.createGain();
        oscillator.connect(gain); gain.connect(audioContext.destination);
        const now = audioContext.currentTime;
        if (kind === 'correct') {
          oscillator.type = 'triangle';
          [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) =>
            oscillator.frequency.setValueAtTime(frequency, now + index * 0.1));
          gain.gain.setValueAtTime(0.3, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          oscillator.start(now); oscillator.stop(now + 0.6);
        } else {
          oscillator.type = 'sawtooth';
          oscillator.frequency.setValueAtTime(180, now);
          oscillator.frequency.setValueAtTime(130, now + 0.15);
          gain.gain.setValueAtTime(0.2, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          oscillator.start(now); oscillator.stop(now + 0.4);
        }
      } catch { /* Sound effects never block learning. */ }
    };
    const visual = (container, word) => {
      const value = word.photo || illustrations[topic]?.[word.name] || (topic === 'dates' ? calendarVisual(word.name) : null) ||
        String(word.visual ?? word.name);
      container.setAttribute('role', 'img');
      container.setAttribute('aria-label', word.meaning);
      if (value.trimStart().startsWith('<svg')) container.innerHTML = value;
      else container.textContent = value;
    };
    const setText = (parent, selector, value) => { parent.querySelector(selector).textContent = value; };
    const titles = { 'game-flip': 'Game 1 · Flashcard', 'game-mcq': 'Game 2 · Trắc nghiệm', 'game-spelling': 'Game 3 · Chính tả' };

    for (const tab of Object.keys(titles)) {
      const section = el(tab);
      if (!section) return;
      section.innerHTML = `<div class="learning-panel">
        <h2>${titles[tab]}</h2>
        <div class="learning-toolbar"><button type="button" class="learning-pick">⚙️ Chọn từ luyện tập</button>
          <span class="learning-storage"></span></div>
        <div class="learning-stage"></div><p class="learning-feedback" role="status" aria-live="polite"></p>
        <details class="learning-history"><summary>Lịch sử lượt học</summary><ol></ol></details>
      </div>`;
      section.querySelector('.learning-pick').addEventListener('click', openPicker);
    }
    const dialog = document.createElement('dialog');
    dialog.className = 'learning-picker';
    dialog.innerHTML = `<form method="dialog"><h2>Chọn từ luyện tập</h2>
      <p>Bộ từ này dùng chung cho Game ${onSelectionChange ? '1–4' : '1–3'}. Game 2 cần ít nhất 2 từ.</p>
      <label>Tìm từ tiếng Anh hoặc tiếng Việt <input class="learning-search" type="search" autocomplete="off"></label>
      <div class="learning-picker-actions"><button type="button" class="learning-all">Chọn tất cả</button>
        <button type="button" class="learning-none">Bỏ chọn</button><span class="learning-count"></span></div>
      <div class="learning-choices"></div><p class="learning-picker-hint"></p>
      <div class="learning-picker-actions"><button type="button" class="learning-apply">Áp dụng</button>
        <button type="button" class="learning-cancel">Hủy</button></div></form>`;
    document.body.append(dialog);
    dialog.querySelector('.learning-search').addEventListener('input', renderPicker);
    dialog.querySelector('.learning-all').addEventListener('click', () => { draft = new Set(words.map(word => word.id)); renderPicker(); });
    dialog.querySelector('.learning-none').addEventListener('click', () => { draft.clear(); renderPicker(); });
    dialog.querySelector('.learning-cancel').addEventListener('click', () => dialog.close());
    dialog.querySelector('.learning-apply').addEventListener('click', () => {
      const ids = words.filter(word => draft.has(word.id)).map(word => word.id);
      if (!learning.select(ids)) return;
      onSelectionChange?.([...learning.state.selected], true);
      cancel(); stopSpeech(); dialog.close();
    });
    dialog.addEventListener('close', () => { if (active) renderActive(); });

    function openPicker() {
      cancel(); stopSpeech(); draft = new Set(learning.state.selected);
      dialog.querySelector('.learning-search').value = '';
      renderPicker(); dialog.showModal(); dialog.querySelector('.learning-search').focus();
    }
    function renderPicker() {
      const query = searchText(dialog.querySelector('.learning-search').value.trim());
      const list = dialog.querySelector('.learning-choices'); list.replaceChildren();
      for (const word of words.filter(item => searchText(`${item.name} ${item.meaning}`).includes(query))) {
        const label = document.createElement('label'); label.className = 'learning-choice';
        const check = document.createElement('input'); check.type = 'checkbox'; check.checked = draft.has(word.id);
        check.addEventListener('change', () => { check.checked ? draft.add(word.id) : draft.delete(word.id); pickerCount(); });
        const image = document.createElement('span'); image.className = 'learning-choice-visual'; visual(image, word);
        const text = document.createElement('span');
        const name = document.createElement('strong'); name.textContent = word.name;
        const meaning = document.createElement('small'); meaning.textContent = word.meaning;
        text.append(name, meaning); label.append(check, image, text); list.append(label);
      }
      pickerCount();
    }
    function pickerCount() {
      dialog.querySelector('.learning-count').textContent = `Đã chọn ${draft.size} / ${words.length} từ`;
      dialog.querySelector('.learning-apply').disabled = draft.size === 0;
      dialog.querySelector('.learning-picker-hint').textContent = draft.size === 1
        ? 'Bộ 1 từ dùng được ở Game 1 và 3.' : 'Game 2 hiển thị tối đa 4 lựa chọn từ bộ đã chọn.';
    }
    function panel() { return el(active).querySelector('.learning-panel'); }
    function feedback(message = '', kind = '') {
      const box = panel().querySelector('.learning-feedback');
      box.textContent = message; box.dataset.kind = kind;
    }
    function toolbar() {
      const area = panel();
      area.querySelector('.learning-pick').textContent = `⚙️ Chọn từ luyện tập · ${learning.state.selected.length} từ`;
      area.querySelector('.learning-storage').textContent = learning.storageAvailable
        ? 'Tiến độ lưu trên thiết bị này.' : 'Không lưu được tiến độ; bạn vẫn có thể học trong phiên này.';
      const history = area.querySelector('.learning-history ol'); history.replaceChildren();
      for (const entry of learning.state.history.slice(-10).reverse()) {
        const item = document.createElement('li');
        item.textContent = `${entry.game === 'mcq' ? 'Trắc nghiệm' : 'Chính tả'} · ${entry.score} điểm · ${entry.firstTry}/${entry.total} đúng lần đầu`;
        history.append(item);
      }
      if (!history.children.length) {
        const item = document.createElement('li'); item.textContent = 'Chưa có lượt hoàn thành.'; history.append(item);
      }
    }
    function show(tab, event) {
      cancel(); stopSpeech();
      learning.state.lastTab = tab;
      learning.save();
      if (!titles[tab]) {
        active = null;
        originalSwitchTab(tab, event);
        return;
      }
      originalSwitchTab('vocab'); // Cancels each page's original timers, including Game 4.
      document.querySelectorAll('.tab-content').forEach(node => node.classList.remove('active'));
      document.querySelectorAll('nav .nav-btn').forEach(node => { node.classList.remove('active'); node.setAttribute('aria-pressed', 'false'); });
      el(tab).classList.add('active');
      if (event?.currentTarget) { event.currentTarget.classList.add('active'); event.currentTarget.setAttribute('aria-pressed', 'true'); }
      active = tab; renderActive();
    }
    window.switchTab = show;

    function renderActive() {
      if (!active || dialog.open) return;
      toolbar();
      if (active === 'game-flip') renderCards();
      if (active === 'game-mcq') renderQuestion('mcq');
      if (active === 'game-spelling') renderQuestion('spelling');
    }
    function progress(text) {
      const line = document.createElement('p'); line.className = 'learning-progress'; line.textContent = text; return line;
    }
    function button(text, action, className = '') {
      const control = document.createElement('button'); control.type = 'button'; control.textContent = text;
      control.className = className; control.addEventListener('click', action); return control;
    }
    function renderCards() {
      const cards = learning.cards(), stage = panel().querySelector('.learning-stage'); stage.replaceChildren();
      const word = byId.get(cards.deck[cards.index]);
      stage.append(progress(`Thẻ ${cards.index + 1} / ${cards.deck.length} · Đã xem ${cards.seen.length} từ`));
      const modes = document.createElement('div'); modes.className = 'learning-controls';
      const cardModes = initialCardMode === 'picture'
        ? [['picture', 'Hình, tự nhớ từ'], ['viet', 'Hình & Từ Anh'], ['ipa', 'Hình & IPA']]
        : [['viet', 'Mặt trước: Hình & Từ Anh'], ['ipa', 'Mặt trước: Hình & IPA']];
      for (const [mode, label] of cardModes) {
        modes.append(button(label, () => { cancel(); stopSpeech(); cards.mode = mode; learning.save(); renderCards(); }, cards.mode === mode ? 'is-active' : ''));
      }
      stage.append(modes);
      const card = button('', () => {
        if (card.classList.contains('is-flipped')) return;
        card.classList.add('is-flipped');
        card.setAttribute('aria-pressed', 'true');
        front.setAttribute('aria-hidden', 'true');
        back.setAttribute('aria-hidden', 'false');
        if (!cards.seen.includes(word.id)) cards.seen.push(word.id);
        learning.save(); speakWord(word);
        stage.querySelector('.learning-progress').textContent = `Thẻ ${cards.index + 1} / ${cards.deck.length} · Đã xem ${cards.seen.length} từ`;
        timer = setTimeout(() => {
          timer = setTimeout(() => moveCard(1, true), cardRevealMs);
        }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160);
      }, 'learning-card');
      card.setAttribute('aria-label', 'Lật thẻ xem đáp án');
      card.setAttribute('aria-pressed', 'false');
      const inner = document.createElement('span'); inner.className = 'learning-card-inner';
      const front = document.createElement('span'); front.className = 'learning-card-front'; front.setAttribute('aria-hidden', 'false');
      const image = document.createElement('span'); image.className = 'learning-visual'; visual(image, word);
      const label = document.createElement('strong'); label.textContent = cards.mode === 'picture' ? 'Em nhớ từ gì?' : cards.mode === 'ipa' ? (word.ipa || word.name) : word.name;
      front.append(image, label);
      const back = document.createElement('span'); back.className = 'learning-card-back'; back.setAttribute('aria-hidden', 'true');
      const color = /^#[0-9a-f]{6}$/i.test(word.color || '') ? word.color : '#3182CE';
      back.style.backgroundColor = color;
      const rgb = [1, 3, 5].map(index => parseInt(color.slice(index, index + 2), 16));
      back.style.color = rgb[0] * .299 + rgb[1] * .587 + rgb[2] * .114 > 160 ? '#243247' : '#fff';
      const answer = document.createElement('strong'); answer.textContent = ['ipa', 'picture'].includes(cards.mode) ? word.name : word.meaning;
      const ipa = document.createElement('small'); ipa.textContent = cards.mode === 'picture' ? `${word.meaning} · ${word.ipa || ''}` : cards.mode === 'ipa' ? word.meaning : word.ipa || '';
      back.append(answer, ipa); inner.append(front, back); card.append(inner); stage.append(card);
      const controls = document.createElement('div'); controls.className = 'learning-controls learning-card-nav';
      controls.append(button('← Thẻ trước', () => moveCard(-1)), button('Thẻ tiếp →', () => moveCard(1)),
        button('🔊 Nghe lại', () => speakWord(word)));
      stage.append(controls); feedback(`Chạm vào thẻ để xem đáp án. Đáp án hiện khoảng ${Math.round(cardRevealMs / 1000)} giây rồi tự chuyển thẻ.`);
    }
    function moveCard(step, automatic = false) {
      cancel();
      if (!automatic) stopSpeech();
      const cards = learning.cards();
      cards.index = (cards.index + step + cards.deck.length) % cards.deck.length;
      learning.save(); if (active === 'game-flip') renderCards();
    }
    function stats(game, round) {
      const totals = learning.totals(round);
      return `Câu ${Math.min(round.index + 1, round.deck.length)} / ${round.deck.length} · ${totals.score} điểm · Chuỗi ${totals.streak} · Kỷ lục ${learning.state.best[game]}`;
    }
    function schedule(game, speechFinished = Promise.resolve()) {
      cancel();
      const round = learning.round(game), answer = round.answers[round.index];
      if (!answer?.solved || dialog.open) return;
      const token = scheduleToken, roundId = round.id, questionIndex = round.index;
      const minimumWait = new Promise(resolve => {
        timer = setTimeout(resolve, Math.max(0, answer.solvedAt + DELAY - Date.now()));
      });
      Promise.all([minimumWait, speechFinished]).then(() => {
        if (token !== scheduleToken || active !== `game-${game}` || dialog.open) return;
        const current = learning.round(game);
        if (current.id !== roundId || current.index !== questionIndex) return;
        if (learning.advance(game)) renderActive();
        else schedule(game);
      });
    }
    function renderQuestion(game) {
      const stage = panel().querySelector('.learning-stage'); stage.replaceChildren();
      if (game === 'mcq' && learning.state.selected.length < 2) {
        stage.append(progress('Game 2 cần ít nhất 2 từ. Hãy chọn thêm một từ.'));
        feedback('Bộ một từ vẫn dùng được ở Game 1 và 3.'); return;
      }
      const round = learning.round(game);
      if (round.index >= round.deck.length) {
        const totals = learning.totals(round);
        stage.append(progress(`Hoàn thành! ${totals.score} điểm · Đúng lần đầu ${totals.firstTry}/${round.deck.length} · Chuỗi tốt nhất ${totals.peak}`));
        stage.append(button('Chơi lại', () => { learning.newRound(game); renderActive(); }));
        toolbar(); feedback('Bạn đã hoàn thành bộ từ.'); return;
      }
      const answer = round.answers[round.index], word = byId.get(round.deck[round.index]);
      stage.append(progress(stats(game, round)));
      if (game !== 'mcq' || mcqMode !== 'listen-picture') {
        const image = document.createElement('div'); image.className = 'learning-visual learning-question-visual';
        visual(image, word); stage.append(image);
      }
      if (game === 'mcq') renderMcq(stage, round, answer, word);
      else renderSpelling(stage, round, answer, word);
      if (answer.solved) {
        feedback(answer.revealed ? '💡 Đã xem đáp án. Từ này sẽ được ôn lại.' :
          answer.mistakes ? '✅ Đã sửa đúng! Nghe xong sẽ chuyển câu.' : '✅ Chính xác! Nghe xong sẽ chuyển câu.',
          answer.revealed ? 'wrong' : 'correct');
        schedule(game);
      } else feedback(answer.mistakes ? 'Thử lại nhé. Câu này không cộng điểm.' : '', answer.mistakes ? 'wrong' : '');
    }
    function renderMcq(stage, round, answer, word) {
      if (mcqMode === 'listen-picture') {
        const instruction = document.createElement('p');
        instruction.className = 'learning-instruction';
        instruction.textContent = '🔊 Nghe từ rồi chọn tranh đúng.';
        stage.append(instruction, button('🔊 Nghe từ', () => speakWord(word)));
      }
      if (!Array.isArray(answer.options) || answer.options.length !== Math.min(4, round.deck.length) ||
          !answer.options.includes(word.id) || new Set(answer.options).size !== answer.options.length ||
          answer.options.some(id => !round.deck.includes(id))) {
        answer.options = shuffle([word.id, ...shuffle(round.deck.filter(id => id !== word.id)).slice(0, 3)]);
        learning.save();
      }
      const choices = answer.options;
      const grid = document.createElement('div'); grid.className = 'learning-options';
      for (const id of choices) {
        const option = button(mcqMode === 'listen-picture' ? '' : byId.get(id).name, () => {
          const correct = id === word.id, result = learning.answer('mcq', correct, id);
          if (!result) return;
          if (correct) {
            onResult?.({ word, game: 'listening', correct: true, firstTry: answer.mistakes === 0, revealed: false });
            grid.querySelectorAll('button').forEach(control => { control.disabled = true; });
            option.classList.add('is-correct');
            feedback(result.earned === 30 ? '🔥 Chuỗi 5 câu! +10 điểm, thưởng +20.' : result.earned ? '✅ Chính xác! +10 điểm. Nghe xong sẽ chuyển câu.' : '✅ Đã sửa đúng! Nghe xong sẽ chuyển câu.', 'correct');
            const speechFinished = speakWord(word);
            schedule('mcq', speechFinished);
          } else {
            onResult?.({ word, game: 'listening', correct: false, firstTry: false, revealed: false });
            option.disabled = true; option.classList.add('is-wrong');
            feedback('❌ Chưa đúng. Chọn lại nhé! Chuỗi đã về 0.', 'wrong');
          }
          stage.querySelector('.learning-progress').textContent = stats('mcq', round);
          sound(correct ? 'correct' : 'wrong');
        });
        if (mcqMode === 'listen-picture') {
          option.classList.add('learning-picture-option');
          const picture = document.createElement('span'); picture.className = 'learning-visual';
          visual(picture, byId.get(id));
          const caption = document.createElement('span'); caption.textContent = byId.get(id).meaning;
          option.append(picture, caption);
        }
        if (answer.solved || answer.wrongChoices.includes(id)) option.disabled = true;
        if (answer.wrongChoices.includes(id)) option.classList.add('is-wrong');
        if (answer.solved && id === word.id) option.classList.add('is-correct');
        grid.append(option);
      }
      stage.append(grid);
    }
    function renderSpelling(stage, round, answer, word) {
      const controls = document.createElement('div'); controls.className = 'learning-spelling';
      const input = document.createElement('input'); input.type = 'text'; input.autocomplete = 'off';
      input.setAttribute('aria-label', 'Gõ từ tiếng Anh'); input.placeholder = 'Gõ từ tiếng Anh'; input.disabled = answer.solved;
      input.value = answer.solved ? word.name : typeof answer.draft === 'string' ? answer.draft.slice(0, 100) : '';
      input.classList.toggle('is-correct', answer.solved);
      input.addEventListener('input', () => {
        if (answer.solved) return;
        input.classList.remove('is-wrong');
        input.removeAttribute('aria-invalid');
        answer.draft = input.value.slice(0, 100);
        learning.save();
        feedback();
      });
      const check = button('Kiểm tra', () => {
        const value = input.value.trim();
        if (answer.solved) return;
        if (!value) {
          feedback('✏️ Nhập từ tiếng Anh trước nhé.');
          input.focus();
          return;
        }
        const correct = searchText(value) === searchText(word.name);
        const result = learning.answer('spelling', correct);
        if (!result) return;
        if (correct) {
          onResult?.({ word, game: 'spelling', correct: true, firstTry: answer.mistakes === 0, revealed: false });
          clearTimeout(revealTimer); revealTimer = null;
          input.disabled = true; check.disabled = true;
          input.classList.remove('is-wrong'); input.classList.add('is-correct');
          input.removeAttribute('aria-invalid');
          feedback(result.earned === 30 ? '🔥 Chuỗi 5 câu! +10 điểm, thưởng +20.' : result.earned ? '✅ Chính xác! +10 điểm. Nghe xong sẽ chuyển câu.' : '✅ Đã sửa đúng! Nghe xong sẽ chuyển câu.', 'correct');
          const speechFinished = speakWord(word);
          schedule('spelling', speechFinished);
        } else {
          onResult?.({ word, game: 'spelling', correct: false, firstTry: false, revealed: false });
          input.classList.add('is-wrong'); input.setAttribute('aria-invalid', 'true');
          feedback('❌ Chưa đúng. Nghe lại và sửa nhé! Chuỗi đã về 0.', 'wrong');
          input.focus();
        }
        stage.querySelector('.learning-progress').textContent = stats('spelling', round);
        sound(correct ? 'correct' : 'wrong');
      });
      check.disabled = answer.solved;
      input.addEventListener('keydown', event => {
        if (event.key === 'Enter' && !event.repeat && !event.isComposing) {
          event.preventDefault(); check.click();
        }
      });
      const listen = button('🔊 Nghe', () => speakWord(word));
      listen.disabled = answer.solved;
      controls.append(input, check, listen);
      stage.append(controls);
      if (revealSpellingAfterMs > 0 && !answer.solved) {
        const availableAt = Date.now() + revealSpellingAfterMs;
        const reveal = button('💡 Hiện đáp án', () => {
          if (Date.now() < availableAt || answer.solved || active !== 'game-spelling' ||
              searchText(input.value) === searchText(word.name) || !learning.reveal('spelling')) return;
          clearTimeout(revealTimer); revealTimer = null;
          input.value = word.name; input.disabled = check.disabled = listen.disabled = true;
          reveal.hidden = true;
          onResult?.({ word, game: 'spelling', correct: false, firstTry: false, revealed: true });
          feedback('💡 Đáp án: ' + word.name + '. Từ này sẽ được ôn lại.', 'wrong');
          schedule('spelling', speakWord(word));
        }, 'learning-reveal');
        reveal.hidden = true;
        stage.append(reveal);
        const syncReveal = () => {
          reveal.hidden = answer.solved || active !== 'game-spelling' || document.hidden ||
            Date.now() < availableAt || searchText(input.value) === searchText(word.name);
        };
        input.addEventListener('input', syncReveal);
        revealTimer = setTimeout(syncReveal, revealSpellingAfterMs);
      }
      if (!answer.solved) {
        input.focus({ preventScroll: true });
        speakWord(word);
      }
    }
    document.addEventListener('visibilitychange', () => {
      if (revealSpellingAfterMs <= 0 || active !== 'game-spelling') return;
      if (document.hidden) {
        clearTimeout(revealTimer); revealTimer = null;
        const control = el('game-spelling').querySelector('.learning-reveal');
        if (control) control.hidden = true;
      } else renderActive();
    });
    onSelectionChange?.([...learning.state.selected]);
    if (learning.state.lastTab && titles[learning.state.lastTab]) {
      const button = document.querySelector(`nav [data-tab="${learning.state.lastTab}"]`) || document.querySelector('nav [data-game-nav]');
      show(learning.state.lastTab, { currentTarget: button });
    }
  }

  window.DanhLesson = { mount, LearningState };
})();
