const {chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await context.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.events=[];document.addEventListener('danh-answer-speech',e=>events.push(e.detail));});
 const page=await context.newPage(),results=[],errors=[];page.on('pageerror',e=>errors.push({url:page.url(),message:e.message}));
 for(let grade=1;grade<=12;grade++){
  const files=fs.readdirSync(`grade/lop${grade}`).filter(f=>f.endsWith('.html')&&/id=["'](?:vocab-grid-container|vocab-grid)["']/.test(fs.readFileSync(`grade/lop${grade}/${f}`,'utf8')));
  for(const file of files){
   await page.goto(`${base}/grade/lop${grade}/${file}`);await page.waitForFunction(()=>document.querySelector('#vocab-grid-container,#vocab-grid')?.children.length>0);
   const record=await page.evaluate(()=>[...document.querySelector('#vocab-grid-container,#vocab-grid').children].filter(card=>card.querySelector('.word-title,h3')).map((card,index)=>{
    const name=card.querySelector('.word-title,h3')?.textContent.trim(),picture=card.querySelector('[data-danh-picture-listen],.word-picture');
    const readings=[],listen=window.DanhAnswerSpeech.listen;
    try{window.DanhAnswerSpeech.listen=text=>{readings.push(text);return Promise.resolve(true);};picture?.click();}finally{window.DanhAnswerSpeech.listen=listen;}
    return {index,name,bound:!!picture,term:picture?.dataset.danhPictureListen||name,handler:readings.length===1&&readings[0].trim().toLowerCase()===name.toLowerCase(),nested:card.querySelectorAll('.word-picture [data-danh-picture-listen]').length};
   }));
   const missing=record.filter(r=>!r.bound||!r.handler||r.nested);
   const audioMissing=record.filter(r=>{if(!r.term)return true;let hash=2166136261;for(const c of r.term.replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase())hash=Math.imul(hash^c.charCodeAt(0),16777619);return !fs.existsSync(`shared/answer-audio/${(hash>>>0).toString(16).padStart(8,'0')}.wav`);});
   results.push({grade,file,count:record.length,missing,audioMissing});
   assert.equal(await page.evaluate(()=>events.length),0,`${grade}/${file} autoplay`);
  }
  console.log(`Audited grade ${grade}: ${files.length} pages`);
 }
 // Một khung ảnh được tái sử dụng phải đọc tên mới đúng một lần.
 await page.goto(base+'/grade/lop7/unit1.html');
 const title=page.locator('#vocab-grid h3').first(),picture=page.locator('#vocab-grid [data-danh-picture-listen]').first();
 const original=await title.textContent(),other=await page.locator('#vocab-grid h3').nth(1).textContent();
 await title.evaluate((n,text)=>{n.firstChild.nodeValue=text;},other);
 await page.waitForFunction(text=>document.querySelector('#vocab-grid [data-danh-picture-listen]')?.dataset.danhPictureListen===text,other);
 const spoken=await picture.evaluate(n=>{const words=[],listen=window.DanhAnswerSpeech.listen;try{window.DanhAnswerSpeech.listen=text=>words.push(text);n.click();return words;}finally{window.DanhAnswerSpeech.listen=listen;}});assert.deepEqual(spoken,[other]);
 await title.evaluate((n,text)=>{n.firstChild.nodeValue=text;},original);
 fs.mkdirSync('artifacts/all-vocabulary-cards',{recursive:true});fs.writeFileSync('artifacts/all-vocabulary-cards/audit.json',JSON.stringify({results,errors},null,2));
 const failures=results.filter(r=>r.missing.length||r.audioMissing.length);console.log(JSON.stringify({pages:results.length,cards:results.reduce((s,r)=>s+r.count,0),failures,errors},null,2));assert.deepEqual(failures,[]);assert.deepEqual(errors,[]);
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
