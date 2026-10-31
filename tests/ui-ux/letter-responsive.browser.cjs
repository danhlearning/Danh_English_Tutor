const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765';
const out='artifacts/letter-responsive';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:768,height:1024},screen:{width:768,height:1024},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  await context.addInitScript(()=>{Object.defineProperty(screen,'width',{get:()=>768});Object.defineProperty(screen,'height',{get:()=>1024});});
  const page=await context.newPage(),results=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const path of ['/grade/lop2/gsunit1.html?game=letters','/grade/lop6/unit1.html?game=letters']){
   await page.goto(base+path);
   if(!path.includes('lop2'))await page.locator('[data-tab=letters]').click();
   await page.locator('.letter-ladder:visible .ll-slot').first().waitFor();
   // A long vocabulary phrase exercises wrapping and the final typing level.
   await page.evaluate(()=>{
    const stage=document.querySelector('.letter-ladder'),words=[{id:'long',name:'environmentally friendly',meaning:'thân thiện với môi trường, giúp bảo vệ thiên nhiên',visual:'<span aria-hidden="true">🌳</span>'}];
    const instance=window.testLetters=window.DanhLetterLadder.mount({topic:'responsive-test',words,storage:{getItem:()=>null,setItem:()=>{}},selected:()=>['long'],allowStandalone:false,goSpelling:()=>instance.render(stage,true),rerender:()=>instance.render(stage,true)});
    instance.render(stage);
    const g=instance.game;
    while(g.state.active.phase<3){const t=g.entry();for(const i of t.holes){g.choose(t.tiles.findIndex((c,n)=>!t.draft.includes(n)&&c===g.word().name[i]));}g.check();g.next();g.advance();}
    instance.render(stage);
   });
   for(const phase of [3,4]){
   if(phase===4)await page.evaluate(()=>{const g=testLetters.game,t=g.entry();for(const i of t.holes)g.choose(t.tiles.findIndex((c,n)=>!t.draft.includes(n)&&c===g.word().name[i]));g.check();g.next();g.advance();testLetters.render(document.querySelector('.letter-ladder'),true);const input=window.savedAnswer=document.querySelector('.ll-input');input.value='draft';input.dispatchEvent(new Event('input',{bubbles:true}));});
   for(const [width,height]of [[768,1024],[1024,768],[744,1133],[1133,744],[820,1180],[1180,820],[834,1194],[1194,834],[1024,1366],[1366,1024],[600,744],[507,768],[320,568],[568,320],[375,667],[667,375],[390,844],[844,390],[430,932],[932,430],[1024,600],[600,520]]){
    await page.setViewportSize({width,height});await page.waitForTimeout(100);
    await page.waitForFunction(()=>document.querySelector('.tg-bar')?.getBoundingClientRect().height>=56);
    await page.waitForFunction(height=>{const panel=document.querySelector('.tg-panel'),bar=document.querySelector('.tg-bar');return panel&&bar&&panel.getBoundingClientRect().bottom<=height+1&&Math.abs(panel.getBoundingClientRect().top-bar.getBoundingClientRect().bottom)<=1;},height);
    const result=await page.evaluate(()=>{
     const stage=document.querySelector('.letter-ladder'),panel=document.querySelector('.tg-panel'),bar=document.querySelector('.tg-bar');
     const rect=n=>{const r=n.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom,right:r.right};};
     const clipped=[...stage.querySelectorAll('.ll-slot,.ll-tile,.ll-actions button')].filter(n=>!n.hidden&&n.getClientRects().length).map(n=>({text:n.textContent,rect:rect(n)})).filter(({rect:r})=>panel&&(r.bottom>rect(panel).bottom+1||r.x<0||r.right>innerWidth));
     return {screen:[screen.width,screen.height,navigator.maxTouchPoints,innerWidth],active:!!panel,stage:rect(stage),panel:panel&&rect(panel),overflow:document.documentElement.scrollWidth>innerWidth+1,clipped,bar:bar&&{width:bar.clientWidth,scroll:bar.scrollWidth}};
    });
    results.push({path,phase,width,height,...result});
    assert(result.active,'iPad keeps frame in narrow windows');assert(!result.overflow,'no horizontal page overflow');assert(result.bar.scroll<=width+1,'bar fits');assert(result.panel.bottom<=height+1,`panel fits viewport: ${path} phase ${phase} ${width}x${height} bottom ${result.panel.bottom}`);
    if(phase===4){assert.equal(await page.locator('.ll-input').inputValue(),'draft');assert(await page.evaluate(()=>savedAnswer===document.querySelector('.ll-input')),'resize preserves the live input');}
    const k=page.locator('.tg-keyboard');if(await k.isVisible())assert(result.panel.bottom<=(await k.boundingBox()).y+1,'keyboard never covers panel');
    for(const slot of await page.locator('.letter-ladder .ll-slot').all()){const r=await slot.boundingBox();assert(r.width>=44&&r.height>=44,'touchable letter slots');}
    if(result.clipped.length){
     const before=await page.evaluate(()=>JSON.stringify(testLetters.game.state));
     await page.locator('.tg-expand').waitFor({state:'visible'});await page.locator('.tg-expand').click();
     const check=page.locator('.letter-ladder .ll-primary').first();await check.scrollIntoViewIfNeeded();
     const r=await check.boundingBox(),p=await page.locator('.tg-panel').boundingBox();assert(r.y>=p.y-1&&r.y+r.height<=p.y+p.height+1,'long content controls reachable');
     assert.equal(await page.evaluate(()=>JSON.stringify(testLetters.game.state)),before,'reading preserves progress');
     if(width===320)await page.screenshot({path:out+'/'+(path.includes('lop2')?'g2':'g6')+'-phase'+phase+'-split-reading.png'});
     await page.locator('.tg-expand').click();
    }
    if(width===1024&&height===768)await page.screenshot({path:out+'/'+(path.includes('lop2')?'g2':'g6')+'-phase'+phase+'-landscape.png'});
   }
   if(phase===4){
    await page.setViewportSize({width:507,height:768});await page.waitForTimeout(100);
    await page.screenshot({path:out+'/'+(path.includes('lop2')?'g2':'g6')+'-split-keyboard.png'});
    await page.locator('.ll-input').evaluate(n=>n.setSelectionRange(1,3));await page.locator('.tg-keyboard [data-key=x]').click();assert.equal(await page.locator('.ll-input').inputValue(),'dxft');
    await page.locator('.tg-keyboard [data-action=delete]').click();assert.equal(await page.locator('.ll-input').inputValue(),'dft');
    await page.locator('.tg-keyboard [data-action=submit]').click();assert.match(await page.locator('.ll-status').innerText(),/Chưa khớp/);
   }}
  }
  // Real entry points across all grades use the same responsive surface.
  for(let grade=1;grade<=12;grade++){
   await page.setViewportSize({width:768,height:1024});
   await page.goto(`${base}/grade/lop${grade}/${grade===2?'gsunit1':'unit1'}.html${grade<=5?'?game=letters':''}`);
   if(grade>=6)await page.locator('[data-tab=letters]').click();
   await page.locator('.ll-slot').first().waitFor();await page.waitForFunction(()=>DanhTabletGame.active);
   await page.setViewportSize({width:1024,height:600});await page.waitForTimeout(100);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   const before=await page.locator('.letter-ladder').innerText();await page.setViewportSize({width:507,height:768});await page.waitForTimeout(100);assert.equal(await page.locator('.letter-ladder').innerText(),before,'rotation does not rebuild the question');
   results.push({grade,device:'iPad',realEntry:true,passed:true});
  }
  // Real phone screen sizes, both orientations. The iPad dock must stay absent.
  for(const [w,h]of [[320,568],[375,667],[390,844],[430,932],[360,800],[412,915]]){
   const phone=await browser.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:true});
   await phone.addInitScript(({w,h})=>{Object.defineProperty(screen,'width',{get:()=>w});Object.defineProperty(screen,'height',{get:()=>h});},{w,h});
   await phone.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
   const p=await phone.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(base+'/grade/lop2/gsunit1.html?game=letters');await p.locator('.ll-slot').first().waitFor();
   for(const [width,height]of [[w,h],[h,w]]){
    await p.setViewportSize({width,height});await p.waitForTimeout(100);
    assert.equal(await p.evaluate(()=>DanhTabletGame.active),false,'phone stays in native layout when rotated');assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'phone no overflow');
    const check=p.locator('.letter-ladder .ll-primary');await check.scrollIntoViewIfNeeded();await check.click();assert(await p.locator('.ll-status').innerText(),'phone feedback');
    const slot=p.locator('.ll-slot').first(),r=await slot.boundingBox();assert(r.width>=44&&r.height>=44);
    results.push({device:'phone',width,height,passed:true});
   }
   await phone.close();
  }
  assert.deepEqual(errors,[]);fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,results,errors},null,2));console.log('PASS '+results.length+' tablet/phone layouts, long-content access and 44px letter targets');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
