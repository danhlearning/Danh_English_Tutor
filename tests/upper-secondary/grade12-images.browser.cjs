const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001',out=path.resolve(__dirname,'../../artifacts/grade12-images');
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await c.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined});window.played=[];window.media=[];document.addEventListener('danh-answer-speech',e=>played.push(e.detail));const Native=window.Audio;window.Audio=function(...args){const a=new Native(...args);for(const type of ['playing','ended'])a.addEventListener(type,()=>media.push({type,src:a.src}));return a;};window.Audio.prototype=Native.prototype;});
 const p=await c.newPage(),errors=[],missing=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 async function layout(){assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));}
 await p.goto(base+'/grade/lop12/lop12.html');assert.equal(await p.locator('.g6-unit-card').count(),10);await p.locator('.g6-cover-picture img').evaluate(i=>i.decode());
 for(const width of [320,390,834,1280]){await p.setViewportSize({width,height:900});await layout();await p.screenshot({path:path.join(out,`catalog-${width}.png`),fullPage:true});}
 await p.setViewportSize({width:390,height:844});
 let decoded=0,flipped=0;
 for(let u=1;u<=10;u++){
  await p.goto(`${base}/grade/lop12/unit${u}.html`);await p.locator('[data-tab=vocabulary]').click();assert.equal(await p.locator('#vocab-grid img').count(),10);
  const sizes=await p.locator('#vocab-grid img').evaluateAll(async ns=>{for(const n of ns){n.loading='eager';await n.decode();}return ns.map(n=>[n.naturalWidth,n.naturalHeight]);});assert(sizes.every(([w,h])=>w===768&&h===768));decoded+=sizes.length;
  for(const width of [320,390,834,1280]){await p.setViewportSize({width,height:900});await layout();}
  await p.setViewportSize({width:390,height:844});await p.screenshot({path:path.join(out,`unit${u}-390.png`),fullPage:true});
  await p.locator('.g6-word-card').first().screenshot({path:path.join(out,`word-unit${u}-390.png`)});
  if(u===2){await p.setViewportSize({width:1280,height:900});await p.screenshot({path:path.join(out,'unit2-1280.png'),fullPage:true});await p.locator('#vocab-grid').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'vocabulary-1280.png')});await p.setViewportSize({width:390,height:844});}
  await p.locator('[data-tab=flashcards]').click();
  for(let i=0;i<10;i++){
   assert.equal(await p.locator('#flashcard .vg-flip-front img').count(),0);assert.equal(await p.locator('#flashcard .vg-flip-back img').count(),1);await p.locator('#flashcard .vg-flip-back img').evaluate(i=>i.decode());
   await p.locator('#flashcard').click();if(u===2&&i===0)await p.locator('#flashcard').screenshot({path:path.join(out,'flashcard-390.png')});await p.locator('#flash-next').click();flipped++;
  }
  assert.equal(await p.evaluate(()=>played.length),0);
 }
 await p.goto(base+'/grade/lop12/unit2.html?activity=spelling');assert.equal(await p.evaluate(()=>played.length),0);
 const input=p.locator('#spelling-stage input'),submit=p.locator('#spelling-stage button[type=submit]');
 await input.fill('draft before image reload');const saved=await p.evaluate(()=>DanhLearners.storage.getItem('danh-g12-spelling-unit2-v1'));await p.reload();assert.equal(await input.inputValue(),'draft before image reload');assert.equal(await p.evaluate(()=>DanhLearners.storage.getItem('danh-g12-spelling-unit2-v1')),saved);
 for(let n=0;n<2;n++){
  const word=await p.evaluate(()=>{const s=JSON.parse(DanhLearners.storage.getItem('danh-g12-spelling-unit2-v1'));return DanhGrade12Units[1].words.find(w=>w.id===s.order[s.position]);});
  if(n===1){await input.fill('wrong');await submit.click();}
  const before=await p.evaluate(()=>media.length);await input.fill(word.term);await submit.click();await p.waitForFunction(before=>media.slice(before).some(e=>e.type==='playing'),before);assert.equal(await p.locator('html').getAttribute('data-answer-speech-text'),word.term);await p.waitForFunction(before=>media.slice(before).some(e=>e.type==='ended'),before);assert((await p.evaluate(before=>media.slice(before),before)).every(e=>e.src.endsWith('.wav')));
  const outcome=await p.evaluate(()=>{const s=JSON.parse(DanhLearners.storage.getItem('danh-g12-spelling-unit2-v1'));return s.entries[s.order[s.position]].outcome;});assert.equal(outcome,n===0?'first':'corrected');await p.getByRole('button',{name:'Từ tiếp theo →',exact:true}).click();
 }
 await p.locator('#spelling-stage').screenshot({path:path.join(out,'spelling-390.png')});
 const cdp=await c.newCDPSession(p);await cdp.send('DOM.enable');await cdp.send('CSS.enable');await p.evaluate(()=>document.fonts.ready);await cdp.send('DOM.getDocument',{depth:-1,pierce:true});const {result}=await cdp.send('Runtime.evaluate',{expression:"document.querySelector('#spelling-question')"});const {nodeId}=await cdp.send('DOM.requestNode',{objectId:result.objectId});const {fonts}=await cdp.send('CSS.getPlatformFontsForNode',{nodeId});assert(fonts.length&&fonts.every(f=>f.isCustomFont&&/Nunito/i.test(f.familyName)));await cdp.detach();
 for(const term of [1,2]){await p.goto(`${base}/grade/lop12/vocabulary-review.html?term=${term}`);await layout();}
 await p.goto(base+'/grade/lop12/grammar.html?unit=2');await p.waitForFunction(()=>document.body.dataset.grammarReady==='true');assert.equal(await p.locator('#sound-toggle').isVisible(),false);assert.equal(await p.locator('#motion-toggle').isVisible(),false);await layout();await p.screenshot({path:path.join(out,'grammar-390.png'),fullPage:true});
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({passed:true,decoded,flipped,widths:[320,390,834,1280],noFrontImageLeak:true,draftPreserved:true,realWavPlayingEndedFirstAndCorrected:true,localNunito:fonts,noAutoSpeech:true,errors,missing},null,2));console.log('PASS Grade 12: 100 images, 100 cards, mobile/desktop, draft and real answer audio.');
 }finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1});
