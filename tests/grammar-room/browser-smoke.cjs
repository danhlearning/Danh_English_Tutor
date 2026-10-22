const {initLearner,seedLearning}=require('../learner-profiles/browser-helper.cjs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const questions=require('../../assets/data/grammar/questions.js'),session=require('../../assets/js/grammar/session.js'),progress=require('../../assets/js/grammar/progress.js');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
const out=path.resolve(__dirname,'../../artifacts/grammar-room');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
  await initLearner(context);
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${base}/grammar-index.html`);await page.waitForSelector('.topic-card');
  assert.equal(await page.locator('.topic-card').count(),7);assert.equal(await page.locator('.topic-links li').count(),25);
  await page.screenshot({path:path.join(out,'room-mobile.png'),fullPage:true});
  await page.locator('#search').fill('mao tu');assert.equal(await page.locator('.topic-links li').count(),1);await page.locator('#search').fill('');
  const topics=await page.evaluate(()=>DanhGrammarCatalog.topics.map(t=>t.id));
  async function question(){return page.evaluate(()=>{const s=JSON.parse(DanhLearners.storage.getItem(DanhGrammarProgress.KEY)).active;return DanhGrammarQuestions.find(q=>q.id===s.questionIds[s.index]);});}
  async function answer(q){if(q.type==='choice')await page.locator('[data-option="0"]').click();else if(q.type==='order'){for(let i=0;i<q.tokens.length;i++)await page.locator(`#available-tokens [data-token="${i}"]`).click();}else await page.locator('#answer-input').fill(q.answers[0]);await page.locator('#check-btn').click();assert.match(await page.locator('#feedback').innerText(),/Đúng ngay/);}
  let completed=0;
  if(!process.env.GRAMMAR_SKIP_FULL)for(const topic of topics)for(let level=1;level<=3;level++){
   await page.goto(`${base}/grammar-practice.html?topic=${topic}&level=${level}`);await page.locator('#start-btn').click();
   const types=[];for(let i=0;i<10;i++){const q=await question();types.push(q.type);await answer(q);await page.locator('#next-btn').click();if(i<9)await page.waitForTimeout(310);}
   assert.equal(await page.locator('#score').innerText(),'10/10');for(const[type,count]of Object.entries({choice:3,fill:2,order:2,correct:1,rewrite:2}))assert.equal(types.filter(t=>t===type).length,count);
   completed++;if(completed%5===0)console.log(`Completed ${completed}/75 rounds (${completed*10} answers).`);
  }
  if(completed){await page.screenshot({path:path.join(out,'results-mobile.png'),fullPage:true});console.log('All 75 rounds completed.');}
  // Exercise a saved typed-answer question and retries without revealing the sample.
  await page.goto(`${base}/grammar-practice.html?topic=present-simple`);await page.locator('#start-btn').click();
  while((await question()).type==='choice'||(await question()).type==='order'){await answer(await question());await page.locator('#next-btn').click();await page.waitForTimeout(310);}
  const typed=await question();await page.locator('#answer-input').fill('wrong-one');await page.locator('#check-btn').click();
  assert.ok(await page.locator('#explanation').isHidden());assert.ok(await page.locator('#reveal-btn').isDisabled());
  await page.locator('#check-btn').dblclick();assert.ok(await page.locator('#reveal-btn').isDisabled());
  await page.reload();await page.locator('#resume-btn').click();assert.equal(await page.locator('#answer-input').inputValue(),'wrong-one');assert.equal((await question()).id,typed.id);
  await page.locator('#answer-input').fill('wrong-two');await page.locator('#check-btn').click();assert.ok(await page.locator('#reveal-btn').isEnabled());
  await page.locator('#reveal-btn').click();assert.match(await page.locator('#feedback').innerText(),/Đã xem đáp án/);
  const stored=await page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem(DanhGrammarProgress.KEY)));assert.equal(stored.active.outcomes[stored.active.index].kind,'seen');assert.equal(stored.records[typed.id].kind,'seen');
  await page.goto(`${base}/grammar-index.html`);assert.ok(await page.locator('#continue-panel').isVisible());assert.ok(await page.locator('#review-start').isEnabled());
  page.once('dialog',d=>d.accept());await page.locator('#review-start').click();await page.waitForSelector('#practice:not([hidden])');assert.ok(await page.locator('#counter').innerText());
  // Five viewports, all five answer types, old URLs and the quick theory checks.
  for(const width of[320,375,390,430,1280]){
   await page.setViewportSize({width,height:900});await page.goto(`${base}/grammar-index.html`);await page.waitForSelector('.topic-card');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`home ${width}`);
   if(width===1280)await page.screenshot({path:path.join(out,'room-desktop.png'),fullPage:true});
   const fixtureContext=await browser.newContext({viewport:{width,height:900},isMobile:width<700,hasTouch:width<700});
   await initLearner(fixtureContext);
   for(const type of['choice','fill','order','correct','rewrite']){
    const q=questions.find(q=>q.type===type&&q.topic==='present-simple'&&q.level===3),state=progress.fresh();state.active=session.create([q],{topic:q.topic,level:3,mode:'topic'});
    const fixturePage=await fixtureContext.newPage();fixturePage.on('pageerror',e=>errors.push(e.message));await seedLearning(fixturePage,progress.KEY,JSON.stringify(state));
    await fixturePage.goto(`${base}/grammar-practice.html?resume=1`);await fixturePage.waitForSelector('#practice:not([hidden])');assert.ok(await fixturePage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${type} ${width}`);
    assert.equal(await fixturePage.locator('#question-label').innerText(),{choice:'Chọn đáp án',fill:'Điền từ',order:'Xếp câu',correct:'Sửa lỗi',rewrite:'Viết lại câu'}[type]);
    if(type!=='order')assert.ok(await fixturePage.locator('#question').evaluate(el=>parseFloat(getComputedStyle(el).fontSize))>=24);
    if(width===390&&type==='rewrite')await fixturePage.screenshot({path:path.join(out,'question-mobile.png'),fullPage:true});
    if(width===390){await fixturePage.setViewportSize({width:844,height:390});assert.ok(await fixturePage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
    await fixturePage.close();
   }
   await fixtureContext.close();
  }
  await page.setViewportSize({width:844,height:390});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  for(const file of['tense-practice.html','relative-clause-practice.html','condition-practice.html','wordform-practice.html','condition-pratice.html']){await page.goto(`${base}/${file}`);await page.waitForSelector('#topic-select');assert.ok(await page.locator('#start-btn').isVisible());}
  for(const file of['tense-theory.html','relative-clause-theory.html','condition-theory.html','wordform-theory.html','grammar-theory.html']){await page.goto(`${base}/${file}`);await page.waitForSelector('#theory-title');assert.equal(await page.locator('.example').count(),2);assert.equal(await page.locator('.quick-question').count(),3);const correct=await page.evaluate(()=>DanhGrammarCatalog.topics.find(t=>t.id===document.querySelector('#topic-select').value).seeds[0].focus);await page.locator(`[data-quick="0"][data-answer="${correct}"]`).click();assert.match(await page.locator('#quick-0').innerText(),/Chính xác/);}
  await page.setViewportSize({width:390,height:844});await page.goto(`${base}/grammar-theory.html?topic=passive`);await page.screenshot({path:path.join(out,'theory-mobile.png'),fullPage:true});
  // Storage blocked and corrupt / incompatible session: all remain usable.
  const blocked=await browser.newContext();await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new Error('blocked');}}));await initLearner(blocked);const blockedPage=await blocked.newPage();await blockedPage.goto(`${base}/grammar-practice.html?topic=be`);await blockedPage.locator('#start-btn').click();assert.ok(await blockedPage.locator('#practice').isVisible());assert.match(await blockedPage.locator('danh-learner #storage-warning').innerText(),/chặn lưu/);await blocked.close();
  for(const[value,message]of [['{bad',/Chưa đọc/],[JSON.stringify({...progress.fresh(),active:{version:99}}),/cập nhật/]]){
   const corrupt=await browser.newContext();await initLearner(corrupt);const corruptPage=await corrupt.newPage();await seedLearning(corruptPage,progress.KEY,value);corruptPage.on('pageerror',e=>errors.push(e.message));await corruptPage.goto(`${base}/grammar-index.html`);await corruptPage.waitForSelector('.topic-card');assert.match(await corruptPage.locator('#notice').innerText(),message);await corrupt.close();
  }
  assert.deepEqual(errors,[]);console.log(`PASS: ${completed} full rounds / ${completed*10} answers; retries, reveal, resume, old links, theory, storage fallbacks and six viewports.`);
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
