const {initLearner,seedLearning}=require('../learner-profiles/browser-helper.cjs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict');
const Q=require('../../assets/data/grammar/questions.js'),S=require('../../assets/js/grammar/session.js'),P=require('../../assets/js/grammar/progress.js');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await initLearner(c);await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await c.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.events=[];document.addEventListener('danh-answer-speech',e=>events.push(e.detail));});
 const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const q=Q.find(q=>q.type==='choice'&&q.level===2),state=P.fresh();state.active=S.create([q],{topic:q.topic,level:2,mode:'topic'});
 await seedLearning(p,P.KEY,JSON.stringify(state));await seedLearning(p,'danh-grammar-experience-v1',JSON.stringify({sound:false,motion:true}));
 await p.goto(base+'/grammar-practice.html?resume=1');await p.locator('#practice').waitFor({state:'visible'});
 assert.equal(await p.locator('#sound-toggle,#motion-toggle').count(),0);assert.equal(await p.locator('body').getAttribute('data-motion'),'off');assert.equal(await p.evaluate(()=>events.length),0);
 await p.locator('[data-option="0"]').click();await p.locator('#check-btn').click();assert.equal(await p.locator('#learning-buddy').getAttribute('data-mood'),'correct');assert.equal(await p.evaluate(()=>events.length),0);
 await p.locator('#answer-listen').click();await p.waitForFunction(()=>events.some(e=>e.state==='ended'&&e.mode==='audio'));assert(await p.evaluate(()=>events.some(e=>e.state==='playing'&&e.mode==='audio')));
 await p.locator('#next-btn').click();assert.equal(await p.locator('#score').innerText(),'1/1');assert.equal(await p.locator('.celebration-layer').count(),0);console.log('PASS saved mute, manual replay media, reduced motion and no setting controls');
 for(const width of [320,375,390,430,844,1280]){await p.setViewportSize({width,height:width===844?390:900});await p.goto(base+'/grammar-practice.html?resume=1');await p.locator('#practice').waitFor({state:'visible'});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert(await p.locator('#question').evaluate(n=>parseFloat(getComputedStyle(n).fontSize)>=24));}
 assert.deepEqual(errors,[]);console.log('PASS six practice viewports and readable questions, no external network');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
