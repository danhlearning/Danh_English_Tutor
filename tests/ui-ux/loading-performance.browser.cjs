const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL || 'http://127.0.0.1:8765';
const out='artifacts/loading-performance';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});
  await context.route('**/*',route=>route.request().url().startsWith(base)?route.continue():route.abort());
  const page=await context.newPage(),errors=[],missing=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  await context.addInitScript(()=>{window.spoken=[];document.addEventListener('danh-answer-speech',e=>spoken.push(e.detail));});
  await page.goto(base+'/grade/lop2/fooddrinks.html');
  await page.waitForFunction(()=>document.querySelectorAll('img.pencil-art').length===20);
  await page.waitForFunction(()=>document.querySelector('img.pencil-art')?.naturalWidth>0);
  await page.waitForTimeout(800);
  const initial=await page.evaluate(()=>{
   const resources=performance.getEntriesByType('resource').filter(r=>/\.(webp|png|jpg)(?:\?|$)/.test(r.name));
   return {requests:resources.length,bytes:resources.reduce((sum,r)=>sum+r.decodedBodySize,0),total:document.querySelectorAll('img.pencil-art').length,
    compact:document.querySelector('img.pencil-art').currentSrc,lazy:[...document.querySelectorAll('img.pencil-art')].every(i=>i.loading==='lazy'&&i.decoding==='async')};
  });
  assert(initial.lazy);assert.match(initial.compact,/\/compact\//);
  assert(initial.requests<initial.total,'offscreen pictures should not all download at startup');
  assert(initial.bytes<800000,'initial illustration payload should stay well below the previous 2.2 MB');
  assert.equal(await page.evaluate(()=>spoken.length),0,'opening does not speak');
  assert.equal(await page.locator('script[src*="site-preload.js"]').count(),0,'lessons do not load the retired page prefetcher');
  const pictures=page.locator('#vocab-grid-container img.pencil-art');
  for(const picture of [pictures.first(),pictures.last()]){
   await picture.scrollIntoViewIfNeeded();await picture.evaluate(i=>i.decode());
   assert(await picture.evaluate(i=>i.naturalWidth>0&&i.getBoundingClientRect().width>0));
   const readings=await picture.evaluate(i=>{const words=[],listen=window.DanhAnswerSpeech.listen;try{window.DanhAnswerSpeech.listen=t=>words.push(t);i.click();return words;}finally{window.DanhAnswerSpeech.listen=listen;}});
   assert.equal(readings.length,1,'one picture tap speaks once');
  }
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:out+'/fooddrinks-mobile.png'});
  await page.goto(base+'/grade/lop6/unit1.html');await page.waitForTimeout(250);
  assert.equal(await page.evaluate(()=>document.querySelectorAll('[data-danh-game-surface]:not([hidden])').length>0),true);
  // Visible vocabulary may warm audio; opening a hidden game must still be silent.
  await page.locator('[data-tab=flashcards]').click();
  await page.waitForFunction(()=>DanhGameFlow.stats.ready>=3);
  assert.equal(await page.evaluate(()=>spoken.length),0,'opening a game prepares silently');
  const repeated=await page.evaluate(()=>{
   let feedback=0;const listener=()=>feedback++;document.addEventListener('danh-learning-feedback',listener);
   const tab=document.querySelector('[data-tab=flashcards]');for(let i=0;i<20;i++)tab.click();
   document.removeEventListener('danh-learning-feedback',listener);return feedback;
  });assert.equal(repeated,0,'repeated selected tab does not redraw or restart feedback');
  await page.evaluate(()=>{const target=document.querySelector('#flashcard');target.getBoundingClientRect=()=>{throw Error('Forced layout during navigation');};DanhLearningEffects.feedback('next',target);});
  for(let n=0;n<12;n++)await page.locator('#flash-next').click();
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.evaluate(()=>DanhLearningEffects.stop());
  assert.equal(await page.locator('#flashcard').evaluate(n=>n.getAnimations().length),0);
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
  fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,initial,hiddenGamesDeferred:true,noAutoplay:true,repeatedTab:true,navigationWithoutForcedLayout:true,errors,missing},null,2));
  console.log(JSON.stringify({passed:true,initial}));await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
