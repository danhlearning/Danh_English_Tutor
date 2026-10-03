(() => {
  'use strict';
  const questions = window.DanhGrade7Grammar || [];
  const ROUND_LENGTH = 10;
  const units = window.DanhGrade7Units || [];
  const $ = id => document.getElementById(id);
  const storageKey = 'danh-g7-grammar-v1';
  const defaultState = { streak: 0, bestStreak: 0, points: 0, correct: 0, answered: {} };
  let state = { ...defaultState };
  try {
    const saved = JSON.parse((window.DanhLearners?.storage || window.localStorage).getItem(storageKey) || 'null');
    if (saved && typeof saved === 'object') state = { ...defaultState, ...saved, answered: saved.answered || {} };
  } catch { /* Vẫn học được khi bộ nhớ trình duyệt không khả dụng. */ }
  const save = () => { try { (window.DanhLearners?.storage || window.localStorage).setItem(storageKey, JSON.stringify(state)); } catch { /* Không lưu được trên thiết bị này. */ } };
  const updateStats = () => {
    $('streak').textContent = state.streak;
    $('best-streak').textContent = state.bestStreak;
    $('total-points').textContent = state.points;
    $('correct-count').textContent = state.correct;
  };
  const chosen = name => document.querySelector(`input[name="${name}"]:checked`).value;
  const scopeName = value => value === 'term1' ? 'Ôn học kỳ 1 · Unit 1–6' : value === 'term2' ? 'Ôn học kỳ 2 · Unit 7–12' : `Unit ${$('unit-select').value}`;
  const levelName = value => ({ easy: 'Dễ', medium: 'Vừa', hard: 'Khó' })[value];
  const typeName = value => ({ choice: 'Chọn đáp án', fill: 'Điền từ', order: 'Xếp câu', correct: 'Sửa lỗi · viết cả câu', rewrite: 'Viết lại câu' })[value];
  const normal = value => String(value).toLocaleLowerCase('en').replace(/[’‘]/g, "'").replace(/[,.!?]/g, '').replace(/\s+/g, ' ').trim();
  const isAnswer = (value, answer) => answer.split('|').some(item => normal(value) === normal(item));
  const randomise = items => {
    const output = [...items];
    for (let index = output.length - 1; index > 0; index--) {
      const other = Math.floor(Math.random() * (index + 1));
      [output[index], output[other]] = [output[other], output[index]];
    }
    return output;
  };
  const selectPool = () => {
    const scope = chosen('scope'), level = chosen('level');
    return questions.filter(item => item.level === level && (scope === 'unit' ? item.unit === Number($('unit-select').value) : scope === 'term1' ? item.unit <= 6 : item.unit >= 7));
  };
  const updateSelection = () => {
    const scope = chosen('scope');
    $('unit-select').disabled = scope !== 'unit';
    $('selection-summary').textContent = `${scopeName(scope)} · Cấp ${levelName(chosen('level'))} · ${ROUND_LENGTH} câu · ${selectPool().length} câu trong thư viện`;
    $('start').textContent = `Bắt đầu làm`;
  };
  for (const unit of units) {
    const option = document.createElement('option'); option.value = unit.number; option.textContent = `Unit ${unit.number} · ${unit.title}`;
    $('unit-select').append(option);
  }
  const requestedUnit = Number(new URLSearchParams(location.search).get('unit'));
  if (Number.isInteger(requestedUnit) && requestedUnit >= 1 && requestedUnit <= units.length) $('unit-select').value = requestedUnit;
  document.querySelectorAll('.gg-fields input, #unit-select').forEach(input => input.addEventListener('change', updateSelection));
  $('library-count').textContent = `${questions.length.toLocaleString('vi-VN')} câu hỏi · 12 Unit`;
  updateSelection(); updateStats();

  let round = null;
  let audioContext = null;
  let soundEnabled = true;
  const sound = good => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioContext ||= new AudioContextClass();
      if (audioContext.state === 'suspended') audioContext.resume();
      const now = audioContext.currentTime;
      const notes = good ? [523.25, 659.25, 783.99] : [220, 165];
      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = good ? 'sine' : 'triangle'; oscillator.frequency.value = frequency;
        oscillator.connect(gain); gain.connect(audioContext.destination);
        const start = now + index * (good ? .09 : .11);
        gain.gain.setValueAtTime(.0001, start);
        gain.gain.exponentialRampToValueAtTime(good ? .12 : .065, start + .015);
        gain.gain.exponentialRampToValueAtTime(.0001, start + .19);
        oscillator.start(start); oscillator.stop(start + .2);
      });
    } catch { /* Âm thanh chỉ là hiệu ứng bổ sung. */ }
  };
  $('sound-toggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    $('sound-toggle').textContent = soundEnabled ? '🔊 Âm thanh' : '🔇 Đã tắt âm';
    $('sound-toggle').setAttribute('aria-pressed', String(soundEnabled));
  });
  const celebrate = good => {
    const card = $('question-card');
    card.classList.remove('gg-good', 'gg-bad'); void card.offsetWidth;
    card.classList.add(good ? 'gg-good' : 'gg-bad');
    const layer = $('celebration'); layer.replaceChildren();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const icons = good ? ['⭐', '✨', '🎉', '🌟', '💫'] : ['💪', '🌱', '💡'];
    for (let index = 0; index < (good ? 16 : 7); index++) {
      const piece = document.createElement('span'); piece.textContent = icons[index % icons.length];
      piece.style.setProperty('--left', `${10 + Math.random() * 80}%`);
      piece.style.setProperty('--drift', `${Math.round(Math.random() * 150 - 75)}px`);
      piece.style.setProperty('--size', `${1 + Math.random() * .9}rem`);
      layer.append(piece);
    }
    window.setTimeout(() => layer.replaceChildren(), 1100);
  };
  const setVisible = name => {
    for (const id of ['setup', 'play', 'result']) $(id).hidden = id !== name;
    document.body.classList.remove('gg-is-setup', 'gg-is-playing', 'gg-is-result');
    document.body.classList.add(name === 'play' ? 'gg-is-playing' : `gg-is-${name}`);
    if (name !== 'play' || window.innerWidth > 760) $(name).scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const current = () => round.items[round.position];
  const hintDelay = question => question.type === 'choice' || (question.type === 'fill' && question.answer.split('|')[0].trim().split(/\s+/).length === 1) ? 20_000 : 60_000;
  let hintTimer = null, revealTimer = null, questionStartedAt = 0, wrongAttempts = 0, attempts = 0;
  const clearHelpTimers = () => {
    window.clearTimeout(hintTimer); window.clearTimeout(revealTimer);
    hintTimer = null; revealTimer = null;
  };
  const revealAllowed = () => wrongAttempts >= 2 || Date.now() - questionStartedAt >= 60_000;
  const showHint = () => {
    if (!round || round.finished || !$('question-hint').hidden) return;
    const question = current();
    const glossary = window.DanhGrade7GrammarHints?.[question.unit] || {};
    const context = `${question.prompt} ${question.source || ''} ${question.cue || ''} ${(question.parts || []).join(' ')}`.toLocaleLowerCase('en');
    let words = Object.entries(glossary).filter(([word]) => context.includes(word.toLocaleLowerCase('en'))).slice(0, 3);
    if (!words.length) words = Object.entries(glossary).slice(0, 2);
    $('question-vocab').textContent = question.vocab ? `Từ vựng: ${question.vocab}.` : `Từ vựng: ${words.map(([word, meaning]) => `${word} = ${meaning}`).join('; ')}.`;
    $('question-rule').textContent = `Cấu trúc: ${question.rule}`;
    $('question-hint').hidden = false;
  };
  const refreshHelp = () => {
    if (!round || round.finished) return;
    const elapsed = Date.now() - questionStartedAt;
    const delay = hintDelay(current());
    if (elapsed >= delay) showHint();
    else { window.clearTimeout(hintTimer); hintTimer = window.setTimeout(refreshHelp, delay - elapsed + 20); }
    if (revealAllowed()) {
      $('reveal').hidden = false;
    } else { window.clearTimeout(revealTimer); revealTimer = window.setTimeout(refreshHelp, 60_000 - elapsed + 20); }
  };
  const finishQuestion = (revealed = false) => {
    if (round.finished) return;
    round.finished = true; clearHelpTimers();
    const question = current();
    const record = state.answered[question.id] || { attempts: 0, correct: 0 };
    record.attempts += Math.max(attempts, 1);
    if (!revealed) {
      record.correct++; state.correct++; round.correct++;
      const firstTry = attempts === 1;
      if (firstTry) {
        round.firstTryCorrect++; state.streak++;
        state.bestStreak = Math.max(state.bestStreak, state.streak);
      }
      const base = { easy: 10, medium: 15, hard: 20 }[question.level];
      const bonus = firstTry ? Math.min((state.streak - 1) * 2, 10) : 0;
      const earned = (firstTry ? base : Math.max(5, Math.floor(base / 2))) + bonus;
      state.points += earned; round.earned += earned;
      $('feedback').textContent = firstTry ? `Chính xác! +${earned} điểm${bonus ? ` (gồm ${bonus} điểm chuỗi)` : ''}.` : `Em đã tự sửa đúng sau ${attempts} lần thử! +${earned} điểm. Chuỗi đúng bắt đầu lại ở câu tiếp theo.`;
      $('feedback').className = 'gg-feedback good';
    } else {
      state.streak = 0;
      $('feedback').textContent = `Đáp án: ${question.answer.split('|')[0]}.`;
      $('feedback').className = 'gg-feedback bad';
    }
    state.answered[question.id] = record; save(); updateStats();
    const explanation = document.createElement('small'); explanation.textContent = question.explain;
    $('feedback').append(explanation);
    $('answer-area').querySelectorAll('button,input,textarea').forEach(control => { control.disabled = true; });
    $('reveal').hidden = true;
    $('next').hidden = false;
    $('next').textContent = round.position === round.items.length - 1 ? 'Xem kết quả →' : 'Câu tiếp theo →';
    sound(!revealed); celebrate(!revealed);
  };
  const submitAnswer = (value, choiceButton = null) => {
    if (!round || round.finished) return;
    attempts++;
    if (isAnswer(value, current().answer)) {
      if (choiceButton) choiceButton.classList.add('is-correct');
      finishQuestion();
      return;
    }
    wrongAttempts++;
    state.streak = 0; save(); updateStats();
    if (choiceButton) { choiceButton.classList.add('is-wrong'); choiceButton.disabled = true; }
    $('feedback').textContent = wrongAttempts >= 2 ? 'Chưa đúng. Em có thể thử tiếp hoặc xem đáp án.' : 'Chưa đúng, em thử lại nhé. Đáp án vẫn đang được giữ kín.';
    $('feedback').className = 'gg-feedback bad';
    sound(false); celebrate(false); refreshHelp();
  };
  const button = (text, onClick, className) => {
    const element = document.createElement('button'); element.type = 'button'; element.className = className; element.textContent = text;
    element.addEventListener('click', onClick); return element;
  };
  function renderQuestion() {
    round.finished = false;
    const question = current();
    $('question-card').scrollTop = 0;
    $('question-card').classList.remove('gg-good', 'gg-bad');
    $('feedback').textContent = ''; $('feedback').className = 'gg-feedback';
    clearHelpTimers(); wrongAttempts = 0; attempts = 0; questionStartedAt = Date.now();
    $('question-hint').hidden = true; $('reveal').hidden = true; $('next').hidden = true;
    hintTimer = window.setTimeout(refreshHelp, hintDelay(question));
    revealTimer = window.setTimeout(refreshHelp, 60_000);
    $('round-position').textContent = `Câu ${round.position + 1}/${round.items.length}`;
    $('round-scope').textContent = scopeName(round.scope);
    $('round-progress').style.width = `${round.position / round.items.length * 100}%`;
    $('question-level').textContent = `Cấp ${levelName(question.level)}`;
    $('question-unit').textContent = `Unit ${question.unit}`;
    $('question-type').textContent = typeName(question.type);
    $('question-prompt').textContent = question.prompt;
    const area = $('answer-area'); area.replaceChildren();
    if (question.type === 'choice') {
      const options = document.createElement('div'); options.className = 'gg-options';
      for (const option of randomise(question.options)) {
        const choice = button(option, () => {
          submitAnswer(option, choice);
        }, 'gg-option');
        options.append(choice);
      }
      area.append(options);
    } else if (question.type === 'fill') {
      const form = document.createElement('form'); form.className = 'gg-input-row';
      const input = document.createElement('input'); input.type = 'text'; input.autocomplete = 'off'; input.spellcheck = false;
      input.placeholder = 'Gõ phần còn thiếu';
      input.setAttribute('aria-label', input.placeholder);
      const submit = document.createElement('button'); submit.type = 'submit'; submit.className = 'gg-primary'; submit.textContent = 'Kiểm tra';
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (!input.value.trim()) { $('feedback').textContent = 'Em hãy nhập câu trả lời trước nhé.'; input.focus(); return; }
        submitAnswer(input.value);
        if (!round.finished) { input.focus(); input.select(); }
      });
      form.append(input, submit); area.append(form);
    } else if (question.type === 'correct' || question.type === 'rewrite') {
      if (question.type === 'rewrite') {
        const source = document.createElement('div'); source.className = 'gg-rewrite-source';
        const sourceLabel = document.createElement('strong'); sourceLabel.textContent = 'Câu gốc';
        const sourceText = document.createElement('p'); sourceText.textContent = question.source;
        source.append(sourceLabel, sourceText);
        const cue = document.createElement('div'); cue.className = 'gg-rewrite-cue';
        const cueLabel = document.createElement('strong'); cueLabel.textContent = 'Viết lại bắt đầu bằng';
        const cueText = document.createElement('p'); cueText.textContent = question.cue;
        cue.append(cueLabel, cueText);
        area.append(source, cue);
      }
      const form = document.createElement('form'); form.className = 'gg-rewrite-form';
      const label = document.createElement('label'); label.textContent = question.type === 'correct' ? 'Viết đầy đủ câu đã sửa' : 'Câu viết lại của em';
      label.htmlFor = 'sentence-answer';
      const input = document.createElement('textarea'); input.id = 'sentence-answer'; input.rows = 3;
      input.autocomplete = 'off'; input.spellcheck = false;
      input.placeholder = question.type === 'correct' ? 'Viết đầy đủ câu đúng bằng tiếng Anh' : 'Viết đầy đủ câu mới bằng tiếng Anh';
      const note = document.createElement('small'); note.textContent = 'Máy đối chiếu với đáp án mẫu. Nếu em viết cách khác cùng nghĩa, hãy đối chiếu lời giải.';
      const submit = document.createElement('button'); submit.type = 'submit'; submit.className = 'gg-primary'; submit.textContent = 'Kiểm tra câu';
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (!input.value.trim()) { $('feedback').textContent = 'Em hãy viết câu trả lời trước nhé.'; input.focus(); return; }
        submitAnswer(input.value);
        if (!round.finished) { input.focus(); input.select(); }
      });
      form.append(label, input, note, submit); area.append(form);
    } else if (question.type === 'order') {
      const selected = [];
      const built = document.createElement('div'); built.className = 'gg-built'; built.setAttribute('aria-label', 'Câu đang xếp');
      const tokens = document.createElement('div'); tokens.className = 'gg-tokens';
      const pieces = randomise(question.parts.map((part, index) => ({ part, index })));
      for (const piece of pieces) {
        const token = button(piece.part, () => {
          selected.push(piece); token.disabled = true;
          const placed = button(piece.part, () => {
            const found = selected.indexOf(piece); if (found >= 0) selected.splice(found, 1);
            placed.remove(); token.disabled = false;
          }, 'gg-placed');
          built.append(placed);
        }, 'gg-token');
        tokens.append(token);
      }
      const actions = document.createElement('div'); actions.className = 'gg-token-actions';
      actions.append(button('Kiểm tra câu', () => {
        if (selected.length !== question.parts.length) { $('feedback').textContent = 'Em hãy dùng đủ các mảnh câu.'; return; }
        submitAnswer(selected.map(piece => piece.part).join(' '));
      }, 'gg-primary'));
      area.append(tokens, built, actions);
    }
  }
  const startRound = () => {
    const pool = randomise(selectPool());
    pool.sort((a, b) => {
      const rank = item => {
        const history = state.answered[item.id];
        return !history ? 1 : history.correct ? 2 : 0;
      };
      return rank(a) - rank(b);
    });
    const items = randomise(window.DanhGrade7Round.select(pool, ROUND_LENGTH));
    if (!items.length) return;
    round = { items, position: 0, correct: 0, firstTryCorrect: 0, earned: 0, scope: chosen('scope'), level: chosen('level'), finished: false };
    setVisible('play'); renderQuestion();
  };
  const renderResult = () => {
    $('round-progress').style.width = '100%';
    $('result-correct').textContent = `${round.correct}/${round.items.length}`;
    $('result-earned').textContent = round.earned;
    $('result-message').textContent = round.firstTryCorrect === round.items.length ? 'Em đã làm rất tốt! Sẵn sàng nâng cấp độ chưa?' : 'Mỗi câu vừa làm đều giúp em hiểu bài hơn. Thử thêm một lượt ngắn nhé!';
    const nextLevel = round.firstTryCorrect === round.items.length ? ({ easy: 'medium', medium: 'hard', hard: 'hard' })[round.level] : round.level;
    $('again').textContent = nextLevel === round.level ? `Luyện tiếp ${round.items.length} câu` : `Luyện tiếp cấp ${levelName(nextLevel)} →`;
    $('again').dataset.nextLevel = nextLevel;
    setVisible('result');
  };
  $('start').addEventListener('click', startRound);
  $('exit-play').addEventListener('click', () => {
    clearHelpTimers();
    round = null;
    setVisible('setup'); updateSelection();
  });
  $('next').addEventListener('click', () => {
    if (!round?.finished) return;
    if (round.position === round.items.length - 1) renderResult();
    else { round.position++; renderQuestion(); }
  });
  $('reveal').addEventListener('click', () => { if (round && !round.finished && revealAllowed()) finishQuestion(true); });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshHelp(); });
  $('again').addEventListener('click', () => {
    document.querySelector(`input[name="level"][value="${$('again').dataset.nextLevel}"]`).checked = true;
    updateSelection(); startRound();
  });
  $('change').addEventListener('click', () => { setVisible('setup'); updateSelection(); });
})();
