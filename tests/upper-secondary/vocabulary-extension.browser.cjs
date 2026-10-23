const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8000';
const baseline=require('../../artifacts/upper-secondary-vocabulary/baseline-units.json');
const out=path.join(root,'artifacts/upper-secondary-vocabulary');
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});try{
  const c=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  await c.addInitScript(()=>{
   Object.defineProperty(window,'speechSynthesis',{value:undefined});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined});
   window.media=[];const Native=window.Audio;window.Audio=function(...args){const a=new Native(...args);for(const type of ['playing','ended'])a.addEventListener(type,()=>media.push({type,src:a.src}));return a;};window.Audio.prototype=Native.prototype;
  });
  const p=await c.newPage(),errors=[],failed=[],results=[];p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failed.push(r.url());});
  await p.goto(base+'/index.html');await p.getByRole('button',{name:'Đăng nhập',exact:true}).click();await p.locator('#learner-name').fill('Mở rộng từ vựng');await p.getByRole('button',{name:'Vào học ngay',exact:true}).click();
  await p.waitForFunction(()=>window.DanhLearners?.current?.name==='Mở rộng từ vựng');
  async function active(g,scope='unit1'){return p.evaluate(({g,scope})=>JSON.parse(DanhLearners.storage.getItem(`danh-g${g}-vocabulary-game-${scope}-v1`)).active,{g,scope});}
  const click=locator=>locator.evaluate(el=>el.click());
  async function audio(text,action){
   const n=await p.evaluate(()=>media.length);await action();
   await p.waitForFunction(({n})=>media.slice(n).some(e=>e.type==='ended'),{n});
   const events=await p.evaluate(n=>media.slice(n),n);assert(events.some(e=>e.type==='playing'));assert(events.some(e=>e.type==='ended'&&e.src.endsWith('.wav')));
   assert.equal(await p.locator('html').getAttribute('data-answer-speech-text'),text);
  }
  for(const g of [10,11,12]){
   // Lượt cũ được tạo bằng ngân hàng thật trước nâng cấp.
   const route=`**/grade/lop${g}/assets/js/units-data.js*`;
   await c.route(route,r=>r.fulfill({contentType:'application/javascript',body:`window.DanhGrade${g}Units=${JSON.stringify(baseline[g])};`}));
   await p.goto(`${base}/grade/lop${g}/unit1.html`);await click(p.locator('[data-tab=quiz]'));await click(p.getByRole('button',{name:'Bắt đầu chơi',exact:true}));
   const k=await p.locator('[data-word-key]').getAttribute('data-word-key');await click(p.locator(`.g6-choice:not([data-answer-key="${k}"])`).first());const old=await active(g);assert.equal(old.items.length,8);
   if(g!==10){await click(p.locator('[data-tab=spelling]'));await p.locator('#spelling-stage input').fill('old draft');}
   await c.unroute(route);await p.reload();await click(p.locator('[data-tab=quiz]'));await click(p.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}));assert.deepEqual(await active(g),old);
   if(g!==10){await click(p.locator('[data-tab=spelling]'));assert.equal(await p.locator('#spelling-stage input').inputValue(),'old draft');assert.equal(await p.evaluate(g=>JSON.parse(DanhLearners.storage.getItem(`danh-g${g}-spelling-unit1-v1`)).order.length,g),8);}
   await p.evaluate(g=>{DanhLearners.storage.removeItem(`danh-g${g}-vocabulary-game-unit1-v1`);DanhLearners.storage.removeItem(`danh-g${g}-spelling-unit1-v1`);},g);
   const newQuiz=[],newSpelling=[];
   for(let u=1;u<=10;u++){
    await p.goto(`${base}/grade/lop${g}/unit${u}.html`);const words=await p.evaluate(({g,u})=>window[`DanhGrade${g}Units`][u-1].words,{g,u});
    assert.equal(await p.locator('.g6-word-card').count(),10);assert.equal(await p.evaluate(()=>media.length),0);
    await p.locator('#vocab-grid').evaluate(async el=>{for(const img of el.querySelectorAll('img')){img.loading='eager';await img.decode();}});
    assert.equal(await p.locator('#vocab-grid img').count(),10);
    assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    assert.equal(await p.locator('#vocab-sound').count(),0);
    if(u===1){for(const width of [320,390,1280]){await p.setViewportSize({width,height:900});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await p.screenshot({path:path.join(out,`grade${g}-vocabulary-${width}.png`),fullPage:true});}await p.setViewportSize({width:390,height:844});}
    await click(p.locator('[data-tab=flashcards]'));
    for(let i=0;i<10;i++){await click(p.locator('#flashcard'));assert((await p.locator('#flashcard').innerText()).includes(words[i].meaning));await click(p.locator('#flash-next'));}
    await click(p.locator('[data-tab=quiz]'));await click(p.getByRole('button',{name:'Bắt đầu chơi',exact:true}));assert.equal((await active(g,`unit${u}`)).items.length,10);
    for(let i=0;i<10;i++){
     const key=await p.locator('[data-word-key]').getAttribute('data-word-key'),id=Number(key.split('-w')[1]),w=words.find(w=>w.id===id),correct=p.locator(`[data-answer-key="${key}"]`);
     if(id>=9){newQuiz.push(`${u}/${id}`);if(u===1&&id===10)await click(p.locator(`.g6-choice:not([data-answer-key="${key}"])`).first());}
     if(u===1&&id>=9)await audio(w.term,()=>click(correct));else await click(correct);
     if(u===1&&id>=9){assert.equal((await active(g)).outcome,id===10?'corrected':'first');const n=await p.evaluate(()=>media.length);await click(correct);assert.equal(await p.evaluate(()=>media.length),n);}
     await click(p.locator('[data-next]'));
    }
    await click(p.locator('[data-tab=spelling]'));
    for(let i=0;i<10;i++){
     const question=await p.locator('#spelling-stage h3').innerText(),meaning=question.replace(/^Gõ tiếng Anh cho: /,''),w=words.find(w=>meaning===w.meaning);assert(w,question);
     const input=p.locator('#spelling-stage input'),submit=p.locator('#spelling-stage button[type=submit]');
     if(w.id>=9){newSpelling.push(`${u}/${w.id}`);if(u===1&&w.id===10){await input.fill('wrong');await click(submit);}}
     await input.fill(w.term);
     if(u===1&&w.id>=9)await audio(w.term,()=>click(submit));else await click(submit);
     assert(await input.isDisabled(),`${g}/${u}: ${w.term}: ${await p.locator('#spelling-stage').innerText()}`);await click(p.getByRole('button',{name:'Từ tiếp theo →',exact:true}));
    }
   }
   assert.equal(new Set(newQuiz).size,20);assert.equal(new Set(newSpelling).size,20);
   // Từ mới xuất hiện trong cả hai học kỳ khi từ cũ đã có bằng chứng đúng ngay.
   for(const term of [1,2]){
    await p.goto(`${base}/grade/lop${g}/vocabulary-review.html?term=${term}`);
    await p.evaluate(({g,term})=>{const history={};for(let u=term===1?1:6;u<=(term===1?5:10);u++)for(let id=1;id<=8;id++)history[`u${u}-w${id}`]={last:'first'};DanhLearners.storage.setItem(`danh-g${g}-vocabulary-game-term${term}-v1`,JSON.stringify({history}));},{g,term});
    await p.reload();await click(p.getByRole('button',{name:'Bắt đầu chơi',exact:true}));const a=await active(g,`term${term}`);assert.equal(a.items.length,10);assert(a.items.every(k=>Number(k.split('-w')[1])>=9));
   }
   results.push({grade:g,words:100,newQuiz:20,newSpelling:20,oldQuizPreserved:true,oldSpellingPreserved:g!==10,audioFirstAndCorrected:true});console.log('PASS lớp '+g);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({passed:true,externalNetworkBlocked:true,webSpeechDisabled:true,results,errors,failed},null,2));
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
