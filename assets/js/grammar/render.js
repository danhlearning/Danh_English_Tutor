(function () {
  'use strict';
  const C=window.DanhGrammarCatalog,Q=window.DanhGrammarQuestions,A=window.DanhGrammarAnswer,R=window.DanhGrammarRound,P=window.DanhGrammarProgress,S=window.DanhGrammarSession;
  const $=id=>document.getElementById(id), map=Object.fromEntries(Q.map(q=>[q.id,q])), params=new URLSearchParams(location.search);
  let storage;try{storage=(window.DanhLearners?.storage || window.localStorage);}catch{storage={getItem(){throw Error();},setItem(){throw Error();},removeItem(){throw Error();}};}
  const loaded=P.load(storage),state=loaded.state; let saveWarning=false, lastTick=performance.now(), transitionLock=false;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const topicById=id=>C.topics.find(t=>t.id===id);
  const typeNames={choice:'Chọn đáp án',fill:'Điền từ',order:'Xếp câu',correct:'Sửa lỗi',rewrite:'Viết lại câu'};
  const fx=(name,element)=>window.DanhGrammarExperience?.event(name,element);
  function notice(text){$('notice').textContent=text;}
  function persist(){if(!P.save(storage,state)&&!saveWarning){saveWarning=true;notice('Trình duyệt chưa lưu được tiến độ. Em vẫn có thể luyện; hãy giữ trang mở để tiếp tục lượt này.');}}
  if(loaded.warning)notice(loaded.warning);
  if(state.active&&!S.compatible(state.active,map)){state.active=null;persist();notice('Bài học đã được cập nhật hoặc lượt lưu không còn hợp lệ. Hãy bắt đầu một lượt mới; kết quả trước vẫn được giữ.');}
  function safeRecords(){for(const [id,value] of Object.entries(state.records))if(!map[id]||!value||typeof value!=='object'||!['first','corrected','seen','skipped'].includes(value.kind)||!Number.isFinite(value.due))delete state.records[id];state.rounds=state.rounds.filter(r=>r&&Array.isArray(r.outcomes)&&r.outcomes.length===r.total&&r.outcomes.every(o=>o&&['first','corrected','seen','skipped'].includes(o.kind))&&Array.isArray(r.questionIds)&&r.questionIds.every(id=>map[id])&&Array.isArray(r.families)&&Number.isFinite(r.ended));}
  safeRecords();
  function level(){return Number($('level-select')?.value||params.get('level')||1);}
  function topicStatus(topic,l){return P.mastered(state,topic.id,l,Q)?'<span class="badge green">Đã vững</span>':Object.values(state.records).some(r=>r.topic===topic.id&&r.level===l&&r.needsReview)?'<span class="badge">Cần ôn</span>':Object.values(state.records).some(r=>r.topic===topic.id&&r.level===l)?'<span class="badge">Đang luyện</span>':'';}
  function renderHome(){
    const l=level(),term=A.normalize($('search').value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
    const records=Object.values(state.records),learnt=new Set(records.map(r=>r.familyId)).size,due=P.due(state).length;
    $('learnt-count').textContent=learnt;$('due-count').textContent=due;$('round-count').textContent=state.rounds.length;
    $('review-start').disabled=!(P.mistakes(state).length||due);
    $('continue-panel').hidden=!state.active;
    if(state.active){const active=state.active;$('continue-label').textContent=`${active.mode==='mixed'?'Ôn tổng hợp':topicById(active.topic)?.title||'Ôn tập'} · Câu ${active.index+1}/${active.questionIds.length}`;}
    let visible=0;
    $('cards').innerHTML=C.groups.map(group=>{
      const topics=C.topics.filter(t=>t.group===group.id&&(!term||`${t.title} ${group.title} ${t.rule}`.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().includes(term)));
      if(!topics.length)return '';visible+=topics.length;
      return `<section class="topic-card"><div class="card-icon" aria-hidden="true">${group.icon}</div><h2>${group.title}</h2><p class="muted">${group.description}</p><details ${term?'open':''}><summary>${topics.length===1?'Chọn bài và bắt đầu':`${topics.length} bài học · Chọn bài`}</summary><ul class="topic-links">${topics.map(t=>`<li><strong>${t.title}${topicStatus(t,l)}</strong><div class="actions"><a class="button soft" href="grammar-theory.html?topic=${t.id}&level=${l}">Lý thuyết</a><a class="button primary" href="grammar-practice.html?topic=${t.id}&level=${l}">Bắt đầu làm</a></div></li>`).join('')}</ul></details><div class="actions"><a class="button soft" href="grammar-theory.html?group=${group.id}&level=${l}">📖 Lý thuyết</a><a class="button primary" href="grammar-practice.html?group=${group.id}&level=${l}">✍️ Luyện tập</a></div></section>`;
    }).join('');$('empty-search').hidden=visible>0;
  }
  function prepareSettings(){
    const body=document.body,group=params.get('group')||body.dataset.group||'',requested=params.get('topic');
    const topics=C.topics.filter(t=>!group||t.group===group);
    const validTopics=topics.length?topics:C.topics;
    $('topic-select').innerHTML=validTopics.map(t=>`<option value="${t.id}">${t.title}</option>`).join('');
    if(validTopics.some(t=>t.id===requested))$('topic-select').value=requested;
    const l=Number(params.get('level'));$('level-select').value=[1,2,3].includes(l)?l:1;
  }
  function chosenTopics(){return [...document.querySelectorAll('[name=mixed-topic]:checked')].map(el=>el.value);}
  function reviewPool(topic=null,l=null){const ids=new Set([...P.due(state),...P.mistakes(state)]);return Q.filter(q=>ids.has(q.id)&&(!topic||q.topic===topic)&&(!l||q.level===l));}
  function start(mode='topic', selectedTopics=[]){
    const t=$('topic-select')?.value||null,l=level();
    let pool=mode==='review'?reviewPool(t,l):Q.filter(q=>q.level===l&&(mode==='mixed'?selectedTopics.includes(q.topic):q.topic===t));
    if(mode==='mixed'&&selectedTopics.length<2){notice('Chọn ít nhất hai bài để luyện tổng hợp.');return;}
    if(!pool.length){notice(mode==='review'?'Chưa có câu cần ôn ở bài và cấp độ này.':'Chưa có câu phù hợp. Hãy chọn bài khác.');return;}
    if(state.active&&!confirm('Bắt đầu lượt mới sẽ thay lượt đang làm. Kết quả đã ghi vẫn được giữ. Tiếp tục?'))return;
    const questions=R.select(pool,{mode,records:state.records});
    if(!questions.length){notice('Chưa đủ câu phù hợp để mở lượt này.');return;}
    state.active=S.create(questions,{topic:mode==='mixed'?'mixed':t,level:l,mode,topics:selectedTopics});notice('');persist();
    if($('practice')){showPractice();fx('start',$('practice'));}else location.href='grammar-practice.html?resume=1';
  }
  function homeReview(){
    if(state.active&&!confirm('Mở lượt ôn sẽ thay lượt đang làm. Kết quả đã ghi vẫn được giữ. Tiếp tục?'))return;
    const pool=reviewPool();if(!pool.length)return;
    const qs=R.select(pool,{mode:'review',records:state.records});
    const topics=new Set(qs.map(q=>q.topic)),levels=new Set(qs.map(q=>q.level));
    state.active=S.create(qs,{topic:topics.size===1?qs[0].topic:'mixed',level:levels.size===1?qs[0].level:0,mode:'review'});persist();location.href='grammar-practice.html?resume=1';
  }
  function current(){return map[state.active?.questionIds[state.active.index]];}
  function support(){const session=state.active,q=current();if(!session||!q||!$('practice')||$('practice').hidden)return;
    $('hint-btn').disabled=!S.canHint(session,q)||Boolean(S.result(session));$('reveal-btn').disabled=!S.canReveal(session)||Boolean(S.result(session));
    $('timer-message').textContent=S.result(session)?'':S.canReveal(session)?'Em có thể thử tiếp hoặc chủ động xem đáp án.':session.attempts===1?'Em có thể thử lại. Đáp án vẫn được giữ để em tự giải.':'Gợi ý sẽ mở khi em cần thêm thời gian. Không tính điểm theo tốc độ.';
  }
  function renderTokens(){const s=state.active,q=current();
    const selected=new Set(s.order);$('selected-tokens').innerHTML=s.order.map(i=>`<button type="button" data-token="${i}" data-remove="1" aria-label="Trả lại từ ${escape(q.tokens[i])}">${escape(q.tokens[i])}</button>`).join('')||'<span class="muted">Câu của em sẽ xuất hiện ở đây</span>';
    $('available-tokens').innerHTML=s.tokenOrder.filter(i=>!selected.has(i)).map(i=>`<button type="button" data-token="${i}" aria-label="Chọn từ ${escape(q.tokens[i])}">${escape(q.tokens[i])}</button>`).join('');
    document.querySelectorAll('[data-token]').forEach(button=>{button.disabled=Boolean(S.result(s));button.onclick=()=>{const i=Number(button.dataset.token);if(button.dataset.remove)s.order=s.order.filter(n=>n!==i);else if(!s.order.includes(i))s.order.push(i);s.answer=s.order.map(n=>q.tokens[n]).join(' ');persist();renderTokens();($('available-tokens').querySelector('button')||$('check-btn')).focus({preventScroll:true});};});
  }
  function showPractice(){
    const s=state.active;if(!s)return;
    document.body.classList.add('is-practicing');$('setup-panel').hidden=true;$('resume-panel').hidden=true;$('results').hidden=true;$('practice').hidden=false;const q=current();
    $('lesson-title').textContent=topicById(q.topic).title;$('lesson-level').textContent=`${C.levels[q.level-1]} · ${s.mode==='review'?'Ôn tập':s.mode==='mixed'?'Ôn tổng hợp':'Luyện theo bài'}`;
    $('counter').textContent=`Câu ${s.index+1}/${s.questionIds.length}`;$('progress-fill').style.width=`${s.index/s.questionIds.length*100}%`;
    $('question-label').textContent=typeNames[q.type];$('instruction').textContent=q.instruction;$('question').textContent=q.prompt;$('question').hidden=q.type==='order';
    $('scaffold-text').textContent=q.scaffold;$('scaffold').hidden=!q.scaffold;
    $('cue').textContent=q.cue?`Từ gợi ý: ${q.cue}`:'';$('cue').hidden=!q.cue;
    $('theory-link').href=q.theoryUrl;$('theory-link').textContent='Xem lý thuyết bài này';
    $('options').hidden=q.type!=='choice';$('typed-answer').hidden=['choice','order'].includes(q.type);$('order-answer').hidden=q.type!=='order';
    if(q.type==='choice'){
      if(!s.optionOrder.length)s.optionOrder=R.shuffle(q.options.map((_,i)=>i));
      $('options').innerHTML=s.optionOrder.map(i=>`<button type="button" data-option="${i}" aria-pressed="${s.answer===q.options[i]}">${escape(q.options[i])}</button>`).join('');
      document.querySelectorAll('[data-option]').forEach(b=>{b.disabled=Boolean(S.result(s));b.onclick=()=>{s.answer=q.options[Number(b.dataset.option)];persist();document.querySelectorAll('[data-option]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));};});
    }else if(q.type==='order'){
      if(!s.tokenOrder.length)s.tokenOrder=R.shuffle(q.tokens.map((_,i)=>i));renderTokens();
    }else{$('answer-input').value=s.answer;$('answer-input').disabled=Boolean(S.result(s));}
    $('feedback').textContent='';$('feedback').hidden=true;$('explanation').hidden=true;$('hint-text').hidden=!s.hint;$('hint-text').textContent=q.hint;
    $('check-btn').hidden=Boolean(S.result(s));$('next-btn').hidden=!S.result(s);$('skip-btn').disabled=Boolean(S.result(s));
    if(S.result(s))showOutcome();else if(s.attempts>0){$('feedback').hidden=false;$('feedback').className='response retry';$('feedback').textContent='Câu trả lời chưa khớp. Em hãy thử lại.';}
    persist();support();lastTick=performance.now();$('question-label').focus({preventScroll:true});
  }
  function showOutcome(){const s=state.active,q=current(),result=S.result(s);if(!result)return;
    const labels={first:'✅ Đúng ngay lần đầu!',corrected:'✅ Em đã sửa đúng. Câu này sẽ được ôn lại.',seen:'📖 Đã xem đáp án. Em có thể đọc giải thích rồi tiếp tục.',skipped:'↪️ Em đã bỏ qua câu này. Hãy luyện lại khi sẵn sàng.'};
    $('feedback').hidden=false;$('feedback').className=`response ${['first','corrected'].includes(result.kind)?'good':''}`;$('feedback').textContent=labels[result.kind];
    if(result.kind!=='skipped'){$('explanation').hidden=false;$('explanation').textContent=q.explanation;}
    $('next-btn').textContent=s.index===s.questionIds.length-1?'Xem kết quả':'Câu tiếp theo →';support();
  }
  function finish(kind){const s=state.active,q=current();if(!S.finishQuestion(s,kind))return;P.record(state,q,S.result(s),s.id);persist();showPractice();fx(kind==='first'?'correct':kind==='corrected'?'corrected':kind==='seen'?'reveal':'skip',$('feedback'));}
  function check(){const s=state.active,q=current();if(!s||S.result(s))return;
    if(!A.normalize(s.answer)){$('feedback').hidden=false;$('feedback').className='response retry';$('feedback').textContent=q.type==='choice'?'Em hãy chọn một đáp án.':q.type==='order'?'Em hãy chọn các từ để xếp câu.':'Em hãy nhập câu trả lời.';return;}
    if(A.accepted(q,s.answer))finish(s.attempts===0?'first':'corrected');
    else{const normalized=A.normalize(s.answer),changed=s.lastAttempt!==normalized;if(changed){s.attempts++;s.lastAttempt=normalized;}persist();$('feedback').hidden=false;$('feedback').className='response retry';$('feedback').textContent=q.type==='rewrite'?'Câu của em chưa khớp đáp án mẫu. Em hãy giữ nghĩa và dùng đúng từ yêu cầu.':'Chưa đúng. Em hãy đọc lại câu và thử lần nữa.';support();if(changed)fx('retry',$('feedback'));}
  }
  function showResults(round){
    document.body.classList.remove('is-practicing');$('practice').hidden=true;$('setup-panel').hidden=true;$('results').hidden=false;
    const counts={first:0,corrected:0,seen:0,skipped:0};for(const o of round.outcomes)counts[o.kind]++;
    $('score').textContent=`${counts.first}/${round.total}`;$('result-caption').textContent='Số câu đúng ngay lần đầu';
    $('result-counts').innerHTML=[['first','Đúng ngay'],['corrected','Đã sửa đúng'],['seen','Đã xem đáp án'],['skipped','Chưa hoàn thành']].map(([key,title])=>`<div class="stat"><strong>${counts[key]}</strong><span>${title}</span></div>`).join('');
    const errors=round.questionIds.filter((id,i)=>round.outcomes[i].kind!=='first').slice(0,3);
    $('errors-heading').textContent=errors.length?'Những phần nên ôn lại':'Em đã hoàn thành tốt lượt này';
    $('error-list').innerHTML=errors.map(id=>{const q=map[id];return `<li><strong>${topicById(q.topic).title}</strong><p>${escape(q.type==='rewrite'?q.prompt:q.type==='order'?'Luyện sắp xếp câu':q.prompt)}</p><a href="${q.theoryUrl}">Đọc lại cách dùng</a></li>`;}).join('');
    $('result-review').disabled=reviewPool(round.topic==='mixed'?null:round.topic,round.level||null).length===0;
    $('mastery-message').textContent=round.topic!=='mixed'&&round.level&&P.mastered(state,round.topic,round.level,Q)?'Đã vững: em đã đạt hai lượt khác nhau và một lượt ôn sau ít nhất 7 ngày.':'Tiếp tục luyện và ôn lại để nhớ lâu. Một lượt hoàn thành chưa phải là đã vững.';
    $('results-heading').focus();fx('finish',$('results'));
  }
  function next(){if(transitionLock||!state.active)return;transitionLock=true;const s=state.active,changed=S.next(s);
    if(changed==='complete'){P.completed(state,s);persist();showResults(state.rounds[state.rounds.length-1]);}
    else if(changed){persist();showPractice();fx('next',$('practice'));$('practice').scrollIntoView({block:'start',behavior:'auto'});}
    setTimeout(()=>{transitionLock=false;},300);
  }
  function renderTheory(){const t=topicById($('topic-select').value),l=level();
    $('theory-title').textContent=t.title;$('theory-rule').textContent=t.rule;$('pitfall').textContent=t.pitfall;
    $('examples').innerHTML=t.examples.map(([en,vi])=>`<div class="example"><strong>${escape(en)}</strong><div class="muted">${escape(vi)}</div></div>`).join('');
    $('theory-practice').href=`grammar-practice.html?topic=${t.id}&level=${l}`;
    $('quick-questions').innerHTML=t.seeds.slice(0,3).map((seed,i)=>`<div class="quick-question"><p>${escape(seed.sentence.replace(seed.focus,'_____'))}</p><div class="actions">${R.shuffle([seed.focus,seed.wrong]).map(v=>`<button type="button" data-quick="${i}" data-answer="${escape(v)}">${escape(v)}</button>`).join('')}</div><div class="quick-feedback" id="quick-${i}" role="status" aria-live="polite"></div></div>`).join('');
    document.querySelectorAll('[data-quick]').forEach(b=>b.onclick=()=>{const seed=t.seeds[Number(b.dataset.quick)],feedback=$(`quick-${b.dataset.quick}`);if(b.dataset.answer===seed.focus){feedback.textContent=`✅ Chính xác. ${t.rule}`;b.parentElement.querySelectorAll('button').forEach(button=>button.disabled=true);fx('correct',feedback);}else{feedback.textContent='Chưa đúng. Hãy đọc cách dùng ở trên rồi thử lại.';fx('retry',feedback);}});
    const timeline=$('timeline');timeline.hidden=!['tenses','advanced'].includes(t.group)||!['tenses'].includes(t.group)&&t.id!=='tense-contrast';
    if(!timeline.hidden)timeline.textContent=t.id==='future-simple'?'Hiện tại ─────────→ Tương lai: will + V':t.id==='present-perfect'?'Bắt đầu / trải nghiệm trong quá khứ ─────→ Còn liên quan hiện tại':t.id.startsWith('past')?'Quá khứ: việc đã xảy ra ─────────→ Hiện tại':'Hiện tại: thói quen hoặc việc đang diễn ra';
  }
  const page=document.body.dataset.page;
  if(page==='home'){
    $('level-select').value=[1,2,3].includes(Number(params.get('level')))?params.get('level'):1;
    $('search').oninput=renderHome;$('level-select').onchange=renderHome;renderHome();
    $('continue-start').onclick=()=>location.href='grammar-practice.html?resume=1';$('review-start').onclick=homeReview;
    $('mixed-topics').innerHTML=C.topics.map(t=>`<label><input type="checkbox" name="mixed-topic" value="${t.id}" checked>${t.title}</label>`).join('');
    $('mixed-start').onclick=()=>start('mixed',chosenTopics());$('select-all').onclick=()=>document.querySelectorAll('[name=mixed-topic]').forEach(el=>el.checked=true);$('select-none').onclick=()=>document.querySelectorAll('[name=mixed-topic]').forEach(el=>el.checked=false);
    $('reset-progress').onclick=()=>{if(confirm('Xóa tiến độ của Phòng luyện tập ngữ pháp trên trình duyệt này? Tiến độ các lớp và từ vựng vẫn được giữ.')){Object.assign(state,P.fresh());persist();renderHome();notice('Đã xóa tiến độ phòng ngữ pháp.');}};
  }else{
    prepareSettings();
    if(page==='theory'){renderTheory();$('topic-select').onchange=renderTheory;$('level-select').onchange=renderTheory;}
    if(page==='practice'){
      $('start-btn').onclick=()=>start('topic');$('setup-review').onclick=()=>start('review');
      $('check-btn').onclick=check;$('next-btn').onclick=next;$('skip-btn').onclick=()=>finish('skipped');
      $('reveal-btn').onclick=()=>{if(state.active&&S.canReveal(state.active)&&!S.result(state.active)){state.active.revealed=true;finish('seen');}};
      $('hint-btn').onclick=()=>{if(state.active&&S.canHint(state.active,current())&&!S.result(state.active)){state.active.hint=true;persist();$('hint-text').textContent=current().hint;$('hint-text').hidden=false;fx('hint',$('hint-text'));}};
      $('answer-input').oninput=()=>{if(state.active&&!S.result(state.active)){state.active.answer=$('answer-input').value;persist();}};
      $('answer-input').onkeydown=event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.repeat){event.preventDefault();check();}};
      $('leave-practice').onclick=()=>{persist();location.href='grammar-index.html';};
      $('new-round').onclick=()=>{const last=state.rounds[state.rounds.length-1];$('results').hidden=true;$('setup-panel').hidden=false;if(topicById(last?.topic))$('topic-select').value=last.topic;if(last?.level)$('level-select').value=last.level;$('setup-panel').scrollIntoView({block:'start'});};
      $('result-review').onclick=()=>{const last=state.rounds[state.rounds.length-1];if(topicById(last.topic))$('topic-select').value=last.topic;if(last.level)$('level-select').value=last.level;if(last.topic==='mixed'){const qs=R.select(reviewPool(),{mode:'review',records:state.records});state.active=S.create(qs,{topic:'mixed',level:0,mode:'review'});persist();showPractice();}else start('review');};
      const updateReview=()=>{$('setup-review').disabled=reviewPool($('topic-select').value,level()).length===0;};$('topic-select').onchange=updateReview;$('level-select').onchange=updateReview;updateReview();
      if(state.active){$('resume-panel').hidden=false;$('resume-label').textContent=`Lượt đang làm: câu ${state.active.index+1}/${state.active.questionIds.length}`;$('resume-btn').onclick=()=>{showPractice();fx('start',$('practice'));};}
      if(params.has('resume')&&state.active)showPractice();
      setInterval(()=>{const now=performance.now(),delta=Math.min(now-lastTick,1500);lastTick=now;if(document.visibilityState==='visible'&&state.active&&!$('practice').hidden&&!S.result(state.active)){state.active.elapsed+=delta;support();}},1000);
      document.addEventListener('visibilitychange',()=>{lastTick=performance.now();persist();});
    }
  }
  window.addEventListener('pagehide',persist);
})();
