const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {modes}=require('../assets/js/mixed-review-core.js');
const base='http://127.0.0.1:8001',out=path.resolve(__dirname,'../../../artifacts/grade2-mixed-review-expanded');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});
 try{
  const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  await c.addInitScript(()=>{
   window.media=[];window.spoken=[];window.feedbackEvents=[];
   Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});
   const original=HTMLMediaElement.prototype.play,seen=new WeakSet();
   HTMLMediaElement.prototype.play=function(...args){if(!seen.has(this)){seen.add(this);for(const type of ['playing','ended','error'])this.addEventListener(type,()=>{if(type==='error'&&!this.getAttribute('src'))return;window.media.push({type,src:this.currentSrc||this.src});});}return original.apply(this,args);};
   document.addEventListener('danh-answer-speech',e=>{if(e.detail.state==='playing')window.spoken.push(e.detail.text);});
   document.addEventListener('danh-learning-feedback',e=>window.feedbackEvents.push(e.detail));
  });
  const p=await c.newPage(),errors=[],missing=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)missing.push(r.url());});
  await p.goto(base+'/grade/lop2/review.html');
  await p.getByRole('button',{name:'Lưu dữ liệu học',exact:true}).click();await p.locator('#learner-name').fill('Đảo ôn tập');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(()=>window.DanhLearners?.current);
  const current=()=>p.evaluate(()=>{const m=new DanhGrade2Review.Review(grade2Units,DanhLearners.storage);return m.task?{round:m.round,task:m.task,answer:m.answer,record:m.record(),expected:m.expected(),solution:m.solution(),tokens:m.tokens(),choice:m.isChoice(),totals:m.totals()}:null;});
  const fit=async()=>assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.equal(await p.locator('#selection-summary,#selection-label,.settings,.rules,#setup-title,#check,#sentence-check').count(),0);assert.equal(await p.locator('#pick-units').innerText(),'Chọn Unit');assert.equal(await p.locator('#start').innerText(),'Chơi');assert(await p.evaluate(()=>DanhLearningEffects.soundEnabled()&&DanhLearningEffects.motionEnabled()));assert.equal(await p.evaluate(()=>media.length),0);
  await p.locator('#pick-units').click();assert.equal(await p.evaluate(()=>document.activeElement.id),'unit-search');await p.locator('#pick-none').click();assert(await p.locator('#apply-units').isDisabled());
  await p.locator('#unit-search').fill('birthday');assert.equal(await p.locator('.unit-choice').count(),1);
  for(let i=0;i<20;i++){await p.keyboard.press(i<10?'Tab':'Shift+Tab');assert(await p.evaluate(()=>!!document.activeElement.closest('#unit-picker')));}
  await p.keyboard.press('Escape');assert(!await p.locator('#unit-picker').isVisible());assert(await p.locator('#pick-units').evaluate(n=>n===document.activeElement));
  await p.locator('#pick-units').click();await p.locator('#pick-none').click();for(const n of [1,2,3,4])await p.locator(`.unit-choice input[value=gsunit${n}]`).check();await p.locator('#apply-units').click();
  assert.equal(await p.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-g2-mixed-review-v1')).selected.length),4);await p.screenshot({path:out+'/setup-390.png',fullPage:true});
  async function onlyMode(mode){
   if(!await p.locator('#mode-choices').isVisible())await p.locator('#mode-summary').click();
   await p.locator(`#mode-choices input[value="${mode}"]`).check();
   for(const other of modes.filter(v=>v!==mode))await p.locator(`#mode-choices input[value="${other}"]`).uncheck();
  }
  async function start(){if(await current())p.once('dialog',d=>d.accept());await p.locator('#start').click();}
  async function answer(retry=false){
   const s=await current(),ended=await p.evaluate(()=>media.filter(e=>e.type==='ended').length);
   if(s.choice){if(retry){await p.locator(`[data-choice="${s.task.options.find(v=>v!==s.solution)}"]`).click();assert.equal((await current()).answer.mistakes,1);}await p.locator(`[data-choice="${s.solution}"]`).click();}
   else if(s.task.mode==='sentence'){
    if(retry){for(let n=s.tokens.length-1;n>=0;n--)await p.locator(`#tokens [data-token="${n}"]`).click();assert.equal((await current()).answer.mistakes,1);while(await p.locator('#assembled button').count())await p.locator('#assembled button').last().click();}
    for(let n=0;n<s.tokens.length;n++)await p.locator(`#tokens [data-token="${n}"]`).click();
   }else{
    await p.locator('#answer').press('Enter');assert.equal((await current()).answer.mistakes,0);
    if(retry){await p.locator('#answer').fill('not an answer');await p.locator('#answer').press('Tab');assert.equal((await current()).answer.mistakes,1);}
    await p.locator('#answer').fill(s.expected);await p.waitForFunction(()=>new DanhGrade2Review.Review(grade2Units,DanhLearners.storage).answer.outcome);
   }
   // A repeated submit must not cancel the reading, emit another read, or add points.
   await p.locator('#answer-form').evaluate(form=>form.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));
   assert.equal((await current()).answer.outcome,retry?'retry':'first');
   await p.waitForFunction(n=>media.filter(e=>e.type==='ended').length>n,ended);
   assert.equal(await p.evaluate(()=>spoken.at(-1)),s.expected);
   assert.equal(await p.evaluate(()=>media.filter(e=>e.type==='ended').length),ended+1);
   return {mode:s.task.mode,retry,expected:s.expected};
  }
  const audio=[];
  for(const mode of modes){
   await onlyMode(mode);await start();assert.equal((await current()).task.mode,mode);await fit();
   if(['gap','letters'].includes(mode)){assert.equal(await p.locator('#puzzle .danh-exercise-gap').count(),1);assert.equal(await p.locator('#puzzle .danh-exercise-gap').evaluate(n=>getComputedStyle(n,'::after').borderBottomStyle),'solid');}
   if(['gap','letters','dialogue','sentence-listening','writing'].includes(mode))await p.screenshot({path:`${out}/${mode}-390.png`,fullPage:true});
   if(['listening','sentence-listening'].includes(mode)){const n=await p.evaluate(()=>media.filter(e=>e.type==='ended').length);await p.locator('#listen').click();await p.waitForFunction(n=>media.filter(e=>e.type==='ended').length>n,n);}
   if(mode==='spelling'){await p.locator('#answer').fill('my draft');await p.reload();assert.equal(await p.evaluate(()=>media.length),0);await p.locator('#resume').click();assert.equal(await p.locator('#answer').inputValue(),'my draft');await p.locator('#answer').fill('');}
   if(mode==='sentence'){await p.locator('#tokens button').first().click();const before=(await current()).answer.parts;await p.reload();assert.equal(await p.evaluate(()=>media.length),0);await p.locator('#resume').click();assert.deepEqual((await current()).answer.parts,before);await p.locator('#undo').click();}
   audio.push(await answer(false));await p.locator('#next').click();audio.push(await answer(true));assert.equal((await current()).totals.score,15);
   await p.locator('#leave').click();console.log('PASS '+mode+' UI, first/retry real answer audio');
  }
  fs.writeFileSync(out+'/audio-proof.json',JSON.stringify({webSpeechDisabled:true,actualPlayingEnded:true,audio},null,2));
  // Finish a round with all five evidence states and inspect the review route.
  await p.clock.install();await onlyMode('meaning');await start();let s=await current();await p.locator(`[data-choice="${s.task.options.find(v=>v!==s.solution)}"]`).click();await p.locator(`[data-choice="${s.solution}"]`).click();await p.locator('#next').click();
  await p.locator('#hint').click();s=await current();await p.locator(`[data-choice="${s.solution}"]`).click();assert.equal((await current()).answer.outcome,'hinted');await p.locator('#next').click();
  assert(await p.locator('#reveal').isHidden());await p.locator('#reveal').evaluate(n=>n.click());assert.equal((await current()).answer.outcome,null);
  await p.clock.fastForward(29000);assert(await p.locator('#reveal').isHidden());await p.clock.fastForward(1100);assert(await p.locator('#reveal').isVisible());
  await p.locator('#reveal').click();assert.equal((await current()).answer.outcome,'revealed');await p.locator('#next').click();assert(await p.locator('#reveal').isHidden());await p.clock.resume();await p.locator('#skip').click();assert.equal((await current()).answer.outcome,'skipped');await p.locator('#next').click();
  while(await p.locator('#play').isVisible()){s=await current();await p.locator(`[data-choice="${s.solution}"]`).click();await p.locator('#next').click();}
  assert.match(await p.locator('#result-score').innerText(),/^68 sao/);assert.equal(await p.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-g2-mixed-review-v1')).history.length),1);await p.screenshot({path:out+'/result-390.png',fullPage:true});
  await p.locator('#retry').click();assert.equal((await current()).round.tasks.length,4);
  await p.locator('#leave').click();const before=await current();await p.locator('#pick-units').click();await p.locator('#pick-term2').click();await p.locator('#apply-units').click();assert.deepEqual((await current()).round,before.round);
  await onlyMode('dialogue');assert.deepEqual((await current()).round,before.round);p.once('dialog',d=>d.dismiss());await p.locator('#start').click();assert.deepEqual((await current()).round,before.round);
  await p.locator('#resume').click();const sizes=[];for(const width of [320,390,760,1280]){await p.setViewportSize({width,height:900});await fit();await p.locator('#leave').click();await fit();await p.locator('#pick-units').click();await fit();assert(await p.locator('#unit-picker').evaluate(n=>n.scrollWidth<=n.clientWidth+1));await p.locator('#cancel-units').click();if(width===1280)await p.screenshot({path:out+'/setup-1280.png',fullPage:true});await p.locator('#resume').click();sizes.push(width);}
  await p.setViewportSize({width:390,height:844});await p.evaluate(()=>document.documentElement.style.fontSize='200%');await fit();await p.screenshot({path:out+'/large-text-390.png',fullPage:true});await p.evaluate(()=>document.documentElement.style.fontSize='');
  assert((await p.evaluate(()=>feedbackEvents)).every(e=>!e.motion));assert.equal(await p.locator('.vg-spark').count(),0);
  // Actual Vietnamese glyphs from the bundled Nunito with external networking blocked.
  const cdp=await c.newCDPSession(p);await cdp.send('DOM.enable');await cdp.send('CSS.enable');await p.evaluate(()=>document.fonts.ready);await cdp.send('DOM.getDocument',{depth:-1,pierce:true});const {result}=await cdp.send('Runtime.evaluate',{expression:"document.querySelector('#question')"});const {nodeId}=await cdp.send('DOM.requestNode',{objectId:result.objectId});const fonts=(await cdp.send('CSS.getPlatformFontsForNode',{nodeId})).fonts;assert(fonts.length&&fonts.every(f=>f.isCustomFont&&/Nunito/.test(f.familyName)));
  // Preserve an actual v1 journey, including its unfinished token selection.
  const legacy=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/mixed-review-v1.json'),'utf8'));await p.goto(base+'/grade/lop2/lop2.html');await p.evaluate(saved=>DanhLearners.storage.setItem('danh-g2-mixed-review-v1',JSON.stringify(saved)),legacy);await p.goto(base+'/grade/lop2/review.html');assert.equal(await p.evaluate(()=>media.length),0);await p.locator('#resume').click();assert.deepEqual((await current()).round,legacy.active);assert.equal(await p.locator('#assembled button').count(),1);
  // Automatic effects apply here without overwriting another activity's saved preferences.
  await p.evaluate(()=>DanhLearners.storage.setItem('danh-vocabulary-effects-v1',JSON.stringify({sound:false,motion:false,shared:true})));await p.reload();assert(await p.evaluate(()=>DanhLearningEffects.soundEnabled()&&DanhLearningEffects.motionEnabled()));assert.equal(await p.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-vocabulary-effects-v1')).sound),false);assert.equal(await p.evaluate(()=>media.length),0);await p.locator('#resume').click();await p.locator('#undo').click();s=await current();for(let n=0;n<s.tokens.length;n++)await p.locator(`#tokens [data-token="${n}"]`).click();await p.waitForFunction(()=>media.some(e=>e.type==='playing'));
  await p.evaluate(()=>DanhLearners.open());await p.getByRole('button',{name:'+ Thêm người học',exact:true}).click();await p.locator('#learner-name').fill('Bạn trên đảo');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(()=>window.DanhLearners?.current?.name==='Bạn trên đảo');assert(!await p.locator('#continue-panel').isVisible());
  const second=await c.newPage();await second.goto(base+'/grade/lop2/review.html');await second.getByRole('button',{name:'Lưu dữ liệu học',exact:true}).click();await second.getByRole('button',{name:/Bạn trên đảo/}).click();await second.waitForFunction(()=>window.DanhLearners?.current?.name==='Bạn trên đảo');await second.evaluate(()=>DanhLearners.storage.getItem('danh-g2-mixed-review-v1'));await p.locator('#start').click();await second.getByRole('button',{name:'Tải lại để tiếp tục'}).waitFor();await second.close();
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);await c.close();
  const blocked=await b.newContext();await blocked.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());await blocked.addInitScript(()=>{for(const k of ['localStorage','sessionStorage'])Object.defineProperty(window,k,{get(){throw Error('blocked');}});});const bp=await blocked.newPage();await bp.goto(base+'/grade/lop2/review.html');await bp.locator('#start').click();assert(await bp.locator('#play').isVisible());await bp.reload();assert(await bp.locator('#continue-panel').isVisible());await blocked.close();
  fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,sizes,audio,webSpeechDisabled:true,actualPlayingEnded:true,fonts,checks:'9 modes; first/retry/hinted/revealed/skipped; old v1 resume; draft/tokens; round unchanged on selection; review; empty/repeat; local fonts; 200% text; reduced motion; mute; profiles; tabs; blocked storage',errors,missing},null,2));console.log('PASS island review: nine modes, real media, legacy resume, layouts, profiles, tabs, blocked storage.');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
