const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/ipad-navigation';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
  await context.addInitScript(()=>{Object.defineProperty(screen,'width',{get:()=>768});Object.defineProperty(screen,'height',{get:()=>1024});window.reads=[];document.addEventListener('danh-answer-speech',e=>reads.push(e.detail));});
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  const p=await context.newPage(),errors=[],results=[];p.on('pageerror',e=>errors.push(e.message));
  const picker=()=>p.getByRole('button',{name:'Chọn trò chơi',exact:true}),dialog=()=>p.getByRole('dialog');
  async function choose(id){await picker().click();await dialog().locator(`[data-game="${id}"]`).click();await p.waitForFunction(id=>document.querySelector('.tg-panel')?.id===id,id);}
  async function nav(grade){
   await p.locator('.tg-nav-toggle').click();await p.locator('.tg-nav-link').first().waitFor();
   const links=await p.locator('.tg-nav-link').evaluateAll(ns=>ns.map(n=>({label:n.getAttribute('aria-label'),path:new URL(n.href).pathname,width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height})));
   assert(links.some(n=>n.label==='Trang chủ'&&n.path.endsWith('/index.html')));
   assert(links.some(n=>n.label===`Lớp ${grade}`&&n.path.endsWith(`/grade/lop${grade}/lop${grade}.html`)));
   assert(links.some(n=>n.label==='Ôn tập'&&n.path.endsWith(`/grade/lop${grade}/${grade<=5?'review':'vocabulary-review'}.html`)));
   for(const link of links){assert(link.width>=44&&link.height>=44);const response=await context.request.get(base+link.path);assert.equal(response.status(),200);}
   await p.locator('.tg-nav-toggle').press('Escape');
  }
  await p.goto(base+'/grade/lop2/colors.html');await p.getByRole('button',{name:'Trò chơi',exact:true}).click();await p.locator('.ll-slot').first().waitFor();await nav(2);
  await p.locator('.ll-tile').first().click();const before=await p.locator('.letter-ladder').evaluate(n=>{window.savedStage=n;return DanhLearners.storage.getItem(n.dataset.letterStorage);});
  await picker().click();assert.equal(await dialog().locator('.tg-game-card').count(),4);assert.equal(await dialog().locator('[aria-current=true]').count(),1);
  assert((await picker().boundingBox()).height>=44);for(const card of await dialog().locator('.tg-game-card').all())assert((await card.boundingBox()).height>=104);
  await p.keyboard.press('Tab');assert(await dialog().evaluate(n=>n.contains(document.activeElement)));
  await p.keyboard.press('Escape');await p.waitForFunction(()=>document.querySelector('.tg-game-picker')?.getAttribute('aria-expanded')==='false');assert(await picker().evaluate(n=>n===document.activeElement));
  assert.equal(await p.evaluate(()=>savedStage===document.querySelector('.letter-ladder')),true);assert.equal(await p.locator('.letter-ladder').evaluate(n=>DanhLearners.storage.getItem(n.dataset.letterStorage)),before);
  await picker().click();await dialog().locator('[aria-current=true]').click();await p.waitForFunction(()=>!document.querySelector('.tg-game-dialog')?.open);assert(await p.evaluate(()=>savedStage===document.querySelector('.letter-ladder')),'current game is not rebuilt');
  await picker().click();await p.mouse.click(2,2);await p.waitForFunction(()=>!document.querySelector('.tg-game-dialog')?.open);await p.waitForFunction(()=>document.querySelector('.tg-game-picker')?.getAttribute('aria-expanded')==='false');assert.equal(await p.evaluate(()=>reads.length),0,'chooser never speaks');
  await choose('game-count');await p.locator('#count-sentence-input').fill('my draft');await choose('game-mcq');await choose('game-count');assert.equal(await p.locator('#count-sentence-input').inputValue(),'my draft','sentence draft resumes');
  await choose('game-flip');assert.equal(await p.locator('.letter-ladder:visible').evaluate(n=>DanhLearners.storage.getItem(n.dataset.letterStorage)),before,'letter draft resumes');
  for(const [width,height]of [[1024,768],[768,1024],[744,1133],[1366,1024],[600,744],[507,768],[320,568]]){
   await p.setViewportSize({width,height});await p.waitForTimeout(120);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await picker().click();const r=await dialog().boundingBox();assert(r.x>=0&&r.y>=0&&r.x+r.width<=width+1&&r.y+r.height<=height+1,'dialog fits viewport');
   for(const card of await dialog().locator('.tg-game-card').all()){await card.scrollIntoViewIfNeeded();const b=await card.boundingBox();assert(b.x>=r.x&&b.x+b.width<=r.x+r.width+1);}
   await p.screenshot({path:`${out}/chooser-${width}-${height}.png`});await p.keyboard.press('Escape');results.push({width,height,passed:true});
  }
  await p.setViewportSize({width:1024,height:768});await p.goto(base+'/grade/lop2/animals.html?fromGrade=12');await p.getByRole('button',{name:'Trò chơi',exact:true}).click();await nav(12);
  await p.goto(base+'/grade/lop6/unit1.html');await p.locator('[data-tab=spelling]').click();await p.locator('#spelling-stage input').fill('draft');const field=await p.locator('#spelling-stage input').evaluate(n=>{window.savedInput=n;return n.value;});await nav(6);
  await picker().click();assert.equal(await dialog().locator('.tg-game-card').count(),4);await dialog().locator('[data-game=letters]').click();await p.waitForFunction(()=>document.querySelector('.tg-panel')?.id==='letters');await choose('spelling');assert.equal(await p.locator('#spelling-stage input').inputValue(),field);assert(await p.evaluate(()=>savedInput===document.querySelector('#spelling-stage input')));
  await p.screenshot({path:out+'/navigation-landscape.png'});
  await p.goto(base+'/flashcard.html');await p.locator('#workbench').waitFor();await p.locator('[data-mode=spelling]').click();await p.locator('#start').click();await p.locator('#word-answer').fill('library draft');await picker().click();await p.locator('#setup').waitFor({state:'visible'});assert.equal(await p.evaluate(()=>DanhTabletGame.active),false);await p.locator('#resume').click();assert.equal(await p.locator('#word-answer').inputValue(),'library draft');
  const phone=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const mobile=await phone.newPage();await mobile.goto(base+'/grade/lop2/colors.html');await mobile.getByRole('button',{name:'Trò chơi',exact:true}).click();assert.equal(await mobile.locator('.tg-bar').count(),0);await phone.close();
  assert.deepEqual(errors,[]);fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,layouts:results,wholeAndSentenceDrafts:true,currentGameKeepsDOM:true,secondaryGameKeepsInput:true,gradeContext:true,validNavigationLinks:true,keyboardAndBackdropClose:true,silentChooser:true,libraryResume:true,phoneUnchanged:true,errors},null,2));console.log('PASS iPad navigation links, large chooser cards, 7 sizes, keyboard/backdrop close, silent open, original DOM/drafts, grades 2/6/12 and library resume');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
