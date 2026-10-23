const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
 const context=await browser.newContext({viewport:{width:390,height:844}});
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await context.addInitScript(()=>{
   Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});
   Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});
   window.audioEvents=[];
   document.addEventListener('danh-answer-speech',e=>audioEvents.push(e.detail));
 });
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const url of ['grade/lop1/unit1.html','grade/lop2/gsunit1.html','grade/lop2/animals.html','grade/lop2/bodyparts.html','grade/lop3/unit1.html','grade/lop4/unit1.html','grade/lop5/unit1.html','grade/lop6/unit1.html','grade/lop7/unit1.html','grade/lop8/unit1.html','grade/lop9/unit1.html','grade/lop10/unit1.html','grade/lop11/unit1.html','grade/lop12/unit1.html']){
   await page.goto(base+'/'+url);
   await page.evaluate(()=>DanhLearners.storage.setItem('danh-vocabulary-effects-v1',JSON.stringify({sound:false,motion:false,shared:true})));
   await page.reload();await page.waitForTimeout(200);
   const speaker=page.locator('button[data-danh-listen]:visible').first();await speaker.waitFor();
   assert(!/Nghe/.test(await speaker.innerText()),url);
   assert(await speaker.getAttribute('aria-label'),url);
   assert.equal(await page.evaluate(()=>audioEvents.length),0,'No autoplay: '+url);
   await speaker.click();
   await page.waitForFunction(()=>audioEvents.some(e=>e.state==='playing'&&e.mode==='audio'));
   await page.waitForFunction(()=>audioEvents.some(e=>e.state==='ended'&&e.mode==='audio'));
   assert(!await page.evaluate(()=>audioEvents.some(e=>e.state==='error')),url);
   assert.equal(await page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-vocabulary-effects-v1')).sound),false);
   console.log('PASS manual audio with saved mute and no Web Speech:',url);
 }
 for(let g=1;g<=12;g++){
   await page.goto(`${base}/grade/lop${g}/lop${g}.html`);await page.waitForTimeout(150);
   assert.equal(await page.getByText(/^Vào học\s*[→↗➔]?$/).count(),0,'Unit CTA: '+g);
 }
 assert.deepEqual(errors,[]);console.log('PASS 12 catalogs, no page errors');
 await page.goto(base+'/grade/lop6/unit1.html');await page.waitForTimeout(250);
 await page.screenshot({path:'artifacts/learner-profiles/compact-speakers-390.png'});
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
