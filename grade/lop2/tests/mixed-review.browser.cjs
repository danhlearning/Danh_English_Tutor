const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base='http://127.0.0.1:8001',out=path.resolve(__dirname,'../../../artifacts/grade2-mixed-review');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});
 try{
  const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  await c.addInitScript(()=>{
   window.spoken=[];window.feedbackEvents=[];
   window.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};
   Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],cancel(){},speak(u){window.spoken.push(u.text);}}});
   document.addEventListener('danh-learning-feedback',e=>window.feedbackEvents.push(e.detail));
  });
  const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.goto(base+'/grade/lop2/review.html');if(await p.getByRole('button',{name:'Đăng nhập',exact:true}).isVisible())await p.getByRole('button',{name:'Đăng nhập',exact:true}).click();await p.locator('#learner-name').fill('Ôn tổng hợp');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(()=>window.DanhLearners?.current);
  const current=()=>p.evaluate(()=>{const r=JSON.parse(DanhLearners.storage.getItem('danh-g2-mixed-review-v1')).active;const t=r.tasks[r.index];const [unit,id]=t.key.split(':');return {round:r,task:t,answer:r.answers[r.index],word:grade2Units[unit].words.find(w=>w.id===id),question:grade2Units[unit].questions.find(q=>q.imageWordId===id)};});
  const fit=async()=>assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.match(await p.locator('#selection-summary').innerText(),/16 Unit.*48 từ.*16 câu/);assert.equal(await p.evaluate(()=>spoken.length),0);
  await p.locator('#pick-units').click();assert.equal(await p.evaluate(()=>document.activeElement.id),'unit-search');
  await p.locator('#pick-none').click();assert(await p.locator('#apply-units').isDisabled());
  await p.locator('#unit-search').fill('birthday');assert.equal(await p.locator('.unit-choice').count(),1);
  for(let i=0;i<20;i++){await p.keyboard.press(i<10?'Tab':'Shift+Tab');assert(await p.evaluate(()=>!!document.activeElement.closest('#unit-picker')));}
  await p.keyboard.press('Escape');assert(!await p.locator('#unit-picker').isVisible());assert(await p.locator('#pick-units').evaluate(n=>n===document.activeElement));
  await p.locator('#pick-units').click();await p.locator('#pick-none').click();
  for(const n of [1,2,3,4])await p.locator(`.unit-choice input[value=gsunit${n}]`).check();
  await p.locator('#apply-units').click();assert.match(await p.locator('#selection-summary').innerText(),/4 Unit.*12 từ.*10 câu/);
  await p.screenshot({path:out+'/setup-mobile.png',fullPage:true});await p.locator('#start').click();
  let s=await current();assert.equal(s.task.mode,'meaning');
  assert.equal(new Set(s.round.tasks.map(t=>t.key.split(':')[0])).size,4);
  await p.locator(`[data-choice="${s.task.options.find(k=>k!==s.task.key)}"]`).click();
  assert.match(await p.locator('#feedback').innerText(),/Chưa đúng/);assert(!await p.locator('#next').isVisible());
  await p.locator(`[data-choice="${s.task.key}"]`).dblclick();assert.equal((await current()).answer.outcome,'retry');
  await p.locator('#next').click();s=await current();assert.equal(s.task.mode,'listening');assert.equal(await p.evaluate(()=>spoken.length),0);
  await p.locator('#listen').click();assert.equal(await p.evaluate(()=>spoken.at(-1)),s.word.name);
  await p.locator('#hint').click();await p.locator(`[data-choice="${s.task.key}"]`).click();assert.equal((await current()).answer.outcome,'hinted');
  await p.locator('#next').click();s=await current();assert.equal(s.task.mode,'spelling');
  await p.locator('#check').click();assert.equal((await current()).answer.mistakes,0);
  await p.locator('#answer').fill('nhap');await p.reload();assert(await p.locator('#continue-panel').isVisible());assert.equal(await p.evaluate(()=>spoken.length),0);await p.locator('#resume').click();assert.equal(await p.locator('#answer').inputValue(),'nhap');
  await p.locator('#answer').fill(s.word.name.toUpperCase());await p.locator('#check').click();assert.equal((await current()).answer.outcome,'first');await p.locator('#next').click();
  s=await current();assert.equal(s.task.mode,'sentence');
  await p.locator('#tokens button').first().click();const parts=(await current()).answer.parts;await p.reload();await p.locator('#resume').click();assert.deepEqual((await current()).answer.parts,parts);
  await p.locator('#undo').click();
  for(let n=0;n<s.question.answer.replace(/[.?!]+$/,'').split(/\s+/).length;n++)await p.locator(`#tokens button[data-token="${n}"]`).click();
  await p.locator('#sentence-check').click();assert.equal((await current()).answer.outcome,'first');await p.locator('#next').click();
  await p.locator('#reveal').click();assert.equal((await current()).answer.outcome,'revealed');await p.locator('#next').click();
  await p.locator('#skip').click();assert.equal((await current()).answer.outcome,'skipped');await p.locator('#next').click();
  while(await p.locator('#play').isVisible()){await p.locator('#skip').click();await p.locator('#next').click();}
  assert(await p.locator('#result').isVisible());assert.match(await p.locator('#result-score').innerText(),/^28 sao/);
  assert.equal(await p.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-g2-mixed-review-v1')).history.length),1);
  await p.screenshot({path:out+'/result-mobile.png',fullPage:true});await p.locator('#retry').click();assert.equal((await current()).round.tasks.length,8);
  await p.locator('#leave').click();const before=await current();await p.locator('#pick-units').click();await p.locator('#pick-term2').click();await p.locator('#apply-units').click();assert.deepEqual((await current()).round,before.round);
  p.once('dialog',d=>d.dismiss());await p.locator('#start').click();assert.deepEqual((await current()).round,before.round);
  await p.locator('#resume').click();await p.screenshot({path:out+'/play-mobile.png',fullPage:true});
  const sizes=[];
  for(const width of [320,390,760,1280]){
   await p.setViewportSize({width,height:844});await fit();
   await p.locator('#leave').click();await fit();await p.locator('#pick-units').click();await fit();
   assert(await p.locator('#unit-picker').evaluate(n=>n.scrollWidth<=n.clientWidth+1));
   if(width===390)await p.screenshot({path:out+'/picker-mobile.png',fullPage:true});
   await p.locator('#cancel-units').click();await p.locator('#resume').click();sizes.push(width);
  }
  await p.setViewportSize({width:390,height:844});await p.evaluate(()=>document.documentElement.style.fontSize='200%');await fit();await p.screenshot({path:out+'/large-text.png',fullPage:true});
  assert((await p.evaluate(()=>feedbackEvents)).every(e=>!e.motion));
  assert.equal(await p.locator('.vg-spark').count(),0);
  // Preference and learner isolation; switching profiles reloads this document.
  await p.evaluate(()=>document.documentElement.style.fontSize='');await p.locator('.settings summary').click();await p.locator('#sound-toggle').click();await p.reload();assert.equal(await p.locator('#sound-toggle').getAttribute('aria-pressed'),'false');
  await p.evaluate(()=>DanhLearners.open());await p.getByRole('button',{name:'+ Thêm người học',exact:true}).click();if(await p.getByRole('button',{name:'Đăng nhập',exact:true}).isVisible())await p.getByRole('button',{name:'Đăng nhập',exact:true}).click();await p.locator('#learner-name').fill('Bạn ôn khác');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(()=>window.DanhLearners?.current?.name==='Bạn ôn khác');
  assert.equal(await p.evaluate(()=>DanhLearners.storage.getItem('danh-g2-mixed-review-v1')&&JSON.parse(DanhLearners.storage.getItem('danh-g2-mixed-review-v1')).active),null);
  assert(!await p.locator('#continue-panel').isVisible());
  // A second tab modifying the same learner gets the existing reload gate.
  const second=await c.newPage();await second.goto(base+'/grade/lop2/review.html');
  await second.getByRole('button',{name:'Đăng nhập',exact:true}).click();await second.getByRole('button',{name:/Bạn ôn khác/}).click();
  await second.waitForFunction(()=>window.DanhLearners?.current?.name==='Bạn ôn khác');
  await second.evaluate(()=>DanhLearners.storage.getItem('danh-g2-mixed-review-v1'));
  await p.locator('#start').click();await second.getByRole('button',{name:'Tải lại để tiếp tục'}).waitFor();await second.close();
  assert.deepEqual(errors,[]);await c.close();
  const blocked=await b.newContext();await blocked.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  await blocked.addInitScript(()=>{for(const k of ['localStorage','sessionStorage'])Object.defineProperty(window,k,{get(){throw Error('blocked');}});});
  const bp=await blocked.newPage();await bp.goto(base+'/grade/lop2/review.html');if(await bp.getByRole('button',{name:'Đăng nhập',exact:true}).isVisible())await bp.getByRole('button',{name:'Đăng nhập',exact:true}).click();await bp.locator('#learner-name').fill('Phiên tạm');await bp.getByRole('button',{name:'Vào học ngay',exact:true}).click();await bp.waitForFunction(()=>window.DanhLearners?.current);await bp.locator('#start').click();assert(await bp.locator('#play').isVisible());await bp.reload();assert(await bp.locator('#continue-panel').isVisible());await blocked.close();
  fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,sizes,checks:'unit selection/search/cancel/empty, 4 task types, wrong/retry/hint/reveal/skip/score, drafts and tokens after reload, review, picker preserves round, 200% text, reduced motion, manual speech, preference, profile isolation, multiple tabs, blocked storage',errors},null,2));
  console.log('PASS mixed review: four sizes, selection, four modes, scoring, resume, profiles, tabs and blocked storage');
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
