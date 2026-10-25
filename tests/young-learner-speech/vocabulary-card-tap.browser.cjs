const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await context.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.events=[];window.taps=[];document.addEventListener('danh-answer-speech',e=>events.push(e.detail));document.addEventListener('danh-vocabulary-card-tap',e=>taps.push(e.detail));});
 const page=await context.newPage(),errors=[],missing=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 async function play(card,action){const text=await card.getAttribute('data-danh-card-listen'),n=await page.evaluate(()=>events.length),t=await page.evaluate(()=>taps.length);await action();assert.equal(await page.evaluate(()=>taps.length),t+1);assert(await card.evaluate(n=>n.classList.contains('danh-card-pressed')));await page.waitForFunction(n=>events.slice(n).some(e=>e.state==='ended'&&e.mode==='audio'),n);const audio=await page.evaluate(n=>events.slice(n),n);assert.equal(audio.filter(e=>e.state==='playing').length,1);assert.equal(audio.find(e=>e.state==='ended').text,text);}
 for(let grade=1;grade<=12;grade++){
  await page.goto(`${base}/grade/lop${grade}/${grade===2?'gsunit1':'unit1'}.html`);const card=page.locator('[data-danh-card-listen]').first();await card.waitFor();assert.equal(await page.evaluate(()=>events.length),0);
  await play(card,()=>card.locator('h3,.word-title').click());assert.equal(await page.evaluate(()=>taps.at(-1).motion),false);
  console.log(`PASS grade ${grade}: text on whole card -> one real audio + reduced-motion feedback`);
 }
 await page.goto(base+'/grade/lop7/unit1.html');const card=page.locator('[data-danh-card-listen]').first();
 for(const target of ['.g6-meaning','.g6-example','.g6-word-visual'])await play(card,()=>card.locator(target).click());
 await play(card,()=>card.click({position:{x:8,y:8}}));await card.focus();await play(card,()=>card.press('Enter'));await play(card,()=>card.press(' '));
 await page.emulateMedia({reducedMotion:'no-preference'});await play(card,()=>card.locator('h3').click());assert.equal(await page.evaluate(()=>taps.at(-1).motion),true);
 await card.click();await card.click();assert(await card.evaluate(n=>n.getAnimations().length<=1));await page.waitForTimeout(400);assert.equal(await card.evaluate(n=>n.classList.contains('danh-card-pressed')),false);assert.equal(await card.evaluate(n=>n.getAnimations().length),0);
 await page.emulateMedia({reducedMotion:'reduce'});await card.click();fs.mkdirSync('artifacts/vocabulary-card-tap',{recursive:true});await page.screenshot({path:'artifacts/vocabulary-card-tap/pressed-grade7.png',fullPage:false});
 await page.goto(base+'/flashcard.html');const library=page.locator('#word-list [data-danh-card-listen]').first();await library.waitFor();await play(library,()=>library.locator('h3').click());const before=await page.evaluate(()=>events.length);await library.locator('a').click();assert.equal(await page.evaluate(()=>events.length),0);assert.notEqual(page.url(),base+'/flashcard.html');
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log('PASS all 12 grades; image/text/meaning/example/padding, Enter/Space, bounded feedback, source links preserved');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
