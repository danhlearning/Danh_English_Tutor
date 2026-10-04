(() => {
  'use strict';
  const grade=Number(document.body.dataset.grade);
  const units=grade===6?window.DanhGrade6Units:window.DanhGrade7Units;
  const term=new URLSearchParams(location.search).get('term')==='2'?2:1;
  const selected=units.filter(unit=>term===1?unit.number<=6:unit.number>=7);
  const words=selected.flatMap(unit=>unit.words.map(word=>({...word,unit:unit.number})));
  document.title=`Ôn từ vựng học kỳ ${term} · Lớp ${grade} · Danh English Tutor`;
  document.querySelector('#review-title').textContent=`Đảo từ vựng · Học kỳ ${term}`;
  document.querySelector('#review-description').textContent=`Lớp ${grade} · Unit ${term===1?'1–6':'7–12'} · ${words.length} từ trong thư viện. Mỗi lượt 10 câu, kết hợp từ nhiều Unit.`;
  document.querySelector(`[data-term="${term}"]`).setAttribute('aria-current','page');
  if(window.DanhLearners.current)try{
    window.DanhLearners.storage.setItem('danh:learner-route:v1',JSON.stringify({path:location.pathname+location.search,title:document.title,at:Date.now()}));
  }catch{}
  window.DanhVocabularyGame.mount({stage:document.querySelector('#quiz-stage'),words,grade,scope:`term${term}`,length:10});
})();
