const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/colors-animals-20261031';
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const results=[],errors=[],missing=[];
  for(const [width,height,touch]of [[320,568,true],[390,844,true],[768,1024,true],[1024,768,true],[1280,900,false]]){
   const context=await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,reducedMotion:'reduce'});
   await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
   const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
   for(const topic of ['colors','animals']){
    await p.goto(`${base}/grade/lop2/${topic}.html`);const expected=topic==='colors'?13:50;
    await p.locator('.picture-word-card').first().waitFor();assert.equal(await p.locator('#vocab-grid-container img').count(),expected);
    for(const image of await p.locator('#vocab-grid-container img').all()){
     await image.scrollIntoViewIfNeeded();await image.evaluate(n=>n.decode());
     // naturalWidth is density-corrected for srcset; inspect actual decoded pixels.
     assert(await image.evaluate(async n=>{const bitmap=await createImageBitmap(await(await fetch(n.currentSrc)).blob());const valid=bitmap.width>=384&&bitmap.height>=384;bitmap.close();return valid;}));assert.match(await image.getAttribute('src'),/-pencil-v2\.webp$/);
     assert(await image.evaluate(n=>{const r=n.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1;}),'image fits viewport');
    }
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await p.locator('#vocab-grid-container .picture-word-card').first().scrollIntoViewIfNeeded();await p.screenshot({path:`${out}/${topic}-${width}.png`});
    await p.getByRole('button',{name:'Trò chơi',exact:true}).click();await p.locator('.letter-ladder .word-picture img').waitFor();
    const image=p.locator('.letter-ladder .word-picture img');await image.evaluate(n=>n.decode());assert.match(await image.getAttribute('src'),/-pencil-v2\.webp$/);
    const inputmode=await p.locator('.tg-keyboard').count();if(width>=600&&touch)assert.equal(inputmode,1);
    results.push({topic,width,height,images:expected,gameImage:true,passed:true});
   }
   await context.close();
  }
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);fs.writeFileSync(out+'/browser-results.json',JSON.stringify({passed:true,results,errors,missing},null,2));console.log('PASS all 63 generated images decoded at 5 phone/tablet/desktop sizes, shared game pictures, no missing assets or page errors');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
