const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict');
const {initLearner,seedLearning}=require('../../../tests/learner-profiles/browser-helper.cjs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await initLearner(c);await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await c.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.mediaEvents=[];document.addEventListener('danh-answer-speech',e=>mediaEvents.push(e.detail));});
 const p=await c.newPage();await seedLearning(p,'danh-vocabulary-effects-v1',JSON.stringify({sound:false,motion:false,shared:true}));await p.goto(base+'/grade/lop2/gsunit1.html?game=letters');await p.locator('.ll-slot').first().waitFor();
 const key='danh-g2-letter-ladder-gsunit1-v1',data=await p.evaluate(k=>{const s=JSON.parse(DanhLearners.storage.getItem(k)).active,t=s.tasks[s.index];return {t,name:grade2Units.gsunit1.words.find(w=>w.id===t.id).name};},key);
 const t=data.t,n=t.tiles.findIndex(c=>c===Array.from(data.name)[t.holes[0]].toLowerCase());await p.locator(`[data-tile="${n}"]`).click();await p.locator('.letter-ladder').getByRole('button',{name:'Kiểm tra',exact:true}).click();assert.equal(await p.evaluate(()=>mediaEvents.length),0);assert.equal(await p.evaluate(()=>DanhLearningEffects.soundEnabled()),false);
 await p.locator('.letter-ladder .word-picture').click();await p.waitForFunction(()=>mediaEvents.some(e=>e.state==='ended'&&e.mode==='audio'));assert(await p.evaluate(()=>mediaEvents.some(e=>e.state==='playing'&&e.mode==='audio')));await p.reload();await p.locator('.letter-ladder').waitFor();assert.equal(await p.evaluate(()=>mediaEvents.length),0);assert.equal(await p.locator('.vg-spark').count(),0);assert.equal(await p.locator('#sound-toggle,#motion-toggle').count(),0);
 console.log('PASS saved mute, manual WAV replay, no speech on solved reload, reduced motion and no setting controls');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
