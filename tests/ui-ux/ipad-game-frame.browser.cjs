const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/ipad-game-frame';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  const page=await context.newPage(),errors=[],missing=[],results=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400){missing.push(r.url());console.log('MISSING '+page.url()+' '+r.url());}});
  const key=char=>page.locator(`.tg-keyboard [data-key="${char.toLowerCase()}"]`).click();
  const action=name=>page.locator(`.tg-keyboard [data-action=${name}]`).first().click();
  async function frame(label,keyboard){
   await page.waitForFunction(()=>window.DanhTabletGame?.active && document.querySelector('.tg-panel')?.clientHeight>0);await page.waitForTimeout(90);
   const result=await page.evaluate(()=>{const p=document.querySelector('.tg-panel'),k=document.querySelector('.tg-keyboard'),r=p.getBoundingClientRect();return {panel:p.id,scrollHeight:p.scrollHeight,height:p.clientHeight,top:r.top,bottom:r.bottom,viewport:visualViewport.height,keyboard:!k.hidden,keyboardTop:k.getBoundingClientRect().top,width:document.documentElement.scrollWidth,viewportWidth:innerWidth};});
   assert.equal(result.keyboard,keyboard,label);assert(result.bottom<=result.viewport+1,label+' panel in viewport');assert(result.width<=result.viewportWidth+1,label+' no horizontal overflow');
   if(keyboard)assert(result.bottom<=result.keyboardTop+1,label+' keyboard never covers task');
   assert(result.scrollHeight<=result.height+4,label+' regular task fits without scrolling');
   results.push({label,...result});
  }
  await page.goto(base+'/grade/lop6/unit1.html');await page.locator('[data-tab=spelling]').click();await frame('grade6-landscape',true);
  await page.setViewportSize({width:768,height:1024});await frame('grade6-typing-portrait',true);await page.screenshot({path:out+'/typing-portrait.png'});await page.setViewportSize({width:1024,height:768});await frame('grade6-typing-rotated-back',true);
  const input=page.locator('#spelling-stage input');assert.equal(await input.getAttribute('inputmode'),'none');
  assert.equal(await page.locator('.tg-key-row-1 [data-action=delete]').count(),1);assert.equal(await page.locator('.tg-key-row-2 [data-action=submit]').count(),1);assert.equal(await page.locator('.tg-key-row-3 [data-action=shift]').count(),2);
  await action('hide');await page.waitForFunction(()=>!document.body.classList.contains('tg-typing'));assert.equal(await page.locator('.tg-show-keyboard').isVisible(),true);await page.locator('.tg-show-keyboard').click();await page.waitForFunction(()=>document.body.classList.contains('tg-typing'));
  await key('c');await key('a');await key('t');assert.equal(await input.inputValue(),'cat');
  await input.evaluate(n=>n.setSelectionRange(1,2));await key('u');assert.equal(await input.inputValue(),'cut');
  await action('delete');assert.equal(await input.inputValue(),'ct');await action('space');
  await action('shift');await key('a');assert.equal(await input.inputValue(),'c At');await action('shift');
  await action('symbols');await key('1');await page.locator('.tg-keyboard [data-key="?"]').click();await action('symbols');
  assert.equal(await input.inputValue(),'c A1?t');
  await action('submit');assert(await page.locator('#spelling-stage .g6-feedback').innerText());
  const expected=await page.evaluate(()=>DanhGrade6Units.find(u=>u.id===document.body.dataset.unit).words.find(w=>document.querySelector('#spelling-stage h3').textContent.endsWith(w.meaning)).term);
  await input.fill('');await input.focus();await page.keyboard.type(expected);assert.equal(await input.inputValue(),expected,'physical keyboard remains usable');
  await action('submit');await page.waitForFunction(()=>!document.body.classList.contains('tg-typing'));assert(await page.locator('#spelling-stage .g6-feedback').innerText());
  await frame('grade6-answer-landscape',false);
  const before=await page.evaluate(()=>({x:scrollX,y:scrollY,top:document.querySelector('.tg-panel').getBoundingClientRect().top}));
  const cdp=await context.newCDPSession(page);await cdp.send('Input.synthesizeScrollGesture',{x:500,y:300,yDistance:-350,xDistance:120,gestureSourceType:'touch',speed:800});
  assert.deepEqual(await page.evaluate(()=>({x:scrollX,y:scrollY,top:document.querySelector('.tg-panel').getBoundingClientRect().top})),before,'swipe does not move page');
  await page.screenshot({path:out+'/answer-landscape.png'});
  await page.locator('.tg-bar button').first().click();await page.waitForFunction(()=>!DanhTabletGame.active);assert.equal(await input.getAttribute('inputmode'),null,'input mode restored after game');
  await page.locator('[data-tab=spelling]').click();await page.setViewportSize({width:768,height:1024});await frame('grade6-portrait',false);
  await page.goto(base+'/grade/lop2/gsunit8.html');await page.getByRole('button',{name:'Trò chơi',exact:true}).click();await frame('grade2-letters-portrait',false);await page.screenshot({path:out+'/letters-portrait.png'});
  await page.setViewportSize({width:1024,height:768});await frame('grade2-letters-landscape',false);
  await page.screenshot({path:out+'/letters-landscape.png'});
  await page.goto(base+'/grade/lop2/gsunit1.html');await page.getByRole('button',{name:'Trò chơi',exact:true}).click();
  // Existing game selectors stay in their original DOM; switch using the engine.
  await page.evaluate(()=>document.querySelector('[data-game="game-count"]').click());await frame('grade2-sentence-landscape',true);
  const sentence=page.locator('.tg-panel input').first();await key('i');await action('space');await key('a');assert.equal(await sentence.inputValue(),'i a');
  await page.screenshot({path:out+'/sentence-landscape.png'});
  await page.goto(base+'/flashcard.html');await page.locator('#workbench').waitFor();await page.locator('[data-mode=spelling]').click();await page.locator('#start').click();await frame('library-spelling-landscape',true);
  await key('x');assert((await page.evaluate(()=>DanhLearners.storage.getItem('danh-skills-vocabulary-v1'))).includes('"draft":"x"'),'on-screen typing saves the real game draft');await action('delete');assert.equal(await page.locator('#word-answer').inputValue(),'');
  await page.goto(base+'/grammar-index.html');await page.locator('[data-band=A1]').click();await page.locator('[data-game=fill]').click();await page.locator('#start').click();
  await page.waitForFunction(()=>window.DanhTabletGame?.active);const typed=await page.locator('#answer-input').isVisible();await frame('grammar-landscape',typed);
  if(typed){await key('i');assert.equal(await page.locator('#answer-input').inputValue(),'i');}
  await page.screenshot({path:out+'/grammar-landscape.png'});
  // A deliberately long explanation is available through an explicit reading mode.
  await page.evaluate(()=>{const p=document.createElement('p');p.textContent='Giải thích dài. '.repeat(500);document.querySelector('.tg-panel').append(p);});
  await page.locator('.tg-expand').waitFor({state:'visible'});await page.locator('.tg-expand').click();assert(await page.locator('.tg-panel').evaluate(n=>n.classList.contains('tg-reading')));
  await page.locator('.tg-expand').click();assert(!(await page.locator('.tg-panel').evaluate(n=>n.classList.contains('tg-reading'))));
  // A narrow phone-sized viewport has a phone screen in this emulation;
  // the dedicated responsive test separately retains the iPad screen in Split View.
  await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>!DanhTabletGame.active);assert.equal(await page.locator('.tg-keyboard').count(),0);
  const desktop=await browser.newContext({viewport:{width:1280,height:900}}),d=await desktop.newPage();await d.goto(base+'/grade/lop6/unit1.html');await d.locator('[data-tab=spelling]').click();await d.waitForFunction(()=>window.DanhTabletGame);assert.equal(await d.evaluate(()=>DanhTabletGame.active),false);await desktop.close();
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,results,editingAndSelection:true,physicalKeyboard:true,swipeLocked:true,phoneAndDesktopUnchanged:true,errors,missing},null,2));console.log('PASS '+results.length+' tablet layouts, keyboard editing/checking, physical typing, swipe lock, long explanation and normal phone/desktop layouts');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
