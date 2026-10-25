const {chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await context.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.events=[];document.addEventListener('danh-answer-speech',e=>events.push(e.detail));});
 const page=await context.newPage(),errors=[],missing=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 const topics=fs.readdirSync('grade/lop2').filter(f=>f.endsWith('.html')&&!/^gsunit\d+/.test(f)&&/id=["']vocab-grid-container["']/.test(fs.readFileSync('grade/lop2/'+f,'utf8')));
 let plays=0;
 for(const file of topics){
  await page.goto(base+'/grade/lop2/'+file);const controls=page.locator('#vocab-grid-container [data-danh-picture-listen],#vocab-grid-container .word-picture');await controls.first().waitFor();assert.equal(await page.evaluate(()=>events.length),0);
  for(const target of [controls.first(),controls.last()]){
   const term=await target.evaluate(n=>n.dataset.danhPictureListen||n.closest('#vocab-grid-container > *')?.querySelector('.word-title,h3')?.textContent.trim());assert(term,file);
   const n=await page.evaluate(()=>events.length);await target.click();await page.waitForFunction(n=>events.slice(n).some(e=>e.state==='ended'&&e.mode==='audio'),n);
   const audio=await page.evaluate(n=>events.slice(n),n);assert.equal(audio.filter(e=>e.state==='playing').length,1,file);assert.equal(audio.filter(e=>e.state==='ended').length,1,file);assert.equal(audio.find(e=>e.state==='ended').text.toLowerCase(),term.toLowerCase(),file);plays++;
  }
  console.log('PASS first/last picture real media: '+file);
 }
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);console.log(`PASS ${topics.length} shared topics, ${plays} real audio playbacks without Web Speech, no autoplay/errors/missing files`);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
