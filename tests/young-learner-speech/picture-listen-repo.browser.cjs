const {chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001',previous=base+'/tmp/publish-main-20261024';
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await context.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.events=[];document.addEventListener('danh-answer-speech',e=>events.push(e.detail));});
 const page=await context.newPage(),errors=[],missing=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 const oldContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),old=await oldContext.newPage();
 await oldContext.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 const grid='#vocab-grid-container,#vocab-grid',control='[data-danh-picture-listen],.word-picture';
 fs.mkdirSync('artifacts/repo-picture-listen',{recursive:true});
 async function audio(node,key='Enter'){
  const term=await node.evaluate(n=>n.dataset.danhPictureListen||n.closest('article')?.querySelector('h3,.word-title')?.textContent);
  const n=await page.evaluate(()=>events.length);await node.focus();await node.press(key);
  await page.waitForFunction(n=>events.slice(n).some(e=>e.state==='ended'&&e.mode==='audio'),n);
  const fresh=await page.evaluate(n=>events.slice(n),n);assert.equal(fresh.filter(e=>e.state==='playing').length,1);assert.equal(fresh.filter(e=>e.state==='ended').length,1);if(term)assert.equal(fresh.find(e=>e.state==='ended').text.toLowerCase(),term.trim().toLowerCase());
 }
 let checked=0;
 for(let grade=Number(process.env.TEST_FROM_GRADE)||1;grade<=12;grade++){
  const files=fs.readdirSync(`grade/lop${grade}`).filter(f=>grade===2?/^gsunit\d+\.html$/.test(f):/^unit\d+\.html$/.test(f));
  for(const file of files){await page.goto(`${base}/grade/lop${grade}/${file}`);await page.locator(`${grid}`).waitFor();await page.waitForFunction(()=>[...document.querySelectorAll('#vocab-grid-container > *,#vocab-grid > *')].every(n=>n.querySelector('[data-danh-picture-listen],.word-picture'))&&document.querySelectorAll('#vocab-grid-container > *,#vocab-grid > *').length>0);assert.equal(await page.evaluate(()=>events.length),0);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));checked++;}
  console.log(`PASS grade ${grade}: ${files.length} Units wired without autoplay`);
  await page.goto(`${base}/grade/lop${grade}/${grade===2?'gsunit1':'unit1'}.html`);
  const target=page.locator(`${grid}`).locator(control).first();await target.waitFor();
  await page.evaluate(()=>DanhLearners.storage.setItem('danh-vocabulary-effects-v1',JSON.stringify({sound:false,motion:false,shared:true})));
  await page.reload();await audio(page.locator(grid).locator(control).first(),grade%2?'Enter':' ');
  if([1,5,7,8,9,10,11,12].includes(grade)){
   const relative=`/grade/lop${grade}/unit1.html`;await old.goto(previous+relative);
   const selector=grade<6?'#vocab-grid-container .g2-vocab-image':'#vocab-grid .g6-word-visual';
   const now=page.locator(selector).first(),before=old.locator(selector).first();await before.waitFor();
   await page.evaluate(()=>scrollTo(0,0));await old.evaluate(()=>scrollTo(0,0));const a=await now.boundingBox(),b=await before.boundingBox();for(const k of ['x','y','width','height'])assert(Math.abs(a[k]-b[k])<1.1,`grade ${grade} picture ${k}: ${a[k]} vs ${b[k]}`);
   assert.equal(await now.innerHTML(),await before.innerHTML(),`grade ${grade} original art retained`);
  }
  if([1,7,12].includes(grade)){await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`artifacts/repo-picture-listen/grade${grade}-vocabulary.png`,fullPage:true});}
  if(grade>=7){
   await page.locator('[data-tab=flashcards]').click();await page.locator('#flashcard').press('Enter');const art=page.locator('#flashcard [data-danh-picture-listen]');await audio(art);
   assert(await page.locator('#flashcard').evaluate(n=>n.classList.contains('is-flipped')));assert.equal(await page.locator('#flash-sound').isVisible(),false);
  }else if([1,5].includes(grade)){
   await page.getByRole('button',{name:'Trò chơi',exact:true}).click();await page.locator('[data-game=game-flip]').click();const art=page.locator('.learning-card-front [data-danh-picture-listen]');await audio(art);assert.equal(await page.locator('.learning-card').evaluate(n=>n.classList.contains('is-flipped')),false);
   await page.locator('[data-game=game-spelling]').click();assert.equal(await page.evaluate(()=>events.filter(e=>e.state==='playing').length),2);await audio(page.locator('.learning-question-visual'));
   await page.locator('[data-game=game-mcq]').click();assert.equal(await page.locator('.learning-choice [data-danh-picture-listen]').count(),0);
  }
 }
 for(const path of ['/grade/lop2/animals.html?fromGrade=1','/grade/lop5/previous-unit1.html','/grade/lop4/previous-unit1.html']){
  await page.goto(base+path);await page.getByRole('button',{name:'Từ vựng',exact:true}).click();await page.locator(grid).locator(control).first().waitFor();assert.equal(await page.evaluate(()=>events.length),0);await audio(page.locator(grid).locator(control).first());
 }
 await page.goto(base+'/flashcard.html');await page.locator('#word-list .word-card [data-danh-picture-listen]').first().waitFor();await audio(page.locator('#word-list .word-card [data-danh-picture-listen]').first());
 await page.locator('[data-mode=cards]').click();await page.locator('#start').click();const art=page.locator('.flip-card [data-danh-picture-listen]');await audio(art);assert.equal(await page.locator('.flip-card [data-danh-picture-listen]').count(),1);await page.screenshot({path:'artifacts/repo-picture-listen/skills-card.png',fullPage:true});
 await page.locator('#back').click();await page.locator('[data-mode=spelling]').click();await page.locator('#start').click();await audio(page.locator('#stage .word-image'));
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log(`PASS ${checked} Units in tested grade range, real media, unchanged existing art/geometry, flashcard separation, shared topics, legacy and skills.`);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
