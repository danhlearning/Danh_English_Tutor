const test=require('node:test'),assert=require('node:assert/strict');
const C=require('../../grade/lop2/assets/js/letter-ladder-core.js');
const store=()=>{const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};};
function finish(g){let guard=0;while(++guard<300){const a=g.state.active;if(a.index===a.tasks.length){if(a.phase===4)return;g.advance();continue;}const t=g.entry(),w=g.word();if(a.phase===4)g.text(w.name);else for(const hole of t.holes){const tile=t.tiles.findIndex((c,i)=>!t.draft.includes(i)&&c===w.name[hole].toLowerCase());g.choose(tile);}assert.equal(g.check(),'first');g.next();}throw Error('loop');}
test('random review groups cover every selected vocabulary sense before repeating, across reloads',()=>{
 const words=Array.from({length:23},(_,i)=>({id:'w'+i,name:'word '+String.fromCharCode(97+i),meaning:'nghĩa '+i})),s=store(),selected=words.slice(2,21).map(w=>w.id),seen=new Set();let first;
 for(let i=0;i<3;i++){let g;g=C.create(s,'coverage',words,{chooseGroup:ids=>C.reviewGroup(ids,g.state.history)});g.start(selected);const ids=g.state.active.ids;assert(ids.length<=8);for(const id of ids){assert(selected.includes(id));assert(!seen.has(id),'unseen word first');seen.add(id);}if(!first)first=ids;finish(g);}
 assert.equal(seen.size,selected.length);let g;g=C.create(s,'coverage',words,{chooseGroup:ids=>C.reviewGroup(ids,g.state.history)});g.start(selected);assert.equal(g.state.active.ids.length,8);assert.notDeepEqual(g.state.active.ids,first);
});
test('assisted words need independent recall before difficulty increases; draft and integration identity survive reload',()=>{
 const words=[{id:'cat',name:'cat',meaning:'mèo'}],s=store();let g=C.create(s,'integrated',words);g.start(['cat']);g.state.active.integratedRound='mixed-id';g.hint();const t=g.entry();g.choose(t.tiles.indexOf('cat'[t.holes[0]]));assert.equal(g.check(),'hinted');g.next();g.advance();assert.equal(g.state.active.phase,1);assert.equal(g.state.active.recallPass,1);g=C.create(s,'integrated',words);assert.equal(g.state.active.integratedRound,'mixed-id');finish(g);assert.equal(g.state.active.phase,4);
});
