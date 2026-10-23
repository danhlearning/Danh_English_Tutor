const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8000',out=path.join(root,'artifacts/game-performance');fs.mkdirSync(out,{recursive:true});
const topics=['animals','clothes','colors','dates','familyfriends','feeling','fooddrinks','fruits','householditems','numbers','schoolsupplies','verbs','bodyparts','adjectives','shapes','toys','weather','rooms','transport'];
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'no-preference'});await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
await c.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined});window.media=[];const Native=window.Audio;window.Audio=function(...args){const audio=new Native(...args);for(const type of ['playing','ended','error','abort','emptied'])audio.addEventListener(type,()=>media.push({type,src:audio.src}));return audio;};window.Audio.prototype=Native.prototype;});
const p=await c.newPage(),errors=[],missing=[],checked=[];p.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR '+e.message);});p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400){missing.push(r.url());p.evaluate(()=>({url:location.href,text:document.documentElement.dataset.answerSpeechText})).then(x=>console.log("MISSING "+JSON.stringify(x)));}});
await p.goto(base+'/index.html');await p.getByRole('button',{name:'Đăng nhập',exact:true}).click();await p.locator('#learner-name').fill('Kiểm tra game mượt');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(()=>window.DanhLearners?.current?.name==='Kiểm tra game mượt');
const click=locator=>locator.evaluate(el=>el.click());
for(const topic of (process.env.PERF_TEST_TOPICS?.split(',')||topics)){
 await p.goto(`${base}/grade/lop2/${topic}.html`);assert.equal(await p.evaluate(()=>media.length),0,topic+' no autoplay');
 for(const game of ['game-flip','game-mcq','game-spelling','game-count']){const choice=p.locator(`[data-game="${game}"]`);if(await choice.count()){await click(choice);assert(await p.locator('#'+game).isVisible(),`${topic}/${game}`);}}
 await click(p.locator('[data-game=game-flip]'));const next=p.locator('#game-flip .learning-card-nav button:nth-child(2),#game-flip [onclick^="nextSingleCard"]');
 const line=p.locator('#game-flip .learning-progress,#card-counter-text');
 const before=await line.innerText();const handle=await next.elementHandle();await next.focus();
 for(let n=0;n<8;n++)await click(next);
 const position=before.match(/Thẻ\s+(\d+)\s*\/\s*(\d+)/);assert(position,topic+' card position');const expected=(Number(position[1])-1+8)%Number(position[2])+1;
 assert.match(await line.innerText(),new RegExp('Thẻ '+expected+'\\s*/\\s*'+position[2]),topic+' next card');assert(await handle.evaluate(el=>el.isConnected),topic+' stable controls');
 assert(await next.evaluate(el=>document.activeElement===el),topic+' keep keyboard focus');
 const saved=await line.innerText();await click(p.locator('[data-game=game-flip]'));assert.equal(await line.innerText(),saved,topic+' repeated tab');
 await p.reload();assert.equal(await line.innerText(),saved,topic+' resumed card');
 if(['animals','clothes'].includes(topic))for(const width of [390,1280]){await p.setViewportSize({width,height:900});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.waitForTimeout(280);await p.screenshot({path:path.join(out,`${topic}-${width}.png`)});}await p.setViewportSize({width:390,height:844});
 if(await p.evaluate(()=>media.some(e=>e.type==='error')))console.log('AUDIO ERROR '+topic+' '+JSON.stringify(await p.evaluate(()=>media)));checked.push(topic);console.log('PASS topic '+topic);
}
// Real local WAV playback after first-try and corrected answers in the shared primary engine.
await p.goto(base+'/grade/lop2/clothes.html');await p.getByRole('button',{name:'Trò chơi',exact:true}).click();await p.locator('[data-game=game-mcq]').click();
async function answer(corrected){
 const state=await p.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh.learning.clothes.v1')).rounds.mcq),id=state.deck[state.index];
 const option=p.locator('#game-mcq .learning-options button').filter({hasText:new RegExp('^'+id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$','i')});
 if(corrected)await p.locator('#game-mcq .learning-options button').filter({hasNotText:new RegExp('^'+id+'$','i')}).first().click();
 const n=await p.evaluate(()=>media.length);await option.click();try{await p.waitForFunction(n=>media.slice(n).some(e=>e.type==='ended'),n,{timeout:8000});}catch(error){console.log(JSON.stringify(await p.evaluate(()=>({media,state:document.documentElement.dataset,feedback:document.querySelector('#game-mcq .learning-feedback')?.textContent,active:document.querySelector('.tab-content.active')?.id,learner:DanhLearners.current?.name,round:JSON.parse(DanhLearners.storage.getItem('danh.learning.clothes.v1'))?.rounds.mcq,options:document.querySelector('#game-mcq .learning-options')?.textContent}))));throw error;}
 const events=await p.evaluate(n=>media.slice(n),n);assert(events.some(e=>e.type==='playing'&&e.src.endsWith('.wav')));
 await p.waitForFunction(index=>JSON.parse(DanhLearners.storage.getItem('danh.learning.clothes.v1')).rounds.mcq.index>index,state.index);
}
await answer(false);await answer(true);
// Shared secondary animation restarts without accumulating animation objects; stop/reduce cleans up.
await p.goto(base+'/grade/lop6/unit1.html');await click(p.locator('[data-tab=flashcards]'));await click(p.locator('#flashcard'));await click(p.locator('#flash-next'));assert.equal(await p.locator('#flashcard').getAttribute('aria-pressed'),'false');
await p.evaluate(()=>{const target=document.querySelector('#flashcard');for(let n=0;n<40;n++)DanhLearningEffects.feedback('good',target);});
assert(await p.locator('#flashcard').evaluate(el=>el.getAnimations().length<=1));
await p.emulateMedia({reducedMotion:'reduce'});await p.waitForFunction(()=>document.querySelector('#flashcard').getAnimations().length===0);
await p.emulateMedia({reducedMotion:'no-preference'});await p.evaluate(()=>{DanhLearningEffects.feedback('bad',document.querySelector('#flashcard'));DanhLearningEffects.stop();});assert.equal(await p.locator('#flashcard').evaluate(el=>el.getAnimations().length),0);
assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.writeFileSync(path.join(out,'regression-results.json'),JSON.stringify({passed:true,topics:checked,focusAndResume:true,realPrimaryWavFirstAndCorrected:true,animationCleanup:true,externalNetworkBlocked:true,errors,missing},null,2));
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
