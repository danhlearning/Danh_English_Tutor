const test=require('node:test'),assert=require('node:assert/strict');
const C=require('../assets/js/letter-ladder-core.js');
const words=[{id:'fox',name:'Fox'},{id:'van',name:'Van'},{id:'village',name:'Village'}];
const store=()=>{const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};};
function solve(g){const t=g.entry(),w=g.word();if(g.state.active.phase===4)g.text(w.name);else{t.draft.forEach((_,i)=>g.remove(i));const used=new Set();for(const h of t.holes){const i=t.tiles.findIndex((c,i)=>!used.has(i)&&c===Array.from(w.name)[h].toLowerCase());used.add(i);g.choose(i);}}return g.check();}
function finish(g){while(g.entry()){solve(g);g.next();}}

test('hinted words alone repeat at the same level, with new gaps and original outcome preserved',()=>{
 const g=C.create(store(),'subset',words);g.start(words.map(w=>w.id));const weak=g.entry().id,holes=[...g.entry().holes];g.hint();assert.equal(solve(g),'hinted');g.next();finish(g);g.advance();
 assert.equal(g.state.active.phase,1);assert.deepEqual(g.state.active.tasks.map(t=>t.id),[weak]);assert.notDeepEqual(g.entry().holes,holes);assert.equal(g.state.active.bridge,false);
 finish(g);g.advance();assert.equal(g.state.active.phase,2);
 const evidence=g.state.active.completed.find(t=>t.id===weak&&t.phase===1);assert.equal(evidence.result,'hinted');assert.equal(evidence.recalled,true);assert.equal(evidence.recalls,1);
});

test('repeated hints or revealing never unlock full spelling; no growing task log across retries',()=>{
 const g=C.create(store(),'repeat',words);g.start(['village']);
 for(let i=0;i<12;i++){
  for(let n=0;n<4;n++)g.hint();if(i%2)g.reveal();else solve(g);g.next();g.advance();
  assert.equal(g.state.active.phase,1);assert.equal(g.state.active.bridge,false);assert.equal(g.state.active.completed.length,1);assert.equal(g.state.active.tasks.length,1);
 }
 for(let phase=1;phase<=3;phase++){assert.equal(g.state.active.phase,phase);finish(g);g.advance();}
 assert.equal(g.state.active.phase,4);assert.equal(g.state.active.bridge,true);
});

test('many distinct wrong attempts require independent recall before increasing difficulty',()=>{
 const g=C.create(store(),'wrong',words);g.start(['fox']);const t=g.entry(),right=Array.from(g.word().name)[t.holes[0]].toLowerCase(),wrong=t.tiles.map((c,i)=>c!==right?i:-1).filter(i=>i>=0);
 for(const i of wrong){g.remove(0);g.choose(i);assert.equal(g.check(),'wrong');assert.equal(g.check(),'repeat');}
 assert.equal(t.errors,3);assert.equal(solve(g),'corrected');g.next();g.advance();assert.equal(g.state.active.phase,1);
 finish(g);g.advance();assert.equal(g.state.active.phase,2);
});

test('review slots, order, errors and hints survive reload, with independent class keys',()=>{
 const s=store(),g=C.create(s,'reload',words,{grade:3});g.start(['village']);g.hint();solve(g);g.next();g.advance();g.choose(0);g.check();g.hint();
 const snapshot=JSON.parse(JSON.stringify(g.state.active));assert.deepEqual(C.create(s,'reload',words,{grade:3}).state.active,snapshot);assert.equal(C.create(s,'reload',words,{grade:4}).state.active,null);
});

test('an assisted legacy earlier phase is revisited while later clean evidence and saved drafts remain intact',()=>{
 const s=store(),g=C.create(s,'old',words);g.start(['fox']);finish(g);g.advance();finish(g);g.advance();
 const raw=JSON.parse(s.getItem(g.key));delete raw.active.recallPolicy;delete raw.active.recallPass;raw.active.completed[0].result='hinted';delete raw.active.completed[0].recalled;s.setItem(g.key,JSON.stringify(raw));
 const r=C.create(s,'old',words);assert.deepEqual(r.state.active,raw.active);finish(r);r.advance();assert.equal(r.state.active.phase,1);
 const again=C.create(s,'old',words);assert.deepEqual(again.state.active,r.state.active);finish(again);again.advance();assert.equal(again.state.active.phase,4);
 const legacy=JSON.parse(s.getItem(g.key));delete legacy.active.recallPolicy;legacy.active.completed[0].recalled=false;legacy.active.tasks[0].text='draft';s.setItem(g.key,JSON.stringify(legacy));
 assert.equal(C.create(s,'old',words).entry().text,'draft');assert.equal(C.create(s,'old',words).state.active.phase,4);
});

test('new full spelling cannot restore without all required independent recalls',()=>{
 const s=store(),g=C.create(s,'invalid',words);g.start(['fox']);for(let i=0;i<3;i++){finish(g);g.advance();}
 const raw=JSON.parse(s.getItem(g.key));raw.active.completed[0].result='seen';raw.active.completed[0].recalled=false;s.setItem(g.key,JSON.stringify(raw));
 assert.equal(C.create(s,'invalid',words).state.active,null);
});
