/* Read-only smoke audit in a fresh browser; never changes the published site. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
const base='https://danhlearning.github.io/Danh_English_Tutor/',out='artifacts/live-audit-20261028';fs.mkdirSync(out,{recursive:true});
const topics=['adjectives','animals','bodyparts','clothes','colors','dates','familyfriends','feeling','fooddrinks','fruits','householditems','numbers','rooms','schoolsupplies','shapes','toys','transport','verbs','weather'];
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true});
  await context.addInitScript(()=>{window.auditMedia=[];document.addEventListener('danh-answer-speech',e=>auditMedia.push({...e.detail,at:performance.now()}));});
  const page=await context.newPage(),records=[],errors=[],missing=[],failed=[];
  page.on('pageerror',e=>errors.push({page:page.url(),error:e.message}));
  page.on('response',r=>{if(r.status()>=400)missing.push({page:page.url(),url:r.url(),status:r.status()});});
  page.on('requestfailed',r=>{if(!/ERR_ABORTED/.test(r.failure()?.errorText||''))failed.push({page:page.url(),url:r.url(),error:r.failure()?.errorText});});
  async function visit(path){const start=Date.now(),response=await page.goto(base+path,{waitUntil:'load',timeout:45000});await page.waitForTimeout(250);const record=await page.evaluate(({path,status,loadMs})=>({path,status,loadMs,title:document.title,profileScript:[...document.scripts].find(s=>s.src.includes('learner-profile.js'))?.src,tabletFrameAvailable:!!window.DanhTabletGame,offlineLinks:document.querySelectorAll('a[href$="offline.html"]').length,horizontalOverflow:document.documentElement.scrollWidth>innerWidth+1,brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.currentSrc||i.src)}),{path,status:response.status(),loadMs:Date.now()-start});records.push(record);return record;}
  await visit('');await page.screenshot({path:out+'/home-ipad.png'});
  for(let grade=1;grade<=12;grade++){
   const record=await visit(`grade/lop${grade}/${grade===2?'gsunit1':'unit1'}.html`);
   if(grade<=5)await page.getByRole('button',{name:'Trò chơi',exact:true}).click();else await page.locator('[data-tab=spelling]').click();
   record.game=await page.evaluate(()=>{const panel=document.querySelector('.tab-content.active[id^="game-"],#spelling:not([hidden])');return {visible:!!panel&&panel.getClientRects().length>0,fixed:!!window.DanhTabletGame?.active,customKeyboard:!!document.querySelector('.tg-keyboard'),pageScrollable:document.documentElement.scrollHeight>innerHeight+1};});
   console.log('PASS grade '+grade+' page '+record.status+' game '+record.game.visible);
   if(grade===6){await page.screenshot({path:out+'/grade6-game-ipad.png'});}
  }
  for(const topic of topics){const record=await visit(`grade/lop2/${topic}.html`);record.cards=await page.locator('[data-danh-card-listen]').count();console.log('PASS topic '+topic+' page '+record.status+' cards '+record.cards);}
  const listen=async(label,selector)=>{
   const card=page.locator(selector).first();await card.scrollIntoViewIfNeeded();const term=await card.getAttribute('data-danh-card-listen'),before=await page.evaluate(()=>auditMedia.length);const clicked=await card.evaluate(n=>{const at=performance.now();n.click();return at;});
   try{await page.waitForFunction(before=>auditMedia.slice(before).some(e=>e.state==='ended'||e.state==='error'),before,{timeout:12000});}catch{}
   const events=await page.evaluate(before=>auditMedia.slice(before),before);return {label,term,events:events.map(e=>({...e,delayMs:e.at-clicked})),plays:events.filter(e=>e.state==='playing').length,ended:events.some(e=>e.state==='ended')};
  };
  await visit('grade/lop2/fooddrinks.html');const first=await listen('first vocabulary card','[data-danh-card-listen]');
  const lastCard=page.locator('[data-danh-card-listen]').last();await lastCard.scrollIntoViewIfNeeded();const before=await page.evaluate(()=>auditMedia.length);await lastCard.click();try{await page.waitForFunction(before=>auditMedia.slice(before).some(e=>e.state==='ended'),before,{timeout:12000});}catch{}
  const last={term:await lastCard.getAttribute('data-danh-card-listen'),events:await page.evaluate(before=>auditMedia.slice(before),before)};
  await page.setViewportSize({width:390,height:844});await page.screenshot({path:out+'/fooddrinks-phone.png'});
  await page.setViewportSize({width:1024,height:768});await visit('grade/lop2/clothes.html');await page.getByRole('button',{name:'Trò chơi',exact:true}).click();await page.locator('[data-game=game-count]').click();await page.waitForTimeout(1200);await page.screenshot({path:out+'/clothes-sentence-ipad.png'});
  const clothes=await page.evaluate(()=>({text:document.querySelector('#count-items-container')?.textContent,input:!!document.querySelector('#count-sentence-input'),fixed:!!window.DanhTabletGame?.active,scrollHeight:document.documentElement.scrollHeight,viewportHeight:innerHeight}));
  const result={base,checkedAt:new Date().toISOString(),records,first,last,clothes,errors,missing,failed};fs.writeFileSync(out+'/results.json',JSON.stringify(result,null,2));console.log(JSON.stringify({pages:records.length,errors,missing,failed,first,clothes}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
