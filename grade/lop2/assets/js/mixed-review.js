(() => {
  'use strict';
  const {Review,search} = window.DanhGrade2Review;
  const model = new Review(window.grade2Units, window.DanhLearners.storage);
  const effects = window.DanhLearningEffects;
  const el = id => document.getElementById(id);
  const node = (tag,text,className) => { const n=document.createElement(tag); if(text!==undefined)n.textContent=text; if(className)n.className=className; return n; };
  const labels = {meaning:'🌼 Chọn nghĩa',listening:'🎧 Nghe chọn từ',spelling:'✏️ Gõ từ',sentence:'🧩 Xếp câu'};
  const outcomes = {first:'Đúng ngay',retry:'Tự sửa đúng',hinted:'Đúng có gợi ý',revealed:'Đã xem đáp án',skipped:'Bỏ qua'};
  let draft = new Set(model.state.selected), pickerTrigger;
  effects.bindSettings({soundButton:el('sound-toggle'),motionButton:el('motion-toggle')});
  function storageNotice() {
    const text = !model.storageAvailable ? 'Chưa lưu được lâu dài. Em vẫn có thể ôn trong tab này; hãy kiểm tra thông báo hồ sơ trước khi rời trang.'
      : model.recovered ? 'Một phần lượt lưu cũ không đọc được. Em có thể chọn Unit và bắt đầu lượt mới.' : '';
    el('storage-notice').textContent=text; el('storage-notice').hidden=!text;
  }
  function screen(which) {
    effects.stop(); el('speech-status').textContent='';
    for(const id of ['setup','play','result'])el(id).hidden=id!==which;
    document.body.classList.toggle('is-playing',which==='play');
    storageNotice();
  }
  function selectionText(ids) { return ids.map(id=>'Unit '+id.replace('gsunit','')).join(', '); }
  function setup() {
    screen('setup');
    el('selection-summary').textContent=`${model.state.selected.length} Unit · ${model.pool().length} từ · ${model.roundLength()} câu/lượt`;
    el('selection-label').textContent=selectionText(model.state.selected);
    const r=model.round, active=r&&r.index<r.tasks.length;
    el('continue-panel').hidden=!active;
    if(active)el('continue-label').textContent=`${selectionText(r.units)} · Đang ở câu ${r.index+1}/${r.tasks.length}. Lượt này vẫn giữ bộ Unit ban đầu.`;
    el('start').textContent=active?'Bắt đầu lượt mới →':'Bắt đầu lượt ôn →';
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
  for(const [id,fn] of Object.entries({'pick-all':()=>model.unitIds,'pick-none':()=>[],'pick-term1':()=>model.unitIds.slice(0,8),'pick-term2':()=>model.unitIds.slice(8)})) {
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
    const w=model.words.get(model.task.key);
    if(model.task.mode==='sentence')return `Câu bắt đầu bằng “${model.tokens()[0]}”. Hãy đọc lại câu tiếng Việt và xếp các mảnh.`;
    if(model.task.mode==='meaning')return `Đọc lại từ “${w.name}”, rồi đối chiếu các nghĩa tiếng Việt. Em có thể bấm nghe từ.`;
    return `Từ có ${w.name.replace(/\s/g,'').length} chữ cái, bắt đầu bằng “${w.name[0]}”.`;
  }
  function resolvedMessage() {
    const a=model.answer;
    const prefix={first:'Chính xác! +10 sao ⭐',retry:'Em đã tự sửa đúng! +5 sao 🌱',hinted:'Em đã làm được với gợi ý! +3 sao 🌱',revealed:'Cùng ghi nhớ đáp án nhé. Câu này không cộng sao.',skipped:'Đã bỏ qua câu này. Em có thể ôn lại sau.'}[a.outcome];
    return `${prefix}\n${model.expected()}${model.task.mode==='sentence'?'':' — '+model.words.get(model.task.key).meaning}`;
  }
  function renderTokens() {
    const a=model.answer,t=model.task,tokens=model.tokens();
    el('assembled').replaceChildren();el('tokens').replaceChildren();
    const add=(index,container)=>{
      const b=node('button',tokens[index]);b.type='button';b.dataset.token=String(index);b.disabled=!!a.outcome;
      b.setAttribute('aria-label',`${a.parts.includes(index)?'Gỡ':'Chọn'} mảnh ${tokens[index]}`);
      b.addEventListener('click',()=>{model.togglePart(index);renderTokens();storageNotice();effects.feedback('tap',b);});container.append(b);
    };
    for(const index of a.parts)add(index,el('assembled'));
    for(const index of t.tokenOrder.filter(n=>!a.parts.includes(n)))add(index,el('tokens'));
    el('undo').disabled=!!a.outcome||!a.parts.length;el('sentence-check').disabled=!!a.outcome;
  }
  function play(focus=false) {
    if(!model.round)return setup();
    if(model.round.index===model.round.tasks.length)return result();
    screen('play');
    const r=model.round,t=model.task,a=model.answer,w=model.words.get(t.key),done=!!a.outcome;
    el('play-title').textContent=`Câu ${r.index+1} / ${r.tasks.length}`;
    el('round-label').textContent=`${w.unitTitle} · ${model.totals().score} sao`;
    el('round-progress').max=r.tasks.length;el('round-progress').value=r.index+(done?1:0);
    el('task-kind').textContent=labels[t.mode];
    el('question').textContent=t.mode==='meaning'?`“${w.name}” có nghĩa là gì?`:t.mode==='listening'?'Nghe và chọn từ em nghe được.':t.mode==='spelling'?`Từ nào có nghĩa là “${w.meaning}”?`:w.question.vietnamese;
    el('listen').hidden=!['meaning','listening'].includes(t.mode);
    el('answer-form').hidden=t.mode!=='spelling';el('sentence').hidden=t.mode!=='sentence';
    el('answer').value=a.draft;el('answer').disabled=done;el('check').disabled=done;
    el('answer').removeAttribute('aria-invalid');el('choices').replaceChildren();
    if(['meaning','listening'].includes(t.mode))for(const key of t.options){
      const option=model.words.get(key),b=node('button',t.mode==='meaning'?option.meaning:option.name);b.type='button';b.dataset.choice=key;
      b.disabled=done||a.wrongChoices.includes(key);if(a.wrongChoices.includes(key))b.classList.add('wrong');if(done&&key===t.key)b.classList.add('right');
      b.addEventListener('click',()=>submit(key));el('choices').append(b);
    }
    if(t.mode==='sentence')renderTokens();
    el('help').hidden=done;el('next').hidden=!done;el('next').textContent=r.index===r.tasks.length-1?'Xem tổng kết →':'Câu tiếp theo →';
    if(done)message(resolvedMessage(),['first','retry','hinted'].includes(a.outcome)?'good':'help');
    else if(a.hint)message(hintText(),'help');
    else if(a.mistakes)message('Em đã thử rồi. Hãy suy nghĩ và thử lại nhé!','wrong');
    else message('');
    if(focus)el('play-title').focus({preventScroll:true});
  }
  function submit(value) {
    effects.stop();const status=model.submit(value);
    if(status==='locked')return;
    if(status==='empty'){message(model.task.mode==='sentence'?'Xếp câu trước khi kiểm tra nhé.':'Gõ từ trước khi kiểm tra nhé.','help');return;}
    if(status==='repeat'){message('Em vừa thử đáp án này. Hãy thử cách khác nhé!','wrong');return;}
    if(status==='wrong'){
      play();message('Chưa đúng. Em thử lại nhé! Có thể dùng gợi ý nếu cần.','wrong');el('answer').setAttribute('aria-invalid','true');
      effects.feedback('bad',el('question'));return;
    }
    play();effects.feedback(status==='first'?'good':'corrected',el('question'));el('next').focus({preventScroll:true});
    window.DanhAnswerSpeech.say(model.expected());
  }
  el('answer').addEventListener('input',()=>{model.draft(el('answer').value);storageNotice();});
  el('answer-form').addEventListener('submit',e=>{e.preventDefault();submit(el('answer').value);});
  el('sentence-check').addEventListener('click',()=>submit(model.answer.parts.map(n=>model.tokens()[n]).join(' ')));
  el('undo').addEventListener('click',()=>{const last=model.answer.parts.at(-1);if(last!==undefined){model.togglePart(last);renderTokens();storageNotice();}});
  el('hint').addEventListener('click',()=>{if(model.hint()){message(hintText(),'help');storageNotice();effects.feedback('help',el('feedback'));}});
  for(const [id,outcome] of [['reveal','revealed'],['skip','skipped']])el(id).addEventListener('click',()=>{
    if(model.resolve(outcome)){play();effects.feedback('help',el('feedback'));el('next').focus({preventScroll:true});}
  });
  el('next').addEventListener('click',()=>{if(model.next()){play(true);effects.feedback(model.task?'next':'complete',el(model.task?'question':'result-title'));}});
  el('listen').addEventListener('click',()=>{
    effects.stop();
    if(!window.speechSynthesis||typeof SpeechSynthesisUtterance==='undefined'){el('speech-status').textContent='Thiết bị chưa hỗ trợ giọng đọc. Em có thể bỏ qua câu này và ôn lại sau.';return;}
    try{
      const utterance=new SpeechSynthesisUtterance(model.words.get(model.task.key).name);utterance.lang='en-GB';window.DanhYoungSpeech.configure(utterance);
      utterance.onerror=e=>{if(!['canceled','interrupted'].includes(e.error))el('speech-status').textContent='Chưa nghe được giọng đọc. Thử nghe lại hoặc bỏ qua để ôn sau nhé.';};
      window.speechSynthesis.speak(utterance);el('speech-status').textContent='';
    }catch{el('speech-status').textContent='Chưa phát được giọng đọc. Em thử lại hoặc bỏ qua để ôn sau nhé.';}
  });
  function result() {
    screen('result');const totals=model.totals();
    el('result-score').textContent=`${totals.score} sao · ${totals.total} câu đã kết thúc`;
    el('result-stats').replaceChildren();
    for(const [kind,label] of Object.entries(outcomes)){const box=node('div');box.append(node('strong',String(totals[kind])),node('span',label));el('result-stats').append(box);}
    const list=el('review-list');list.replaceChildren();
    for(const task of model.needsReview()){
      const w=model.words.get(task.key),li=node('li');li.append(node('strong',w.unitTitle+' · '+labels[task.mode]),node('p',`${model.expected(task)} — ${task.mode==='sentence'?w.question.vietnamese:w.meaning}`));list.append(li);
    }
    if(!list.children.length)list.append(node('li','Em đã đúng ngay cả lượt. Hẹn em ôn lại một ngày khác để nhớ lâu hơn!'));
    el('retry').hidden=!model.needsReview().length;
    el('result-title').focus({preventScroll:true});
  }
  el('start').addEventListener('click',()=>{
    if(model.round&&model.round.index<model.round.tasks.length&&!window.confirm('Bắt đầu lượt mới sẽ thay lượt đang dở. Em muốn bắt đầu lượt mới chứ?'))return;
    model.start();play(true);effects.feedback('start',el('question'));
  });
  el('resume').addEventListener('click',()=>play(true));el('leave').addEventListener('click',()=>{setup();el('pick-units').focus();});
  el('choose-again').addEventListener('click',()=>{setup();el('pick-units').focus();});
  el('retry').addEventListener('click',()=>{const tasks=model.needsReview();if(!tasks.length)return;model.start(tasks);play(true);effects.feedback('start',el('question'));});
  window.addEventListener('pagehide',()=>{effects.stop();model.save();});
  model.save();setup();
})();
