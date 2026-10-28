const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/colors-pencil-sync';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:1024,height:768},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 await context.addInitScript(()=>{window.reads=[];document.addEventListener('danh-answer-speech',e=>reads.push(e.detail));});
 const p=await context.newPage(),errors=[],missing=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
 await p.goto(base+'/grade/lop2/colors.html');await p.locator('#vocab-grid-container img').first().waitFor();assert.equal(await p.locator('#vocab-grid-container img').count(),13);assert.equal(await p.evaluate(()=>reads.length),0);
 const sources=await p.locator('#vocab-grid-container img').evaluateAll(ns=>ns.map(n=>n.src));assert.equal(new Set(sources).size,13);
 for(const image of await p.locator('#vocab-grid-container img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(n=>n.decode());assert(await image.evaluate(n=>n.naturalWidth>0));}
 await p.getByRole('button',{name:'Trò chơi',exact:true}).click();await p.waitForFunction(()=>window.DanhTabletGame?.active);await p.evaluate(()=>document.querySelector('[data-game="game-count"]').click());
 await p.waitForFunction(()=>document.querySelector('#game-count').classList.contains('tg-panel')&&document.body.classList.contains('tg-typing'));
 const answers=[];
 for(let index=0;index<13;index++){
  const color=await p.locator('#count-items-container img').getAttribute('src').then(src=>src.match(/\/([^/]+)-pencil-v1\.svg$/)[1]);
  const answer=`It is ${color}.`,before=await p.evaluate(()=>reads.length);
  if(index===0){for(const char of answer.toLowerCase()){if(char===' ')await p.locator('.tg-keyboard [data-action=space]').click();else await p.locator(`.tg-keyboard [data-key="${char}"]`).click();}}
  else await p.locator('#count-sentence-input').fill(answer);
  await p.locator('.tg-keyboard [data-action=submit]').click();await p.waitForFunction(before=>reads.slice(before).some(e=>e.state==='ended'),before);
  assert.match(await p.locator('#count-feedback').innerText(),/Chính xác/);assert((await p.locator('#count-score').innerText()).includes(`Đã học ${index+1}/13`));answers.push(color);
  if(index===0){await p.screenshot({path:out+'/colors-ipad-sentence.png'});}
  if(index<12){await p.locator('.g2-game4-next').click();await p.waitForFunction(()=>document.body.classList.contains('tg-typing'));}
 }
 assert.equal(new Set(answers).size,13);
 await p.locator('.tg-bar button').first().click();await p.waitForFunction(()=>!DanhTabletGame.active);
 await p.setViewportSize({width:768,height:1024});await p.getByRole('button',{name:'Trò chơi',exact:true}).click();await p.waitForFunction(()=>DanhTabletGame.active);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.screenshot({path:out+'/colors-ipad-portrait.png'});
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.writeFileSync(out+'/browser-results.json',JSON.stringify({passed:true,illustrations:13,allSentences:answers,ipadKeyboard:true,errors,missing},null,2));console.log('PASS 13 pencil illustrations, all 13 sentence answers with real audio, shared game scoring and iPad keyboard');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
