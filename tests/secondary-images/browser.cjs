const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001',out=path.resolve(__dirname,'../../artifacts/grade6-7-image-audit');
fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({headless:true,channel:process.env.BROWSER_CHANNEL||'msedge'});try{
const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[],bad=[];
p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)bad.push(r.url());});
await ctx.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
await p.goto(base+'/grade/lop6/unit1.html');await p.locator('#learner-name').fill('Rà ảnh lớp 6–7');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();await p.waitForFunction(()=>window.DanhLearners?.current?.name==='Rà ảnh lớp 6–7');
await p.evaluate(()=>{for(const g of [6,7])DanhLearners.storage.setItem(`danh-g${g}-unit1`,'[1,2]');});
let photos=0;
for(const grade of [6,7]){
 for(let unit=1;unit<=12;unit++){
  await p.goto(base+`/grade/lop${grade}/unit${unit}.html`);assert.equal(await p.locator('.g6-word-visual').count(),8);
  await p.locator('#vocab-grid').evaluate(async grid=>{for(const img of grid.querySelectorAll('img')){img.loading='eager';await img.decode();}});
  const visuals=await p.locator('.g6-word-visual').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect(),im=n.querySelector('img');return {width:r.width,height:r.height,image:im?{w:im.naturalWidth,h:im.naturalHeight,loaded:im.complete,src:im.getAttribute('src'),fit:getComputedStyle(im).objectFit}:null};}));
  for(const v of visuals){assert.equal(v.width,220);assert.equal(v.height,220);if(v.image){photos++;assert.equal(v.image.w,768);assert.equal(v.image.h,768);assert.equal(v.image.loaded,true);assert.match(v.image.src,/-v2\.webp$/);assert.equal(v.image.fit,'contain');}}
  assert.ok(await p.locator('.g6-word-visual .g6-symbol-art').evaluateAll(nodes=>nodes.every(n=>n.scrollWidth<=n.clientWidth&&n.scrollHeight<=n.clientHeight)),`Biểu tượng bị cắt g${grade} u${unit}`);
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.screenshot({path:path.join(out,`grade${grade}-unit${unit}-mobile.png`),fullPage:true});
  await p.locator('[data-tab=flashcards]').click();
  for(let card=0;card<8;card++){
   assert.equal(await p.locator('.vg-flip-front img,.vg-flip-front .g6-flash-visual').count(),0);
   await p.locator('#flashcard').click();assert.equal(await p.locator('#flashcard').getAttribute('aria-pressed'),'true');
   const size=await p.locator('.vg-flip-back .g6-flash-visual').evaluate(n=>{const r=n.getBoundingClientRect();return [r.width,r.height];});assert.deepEqual(size,[220,220]);
   if(card===0&&[1,2,10].includes(unit))await p.screenshot({path:path.join(out,`grade${grade}-unit${unit}-flash-mobile.png`),fullPage:true});
   await p.locator('#flash-next').click();
  }
 }
 for(const width of [320,390,760,1280]){
  await p.setViewportSize({width,height:900});await p.goto(base+`/grade/lop${grade}/unit2.html`);
  const sizes=await p.locator('.g6-word-visual').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return [r.width,r.height];}));
  for(const size of sizes)assert.deepEqual(size,width<=480?[220,220]:[240,240]);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.screenshot({path:path.join(out,`grade${grade}-${width}.png`),fullPage:true});
 }
 await p.setViewportSize({width:390,height:844});
 await p.goto(base+`/grade/lop${grade}/unit1.html`);assert.equal(await p.evaluate(g=>DanhLearners.storage.getItem(`danh-g${g}-unit1`),grade),'[1,2]');
 await p.locator('[data-tab=quiz]').click();await p.getByRole('button',{name:'Bắt đầu chơi',exact:true}).click();assert.equal(await p.locator('#quiz-stage img').count(),0);assert.equal(await p.locator('.g6-choice').count(),4);
 console.log(`PASS lớp ${grade}: 12 Unit, 96 khung từ/96 mặt nghĩa, bốn chiều rộng, tiến độ cũ và câu kiểm tra kín ảnh.`);
}
assert.equal(photos,19);assert.deepEqual(errors,[]);assert.deepEqual(bad,[]);await ctx.close();
console.log('PASS: 19 ảnh 768 × 768, khung đồng bộ, object-fit contain, không lỗi JavaScript/tài nguyên.');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
