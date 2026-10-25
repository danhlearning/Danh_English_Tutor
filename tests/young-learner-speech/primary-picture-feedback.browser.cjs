const {chromium}=require('playwright'),assert=require('node:assert/strict');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await context.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.events=[];document.addEventListener('danh-answer-speech',e=>events.push(e.detail));});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const grade of [1,5]){
  await page.goto(`${base}/grade/lop${grade}/unit1.html`);await page.getByRole('button',{name:'Trò chơi',exact:true}).click();await page.locator('[data-game=game-spelling]').click();
  const picture=page.locator('.learning-question-visual'),input=page.locator('.learning-spelling input');const word=await picture.getAttribute('data-danh-picture-listen');assert(word);assert.equal(await page.evaluate(()=>events.length),0);
  await input.fill('wrong answer');await input.press('Enter');assert.equal(await page.evaluate(()=>events.length),0);
  async function answer(term){const n=await page.evaluate(()=>events.length);await input.fill(term);await input.press('Enter');await page.waitForFunction(n=>events.slice(n).some(e=>e.state==='ended'&&e.mode==='audio'),n);const audio=await page.evaluate(n=>events.slice(n),n);assert.equal(audio.filter(e=>e.state==='playing').length,1);assert.equal(audio.find(e=>e.state==='ended').text,term);}
  await answer(word);await page.waitForFunction(word=>{const picture=document.querySelector('.learning-question-visual'),input=document.querySelector('.learning-spelling input');return picture?.dataset.danhPictureListen!==word&&input&&!input.disabled;},word);
  await answer(await picture.getAttribute('data-danh-picture-listen'));console.log(`PASS grade ${grade} corrected and first answer via real audio with Web Speech unavailable`);
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
