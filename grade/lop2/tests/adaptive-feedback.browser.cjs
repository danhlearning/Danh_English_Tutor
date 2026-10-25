const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/grade2-letter-ladder';
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const results=[];
 for(const [grade,reduced] of [[2,false],[2,true],[3,true],[4,false]]){
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:reduced?'reduce':'no-preference'});
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+(grade===2?'/grade/lop2/gsunit8.html':'/grade/lop'+grade+'/unit1.html'));
  await page.getByRole('button',{name:'Trò chơi',exact:true}).click();await page.locator('.ll-slot').first().waitFor();
  const keys=await page.evaluate(grade=>{
   const topic=document.body.dataset.topic,words=window.grade2Units?.[topic]?.words||DanhPrimaryGrade2Course.units.find(u=>u.id===document.body.dataset.unit).words;
   const w=grade===2?words.find(w=>w.id==='village'):words.find(w=>/[a-z]{3}/i.test(w.name));
   const learningKey='danh.learning.'+topic+'.v1',saved=JSON.parse(DanhLearners.storage.getItem(learningKey));saved.selected=[w.id];DanhLearners.storage.setItem(learningKey,JSON.stringify(saved));
   const g=DanhLetterLadderCore.create(DanhLearners.storage,topic,words,{grade});g.start([w.id]);return {key:g.key,name:w.name};
  },grade);
  await page.reload();await page.getByRole('button',{name:'Trò chơi',exact:true}).click();await page.locator('.ll-slot').first().waitFor();
  await page.evaluate(()=>{window.readWords=[];DanhAnswerSpeech.say=text=>{readWords.push(text);return Promise.resolve();};});
  const state=()=>page.evaluate(key=>JSON.parse(DanhLearners.storage.getItem(key)).active,keys.key);
  const stage=()=>page.locator('.tab-content.active .letter-ladder');
  const t=(await state()).tasks[0],expected=Array.from(keys.name)[t.holes[0]].toLowerCase(),wrong=t.tiles.map((c,i)=>c!==expected?i:-1).filter(i=>i>=0);
  for(const i of wrong.slice(0,2)){
   if(await stage().locator('[data-slot="0"]').getAttribute('aria-label')!== 'Ô chữ 1')await stage().locator('[data-slot="0"]').click();
   await stage().locator(`[data-tile="${i}"]`).click();await stage().getByRole('button',{name:'Kiểm tra',exact:true}).click();
  }
  assert.equal((await state()).tasks[0].errors,2);
  const bad=stage().locator('.ll-slots');assert(await bad.evaluate(n=>n.classList.contains('vg-answer-bad')));
  assert.equal(await bad.evaluate(n=>n.getAnimations().length>0),!reduced);
  if(grade===2&&!reduced)await page.screenshot({path:out+'/adaptive-wrong-390.png',fullPage:true});
  async function correct(){
   const a=await state(),t=a.tasks[a.index];
   for(let h=0;h<t.draft.length;h++)if(t.draft[h]!==null)await stage().locator(`[data-slot="${h}"]`).click();
   const used=new Set();for(const h of t.holes){const i=t.tiles.findIndex((c,i)=>!used.has(i)&&c===Array.from(keys.name)[h].toLowerCase());used.add(i);await stage().locator(`[data-tile="${i}"]`).click();}
   await stage().getByRole('button',{name:'Kiểm tra',exact:true}).click();
  }
  await correct();assert.equal((await state()).tasks[0].result,'corrected');
  assert.equal(await stage().locator('.ll-status[data-kind="correct"]').count(),0);
  assert(!(await stage().textContent()).includes('✅'));
  assert(await stage().locator('.ll-slots').evaluate(n=>n.classList.contains('vg-answer-good')));
  if(grade===2&&!reduced)await page.screenshot({path:out+'/adaptive-correct-390.png',fullPage:true});
  await page.locator('[data-game="game-spelling"]').click();assert.equal(await stage().locator('.ll-input').count(),0);assert.equal(await page.locator('#game-spelling .learning-spelling input').count(),0);
  await stage().getByRole('button',{name:'Từ tiếp',exact:true}).click();assert.equal((await state()).phase,1);assert(await stage().locator('.ll-practice-note').isVisible());
  for(let i=0;i<5;i++)await stage().getByRole('button',{name:'Gợi ý',exact:true}).click();await correct();await stage().getByRole('button',{name:'Từ tiếp',exact:true}).click();assert.equal((await state()).phase,1);
  const saved=await state();await page.reload();await stage().waitFor();assert.deepEqual(await state(),saved);
  await page.evaluate(()=>{DanhAnswerSpeech.say=()=>Promise.resolve();});
  if(grade===2&&!reduced)await page.screenshot({path:out+'/adaptive-review-390.png',fullPage:true});
  for(let phase=1;phase<=3;phase++){assert.equal((await state()).phase,phase);await correct();await stage().getByRole('button',{name:'Từ tiếp',exact:true}).click();}
  assert.equal((await state()).phase,4);assert(await stage().locator('.ll-input').isVisible());
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));assert.deepEqual(errors,[]);
  results.push({grade,reduced,wrongFeedback:true,noGreenTickBox:true,directSpellingBlocked:true,repeatedHintsStayInPractice:true,reload:true,cleanRecallUnlocksFull:true});
  await context.close();
 }
 fs.writeFileSync(out+'/adaptive-browser-results.json',JSON.stringify(results,null,2));console.log('PASS stronger correct/wrong feedback, no tick box, adaptive repeats, full spelling gate, reload, grades 2/3/4, motion on/off');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
