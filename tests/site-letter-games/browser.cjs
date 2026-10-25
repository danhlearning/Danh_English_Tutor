const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/site-letter-games';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await context.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.media=[];document.addEventListener('danh-answer-speech',e=>media.push(e.detail));});
 const page=await context.newPage(),errors=[],missing=[],results=[];
 page.on('pageerror',e=>{errors.push(e.message);console.log('ERROR '+e.message);});page.on('response',r=>{if(r.status()>=400){missing.push(r.url());console.log('MISSING '+r.url());}});
 async function solve(stage,key,bank){
  const a=await page.evaluate(k=>JSON.parse(DanhLearners.storage.getItem(k)).active,key),t=a.tasks[a.index],word=bank.find(w=>w.id===t.id);assert(word,t.id);
  const used=new Set();for(const pos of t.holes){const i=t.tiles.findIndex((c,i)=>!used.has(i)&&c===Array.from(word.name)[pos].toLowerCase());used.add(i);await stage.locator(`[data-tile="${i}"]`).click();}
  await stage.getByRole('button',{name:'Kiểm tra',exact:true}).click();await page.waitForFunction(()=>media.some(e=>e.state==='ended'&&e.mode==='audio'));
  assert.equal(await page.evaluate(()=>media.filter(e=>e.state==='playing').length),1);assert.equal(await stage.locator('.ll-status[data-kind="correct"]').count(),0);
 }
 for(let grade=1;grade<=12;grade++){
  await page.goto(`${base}/grade/lop${grade}/${grade===2?'gsunit1':'unit1'}.html`);
  assert.equal(await page.evaluate(()=>media.length),0);
  if(grade<=5)await page.getByRole('button',{name:'Trò chơi',exact:true}).click();else await page.locator('[data-tab="letters"]').click();
  const stage=grade<=5?page.locator('.tab-content.active .letter-ladder'):page.locator('#letters-stage');await stage.locator('.ll-slot').first().waitFor();
  const data=await page.evaluate(grade=>{const topic=document.body.dataset.topic,raw=grade===2?grade2Units[topic].words:grade<=5?DanhPrimaryGrade2Course.units.find(u=>u.id===document.body.dataset.unit).words:window['DanhGrade'+grade+'Units'].find(u=>u.id===document.body.dataset.unit).words;return {bank:grade<=5?raw:DanhSiteLetters.normalize(raw),key:grade<=5?`danh-g${grade}-letter-ladder-${topic}-v1`:document.querySelector('#letters-stage').dataset.letterStorage};},grade);
  assert(data.key.startsWith(`danh-g${grade}-`));await solve(stage,data.key,data.bank);
  const saved=await page.evaluate(k=>JSON.parse(DanhLearners.storage.getItem(k)).active,data.key);assert(saved.ids.every(id=>data.bank.some(w=>w.id===id)));
  await page.reload();if(grade>=6)await page.locator('[data-tab="letters"]').click();await stage.waitFor();assert.equal(await page.evaluate(()=>media.length),0);
  assert.deepEqual(await page.evaluate(k=>JSON.parse(DanhLearners.storage.getItem(k)).active,data.key),saved);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  if([1,5,6,12].includes(grade))await page.screenshot({path:`${out}/grade${grade}-390.png`,fullPage:true});
  results.push({kind:'unit',grade,realAudio:true,resume:true});console.log('PASS Unit grade '+grade);
 }
 for(let grade=1;grade<=12;grade++){
  if(grade<=5){
   await page.goto(`${base}/grade/lop${grade}/review.html`);await page.locator('#start-letters').click();await page.locator('#letter-review-stage .ll-slot').first().waitFor();
   const key=await page.evaluate(grade=>{const list=[];for(let i=0;i<DanhLearners.storage.length;i++){const k=DanhLearners.storage.key(i);if(k?.startsWith(`danh-g${grade}-letter-ladder-review-`))list.push(k);}return list;},grade);
   assert(await page.locator('#letter-review').isVisible());results.push({kind:'review',grade});
  }else{
   await page.goto(`${base}/grade/lop${grade}/vocabulary-review.html?term=2`);await page.locator('.site-letter-entry>button').click();
   const stage=page.locator('.site-letter-entry .letter-ladder');await stage.locator('.ll-slot').first().waitFor();
   const info=await page.evaluate(grade=>{const units=window['DanhGrade'+grade+'Units'],pool=units.filter(u=>u.number>Math.ceil(units.length/2)).flatMap(u=>u.words);const bank=DanhSiteLetters.normalize(pool),key=document.querySelector('.site-letter-entry [data-letter-storage]').dataset.letterStorage;return {bank,active:JSON.parse(DanhLearners.storage.getItem(key)).active,key};},grade);
   assert(info.key.startsWith(`danh-g${grade}-`));assert(info.active.selected.every(id=>info.bank.some(w=>w.id===id)));assert(info.active.ids.length<=8);results.push({kind:'review-term2',grade});
  }
  assert.equal(await page.evaluate(()=>media.length),0);console.log('PASS review grade '+grade);
 }
 await page.goto(base+'/flashcard.html?game=letters&grade=12&unit=unit2');await page.locator('#stage .ll-slot').first().waitFor();
 const library=await page.evaluate(async()=>{const all=await DanhVocabularyLibrary.load(),pool=all.filter(w=>w.sources.some(s=>s.grade===12&&s.unit==='unit2')),bank=DanhSiteLetters.normalize(pool),key=document.querySelector('#stage').dataset.letterStorage;return {bank,key,active:JSON.parse(DanhLearners.storage.getItem(key)).active};});
 assert(library.key.startsWith('danh-g12-'));assert(library.active.selected.every(id=>library.bank.some(w=>w.id===id)));assert.equal(await page.locator('#grade-filter').inputValue(),'12');assert.equal(await page.locator('#unit-filter').inputValue(),'unit2');
 await solve(page.locator('#stage'),library.key,library.bank);await page.reload();await page.locator('#stage .ll-primary').first().waitFor();assert.equal(await page.evaluate(()=>media.length),0);
 for(const width of [320,390,1280]){await page.setViewportSize({width,height:900});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:`${out}/library-${width}.png`,fullPage:true});}
 await page.goto(base+'/tense-theory.html');const link=page.getByRole('link',{name:'Ghép chữ · Luyện nhớ từ',exact:true});assert(await link.isVisible());assert((await link.getAttribute('href')).includes('flashcard.html?game=letters'));
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.writeFileSync(out+'/browser-results.json',JSON.stringify({results,libraryGrade12Unit2:true,footer:true,widths:[320,390,1280],errors,missing},null,2));
 console.log('PASS all 12 Unit/review scopes, library filter, cached voices, reload and responsive layout');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
