const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
const click=l=>l.click();
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await c.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.audioStarts=[];document.addEventListener('danh-answer-speech',e=>{if(e.detail.state==='playing')audioStarts.push(e.detail);});});
 await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 const p=await c.newPage(),errors=[],missing=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 async function played(text,action){const count=await p.evaluate(()=>audioStarts.length);await action();await p.waitForFunction(n=>audioStarts.length===n+1,count);assert.equal(await p.locator('html').getAttribute('data-answer-speech-text'),text);assert.equal(await p.locator('html').getAttribute('data-answer-speech-mode'),'audio');await p.waitForFunction(()=>document.documentElement.dataset.answerSpeechState==='ended');}
 for(const g of [6,7,8,9,10,11,12]){
  await p.goto(`${base}/grade/lop${g}/unit1.html`);assert.equal(await p.evaluate(()=>audioStarts.length),0);
  await click(p.locator('[data-tab=quiz]'));await click(p.getByRole('button',{name:'Bắt đầu chơi',exact:true}));
  let key=await p.locator('[data-word-key]').getAttribute('data-word-key'),term=(await p.locator(`[data-answer-key="${key}"]`).textContent()).slice(3);
  await played(term,()=>click(p.locator(`[data-answer-key="${key}"]`)));assert.equal(await p.evaluate(()=>audioStarts.length),1);
  if(g===7){await click(p.locator('[data-next]'));key=await p.locator('[data-word-key]').getAttribute('data-word-key');term=(await p.locator(`[data-answer-key="${key}"]`).textContent()).slice(3);await click(p.locator(`.g6-choice:not([data-answer-key="${key}"])`).first());assert.equal(await p.evaluate(()=>audioStarts.length),1);await played(term,()=>click(p.locator(`[data-answer-key="${key}"]`)));await played(term,()=>click(p.getByRole('button',{name:'🔊 Nghe từ',exact:true})));await p.reload();assert.equal(await p.evaluate(()=>audioStarts.length),0);}
  console.log('PASS real WAV playback without Web Speech, grade '+g);
 }
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
 const out=path.resolve(__dirname,'../../artifacts/correct-answer-speech');fs.writeFileSync(path.join(out,'audio-fallback-results.json'),JSON.stringify({passed:true,webSpeechUnavailable:true,realMediaPlayingAndEnded:true,grades:[6,7,8,9,10,11,12],grade7CorrectedAndReplay:true,noAutoplay:true,externalNetworkBlocked:true,errors,missing},null,2));
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
