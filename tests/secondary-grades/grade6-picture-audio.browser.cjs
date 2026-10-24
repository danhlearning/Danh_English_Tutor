const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await context.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.mediaEvents=[];document.addEventListener('danh-answer-speech',e=>mediaEvents.push(e.detail));});
 const page=await context.newPage(),errors=[],missing=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 fs.mkdirSync('artifacts/grade6-picture-audio',{recursive:true});
 async function audio(action,text){const n=await page.evaluate(()=>mediaEvents.length);await action();await page.waitForFunction(n=>mediaEvents.slice(n).some(e=>e.state==='ended'&&e.mode==='audio'),n);const events=await page.evaluate(n=>mediaEvents.slice(n),n);assert.equal(events.filter(e=>e.state==='playing').length,1);assert.equal(events.filter(e=>e.state==='ended').length,1);assert.equal(events.find(e=>e.state==='ended').text,text);}
 for(let unit=1;unit<=12;unit++){
  await page.goto(`${base}/grade/lop6/unit${unit}.html`);await page.locator('#vocab-grid .word-picture').first().waitFor();
  assert.equal(await page.locator('#vocab-grid .word-picture').count(),await page.evaluate(unit=>DanhGrade6Units.find(u=>u.number===unit).words.length,unit));
  assert.equal(await page.locator('.g6-sound,#flash-sound').count(),0);
  assert.equal(await page.evaluate(()=>mediaEvents.length),0);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if(unit===1){
   const first=await page.evaluate(()=>DanhGrade6Units[0].words[0].term);
   await audio(()=>page.locator('#vocab-grid .word-picture').first().click(),first);
   await page.locator('#vocab-grid .word-picture').first().focus();await audio(()=>page.keyboard.press('Enter'),first);
   await page.evaluate(()=>DanhLearners.storage.setItem('danh-vocabulary-effects-v1',JSON.stringify({sound:false,motion:false,shared:true})));
   await page.reload();assert.equal(await page.evaluate(()=>mediaEvents.length),0);await audio(()=>page.locator('#vocab-grid .word-picture').first().click(),first);
   for(const width of [320,390,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:`artifacts/grade6-picture-audio/vocabulary-${width}.png`,fullPage:true});}
   await page.setViewportSize({width:390,height:844});await page.locator('[data-tab="flashcards"]').click();await page.locator('.g6-flip-action').click();
   await audio(()=>page.locator('#flashcard .word-picture').click(),first);assert.equal(await page.locator('#flashcard .word-picture').count(),1);
   await page.locator('.g6-flip-action').press('Enter');assert.equal(await page.locator('#flashcard .word-picture').count(),0);
   await page.evaluate(()=>DanhLearners.storage.setItem('danh-vocabulary-effects-v1',JSON.stringify({sound:true,motion:false,shared:true})));await page.reload();
   await page.locator('[data-tab="spelling"]').click();const meaning=await page.locator('#spelling-stage .word-picture').getAttribute('aria-label');
   const term=await page.evaluate(meaning=>DanhGrade6Units[0].words.find(w=>`Phát âm: ${w.meaning}`===meaning).term,meaning);
   await audio(()=>page.locator('#spelling-stage .word-picture').click(),term);
   await page.evaluate(()=>DanhLearners.storage.setItem('danh-vocabulary-effects-v1',JSON.stringify({sound:true,motion:false,shared:true})));
   await page.locator('#spelling-stage input').fill('wrong answer');await page.locator('#spelling-stage form').evaluate(form=>form.requestSubmit());
   await page.locator('#spelling-stage input').fill(term);await audio(()=>page.locator('#spelling-stage form').evaluate(form=>form.requestSubmit()),term);
   await page.locator('#spelling-stage button').filter({hasText:'Từ tiếp theo'}).click();
   const nextMeaning=await page.locator('#spelling-stage .word-picture').getAttribute('aria-label');const nextTerm=await page.evaluate(m=>DanhGrade6Units[0].words.find(w=>`Phát âm: ${w.meaning}`===m).term,nextMeaning);
   await page.locator('#spelling-stage input').fill(nextTerm);await audio(()=>page.locator('#spelling-stage form').evaluate(form=>form.requestSubmit()),nextTerm);
   await page.screenshot({path:'artifacts/grade6-picture-audio/spelling-390.png',fullPage:true});
  }
 }
 for(const term of [1,2]){
  await page.goto(`${base}/grade/lop6/vocabulary-review.html?term=${term}`);await page.getByRole('button',{name:'Bắt đầu chơi',exact:true}).click();
  assert.equal(await page.locator('#quiz-stage .word-picture').count(),0);
  const correct=await page.evaluate(()=>{const round=JSON.parse(DanhLearners.storage.getItem(`danh-g6-vocabulary-game-term${new URLSearchParams(location.search).get('term')}-v1`)).active;return round.items[round.index];});
  const word=await page.evaluate(key=>{const [unit,id]=key.match(/\d+/g).map(Number);return DanhGrade6Units.find(u=>u.number===unit).words.find(w=>w.id===id);},correct);
  await audio(()=>page.locator(`[data-answer-key="${correct}"]`).click(),word.term);
  await audio(()=>page.locator('#quiz-stage .word-picture').click(),word.term);
  assert.equal(await page.locator('#quiz-stage button').filter({hasText:'🔊'}).count(),0);
  const before=await page.evaluate(()=>mediaEvents.length);await page.reload();await page.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}).click();assert.equal(await page.evaluate(()=>mediaEvents.length),0);
  await page.screenshot({path:`artifacts/grade6-picture-audio/review-${term}-390.png`,fullPage:true});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log('PASS 12 Units + 2 terms, picture/keyboard/mute, first/corrected real fallback media, restore, mobile/desktop, no autoplay/errors/missing assets.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
