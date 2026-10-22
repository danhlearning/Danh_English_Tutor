const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001',out=path.resolve(__dirname,'../../artifacts/primary-template');fs.mkdirSync(out,{recursive:true});
const create=async(p,name)=>{if(await p.getByRole('button',{name:'Đăng nhập',exact:true}).isVisible())await p.getByRole('button',{name:'Đăng nhập',exact:true}).click();await p.locator('#learner-name').fill(name);await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(n=>window.DanhLearners?.current?.name===n,name);};
const read=(p,key)=>p.evaluate(k=>JSON.parse(DanhLearners.storage.getItem(k)),key);
const width=async(p,label)=>assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),label);
const shot=async(p,name)=>{await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:path.join(out,name),fullPage:true});};
(async()=>{
 const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
 try{
  const ctx=await browser.newContext({viewport:{width:390,height:844}}),p=await ctx.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await ctx.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
  await ctx.addInitScript(()=>{window.speechCalls=[];if(window.speechSynthesis)speechSynthesis.speak=u=>{speechCalls.push(u.text);queueMicrotask(()=>u.onend?.());};});
  await p.goto(base+'/index.html');await create(p,'Mẫu lớp 4 A');
  for(const grade of [1,2,3,4,5]){await p.goto(base+`/grade/lop${grade}/lop${grade}.html`);assert.equal(await p.locator('primary-grade-nav a').count(),5);}
  for(const grade of [1,3,5]){
   await p.goto(base+`/grade/lop${grade}/lop${grade}.html`);
   const {units:bank}=await p.evaluate(()=>DanhPrimaryTemplateCourse);
   assert.equal(await p.locator('.g4-unit-card').count(),bank.length);assert.equal(await p.evaluate(()=>speechCalls.length),0);
   await shot(p,`grade${grade}-catalog-mobile.png`);
   for(const unit of bank){
    await p.goto(base+`/grade/lop${grade}/${unit.id}.html`);
    assert.equal(await p.locator('.g4-word-card').count(),unit.words.length);assert.equal(await p.locator('.g4-pattern').count(),unit.patterns.length);
    assert.equal(await p.locator('.g4-word-card svg image').count(),unit.words.length);
    if(process.env.CHECK_PRIMARY_IMAGES!=='0')await p.evaluate(async()=>{await Promise.all(DanhPrimaryTemplateCourse.units.find(u=>u.id===document.body.dataset.unit).words.map(w=>new Promise((resolve,reject)=>{const i=new Image();i.onload=resolve;i.onerror=()=>reject(Error(w.image));i.src=w.image;})));});
    for(const tab of ['vocab','sentences','game-flip','game-mcq','game-spelling','game-context']){await p.locator(`[data-tab=${tab}]`).click();assert.ok(await p.locator('#'+tab).isVisible());}
   }
   await p.goto(base+`/grade/lop${grade}/unit1.html`);
   for(const tab of ['vocab','sentences','game-flip','game-mcq','game-spelling','game-context']){
    await p.locator(`[data-tab=${tab}]`).click();await p.reload();
    assert.ok(await p.locator('#'+tab).isVisible(),`reload ${grade}/${tab}`);
    assert.equal(await p.evaluate(()=>speechCalls.length),0);
   }
   const lk=`danh.learning.g${grade}unit1.v1`,pk=`danh.grade${grade}.words.v1`,ck=`danh-g${grade}-unit1-template-context-v1`;
   await p.locator('[data-tab=game-flip]').click();await p.locator('.learning-card').click();assert.equal((await read(p,lk)).cards.seen.length,1);assert.equal(await read(p,pk),null);
   await p.locator('[data-tab=game-mcq]').click();let state=await read(p,lk),r=state.rounds.mcq,q=r.answers[0];
   await p.locator('.learning-options button').nth(q.options.indexOf(r.deck[0])).evaluate(b=>{b.click();b.click();});assert.equal((await read(p,pk)).words[`unit1:${r.deck[0]}`].attempts,1);
   await p.waitForFunction(k=>JSON.parse(DanhLearners.storage.getItem(k)).rounds.mcq.index===1,lk);
   r=(await read(p,lk)).rounds.mcq;q=r.answers[1];await p.locator('.learning-options button').nth(q.options.findIndex(id=>id!==r.deck[1])).click();
   await p.reload();assert.equal(await p.evaluate(()=>speechCalls.length),0);assert.ok(await p.locator('#game-mcq').isVisible());assert.deepEqual((await read(p,lk)).rounds.mcq.answers[1].options,q.options);assert.equal((await read(p,lk)).rounds.mcq.answers[1].mistakes,1);
   await p.locator('.learning-options button').nth(q.options.indexOf(r.deck[1])).click();assert.equal((await read(p,pk)).words[`unit1:${r.deck[1]}`].skills.listening,undefined);
   await p.locator('[data-tab=game-spelling]').click();await p.locator('.learning-spelling input').fill('saved draft');await p.reload();assert.equal(await p.locator('.learning-spelling input').inputValue(),'saved draft');assert.equal(await p.evaluate(()=>speechCalls.length),0);
   await p.locator('[data-tab=game-context]').click();await p.locator('#recall-answer').fill('wrong');await p.getByRole('button',{name:'Kiểm tra',exact:true}).click();await p.reload();assert.ok(await p.locator('#game-context').isVisible());assert.equal(await p.locator('#recall-answer').inputValue(),'wrong');
   state=await read(p,ck);q=state.tasks[0];assert.equal(q.errors,1);const word=bank[0].words.find(w=>w.id===q.id);
   await p.locator('#recall-answer').fill(word.name);await p.getByRole('button',{name:'Kiểm tra',exact:true}).evaluate(b=>{b.click();b.click();});assert.equal((await read(p,ck)).tasks[0].result,'corrected');
   await p.getByRole('button',{name:'Câu tiếp theo →',exact:true}).evaluate(b=>{b.click();b.click();});assert.equal((await read(p,ck)).index,1);assert.ok(await p.getByRole('button',{name:'Hiện đáp án',exact:true}).isHidden());
   await p.evaluate(k=>{const x=JSON.parse(DanhLearners.storage.getItem(k));x.tasks[x.index].elapsed=10001;DanhLearners.storage.setItem(k,JSON.stringify(x));},ck);await p.reload();await p.getByRole('button',{name:'Hiện đáp án',exact:true}).click();assert.equal((await read(p,ck)).tasks[1].result,'seen');await p.getByRole('button',{name:'Câu tiếp theo →',exact:true}).click();
   state=await read(p,ck);while(state.index<state.tasks.length){await p.getByRole('button',{name:'Bỏ qua',exact:true}).click();await p.getByRole('button',{name:/^(Câu tiếp theo →|Xem tổng kết)$/}).click();state=await read(p,ck);}
   assert.ok((await p.locator('#context-stage').textContent()).includes('Tự sửa đúng: 1'));await p.getByRole('button',{name:/^Ôn từ cần luyện$/}).click();await p.locator('#recall-answer').fill('context draft');await p.reload();assert.equal(await p.locator('#recall-answer').inputValue(),'context draft');await shot(p,`grade${grade}-context-mobile.png`);
   await p.locator('[data-tab=game-flip]').click();await p.locator('#game-flip .learning-pick').click();await p.locator('.learning-none').click();await p.locator('.learning-choice input').nth(0).check();await p.locator('.learning-choice input').nth(1).check();await p.locator('.learning-apply').click();assert.equal((await read(p,lk)).selected.length,2);await p.locator('[data-tab=game-context]').click();assert.equal((await read(p,ck)).tasks.length,2);
   await p.locator('#sound').click();const before=await p.evaluate(()=>speechCalls.length);await p.locator('[data-tab=vocab]').click();await p.locator('.g4-word-card button').first().click();assert.equal(await p.evaluate(()=>speechCalls.length),before);await p.locator('#motion').click();await p.reload();assert.equal(await p.locator('#sound').getAttribute('aria-pressed'),'false');assert.equal(await p.locator('#motion').getAttribute('aria-pressed'),'false');await shot(p,`grade${grade}-vocab-mobile.png`);await p.locator('#sound').click();await p.locator('#motion').click();
   for(const w of [320,390,760,1280]){await p.setViewportSize({width:w,height:844});for(const tab of ['vocab','sentences','game-flip','game-mcq','game-spelling','game-context']){await p.locator(`[data-tab=${tab}]`).click();await width(p,`${grade}/${tab}/${w}`);}await p.goto(base+`/grade/lop${grade}/lop${grade}.html`);await width(p,`${grade}/catalog/${w}`);await p.goto(base+`/grade/lop${grade}/unit1.html`);}
   await p.goto(base+`/grade/lop${grade}/lop${grade}.html`);await shot(p,`grade${grade}-catalog-desktop.png`);assert.ok(await p.locator('#review-start').isEnabled());await p.locator('#review-start').click();await p.locator('#recall-answer').fill('review draft');await p.reload();await p.locator('#review-start').click();assert.equal(await p.locator('#recall-answer').inputValue(),'review draft');
   await p.goto(base+`/grade/lop${grade}/unit1.html?mode=sentence`);await p.waitForURL(/legacy\.html/);assert.equal(new URL(p.url()).searchParams.get('unit'),'unit1');await p.locator('[data-action=start]').click();const oldKey=`danh-g${grade}-unit1-sentence-v1`,old=await read(p,oldKey);assert.equal(old.questions.length,grade===5?4:3);await p.reload();assert.deepEqual((await read(p,oldKey)).questions,old.questions);await p.goto(base+`/grade/lop${grade}/unit1.html`);assert.ok(await p.locator('#legacy-rounds').isVisible());await p.setViewportSize({width:390,height:844});
  }
  const a=await p.evaluate(()=>DanhLearners.current.id);await p.evaluate(()=>DanhLearners.open());await p.getByRole('button',{name:'+ Thêm người học',exact:true}).click();await create(p,'Mẫu lớp 4 B');assert.notEqual(await p.evaluate(()=>DanhLearners.current.id),a);for(const grade of [1,3,5])assert.equal(await read(p,`danh.grade${grade}.words.v1`),null);
  await p.evaluate(()=>DanhLearners.storage.setItem('danh-g5-unit1-template-context-v1','{"version":1,"tasks":[null]}'));await p.goto(base+'/grade/lop5/unit1.html');await p.locator('[data-tab=game-context]').click();assert.ok(await p.locator('#recall-answer').isVisible());assert.deepEqual(errors,[]);await ctx.close();
  const reduced=await browser.newContext({reducedMotion:'reduce'}),rp=await reduced.newPage();await rp.goto(base+'/grade/lop1/lop1.html');await create(rp,'Ít chuyển động');assert.equal(await rp.evaluate(()=>DanhLearningEffects.reduced()),true);await reduced.close();
  const blocked=await browser.newContext();await blocked.addInitScript(()=>{for(const key of ['localStorage','sessionStorage'])Object.defineProperty(window,key,{get(){throw Error('blocked');}});});const bp=await blocked.newPage();await bp.goto(base+'/grade/lop1/unit1.html');await create(bp,'Học trong phiên');await bp.locator('[data-tab=game-context]').click();await bp.locator('#recall-answer').fill('kept');await bp.reload();assert.equal(await bp.locator('#recall-answer').inputValue(),'kept');await blocked.close();
  console.log('PASS: 56 Units; six Grade 4 tabs; bitmap art; four games; selector; first/corrected/seen/skipped; review; reload/drafts/orders; no sound on reload; preferences; legacy access; grade/profile isolation; corrupt/blocked storage; reduced motion; four viewport widths. Speech mocked.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
