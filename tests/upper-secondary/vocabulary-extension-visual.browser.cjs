const {chromium}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8000',out=path.resolve(__dirname,'../../artifacts/upper-secondary-vocabulary');
(async()=>{const b=await chromium.launch({channel:'msedge',headless:true});try{
 const c=await b.newContext({reducedMotion:'reduce'});await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());const p=await c.newPage();
 await p.goto(base+'/index.html');await p.getByRole('button',{name:'Lưu dữ liệu học',exact:true}).click();await p.locator('#learner-name').fill('Kiểm tra tranh và dấu');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();
 await p.waitForFunction(()=>window.DanhLearners?.current?.name==='Kiểm tra tranh và dấu');
 for(const g of [10,11,12]){
  await p.goto(`${base}/grade/lop${g}/unit1.html`);await p.locator('[data-tab=vocabulary]').click();
  await p.locator('#vocab-grid').evaluate(async el=>{for(const img of el.querySelectorAll('img')){img.loading='eager';await img.decode();}});await p.evaluate(()=>document.fonts.ready);
  const cdp=await c.newCDPSession(p);await cdp.send('DOM.enable');await cdp.send('CSS.enable');await cdp.send('DOM.getDocument',{depth:-1,pierce:true});
  const {result}=await cdp.send('Runtime.evaluate',{expression:"document.querySelector('#vocab-grid article:nth-child(10) .g6-meaning')"});const {nodeId}=await cdp.send('DOM.requestNode',{objectId:result.objectId});const {fonts}=await cdp.send('CSS.getPlatformFontsForNode',{nodeId});assert(fonts.length&&fonts.every(f=>f.isCustomFont&&/Nunito/i.test(f.familyName)));await cdp.detach();
  for(const width of [390,1280]){
   await p.setViewportSize({width,height:900});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await p.screenshot({path:path.join(out,`grade${g}-vocabulary-${width}.png`),fullPage:true});
   await p.locator('#vocab-grid article:nth-child(9)').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,`grade${g}-new-words-${width}.png`)});
  }
  console.log(`PASS lớp ${g}: tranh, bố cục và glyph Nunito nội bộ.`);
 }
}finally{await b.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
