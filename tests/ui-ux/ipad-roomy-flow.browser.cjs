const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/ipad-roomy-flow';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true});
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  await context.addInitScript(()=>{Object.defineProperty(screen,'width',{get:()=>768});Object.defineProperty(screen,'height',{get:()=>1024});});
  const p=await context.newPage(),errors=[],layouts=[];p.on('pageerror',e=>errors.push(e.message));
  async function fixture(clear=false){
   await p.locator('.letter-ladder:visible').waitFor();
   await p.evaluate(clear=>{
    const stage=document.querySelector('.letter-ladder'),words=[{id:'cat',name:'cat',meaning:'con mèo',visual:'<span aria-hidden="true">🐈</span>'},{id:'dog',name:'dog',meaning:'con chó',visual:'<span aria-hidden="true">🐕</span>'}];
    const storage=window.DanhLearners.storage,key='danh-g2-letter-ladder-roomy-fixture-v1';if(clear)storage.removeItem(key);
    window.speechCalls=[];window.finishSpeech=[];window.DanhAnswerSpeech.say=text=>{speechCalls.push(text);return new Promise(resolve=>finishSpeech.push(resolve));};
    const instance=window.testLadder=window.DanhLetterLadder.mount({topic:'roomy-fixture',words,storage,selected:()=>words.map(w=>w.id),allowStandalone:false,goSpelling:()=>instance.render(stage,true),rerender:()=>instance.render(stage,true)});
    instance.render(stage,true);
   },clear);
  }
  const state=()=>p.evaluate(()=>({index:testLadder.game.state.active.index,phase:testLadder.game.state.active.phase,id:testLadder.game.entry()?.id,result:testLadder.game.entry()?.result,errors:testLadder.game.entry()?.errors}));
  async function fillCorrect(){
   const task=await p.evaluate(()=>{const g=testLadder.game;return {holes:g.entry().holes,tiles:g.entry().tiles,name:g.word().name};});
   const used=new Set();for(const hole of task.holes){const index=task.tiles.findIndex((c,n)=>!used.has(n)&&c===task.name[hole]);used.add(index);await p.locator(`[data-tile="${index}"]`).click();}
  }
  async function check(){await p.locator('.letter-ladder').getByRole('button',{name:'Kiểm tra',exact:true}).click();}
  async function release(){await p.evaluate(()=>finishSpeech.shift()?.(true));}
  await p.goto(base+'/grade/lop2/gsunit1.html?game=letters');await fixture(true);
  assert(await p.locator('script[src*="shared/tablet-game.js"]').evaluate(n=>new URL(n.src).searchParams.get('v')==='ipad-roomy-20261031'),'returning users receive the new controller');
  await p.waitForFunction(()=>document.body.classList.contains('tg-roomy'));
  assert(await p.locator('.ll-slot').first().evaluate(n=>n.getBoundingClientRect().height>=65));
  assert(await p.locator('.ll-meaning').evaluate(n=>parseFloat(getComputedStyle(n).fontSize)>=32));
  // Press feedback starts on pointerdown, and releases exactly one native click.
  const tile=p.locator('.ll-tile').first(),box=await tile.boundingBox();await p.mouse.move(box.x+box.width/2,box.y+box.height/2);await p.mouse.down();
  assert(await tile.evaluate(n=>n.getAnimations().length>0),'immediate bounce');
  assert.equal(await p.evaluate(()=>testLadder.game.entry().draft.filter(n=>n!==null).length),0);
  await p.mouse.up();assert.equal(await p.evaluate(()=>testLadder.game.entry().draft.filter(n=>n!==null).length),1,'one click per touch');
  await p.locator('.ll-slot').first().click();
  await check();assert.equal((await state()).result,null,'empty stays');
  await fillCorrect();const before=await state();
  await p.locator('.letter-ladder .ll-primary').evaluate(n=>{n.click();n.click();});
  assert.equal(await p.evaluate(()=>speechCalls.length),1,'repeated check speaks once');
  await p.waitForTimeout(750);assert.equal((await state()).index,before.index,'wait for speech');
  assert.equal(await p.locator('.ll-slots').evaluate(n=>getComputedStyle(n).outlineStyle),'none','no heavy answer outline');
  await release();await p.waitForFunction(index=>testLadder.game.state.active.index===index+1,before.index);
  // An old pending completion cannot skip a new question or clear its marker.
  await fillCorrect();await check();await p.locator('.ll-actions .ll-primary').click();
  const afterManual=await state();await fillCorrect();await check();assert.equal(await p.locator('.letter-ladder').getAttribute('data-letter-auto'),'waiting');
  await release();await p.waitForTimeout(80);assert.deepEqual(await state(),{...afterManual,result:'first'});assert.equal(await p.locator('.letter-ladder').getAttribute('data-letter-auto'),'waiting');
  await release();await p.waitForFunction(index=>testLadder.game.state.active.index!==index,afterManual.index);
  // Freeze progression when the tab is hidden; returning does not restart it.
  await fillCorrect();await check();const hiddenState=await state();
  await p.evaluate(()=>{Object.defineProperty(document,'hidden',{value:true,configurable:true});document.dispatchEvent(new Event('visibilitychange'));});
  await release();await p.waitForTimeout(750);await p.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});assert.deepEqual(await state(),hiddenState);
  // Reload an already-correct turn: no auto speech or auto advancement.
  await p.reload();await fixture();await p.waitForTimeout(750);assert.deepEqual(await state(),hiddenState);assert.equal(await p.evaluate(()=>speechCalls.length),0);
  // A deliberate listen-again pauses auto progression, preserving the replay.
  await p.locator('.ll-actions .ll-primary').click();await fillCorrect();await check();const replayState=await state();await p.locator('.letter-ladder .word-picture').click();await release();await p.waitForTimeout(750);assert.deepEqual(await state(),replayState);await release();await p.waitForTimeout(80);assert.deepEqual(await state(),replayState);await p.locator('.ll-actions .ll-primary').click();
  // Advance the fixture with real scoring to the full-word level.
  await p.evaluate(()=>{
   const g=testLadder.game;let guard=0;while(g.state.active.phase<4&&guard++<40){const a=g.state.active,t=g.entry();if(!t){g.advance();continue;}if(!t.result){for(const pos of t.holes)g.choose(t.tiles.findIndex((c,n)=>!t.draft.includes(n)&&c===g.word().name[pos]));g.check();}g.next();if(a.index===a.tasks.length)g.advance();}testLadder.render(document.querySelector('.letter-ladder'),true);
  });
  for(const [width,height]of [[1024,768],[768,1024],[744,1133],[1133,744],[820,1180],[1180,820],[1024,1366],[1366,1024],[1024,620],[507,768]]){
   await p.setViewportSize({width,height});await p.waitForFunction(()=>document.body.classList.contains('tg-typing'));await p.waitForTimeout(120);
   const result=await p.evaluate(()=>{const k=document.querySelector('.tg-keyboard').getBoundingClientRect(),panel=document.querySelector('.tg-panel').getBoundingClientRect(),input=document.querySelector('.ll-input').getBoundingClientRect(),actions=document.querySelector('.ll-actions').getBoundingClientRect();return {keyboard:k.height,panelBottom:panel.bottom,keyboardTop:k.top,inputHeight:input.height,actionsBottom:actions.bottom,width:document.documentElement.scrollWidth};});
   assert(result.panelBottom<=result.keyboardTop+1);assert(result.actionsBottom<=result.keyboardTop+1);assert(result.width<=width+1);
   assert.equal(result.keyboard,width>=700&&height>=600?(height>=700?Math.round(Math.max(264,Math.min(360,height*.31))):240):224);
   if(width>=700&&height>=700)assert(result.inputHeight>48);layouts.push({width,height,...result});await p.screenshot({path:`${out}/typing-${width}-${height}.png`});
  }
  await p.setViewportSize({width:1024,height:768});await p.waitForTimeout(100);
  await p.locator('.ll-input').fill('wrong');await check();const wrong=await state();await p.waitForTimeout(750);assert.deepEqual(await state(),wrong);
  await p.locator('.ll-input').fill(await p.evaluate(()=>testLadder.game.word().name));await check();assert.equal((await state()).result,'corrected');
  await p.waitForTimeout(100);assert(await p.locator('.tg-keyboard').isVisible(),'keyboard stays docked during answer');assert(await p.locator('.tg-keyboard [data-key=q]').isDisabled());
  await release();await p.waitForFunction(()=>testLadder.game.state.active.index===1&&document.activeElement===document.querySelector('.ll-input'));assert.equal(await p.locator('.ll-input').getAttribute('inputmode'),'none');await p.keyboard.type(await p.evaluate(()=>testLadder.game.word().name));await check();await release();
  await p.locator('.ll-summary').waitFor();const summary=await p.evaluate(()=>JSON.stringify(testLadder.game.state));await p.waitForTimeout(750);assert.equal(await p.evaluate(()=>JSON.stringify(testLadder.game.state)),summary,'summary does not start another round');
  // Reduced motion suppresses the pointer animation, without suppressing clicks.
  await p.emulateMedia({reducedMotion:'reduce'});const next=p.locator('.ll-primary').first(),r=await next.boundingBox();await p.mouse.move(r.x+r.width/2,r.y+r.height/2);await p.mouse.down();assert.equal(await next.evaluate(n=>n.getAnimations().length),0);await p.mouse.up();await p.locator('.ll-slot').first().waitFor();
  await p.evaluate(()=>{DanhAnswerSpeech.say=()=>false;});const mutedState=await state();await fillCorrect();await check();await p.waitForFunction(index=>testLadder.game.state.active.index===index+1,mutedState.index);
  await p.evaluate(()=>{DanhAnswerSpeech.say=()=>Promise.reject(new Error('test speech failure'));});const failedState=await state();await fillCorrect();await check();await p.waitForFunction(a=>testLadder.game.state.active.phase!==a.phase||testLadder.game.state.active.index!==a.index,failedState);
  await p.evaluate(()=>{DanhAnswerSpeech.say=()=>new Promise(resolve=>finishSpeech.push(resolve));});await fillCorrect();await check();const left=await state();await p.locator('.tg-bar button').first().click();await release();await p.waitForTimeout(750);assert.deepEqual(await state(),left,'leaving cancels auto progression');
  await p.getByRole('button',{name:'Trò chơi',exact:true}).click();await fixture(true);await fillCorrect();await check();await p.evaluate(()=>{window.oldFinish=finishSpeech[0];});await fixture(true);await fillCorrect();await check();await p.evaluate(()=>oldFinish(true));await p.waitForTimeout(80);assert.equal(await p.locator('.letter-ladder').getAttribute('data-letter-auto'),'waiting','replaced game cannot clear a new pending turn');await release();await p.waitForFunction(()=>testLadder.game.state.active.index===1);
  await fillCorrect();await check();const modalState=await state();await p.evaluate(()=>{const dialog=document.createElement('dialog');dialog.id='test-modal';dialog.textContent='Chọn từ';document.body.append(dialog);dialog.showModal();});await release();await p.waitForTimeout(750);assert.deepEqual(await state(),modalState,'a word picker pauses progression');await p.evaluate(()=>document.getElementById('test-modal').remove());
  assert.deepEqual(errors,[]);fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,layouts,waitsForSpeech:true,replayPauses:true,repeatSafe:true,hiddenAndReloadSafe:true,correctedAutoNext:true,summaryStops:true,pressBounce:true,reducedMotion:true,mutedAndFailedSpeech:true,leaveCancels:true,errors},null,2));console.log('PASS roomy iPad sizes, tall keyboard, native tap bounce, speech-gated auto next, repeated checks, hidden/reload, correction, replay, muted/error and summary');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
