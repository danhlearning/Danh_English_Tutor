(function(){
 'use strict';
 const $=id=>document.getElementById(id),C=window.DanhGrammarCatalog,Q=window.DanhGrammarQuestions,L=window.DanhGrammarSkills,P=window.DanhGrammarProgress,S=window.DanhGrammarSession,R=window.DanhGrammarRound,storage=window.DanhLearners.storage;
 const loaded=P.load(storage),state=loaded.state,map=Object.fromEntries(Q.map(q=>[q.id,q]));let settings={cefr:'A1',topic:'all',game:'mixed'};
 if(state.skillSetup&&[...L.bands,'all'].includes(state.skillSetup.cefr)&&Object.hasOwn(L.modes,state.skillSetup.game))settings={...settings,cefr:state.skillSetup.cefr,game:state.skillSetup.game};
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function save(){if(!P.save(storage,state))$('message').textContent='Chưa lưu được. Bạn vẫn chơi trong tab này nhé.';}
 if(state.active&&!S.compatible(state.active,map)){state.active=null;save();$('message').textContent='Lượt cũ cần mở lại. Kết quả đã học vẫn được giữ.';}
 if(loaded.warning)$('message').textContent=loaded.warning;
 function go(){const skill=state.active?.skill;location.href='grammar-practice.html?resume=1'+(skill?'&band='+encodeURIComponent(skill.cefr)+'&game='+encodeURIComponent(skill.game):'');}
 function start(review=false,topic=settings.topic){
   let qs;if(review){const ids=new Set([...P.due(state),...P.mistakes(state)]);qs=R.select(Q.filter(q=>ids.has(q.id)),{mode:'review',records:state.records}).slice(0,8);}else qs=L.select(Q,{...settings,topic},R,state.records);
   if(!qs.length){$('message').textContent='Chưa có bộ phù hợp. Chọn mức hoặc kiểu chơi khác nhé.';return;}
   if(state.active&&!confirm('Thay lượt đang chơi bằng lượt mới? Kết quả đã học vẫn được giữ.'))return;
   state.active=S.create(qs,{topic:topic==='all'?'mixed':topic,level:2,mode:review?'review':topic==='all'?'mixed':'topic'});state.active.skill={...settings,topic};save();go();
 }
 function render(){
   document.querySelectorAll('[data-band]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.band===settings.cefr)));
   document.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===settings.game)));
   const available=L.pool(Q,settings),term=$('search').value.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
   $('start').disabled=!available.length;$('resume').hidden=!state.active;$('review').disabled=!(P.due(state).length||P.mistakes(state).length);
   const topics=C.topics.filter(t=>available.some(q=>q.topic===t.id)&&t.title.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').includes(term));
   $('topics').innerHTML=topics.map(t=>`<article class="word-card"><div class="word-body"><h3>${esc(t.title)}</h3><div class="actions"><button data-topic="${t.id}" class="primary">Chơi bài này</button><a class="button" href="grammar-theory.html?topic=${t.id}&level=2">Cách dùng</a></div></div></article>`).join('');
   $('empty').hidden=Boolean(topics.length);$('empty').textContent=available.length?'Chưa thấy bài này. Thử từ khóa khác nhé.':'Bộ này đang được biên soạn. Chọn mức khác để chơi nhé.';
   document.querySelectorAll('[data-topic]').forEach(b=>b.onclick=()=>start(false,b.dataset.topic));
 }
 $('levels').innerHTML=L.bands.concat('all').map(b=>`<button type="button" data-band="${b}" aria-pressed="false">${b==='all'?'Tất cả':b}</button>`).join('');
 $('modes').innerHTML=Object.entries(L.modes).map(([k,v])=>`<button type="button" class="mode" data-game="${k}" aria-pressed="false">${v}</button>`).join('');
 document.querySelectorAll('[data-band]').forEach(b=>b.onclick=()=>{settings.cefr=b.dataset.band;state.skillSetup={...settings};save();render();});
 document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{settings.game=b.dataset.game;state.skillSetup={...settings};save();render();});
 $('start').onclick=()=>start();$('resume').onclick=go;$('review').onclick=()=>start(true);$('search').oninput=render;render();
})();
