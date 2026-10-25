(() => {
  'use strict';
  const course=window.DanhPrimaryCourse || {
    grade:3,title:'Đảo khám phá tiếng Anh',intro:'Cùng Cáo Nhỏ học một chút, chơi một lượt, nhớ thêm mỗi ngày!',
    guidance:'Học thẻ từ → chọn game → tự sửa → ôn lại. Mỗi lượt 3–6 nhiệm vụ, không cần chạy đua với đồng hồ.',
    zones:['🌱 Làm quen và khám phá bản thân','🏫 Một ngày vui ở trường','🏡 Tổ ấm của chúng mình','🌳 Thế giới vui chơi'],units:window.DanhGrade3Units
  };
  const grade=course.grade,units=course.units,zoneSize=Math.ceil(units.length/4), storage=window.DanhLearners.storage, fx=window.DanhLearningEffects;
  const app=document.querySelector('#app');
  const modes={meaning:'🎯 Chọn nghĩa',listen:'🎧 Nghe tìm từ',spelling:'✏️ Nhớ cách viết',sentence:'🧩 Xếp câu'};
  const labels={first:'⭐ Đúng ngay',corrected:'🌱 Tự sửa đúng',helped:'💡 Đúng có gợi ý',seen:'👀 Đã xem',skipped:'⏭ Đã bỏ qua'};
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const read=key=>{try{return JSON.parse(storage.getItem(key));}catch{return null;}};
  const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
  const normalize=s=>s.toLowerCase().replace(/[.,!?]/g,'').trim().replace(/\s+/g,' ');
  const image=w=>{const picture=window.DanhPrimaryTemplateCourse?.units.flatMap(u=>u.words).find(a=>a.name===w.term)?.image;if(picture)return `<img class="word-art" src="${esc(picture)}" alt="" loading="lazy" width="180" height="180">`;return /^[a-z-]+$/.test(w.art||'')?`<img class="word-art" src="../../shared/assets/vocabulary-3d/${w.art}-3d-v1.webp" alt="" loading="lazy" width="180" height="180">`:`<span class="emoji" aria-hidden="true">${esc(w.art||'🧩')}</span>`;};
  let unit=units.find(u=>u.id===(document.body.dataset.unit||new URLSearchParams(location.search).get('unit'))),mode,round;
  const modeUrl=m=>{const p=new URLSearchParams();if(location.pathname.endsWith('/legacy.html')&&unit)p.set('unit',unit.id);if(m)p.set('mode',m);return location.pathname+(p.size?'?'+p:'');};
  const key=(u,m)=>`danh-g${grade}-${u.id}-${m}-v1`;
  const items=(u,m)=>m==='sentence'?u.sentences:u.words;
  function valid(r,u,m){
    const bank=items(u,m), ids=bank.map(w=>w.id);
    return r?.version===1 && Array.isArray(r.questions) && r.questions.length>0 && r.questions.length<=bank.length && r.questions.every(q=>q&&typeof q==='object') &&
      new Set(r.questions.map(q=>q.id)).size===r.questions.length && Number.isInteger(r.index) && r.index>=0 && r.index<=r.questions.length &&
      r.questions.every((q,i)=>ids.includes(q.id)&&Number.isInteger(q.errors)&&q.errors>=0&&typeof q.hint==='boolean'&&typeof q.draft==='string'&&
        (q.result===null||Object.hasOwn(labels,q.result))&&(i>=r.index||q.result!==null)&&Array.isArray(q.picks)&&
        Array.isArray(q.order)&& (m==='sentence' ? q.order.length===bank.find(w=>w.id===q.id).term.split(' ').length && new Set(q.order).size===q.order.length && q.order.every(n=>Number.isInteger(n)&&n>=0&&n<q.order.length) && new Set(q.picks).size===q.picks.length&&q.picks.every(n=>q.order.includes(n)) : q.order.length===4&&new Set(q.order).size===4&&q.order.includes(q.id)&&q.order.every(id=>ids.includes(id))));
  }
  function saved(u,m){const r=read(key(u,m));return valid(r,u,m)?r:null;}
  function persist(){storage.setItem(key(unit,mode),JSON.stringify(round));}
  function notify(text){document.querySelector('#feedback').textContent=text;}
  function speak(text){
    if(window.DanhListenControls?.isManualRequest())return window.DanhAnswerSpeech.listen(text);
    if(window.DanhGameFlow?.isPlaying())return window.DanhAnswerSpeech.say(text);
    if(!fx.soundEnabled()){notify('Em hãy bật âm thanh rồi bấm nghe nhé.');return;}
    if(!window.speechSynthesis||!window.SpeechSynthesisUtterance){window.DanhAnswerSpeech.say(text);return;}
    speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';window.DanhYoungSpeech.configure(utterance);
    utterance.onerror=()=>notify('Chưa phát được giọng đọc. Em thử lại hoặc chọn game khác nhé.');speechSynthesis.speak(utterance);
  }
  function catalog(){
    app.innerHTML=`<section class="hero"><div><span class="eyebrow">DANH ENGLISH TUTOR · LỚP ${grade}</span><h1>${esc(course.title)}</h1><p>${esc(course.intro)}</p><a class="primary button" href="#journey">Khám phá ${units.length} chặng ↓</a></div><img src="../../grade/lop3/assets/adventure.webp" alt="Cáo Nhỏ và hai bạn cùng khám phá hòn đảo trường học" width="720" height="480"></section><section class="intro"><h2>Hôm nay mình chơi gì?</h2><p>${esc(course.guidance)}</p><p>Mỗi lượt ${Math.min(...units.map(u=>u.sentences.length))}–${Math.max(...units.map(u=>u.words.length))} nhiệm vụ. Chọn chặng theo chủ đề em muốn luyện.</p></section><div class="legend">⭐ 1 sao cho mỗi câu đúng ngay trong lượt · 🌱 Tự sửa cũng là tiến bộ!</div><section id="journey" aria-label="${units.length} chặng học">${[0,1,2,3].map(zone=>`<h2 class="zone">${esc(course.zones[zone])}</h2><div class="unit-grid">${units.slice(zone*zoneSize,zone*zoneSize+zoneSize).map(u=>{
      const rounds=Object.keys(modes).map(m=>({m,r:saved(u,m)}));const active=rounds.find(x=>x.r&&x.r.index<x.r.questions.length),done=rounds.filter(x=>x.r&&x.r.index===x.r.questions.length).length;
      return `<a class="unit-card" href="${u.id}.html${active?'?mode='+active.m:''}"><span class="unit-icon" aria-hidden="true">${u.words.some(w=>/^[a-z-]+$/.test(w.art))?image(u.words.find(w=>/^[a-z-]+$/.test(w.art))):u.icon}</span><span class="eyebrow">CHẶNG ${String(u.number).padStart(2,'0')}</span><h3>${esc(u.title)}</h3><p>${esc(u.subtitle)}</p><span class="card-status">${active?'▶ Tiếp tục lượt dở':done?`✓ ${done}/4 game có lượt đã xong`:'Bắt đầu khám phá →'}</span></a>`;
    }).join('')}</div>`).join('')}</section>`;
  }
  function header(){return `<a class="back" href="lop${grade}.html#journey">← Bản đồ ${units.length} chặng</a><div class="lesson-title"><span aria-hidden="true">${unit.icon}</span><div><p class="eyebrow">CHẶNG ${unit.number} · ${esc(unit.subtitle)}</p><h1>${esc(unit.title)}</h1><p>${esc(unit.goal)}</p></div></div><nav class="tabs" aria-label="Chọn cách học"><button data-action="learn" ${!mode?'aria-current="page"':''}>📖 Học trước khi chơi</button>${Object.entries(modes).map(([m,label])=>`<button data-mode="${m}" ${mode===m?'aria-current="page"':''}>${label}</button>`).join('')}</nav>`;}
  function learn(){mode=null;round=null;history.replaceState(null,'',modeUrl(null));app.innerHTML=header()+`<section><h2>Nghe, đọc và nhớ từ</h2><p>Bấm “Lật nghĩa” để tự nhớ trước khi xem. Mở thẻ chưa được tính là hoàn thành game.</p><div class="word-grid">${unit.words.map(w=>`<article class="word-card">${image(w)}<h3>${esc(w.term)}</h3><button data-flip="${w.id}" aria-expanded="false">Lật nghĩa</button><p id="meaning-${w.id}" hidden>${esc(w.meaning)}</p><button data-speak="${esc(w.term)}" aria-label="Nghe ${esc(w.term)}">🔊 Nghe</button></article>`).join('')}</div><h2>Mẫu câu để nói cùng bạn</h2><div class="examples">${unit.sentences.map(s=>`<article><strong>${esc(s.term)}</strong><p>${esc(s.meaning)}</p><button data-speak="${esc(s.term)}">🔊 Nghe câu mẫu</button></article>`).join('')}</div></section><p id="feedback" role="status" aria-live="polite"></p>`;}
  function select(m){fx.stop();mode=m;history.replaceState(null,'',modeUrl(m));round=saved(unit,mode);if(round){render();return;}
    app.innerHTML=header()+`<section class="panel"><span class="big-icon">${modes[mode].split(' ')[0]}</span><h2>${modes[mode]}</h2><p>${{meaning:'Đọc nghĩa tiếng Việt và chọn từ tiếng Anh phù hợp.',listen:'Bấm nghe, rồi chọn từ em vừa nghe. Bật âm thanh để chơi nhé!',spelling:'Đọc nghĩa và tự gõ từ tiếng Anh.',sentence:'Đọc tình huống tiếng Việt, rồi bấm các mảnh từ để tạo câu.'}[mode]}</p><p>Lượt này có <strong>${items(unit,mode).length} nhiệm vụ</strong>. Sai thì thử lại; mỗi câu đúng ngay nhận 1 sao.</p><button class="primary" data-action="start">Bắt đầu chơi</button><p id="feedback" role="status" aria-live="polite"></p></section>`;
  }
  function start(ids){const bank=items(unit,mode);round={version:1,index:0,questions:shuffle(ids||bank.map(w=>w.id)).map(id=>({id,errors:0,hint:false,draft:'',picks:[],result:null,order:mode==='sentence'?shuffle(bank.find(w=>w.id===id).term.split(' ').map((_,i)=>i)):shuffle([id,...shuffle(bank.filter(w=>w.id!==id).map(w=>w.id)).slice(0,3)])}))};persist();fx.feedback('start');render();}
  function current(){const q=round.questions[round.index];return {q,w:items(unit,mode).find(w=>w.id===q.id)};}
  function render(){
    if(round.index===round.questions.length){summary();return;}
    const {q,w}=current(),done=!!q.result;
    const upcoming=round.questions.slice(round.index,round.index+3).map(q=>items(unit,mode).find(w=>w.id===q.id));
    const prompt=mode==='listen'?'Bấm nghe và tìm từ đúng':mode==='sentence'?w.meaning:`Từ nào có nghĩa “${w.meaning}”?`;
    app.innerHTML=header()+`<section class="panel"><div class="round-top"><span>Nhiệm vụ ${round.index+1}/${round.questions.length}</span><span>⭐ ${round.questions.filter(q=>q.result==='first').length} sao</span></div><progress max="${round.questions.length}" value="${round.index}" aria-label="Tiến trình lượt chơi"></progress><h2 id="question" tabindex="-1">${esc(prompt)}</h2>${mode!=='listen'&&mode!=='sentence'?`<div class="question-art">${image(w)}</div>`:''}${mode==='listen'?'<button class="listen" data-action="listen">🔊 Nghe từ bí mật</button>':''}${mode==='meaning'||mode==='listen'?`<div class="choices">${q.order.map(id=>{const a=unit.words.find(w=>w.id===id);return `<button data-answer="${id}" ${done?'disabled':''}>${esc(a.term)}</button>`;}).join('')}</div>`:mode==='spelling'?`<label for="answer">Gõ từ tiếng Anh</label><input id="answer" autocomplete="off" autocapitalize="off" spellcheck="false" value="${esc(q.draft)}" ${done?'disabled':''}><button class="primary" data-action="check" ${done?'disabled':''}>Kiểm tra</button>`:`<p>Bấm mảnh đã chọn để trả lại.</p><div class="sentence-built" aria-label="Câu em ghép">${q.picks.map((n,i)=>`<button data-remove="${i}" ${done?'disabled':''}>${esc(w.term.split(' ')[n])}</button>`).join('')||'<span>Câu của em sẽ ở đây…</span>'}</div><div class="tokens">${q.order.map(n=>`<button data-token="${n}" ${done||q.picks.includes(n)?'disabled':''}>${esc(w.term.split(' ')[n])}</button>`).join('')}</div><button class="primary" data-action="check" ${done?'disabled':''}>Kiểm tra câu</button>`}
      <div id="feedback" class="feedback" role="status" aria-live="polite">${done?`${labels[q.result]} · ${esc(w.term)} — ${esc(w.meaning)}`:q.hint?hintText(w):q.errors?'🌱 Em đã thử rồi. Hãy suy nghĩ và thử lại nhé!':''}</div>
      ${done?`<button class="primary" data-action="next">${round.index+1===round.questions.length?'Xem tổng kết':'Nhiệm vụ tiếp theo →'}</button>`:`<div class="helpers"><button data-action="hint">💡 Gợi ý</button><button data-action="reveal">Xem đáp án</button><button data-action="skip">Bỏ qua</button></div>`}</section>`;
    window.DanhGameFlow?.prepare(upcoming,app.querySelector('#question'));
  }
  function hintText(w){return mode==='sentence'?`💡 Câu bắt đầu bằng “${esc(w.term.split(' ')[0])}”.`:mode==='listen'?'💡 Nghe lại và chú ý âm đầu của từ.':`💡 Từ hoặc cụm từ bắt đầu bằng “${esc(w.term[0])}”, gồm ${w.term.replace(/[^a-z]/gi,'').length} chữ cái.`;}
  function answer(value){const {q,w}=current();if(q.result)return;if(!value.trim()){notify('Em hãy thử trả lời trước nhé.');return;}
    if(normalize(value)===normalize(w.term)){q.result=q.hint?'helped':q.errors?'corrected':'first';persist();fx.feedback(q.result==='first'?'good':'corrected');render();window.DanhAnswerSpeech.say(w.term);}
    else{q.errors++;persist();fx.feedback('bad');notify(mode==='sentence'?'🌱 Chưa khớp câu mẫu. Em thử đổi thứ tự; nhớ chủ ngữ đứng trước động từ nhé.':'🌱 Chưa đúng rồi. Em thử lại hoặc dùng gợi ý nhé!');}
  }
  function summary(){const counts=Object.fromEntries(Object.keys(labels).map(k=>[k,round.questions.filter(q=>q.result===k).length]));const weak=round.questions.filter(q=>q.result!=='first');app.innerHTML=header()+`<section class="panel"><span class="big-icon">🌟</span><h2>Em đã hoàn thành lượt chơi!</h2><p class="stars">${counts.first}/${round.questions.length} sao đúng ngay</p><p>Cảm ơn em đã kiên trì luyện tập. Mỗi lần tự sửa là một bước tiến!</p><div class="results">${Object.entries(labels).map(([k,label])=>`<p>${label}: <strong>${counts[k]}</strong></p>`).join('')}</div><p>Sao ghi nhận lượt chơi này; hãy quay lại ôn để nhớ lâu hơn.</p>${weak.length?`<button class="primary" data-action="review">Ôn ${weak.length} mục cần luyện</button>`:'<p>Thử một game khác để luyện thêm kỹ năng nhé!</p>'}<button data-action="restart">Chơi lượt mới</button><button data-action="learn">Xem lại thẻ từ</button>${unit.number<units.length?`<a class="button" href="unit${unit.number+1}.html">Chặng tiếp theo →</a>`:''}<p id="feedback" role="status" aria-live="polite"></p></section>`;}
  app.addEventListener('input',e=>{if(e.target.id==='answer'&&round){current().q.draft=e.target.value;persist();}});
  app.addEventListener('keydown',e=>{if(e.target.id==='answer'&&e.key==='Enter'){e.preventDefault();answer(e.target.value);}});
  app.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b||b.disabled||!b.isConnected)return;
    if(b.dataset.mode){select(b.dataset.mode);return;}
    if(b.dataset.speak){speak(b.dataset.speak);return;}
    if(b.dataset.flip){const p=document.querySelector('#meaning-'+b.dataset.flip);p.hidden=!p.hidden;b.setAttribute('aria-expanded',String(!p.hidden));b.textContent=p.hidden?'Lật nghĩa':'Ẩn nghĩa';fx.feedback('flip',b);return;}
    const action=b.dataset.action;
    if(action==='learn'){fx.stop();learn();return;}
    if(action==='start'||action==='restart'){start();return;}
    if(action==='review'){start(round.questions.filter(q=>q.result!=='first').map(q=>q.id));return;}
    if(!round||round.index>=round.questions.length)return;
    const {q,w}=current();
    if(action==='next'&&q.result){fx.stop();round.index++;persist();fx.feedback(round.index===round.questions.length?'complete':'next');render();document.querySelector('#question')?.focus();return;}
    if(action==='listen'){speak(w.term);return;}
    if(q.result)return;
    if(b.dataset.answer){answer(unit.words.find(w=>w.id===b.dataset.answer).term);return;}
    if(b.dataset.token!==undefined){q.picks.push(Number(b.dataset.token));persist();fx.feedback('tap');render();return;}
    if(b.dataset.remove!==undefined){q.picks.splice(Number(b.dataset.remove),1);persist();render();return;}
    if(action==='check'){answer(mode==='sentence'?q.picks.map(n=>w.term.split(' ')[n]).join(' '):document.querySelector('#answer').value);return;}
    if(action==='hint'){q.hint=true;persist();fx.feedback('help');notify(hintText(w));return;}
    if(action==='reveal'||action==='skip'){q.result=action==='reveal'?'seen':'skipped';persist();fx.feedback('help');render();}
  });
  fx.bindSettings({soundButton:document.querySelector('#sound'),motionButton:document.querySelector('#motion')});
  if(unit){document.title=`${unit.title} · Lớp ${grade} · Danh English Tutor`;const m=new URLSearchParams(location.search).get('mode');if(Object.hasOwn(modes,m))select(m);else learn();}else catalog();
})();
