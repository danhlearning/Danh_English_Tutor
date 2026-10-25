(() => {
  'use strict';
  const {Review,search,modes} = window.DanhGrade2Review;
  const config=window.DanhReviewConfig||{};
  const model = new Review(window.grade2Units, window.DanhLearners.storage, Math.random, window.DanhGrade2ReviewContent, config.key);
  const effects = window.DanhLearningEffects;
  const el = id => document.getElementById(id);
  const node = (tag,text,className) => { const n=document.createElement(tag); if(text!==undefined)n.textContent=text; if(className)n.className=className; return n; };
  const labels = {meaning:'🌼 Chọn nghĩa',listening:'🎧 Nghe chọn từ',spelling:'✏️ Gõ từ',sentence:'🧩 Xếp câu',gap:'🌉 Điền từ vào câu',letters:'🔎 Tìm chữ thiếu',dialogue:'💬 Chọn lời đáp','sentence-listening':'🐚 Nghe chọn câu',writing:'📝 Viết câu'};
  const outcomes = {first:'Đúng ngay',retry:'Tự sửa đúng',hinted:'Đúng có gợi ý',revealed:'Đã xem đáp án',skipped:'Bỏ qua'};
  let draft = new Set(model.state.selected), pickerTrigger;
  const REVEAL_DELAY=30000;
  let revealTimer, waitAnswer, waitStarted=0, inputTimer;
  const savedWait=a=>Number.isFinite(a?.revealWaitMs)?Math.max(0,Math.min(REVEAL_DELAY,a.revealWaitMs)):0;
  function pauseReveal() {
    clearTimeout(revealTimer);
    if(waitAnswer&&waitStarted){waitAnswer.revealWaitMs=Math.min(REVEAL_DELAY,savedWait(waitAnswer)+performance.now()-waitStarted);model.save();}
    waitAnswer=null;waitStarted=0;
  }
  function revealReady() {
    const a=model.answer;
    return !!a&&!a.outcome&&(savedWait(a)+(waitAnswer===a&&waitStarted?performance.now()-waitStarted:0)>=REVEAL_DELAY);
  }
  function resumeReveal() {
    el('reveal').hidden=true;
    if(el('play').hidden||document.hidden||!model.answer||model.answer.outcome)return;
    waitAnswer=model.answer;waitStarted=performance.now();
    const saved=savedWait(waitAnswer);
    const show=()=>{if(revealReady()&&!el('play').hidden&&!document.hidden)el('reveal').hidden=false;};
    if(saved>=REVEAL_DELAY)show();else revealTimer=setTimeout(show,REVEAL_DELAY-saved+10);
  }
  function storageNotice() {
    const text = !model.storageAvailable ? 'Chưa lưu được lâu dài. Em vẫn có thể ôn trong tab này; hãy kiểm tra thông báo hồ sơ trước khi rời trang.'
      : model.recovered ? 'Một phần lượt lưu cũ không đọc được. Em có thể chọn Unit và bắt đầu lượt mới.' : '';
    el('storage-notice').textContent=text; el('storage-notice').hidden=!text;
  }
  function screen(which) {
    clearTimeout(inputTimer);pauseReveal();
    effects.stop(); el('speech-status').textContent='';
    for(const id of ['setup','play','result','letter-review'])if(el(id))el(id).hidden=id!==which;
    document.body.classList.toggle('is-playing',which==='play'||which==='letter-review');
    storageNotice();
  }
  function setup() {
    screen('setup');
    const r=model.round, active=r&&r.index<r.tasks.length;
    el('continue-panel').hidden=!active;
    if(active)el('continue-label').textContent=`Đang ở câu ${r.index+1}/${r.tasks.length}.`;
    el('mode-summary').textContent=el('letter-review')?'Chọn kiểu ôn':`🎲 ${model.state.selectedModes.length} dạng thử thách`;
    el('start').disabled=model.roundLength()===0;
    el('mode-notice').textContent=el('start').disabled?'Chọn thêm Unit hoặc dạng khác nhé.':'';
    el('mode-choices').replaceChildren(node('legend','Dạng muốn chơi'));
    for(const mode of modes){
      const label=node('label',undefined,'mode-choice'),input=node('input');input.type='checkbox';input.value=mode;input.checked=model.state.selectedModes.includes(mode);
      input.addEventListener('change',()=>{
        const selected=[...el('mode-choices').querySelectorAll('input:checked')].map(n=>n.value);
        if(!model.selectModes(selected)){input.checked=true;el('mode-notice').textContent='Giữ ít nhất một dạng để cùng chơi nhé.';return;}
        el('mode-notice').textContent='';setup();el('mode-choices').querySelector(`input[value="${mode}"]`).focus({preventScroll:true});
      });label.append(input,node('span',labels[mode]));el('mode-choices').append(label);
    }
  }
  function picker() {
    effects.stop();draft=new Set(model.state.selected);pickerTrigger=document.activeElement;
    el('unit-search').value='';renderPicker();el('unit-picker').showModal();el('unit-search').focus();
  }
  function pickerCount() {
    el('picker-count').textContent=`Đã chọn ${draft.size}/${model.units.length} Unit${draft.size?' · '+model.pool([...draft]).length+' từ':''}`;
    el('apply-units').disabled=draft.size===0;
  }
  function renderPicker() {
    const query=search(el('unit-search').value);const list=el('unit-choices');list.replaceChildren();
    for(const unit of model.units.filter(u=>search(`${u.title} ${u.words.map(w=>w.name+' '+w.meaning).join(' ')}`).includes(query))) {
      const label=node('label',undefined,'unit-choice'),input=node('input');input.type='checkbox';input.value=unit.id;input.checked=draft.has(unit.id);
      input.addEventListener('change',()=>{if(input.checked)draft.add(unit.id);else draft.delete(unit.id);pickerCount();});
      const text=node('span');text.append(node('strong',unit.icon+' '+unit.title),node('small',unit.words.map(w=>`${w.name} (${w.meaning})`).join(' · ')));
      label.append(input,text);list.append(label);
    }
    if(!list.children.length)list.append(node('p','Chưa tìm thấy Unit. Thử tên bài, từ hoặc nghĩa khác nhé.'));
    pickerCount();
  }
  el('pick-units').addEventListener('click',picker);
  el('unit-search').addEventListener('input',renderPicker);
  for(const [id,fn] of Object.entries({'pick-all':()=>model.unitIds,'pick-none':()=>[],'pick-term1':()=>model.unitIds.slice(0,config.termSplit||8),'pick-term2':()=>model.unitIds.slice(config.termSplit||8)})) {
    el(id).addEventListener('click',()=>{draft=new Set(fn());renderPicker();});
  }
  el('cancel-units').addEventListener('click',()=>el('unit-picker').close());
  el('apply-units').addEventListener('click',()=>{
    if(!model.select(model.unitIds.filter(id=>draft.has(id))))return;
    el('unit-picker').close();setup();
  });
  el('unit-picker').addEventListener('close',()=>pickerTrigger?.focus());
  el('unit-picker').addEventListener('keydown',event=>{
    if(event.key==='Escape'){event.preventDefault();el('unit-picker').close();}
    if(event.key==='Tab'){
      const nodes=[...el('unit-picker').querySelectorAll('button:not(:disabled),input:not(:disabled)')].filter(n=>n.getClientRects().length);
      const first=nodes[0],last=nodes.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  el('unit-picker').querySelector('form').addEventListener('submit',e=>e.preventDefault());
  function message(text,kind='') { el('feedback').textContent=text;el('feedback').dataset.kind=kind; }
  function hintText() {
    const w=model.words.get(model.task.key),r=model.record();
    if(['sentence','writing'].includes(model.task.mode))return `Câu bắt đầu bằng “${model.tokens()[0]}”. Đọc lại câu tiếng Việt rồi thử nhé.`;
    if(model.task.mode==='gap')return `Từ cần điền có nghĩa là “${w.meaning}”, bắt đầu bằng “${w.name[0]}”.`;
    if(model.task.mode==='letters')return `Đọc các chữ đã có. Từ đầy đủ có ${w.name.replace(/[^a-z]/gi,'').length} chữ cái và nghĩa là “${w.meaning}”.`;
    if(model.task.mode==='dialogue')return `Đối chiếu lời hỏi với tình huống: ${r.context} ${/^(Do|Can|Is|Are)\b/.test(r.prompt)?'Chọn Yes hoặc No đúng với tình huống.':'Chọn lời đáp nói đúng điều bạn đang hỏi.'}`;
    if(model.task.mode==='sentence-listening')return 'Nghe lại cả câu. Chú ý từ chỉ đồ vật, màu sắc hoặc hành động khác nhau trong các lựa chọn.';
    if(model.task.mode==='meaning')return `Đọc lại từ “${w.name}”, rồi đối chiếu các nghĩa tiếng Việt. Em có thể bấm nghe từ.`;
    return `Từ có ${w.name.replace(/\s/g,'').length} chữ cái, bắt đầu bằng “${w.name[0]}”.`;
  }
  function resolvedMessage() {
    const a=model.answer;
    const prefix={first:'Chính xác! +10 sao ⭐',retry:'Em đã tự sửa đúng! +5 sao 🌱',hinted:'Em đã làm được với gợi ý! +3 sao 🌱',revealed:'Cùng ghi nhớ đáp án nhé. Câu này không cộng sao.',skipped:'Đã bỏ qua câu này. Em có thể ôn lại sau.'}[a.outcome];
    return `${prefix}\n${model.expected()} — ${model.record().meaning}`;
  }
  function renderTokens() {
    const a=model.answer,t=model.task,tokens=model.tokens();
    el('assembled').replaceChildren();el('tokens').replaceChildren();
    const add=(index,container)=>{
      const b=node('button',tokens[index]);b.type='button';b.dataset.token=String(index);b.disabled=!!a.outcome;
      b.setAttribute('aria-label',`${a.parts.includes(index)?'Gỡ':'Chọn'} mảnh ${tokens[index]}`);
      b.addEventListener('click',()=>{
        model.togglePart(index);renderTokens();storageNotice();effects.feedback('tap',b);
        if(model.answer.parts.length===model.tokens().length)submit(model.answer.parts.map(n=>model.tokens()[n]).join(' '));
      });container.append(b);
    };
    for(const index of a.parts)add(index,el('assembled'));
    for(const index of t.tokenOrder.filter(n=>!a.parts.includes(n)))add(index,el('tokens'));
    el('undo').disabled=!!a.outcome||!a.parts.length;
  }
  function play(focus=false) {
    if(!model.round)return setup();
    if(model.round.index===model.round.tasks.length)return result();
    screen('play');
    const r=model.round,t=model.task,a=model.answer,w=model.words.get(t.key),record=model.record(),done=!!a.outcome;
    window.DanhGameFlow?.prepare(r.tasks.slice(r.index,r.index+3).map(task=>({text:model.record(task).answer,visual:model.words.get(task.key)?.visual})),el('play'));
    el('play-title').textContent=`Chặng ${r.index+1} / ${r.tasks.length}`;
    el('round-label').textContent=`${w.unitTitle} · ${model.totals().score} sao`;
    el('round-progress').max=r.tasks.length;el('round-progress').value=r.index+(done?1:0);
    el('task-kind').textContent=labels[t.mode];
    const prompts={meaning:`“${w.name}” có nghĩa là gì?`,listening:'Bấm nghe, rồi chọn từ em nghe được.',spelling:`Từ nào có nghĩa là “${w.meaning}”?`,sentence:record.meaning,writing:record.meaning,gap:'Chọn từ để hoàn thành câu.',letters:`Tìm chữ còn thiếu trong từ có nghĩa là “${w.meaning}”.`,dialogue:record.prompt,'sentence-listening':'Bấm nghe, rồi tìm đúng câu vừa nghe.'};
    el('question').textContent=prompts[t.mode];
    el('task-context').hidden=!['gap','dialogue'].includes(t.mode);el('task-context').textContent=t.mode==='dialogue'?record.context:record.meaning;
    el('puzzle').hidden=!['gap','letters'].includes(t.mode);el('puzzle').textContent=record.masked||'';el('puzzle').classList.toggle('letter-puzzle',t.mode==='letters');
    el('listen').hidden=!done&&!['meaning','listening','sentence-listening'].includes(t.mode);
    el('listen').textContent=done?'🔊 Nghe lại đáp án':t.mode==='sentence-listening'?'🔊 Nghe câu tiếng Anh':'🔊 Nghe từ tiếng Anh';
    el('answer-form').hidden=!['spelling','writing'].includes(t.mode);el('sentence').hidden=t.mode!=='sentence';
    el('answer-label').textContent=t.mode==='writing'?'Gõ câu tiếng Anh':'Gõ từ tiếng Anh';
    el('answer').value=a.draft;el('answer').disabled=done;
    el('answer').removeAttribute('aria-invalid');el('choices').replaceChildren();
    el('choices').classList.toggle('letter-choices',t.mode==='letters');
    el('choices').classList.toggle('word-choices',['gap','listening'].includes(t.mode));
    if(model.isChoice())for(const key of t.options){
      const b=node('button',model.optionLabel(key));b.type='button';b.dataset.choice=key;
      b.disabled=done||a.wrongChoices.includes(key);if(a.wrongChoices.includes(key))b.classList.add('wrong');if(done&&key===model.solution())b.classList.add('right');
      if(a.wrongChoices.includes(key))b.append(node('span',' ✕','choice-mark'));else if(done&&key===model.solution())b.append(node('span',' ✓','choice-mark'));
      b.addEventListener('click',()=>submit(key));el('choices').append(b);
    }
    if(t.mode==='sentence')renderTokens();
    el('help').hidden=done;el('next').hidden=!done;el('next').textContent=r.index===r.tasks.length-1?'Xem tổng kết →':'Câu tiếp theo →';
    if(done)message(resolvedMessage(),['first','retry','hinted'].includes(a.outcome)?'good':'help');
    else if(a.hint)message(hintText(),'help');
    else if(a.mistakes)message('Em đã thử rồi. Hãy suy nghĩ và thử lại nhé!','wrong');
    else message('');
    el('journey').replaceChildren();
    const stepIcons={first:'★',retry:'🌱',hinted:'💡',revealed:'📖',skipped:'↷'};
    r.answers.forEach((answer,index)=>{const step=node('li',answer.outcome?stepIcons[answer.outcome]:String(index+1));step.className=answer.outcome?'step done '+answer.outcome:index===r.index?'step current':'step';step.setAttribute('aria-label',`Chặng ${index+1}${answer.outcome?' · '+outcomes[answer.outcome]:index===r.index?' · đang chơi':''}`);if(index===r.index)step.setAttribute('aria-current','step');el('journey').append(step);});
    const firstRun=r.answers.slice(0,r.index+(done?1:0));let streak=0;for(let i=firstRun.length-1;i>=0&&firstRun[i].outcome==='first';i--)streak++;
    el('companion').textContent=a.outcome==='retry'?'🦊 Em đã tìm được cách sửa. Giỏi kiên trì lắm!':a.outcome==='hinted'?'🦊 Biết nhờ gợi ý cũng là một cách học!':!done&&a.mistakes?'🦊 Cứ thử lại, mình vẫn ở đây cùng em.':streak>=3?`✨ ${streak} chặng đúng ngay liên tiếp!`:done?'🦊 Xong một chặng rồi. Mình cùng đi tiếp nhé!':r.index===0?'🦊 Mở hành trang, bắt đầu thôi!':'';
    el('companion').hidden=!el('companion').textContent;
    resumeReveal();
    window.DanhExerciseGaps?.format(el('puzzle'));
    if(focus)el('play-title').focus({preventScroll:true});
  }
  function submit(value) {
    const status=model.submit(value);
    if(status==='locked')return;
    if(status==='empty'){message(model.task.mode==='sentence'?'Xếp câu trước khi kiểm tra nhé.':model.task.mode==='writing'?'Gõ câu trước khi kiểm tra nhé.':'Gõ từ trước khi kiểm tra nhé.','help');return;}
    effects.stop();
    if(status==='repeat'){message('Em vừa thử đáp án này. Hãy thử cách khác nhé!','wrong');return;}
    if(status==='wrong'){
      play();message('Chưa đúng. Em thử lại nhé! Có thể dùng gợi ý nếu cần.','wrong');el('answer').setAttribute('aria-invalid','true');
      effects.feedback('bad',el('question'));return;
    }
    play();effects.feedback(status==='first'?'good':'corrected',el('question'));el('next').focus({preventScroll:true});
    window.DanhAnswerSpeech.say(model.expected());
  }
  el('answer').addEventListener('input',event=>{
    clearTimeout(inputTimer);model.draft(el('answer').value);storageNotice();
    if(event.isComposing)return;
    const answer=model.answer;
    inputTimer=setTimeout(()=>{if(!document.hidden&&model.answer===answer&&!answer.outcome&&model.correct(el('answer').value))submit(el('answer').value);},450);
  });
  el('answer').addEventListener('blur',()=>{if(!el('play').hidden&&!document.hidden&&model.answer&&!model.answer.outcome)submit(el('answer').value);});
  el('answer-form').addEventListener('submit',e=>{e.preventDefault();submit(el('answer').value);});
  el('undo').addEventListener('click',()=>{const last=model.answer.parts.at(-1);if(last!==undefined){model.togglePart(last);renderTokens();storageNotice();}});
  el('hint').addEventListener('click',()=>{if(model.hint()){message(hintText(),'help');storageNotice();effects.feedback('help',el('feedback'));}});
  for(const [id,outcome] of [['reveal','revealed'],['skip','skipped']])el(id).addEventListener('click',()=>{
    if(id==='reveal'&&!revealReady())return;
    if(model.resolve(outcome)){play();effects.feedback('help',el('feedback'));el('next').focus({preventScroll:true});}
  });
  el('next').addEventListener('click',()=>{if(model.next()){play(true);effects.feedback(model.task?'next':'complete',el(model.task?'question':'result-title'));}});
  el('listen').addEventListener('click',()=>{
    effects.stop();
    window.DanhAnswerSpeech.say(model.expected());
  });
  document.addEventListener('danh-answer-speech',event=>{
    if(event.detail.state==='error')el('speech-status').textContent='Chưa nghe được giọng đọc. Em thử bấm nghe lại nhé.';
  });
  function result() {
    screen('result');const totals=model.totals();
    el('result-score').textContent=`${totals.score} sao · ${totals.total} câu đã kết thúc`;
    el('result-stats').replaceChildren();
    for(const [kind,label] of Object.entries(outcomes)){const box=node('div');box.append(node('strong',String(totals[kind])),node('span',label));el('result-stats').append(box);}
    const list=el('review-list');list.replaceChildren();
    for(const task of model.needsReview()){
      const w=model.words.get(task.key),li=node('li');li.append(node('strong',w.unitTitle+' · '+labels[task.mode]),node('p',`${model.expected(task)} — ${model.record(task).meaning}`));list.append(li);
    }
    if(!list.children.length)list.append(node('li','Em đã đúng ngay cả lượt. Hẹn em ôn lại một ngày khác để nhớ lâu hơn!'));
    el('retry').hidden=!model.needsReview().length;
    el('result-encouragement').textContent=totals.retry?`🌱 Em đã tự sửa được ${totals.retry} câu. Những câu còn khó luôn có thể chơi lại.`:totals.first?'⭐ Mỗi câu em tự làm được là một bước tiến. Em có thể ôn lại hoặc chọn chuyến đi khác.':'🌱 Em đã thử một chuyến đi. Chơi lại vài câu với gợi ý để quen hơn nhé!';
    el('result-title').focus({preventScroll:true});
  }
  el('start').addEventListener('click',()=>{
    if(model.round&&model.round.index<model.round.tasks.length&&!window.confirm('Bắt đầu lượt mới sẽ thay lượt đang dở. Em muốn bắt đầu lượt mới chứ?'))return;
    model.start();play(true);effects.feedback('start',el('question'));
  });
  el('resume').addEventListener('click',()=>play(true));el('leave').addEventListener('click',()=>{setup();el('pick-units').focus();});
  el('choose-again').addEventListener('click',()=>{setup();el('pick-units').focus();});
  el('retry').addEventListener('click',()=>{const tasks=model.needsReview();if(!tasks.length)return;model.start(tasks);play(true);effects.feedback('start',el('question'));});
  document.addEventListener('visibilitychange',()=>{clearTimeout(inputTimer);pauseReveal();if(!document.hidden)resumeReveal();});
  window.addEventListener('pagehide',()=>{clearTimeout(inputTimer);pauseReveal();effects.stop();model.save();});
  model.save();setup();
  if(el('letter-review'))window.DanhGrade2LetterReview.connect({units:model.units,selectedUnits:()=>[...model.state.selected],open:()=>screen('letter-review'),back:setup,termSplit:config.termSplit||model.units.length/2});
})();
