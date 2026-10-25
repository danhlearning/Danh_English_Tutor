const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const C=require('../assets/js/letter-ladder-core.js');
const words=[{id:'pizza',name:'Pizza',meaning:'bánh pizza'},{id:'popcorn',name:'Popcorn',meaning:'bỏng ngô'},{id:'a',name:'A',meaning:'một'},{id:'ice',name:'Ice cream',meaning:'kem'},{id:'hyphen',name:'T-shirt',meaning:'áo phông'}];
const store=()=>{const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};};
function solve(g){const a=g.state.active,t=g.entry(),w=g.word();if(a.phase===4)g.text(w.name);else{const used=new Set();for(const i of t.holes){const n=t.tiles.findIndex((c,n)=>!used.has(n)&&c===Array.from(w.name)[i].toLowerCase());used.add(n);g.choose(n);}}return g.check();}
function finishStage(g){while(g.entry()){assert.equal(solve(g),'first');assert.equal(g.check(),null);assert(g.next());}}
test('The same distinct words repeat at 1, 2, 3 letters and then full spelling, with short words skipped honestly',()=>{
 const g=C.create(store(),'unit',words),ids=words.map(w=>w.id);g.start(ids);const original=[...g.state.active.ids];
 for(let phase=1;phase<=4;phase++){const a=g.state.active;assert.equal(a.phase,phase);assert.deepEqual(new Set(a.tasks.map(t=>t.id)),new Set(original.filter(id=>phase===4||C.positions(g.byId.get(id)).length>=phase)));for(const t of a.tasks){assert.equal(t.holes.length,phase===4?0:phase);assert(!t.holes.some(i=>!/[a-z]/i.test(Array.from(g.byId.get(t.id).name)[i])));}finishStage(g);if(phase<4)assert(g.advance());}
 assert.equal(g.state.active.bridge,true);assert.equal(g.advance(),false);g.standalone();assert.equal(g.state.active.bridge,false);
});
test('Repeated letters have distinct reusable tiles; removing a slot releases only its own tile',()=>{
 const g=C.create(store(),'pizza',words);g.start(['pizza']);finishStage(g);g.advance();finishStage(g);g.advance();const t=g.entry();
 for(let i=0;i<t.holes.length;i++)assert(g.choose(i));assert.equal(g.choose(0),false);assert(g.remove(1));assert.equal(t.draft[1],null);assert(g.choose(1));assert.equal(t.draft[1],1);
});
test('Words reshuffle between recalls without immediate repeats; reload preserves the chosen random order',()=>{
 for(const ids of [['pizza','popcorn','ice'],['pizza','popcorn'],['pizza']])for(let run=0;run<12;run++){
  const s=store(),g=C.create(s,'random',words);g.start(ids);
  for(let phase=1;phase<4;phase++){
   const previous=g.state.active.tasks.map(t=>t.id);finishStage(g);g.advance();const next=g.state.active.tasks.map(t=>t.id);
   assert.deepEqual(new Set(next),new Set(ids));if(ids.length>1)assert.notEqual(next[0],previous.at(-1));if(ids.length>2)assert.notDeepEqual(next,previous);
   const restored=C.create(s,'random',words);assert.deepEqual(restored.state.active,g.state.active);
  }
  const last=g.state.active.tasks.at(-1).id;finishStage(g);g.start(ids);if(ids.length>1)assert.notEqual(g.entry().id,last);
 }
});
test('Blank, repeat, self correction, hints and reveal do not inflate first-try evidence',()=>{
 const g=C.create(store(),'test',words);g.start(['pizza']);assert.equal(g.check(),'empty');assert.equal(g.entry().errors,0);assert.equal(g.reveal(),false);
 const t=g.entry(),expected=Array.from(g.word().name)[t.holes[0]].toLowerCase(),wrong=t.tiles.findIndex(c=>c!==expected);g.choose(wrong);assert.equal(g.check(),'wrong');assert.equal(g.check(),'repeat');assert.equal(t.errors,1);g.remove(0);assert.equal(solve(g),'corrected');assert.equal(g.check(),null);assert.equal(g.state.history['pizza:1'].count,1);
 g.next();g.advance();assert.equal(g.state.active.phase,1);finishStage(g);g.advance();assert(g.hint());assert.equal(solve(g),'hinted');g.next();g.advance();assert.equal(g.state.active.phase,2);finishStage(g);g.advance();assert(g.hint());assert.equal(g.reveal(),'seen');assert.equal(g.check(),null);assert.equal(g.state.history['pizza:3'].last,'seen');
});
test('Exact slots, tiles, draft, phase and spelling draft survive reload; old learning and other profiles stay independent',()=>{
 const s=store(),g=C.create(s,'unit',words);s.setItem('danh.learning.unit.v1','old cards and spelling');g.start(['pizza','popcorn']);g.choose(0);const before=JSON.parse(JSON.stringify(g.state.active)),r=C.create(s,'unit',words);assert.deepEqual(r.state.active,before);assert.equal(s.getItem('danh.learning.unit.v1'),'old cards and spelling');assert.equal(C.create(store(),'unit',words).state.active,null);
 r.remove(0);finishStage(r);r.advance();finishStage(r);r.advance();finishStage(r);r.advance();r.text('draft');assert.equal(C.create(s,'unit',words).entry().text,'draft');
});
test('Selection changes retain the previous turn; malformed indices and blocked storage remain safe',()=>{
 const s=store(),g=C.create(s,'unit',words);g.start(['pizza']);g.ensure(['popcorn']);assert.equal(g.state.active,null);assert.deepEqual(g.state.previous.ids,['pizza']);g.start(['popcorn']);const raw=JSON.parse(s.getItem(g.key));raw.active.tasks[0].draft=[1000];s.setItem(g.key,JSON.stringify(raw));const bad=C.create(s,'unit',words);assert.equal(bad.state.active,null);assert(bad.warning);
 const blocked=C.create({getItem(){throw Error();},setItem(){throw Error();}},'unit',words);assert(blocked.start(['pizza']));assert.equal(solve(blocked),'first');assert(blocked.warning);
});
test('Grade 2 lessons load the shared letter game before the engine',()=>{
 const pages=fs.readdirSync('grade/lop2').filter(p=>p.endsWith('.html')).map(p=>fs.readFileSync('grade/lop2/'+p,'utf8')).filter(s=>s.includes('src="./assets/js/learning-core.js?v=site-letters-20261025'));
 assert.equal(pages.length,35);for(const html of pages){assert(html.indexOf('letter-ladder-core.js')<html.indexOf('letter-ladder.js?'));assert(html.indexOf('letter-ladder.js?')<html.indexOf('src="./assets/js/learning-core.js?v=site-letters-20261025'));assert(html.includes('letter-ladder.css'));}
 const source=fs.readFileSync('grade/lop2/assets/js/letter-ladder.js','utf8');for(const [pathname,search,enabled]of [['/grade/lop2/gsunit1.html','',true],['/grade/lop1/unit1.html','',false],['/grade/lop2/bodyparts.html','?fromGrade=4',true]]){const ctx={window:{},document:{body:{dataset:{}},getElementById(){return null;}},location:{pathname,search},URLSearchParams};vm.runInNewContext(source,ctx);assert.equal(ctx.window.DanhLetterLadder.enabled,enabled);}
});
