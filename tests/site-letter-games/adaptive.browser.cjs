const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/site-letter-games';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));const results=[];
 for(const kind of ['unit','library']){
  const url=kind==='unit'?'/grade/lop6/unit1.html':'/flashcard.html?game=letters&grade=12&unit=unit2';await page.goto(base+url);
  if(kind==='unit')await page.locator('[data-tab="letters"]').click();
  const stage=kind==='unit'?page.locator('#letters-stage'):page.locator('#stage');await stage.locator('.ll-slot').first().waitFor();
  const info=await stage.evaluate(n=>{const key=n.dataset.letterStorage,s=JSON.parse(DanhLearners.storage.getItem(key)),a=s.active;const t=a.tasks[0];a.ids=[t.id];a.tasks=[t];DanhLearners.storage.setItem(key,JSON.stringify(s));return {key};});
  await page.reload();if(kind==='unit')await page.locator('[data-tab="letters"]').click();await stage.locator('.ll-slot').first().waitFor();
  const bank=await page.evaluate(async kind=>DanhSiteLetters.normalize(kind==='unit'?DanhGrade6Units[0].words:(await DanhVocabularyLibrary.load()).filter(w=>w.sources.some(s=>s.grade===12&&s.unit==='unit2'))),kind);
  const before=await page.evaluate(kind=>kind==='unit'?DanhLearners.storage.getItem('danh-g6-unit1'):JSON.stringify(JSON.parse(DanhLearners.storage.getItem('danh-vocabulary-skills-v1')||'{}').records),kind);
  await page.evaluate(()=>{window.letterReads=[];DanhAnswerSpeech.say=text=>{letterReads.push(text);return Promise.resolve();};});
  const state=()=>page.evaluate(k=>JSON.parse(DanhLearners.storage.getItem(k)).active,info.key);
  async function correct(){const a=await state(),t=a.tasks[a.index],w=bank.find(w=>w.id===t.id),used=new Set();for(const pos of t.holes){const i=t.tiles.findIndex((c,i)=>!used.has(i)&&c===Array.from(w.name)[pos].toLowerCase());used.add(i);await stage.locator(`[data-tile="${i}"]`).click();}await stage.getByRole('button',{name:'Kiểm tra',exact:true}).click();}
  for(let i=0;i<3;i++)await stage.getByRole('button',{name:'Gợi ý',exact:true}).click();await correct();await stage.getByRole('button',{name:'Từ tiếp',exact:true}).click();assert.equal((await state()).phase,1);assert(await stage.locator('.ll-practice-note').isVisible());assert.equal(await stage.locator('.ll-input').count(),0);
  for(let phase=1;phase<=3;phase++){assert.equal((await state()).phase,phase);await correct();await stage.getByRole('button',{name:'Từ tiếp',exact:true}).click();}
  assert.equal((await state()).phase,4);assert(await stage.locator('.ll-input').isVisible());const a=await state(),w=bank.find(w=>w.id===a.tasks[0].id);await stage.locator('.ll-input').fill(w.name);await stage.getByRole('button',{name:'Kiểm tra',exact:true}).click();await stage.getByRole('button',{name:'Xem kết quả',exact:true}).click();assert(await stage.locator('.ll-summary').isVisible());
  const after=await page.evaluate(kind=>kind==='unit'?DanhLearners.storage.getItem('danh-g6-unit1'):JSON.stringify(JSON.parse(DanhLearners.storage.getItem('danh-vocabulary-skills-v1')||'{}').records),kind);assert.equal(after,before);assert(!(await stage.textContent()).includes('✅'));
  results.push({kind,repeatedHintsStay:true,independentRecallUnlocksFull:true,summary:true,otherProgressUnchanged:true});
 }
 for(const grade of [1,5,12]){await page.goto(base+`/grade/lop2/bodyparts.html?fromGrade=${grade}`);await page.getByRole('button',{name:'Trò chơi',exact:true}).click();await page.locator('.letter-ladder .ll-slot').first().waitFor();assert(await page.getByRole('button',{name:'Ghép chữ',exact:true}).isVisible());}
 for(const grade of [1,5]){await page.goto(base+`/grade/lop${grade}/unit1.html`);await page.getByRole('button',{name:'Trò chơi',exact:true}).click();const style=await page.locator('.letter-ladder .ll-primary').first().evaluate(n=>({bg:getComputedStyle(n).backgroundColor,color:getComputedStyle(n).color}));assert.notEqual(style.bg,'rgba(0, 0, 0, 0)');assert.notEqual(style.bg,style.color);await page.screenshot({path:`${out}/grade${grade}-390.png`,fullPage:true});}
 await page.goto(base+'/grade/lop2/animals.html?fromGrade=12');
 await page.getByRole('button',{name:'Trò chơi',exact:true}).click();
 await page.locator('#game-flip .learning-pick').click();await page.locator('.learning-none').click();
 for(const name of ['Dog','Fox'])await page.locator('.learning-choice').filter({has:page.locator('strong',{hasText:new RegExp('^'+name+'$')})}).locator('input').check();
 await page.locator('.learning-apply').click();await page.waitForFunction(()=>JSON.parse(DanhLearners.storage.getItem('danh-g12-letter-ladder-animals-v1')).active.selected.length===2);await page.locator('#game-flip .ll-slot').first().waitFor();
 const animals=await page.evaluate(()=>{const key='danh-g12-letter-ladder-animals-v1',bank=DanhSiteLetters.normalize(animalsList.filter(w=>[1,6].includes(w.num)));return {key,active:JSON.parse(DanhLearners.storage.getItem(key)).active,bank};});
 assert(animals.key.startsWith('danh-g12-'));assert.equal(animals.active.selected.length,2);assert(animals.active.selected.every(id=>animals.bank.some(w=>w.id===id)));await page.screenshot({path:out+'/animals-390.png',fullPage:true});
 assert.equal(await page.locator('.site-letter-entry').count(),0);assert(await page.locator('.container').isVisible());
 assert.deepEqual(errors,[]);fs.writeFileSync(out+'/adaptive-results.json',JSON.stringify({results,auxiliaryGrades:[1,5,12],buttonContrast:true,errors},null,2));console.log('PASS shared recall gate, full-word input, summary, independent progress, auxiliary grade contexts and button contrast');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
