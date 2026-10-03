const {initLearner,seedLearning}=require('../learner-profiles/browser-helper.cjs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const Q=require('../../assets/data/grammar/questions.js'),S=require('../../assets/js/grammar/session.js'),P=require('../../assets/js/grammar/progress.js');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001',out=path.resolve(__dirname,'../../artifacts/grammar-playful');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}),page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await initLearner(ctx);
  await page.goto(`${base}/grammar-index.html`);await page.evaluate(async()=>{await document.fonts.load('800 24px Nunito','Ngữ pháp đáng yêu');await document.fonts.ready;});
  assert.equal(await page.evaluate(()=>DanhGrammarExperience.audioState),'not-started');
  assert.ok(await page.evaluate(()=>document.fonts.check('800 24px Nunito','Ngữ pháp đáng yêu')));
  assert.ok(await page.evaluate(()=>[...document.fonts].some(f=>f.family==='Nunito'&&f.status==='loaded')));
  await page.screenshot({path:path.join(out,'room-mobile.png'),fullPage:true});
  await page.locator('#sound-toggle').click();assert.equal(await page.locator('#sound-toggle').getAttribute('aria-pressed'),'false');
  await page.reload();assert.match(await page.locator('#sound-toggle').innerText(),/tắt/);
  await page.locator('#sound-toggle').click();await page.waitForFunction(()=>DanhGrammarExperience.audioState==='running');
  // A real attempt, correct feedback, next question and completion.
  await page.goto(`${base}/grammar-practice.html?topic=present-simple`);await page.locator('#start-btn').click();
  assert.equal(await page.evaluate(()=>DanhGrammarExperience.audioState),'running');
  await page.screenshot({path:path.join(out,'question-mobile.png'),fullPage:true});
  for(let i=0;i<10;i++){
   const q=await page.evaluate(()=>{const s=JSON.parse(DanhLearners.storage.getItem(DanhGrammarProgress.KEY)).active;return DanhGrammarQuestions.find(q=>q.id===s.questionIds[s.index]);});
   if(q.type==='choice')await page.locator('[data-option="0"]').click();else if(q.type==='order'){for(let j=0;j<q.tokens.length;j++)await page.locator(`#available-tokens [data-token="${j}"]`).click();}else await page.locator('#answer-input').fill(q.answers[0]);
   await page.locator('#check-btn').click();assert.match(await page.locator('#buddy-message').innerText(),/ngôi sao/);assert.equal(await page.locator('#learning-buddy').getAttribute('data-mood'),'correct');
   if(i===0){await page.screenshot({path:path.join(out,'correct-mobile.png'),fullPage:true});await page.locator('#sound-toggle').click();assert.equal(await page.evaluate(()=>DanhGrammarExperience.activeVoices),0);await page.locator('#sound-toggle').click();}
   await page.locator('#next-btn').click();if(i<9)await page.waitForTimeout(310);
  }
  assert.equal(await page.locator('#score').innerText(),'10/10');assert.equal(await page.locator('.celebration-layer').count(),1);
  await page.screenshot({path:path.join(out,'results-mobile.png'),fullPage:true});await page.waitForTimeout(1700);assert.equal(await page.locator('.celebration-layer').count(),0);
  await page.locator('#motion-toggle').click();assert.equal(await page.locator('body').getAttribute('data-motion'),'off');await page.reload();assert.equal(await page.locator('body').getAttribute('data-motion'),'off');
  // OS reduced motion wins over stored settings and creates no confetti.
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('#motion-toggle').disabled);assert.ok(await page.locator('#motion-toggle').isDisabled());await page.evaluate(()=>DanhGrammarExperience.event('finish',document.querySelector('#setup-panel')));assert.equal(await page.locator('.celebration-layer').count(),0);
  await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForFunction(()=>!document.querySelector('#motion-toggle').disabled);assert.ok(await page.locator('#motion-toggle').isEnabled());
  for(const width of[320,375,390,430,844,1280]){await page.setViewportSize({width,height:width===844?390:900});await page.goto(`${base}/grammar-index.html`);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`home ${width}`);await page.goto(`${base}/grammar-practice.html?topic=be`);await page.locator('#start-btn').click();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`practice ${width}`);assert.ok(await page.locator('#question').evaluate(el=>parseFloat(getComputedStyle(el).fontSize)>=24));if(width===1280){await page.goto(`${base}/grammar-index.html`);await page.screenshot({path:path.join(out,'room-desktop.png'),fullPage:true});}await page.evaluate(()=>{DanhLearners.storage.removeItem(DanhGrammarProgress.KEY);});await page.close();break;}
  // Reload-isolated fixtures verify all remaining widths and retry animation/audio paths.
  for(const width of[375,390,430,844,1280]){
   const fixture=await browser.newContext({viewport:{width,height:width===844?390:900}}),p=await fixture.newPage();p.on('pageerror',e=>errors.push(e.message));await initLearner(fixture);
   await p.goto(`${base}/grammar-index.html`);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(width===1280)await p.screenshot({path:path.join(out,'room-desktop.png'),fullPage:true});
   const q=Q.find(q=>q.type==='fill'&&q.topic==='present-simple'&&q.level===3),state=P.fresh();state.active=S.create([q],{topic:q.topic,level:q.level,mode:'topic'});
   await seedLearning(p,P.KEY,JSON.stringify(state));await p.goto(`${base}/grammar-practice.html?resume=1`);
   await p.locator('#answer-input').fill('wrong');await p.locator('#check-btn').click();assert.equal(await p.locator('#learning-buddy').getAttribute('data-mood'),'retry');assert.ok(await p.locator('#explanation').isHidden());assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await fixture.close();
  }
  assert.deepEqual(errors,[]);console.log('PASS: local Nunito, no autoplay, sound and motion preferences, all feedback states, completion particles, reduced motion and six sizes.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
