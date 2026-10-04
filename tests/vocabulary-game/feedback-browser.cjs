const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001',out=path.resolve(__dirname,'../../artifacts/vocabulary-feedback');fs.mkdirSync(out,{recursive:true});
async function profile(page){await page.locator('#learner-name').fill('Phản hồi');await page.getByRole('button',{name:'Vào học ngay',exact:true}).click();await page.waitForFunction(()=>!!window.DanhVocabularyGame);}
const last=page=>page.evaluate(()=>testCues.at(-1));
const correctKey=(page,grade,scope)=>page.evaluate(({grade,scope})=>{const r=JSON.parse(DanhLearners.storage.getItem(`danh-g${grade}-vocabulary-game-${scope}-v1`)).active;return r.items[r.index];},{grade,scope});
(async()=>{const browser=await chromium.launch({headless:true,channel:'msedge'});try{
 const context=await browser.newContext({viewport:{width:390,height:844}});await context.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 await context.addInitScript(()=>{
  window.testCues=[];window.testStarts=0;const Native=window.AudioContext;
  window.AudioContext=class extends Native{createOscillator(){const o=super.createOscillator(),start=o.start.bind(o);o.start=(...args)=>{testStarts++;return start(...args);};return o;}createBufferSource(){const o=super.createBufferSource(),start=o.start.bind(o);o.start=(...args)=>{testStarts++;return start(...args);};return o;}};
  document.addEventListener('danh-vocabulary-feedback',e=>testCues.push({...e.detail,starts:testStarts}));
 });
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'/grade/lop6/unit1.html');await profile(page);
 for(const grade of[6,7]){
  await page.goto(base+`/grade/lop${grade}/unit1.html`);await page.waitForFunction(()=>!!window.DanhVocabularyGame);assert.equal(await page.evaluate(()=>testStarts),0);
  await page.mouse.click(2,300);assert.equal(await page.evaluate(()=>testStarts),0);
  await page.locator('[data-tab=flashcards]').click();const card=page.locator('#flashcard');
  assert.equal(await card.locator('.vg-flip-face').count(),2);assert.equal(await card.getAttribute('aria-pressed'),'false');
  const size=await card.boundingBox();await card.evaluate(node=>{node.click();node.click();});
  assert.equal((await last(page)).kind,'flip');assert.equal(await card.getAttribute('aria-pressed'),'true');
  assert.equal(await page.evaluate(()=>testCues.filter(x=>x.kind==='flip').length),1,'Rapid flip locked');
  const matrix=await card.locator('.vg-flip-inner').evaluate(async node=>{await new Promise(r=>setTimeout(r,180));return getComputedStyle(node).transform;});assert.match(matrix,/matrix3d/);
  await page.waitForTimeout(400);assert.ok(Math.abs((await card.boundingBox()).height-size.height)<1);
  assert.equal(await card.locator('.vg-flip-back').evaluate(node=>getComputedStyle(node).backfaceVisibility),'hidden');
  assert.equal(await card.locator('.vg-flip-back').getAttribute('aria-hidden'),'false');
  await page.screenshot({path:path.join(out,`grade${grade}-card-back-mobile.png`),fullPage:true});
  await card.focus();await page.keyboard.press('Enter');assert.equal(await card.getAttribute('aria-pressed'),'false');await page.waitForTimeout(570);
  await page.locator('#flash-next').click();assert.equal(await card.getAttribute('aria-pressed'),'false');assert.match(await card.innerText(),/THẺ 2/);
  await page.locator('#flash-prev').click();assert.match(await card.innerText(),/THẺ 1/);
  if(grade===7){
   await page.locator('#flash-prev').click();await card.click();await page.waitForTimeout(570);
   const picture=card.locator('img');await picture.evaluate(img=>img.decode());assert.equal(await picture.count(),1);
   assert.equal(await card.locator('.vg-flip-back').getAttribute('aria-hidden'),'false');
   await page.screenshot({path:path.join(out,'grade7-card-image-mobile.png'),fullPage:true});await page.locator('#flash-next').click();
  }
  for(const width of[320,390,760,1280]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`flash width ${width}`);}
  await page.setViewportSize({width:390,height:844});await page.locator('[data-tab=quiz]').click();await page.getByRole('button',{name:'Bắt đầu chơi',exact:true}).click();assert.equal((await last(page)).kind,'start');
  for(let index=0;index<5;index++){
   const key=await correctKey(page,grade,'unit1');const before=await page.evaluate(()=>testStarts);
   await page.locator(`[data-answer-key="${key}"]`).focus();await page.keyboard.press('Enter');
   const cue=await last(page);assert.equal(cue.kind,[2,4].includes(index)?'streak':'good');assert.ok(cue.starts>before);
   assert.equal(await page.locator('#quiz-stage .vg-streak').getAttribute('data-streak'),String(index+1));
   if(index===4){await page.screenshot({path:path.join(out,`grade${grade}-streak-mobile.png`),fullPage:true});await page.reload();assert.equal(await page.evaluate(()=>testStarts),0);await page.locator('[data-tab=quiz]').click();await page.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}).click();assert.equal(await page.locator('#quiz-stage .vg-streak').getAttribute('data-streak'),'5');assert.equal(await page.evaluate(()=>testCues.some(x=>x.kind==='streak')),false);}
   await page.locator('[data-next]').click();
  }
  let key=await correctKey(page,grade,'unit1');await page.locator(`.g6-choice:not([data-answer-key="${key}"])`).first().click();assert.equal((await last(page)).kind,'bad');assert.equal(await page.locator('.g6-choice.vg-shake').count(),1);assert.equal(await page.locator('#quiz-stage .vg-streak').getAttribute('data-streak'),'0');
  await page.locator(`[data-answer-key="${key}"]`).click();assert.equal((await last(page)).kind,'corrected');await page.locator('[data-next]').click();
  key=await correctKey(page,grade,'unit1');for(let j=0;j<2;j++)await page.locator(`.g6-choice:not([data-answer-key="${key}"]):not(:disabled)`).first().click();await page.getByRole('button',{name:'Xem đáp án',exact:true}).click();assert.equal((await last(page)).kind,'help');assert.equal(await page.locator('#quiz-stage .vg-streak').getAttribute('data-streak'),'0');await page.locator('[data-next]').click();
  key=await correctKey(page,grade,'unit1');await page.locator(`[data-answer-key="${key}"]`).click();await page.locator('[data-next]').click();assert.equal((await last(page)).kind,'complete');
  await page.locator('[data-tab=spelling]').click();const input=page.locator('#spelling-stage input');await input.fill('xyz');await input.press('Enter');assert.equal((await last(page)).kind,'bad');
  const term=await page.evaluate(grade=>{const meaning=document.querySelector('#spelling-stage h3').textContent.replace('Gõ tiếng Anh cho: ','');return window[`DanhGrade${grade}Units`][0].words.find(w=>w.meaning===meaning).term;},grade);await input.fill(term);await input.press('Enter');assert.equal((await last(page)).kind,'corrected');
  await page.locator('#vocab-sound').click();const starts=await page.evaluate(()=>testStarts);await page.locator('[data-tab=flashcards]').click();await card.click();assert.equal(await page.evaluate(()=>testStarts),starts);assert.equal(await card.getAttribute('aria-pressed'),'true');
  await page.locator('#vocab-motion').click();assert.equal(await card.locator('.vg-flip-inner').evaluate(node=>getComputedStyle(node).transitionDuration),'0s');await page.locator('#vocab-sound').click();await page.locator('#vocab-motion').click();
  for(const term of[1,2]){
   await page.goto(base+`/grade/lop${grade}/vocabulary-review.html?term=${term}`);await page.waitForFunction(()=>!!window.DanhVocabularyGame);assert.equal(await page.evaluate(()=>testStarts),0);
   await page.getByRole('button',{name:'Bắt đầu chơi',exact:true}).click();
   for(let index=0;index<10;index++){
    const key=await correctKey(page,grade,`term${term}`);await page.locator(`[data-answer-key="${key}"]`).click();
    assert.equal((await last(page)).kind,[2,4,9].includes(index)?'streak':'good');assert.equal(await page.locator('#quiz-stage .vg-streak').getAttribute('data-streak'),String(index+1));
    await page.locator('[data-next]').click();
   }
   assert.equal((await last(page)).kind,'complete');assert.match(await page.locator('#quiz-stage').innerText(),/100 sao/);
  }
 }
 assert.deepEqual(errors,[]);await context.close();
 const reduced=await browser.newContext({reducedMotion:'reduce'}),rp=await reduced.newPage();await rp.goto(base+'/grade/lop7/unit1.html');await profile(rp);await rp.locator('[data-tab=flashcards]').click();await rp.locator('#flashcard').click();assert.equal(await rp.locator('#flashcard').getAttribute('aria-pressed'),'true');assert.equal(await rp.locator('.vg-flip-inner').evaluate(n=>getComputedStyle(n).transitionDuration),'0s');assert.equal(await rp.locator('.vg-spark').count(),0);await reduced.close();
 console.log('PASS: two grades, two stable 3D faces, timed flip and paper cue, rapid click lock, keyboard, images and four widths, outcome sounds/animations, 3/5 streaks, reload without rewards, streak reset, spelling, mute and reduced motion.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
