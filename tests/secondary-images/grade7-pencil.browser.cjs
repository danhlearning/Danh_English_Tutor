const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001',out=path.resolve(__dirname,'../../artifacts/grade7-pencil');
(async()=>{
 const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  const page=await context.newPage(),errors=[],missing=[],records=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  for(const width of [320,390,1280]){
   await page.setViewportSize({width,height:900});
   await page.goto(`${base}/grade/lop7/lop7.html`);assert.equal(await page.locator('.g6-unit-card').count(),12);
   await page.screenshot({path:path.join(out,`catalog-${width}.png`),fullPage:true});
   for(let unit=1;unit<=12;unit++){
    await page.goto(`${base}/grade/lop7/unit${unit}.html`);
    await page.waitForFunction(()=>document.querySelectorAll('#vocab-grid img').length===8);
    assert.equal(await page.locator('.g6-tab').count(),5);assert.equal(await page.locator('#vocab-grid img').count(),8);
    await page.locator('#vocab-grid img').evaluateAll(async imgs=>{for(const img of imgs){img.loading='eager';await img.decode();if(img.naturalWidth!==768)throw Error(img.src);}});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    assert.equal(await page.locator('.vg-settings:visible').count(),0);
    assert(await page.locator('.g6-meaning').first().evaluate(el=>getComputedStyle(el).fontFamily.includes('Danh Nunito')));
    if(unit===1)await page.screenshot({path:path.join(out,`unit1-${width}.png`),fullPage:true});
    if(width===390){
     await page.locator('[data-tab=flashcards]').click();
     for(let word=0;word<8;word++){
      assert.equal(await page.locator('#flashcard .vg-flip-front img').count(),0);
      assert.equal(await page.locator('#flashcard').getAttribute('aria-pressed'),'false');
      await page.locator('#flashcard').click();
      assert.equal(await page.locator('#flashcard').getAttribute('aria-pressed'),'true');
      await page.locator('#flashcard img').evaluate(img=>img.decode());
      const src=await page.locator('#flashcard img').getAttribute('src');assert(src.endsWith(`/unit${unit}/${word+1}-v1.webp`));
      if(unit===1&&word===0)await page.screenshot({path:path.join(out,'flashcard-390.png'),fullPage:true});
      if(word<7)await page.locator('#flash-next').click();
     }
    }
    records.push({unit,width,images:8,overflow:false});
   }
  }
  // The learning flow remains usable when one illustration cannot load.
  await page.route('**/pencil/unit1/1-v1.webp',r=>r.abort());
  await page.goto(`${base}/grade/lop7/unit1.html`);
  await page.waitForFunction(()=>document.querySelector('#vocab-grid .g6-symbol-art'));
  assert.equal(await page.locator('#vocab-grid .g6-word-card').count(),8);
  assert.equal(await page.locator('#vocab-grid .g6-symbol-art').first().textContent(),'🎨');
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
  fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({passed:true,externalNetworkBlocked:true,unitPages:36,flashcardImages:96,fallback:true,records,errors,missing},null,2));
  console.log('PASS lớp 7: 36 trang Unit, 96 mặt thẻ, Nunito nội bộ, fallback, 320/390/1280px, chặn mạng ngoài.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
