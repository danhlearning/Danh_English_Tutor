const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {initLearner}=require('../learner-profiles/browser-helper.cjs');
const base=process.env.LESSON_BASE_URL||'http://127.0.0.1:8001';
const click=l=>l.evaluate(b=>b.click());
(async()=>{const browser=await chromium.launch({channel:'msedge',headless:true});try{
 const ctx=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await initLearner(ctx);
 await ctx.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
 await ctx.addInitScript(()=>{
  window.readings=[];window.cancels=0;
  window.SpeechSynthesisUtterance=function(text){this.text=text;};
  speechSynthesis.getVoices=()=>[{lang:'vi-VN',name:'Vietnamese'},{lang:'en-GB',name:'English Natural'}];
  speechSynthesis.cancel=()=>{cancels++;};
  speechSynthesis.speak=u=>{readings.push({text:u.text,lang:u.lang,rate:u.rate,voice:u.voice?.lang});if(window.holdSpeech)window.heldUtterance=u;else queueMicrotask(()=>u.onend?.());};
 });
 const p=await ctx.newPage(),errors=[],checked=[];p.on('pageerror',e=>errors.push(e.message));
 async function load(url){await p.goto(base+url);await p.waitForFunction(()=>window.DanhAnswerSpeech);assert.equal(await p.evaluate(()=>readings.length),0,url+' autoplay');}
 async function expectSpeech(text,action){const before=await p.evaluate(()=>readings.length);await action();await p.waitForFunction(n=>readings.length>n,before);const spoken=await p.evaluate(n=>readings.slice(n),before);assert.equal(spoken.length,1);assert.equal(spoken[0].text,text);assert.equal(spoken[0].lang,'en-GB');assert.equal(spoken[0].voice,'en-GB');}
 for(const g of [6,7,8,9,10,11,12]){
  await load(`/grade/lop${g}/unit1.html`);await p.waitForFunction(g=>window[`DanhGrade${g}Units`]&&document.querySelectorAll('.g6-word-card').length===window[`DanhGrade${g}Units`][0].words.length,g);
  await click(p.locator('[data-tab=quiz]'));await click(p.getByRole('button',{name:'Bắt đầu chơi',exact:true}));
  let key=await p.locator('[data-word-key]').getAttribute('data-word-key');
  let term=await p.locator(`[data-answer-key="${key}"]`).textContent();term=term.slice(3);
  await expectSpeech(term,()=>p.locator(`[data-answer-key="${key}"]`).evaluate(b=>{b.click();b.click();}));
  await p.reload();assert.equal(await p.evaluate(()=>readings.length),0);await click(p.locator('[data-tab=quiz]'));await click(p.getByRole('button',{name:'Tiếp tục lượt dở',exact:true}));assert.equal(await p.evaluate(()=>readings.length),0);
  await click(p.locator('[data-next]'));key=await p.locator('[data-word-key]').getAttribute('data-word-key');term=(await p.locator(`[data-answer-key="${key}"]`).textContent()).slice(3);
  await click(p.locator(`.g6-choice:not([data-answer-key="${key}"])`).first());assert.equal(await p.evaluate(()=>readings.length),0);
  await expectSpeech(term,()=>click(p.locator(`[data-answer-key="${key}"]`)));
  await click(p.locator('[data-tab=spelling]'));const meaning=(await p.locator('#spelling-stage h3').textContent()).replace('Gõ tiếng Anh cho: ','');
  term=await p.evaluate(({g,meaning})=>window[`DanhGrade${g}Units`][0].words.find(w=>w.meaning===meaning).term,{g,meaning});
  await p.locator('#spelling-stage input').fill(term);await expectSpeech(term,()=>click(p.locator('#spelling-stage button[type=submit]')));checked.push(`g${g}: choice/corrected/spelling/resume`);console.log('PASS speech grade '+g);
 }
 // All secondary grammar families use the same success branch.
 await load('/grade/lop7/grammar.html');await p.waitForFunction(()=>document.body.dataset.grammarReady==='true');
 for(const activity of ['grammar','rewrite','pronunciation','preposition']){
  await p.locator(`input[name=activity][value=${activity}]`).check();await click(p.locator('#start'));
  const q=await p.evaluate(()=>{const a=JSON.parse(DanhLearners.storage.getItem('danh-g7-grammar-v1')).active;return DanhGrade7Grammar.find(q=>q.id===a.items[a.position]);});
  const answer=q.answer.split('|')[0];
  if(activity==='grammar'&&q.options){const before=await p.evaluate(()=>readings.length);await click(p.locator('#answer-area button').filter({hasText:new RegExp('^[ABCD]\\. '+q.options.find(x=>x!==answer).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}));assert.equal(await p.evaluate(()=>readings.length),before);}
  await expectSpeech(answer,async()=>{
   if(q.options)await click(p.locator('#answer-area button').filter({hasText:new RegExp('^[ABCD]\\. '+answer.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}));
   else if(q.type==='order'){for(const token of q.parts)await click(p.locator('.gg-tokens button:not(:disabled)').filter({hasText:new RegExp('^'+token.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$')}).first());await click(p.getByRole('button',{name:'Kiểm tra câu',exact:true}));}
   else{await p.locator(q.type==='fill'?'#answer-area input':'#sentence-answer').fill(answer);await click(p.locator('#answer-area button[type=submit]'));}
  });
  await click(p.locator('#exit-play'));checked.push('g7 grammar: '+activity);
 }
 for(const grade of [1,3,5]){
  await load(`/grade/lop${grade}/unit1.html`);await click(p.locator('[data-tab=game-context]'));
  const word=await p.evaluate(g=>{const a=JSON.parse(DanhLearners.storage.getItem(`danh-g${g}-unit1-template-context-v1`));return DanhPrimaryTemplateCourse.units[0].words.find(w=>w.id===a.tasks[a.index].id).name;},grade);
  await p.locator('#recall-answer').fill('wrong');await click(p.getByRole('button',{name:'Kiểm tra',exact:true}));assert.equal(await p.evaluate(()=>readings.length),0);
  await p.locator('#recall-answer').fill(word);await expectSpeech(word,()=>click(p.getByRole('button',{name:'Kiểm tra',exact:true})));await p.reload();assert.equal(await p.evaluate(()=>readings.length),0);checked.push(`g${grade}: context corrected`);
 }
 await load('/grade/lop2/review.html');await click(p.locator('#start'));
 const mixed=await p.evaluate(()=>{const a=JSON.parse(DanhLearners.storage.getItem('danh-g2-mixed-review-v1')).active;return a.tasks[a.index];});
 const mixedWord=await p.evaluate(key=>{const [unit,id]=key.split(':');return grade2Units[unit].words.find(w=>w.id===id);},mixed.key);
 await expectSpeech(mixedWord.name,()=>click(p.locator(`[data-choice="${mixed.key}"]`)));checked.push('g2 mixed review');
 await load('/grade/lop3/legacy.html?unit=unit1&mode=meaning');await click(p.locator('[data-action=start]'));
 const legacy=await p.evaluate(()=>{const a=JSON.parse(DanhLearners.storage.getItem('danh-g3-unit1-meaning-v1'));return DanhGrade3Units[0].words.find(w=>w.id===a.questions[a.index].id);});
 await expectSpeech(legacy.term,()=>click(p.locator(`[data-answer="${legacy.id}"]`)));checked.push('g3 legacy');
 await load('/ipa-practice.html');const ipaWord=await p.evaluate(()=>{window.holdSpeech=true;return currentData[currentQuestionIndex].word.split('/')[0].trim();});
 await p.locator('#answer-input').fill(ipaWord);await expectSpeech(ipaWord,()=>click(p.locator('#check-btn')));
 await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>currentQuestionIndex),0);
 await p.evaluate(()=>heldUtterance.onend());await p.waitForFunction(()=>currentQuestionIndex===1);checked.push('IPA waits for spoken word');
 await load('/grammar-theory.html?topic=present-simple');
 const quick=await p.evaluate(()=>{const focus=DanhGrammarCatalog.topics.find(t=>t.id==='present-simple').seeds[0].focus;return focus;});
 await expectSpeech(quick,()=>p.locator('[data-quick="0"]').evaluateAll((buttons,answer)=>buttons.find(b=>b.dataset.answer===answer).click(),quick));checked.push('grammar theory quick check');
 await load('/grammar-practice.html?topic=present-simple');await click(p.locator('#start-btn'));
 const room=await p.evaluate(()=>{const a=JSON.parse(DanhLearners.storage.getItem(DanhGrammarProgress.KEY)).active;return DanhGrammarQuestions.find(q=>q.id===a.questionIds[a.index]);});
 if(room.type==='choice')await click(p.locator('[data-option="0"]'));
 else if(room.type==='order'){for(let i=0;i<room.tokens.length;i++)await click(p.locator(`#available-tokens [data-token="${i}"]`));}
 else await p.locator('#answer-input').fill(room.answers[0]);
 await expectSpeech(room.answers[0],()=>click(p.locator('#check-btn')));await p.reload();assert.equal(await p.evaluate(()=>readings.length),0);checked.push('grammar room');
 // Utility: sample sentence for intonation, mute, unavailable API, hide/pagehide.
 await expectSpeech('Do you like this city?',()=>p.evaluate(()=>DanhAnswerSpeech.question({answer:'Lên giọng ↗',prompt:'Khi hỏi “Do you like this city?”'})));
 await click(p.locator('#sound-toggle'));const before=await p.evaluate(()=>readings.length);await p.evaluate(()=>DanhAnswerSpeech.say('muted'));assert.equal(await p.evaluate(()=>readings.length),before);
 const cancelled=await p.evaluate(()=>{const before=cancels;dispatchEvent(new Event('pagehide'));return cancels>before;});assert(cancelled);
 await click(p.locator('#sound-toggle'));assert.equal(await p.evaluate(()=>{window.SpeechSynthesisUtterance=undefined;return DanhAnswerSpeech.say('hobby');}),true);
 assert.equal(await p.locator('html').getAttribute('data-answer-speech-mode'),'audio');
 assert.deepEqual(errors,[]);const out=path.resolve(__dirname,'../../artifacts/correct-answer-speech');fs.mkdirSync(out,{recursive:true});
 fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({passed:true,externalNetworkBlocked:true,checked,noAutoplay:true,noDuplicate:true,mute:true,pagehide:true,errors},null,2));
 console.log('PASS correct-answer speech: '+checked.join('; '));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
