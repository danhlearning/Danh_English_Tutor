const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/animals-pencil';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:1024,height:768},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 await context.addInitScript(()=>{window.reads=[];document.addEventListener('danh-answer-speech',e=>reads.push(e.detail));});
 const p=await context.newPage(),errors=[],missing=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 await p.goto(base+'/grade/lop2/animals.html');await p.locator('.picture-word-card').first().waitFor();assert.equal(await p.evaluate(()=>reads.length),0);
 const images=p.locator('#vocab-grid-container img');assert.equal(await images.count(),50);
 for(const img of await images.all()){await img.scrollIntoViewIfNeeded();await img.evaluate(n=>n.decode());assert.match(await img.getAttribute('src'),/pencil\/animals\/.*-pencil-v2.webp/);}
 await p.screenshot({path:out+'/vocabulary-ipad.png'});
 const sheet=await context.newPage();await sheet.goto(base+'/grade/lop2/animals.html');await sheet.evaluate(()=>{document.body.innerHTML='<div id="sheet" style="display:grid;grid-template-columns:repeat(10,1fr);gap:6px">'+animalsList.map(w=>`<div style="text-align:center;font:14px sans-serif"><img src="${w.image}" style="width:100%;height:95px;object-fit:contain"><br>${w.name}</div>`).join('')+'</div>';});await sheet.locator('img').evaluateAll(ns=>Promise.all(ns.map(n=>n.decode())));await sheet.screenshot({path:out+'/all-50.png',fullPage:true});await sheet.close();
 await p.getByRole('button',{name:'Trò chơi',exact:true}).click();await p.waitForFunction(()=>DanhTabletGame.active);await p.getByRole('combobox',{name:'Chọn trò chơi'}).selectOption('game-count');await p.waitForFunction(()=>document.body.classList.contains('tg-typing'));
 const sentences=[];
 for(let index=0;index<16;index++){
  const q=await p.evaluate(()=>({...countList[countIdx],emoji:undefined})),answer=`There ${q.count===1?'is':'are'} ${q.count} ${q.count===1?q.itemSingular:q.itemPlural}`;
  assert.equal(await p.locator('#count-items-container img').count(),q.count);
  await p.locator('#count-items-container img').evaluateAll(ns=>Promise.all(ns.map(n=>n.decode())));
  assert(await p.locator('#count-items-container img').first().evaluate(n=>n.getBoundingClientRect().width>=40));
  const before=await p.evaluate(()=>reads.length);
  if(index===0)await p.screenshot({path:out+'/keyboard-ipad.png'});
  await p.locator('#count-sentence-input').fill(answer);await p.locator('.tg-keyboard [data-action=submit]').click();await p.waitForFunction(n=>reads.slice(n).some(e=>e.state==='ended'),before);
  assert.match(await p.locator('#count-feedback').innerText(),/Chính xác/);assert((await p.locator('#count-score').innerText()).includes(`Đã học ${index+1}/16`));sentences.push(answer);
  if(index===0)await p.screenshot({path:out+'/count-ipad.png'});
  assert(await p.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1));
  if(index<15){await p.locator('.g2-game4-next').click();await p.waitForFunction(()=>document.body.classList.contains('tg-typing'));}
 }
 assert.equal(new Set(sentences).size,16);
 await p.locator('.tg-bar button').first().click();await p.setViewportSize({width:768,height:1024});await p.getByRole('button',{name:'Trò chơi',exact:true}).click();await p.waitForFunction(()=>DanhTabletGame.active);await p.screenshot({path:out+'/portrait-ipad.png'});
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,images:50,sentences,errors,missing},null,2));console.log('PASS 50 Animals pictures, 16 counting sentences with real audio and iPad keyboard');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
