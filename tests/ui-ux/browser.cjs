const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {initLearner}=require('../learner-profiles/browser-helper.cjs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001',out=path.resolve(__dirname,'../../artifacts/ui-ux-20261022');
fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await initLearner(context);const p=await context.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));
 const fits=async label=>assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),label);
 for(const width of [320,390,760,1280]){
  await p.setViewportSize({width,height:844});await p.goto(base+'/skills.html');await p.evaluate(()=>document.fonts.ready);await fits(`skills ${width}`);
  const cards=p.locator('.skills-grid .card');assert.equal(await cards.count(),4);
  for(const card of await cards.all()){
   const bounds=await card.boundingBox();assert(bounds.height>=44&&bounds.height<180,`compact skill card ${width}`);
   assert(await card.locator('h2').evaluate(n=>n.clientWidth>=110));
  }
  await p.screenshot({path:path.join(out,`skills-${width}.png`),fullPage:true});
  await p.evaluate(()=>document.documentElement.style.fontSize='200%');await fits(`large text skills ${width}`);
  for(const card of await cards.all())assert(await card.evaluate(n=>n.scrollWidth<=n.clientWidth+1),`large text card ${width}`);
 }
 await p.setViewportSize({width:390,height:844});await p.goto(base+'/index.html');
 const manage=p.getByRole('button',{name:'Hồ sơ',exact:true});await manage.click();
 await p.getByRole('button',{name:'✏️ Đổi tên / bạn đồng hành',exact:true}).click();await p.locator('#learner-name').focus();
 for(let i=0;i<30;i++){await p.keyboard.press(i<15?'Tab':'Shift+Tab');assert(await p.locator('danh-learner').evaluate(n=>n.shadowRoot.querySelector('.sheet').contains(n.shadowRoot.activeElement)));}
 await p.keyboard.press('Escape');assert(await manage.evaluate(n=>n.getRootNode().activeElement===n),'restore original trigger after edit');
 await manage.click();await p.getByRole('button',{name:'Xóa hồ sơ này',exact:true}).click();await p.getByRole('button',{name:'Giữ lại hồ sơ',exact:true}).click();await p.keyboard.press('Escape');assert(await manage.evaluate(n=>n.getRootNode().activeElement===n),'restore after nested screens');
 const switcher=p.getByRole('button',{name:'Đổi người học',exact:true});await switcher.click();await p.getByRole('button',{name:'+ Thêm người học',exact:true}).click();await p.getByRole('button',{name:'← Chọn tên có sẵn',exact:true}).click();await p.keyboard.press('Escape');assert(await switcher.evaluate(n=>n.getRootNode().activeElement===n),'restore after create/back');
 assert.equal(await p.locator('main').evaluate(n=>n.inert),false);
 for(const g of [6,7,8,9,10,11,12]){
  await p.goto(`${base}/grade/lop${g}/unit1.html`);const tabs=p.getByRole('tab');await tabs.first().focus();await p.keyboard.press('ArrowRight');
  assert.equal(await p.locator('[data-tab=flashcards]').getAttribute('aria-selected'),'true');assert.equal(await p.locator('[role=tab][tabindex="0"]').count(),1);
  await p.keyboard.press('End');assert.equal(await p.locator('[data-tab=grammar]').getAttribute('aria-selected'),'true');await p.keyboard.press('ArrowRight');assert.equal(await tabs.first().getAttribute('aria-selected'),'true');
  await p.keyboard.press('ArrowLeft');assert.equal(await p.locator('[data-tab=grammar]').getAttribute('aria-selected'),'true');await p.keyboard.press('Home');
  for(const tab of await tabs.all()){const id=await tab.getAttribute('aria-controls');assert(id);assert.equal(await p.locator('#'+id).getAttribute('aria-labelledby'),await tab.getAttribute('id'));}
  assert.equal(await p.locator('#vocabulary').getAttribute('tabindex'),'0');await p.keyboard.press('Tab');assert(await p.locator('#vocabulary').evaluate(n=>n===document.activeElement));
  for(const link of await p.locator('.g6-lesson-main>.g6-note>a').all())assert((await link.boundingBox()).height>=44);
  for(const width of [320,390,760,1280]){await p.setViewportSize({width,height:844});await fits(`secondary ${g} ${width}`);if(g===6&&[320,1280].includes(width))await p.screenshot({path:path.join(out,`secondary-${width}.png`),fullPage:true});}
 }
 for(const url of ['grade/lop2/bodyparts.html','grade/lop2/gsunit1.html']){
  await p.goto(`${base}/${url}`);for(const b of await p.locator('.audio-btn,.g2-audio').all()){if(await b.isVisible()){const r=await b.boundingBox();assert(r.width>=44&&r.height>=44,url);}}
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({passed:true,skillsWidths:[320,390,760,1280],skillsLargeText:true,modalNestedFocus:true,keyboardTabs:[6,7,8,9,10,11,12],touchTargets:true,externalNetworkBlocked:true,errors},null,2));console.log('PASS skill cards, 200% text, nested dialog focus, seven grades keyboard tabs, phone touch targets');
}finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
