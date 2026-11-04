const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765';

(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true,reducedMotion:'no-preference'});
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  await context.addInitScript(()=>{
   Object.defineProperties(screen,{width:{get:()=>1024},height:{get:()=>768}});
   window.reads=[];
   document.addEventListener('danh-answer-speech',e=>reads.push(e.detail));
  });
  const page=await context.newPage();
  const cdp=await context.newCDPSession(page);
  async function tapEdge(button){
   await button.scrollIntoViewIfNeeded();
   const before=await button.boundingBox();
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:before.x+before.width/2,y:before.y+before.height-3}]});
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   assert.deepEqual(await button.boundingBox(),before,'press feedback keeps the hit area stationary');
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  }
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`${base}/grade/lop2/gsunit1.html`);
  await page.getByRole('button',{name:'Trò chơi',exact:true}).tap();
  const stage=page.locator('.letter-ladder:visible'),picture=stage.locator('.word-picture');
  await picture.evaluate(node=>{window.originalPicture=node;});
  const stable=()=>picture.evaluate(node=>node===window.originalPicture);
  const draft=()=>stage.evaluate(node=>DanhLearners.storage.getItem(node.dataset.letterStorage));
  const before=await draft();
  await tapEdge(stage.locator('.ll-tile').first());
  assert.notEqual(await draft(),before,'edge tap places the tile');
  assert(await stable(),'placing a tile preserves the picture');
  await tapEdge(stage.locator('.ll-slot').first());
  assert(await stable(),'returning a tile preserves the picture');
  assert.equal(await draft(),before);
  const tileBox=await stage.locator('.ll-tile').first().boundingBox(),slotBox=await stage.locator('.ll-slot').first().boundingBox();
  for(let i=0;i<6;i++){
   await page.touchscreen.tap(tileBox.x+tileBox.width/2,tileBox.y+tileBox.height/2);
   assert.notEqual(await draft(),before,'rapid tile placement is saved');
   await page.touchscreen.tap(slotBox.x+slotBox.width/2,slotBox.y+slotBox.height/2);
   assert.equal(await draft(),before,'rapid tile return is saved');
  }
  const url=page.url();
  await picture.tap();
  await page.waitForFunction(()=>reads.some(event=>event.state==='ended'));
  assert.equal(await page.evaluate(()=>reads.filter(event=>event.state==='playing').length),1);
  assert.equal(page.url(),url);
  assert.equal(await draft(),before);
  assert(await stable(),'tapping the picture preserves the document and prompt');
  await stage.getByRole('button',{name:'Gợi ý',exact:true}).tap();
  await stage.getByRole('button',{name:'Xem mẫu',exact:true}).tap();
  assert(await stable(),'revealing the answer preserves the picture');
  assert.match(await stage.locator('.ll-status').innerText(),/^Mẫu:/);

  await page.setViewportSize({width:1024,height:500});
  await page.goto(`${base}/grade/lop6/unit1.html`);
  await page.locator('[data-tab=spelling]').tap();
  const field=page.locator('#spelling-stage input'),art=page.locator('#spelling-stage .gl-task-picture > *');
  await art.evaluate(node=>{window.originalPicture=node;});
  const keyboard=page.locator('.tg-keyboard');
  await keyboard.waitFor({state:'attached'});
  assert.equal(await keyboard.isVisible(),false);
  await field.tap();
  await keyboard.waitFor();
  assert(await keyboard.locator('[data-key="b"]').evaluate(node=>{
   const move=new TouchEvent('touchmove',{bubbles:true,cancelable:true,touches:[new Touch({identifier:1,target:node})]});
   return node.dispatchEvent(move);
  }),'the page scroll guard does not cancel touch movement on a key');
  const key=letter=>keyboard.locator(`[data-key="${letter}"]`).tap();
  await tapEdge(keyboard.locator('[data-key="b"]'));
  for(const letter of 'alloon')await key(letter);
  assert.equal(await field.inputValue(),'balloon');
  await field.evaluate(node=>node.setSelectionRange(1,4));
  await key('i');
  await keyboard.locator('[data-action=delete]').tap();
  await page.keyboard.type('a');
  assert.equal(await field.inputValue(),'baoon');
  assert(await art.evaluate(node=>node===window.originalPicture));
  const lessonUrl=page.url();
  await art.tap();
  await page.waitForFunction(()=>reads.some(event=>event.state==='ended'));
  assert.equal(page.url(),lessonUrl);
  assert.equal(await field.inputValue(),'baoon');
  assert(await art.evaluate(node=>node===window.originalPicture));
  assert.deepEqual(errors,[]);
  console.log('PASS picture identity, tap without navigation, stable draft, short iPad keyboard, repeated touch, selection and external typing');
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
