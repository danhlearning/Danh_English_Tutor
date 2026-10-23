/* Cùng bố cục và bộ Game 1–3 của lớp 4, dữ liệu riêng lớp 1/3/5. */
(() => {
  'use strict';
  const course=window.DanhPrimaryTemplateCourse,grade=course.grade;
  const unit=course.units.find(u=>u.id===document.body.dataset.unit),storage=window.DanhLearners.storage,fx=window.DanhLearningEffects;
  const oldMode=new URLSearchParams(location.search).get('mode');
  if(['meaning','listen','spelling','sentence'].includes(oldMode)){
    location.replace(`legacy.html?unit=${unit.id}&mode=${oldMode}`);return;
  }
  const store=window.DanhPrimaryProgress.createStore(storage,grade),el=id=>document.getElementById(id),key=w=>`${unit.id}:${w.id}`;
  let selected=unit.words.map(w=>w.id),recall;
  function update(){const sum=store.summary(unit.words.map(key)),progress=el('unit-progress');progress.textContent=sum.due ? 'Có từ cần ôn' : sum.practised ? 'Đã luyện tập' : '';progress.hidden=!progress.textContent;for(const w of unit.words){const skills=store.get(key(w))?.skills||{};el(`status-${w.id}`).textContent=[`${skills.listening?'✓':'○'} Nghe`,`${skills.spelling?'✓':'○'} Gõ`,`${skills.context?'✓':'○'} Câu`].join(' · ');}}
  function speak(text){
    if(window.DanhListenControls?.isManualRequest())return window.DanhAnswerSpeech.listen(text);if(!fx.soundEnabled()){el('speech-note').textContent='Em hãy bật âm thanh để nghe nhé.';return;}if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){window.DanhAnswerSpeech.say(text);return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang='en-GB';DanhYoungSpeech.configure(u);u.onerror=()=>{el('speech-note').textContent='Chưa phát được giọng đọc. Em thử lại nhé.';};speechSynthesis.speak(u);}
  const make=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
  const soundButton=(text,action)=>{const b=make('button',text,'g4-sound');b.type='button';b.addEventListener('click',action);return b;};
  el('unit-number').textContent=`UNIT ${unit.number} · DANH ENGLISH TUTOR · LỚP ${grade}`;
  el('unit-title').textContent=unit.title;el('unit-subtitle').textContent=unit.subtitle;el('unit-focus').textContent=unit.focus;
  for(const w of unit.words){const card=make('article',undefined,'g4-word-card'),picture=make('span',undefined,'g4-visual');picture.innerHTML=w.visual;picture.setAttribute('aria-hidden','true');const body=make('div'),status=make('small',undefined,'g4-word-status');status.id=`status-${w.id}`;body.append(make('h3',w.name),make('p',w.meaning),make('small',w.ipa),status);card.append(picture,body,soundButton('Nghe',()=>speak(w.name)));el('vocab-grid-container').append(card);}
  for(const p of unit.patterns){const card=make('article',undefined,'g4-pattern');card.append(make('strong',p.note),make('p',p.question),soundButton('Nghe mẫu',()=>speak(p.question)));el('patterns').append(card);}
  const legacy=el('legacy-rounds');
  for(const [mode,label] of Object.entries({meaning:'Chọn nghĩa',listen:'Nghe tìm từ',spelling:'Nhớ cách viết',sentence:'Xếp câu'})){
    try{const r=JSON.parse(storage.getItem(`danh-g${grade}-${unit.id}-${mode}-v1`));if(!r?.questions?.length)continue;const a=make('a',`Lượt trước: ${label}`);a.href=`legacy.html?unit=${unit.id}&mode=${mode}`;legacy.append(a);legacy.hidden=false;}catch{}
  }
  const contextKey=`danh-g${grade}-${unit.id}-template-context-v1`,tabKey=`danh-g${grade}-${unit.id}-template-tab-v1`;
  const restoredTab=storage.getItem(tabKey);
  function setupRecall(){recall=window.DanhPrimaryRecall.mount({stage:el('context-stage'),words:unit.words,key:contextKey,context:true,update,record(w,result){store.practice(key(w),'context',{correct:result==='first'||result==='corrected',firstTry:result==='first',revealed:result==='seen'});}});}
  setupRecall();
  window.switchTab=(tab,event)=>{recall.hide();fx.stop();for(const s of document.querySelectorAll('.tab-content'))s.classList.toggle('active',s.id===tab);for(const b of document.querySelectorAll('[data-tab]')){const yes=b.dataset.tab===tab;b.classList.toggle('active',yes);b.setAttribute('aria-pressed',String(yes));}if(tab==='game-context')recall.show();if(tab==='vocab')update();event?.currentTarget?.focus({preventScroll:true});};
  for(const b of document.querySelectorAll('[data-tab]'))b.addEventListener('click',e=>window.switchTab(b.dataset.tab,e));
  fx.bindSettings({soundButton:el('sound'),motionButton:el('motion')});
  update();
  window.DanhLesson.mount({topic:`g${grade}${unit.id}`,words:unit.words,speechLocale:'en-GB',mcqMode:'listen-picture',revealSpellingAfterMs:10000,initialCardMode:'picture',cardRevealMs:2200,effects:fx,requireGesture:true,
    initialTab:restoredTab||'vocab',onTabChange(tab){storage.setItem(tabKey,tab);},
    onSelectionChange(ids,changed){selected=ids;if(changed){recall.hide();recall.reset(selected);}},
    onResult({word,game,correct,firstTry,revealed}){store.practice(key(word),game,{correct,firstTry,revealed});update();}
  });
})();
