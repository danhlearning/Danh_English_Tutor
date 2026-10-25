const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.LESSON_BASE_URL || 'http://127.0.0.1:8765';
const out='artifacts/game-pacing';fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const c=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await c.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  await c.addInitScript(()=>{
   Object.defineProperty(window,'speechSynthesis',{value:undefined,configurable:true});
   Object.defineProperty(window,'SpeechSynthesisUtterance',{value:undefined,configurable:true});
   window.media=[];window.speechEvents=[];window.audioObjects=[];
   document.addEventListener('danh-answer-speech',e=>speechEvents.push({...e.detail,at:performance.now()}));
   const Native=window.Audio;window.Audio=function(...args){const audio=new Native(...args);audioObjects.push(audio);for(const type of ['playing','ended','error'])audio.addEventListener(type,()=>media.push({type,src:audio.src,rate:audio.playbackRate,pitch:audio.preservesPitch,at:performance.now()}));return audio;};window.Audio.prototype=Native.prototype;
  });
  const p=await c.newPage(),errors=[],missing=[],fetches=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  p.on('request',r=>{if(r.url().includes('/answer-audio/'))fetches.push({url:r.url(),type:r.resourceType()});});
  const snapshot=()=>p.evaluate(()=>({stats:DanhGameFlow.stats,playing:DanhGameFlow.isPlaying(),media,speechEvents}));
  await p.goto(base+'/grade/lop2/gsunit8.html');
  assert.equal((await snapshot()).media.length,0);
  await p.locator('.g2-vocab-card').first().click();
  await p.waitForFunction(()=>media.some(e=>e.type==='ended'));
  assert.equal((await snapshot()).media.find(e=>e.type==='playing').rate,.85);
  await p.getByRole('button',{name:'Trò chơi',exact:true}).click();
  await p.locator('.ll-slot').first().waitFor();
  await p.waitForFunction(()=>DanhGameFlow.stats.ready>=3);
  const key='danh-g2-letter-ladder-gsunit8-v1';
  const state=()=>p.evaluate(k=>JSON.parse(DanhLearners.storage.getItem(k)),key);
  const warmed=await snapshot();assert(warmed.playing);assert.equal(warmed.media.filter(e=>e.type==='playing').length,1);
  const before=JSON.stringify((await state()).active),requestsBefore=fetches.length;
  await p.evaluate(()=>DanhGameFlow.prepare(grade2Units.gsunit8.words,document.querySelector('.letter-ladder')));
  assert.equal(JSON.stringify((await state()).active),before,'warming must not mutate the turn');
  async function solve(){
   const a=(await state()).active,t=a.tasks[a.index];
   const name=await p.evaluate(id=>grade2Units.gsunit8.words.find(w=>w.id===id).name,t.id);
   const used=new Set(t.draft.filter(n=>n!==null));
   for(let h=0;h<t.holes.length;h++)if(t.draft[h]===null){const i=t.tiles.findIndex((v,i)=>!used.has(i)&&v===Array.from(name)[t.holes[h]].toLowerCase());used.add(i);await p.locator(`[data-tile="${i}"]`).click();}
   const count=await p.evaluate(()=>media.length),start=Date.now(),clickAt=await p.evaluate(()=>performance.now());
   await p.getByRole('button',{name:'Kiểm tra',exact:true}).click();
   await p.waitForFunction(n=>media.slice(n).some(e=>e.type==='ended'),count);
   const events=await p.evaluate(n=>media.slice(n),count),played=events.filter(e=>e.type==='playing');
   assert.equal(played.length,1);assert.match(played[0].src,/^blob:/);assert.equal(played[0].rate,1.15);assert(played[0].pitch);
   return {name,playback:events,answerToAudioStartMs:played[0].at-clickAt,answerToEndMs:Date.now()-start};
  }
  const first=await solve();assert.equal(fetches.length,requestsBefore,'cached playback must not fetch the WAV again');
  await p.reload();await p.locator('.ll-primary').first().waitFor();assert.equal((await snapshot()).media.length,0,'restore autoplay');
  await p.getByRole('button',{name:'Từ tiếp',exact:true}).click();
  await p.waitForFunction(()=>DanhGameFlow.stats.ready>=2);
  const second=await solve();
  await p.getByRole('button',{name:'Từ vựng',exact:true}).click();
  assert.equal(await p.evaluate(()=>DanhGameFlow.isPlaying()),false);
  assert(await p.evaluate(()=>audioObjects.every(a=>a.paused)));
  await p.screenshot({path:out+'/grade2-390.png',fullPage:true});
  // Deliberately slow one recording to ensure automatic next still waits for its end.
  await p.goto(base+'/grade/lop2/clothes.html?fromGrade=5');
  await p.getByRole('button',{name:'Trò chơi',exact:true}).click();
  await p.locator('[data-game="game-mcq"]').click();
  await p.waitForFunction(()=>DanhGameFlow.stats.ready>=2);
  const mcq=await p.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh.learning.clothes.v1')).rounds.mcq);
  const term=mcq.deck[mcq.index];
  await p.evaluate(()=>{const Native=window.Audio;window.Audio=function(...args){const a=new Native(...args);a.addEventListener('playing',()=>a.playbackRate=.35,{once:true});return a;};window.Audio.prototype=Native.prototype;});
  await p.locator('#game-mcq .learning-options button').filter({hasText:new RegExp('^'+term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$','i')}).click();
  await p.waitForFunction(()=>media.some(e=>e.type==='playing'));
  await p.waitForTimeout(1100);
  assert.equal(await p.evaluate(()=>JSON.parse(DanhLearners.storage.getItem('danh.learning.clothes.v1')).rounds.mcq.index),mcq.index);
  await p.waitForFunction(index=>JSON.parse(DanhLearners.storage.getItem('danh.learning.clothes.v1')).rounds.mcq.index>index,mcq.index);
  assert((await snapshot()).media.some(e=>e.type==='ended'));
  const smoke=[];
  for(const grade of [1,3,4,5,6,7,8,9,10,11,12]){
   await p.goto(`${base}/grade/lop${grade}/unit1.html`);
   if(grade<=5){await p.getByRole('button',{name:'Trò chơi',exact:true}).click();}
   else {await p.locator('[data-tab="spelling"]').click();}
   await p.waitForFunction(()=>DanhGameFlow.isPlaying());
   await p.waitForFunction(()=>DanhGameFlow.stats.ready>0);
   const s=await snapshot();assert.equal(s.media.length,0,'no autoplay g'+grade);
   assert(s.stats.active<=2 && s.stats.bytes<=2*1024*1024);
   assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   smoke.push({grade,stats:s.stats});
  }
  await p.goto(base+'/grade/lop6/grammar.html');
  await p.locator('#start').click();await p.locator('#question-card').waitFor();
  await p.waitForFunction(()=>DanhGameFlow.stats.ready>0 && DanhGameFlow.isPlaying());
  const grammar=await snapshot();assert.equal(grammar.media.length,0);
  await p.goto(base+'/grammar-practice.html?topic=present-simple&level=1');
  await p.locator('#start-btn').click();
  await p.waitForFunction(()=>DanhGameFlow.isPlaying() && DanhGameFlow.stats.ready>=2);
  const room=await snapshot();assert.equal(room.media.length,0);
  const q=await p.evaluate(()=>{const a=JSON.parse(DanhLearners.storage.getItem(DanhGrammarProgress.KEY)).active;return DanhGrammarQuestions.find(q=>q.id===a.questionIds[a.index]);});
  if(q.type==='choice')await p.locator('[data-option="0"]').click();
  else if(q.type==='order'){for(let i=0;i<q.tokens.length;i++)await p.locator(`#available-tokens [data-token="${i}"]`).click();}
  else await p.locator('#answer-input').fill(q.answers[0]);
  await p.locator('#check-btn').click();await p.waitForFunction(()=>media.some(e=>e.type==='ended'));
  assert.equal((await snapshot()).media.find(e=>e.type==='playing').rate,1.15);
  assert.match((await snapshot()).media.find(e=>e.type==='playing').src,/^blob:/);
  assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);
  const results={first,second,cachedPlaybackNoExtraRequest:true,automaticNextWaitsForAudioEnd:true,studyAudioRate:.85,gameAudioRate:1.15,noAutoplay:true,smoke,grammar:grammar.stats,room,errors,missing};
  fs.writeFileSync(out+'/browser-results.json',JSON.stringify(results,null,2));console.log('PASS cached game playback, faster rate, study rate, resume, next, tab stop, eleven other grades and grammar; no missing files or JS errors');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
