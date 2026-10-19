const {chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});const records=[];
 if(process.argv.includes('--complete'))assert.equal(JSON.parse(fs.readFileSync(__dirname+'/individual-review.json','utf8')).records.length,96);
 try{
 const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await c.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8001')?r.continue():r.abort());
 const p=await c.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:8001/grade/lop6/unit2.html');if(await p.getByRole('button',{name:'Đăng nhập',exact:true}).isVisible())await p.getByRole('button',{name:'Đăng nhập',exact:true}).click();await p.locator('#learner-name').fill('Tranh bút chì lớp 6');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(()=>window.DanhLearners?.current);
 for(const width of [390,1280,320,760]){await p.setViewportSize({width,height:844});for(let unit=1;unit<=12;unit++){
  await p.goto('http://127.0.0.1:8001/grade/lop6/unit'+unit+'.html');
  const images=await p.locator('#vocab-grid img').evaluateAll(async nodes=>Promise.all(nodes.map(async img=>{img.loading='eager';await img.decode();const r=img.getBoundingClientRect();return {width:r.width,height:r.height,natural:img.naturalWidth,src:img.getAttribute('src')};})));
  const expected=await p.evaluate(n=>Object.keys(window.DanhGrade6PencilImages?.['unit'+n]||{}).length,unit);
  assert.equal(images.length,expected);assert(images.every(i=>i.natural===768&&Math.abs(i.width-i.height)<1&&i.width===(width<=480?220:240)));
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(width===390&&unit===2)await p.screenshot({path:__dirname+'/unit2-mobile.png',fullPage:true});
  await p.locator('[data-tab=flashcards]').click();assert.equal(await p.locator('#flashcard .vg-flip-front img').count(),0);
  await p.locator('#flashcard').click();
  if(unit===2&&width===390){await p.screenshot({path:__dirname+'/unit2-flip-mobile.png',fullPage:true});assert(await p.locator('#flashcard img').count());}
  await p.locator('[data-tab=quiz]').click();assert(await p.locator('#quiz-stage').isVisible());
  records.push({unit,width,images:images.length});
 }}
 await p.goto('http://127.0.0.1:8001/grade/lop6/unit2.html');
 // One failed image swaps to the existing local symbol, without retries.
 await p.evaluate(()=>document.querySelector('#vocab-grid img').src='./not-an-image.webp');
 await p.waitForFunction(()=>document.querySelector('#vocab-grid .g6-word-visual .g6-symbol-art'));
 assert.equal(await p.locator('#vocab-grid article').count(),8);
 assert.deepEqual(errors,[]);fs.writeFileSync(__dirname+'/browser-results.json',JSON.stringify({passed:true,records,errors},null,2));
 console.log(`PASS ${records.length} views; current reviewed images decoded at square size; flashcards/quiz and fallback`);
 await c.close();
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
