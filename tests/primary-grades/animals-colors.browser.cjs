const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('fs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8765',out='artifacts/animal-color-sync';
(async()=>{fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await context.addInitScript(()=>{Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});window.reads=[];document.addEventListener('danh-answer-speech',e=>reads.push(e.detail));});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const topic of ['animals','colors']){
  await page.goto(`${base}/grade/lop2/${topic}.html`);assert.equal(await page.evaluate(()=>reads.length),0);
  await page.evaluate(()=>{window.listenCalls=[];const original=window.DanhAnswerSpeech.listen;window.DanhAnswerSpeech.listen=function(text,...args){listenCalls.push(text);return original.call(this,text,...args);};});
  assert.equal(await page.locator('.site-letter-entry').count(),0);
  assert.equal(await page.locator('#vocab-grid-container .picture-word-card').count(),topic==='animals'?50:13);
  await page.screenshot({path:`${out}/after-${topic}-vocabulary.png`,fullPage:true});
  for(const index of [0,topic==='animals'?49:12]){const card=page.locator('#vocab-grid-container > *').nth(index),before=await page.evaluate(()=>listenCalls.length);await card.locator('.word-title').click();await page.waitForTimeout(70);assert.equal(await page.evaluate(()=>listenCalls.length),before+1);
   let count=before+1;for(const selector of ['.word-picture','.meaning']){await card.locator(selector).click();assert.equal(await page.evaluate(()=>listenCalls.length),++count);}
   const box=await card.boundingBox();await card.click({position:{x:box.width/2,y:box.height-8}});assert.equal(await page.evaluate(()=>listenCalls.length),++count);
   await card.focus();for(const key of ['Enter','Space']){await card.press(key);assert.equal(await page.evaluate(()=>listenCalls.length),++count);}}
  await page.getByRole('button',{name:'Trò chơi',exact:true}).click();await page.locator('#game-flip .ll-slot').first().waitFor();
  assert.deepEqual(await page.locator('.g2-game-choice').allTextContents(),['Ghép chữ','Trắc nghiệm','Chính tả','Viết câu']);
  const buttonStyle=await page.locator('#game-flip .ll-primary').evaluate(n=>({bg:getComputedStyle(n).backgroundColor,color:getComputedStyle(n).color}));assert.notEqual(buttonStyle.bg,'rgba(0, 0, 0, 0)');assert.notEqual(buttonStyle.bg,buttonStyle.color);
  await page.screenshot({path:`${out}/after-${topic}-games.png`,fullPage:true});
  await page.locator('[data-game=game-mcq]').click();const choices=page.locator('#game-mcq .learning-options > button'),correct=await page.evaluate(topic=>{const state=JSON.parse(DanhLearners.storage.getItem(`danh.learning.${topic}.v1`)),id=state.rounds.mcq.deck[state.rounds.mcq.index];return topic==='colors'?colorsData.find(w=>w.name.toLowerCase()===id).name:DanhSiteLetters.normalize(animalsList).find(w=>w.id===id).name;},topic);
  await choices.filter({hasNotText:correct}).first().click();await choices.filter({hasText:new RegExp('^'+correct+'$')}).click();assert.match(await page.locator('#game-mcq .learning-feedback').innerText(),/sửa|đúng/i);
  await page.locator('[data-game=game-count]').click();assert(await page.locator('#count-sentence-input').isEnabled());
 }
 await page.goto(`${base}/grade/lop2/animals.html?fromGrade=12`);
 const expected=await page.evaluate(()=>{
  const bank=DanhSiteLetters.normalize(animalsList.filter(w=>[1,6].includes(w.num))),ids=bank.map(w=>w.id),oldKey=`danh-g12-letter-ladder-site-animals-${DanhSiteLetters.fingerprint(bank)}-v1`;
  const old=window.DanhLetterLadderCore.create(DanhLearners.storage,`site-animals-${DanhSiteLetters.fingerprint(bank)}`,bank,{grade:12});old.start(ids);
  const letter=JSON.parse(DanhLearners.storage.getItem(oldKey));DanhLearners.storage.removeItem('danh-g12-letter-ladder-animals-v1');
  DanhLearners.storage.setItem('danh.learning.animals.v1',JSON.stringify({version:1,selected:[1,6],best:{mcq:4,spelling:3},history:[],rounds:{mcq:{id:'saved-old',deck:[6,1],index:0,answers:[{solved:false,mistakes:1,wrongChoices:[1],solvedAt:0},{solved:false,mistakes:0,wrongChoices:[],solvedAt:0}]}},cards:{deck:[1,6],index:1,mode:'ipa',seen:[1]},lastTab:'game-mcq'}));return {ids,letter};
 });
 await page.reload();const saved=await page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh.learning.animals.v1')));assert.deepEqual(saved.selected,expected.ids);assert.equal(saved.best.mcq,4);assert.equal(saved.cards.index,1);assert.equal(saved.rounds.mcq.id,'saved-old');assert.equal(saved.rounds.mcq.answers[0].mistakes,1);assert.deepEqual(saved.rounds.mcq.answers[0].wrongChoices,[expected.ids[0]]);
 assert.equal(await page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh.learning.animals.v1.before-shared')).selected[0]),1);
 const letter=await page.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh-g12-letter-ladder-animals-v1')));assert.deepEqual(letter,expected.letter);
 assert(await page.locator('#game-mcq .learning-options > button').first().isVisible());
 for(const width of [320,390,1280]){await page.setViewportSize({width,height:900});for(const topic of ['animals','colors']){await page.goto(`${base}/grade/lop2/${topic}.html`);await page.getByRole('button',{name:'Từ vựng',exact:true}).click();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:`${out}/${topic}-${width}.png`});}}
 assert.deepEqual(errors,[]);fs.writeFileSync(`${out}/results.json`,JSON.stringify({topics:2,wholeCardFirstLast:true,wrongThenCorrect:true,numericProgressMigration:true,letterProgressMigration:true,gradeContext:12,widths:[320,390,1280],errors},null,2));console.log('PASS Animals/Colors shared games, card speech, progress migration, grade context and responsive layout');
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
