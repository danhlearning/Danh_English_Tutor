const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const grade=Number(process.env.GRAMMAR_GRADE || 6);
const c = {window:{}}; vm.createContext(c);
for (const name of grade===6?['grammar-data','grammar-extra-data','grammar-expanded-data','grammar-rewrite-data','grammar-exam-data']:['units-data','grammar-data','grammar-exam-data']) vm.runInContext(fs.readFileSync(path.join(root,`grade/lop${grade}/assets/js`,name+'.js'),'utf8'),c);
const bank = c.window[`DanhGrade${grade}Grammar`];
assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
for (const q of bank) if (q.options) {
  assert.equal(q.options.length,4,q.id); assert.equal(new Set(q.options).size,4,q.id);
  assert.equal(q.options.filter(x=>x===q.answer).length,1,q.id);
}
for (let unit=1;unit<=12;unit++) for (const level of ['easy']) {
  assert.ok(bank.some(q=>q.unit===unit&&q.level===level&&q.type==='pronunciation'));
  const passage=bank.filter(q=>q.unit===unit&&q.level===level&&q.type==='preposition');
  assert.equal(passage.length,10);
  assert.equal(new Set(passage.map(q=>q.passageId)).size,1);
  assert.deepEqual(Array.from(passage,q=>q.blank),Array.from({length:10},(_,i)=>i+1));
}
const base=process.env.LESSON_BASE_URL || 'http://127.0.0.1:8001';
const out=path.join(root,`artifacts/grade${grade}-exam`); fs.mkdirSync(out,{recursive:true});
async function choose(page,name,value){await page.evaluate(({name,value})=>{const input=document.querySelector(`input[name="${name}"][value="${value}"]`);input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));},{name,value});}
async function active(page){return page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem(`danh-g${document.body.dataset.grade}-grammar-v1`)).active);}
async function answer(page){const a=await active(page);const q=bank.find(q=>q.id===a.items[a.position]);await page.getByRole('button',{name:new RegExp('^[ABCD]\\. '+q.answer.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}).click();return q;}
(async()=>{
  const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});
  try {
    const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
    await context.addInitScript(()=>{window.grammarCues=[];document.addEventListener('danh-learning-feedback',event=>grammarCues.push(event.detail.kind));});
    const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await context.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
    await page.goto(base+`/grade/lop${grade}/grammar.html`);
    await page.locator('#learner-name').fill(`Kiểm tra lớp ${grade}`);await page.getByRole('button',{name:'Vào học ngay',exact:true}).click();
    await page.waitForFunction(()=>window.DanhLearners?.current && document.body.dataset.grammarReady==='true');
    await page.clock.install();
    await choose(page,'activity','rewrite');await page.locator('#start').click();
    let a=await active(page),q=bank.find(q=>q.id===a.items[0]);
    assert.equal(await page.locator('#question-prompt').textContent(),q.source);
    assert.equal(await page.locator('.gg-rewrite-cue').count(),0);
    assert.equal(await page.locator('#question-hint').isVisible(),false);
    await page.screenshot({path:path.join(out,'rewrite-exam-mobile.png'),fullPage:true});
    await page.locator('#sentence-answer').fill('wrong');await page.getByRole('button',{name:'Kiểm tra câu',exact:true}).click();await page.getByRole('button',{name:'Kiểm tra câu',exact:true}).click();
    assert.equal(await page.locator('#reveal').isVisible(),false);
    await page.clock.runFor(119000);assert.equal(await page.locator('#question-hint').isVisible(),false);
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
    await page.clock.runFor(180000);assert.equal(await page.locator('#question-hint').isVisible(),false);
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
    await page.clock.runFor(1100);assert.equal(await page.locator('#question-hint').isVisible(),true);
    await page.locator('#sentence-answer').fill('draft to keep');await page.reload();await page.waitForFunction(()=>document.body.dataset.grammarReady==='true');await page.locator('#resume').click();
    assert.equal(await page.locator('#sentence-answer').inputValue(),'draft to keep');assert.equal(await page.locator('#question-hint').isVisible(),true);
    await page.screenshot({path:path.join(out,'rewrite-mobile.png'),fullPage:true});
    const prefix=q.cue.split('...')[0].trim().replace(/\?$/,'');
    await page.locator('#sentence-answer').fill(q.answer.split('|')[0].slice(prefix.length).trim());await page.getByRole('button',{name:'Kiểm tra câu',exact:true}).click();
    assert.equal((await active(page)).outcome,'corrected');
    const points=await page.locator('#total-points').textContent();await page.reload();await page.waitForFunction(()=>document.body.dataset.grammarReady==='true');await page.locator('#resume').click();assert.equal(await page.locator('#total-points').textContent(),points);assert.ok(await page.locator('#next').isVisible());
    await page.locator('#next').click();await page.clock.runFor(120100);await page.locator('#reveal').click();assert.equal(await page.locator('#total-points').textContent(),points);assert.equal((await active(page)).revealed,1);
    await page.locator('#exit-play').click();await choose(page,'activity','preposition');await choose(page,'scope','term1');await page.locator('#start').click();
    a=await active(page);const items=a.items.map(id=>bank.find(q=>q.id===id));
    assert.equal(items.length,10);assert.equal(new Set(items.map(q=>q.passageId)).size,1);assert.deepEqual(items.map(q=>q.blank),[1,2,3,4,5,6,7,8,9,10]);
    for(let i=0;i<10;i++){
      assert.equal(await page.locator('.gg-option').count(),4);
      assert.equal(await page.locator('.gg-passage p').textContent(),items[i].passage);
      if(i===0)await page.screenshot({path:path.join(out,'passage-mobile.png'),fullPage:true});
      await answer(page);assert.equal(await page.evaluate(()=>grammarCues.at(-1)),[2,4,9].includes(i)?'streak':'good');await page.locator('#next').click();
    }
    assert.equal(await page.locator('#result-correct').textContent(),'10/10');assert.match(await page.locator('#result-message').textContent(),/Đúng ngay: 10/);
    assert.equal(await page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem(`danh-g${document.body.dataset.grade}-grammar-v1`)).active),undefined);
    await page.locator('#change').click();await choose(page,'activity','pronunciation');await choose(page,'scope','unit');await page.locator('#unit-select').selectOption('1');await page.locator('#start').click();
    assert.equal(await page.locator('.gg-option u').count(),4);assert.equal((await active(page)).items.length,2);
    await page.screenshot({path:path.join(out,'sounds-mobile.png'),fullPage:true});
    const first=await active(page);const sq=bank.find(q=>q.id===first.items[0]);await page.locator('.gg-option').filter({hasText:sq.answer}).click();assert.equal((await active(page)).outcome,'first');
    await page.locator('#sound-toggle').click();await page.locator('#motion-toggle').click();await page.reload();await page.waitForFunction(()=>document.body.dataset.grammarReady==='true');assert.equal(await page.locator('#sound-toggle').getAttribute('aria-pressed'),'false');assert.equal(await page.locator('#motion-toggle').getAttribute('aria-pressed'),'false');
    await page.locator('#resume').click();
    for(const width of [320,390,760,1280]){await page.setViewportSize({width,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'width '+width);}
    const ordered=bank.find(q=>q.type==='order');
    await page.locator('#exit-play').click();
    await page.evaluate(id=>{const state=JSON.parse(DanhLearners.storage.getItem(`danh-g${document.body.dataset.grade}-grammar-v1`));state.active={items:[id],position:0,correct:0,firstTryCorrect:0,earned:0,elapsed:0,attempts:0,wrongAttempts:0,order:[],wrongOptions:[],level:'easy',scope:'unit',activity:'grammar',unit:'1',finished:false};DanhLearners.storage.setItem(`danh-g${document.body.dataset.grade}-grammar-v1`,JSON.stringify(state));},ordered.id);
    await page.reload();await page.waitForFunction(()=>document.body.dataset.grammarReady==='true');await page.locator('#resume').click();await page.locator('.gg-token').first().click();await page.locator('.gg-token:not(:disabled)').first().click();
    const built=await page.locator('.gg-built').textContent();await page.reload();await page.waitForFunction(()=>document.body.dataset.grammarReady==='true');await page.locator('#resume').click();assert.equal(await page.locator('.gg-built').textContent(),built);assert.equal(await page.locator('.gg-token:disabled').count(),2);
    assert.deepEqual(errors,[]);
    await context.close();
    const blocked=await browser.newContext();await blocked.addInitScript(()=>{for(const key of ['localStorage','sessionStorage'])Object.defineProperty(window,key,{get(){throw Error('blocked');}});});
    const bp=await blocked.newPage();await bp.goto(base+`/grade/lop${grade}/grammar.html`);await bp.locator('#learner-name').fill('Học tạm');await bp.getByRole('button',{name:'Vào học ngay',exact:true}).click();await bp.locator('#start').click();assert.ok(await bp.locator('#play').isVisible());await blocked.close();
    console.log('PASS: four unique options; Unit coverage; 120s active-time hints; wrong/retry; drafts and completed reload without duplicate points; continuous passage and scoring; underlined sounds; preferences; four widths; blocked storage.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
