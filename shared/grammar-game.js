window.DanhGrammarGame = config => {
  'use strict';
  const {grade,storageKey}=config;
  const questions = window[`DanhGrade${grade}Grammar`] || [];
  const ROUND_LENGTH = 10;
  const units = window[`DanhGrade${grade}Units`] || [];
  const $ = id => document.getElementById(id);
  const defaultState = { streak: 0, bestStreak: 0, points: 0, correct: 0, answered: {} };
  let state = { ...defaultState };
  try {
    const saved = JSON.parse(window.DanhLearners.storage.getItem(storageKey) || 'null');
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) {
      state = { ...defaultState, ...saved, answered: saved.answered && typeof saved.answered === 'object' && !Array.isArray(saved.answered) ? saved.answered : {} };
      for (const key of ['streak','bestStreak','points','correct']) if (!Number.isFinite(state[key]) || state[key] < 0) state[key] = 0;
    }
  } catch { /* Vẫn học được khi bộ nhớ trình duyệt không khả dụng. */ }
  const save = () => { try { window.DanhLearners.storage.setItem(storageKey, JSON.stringify(state)); } catch { /* Không lưu được trên thiết bị này. */ } };
  const updateStats = () => {
    $('streak').textContent = state.streak;
    $('best-streak').textContent = state.bestStreak;
    $('total-points').textContent = state.points;
    $('correct-count').textContent = state.correct;
  };
  const chosen = name => document.querySelector(`input[name="${name}"]:checked`).value;
  const scopeName = (value, unit = $('unit-select').value) => value === 'term1' ? 'Ôn học kỳ 1 · Unit 1–6' : value === 'term2' ? 'Ôn học kỳ 2 · Unit 7–12' : `Unit ${unit}`;
  const levelName = value => ({ easy: 'Dễ', medium: 'Vừa', hard: 'Khó' })[value];
  const typeName = value => ({ choice: 'Chọn đáp án', fill: 'Điền từ', order: 'Xếp câu', correct: 'Sửa lỗi · viết cả câu', rewrite: 'Viết lại câu', pronunciation: 'Phát âm', preposition: 'Giới từ · đoạn văn' })[value];
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
    return questions.filter(item => (chosen('activity') === 'grammar' ? !['pronunciation', 'preposition'].includes(item.type) : item.type === chosen('activity')) && (['pronunciation','preposition'].includes(chosen('activity')) || item.level === level) && (scope === 'unit' ? item.unit === Number($('unit-select').value) : scope === 'term1' ? item.unit <= 6 : item.unit >= 7));
  };
  const updateSelection = () => {
    const scope = chosen('scope');
    $('unit-select').disabled = scope !== 'unit';
    const byUnit = ['pronunciation','preposition'].includes(chosen('activity'));
    document.querySelectorAll('input[name="level"]').forEach(input => { input.disabled = byUnit; });
    $('selection-summary').textContent = `${scopeName(scope)} · ${byUnit ? (chosen('activity') === 'pronunciation' ? `Phát âm Anh–Anh · ${grade===6?'Unit 10: trọng âm · 11: nhịp · 12: ngữ điệu':'Unit 9–10: trọng âm · 11: trọng âm câu · 12: ngữ điệu'}` : 'Một đoạn văn · 5 phần · 10 chỗ trống') : `Cấp ${levelName(chosen('level'))}`} · ${Math.min(ROUND_LENGTH, selectPool().length)} câu`;
    $('start').textContent = `Bắt đầu làm`;
  };
  for (const unit of units) {
    const option = document.createElement('option'); option.value = unit.number; option.textContent = `Unit ${unit.number} · ${unit.title}`;
    $('unit-select').append(option);
  }
  const requestedUnit = Number(new URLSearchParams(location.search).get('unit'));
  if (Number.isInteger(requestedUnit) && requestedUnit >= 1 && requestedUnit <= units.length) $('unit-select').value = requestedUnit;
  document.querySelectorAll('.gg-fields input, #unit-select').forEach(input => input.addEventListener('change',()=>{updateSelection();respond('tap',input.closest('label')||input);}));
  $('library-count').textContent = `${questions.length.toLocaleString('vi-VN')} câu hỏi · 12 Unit`;
  updateSelection(); updateStats();

  let round = null;
  const effects=window.DanhLearningEffects;
  effects.bindSettings({soundButton:$('sound-toggle'),motionButton:$('motion-toggle'),compact:true});
  const respond=(kind,target=$('question-card'))=>effects.feedback(kind,target);
  const motionAllowed=()=>!effects.reduced();
  const setVisible = name => {
    const profile = document.querySelector('danh-learner');
    document.documentElement.style.setProperty('--gg-profile-height', `${profile?.offsetHeight || 0}px`);
    for (const id of ['setup', 'play', 'result']) $(id).hidden = id !== name;
    document.body.classList.remove('gg-is-setup', 'gg-is-playing', 'gg-is-result');
    document.body.classList.add(name === 'play' ? 'gg-is-playing' : `gg-is-${name}`);
    if (name !== 'play' || window.innerWidth > 760) $(name).scrollIntoView({ behavior: motionAllowed() ? 'smooth' : 'auto', block: 'start' });
  };
  const current = () => round.items[round.position];
  const hintDelay = question => question.type === 'rewrite' ? 120_000 : question.type === 'choice' || (question.type === 'fill' && question.answer.split('|')[0].trim().split(/\s+/).length === 1) ? 20_000 : 60_000;
  let hintTimer = null, revealTimer = null, questionStartedAt = 0, elapsedBefore = 0, wrongAttempts = 0, attempts = 0;
  const elapsedTime = () => elapsedBefore + (questionStartedAt ? Date.now() - questionStartedAt : 0);
  const revealDelay = () => current().type === 'rewrite' ? 120_000 : 60_000;
  const checkpoint = () => {
    if (!round) return;
    round.elapsed = elapsedTime(); round.attempts = attempts; round.wrongAttempts = wrongAttempts;
    round.draft = $('sentence-answer')?.value || $('answer-area').querySelector('input')?.value || '';
    round.feedback = $('feedback').textContent; round.feedbackClass = $('feedback').className;
    state.active = { ...round, items: round.items.map(q => q.id) }; save();
    $('resume').hidden = false;
  };
  const clearHelpTimers = () => {
    window.clearTimeout(hintTimer); window.clearTimeout(revealTimer);
    hintTimer = null; revealTimer = null;
  };
  const revealAllowed = () => current().type === 'rewrite' ? elapsedTime() >= 120_000 : wrongAttempts >= 2 || elapsedTime() >= 60_000;
  const showHint = () => {
    if (!round || round.finished || !$('question-hint').hidden) return;
    const question = current();
    const glossary = window[`DanhGrade${grade}GrammarHints`]?.[question.unit] || {};
    const context = `${question.prompt} ${question.source || ''} ${question.cue || ''} ${(question.parts || []).join(' ')}`.toLocaleLowerCase('en');
    let words = Object.entries(glossary).filter(([word]) => context.includes(word.toLocaleLowerCase('en'))).slice(0, 3);
    if (!words.length) words = Object.entries(glossary).slice(0, 2);
    $('question-vocab').textContent = question.vocab ? `Từ vựng: ${question.vocab}.` : `Từ vựng: ${words.map(([word, meaning]) => `${word} = ${meaning}`).join('; ')}.`;
    $('question-rule').textContent = `Cấu trúc: ${question.rule}`;
    $('question-hint').hidden = false; respond('help',$('question-hint'));
  };
  const refreshHelp = () => {
    if (!round || round.finished || document.hidden) return;
    const elapsed = elapsedTime();
    const delay = hintDelay(current());
    if (elapsed >= delay) showHint();
    else { window.clearTimeout(hintTimer); hintTimer = window.setTimeout(refreshHelp, delay - elapsed + 20); }
    if (revealAllowed()) {
      $('reveal').hidden = false;
    } else { window.clearTimeout(revealTimer); revealTimer = window.setTimeout(refreshHelp, revealDelay() - elapsed + 20); }
  };
  const finishQuestion = (revealed = false) => {
    if (round.finished) return;
    round.finished = true; clearHelpTimers();
    const question = current();
    const previous = state.answered[question.id];
    const record = previous && typeof previous === 'object' && !Array.isArray(previous) ? { ...previous } : {};
    for (const key of ['attempts','correct','firstTry','corrected','revealed']) if (!Number.isFinite(record[key]) || record[key] < 0) record[key] = 0;
    record.attempts += Math.max(attempts, 1);
    if (!revealed) {
      record.correct++; state.correct++; round.correct++;
      const firstTry = attempts === 1;
      if (firstTry) {
        record.firstTry = (record.firstTry || 0) + 1;
        round.firstTryCorrect++; state.streak++;
        state.bestStreak = Math.max(state.bestStreak, state.streak);
      }
      if (!firstTry) record.corrected = (record.corrected || 0) + 1;
      const base = { easy: 10, medium: 15, hard: 20 }[question.level];
      const bonus = firstTry ? Math.min((state.streak - 1) * 2, 10) : 0;
      const earned = (firstTry ? base : Math.max(5, Math.floor(base / 2))) + bonus;
      state.points += earned; round.earned += earned;
      $('feedback').textContent = firstTry ? `Chính xác! +${earned} điểm${bonus ? ` (gồm ${bonus} điểm chuỗi)` : ''}.` : `Em đã tự sửa đúng sau ${attempts} lần thử! +${earned} điểm. Chuỗi đúng bắt đầu lại ở câu tiếp theo.`;
      $('feedback').className = 'gg-feedback good';
    } else {
      state.streak = 0;
      record.revealed = (record.revealed || 0) + 1;
      round.revealed = (round.revealed || 0) + 1;
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
    round.outcome = revealed ? 'revealed' : attempts === 1 ? 'first' : 'corrected';
    checkpoint();
    const kind=revealed?'help':attempts>1?'corrected':effects.isMilestone(state.streak)?'streak':'good';
    respond(kind);
    if(kind==='streak') {const badge=document.createElement('strong');badge.className='gg-streak-reward';badge.textContent=`🔥 ${state.streak} câu đúng liên tiếp!`;$('feedback').prepend(badge);}
  };
  const submitAnswer = (value, choiceButton = null) => {
    if (!round || round.finished) return;
    if (!String(value).trim()) return;
    attempts++;
    if (isAnswer(value, current().answer)) {
      if (choiceButton) choiceButton.classList.add('is-correct');
      finishQuestion();
      return;
    }
    wrongAttempts++;
    state.streak = 0; save(); updateStats();
    if (choiceButton) { choiceButton.classList.add('is-wrong'); choiceButton.disabled = true; (round.wrongOptions ||= []).push(value); }
    $('feedback').textContent = revealAllowed() ? 'Chưa đúng. Em có thể thử tiếp hoặc xem đáp án.' : 'Chưa đúng, em thử lại nhé. Đáp án vẫn đang được giữ kín.';
    $('feedback').className = 'gg-feedback bad';
    checkpoint(); respond('bad',choiceButton || $('answer-area')); refreshHelp();
  };
  const button = (text, onClick, className) => {
    const element = document.createElement('button'); element.type = 'button'; element.className = className; element.textContent = text;
    element.addEventListener('click', onClick); return element;
  };
  function renderQuestion(restoring = false) {
    if (!restoring) { round.finished = false; round.elapsed = 0; round.attempts = 0; round.wrongAttempts = 0; round.draft = ''; round.feedback = ''; round.wrongOptions = []; round.order = []; round.optionOrder=null; }
    const question = current();
    $('question-card').classList.remove('gg-good', 'gg-bad');
    $('feedback').textContent = ''; $('feedback').className = 'gg-feedback';
    clearHelpTimers(); wrongAttempts = round.wrongAttempts || 0; attempts = round.attempts || 0; elapsedBefore = round.elapsed || 0; questionStartedAt = document.hidden ? 0 : Date.now();
    $('question-hint').hidden = true; $('reveal').hidden = true; $('next').hidden = true;
    hintTimer = window.setTimeout(refreshHelp, Math.max(0, hintDelay(question) - elapsedBefore));
    revealTimer = window.setTimeout(refreshHelp, Math.max(0, revealDelay() - elapsedBefore));
    $('round-position').textContent = `Câu ${round.position + 1}/${round.items.length}`;
    $('round-scope').textContent = scopeName(round.scope, round.unit || question.unit);
    $('round-progress').style.width = `${round.position / round.items.length * 100}%`;
    $('question-level').textContent = ['pronunciation','preposition'].includes(question.type) ? 'Luyện theo Unit' : `Cấp ${levelName(question.level)}`;
    $('question-unit').textContent = `Unit ${question.unit}`;
    $('question-type').textContent = typeName(question.type);
    $('question-prompt').textContent = question.type === 'rewrite' ? question.source : question.prompt;
    const area = $('answer-area'); area.replaceChildren();
    if (['choice','pronunciation','preposition'].includes(question.type)) {
      if (question.type === 'preposition') {
        const passage = document.createElement('div'); passage.className = 'gg-passage';
        const title = document.createElement('strong'); title.textContent = `${question.passageTitle} · Phần ${question.part+1}/5`;
        const text = document.createElement('p'); text.textContent = question.passage;
        passage.append(title,text); area.append(passage);
      }
      const options = document.createElement('div'); options.className = 'gg-options';
      if(!Array.isArray(round.optionOrder) || round.optionOrder.length!==question.options.length || new Set(round.optionOrder).size!==question.options.length || round.optionOrder.some(value=>!question.options.includes(value)))round.optionOrder=randomise(question.options);
      for (const [index, option] of round.optionOrder.entries()) {
        const choice = button(`${'ABCD'[index]}. ${option}`, () => {
          submitAnswer(option, choice);
        }, 'gg-option');
        if (question.marked) {
          const marked = question.marked[question.options.indexOf(option)];
          const [before, part, after] = marked.split(/[\[\]]/);
          const underline = document.createElement('u'); underline.textContent = part;
          choice.replaceChildren(`${'ABCD'[index]}. ${before}`, underline, after || '');
        }
        if ((round.wrongOptions || []).includes(option)) { choice.disabled = true; choice.classList.add('is-wrong'); }
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
      input.value = round.draft || ''; input.addEventListener('input', checkpoint);
      form.append(input, submit); area.append(form);
    } else if (question.type === 'correct' || question.type === 'rewrite') {
      const form = document.createElement('form'); form.className = 'gg-rewrite-form';
      const label = document.createElement('label'); label.textContent = question.type === 'correct' ? 'Viết đầy đủ câu đã sửa' : 'Câu viết lại của em';
      label.htmlFor = 'sentence-answer';
      const input = document.createElement('textarea'); input.id = 'sentence-answer'; input.rows = 3;
      input.autocomplete = 'off'; input.spellcheck = false;
      const prefix = question.type === 'rewrite' ? question.cue.split('...')[0].trim().replace(/\?$/, '') : '';
      input.placeholder = question.type === 'correct' ? 'Viết đầy đủ câu đúng bằng tiếng Anh' : 'Viết phần còn lại của câu';
      input.value = round.draft || '';
      input.setAttribute('aria-label', question.type === 'rewrite' ? `Hoàn thành câu bắt đầu bằng ${prefix}` : label.textContent);
      input.addEventListener('input', checkpoint);
      const note = document.createElement('small'); note.textContent = 'Máy đối chiếu với đáp án mẫu. Nếu em viết cách khác cùng nghĩa, hãy đối chiếu lời giải.';
      const submit = document.createElement('button'); submit.type = 'submit'; submit.className = 'gg-primary'; submit.textContent = 'Kiểm tra câu';
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (!input.value.trim()) { $('feedback').textContent = 'Em hãy viết câu trả lời trước nhé.'; input.focus(); return; }
        const full = prefix && !isAnswer(input.value,question.answer) && !normal(input.value).startsWith(normal(prefix) + ' ') ? `${prefix} ${input.value}` : input.value;
        submitAnswer(full);
        if (!round.finished) input.focus();
      });
      if (question.type === 'rewrite') {
        const line = document.createElement('div'); line.className = 'gg-exam-answer';
        const opening = document.createElement('span'); opening.textContent = `→ ${prefix}`;
        line.append(opening, input); form.append(line, submit);
      } else form.append(label, input, note, submit); area.append(form);
    } else if (question.type === 'order') {
      const selected = [];
      const built = document.createElement('div'); built.className = 'gg-built'; built.setAttribute('aria-label', 'Câu đang xếp');
      const tokens = document.createElement('div'); tokens.className = 'gg-tokens';
      const pieces = randomise(question.parts.map((part, index) => ({ part, index })));
      let restoringOrder = true;
      for (const piece of pieces) {
        const token = button(piece.part, () => {
          selected.push(piece); token.disabled = true;
          const placed = button(piece.part, () => {
            const found = selected.indexOf(piece); if (found >= 0) selected.splice(found, 1);
            placed.remove(); token.disabled = false;
            round.order = selected.map(item => item.index); if (!restoringOrder) {checkpoint();respond('tap',built);}
          }, 'gg-placed');
          built.append(placed);
          round.order = selected.map(item => item.index); if (!restoringOrder) {checkpoint();respond('tap',built);}
        }, 'gg-token');
        tokens.append(token);
      }
      for (const index of [...(round.order || [])]) tokens.children[pieces.findIndex(piece => piece.index === index)]?.click();
      restoringOrder = false;
      const actions = document.createElement('div'); actions.className = 'gg-token-actions';
      actions.append(button('Kiểm tra câu', () => {
        if (selected.length !== question.parts.length) { $('feedback').textContent = 'Em hãy dùng đủ các mảnh câu.'; return; }
        submitAnswer(selected.map(piece => piece.part).join(' '));
      }, 'gg-primary'));
      area.append(tokens, built, actions);
    }
    if (round.finished) {
      clearHelpTimers(); $('feedback').textContent = round.feedback || ''; $('feedback').className = round.feedbackClass || 'gg-feedback';
      area.querySelectorAll('button,input,textarea').forEach(control => { control.disabled = true; });
      $('next').hidden = false; $('next').textContent = round.position === round.items.length-1 ? 'Xem kết quả →' : 'Câu tiếp theo →';
    } else refreshHelp();
    checkpoint();
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
    let items = pool.slice(0, ROUND_LENGTH);
    const rewrites = pool.filter(item => item.type === 'rewrite');
    const included = items.filter(item => item.type === 'rewrite').length;
    if (chosen('activity') === 'grammar' && rewrites.length && included < 2) {
      const extra = rewrites.filter(item => !items.includes(item)).slice(0, 2 - included);
      items = [...items.slice(0, ROUND_LENGTH - extra.length), ...extra];
    }
    if (chosen('activity') === 'preposition') {
      const passageIds = [...new Set(pool.map(q => q.passageId))];
      const passageId = randomise(passageIds)[0];
      const seen = new Set();
      items = pool.filter(q => q.passageId === passageId && !seen.has(q.blank) && seen.add(q.blank)).sort((a,b) => a.blank-b.blank);
    } else items = randomise(items);
    if (!items.length) return;
    round = { items, position: 0, correct: 0, firstTryCorrect: 0, revealed: 0, earned: 0, activity: chosen('activity'), unit: $('unit-select').value, scope: chosen('scope'), level: chosen('level'), finished: false };
    setVisible('play'); renderQuestion(); respond('start');
  };
  const renderResult = () => {
    delete state.active; save(); $('resume').hidden = true;
    $('round-progress').style.width = '100%';
    $('result-correct').textContent = `${round.correct}/${round.items.length}`;
    $('result-earned').textContent = round.earned;
    $('result-message').textContent = `Đúng ngay: ${round.firstTryCorrect} · Tự sửa đúng: ${round.correct-round.firstTryCorrect} · Đã xem đáp án: ${round.revealed || 0}. Em có thể ôn lại bằng một lượt mới.`;
    const nextLevel = !['pronunciation','preposition'].includes(round.activity) && round.firstTryCorrect === round.items.length ? ({ easy: 'medium', medium: 'hard', hard: 'hard' })[round.level] : round.level;
    $('again').textContent = nextLevel === round.level ? `Luyện tiếp ${round.items.length} câu` : `Luyện tiếp cấp ${levelName(nextLevel)} →`;
    $('again').dataset.nextLevel = nextLevel;
    for (const name of ['activity','scope']) document.querySelector(`input[name="${name}"][value="${round[name] || (name === 'activity' ? 'grammar' : 'unit')}"]`).checked = true;
    if (round.unit) $('unit-select').value = round.unit;
    setVisible('result'); round = null; respond('complete',$('result'));
  };
  $('start').addEventListener('click', startRound);
  $('exit-play').addEventListener('click', () => {
    checkpoint(); clearHelpTimers();
    round = null;
    setVisible('setup'); updateSelection(); effects.stop();
  });
  $('next').addEventListener('click', () => {
    if (!round?.finished) return;
    if (round.position === round.items.length - 1) renderResult();
    else { round.position++; renderQuestion(); respond('next'); }
  });
  $('reveal').addEventListener('click', () => { if (round && !round.finished && revealAllowed()) finishQuestion(true); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { checkpoint(); elapsedBefore = elapsedTime(); questionStartedAt = 0; clearHelpTimers(); effects.stop(); }
    else if (round) { questionStartedAt = Date.now(); refreshHelp(); }
  });
  window.addEventListener('pagehide', checkpoint);
  $('resume').hidden = !state.active;
  $('resume').addEventListener('click', () => {
    const saved = state.active;
    if (!saved || !Array.isArray(saved.items)) return;
    const items = saved.items.map(id => questions.find(q => q.id === id));
    if (!items.length || items.some(q => !q) || !Number.isInteger(saved.position) || saved.position < 0 || saved.position >= items.length || !['easy','medium','hard'].includes(saved.level) || !['unit','term1','term2'].includes(saved.scope) || ['correct','firstTryCorrect','earned','elapsed','attempts','wrongAttempts'].some(key => !Number.isFinite(saved[key]) || saved[key] < 0) || !Array.isArray(saved.order) || !Array.isArray(saved.wrongOptions)) { delete state.active; save(); $('resume').hidden = true; return; }
    round = { ...saved, items }; setVisible('play'); renderQuestion(true);
  });
  $('again').addEventListener('click', () => {
    document.querySelector(`input[name="level"][value="${$('again').dataset.nextLevel}"]`).checked = true;
    updateSelection(); startRound();
  });
  $('change').addEventListener('click', () => { setVisible('setup'); updateSelection();respond('tap',$('setup')); });
  const observeProfile = () => {
    const profile = document.querySelector('danh-learner');
    if (profile) new ResizeObserver(() => document.documentElement.style.setProperty('--gg-profile-height', `${profile.offsetHeight}px`)).observe(profile);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', observeProfile);
  else observeProfile();
  $('start').disabled=false;
  $('resume').disabled=false;
  document.body.dataset.grammarReady='true';
};
