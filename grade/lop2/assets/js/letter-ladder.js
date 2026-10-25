(function(){
 'use strict';
 const make=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
 function mount({topic,words,storage,selected,goSpelling,rerender,effects,chooseGroup,allowStandalone=true,grade=Number(document.body.dataset.grade)||2}){
  effects=effects||window.DanhLearningEffects;
  const game=window.DanhLetterLadderCore.create(storage,topic,words,{chooseGroup,grade});
  const button=(text,action,cls='')=>{const n=make('button',text,cls);n.type='button';n.onclick=action;return n;};
  const fx=(kind,target)=>effects?.feedback(kind,target);
  function navigate(action){window.DanhAnswerSpeech?.stop();action();rerender();}
  function render(stage,full=false){
   game.ensure(selected());stage.replaceChildren();stage.classList.add('letter-ladder');
   const a=game.state.active;
   const note=make('p',game.warning,'ll-warning');note.setAttribute('role','status');stage.append(note);
   if(!a){if(game.start(selected()))render(stage,full);return;}
   if(a.index===a.tasks.length&&a.phase<4){game.advance();if(game.state.active.phase===4)goSpelling();else render(stage,full);return;}
   if(a.phase===4&&!full){a.bridge=true;game.save();goSpelling();return;}
   if(a.index===a.tasks.length){
    const counts={first:0,corrected:0,hinted:0,seen:0};for(const t of a.tasks)counts[t.result]++;
    stage.append(make('h3','Xong lượt rồi nè!'));
    const summary=make('div',undefined,'ll-summary');for(const [k,label]of [['first','Đúng ngay'],['corrected','Sửa đúng'],['hinted','Có gợi ý'],['seen','Đã xem']]){const cell=make('p');cell.append(make('strong',counts[k]),make('span',label));summary.append(cell);}stage.append(summary);
    stage.append(button('Chơi tiếp',()=>{game.start(selected());rerender('game-flip');},'ll-primary'));if(allowStandalone)stage.append(button('Chính tả riêng',()=>navigate(()=>game.standalone())));
    return;
   }
   const t=game.entry(),w=game.word();
   window.DanhGameFlow?.prepare(a.tasks.slice(a.index,a.index+3).map(t=>words.find(w=>w.id===t.id)),stage);
   const head=make('div',undefined,'ll-head');head.append(make('span',`Từ ${a.index+1}/${a.tasks.length}`));stage.append(head);
   if(a.recallPass)stage.append(make('p','Luyện lại từ cần nhớ. Tự ghép đúng để chơi tiếp.','ll-practice-note'));
   const meaning=make('h3',w.meaning,'ll-meaning');meaning.tabIndex=-1;const prompt=make('div',undefined,'ll-prompt');prompt.append(window.DanhPictureAudio.make(w,{topic}),meaning);stage.append(prompt);
   const status=make('p','', 'll-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
   const refresh=()=>render(stage,full);
   function check(){const result=game.check();if(!result)return;
    if(result==='empty'){status.textContent=a.phase===4?'Gõ từ trước nha.':'Điền đủ các ô nhé.';return;}
    if(result==='wrong'||result==='repeat'){status.textContent='Chưa khớp rồi, sửa lại nha.';status.dataset.kind='wrong';stage.querySelector('.ll-slots')?.classList.add('ll-wrong');if(result==='wrong')fx('bad',stage.querySelector('.ll-slots,.ll-input'));const reveal=stage.querySelector('.ll-reveal');if(reveal)reveal.hidden=false;return;}
    refresh();fx(result==='first'?'good':'corrected',stage.querySelector('.ll-slots,.ll-input'));window.DanhAnswerSpeech.say(w.name);
   }
   if(a.phase<4){
    const slots=make('div',undefined,'ll-slots');slots.setAttribute('aria-label','Từ cần điền');
    Array.from(w.name).forEach((c,i)=>{
     const hole=t.holes.indexOf(i);if(hole<0){slots.append(make('span',c===' '?'\u00a0':c,'ll-fixed'));return;}
     const value=t.draft[hole]===null?'':t.tiles[t.draft[hole]],display=c===c.toUpperCase()?value.toUpperCase():value;
     const b=button(display,()=>{if(game.remove(hole)){refresh();stage.querySelector(`[data-slot="${hole}"]`)?.focus();}},'ll-slot');b.dataset.slot=hole;b.disabled=!!t.result;b.setAttribute('aria-label',value?`Trả chữ ${value}`:`Ô chữ ${hole+1}`);if(!value){b.textContent='____';window.DanhExerciseGaps?.format(b);}if(t.result)b.classList.add('ll-solved');slots.append(b);
    });stage.append(slots);
    const bank=make('div',undefined,'ll-bank');bank.setAttribute('role','group');bank.setAttribute('aria-label','Chữ cái để chọn');
    t.tiles.forEach((letter,i)=>{const b=button(letter,()=>{if(game.choose(i)){refresh();stage.querySelector('.ll-bank button:not(:disabled)')?.focus();}},'ll-tile');b.dataset.tile=i;b.disabled=!!t.result||t.draft.includes(i);b.setAttribute('aria-label',`Chọn chữ ${letter}`);bank.append(b);});stage.append(bank);
   }else{
    const label=make('label','Gõ từ tiếng Anh','ll-input-label'),input=make('input',undefined,'ll-input');input.id='letter-ladder-input';label.htmlFor=input.id;input.type='text';input.autocomplete='off';input.autocapitalize='off';input.spellcheck=false;input.maxLength=150;input.value=t.text;input.disabled=!!t.result;input.oninput=()=>game.text(input.value);input.onkeydown=e=>{if(e.key==='Enter'&&!e.repeat&&!e.isComposing){e.preventDefault();check();}};stage.append(label,input);
   }
   stage.append(status);
   const controls=make('div',undefined,'ll-actions');
   if(t.result){
    status.textContent={first:'Đúng.',corrected:'Đã tự sửa đúng.',hinted:'Đúng với gợi ý.',seen:`Mẫu: ${w.name}`}[t.result];status.dataset.kind=t.result==='seen'?'help':'correct';
    if(t.result!=='seen')status.className='ll-announcement';
    controls.append(button(a.phase===4&&a.index===a.tasks.length-1?'Xem kết quả':'Từ tiếp',()=>navigate(()=>game.next()),'ll-primary'));
   }else{
    controls.append(button('Kiểm tra',check,'ll-primary'),button('Gợi ý',()=>{const letter=game.hint();status.textContent=`Gợi ý: ${letter}`;const reveal=stage.querySelector('.ll-reveal');if(reveal)reveal.hidden=false;fx('help');}));
    const reveal=button('Xem mẫu',()=>{if(game.reveal()){refresh();fx('help');}},'ll-reveal');reveal.hidden=!t.errors&&!t.hinted;controls.append(reveal);
    if(t.hinted)status.textContent='Đã dùng gợi ý.';else if(t.errors)status.textContent='Thử lại nha.';
   }
   stage.append(controls);
  }
  return {game,render,hasFull:()=>{game.ensure(selected());return game.state.active?.phase===4&&game.state.active.bridge;}};
 }
 const own=Number(document.body.dataset.grade);
 window.DanhLetterLadder={mount,enabled:own>=1&&own<=12||/\/grade\/lop2\/(?!animals\.html)/.test(location.pathname)&&!own};
 if(window.DanhLetterLadder.enabled){const sub=document.getElementById('topic-description');if(sub)sub.hidden=true;}
})();
