/* Khung lớp 2 với nội dung và tiến độ riêng của lớp 1/5. */
(() => {
  'use strict';
  const course=window.DanhPrimaryGrade2Course,grade=course.grade;
  const unit=course.units.find(u=>u.id===document.body.dataset.unit),storage=window.DanhLearners.storage,fx=window.DanhLearningEffects;
  const mode=new URLSearchParams(location.search).get('mode');
  if(['meaning','listen','spelling','sentence'].includes(mode)){location.replace(grade===4?`previous-${unit.id}.html`:`legacy.html?unit=${unit.id}&mode=${mode}`);return;}
  const el=id=>document.getElementById(id),make=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
  const normal=s=>String(s).toLowerCase().replace(/[’‘]/g,"'").replace(/[.,?!]/g,'').replace(/\s+/g,' ').trim();
  const roundKey=`danh-g${grade}-${unit.id}-write-sentence-v1`,tabKey=`danh-g${grade}-${unit.id}-template-tab-v1`;
  let round,tab='vocab',started=0,revealTimer;
  function valid(r){return r?.version===1&&Array.isArray(r.tasks)&&r.tasks.length===unit.patterns.length&&new Set(r.tasks.map(t=>t?.id)).size===r.tasks.length&&r.tasks.every(t=>Number.isInteger(t.id)&&unit.patterns[t.id]&&typeof t.draft==='string'&&Number.isInteger(t.errors)&&t.errors>=0&&Number.isFinite(t.wait)&&t.wait>=0&&[null,'first','retry','revealed'].includes(t.result))&&Number.isInteger(r.index)&&r.index>=0&&r.index<=r.tasks.length&&r.tasks.every((t,i)=>i>=r.index||t.result!==null);}
  try{const saved=JSON.parse(storage.getItem(roundKey));if(valid(saved))round=saved;}catch{}
  function save(){try{storage.setItem(roundKey,JSON.stringify(round));}catch{}}
  function fresh(){round={version:1,index:0,tasks:unit.patterns.map((p,id)=>({id,draft:'',errors:0,wait:0,result:null}))};save();}
  const current=()=>round?.tasks[round.index];
  function pause(){clearTimeout(revealTimer);const q=current();if(q&&started){q.wait+=Math.max(0,performance.now()-started);save();}started=0;fx.stop();}
  function waitReveal(){clearTimeout(revealTimer);const q=current(),button=el('sentence-reveal');button.hidden=true;delete button.dataset.revealReady;started=0;if(tab!=='game-count'||document.hidden||!q||q.result)return;started=performance.now();const show=()=>{if(current()===q&&!q.result&&tab==='game-count'&&!document.hidden){button.hidden=false;button.disabled=false;button.dataset.revealReady='true';}};if(q.wait>=10000)show();else revealTimer=setTimeout(show,10000-q.wait);}
  const speak=text=>window.DanhAnswerSpeech.say(text);
  function status(text,kind=''){el('sentence-feedback').textContent=text;el('sentence-feedback').dataset.kind=kind;}
  function render(){
    if(!round)fresh();const q=current(),stage=el('sentence-stage');stage.replaceChildren();status('');
    const totals={first:0,retry:0,revealed:0};for(const t of round.tasks)if(t.result)totals[t.result]++;
    el('sentence-score').textContent=`${round.index}/${round.tasks.length} · Đúng ngay ${totals.first} · Sửa đúng ${totals.retry} · Đã xem ${totals.revealed}`;
    el('sentence-input').disabled=el('sentence-check').disabled=!q||!!q.result;
    el('sentence-input').closest('.g2-practice-controls').hidden=!q;
    el('sentence-reveal').hidden=true;el('sentence-next').hidden=!q||!q.result;
    el('sentence-next').textContent=round.index===round.tasks.length-1?'Xem tổng kết':'Câu tiếp theo →';
    el('sentence-input').value=q?.draft||'';
    if(!q){stage.append(make('h3','🎉 Hoàn thành!'));const again=make('button','Chơi lại','g2-practice-button');again.type='button';again.onclick=()=>{pause();fresh();render();fx.feedback('start');};stage.append(again);return;}
    const p=unit.patterns[q.id];stage.append(make('p',`Câu ${round.index+1}/${round.tasks.length}`,'g2-practice-count'));if(p.context){const context=make('p',p.context,'g2-pattern');context.lang='en';stage.append(context);}stage.append(make('p',p.note,'g2-practice-meaning'));
    if(q.result){status(q.result==='revealed'?`Đáp án: ${p.question}`:q.result==='retry'?'Em đã sửa đúng!':'Chính xác!',q.result==='revealed'?'revealed':'correct');const listen=make('button','🔊 Nghe lại','g2-audio');listen.type='button';listen.onclick=()=>speak(p.question);stage.append(listen);}
    waitReveal();
  }
  function check(){const q=current();if(!q||q.result)return;const text=el('sentence-input').value;if(!text.trim()){status('Gõ câu tiếng Anh nhé.');return;}q.draft=text;
    if(normal(text)!==normal(unit.patterns[q.id].question)){q.errors++;save();status('Chưa đúng. Thử lại nhé!','wrong');fx.feedback('bad');return;}
    pause();q.result=q.errors?'retry':'first';save();render();fx.feedback(q.errors?'corrected':'good');speak(unit.patterns[q.id].question);
  }
  function switchTab(id,event){pause();tab=id;for(const n of document.querySelectorAll('.tab-content'))n.classList.toggle('active',n.id===id);for(const n of document.querySelectorAll('nav .nav-btn'))n.classList.toggle('active',n===event?.currentTarget);if(id==='game-count')render();}
  window.switchTab=switchTab;
  el('topic-title').textContent=`${unit.icon} Unit ${unit.number} · ${unit.title}`;
  el('vocab-title').textContent='Từ vựng';el('sentences-title').textContent='Mẫu câu';el('sentence-pattern').hidden=true;
  for(const w of unit.words){const card=make('article',undefined,'vocab-card g2-vocab-card'),picture=make('div',undefined,'g2-vocab-image');picture.innerHTML=w.visual;picture.setAttribute('role','img');picture.setAttribute('aria-label',w.meaning);const audio=make('button','🔊 Nghe','g2-audio');audio.type='button';audio.setAttribute('aria-label',`Nghe từ ${w.name}`);audio.onclick=()=>speak(w.name);card.append(picture,make('h3',w.name),make('p',w.ipa,'g2-ipa'),make('p',w.meaning),audio);el('vocab-grid-container').append(card);}
  for(const p of unit.patterns){const item=make('li',undefined,'g2-example'),audio=make('button','🔊 Nghe','g2-audio');audio.type='button';audio.onclick=()=>speak(p.question);item.append(make('strong',p.question),make('span',p.note),audio);el('sentence-examples').append(item);}
  const settings=make('div',undefined,'primary2-settings');for(const [id,label] of [['sound','Âm thanh'],['motion','Chuyển động']]){const b=make('button',label,'g2-audio');b.id=id;b.type='button';settings.append(b);}document.querySelector('header').append(settings);fx.bindSettings({soundButton:el('sound'),motionButton:el('motion')});
  const previous=make('div',undefined,'primary2-previous');
  for(const [key,url,label] of [[`danh-g${grade}-${unit.id}-template-context-v1`,`previous-${unit.id}.html`,'Tiếp tục lượt điền câu trước'],...['meaning','listen','spelling','sentence'].map(m=>[`danh-g${grade}-${unit.id}-${m}-v1`,`legacy.html?unit=${unit.id}&mode=${m}`,'Lượt trước: '+({meaning:'Chọn nghĩa',listen:'Nghe tìm từ',spelling:'Chính tả',sentence:'Xếp câu'})[m]])])if(storage.getItem(key)){const a=make('a',label);a.href=url;previous.append(a);}
  if(grade===4){const a=make('a',unit.id==='unit4'?'🎂 Thiệp mời và bài đọc':'Bài luyện trước');a.href=`previous-${unit.id}.html`;previous.append(a);}
  if(previous.children.length)document.querySelector('.container').prepend(previous);
  el('sentence-input').addEventListener('input',()=>{const q=current();if(q&&!q.result){q.draft=el('sentence-input').value;save();status('');}});
  el('sentence-input').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.repeat&&!e.isComposing){e.preventDefault();check();}});
  el('sentence-check').onclick=check;
  el('sentence-reveal').onclick=()=>{const q=current();if(!q||q.result||el('sentence-reveal').hidden)return;pause();q.result='revealed';save();render();fx.feedback('help');speak(unit.patterns[q.id].question);};
  el('sentence-next').onclick=()=>{if(!current()?.result)return;pause();round.index++;save();render();fx.feedback(current()?'next':'complete');};
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else waitReveal();});window.addEventListener('pagehide',pause);
  document.addEventListener('DOMContentLoaded',()=>{
    const restored=storage.getItem(tabKey),initial=['vocab','sentences','game-flip','game-mcq','game-spelling','game-count'].includes(restored)?restored:'vocab';
    window.DanhLesson.mount({topic:`g${grade}${unit.id}`,words:unit.words,speechLocale:'en-GB',effects:fx,requireGesture:true,useAnswerSpeech:true,initialTab:initial,revealSpellingAfterMs:10000,onTabChange(id){storage.setItem(tabKey,id);}});
  });
})();
