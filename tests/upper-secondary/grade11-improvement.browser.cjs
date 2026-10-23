const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001',out=path.resolve(__dirname,'../../artifacts/grade11-improvement');
const state=p=>p.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-g11-spelling-unit1-v1')));
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await c.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined});window.played=[];window.media=[];document.addEventListener('danh-answer-speech',e=>played.push(e.detail));const NativeAudio=window.Audio;window.Audio=function(...args){const a=new NativeAudio(...args);for(const type of ['playing','ended'])a.addEventListener(type,()=>media.push({type,src:a.src}));return a;};window.Audio.prototype=NativeAudio.prototype;});
 const p=await c.newPage(),errors=[],missing=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 async function audio(text,run){const n=await p.evaluate(()=>played.filter(e=>e.state==='playing').length);await run();await p.waitForFunction(n=>played.filter(e=>e.state==='playing').length===n+1,n);assert.equal(await p.locator('html').getAttribute('data-answer-speech-text'),text);await p.waitForFunction(()=>document.documentElement.dataset.answerSpeechState==='ended');assert((await p.evaluate(()=>media)).some(e=>e.type==='ended'&&e.src.endsWith('.wav')));}
 await p.goto(base+'/grade/lop11/lop11.html');assert.equal(await p.locator('.g6-unit-card').count(),10);
 for(const width of [390,1280]){await p.setViewportSize({width,height:900});await p.screenshot({path:path.join(out,`catalog-${width}.png`),fullPage:true});}
 for(let u=1;u<=10;u++){
  await p.goto(`${base}/grade/lop11/unit${u}.html`);assert.equal(await p.locator('.g6-word-card').count(),10);
  const images=await p.locator('#vocab-grid img').evaluateAll(async ns=>{for(const n of ns){n.loading='eager';await n.decode();}return ns.map(n=>({w:n.naturalWidth,h:n.naturalHeight}));});assert.equal(images.length,10);assert(images.every(a=>a.w===768&&a.h===768));
  await p.locator('[data-tab=flashcards]').click();for(let i=0;i<10;i++){assert.equal(await p.locator('#flashcard .vg-flip-back img').count(),1);await p.locator('#flash-next').click();}
  for(const width of [320,390,1280]){await p.setViewportSize({width,height:900});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 }
 await p.setViewportSize({width:390,height:844});await p.goto(base+'/grade/lop11/unit1.html');await p.locator('[data-tab=spelling]').click();
 assert.equal(await p.evaluate(()=>played.length),0);
 const input=p.locator('#spelling-stage input'),submit=p.locator('#spelling-stage button[type=submit]');
 await submit.click();assert.equal((await state(p)).entries[(await state(p)).order[0]].attempts,0);
 await input.fill('my unfinished answer');const before=await state(p);await p.reload();assert(await p.locator('#spelling').isVisible());assert.equal(await input.inputValue(),'my unfinished answer');assert.deepEqual(await state(p),before);assert.equal(await p.evaluate(()=>played.length),0);
 const words=await p.evaluate(()=>DanhGrade11Units[0].words);
 for(let i=0;i<10;i++){
  const s=await state(p),word=words.find(w=>w.id===s.order[s.position]);
  if(i===1){await input.fill('wrong');await submit.click();await p.reload();assert.equal((await state(p)).entries[word.id].attempts,1);}
  if(i===2){for(let k=0;k<2;k++){await input.fill('wrong');await submit.click();}await p.getByRole('button',{name:'Xem đáp án',exact:true}).click();assert.equal((await state(p)).entries[word.id].outcome,'seen');}
  else {if(i===3)await audio(word.term,()=>p.getByRole('button',{name:'🔊 Nghe gợi ý',exact:true}).click());await input.fill(word.term);await audio(word.term,()=>submit.click());assert.equal((await state(p)).entries[word.id].outcome,i===1?'corrected':i===3?'hinted':'first');const count=await p.evaluate(()=>played.length);await p.locator('#spelling-stage form').evaluate(f=>f.dispatchEvent(new Event('submit',{cancelable:true})));assert.equal(await p.evaluate(()=>played.length),count);}
  await p.getByRole('button',{name:'Từ tiếp theo →',exact:true}).click();
 }
 assert.match(await p.locator('#spelling-stage').innerText(),/Đúng ngay: 7 · Tự sửa: 1 · Có gợi ý: 1 · Đã xem: 1/);
 await p.screenshot({path:path.join(out,'spelling-result-390.png')});await p.getByRole('button',{name:'Ôn 3 từ còn khó',exact:true}).click();assert.equal((await state(p)).order.length,3);
 await input.fill('review draft');await p.goto(base+'/grade/lop11/unit2.html');assert.equal(await p.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-g11-spelling-unit2-v1')).position),0);await p.locator('[data-tab=spelling]').click();await p.locator('#spelling-stage input').fill('unit two');await p.goto(base+'/grade/lop11/unit1.html');assert.equal(await input.inputValue(),'review draft');
 await p.locator('[data-tab=quiz]').click();await p.getByRole('button',{name:'Bắt đầu chơi',exact:true}).click();const key=await p.locator('[data-word-key]').getAttribute('data-word-key');await p.locator(`.g6-choice:not([data-answer-key="${key}"])`).first().click();const quiz=await p.evaluate(()=>DanhLearners.storage.getItem('danh-g11-vocabulary-game-unit1-v1'));await p.reload();await p.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}).click();assert.equal(await p.evaluate(()=>DanhLearners.storage.getItem('danh-g11-vocabulary-game-unit1-v1')),quiz);
 for(const term of [1,2]){await p.goto(`${base}/grade/lop11/vocabulary-review.html?term=${term}`);await p.getByRole('button',{name:'Bắt đầu chơi',exact:true}).click();const a=await p.evaluate(term=>JSON.parse(DanhLearners.storage.getItem(`danh-g11-vocabulary-game-term${term}-v1`)).active,term);assert.equal(a.items.length,10);assert(a.items.every(k=>term===1?Number(/u(\d+)/.exec(k)[1])<=5:Number(/u(\d+)/.exec(k)[1])>5));}
 // Chặn ngân hàng cũ trong trang kiểm thử này để chơi đủ 60 tình huống mới qua bộ chấm thật.
 await c.route('**/grammar-complete-data.js*',r=>r.fulfill({contentType:'application/javascript',body:'window.DanhGrade11Grammar=[];'}));
 await p.goto(base+'/grade/lop11/grammar.html');await p.waitForFunction(()=>document.body.dataset.grammarReady==='true');assert.equal(await p.evaluate(()=>DanhGrade11Grammar.length),60);
 for(let u=1;u<=10;u++)for(const level of ['easy','medium','hard']){
  await p.locator('#unit-select').selectOption(String(u));await p.locator(`input[name=level][value=${level}]`).check();await p.locator('#start').click();
  for(let j=0;j<2;j++){
   const q=await p.evaluate(()=>{const s=JSON.parse(DanhLearners.storage.getItem('danh-g11-grammar-v1'));return DanhGrade11Grammar.find(q=>q.id===s.active.items[s.active.position]);});assert(q);
   const answer=async()=>{if(q.type==='choice')await p.locator('#answer-area button').filter({hasText:new RegExp('^[ABCD]\\. '+q.answer.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}).click();else if(q.type==='order'){for(const token of q.parts)await p.locator('.gg-tokens button:not(:disabled)').filter({hasText:new RegExp('^'+token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}).first().click();await p.getByRole('button',{name:'Kiểm tra câu',exact:true}).click();}else{await p.locator(q.type==='fill'?'#answer-area input':'#sentence-answer').fill(q.answer);await p.locator('#answer-area button[type=submit]').click();}};
   if(u===1&&level==='easy'&&j===0)await audio(q.answer,answer);else await answer();assert(await p.locator('#next').isVisible());await p.locator('#next').click();
  }
  await p.locator('#change').click();
 }
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({passed:true,units:10,images:100,flashcards:100,widths:[320,390,1280],newGrammarPlayed:60,realWavPlayingEnded:true,webSpeechDisabled:true,typingDraftRestore:true,firstCorrectedHintedSeen:true,weakReview:true,quizPreserved:true,semesterScopes:true,errors,missing},null,2));console.log('PASS Grade 11 improvement browser flows.');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
