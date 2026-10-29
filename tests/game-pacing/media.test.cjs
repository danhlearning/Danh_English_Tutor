const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('node:fs'), vm = require('node:vm');
const source = fs.readFileSync('shared/learner-profile.js', 'utf8');
const code = source.slice(source.indexOf('  const answerSpeechEnabled='), source.indexOf('  const memory ='));
const flush = async () => { for (let i=0;i<12;i++) await new Promise(r=>setTimeout(r,2)); };
function setup({playing=true, saveData=false, muted=false, fail=false, hold=false, blocked=false, size=128}={}) {
  const requests=[], audio=[], events=[], revoked=[], windowEvents={}, documentEvents={};
  const surface={closest:()=>null,getClientRects:()=>[{}]};
  const document={hidden:false,baseURI:'https://lesson.test/grade/lop2/gsunit8.html',documentElement:{dataset:{}},querySelectorAll:()=>playing?[surface]:[],
    addEventListener:(name,fn)=>{(documentEvents[name] ||= []).push(fn);},dispatchEvent:e=>events.push(e.detail)};
  class Media { constructor(src){this.src=src;audio.push(this);}play(){this.onplaying?.();return hold?new Promise((resolve,reject)=>this.reject=reject):Promise.resolve();}pause(){this.paused=true;}removeAttribute(){this.src='';}load(){} }
  class MediaURL extends URL { static createObjectURL(){return 'blob:lesson-'+Math.random();}static revokeObjectURL(url){revoked.push(url);} }
  const window={DanhLearningEffects:{soundEnabled:()=>!muted},DanhYoungSpeech:{configure:u=>{u.rate=window.DanhGameFlow.isPlaying()?.95:.5;}},
    speechSynthesis:{getVoices:()=>[{lang:'en-GB'}],cancel(){},speak(u){window.utterance=u;u.onend?.();}},SpeechSynthesisUtterance:function(text){this.text=text;},
    addEventListener:(name,fn)=>{(windowEvents[name] ||= []).push(fn);}};
  const navigator={onLine:true,connection:{saveData,addEventListener(){}}};
  const network={blocked};
  const ctx={window,document,navigator,URL:MediaURL,base:new URL('https://lesson.test/'),Audio:Media,Image:class{decode(){return Promise.resolve();}},Blob,AbortController,
    CustomEvent:class{constructor(type,{detail}){this.type=type;this.detail=detail;}},
    setTimeout:(fn,ms)=>{const t=setTimeout(fn,ms);t.unref();return t;},clearTimeout,
    fetch:async(url,opts)=>{requests.push({url,opts});if(fail)throw Error('offline');if(network.blocked)return new Promise((resolve,reject)=>opts.signal.addEventListener('abort',()=>reject(Error('aborted')),{once:true}));return new Response(new Uint8Array(size),{headers:{'content-length':String(size)}});}};
  vm.runInNewContext(fs.readFileSync('shared/young-learner-speech.js','utf8'),ctx);
  vm.runInNewContext(code,ctx);
  return {window,document,navigator,network,requests,audio,events,revoked,windowEvents,documentEvents,setPlaying:v=>playing=v};
}

test('prepares current + two next silently, deduplicates, and plays the cached file faster with pitch preserved', async()=>{
  const s=setup();s.window.DanhGameFlow.prepare(['fox','van','village','not queued']);await flush();
  assert.equal(s.requests.length,3);assert.equal(s.audio.length,0);assert.equal(s.events.length,0);
  assert.equal(s.window.DanhGameFlow.stats.ready,3);
  s.window.DanhGameFlow.prepare(['fox','van','village']);await flush();assert.equal(s.requests.length,3);
  const result=s.window.DanhAnswerSpeech.listen('van'),a=s.audio.at(-1);
  assert.match(a.src,/^blob:/);assert.equal(a.playbackRate,1.15);assert.equal(a.preservesPitch,true);
  a.onended();await result;assert.equal(s.requests.length,3);
  assert.deepEqual(s.events.map(e=>e.state),['playing','ended']);
  s.setPlaying(false);const slow=s.window.DanhAnswerSpeech.listen('fox');assert.equal(s.audio.at(-1).playbackRate,.85);s.audio.at(-1).onended();await slow;
});

test('game TTS is faster while study TTS keeps its slow reading', async()=>{
  const s=setup();await s.window.DanhAnswerSpeech.say('fox',{preferSpeech:true});assert.equal(s.window.utterance.rate,.95);
  s.setPlaying(false);await s.window.DanhAnswerSpeech.say('fox',{preferSpeech:true});assert.equal(s.window.utterance.rate,.82);
});

test('save-data, hidden/offline and mute do not start speculative audio or automatic speech', async()=>{
  for(const kind of ['saveData','hidden','offline','muted']){
    const s=setup({saveData:kind==='saveData',muted:kind==='muted'});
    if(kind==='hidden')s.document.hidden=true;if(kind==='offline')s.navigator.onLine=false;
    s.window.DanhGameFlow.prepare(['fox','van']);await flush();assert.equal(s.requests.length,0,kind);assert.equal(s.audio.length,0);
    s.window.DanhAnswerSpeech.prepare(['fox','van']);await flush();assert.equal(s.requests.length,0,kind);assert.equal(s.audio.length,0);
    if(kind==='hidden'||kind==='muted')assert.equal(s.window.DanhAnswerSpeech.say('fox'),false);
  }
});

test('failed warming never blocks direct playback; late rejection cannot restart stopped speech', async()=>{
  const s=setup({fail:true,hold:true});s.window.DanhGameFlow.prepare(['fox']);await flush();assert.equal(s.window.DanhGameFlow.stats.ready,0);
  const result=s.window.DanhAnswerSpeech.listen('fox');const a=s.audio[0];assert.match(a.src,/\/answer-audio\/.+\.mp3$/);
  s.window.DanhAnswerSpeech.stop();a.reject(Error('interrupted'));await result;await flush();
  assert.equal(s.audio.length,1);assert.equal(s.window.utterance,undefined);assert(!s.events.some(e=>e.state==='error'));
});

test('cache is bounded and page exit releases blob URLs', async()=>{
  const s=setup({size:300000});
  for(let i=0;i<18;i+=3){s.window.DanhGameFlow.prepare([`word ${i}`,`word ${i+1}`,`word ${i+2}`]);await flush();}
  assert(s.window.DanhGameFlow.stats.bytes<=2*1024*1024);assert(s.window.DanhGameFlow.stats.ready<=12);assert(s.revoked.length>0);
  for(const fn of s.windowEvents.pagehide)fn();assert.equal(s.window.DanhGameFlow.stats.ready,0);assert.equal(s.window.DanhGameFlow.stats.bytes,0);
});

test('only two background downloads run; hiding aborts pending work and allows a later retry', async()=>{
  const s=setup({blocked:true});s.window.DanhGameFlow.prepare(['fox','van','village']);await flush();
  assert.equal(s.requests.length,2);assert.equal(s.window.DanhGameFlow.stats.active,2);assert.equal(s.window.DanhGameFlow.stats.pending,1);
  s.document.hidden=true;for(const fn of s.documentEvents.visibilitychange)fn();await flush();
  assert.equal(s.window.DanhGameFlow.stats.active,0);assert.equal(s.window.DanhGameFlow.stats.pending,0);
  s.document.hidden=false;s.network.blocked=false;for(const fn of s.documentEvents.visibilitychange)fn();await flush();
  assert.equal(s.window.DanhGameFlow.stats.ready,3);
});

test('oversized audio and external/invalid images do not enter the cache', async()=>{
  const s=setup({size:1024*1024+1});
  s.window.DanhGameFlow.prepare([{text:'fox',image:'https://other.test/a.png',visual:'<image href="javascript:bad"/>'}]);await flush();
  assert.equal(s.window.DanhGameFlow.stats.ready,0);assert.equal(s.window.DanhGameFlow.stats.images,0);
});

test('visible-card audio prepares silently and reuses the same ready player for repeated taps',async()=>{
  const s=setup({playing:false});s.window.DanhAnswerSpeech.prepare(['fox','van','fox']);await flush();
  assert.equal(s.requests.length,2);assert.equal(s.audio.length,2);assert.equal(s.events.length,0);
  const player=s.audio[0],src=player.src;
  for(let i=0;i<3;i++){
    const result=s.window.DanhAnswerSpeech.listen('fox');assert.equal(s.audio.length,2);assert.equal(player.playbackRate,.85);assert.equal(player.src,src);
    player.onended();await result;
  }
  assert.equal(s.requests.length,2);assert.equal(s.events.filter(e=>e.state==='playing').length,3);
  const result=s.window.DanhAnswerSpeech.listen('fox');s.window.DanhAnswerSpeech.stop();await result;assert.equal(player.src,src,'stopping preserves the prepared source');
  for(const fn of s.windowEvents.pagehide)fn();assert(s.audio.every(a=>a.src===''));assert.equal(s.window.DanhGameFlow.stats.bytes,0);
});
