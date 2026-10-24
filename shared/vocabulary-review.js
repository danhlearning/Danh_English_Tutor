(() => {
  'use strict';
  const grade=Number(document.body.dataset.grade);
  const units=window[`DanhGrade${grade}Units`];
  const term=new URLSearchParams(location.search).get('term')==='2'?2:1;
  const split=Math.ceil(units.length/2);
  const selected=units.filter(unit=>term===1?unit.number<=split:unit.number>split);
  const words=selected.flatMap(unit=>unit.words.map(word=>({...word,unit:unit.number})));
  document.title=`Ôn từ vựng học kỳ ${term} · Lớp ${grade} · Danh English Tutor`;
  document.querySelector('#review-title').textContent=`Đảo từ vựng · Học kỳ ${term}`;
  const description=document.querySelector('#review-description');
  description.hidden=grade===6;
  description.textContent=grade===6?'':`Unit ${term===1?`1–${split}`:`${split+1}–${units.length}`} · Mỗi lượt tối đa 10 câu.`;
  document.querySelector(`[data-term="${term}"]`).setAttribute('aria-current','page');
  if(window.DanhLearners.current)try{
    window.DanhLearners.storage.setItem('danh:learner-route:v1',JSON.stringify({path:location.pathname+location.search,title:document.title,at:Date.now()}));
  }catch{}
  window.DanhVocabularyGame.mount({stage:document.querySelector('#quiz-stage'),words,grade,scope:`term${term}`,length:10,picture:grade===6?window.DanhGrade6Picture:undefined});
})();
