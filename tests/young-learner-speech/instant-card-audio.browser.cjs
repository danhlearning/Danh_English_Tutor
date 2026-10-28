const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL || 'http://127.0.0.1:8765';
const topics=['adjectives','animals','bodyparts','clothes','colors','dates','familyfriends','feeling','fooddrinks','fruits','householditems','numbers','rooms','schoolsupplies','shapes','toys','transport','verbs','weather','gsunit1','gsunit8','gsunit13','gsunit16'];
const key=text=>{let hash=2166136261;for(const c of text.replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase())hash=Math.imul(hash^c.charCodeAt(0),16777619);return(hash>>>0).toString(16).padStart(8,'0');};
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});
  await context.route('**/*',async route=>{if(!route.request().url().startsWith(base))return route.abort();if(route.request().url().includes('/answer-audio/'))await new Promise(r=>setTimeout(r,300));return route.continue();});
  await context.addInitScript(()=>{
   Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});
   window.media=[];window.audioPlayers=[];window.clickAt=0;
   const Native=Audio;window.Audio=function(...args){const a=new Native(...args);audioPlayers.push(a);for(const type of ['playing','ended','error'])a.addEventListener(type,()=>media.push({type,src:a.src,rate:a.playbackRate,delay:performance.now()-clickAt}));return a;};window.Audio.prototype=Native.prototype;
  });
  const page=await context.newPage(),errors=[],missing=[],results=[];let audioRequests=0;
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});page.on('request',r=>{if(r.url().includes('/answer-audio/'))audioRequests++;});
  for(const topic of topics){
   await page.goto(`${base}/grade/lop2/${topic}.html`);
   const cards=page.locator('#vocab-grid-container [data-danh-card-listen]');await cards.first().waitFor();
   assert.equal(await page.evaluate(()=>media.length),0,topic+' no autoplay');
   const record={topic,checks:[]};
   for(const card of [cards.first(),cards.last()]){
    await card.scrollIntoViewIfNeeded();const term=await card.getAttribute('data-danh-card-listen'),hash=key(term);
    await page.waitForFunction(hash=>performance.getEntriesByType('resource').some(e=>e.name.includes('/answer-audio/'+hash+'.mp3')),hash);
    await page.waitForFunction(()=>DanhGameFlow.stats.active===0 && DanhGameFlow.stats.pending===0 && audioPlayers.some(a=>a.readyState>=2));
    const before=audioRequests,index=await page.evaluate(()=>media.length);
    await card.evaluate(card=>{window.clickAt=performance.now();card.querySelector('img,svg,[data-word-audio]')?.dispatchEvent(new MouseEvent('click',{bubbles:true}));});
    await page.waitForFunction(index=>media.slice(index).some(e=>e.type==='ended'),index);
    const events=await page.evaluate(index=>media.slice(index),index),plays=events.filter(e=>e.type==='playing');
    assert.equal(plays.length,1,topic+' one tap one reading');assert.match(plays[0].src,/^blob:/);assert.equal(plays[0].rate,.85,topic+' same study speed');assert.equal(audioRequests,before,topic+' no network request on tap');assert(plays[0].delay<250,topic+' prepared audio starts promptly');
    record.checks.push({term,delayMs:plays[0].delay,rate:plays[0].rate,noFetchOnTap:true});
   }
   assert(await page.evaluate(()=>DanhGameFlow.stats.bytes<=2*1024*1024 && DanhGameFlow.stats.active<=2));
   results.push(record);console.log('PASS '+topic+' '+record.checks.map(c=>Math.round(c.delayMs)+'ms').join('/'));
  }
  // Repeated taps reuse the prepared player and interrupt the previous reading.
  await page.locator('#vocab-grid-container [data-danh-card-listen]').last().evaluate(card=>{for(let i=0;i<5;i++)card.click();});
  assert(await page.evaluate(()=>audioPlayers.filter(a=>!a.paused).length<=1));
  await page.evaluate(()=>DanhAnswerSpeech.stop());assert(await page.evaluate(()=>audioPlayers.every(a=>a.paused)));
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
  fs.mkdirSync('artifacts/online-audio',{recursive:true});fs.writeFileSync('artifacts/online-audio/instant-results.json',JSON.stringify({passed:true,networkDelayMs:300,results,errors,missing},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
