const fs=require('node:fs'),assert=require('node:assert/strict'),vm=require('node:vm');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/image-repair-20261025';
const repairs=JSON.parse(fs.readFileSync(out+'/repairs.json','utf8'));
const normal=s=>String(s).trim().toLowerCase();
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await ctx.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await ctx.addInitScript(()=>{window.speechEvents=[];document.addEventListener('danh-answer-speech',e=>speechEvents.push(e.detail));});
 const p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(base+'/flashcard.html');await p.locator('#workbench').waitFor({state:'visible'});
 const library=await p.evaluate(()=>DanhVocabularyLibrary.load());let checked=0;
 for(const r of repairs.filter(r=>r.locations.some(l=>l.includes('flashcard.html')))){
  const w=library.find(w=>normal(w.term)===normal(r.term)&&normal(w.meaning)===normal(r.meaning));assert(w,'Missing sense '+r.term);assert.equal(w.image,r.image,r.term);checked++;
 }
 assert.equal(await p.evaluate(()=>speechEvents.length),0);
 // Decode exactly the installed image URLs, including native number diagrams.
 for(const r of repairs)assert(await p.evaluate(async f=>{const i=new Image();i.src='/'+f;try{await i.decode();return i.naturalWidth>0&&i.naturalHeight>0}catch{return false}},r.image),r.image);
 const byPage=new Map();for(const grade of [8,9]){
  const c={window:{}};vm.runInNewContext(fs.readFileSync(`grade/lop${grade}/assets/js/units-data.js`,'utf8'),c);
  for(const u of c.window[`DanhGrade${grade}Units`])for(const w of u.words){const r=repairs.find(r=>normal(r.term)===normal(w.term)&&normal(r.meaning)===normal(w.meaning));if(r){const key=`grade/lop${grade}/${u.id}.html`;if(!byPage.has(key))byPage.set(key,[]);byPage.get(key).push({id:w.id,term:w.term,image:r.image});}}
 }
 let cards=0;for(const [file,items]of byPage){await p.goto(base+'/'+file);await p.locator('#vocab-grid .g6-word-card').first().waitFor();
  assert.equal(await p.evaluate(()=>speechEvents.length),0,file+' auto speech');
  for(const item of items){const img=p.locator('#vocab-grid .g6-word-card').nth(item.id-1).locator('img');await img.evaluate(i=>{i.loading='eager';return i.decode()});assert((await img.getAttribute('src')).endsWith(item.image.replace(/^grade\/lop\d+\//,'')),item.term);cards++;}
  for(const width of [320,390,1280]){await p.setViewportSize({width,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),file+' overflow');}
  if(file.includes('lop8/unit4')){await p.setViewportSize({width:390,height:844});await p.locator('#vocab-grid .g6-word-card').nth(6).screenshot({path:out+'/gong-mobile.png'});await p.locator('[data-tab=flashcards]').click();assert(await p.locator('#flashcard img').count()>0);}
 }
 await p.goto(base+'/grade/lop2/fruits.html');const grape=p.locator('#vocabulary-grid .vocabulary-card').filter({hasText:'Grape'});
 const grapeImages=await p.locator('image').evaluateAll(ns=>ns.map(i=>i.getAttribute('href')));assert(grapeImages.some(s=>s.includes('grape-v2.webp')));
 await p.goto(base+'/grade/lop2/gsunit13.html');const numbers=await p.locator('image').evaluateAll(ns=>ns.map(i=>i.getAttribute('href')));for(const n of [11,13,14,15])assert(numbers.some(s=>s.includes('number-'+n+'.svg')));
 await p.goto(base+'/flashcard-previous.html');for(const r of repairs.filter(r=>r.locations.some(l=>l.includes('flashcard-previous')))){
  await p.evaluate(term=>{const category=Object.keys(database).find(k=>database[k].some(w=>w.word===term));switchCategory(category);currentIndex=flashcards.findIndex(w=>w.word===term);updateCard();},r.term);
  const img=p.locator('#img-vocab');await img.evaluate(i=>i.decode());assert((await img.getAttribute('src')).endsWith(r.image),r.term);}
 assert.deepEqual(errors,[]);
 await p.goto(base+'/'+out+'/review.html');await p.setViewportSize({width:1280,height:900});await p.screenshot({path:out+'/review-desktop.png',fullPage:true});await p.setViewportSize({width:390,height:844});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.screenshot({path:out+'/review-mobile.png',fullPage:false});
 fs.writeFileSync(out+'/validation.json',JSON.stringify({librarySenses:checked,imageDecodes:repairs.length,unitCards:cards,unitPages:byPage.size,viewportWidths:[320,390,1280],oldCards:9,errors},null,2));console.log('PASS',checked,'library senses;',repairs.length,'images;',cards,'cards across',byPage.size,'Unit pages; 9 old cards; numbers; grape; responsive widths.');
}finally{await b.close()}})().catch(e=>{console.error(e);process.exitCode=1});
