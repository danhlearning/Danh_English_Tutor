const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const root='http://127.0.0.1:8001/';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const results=[];
 try {
  const c=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await c.route('**/*',r=>r.request().url().startsWith(root)?r.continue():r.abort());
  const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(root);await p.locator('#learner-name').fill('UI kiểm thử');
  await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();
  await p.waitForFunction(()=>DanhLearners.current);
  const goto=async path=>{await p.goto(root+path);await p.evaluate(()=>document.fonts.ready);};
  const fit=async label=>assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),label);
  const targets=async selector=>{
   const small=await p.locator(selector).evaluateAll(nodes=>nodes.filter(n=>n.getClientRects().length&&!n.disabled).map(n=>({text:n.textContent.trim(),w:n.getBoundingClientRect().width,h:n.getBoundingClientRect().height})).filter(r=>r.w<43.9||r.h<43.9));
   assert.deepEqual(small,[],'Small controls '+selector);
  };
  for(const width of [320,390,760,1280]) {
   await p.setViewportSize({width,height:844});
   for(const file of ['flashcard.html','ipa-practice.html','ipa-theory.html','grammar-index.html','grade/lop6/unit4.html','grade/lop7/unit1.html','grade/lop8/unit10.html','grade/lop9/unit1.html']) {
    await goto(file);await fit(file+' '+width);
    if(file==='flashcard.html'){
     await targets('.game-container button');
     assert(await p.locator('body').evaluate(n=>getComputedStyle(n).fontFamily.includes('Danh Nunito')));
     await p.locator('#btn-flip').focus();await p.keyboard.press('Enter');
     assert.equal(await p.locator('#btn-flip').getAttribute('aria-pressed'),'true');
     assert.equal(await p.locator('#card-front-view').evaluate(n=>n.inert),true);
     await p.keyboard.press('Space');assert.equal(await p.locator('#btn-flip').getAttribute('aria-pressed'),'false');
     await p.getByRole('button',{name:'Sổ tay riêng',exact:true}).click();
     assert(await p.getByRole('button',{name:'Thêm từ đầu tiên',exact:true}).isVisible());
     assert(await p.locator('#btn-next').isDisabled());assert(await p.locator('#btn-prev').isDisabled());
     await p.getByRole('button',{name:'Thêm từ đầu tiên',exact:true}).click();
     assert.equal(await p.evaluate(()=>document.activeElement.id),'txt-word');await p.keyboard.press('Escape');
     await p.getByRole('button',{name:'Ôn tập (0)',exact:true}).click();
     assert(await p.getByText('Chưa có từ cần ôn',{exact:false}).isVisible());
     assert(!await p.locator('#flashcard').evaluate(n=>n.classList.contains('is-flipped')));
     await p.getByRole('button',{name:'Chọn bộ từ sơ cấp',exact:true}).click();
     if(width===390)await p.screenshot({path:__dirname+'/flashcard-mobile.png',fullPage:true});
    }
    if(file==='ipa-practice.html') {
     await targets('.tab-btn,.btn-nav');
     for(const [seconds,expected] of [[600,'10:00'],[599,'09:59'],[0,'00:00']]){
      await p.evaluate(n=>{clearInterval(timerInterval);timeLeft=n;updateTimerDisplay();},seconds);
      assert.equal(await p.locator('#timer-display').innerText(),'⏱️ '+expected);
     }
    }
    if(file==='ipa-theory.html')await targets('.speak-btn');
    if(file.startsWith('grade/'))await targets('.g6-unit-footer a');
    if(file==='grammar-index.html')for(const grade of [8,9])assert.equal(await p.getByRole('link',{name:'Ngữ pháp lớp '+grade,exact:true}).getAttribute('href'),`grade/lop${grade}/grammar.html`);
    results.push({file,width,passed:true});
   }
  }
  await p.setViewportSize({width:390,height:844});await goto('flashcard.html');
  // A held/double press records once, revisiting updates rather than inflates counts.
  await p.evaluate(()=>{markCard(false);markCard(false);markCard(true);});
  await p.waitForTimeout(300);assert.equal(await p.locator('#wrong-count').innerText(),'1');
  assert.equal(await p.locator('#card-index').innerText(),'2/100');
  await p.evaluate(()=>{prevCard();markCard(true);});await p.waitForTimeout(300);
  assert.equal(await p.locator('#correct-count').innerText(),'1');assert.equal(await p.locator('#wrong-count').innerText(),'0');
  await p.evaluate(()=>{markCard(false);switchCategory('custom');});await p.waitForTimeout(300);
  assert.equal(await p.locator('#card-index').innerText(),'0/0');
  // Two review cards: removing the first must still present the second.
  await p.evaluate(()=>{reviewList=['el_1','el_2'];saveDataSync();switchCategory('review');markCard(true);});
  await p.waitForTimeout(300);assert.equal(await p.evaluate(()=>flashcards[currentIndex].id),'el_2');
  await p.locator('#btn-mark-correct').click();
  p.once('dialog',d=>d.accept());await p.waitForTimeout(450);
  assert.equal(await p.locator('#card-index').innerText(),'0/0');
  // Empty -> add -> reload keeps the existing profile-scoped notebook.
  await p.evaluate(()=>switchCategory('custom'));await p.getByRole('button',{name:'Thêm từ đầu tiên',exact:true}).click();
  await p.getByLabel('Từ mới',{exact:true}).fill('practice');await p.getByLabel('Nghĩa Việt',{exact:true}).fill('luyện tập');
  await p.getByRole('button',{name:'Lưu',exact:true}).click();assert.equal(await p.locator('#lbl-word').innerText(),'practice');
  await p.reload();await p.evaluate(()=>switchCategory('custom'));assert.equal(await p.locator('#lbl-word').innerText(),'practice');
  await p.evaluate(()=>document.documentElement.style.fontSize='200%');await fit('flashcard 200%');
  await p.locator('#btn-flip').click();await p.screenshot({path:__dirname+'/flashcard-large-text.png',fullPage:true});
  await p.getByRole('button',{name:'Xem tiến trình từ vựng',exact:true}).click();await fit('stats 200%');
  await targets('#modal-stats button');await p.screenshot({path:__dirname+'/stats-large-text.png',fullPage:true});await p.keyboard.press('Escape');
  for(const file of ['404.html','food.html','ipa-practice.html']){
   await goto(file);assert.equal(await p.locator('contact-danh').count(),1);
   assert.equal(await p.locator('img[src*="wikimedia"]').count(),0);
   assert(await p.locator('contact-danh a.btn-zalo').isVisible());
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(__dirname+'/results.json',JSON.stringify({passed:true,views:results,flows:'keyboard flip, empty states, repeated rating, category transition cancellation, review removal, end, add/reload, 200% text, timer, footer',errors},null,2));
  console.log('PASS: '+results.length+' responsive views, flashcard flows, timer boundaries and footers');
  await c.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
