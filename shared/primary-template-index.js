/* Danh mục và lịch ôn theo mẫu lớp 4; dữ liệu riêng từng lớp. */
(() => {
  'use strict';
  const {grade,units}=window.DanhPrimaryTemplateCourse,storage=window.DanhLearners.storage,fx=window.DanhLearningEffects;
  const store=window.DanhPrimaryProgress.createStore(storage,grade),el=id=>document.getElementById(id);
  const all=units.flatMap(unit=>unit.words.map(w=>({...w,key:`${unit.id}:${w.id}`})));
  const make=(tag,text,cls)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;};
  let recall;
  function update(){const due=store.due(all.map(w=>w.key));el('review-count').textContent=due.length?'Có từ cần ôn hôm nay':'Chưa có từ cần ôn. Hãy luyện một Unit trước nhé.';el('review-start').disabled=due.length===0&&!recall?.isIncomplete();el('review-start').textContent=recall?.isIncomplete()?'Tiếp tục lượt ôn':'Bắt đầu ôn';for(const u of units){const s=store.summary(u.words.map(w=>`${u.id}:${w.id}`)),status=el(`${u.id}-status`);status.textContent=s.due ? 'Có từ cần ôn' : s.practised ? 'Đã luyện tập' : '';status.hidden=!status.textContent;}}
  for(const u of units){const card=make('a',undefined,'g4-unit-card');card.href=`${u.id}.html`;const status=make('strong');status.id=`${u.id}-status`;card.append(make('span',`UNIT ${u.number}`,'g4-chip'),make('h2',u.title),make('p',`${u.subtitle} · ${u.focus}`),status,make('span','Vào học →'));el('unit-list').append(card);}
  recall=window.DanhPrimaryRecall.mount({stage:el('review-stage'),words:all,key:`danh-g${grade}-template-review-v1`,record(w,result){store.review(w.key,result==='first');},update});
  el('review-start').addEventListener('click',()=>{const ids=store.due(all.map(w=>w.key));if(!recall.isIncomplete()&&!ids.length)return;el('review-stage').hidden=false;if(!recall.isIncomplete())recall.reset(ids);recall.show();});
  fx.bindSettings({soundButton:el('sound'),motionButton:el('motion')});update();
})();
