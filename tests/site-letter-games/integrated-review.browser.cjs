const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8766',out='artifacts/integrated-review';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true,reducedMotion:'reduce'});
 await context.addInitScript(()=>{Object.defineProperty(screen,'width',{get:()=>768});Object.defineProperty(screen,'height',{get:()=>1024});});
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());const p=await context.newPage(),errors=[],results=[];p.on('pageerror',e=>errors.push(e.message));
 async function speech(){await p.evaluate(()=>{window.reads=[];DanhAnswerSpeech.say=async text=>{reads.push(text);return true;};});}
 async function saved(key){return p.evaluate(key=>JSON.parse(DanhLearners.storage.getItem(key)),key);}
 const stage=()=>p.locator('.letter-ladder:visible');
 async function letterState(){const key=await stage().getAttribute('data-letter-storage');return {key,...await saved(key)};}
 async function enter(g){
  await p.goto(base+`/grade/lop${g}/${g<=5?'review.html':'vocabulary-review.html?term=2'}`);await speech();
  assert.equal(await p.getByRole('button',{name:'Ghép chữ',exact:true}).count(),0,'no standalone entry');
  if(g<=5){
   await p.locator('#pick-units').click();await p.locator('#pick-term2').click();await p.locator('#apply-units').click();await p.locator('#start').click();
   for(let i=0;i<3;i++){
    const task=await p.evaluate(()=>{const m=new DanhGrade2Review.Review(grade2Units,DanhLearners.storage,Math.random,DanhGrade2ReviewContent,window.DanhReviewConfig?.key);return {choice:m.isChoice(),mode:m.task.mode,solution:m.solution(),expected:m.expected(),tokens:m.tokens()};});
    if(task.choice)await p.locator('[data-choice="'+task.solution+'"]').click();
    else if(task.mode==='sentence'){for(let n=0;n<task.tokens.length;n++)await p.locator('[data-token="'+n+'"]').click();}
    else {await p.locator('#answer').fill(task.expected);await p.locator('#answer-form').dispatchEvent('submit');}
    await p.locator('#next').click();
   }
  }else{
   await p.getByRole('button',{name:'Bắt đầu chơi',exact:true}).click();
   for(let i=0;i<3;i++){const s=await saved(`danh-g${g}-vocabulary-game-term2-v1`);await p.locator(`[data-answer-key="${s.active.items[s.active.index]}"]`).click();await p.locator('[data-next=true]').click();}
  }
  await stage().waitFor();assert(await stage().locator('.ll-primary').first().evaluate(n=>getComputedStyle(n).backgroundColor!=='rgba(0, 0, 0, 0)'),'primary action has a visible background');return letterState();
 }
 async function solveOne(){const s=await letterState(),a=s.active,t=a.tasks[a.index];if(a.phase===4){const name=await p.evaluate(({key,id})=>{const a=JSON.parse(DanhLearners.storage.getItem(key)).active;return a.signature.split('|').find(x=>x.startsWith(id+':')).slice(id.length+1);},{key:s.key,id:t.id});await stage().locator('.ll-input').fill(name);}else{
   const name=a.signature.split('|').find(x=>x.startsWith(t.id+':')).slice(t.id.length+1);
   for(const i of t.holes){const now=(await letterState()).active.tasks[a.index],tile=now.tiles.findIndex((c,n)=>!now.draft.includes(n)&&c===name[i].toLowerCase());await stage().locator(`[data-tile="${tile}"]`).click();}
  }
  await stage().getByRole('button',{name:'Kiểm tra',exact:true}).click();await stage().locator('.ll-actions .ll-primary').click();
 }
 for(let g=1;g<=12;g++){
  console.log("Checking grade "+g);const s=await enter(g);assert.equal(s.active.phase,1);assert(s.active.ids.length>0&&s.active.ids.length<=8);
  if(g<=5){const pool=await p.evaluate(()=>{const values=Object.values(grade2Units),ids=values.slice(values.length/2).map(u=>u.id);return DanhGrade2LetterReview.catalog(values).filter(w=>w.unitIds.some(id=>ids.includes(id))).map(w=>w.id);});assert.deepEqual([...s.active.selected].sort(),pool.sort());}
  else {const pool=await p.evaluate(g=>{const u=window[`DanhGrade${g}Units`];return DanhSiteLetters.normalize(u.slice(Math.ceil(u.length/2)).flatMap(u=>u.words)).map(w=>w.id);},g);assert.deepEqual([...s.active.selected].sort(),pool.sort());}
  if(g===2||g===6){
   const before=await letterState();
   for(const [width,height]of [[1024,768],[768,1024],[507,768]]){await p.setViewportSize({width,height});await p.waitForTimeout(80);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert(await stage().locator('.ll-slot').first().evaluate(n=>n.getBoundingClientRect().height>=44));await p.screenshot({path:out+'/g'+g+'-'+width+'-'+height+'.png'});}
   await p.setViewportSize({width:1024,height:768});
   if(g===2){await p.locator('.tg-back').click();await p.locator('#pick-units').click();await p.locator('#pick-term1').click();await p.locator('#apply-units').click();await p.locator('#resume').click();}
   else {await p.getByRole('button',{name:'← Chọn lượt ôn',exact:true}).click();await p.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}).click();}
   assert.deepEqual((await letterState()).active,before.active,'resume keeps original round pool despite setup changes');
   // Leave mid task and reload: same draft, group, level, and parent round.
   await stage().locator('.ll-tile').first().click();const draft=await letterState();await p.reload();await speech();
   if(g<=5)await p.locator('#resume').click();else await p.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}).click();
   await stage().waitFor();assert.deepEqual((await letterState()).active,draft.active);await stage().locator('.ll-slot').first().click();
   let n=0;while(!await stage().getByRole('button',{name:'Tiếp tục ôn tổng hợp →',exact:true}).count()){assert(++n<80);await solveOne();}
   const done=await letterState();assert.equal(done.active.phase,4);assert.equal(done.active.index,done.active.tasks.length);
   // Reload summary must keep completed letters rather than restart them.
   await p.reload();await speech();if(g<=5)await p.locator('#resume').click();else await p.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}).click();await stage().getByRole('button',{name:'Tiếp tục ôn tổng hợp →',exact:true}).waitFor();
   await p.screenshot({path:`${out}/g${g}-summary.png`});await stage().getByRole('button',{name:'Tiếp tục ôn tổng hợp →',exact:true}).click();
   const parent=await saved(g<=5?`danh-g${g}-mixed-review-v1`:`danh-g${g}-vocabulary-game-term2-v1`);assert.equal(parent.active.index,3);assert.equal(parent.active.letterDone,true);assert.equal(await stage().count(),0,'returns to mixed tasks');
  }
  results.push({grade:g,pool:s.active.selected.length,group:s.active.ids.length});
 }
 assert.deepEqual(errors,[]);fs.writeFileSync(out+'/results.json',JSON.stringify({pass:true,results,errors},null,2));console.log('PASS all 12 reviews: no separate entry, semester filters, randomized pool; grade 2 and 6 complete 1–2–3/full typing, draft + summary reload, return to mixed review');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
