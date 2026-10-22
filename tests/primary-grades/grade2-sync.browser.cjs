const {chromium}=require('playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8015',out=path.resolve(__dirname,'../../artifacts/primary-grade2-sync');fs.mkdirSync(out,{recursive:true});
const read=(p,k)=>p.evaluate(k=>JSON.parse(DanhLearners.storage.getItem(k)),k);
(async()=>{
 const b=await chromium.launch({channel:'msedge',headless:true});
 try{
  const c=await b.newContext({viewport:{width:390,height:844}}),p=await c.newPage(),errors=[],missing=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  await c.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());
  await c.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined});window.mediaEvents=[];const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(...args){if(!this.dataset.audit){this.dataset.audit='true';for(const type of ['playing','ended'])this.addEventListener(type,()=>mediaEvents.push([type,this.src]));}return play.apply(this,args);};});
  const grades=(process.env.PRIMARY_CHECK_GRADES||'1,3,4,5').split(',').map(Number);
  for(const grade of grades){
   await p.goto(`${base}/grade/lop${grade}/lop${grade}.html`);assert.equal(await p.locator('.unit-grid>a').count(),grade===1?16:20);assert.equal(await p.locator('.shared-topic-card').count(),19);
   await p.screenshot({path:path.join(out,`g${grade}-catalog-mobile.png`),fullPage:true,animations:'disabled'});
   for(let n=1;n<=(grade===1?16:20);n++){
    await p.goto(`${base}/grade/lop${grade}/unit${n}.html`);await p.waitForSelector('.g2-vocab-card');
    assert.equal(await p.locator('.g2-vocab-card').count(),await p.evaluate(()=>DanhPrimaryGrade2Course.units.find(u=>u.id===document.body.dataset.unit).words.length));assert.equal(await p.locator('.g2-main-nav>.nav-btn').count(),3);
    assert.equal(await p.evaluate(()=>mediaEvents.length),0);
    await p.evaluate(async()=>{const paths=[...document.querySelectorAll('#vocab-grid-container svg image')].map(n=>n.getAttribute('href'));await Promise.all(paths.map(src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=resolve;i.onerror=()=>reject(Error(src));i.src=src;})));});
    await p.getByRole('button',{name:'Trò chơi',exact:true}).click();assert.equal(await p.locator('.g2-game-choice').count(),4);
    for(const id of ['game-flip','game-mcq','game-spelling','game-count']){await p.locator(`[data-game="${id}"]`).click();assert.ok(await p.locator('#'+id).isVisible());assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${grade}/${n}/${id}`);}
   }
   await p.goto(`${base}/grade/lop${grade}/unit1.html`);await p.waitForSelector('.g2-vocab-card',{state:'attached'});await p.getByRole('button',{name:'Trò chơi',exact:true}).click();
   const key=`danh.learning.g${grade}unit1.v1`,sk=`danh-g${grade}-unit1-write-sentence-v1`;
   await p.locator('[data-game=game-mcq]').click();let r=(await read(p,key)).rounds.mcq;let target=await p.evaluate(id=>DanhPrimaryGrade2Course.units[0].words.find(w=>w.id===id).name,r.deck[r.index]);
   await p.evaluate(()=>mediaEvents=[]);await p.locator('.learning-options button').filter({hasText:target}).click();
   await p.waitForFunction(()=>mediaEvents.some(e=>e[0]==='playing'));await p.waitForFunction(()=>mediaEvents.some(e=>e[0]==='ended'),{},{timeout:20000});
   await p.waitForFunction(k=>JSON.parse(DanhLearners.storage.getItem(k)).rounds.mcq.index===1,key,{timeout:20000});
   r=(await read(p,key)).rounds.mcq;const target2=await p.evaluate(id=>DanhPrimaryGrade2Course.units[0].words.find(w=>w.id===id).name,r.deck[1]);
   await p.locator('.learning-options button').filter({hasNotText:target2}).first().click();await p.evaluate(()=>mediaEvents=[]);await p.locator('.learning-options button').filter({hasText:target2}).click();await p.waitForFunction(()=>mediaEvents.some(e=>e[0]==='ended'),{},{timeout:20000});
   await p.locator('[data-game=game-spelling]').click();await p.locator('.learning-spelling input').fill('kept draft');await p.reload();assert.equal(await p.locator('.learning-spelling input').inputValue(),'kept draft');assert.equal(await p.evaluate(()=>mediaEvents.length),0);
   await p.locator('[data-game=game-count]').click();await p.locator('#sentence-input').fill('wrong draft');await p.locator('#sentence-check').click();await p.reload();assert.equal(await p.locator('#sentence-input').inputValue(),'wrong draft');assert.equal((await read(p,sk)).tasks[0].errors,1);assert.equal(await p.evaluate(()=>mediaEvents.length),0);
   const answer=await p.evaluate(()=>DanhPrimaryGrade2Course.units[0].patterns[0].question);await p.locator('#sentence-input').fill(answer);await p.evaluate(()=>mediaEvents=[]);await p.locator('#sentence-check').evaluate(b=>{b.click();b.click();});assert.equal((await read(p,sk)).tasks[0].result,'retry');await p.waitForFunction(()=>mediaEvents.some(e=>e[0]==='ended'),{},{timeout:25000});
   await p.locator('#sentence-next').click();const answer2=await p.evaluate(()=>DanhPrimaryGrade2Course.units[0].patterns[1].question);await p.locator('#sentence-input').fill(answer2);await p.evaluate(()=>mediaEvents=[]);await p.locator('#sentence-check').click();assert.equal((await read(p,sk)).tasks[1].result,'first');await p.waitForFunction(()=>mediaEvents.some(e=>e[0]==='ended'),{},{timeout:25000});
   await p.reload();assert.equal(await p.evaluate(()=>mediaEvents.length),0);assert.ok(await p.locator('#sentence-input').isDisabled());
   await p.locator('#sentence-next').click();await p.waitForTimeout(10100);await p.locator('#sentence-reveal').click();assert.equal((await read(p,sk)).tasks[2].result,'revealed');await p.locator('#sentence-next').click();
   if(grade===1)assert.ok((await p.locator('#sentence-stage').textContent()).includes('Hoàn thành'));
   for(const width of [320,390,1280]){await p.setViewportSize({width,height:844});for(const id of ['game-flip','game-mcq','game-spelling','game-count']){await p.locator(`[data-game=${id}]`).click();assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}await p.screenshot({path:path.join(out,`g${grade}-games-${width}.png`),fullPage:true,animations:'disabled'});}
   await p.goto(`${base}/grade/lop${grade}/review.html`);assert.equal(await p.locator('#mode-choices input').count(),9);await p.locator('#pick-units').click();assert.equal(await p.locator('#unit-choices input').count(),grade===1?16:20);await p.locator('#cancel-units').click();await p.locator('#start').click();assert.ok(await p.locator('#play').isVisible());const reviewKey=`danh-g${grade}-mixed-review-v1`;assert.ok((await read(p,reviewKey)).active.tasks.length>0);await p.reload();await p.locator('#resume').click();assert.ok(await p.locator('#play').isVisible());await p.screenshot({path:path.join(out,`g${grade}-review.png`),fullPage:true,animations:'disabled'});
  }
  for(let g=1;g<=12;g++){await p.goto(`${base}/grade/lop${g}/lop${g}.html`);assert.equal(await p.locator(g===2?'.lesson-card[href*="fromGrade"]':'.shared-topic-card').count(),19);}
  await p.goto(base+'/grade/lop5/lop5.html');await p.locator('.shared-topic-card[href*=animals]').click();await p.getByRole('link',{name:'📚 Lớp 5',exact:true}).waitFor({state:'visible'});
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
  fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({pass:true,grades,units:grades.reduce((n,g)=>n+(g===1?16:20),0),classesWithSharedTopics:12,externalNetworkBlocked:true,media:'real playing/ended; Web Speech disabled',errors,missing},null,2));console.log(`PASS grades ${grades}, 12 catalogues, 4 games, 9 review modes, drafts/reload, first/retry/reveal, real audio, responsive layouts.`);
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
