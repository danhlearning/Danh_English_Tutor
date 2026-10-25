const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
const out=path.join(root,'artifacts/upper-secondary');fs.mkdirSync(out,{recursive:true});
const banks={};for(const g of [10,11,12]){const c={window:{}};vm.createContext(c);for(const f of ['units-data','grammar-data'])vm.runInContext(fs.readFileSync(path.join(root,`grade/lop${g}/assets/js/${f}.js`),'utf8'),c);banks[g]={units:c.window[`DanhGrade${g}Units`],grammar:c.window[`DanhGrade${g}Grammar`]};}
async function profile(p,name){if(await p.getByRole('button',{name:'Lưu dữ liệu học',exact:true}).isVisible())await p.getByRole('button',{name:'Lưu dữ liệu học',exact:true}).evaluate(el=>el.click());await p.locator('#learner-name').fill(name);await p.getByRole('button',{name:'Vào học ngay',exact:true}).evaluate(el=>el.click());await p.waitForFunction(n=>window.DanhLearners?.current?.name===n,name);}
async function round(p,g,scope){return p.evaluate(({g,scope})=>JSON.parse(DanhLearners.storage.getItem(`danh-g${g}-vocabulary-game-${scope}-v1`)).active,{g,scope});}
async function key(p){return p.locator('#quiz-stage h3[data-word-key]').getAttribute('data-word-key');}
async function grammarActive(p,g){return p.evaluate(g=>JSON.parse(DanhLearners.storage.getItem(`danh-g${g}-grammar-v1`)).active,g);}
async function grammarAnswer(p,q,answer=q.answer.split('|')[0]){
  if(q.type==='choice')await p.locator('#answer-area button').filter({hasText:new RegExp('^[ABCD]\\. '+answer.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}).evaluate(el=>el.click());
  else if(q.type==='order'){for(const token of q.parts)await p.locator('.gg-tokens button:not(:disabled)').filter({hasText:new RegExp('^'+token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}).first().evaluate(el=>el.click());await p.getByRole('button',{name:'Kiểm tra câu',exact:true}).evaluate(el=>el.click());}
  else {await p.locator(q.type==='fill'?'#answer-area input':'#sentence-answer').fill(answer);await p.locator('#answer-area button[type=submit]').evaluate(el=>el.click());}
}
(async()=>{const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});try{
 const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[],failed=[];
 p.setDefaultTimeout(10000);p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failed.push(r.url());});
 await ctx.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
 await p.goto(base+'/index.html');await profile(p,'Kiểm tra THPT');
 for(const g of [10,11,12]){
  await p.goto(base+`/grade/lop${g}/lop${g}.html`);assert.equal(await p.locator('.g6-unit-card').count(),10);
  for(const width of [320,390,834,1280]){await p.setViewportSize({width,height:900});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await p.screenshot({path:path.join(out,`grade${g}-catalog-${width}.png`),fullPage:true});}
  await p.setViewportSize({width:390,height:844});await p.evaluate(()=>document.fonts.ready);
  const cdp=await ctx.newCDPSession(p);await cdp.send('DOM.enable');await cdp.send('CSS.enable');await cdp.send('DOM.getDocument',{depth:-1,pierce:true});const {result}=await cdp.send('Runtime.evaluate',{expression:"document.querySelector('#grade-title')"});const {nodeId}=await cdp.send('DOM.requestNode',{objectId:result.objectId});const {fonts}=await cdp.send('CSS.getPlatformFontsForNode',{nodeId});assert(fonts.length&&fonts.every(f=>f.isCustomFont&&/Nunito/i.test(f.familyName)));await cdp.detach();
  await p.screenshot({path:path.join(out,`grade${g}-catalog-mobile.png`),fullPage:true});
  await p.setViewportSize({width:1280,height:900});await p.screenshot({path:path.join(out,`grade${g}-catalog-desktop.png`),fullPage:true});await p.setViewportSize({width:390,height:844});
  for(let u=1;u<=10;u++){
   await p.goto(base+`/grade/lop${g}/unit${u}.html`);assert.equal(await p.locator('.g6-word-card').count(),6);
   await p.locator('#vocab-grid').evaluate(async grid=>{for(const img of grid.querySelectorAll('img')){img.loading='eager';await img.decode();}});
   assert.ok(await p.locator('#vocab-grid img').evaluateAll(imgs=>imgs.every(img=>img.complete&&img.naturalWidth>0)));
   await p.screenshot({path:path.join(out,`grade${g}-unit${u}-mobile.png`),fullPage:true});
   assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`g${g} u${u} overflow`);
  }
  await p.goto(base+`/grade/lop${g}/unit1.html`);await p.locator('[data-tab=flashcards]').evaluate(el=>el.click());assert.equal(await p.locator('#flashcard img').count(),0);await p.locator('#flashcard').evaluate(el=>el.click());assert.ok((await p.locator('#flashcard').textContent()).includes(banks[g].units[0].words[0].meaning));
  await p.locator('[data-tab=quiz]').evaluate(el=>el.click());await p.getByRole('button',{name:'Bắt đầu chơi',exact:true}).evaluate(el=>el.click());
  let k=await key(p);await p.locator(`[data-answer-key="${k}"]`).evaluate(b=>{b.click();b.click();});assert.equal((await round(p,g,'unit1')).outcome,'first');
  await p.reload();await p.locator('[data-tab=quiz]').evaluate(el=>el.click());await p.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}).evaluate(el=>el.click());assert.equal((await round(p,g,'unit1')).outcome,'first');await p.locator('[data-next]').evaluate(el=>el.click());
  k=await key(p);await p.locator(`.g6-choice:not([data-answer-key="${k}"])`).first().evaluate(el=>el.click());await p.locator(`[data-answer-key="${k}"]`).evaluate(el=>el.click());assert.equal((await round(p,g,'unit1')).outcome,'corrected');await p.locator('[data-next]').evaluate(el=>el.click());
  k=await key(p);for(let n=0;n<2;n++)await p.locator(`.g6-choice:not([data-answer-key="${k}"]):not(:disabled)`).first().evaluate(el=>el.click());await p.getByRole('button',{name:'Xem đáp án',exact:true}).evaluate(el=>el.click());assert.equal((await round(p,g,'unit1')).outcome,'seen');await p.locator('[data-next]').evaluate(el=>el.click());
  for(let n=3;n<6;n++){k=await key(p);assert.equal(await p.locator('.g6-choice').count(),4);await p.locator(`[data-answer-key="${k}"]`).evaluate(el=>el.click());await p.locator('[data-next]').evaluate(el=>el.click());}
  assert.match(await p.locator('#quiz-stage').textContent(),/45 sao/);await p.getByRole('button',{name:'Ôn lại từ cần luyện'}).evaluate(el=>el.click());assert.equal((await round(p,g,'unit1')).items.length,2);
  for(const term of [1,2]){
   await p.goto(base+`/grade/lop${g}/vocabulary-review.html?term=${term}`);await p.getByRole('button',{name:'Bắt đầu chơi',exact:true}).evaluate(el=>el.click());const a=await round(p,g,`term${term}`);assert.equal(a.items.length,10);assert.equal(new Set(a.items.map(k=>/u(\d+)/.exec(k)[1])).size,5);
   for(const k of a.items){const u=Number(/u(\d+)/.exec(k)[1]);assert.ok(term===1?u<=5:u>=6);}
   await p.screenshot({path:path.join(out,`grade${g}-term${term}-mobile.png`),fullPage:true});
  }
  await p.goto(base+`/grade/lop${g}/grammar.html`);await p.waitForFunction(()=>document.body.dataset.grammarReady==='true');
  await p.screenshot({path:path.join(out,`grade${g}-grammar-mobile.png`),fullPage:true});
  for(let u=1;u<=10;u++)for(const level of ['easy','medium','hard']){
   await p.locator('#unit-select').selectOption(String(u));await p.locator(`input[name=level][value=${level}]`).check();assert.match(await p.locator('#selection-summary').textContent(),/4 câu/);await p.locator('#start').evaluate(el=>el.click());
   const a=await grammarActive(p,g);assert.equal(a.items.length,4);assert.equal(new Set(a.items).size,4);
   for(let n=0;n<a.items.length;n++){
    const q=banks[g].grammar.find(q=>q.id===a.items[n]);assert.equal(q.unit,u);assert.equal(q.level,level);
    if(u===1&&level==='easy'&&q.type==='choice'){
     const wrong=q.options.find(o=>o!==q.answer);await grammarAnswer(p,q,wrong);assert.match(await p.locator('#feedback').textContent(),/Chưa đúng/);
     await p.reload();await p.locator('#resume').evaluate(el=>el.click());assert.equal((await grammarActive(p,g)).position,n);
    }

    await grammarAnswer(p,q);assert.equal(await p.locator('#next').isVisible(),true,q.id);
    if(u===10&&level==='hard'&&n===0)await p.screenshot({path:path.join(out,`grade${g}-grammar-play-mobile.png`),fullPage:true});
    await p.locator('#next').evaluate(el=>el.click());
   }
   assert.equal(await p.locator('#result').isVisible(),true);await p.locator('#change').evaluate(el=>el.click());
  }
  for(const term of ['term1','term2']){await p.locator(`input[name=scope][value=${term}]`).check();await p.locator('#start').evaluate(el=>el.click());const a=await grammarActive(p,g);assert.equal(a.items.length,10);for(const id of a.items){const q=banks[g].grammar.find(q=>q.id===id);assert.ok(term==='term1'?q.unit<=5:q.unit>=6);}await p.locator('#exit-play').evaluate(el=>el.click());}
  await p.goto(base+`/grade/lop${g}/unit1.html`);await p.locator('[data-tab=spelling]').evaluate(el=>el.click());const meaning=await p.locator('#spelling-stage h3').textContent(),w=banks[g].units[0].words.find(w=>meaning.includes(w.meaning));assert.ok(w);await p.locator('#spelling-stage input').fill(w.term);await p.locator('#spelling-stage button[type=submit]').evaluate(el=>el.click());assert.match(await p.locator('#spelling-stage').textContent(),/Đúng rồi/);
  for(const width of [320,390,834,1280]){await p.setViewportSize({width,height:844});assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
  console.log(`PASS lớp ${g}: 10 Unit, 120 grammar answers, vocabulary round, resume, semester pools, spelling, four widths.`);
 }
 const before=await p.evaluate(()=>DanhLearners.storage.getItem('danh-g10-grammar-v1'));assert.ok(before);assert.ok(await p.evaluate(()=>DanhLearners.storage.getItem('danh-g11-grammar-v1')));
 await p.locator('#vocab-sound').evaluate(el=>el.click());await p.locator('#vocab-motion').evaluate(el=>el.click());await p.reload();assert.equal(await p.locator('#vocab-sound').getAttribute('aria-pressed'),'false');assert.equal(await p.locator('#vocab-motion').getAttribute('aria-pressed'),'false');
 await p.evaluate(()=>DanhLearners.open());await p.getByRole('button',{name:'+ Thêm người học',exact:true}).evaluate(el=>el.click());await profile(p,'Hồ sơ khác');assert.equal(await p.evaluate(()=>DanhLearners.storage.getItem('danh-g10-grammar-v1')),null);assert.equal(await p.evaluate(()=>DanhLearners.storage.getItem('danh-g11-grammar-v1')),null);
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);await ctx.close();
 const blocked=await browser.newContext({reducedMotion:'reduce',viewport:{width:320,height:740}});await blocked.addInitScript(()=>{for(const k of ['localStorage','sessionStorage'])Object.defineProperty(window,k,{get(){throw Error('blocked');}});});const bp=await blocked.newPage();await bp.goto(base+'/grade/lop10/unit1.html');await profile(bp,'Học trong phiên');await bp.locator('[data-tab=quiz]').evaluate(el=>el.click());await bp.getByRole('button',{name:'Bắt đầu chơi',exact:true}).evaluate(el=>el.click());const bk=await key(bp);await bp.locator(`[data-answer-key="${bk}"]`).evaluate(el=>el.click());await bp.reload();await bp.locator('[data-tab=quiz]').evaluate(el=>el.click());await bp.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}).evaluate(el=>el.click());assert.equal((await round(bp,10,'unit1')).outcome,'first');assert.equal(await bp.locator('.vg-spark').count(),0);await blocked.close();
 console.log('PASS: profile/class isolation, preferences, blocked storage, reduced motion; no page errors or missing resources.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
