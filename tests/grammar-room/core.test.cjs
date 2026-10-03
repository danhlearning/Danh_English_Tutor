const test=require('node:test');
const assert=require('node:assert/strict');
const C=require('../../assets/data/grammar/catalog.js');
const Q=require('../../assets/data/grammar/questions.js');
const A=require('../../assets/js/grammar/answer-checker.js');
const R=require('../../assets/js/grammar/round-selection.js');
const P=require('../../assets/js/grammar/progress.js');
const S=require('../../assets/js/grammar/session.js');
const map=Object.fromEntries(Q.map(q=>[q.id,q]));
const kinds=['first','corrected','seen','skipped'];
function rng(seed){return ()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);}
test('Every published question has a real gap, correct sample, distinct wrong option and reviewed metadata',()=>{
 assert.equal(C.topics.length,25);assert.equal(Q.length,1530);assert.equal(new Set(Q.map(q=>q.id)).size,Q.length);assert.equal(new Set(Q.map(q=>q.familyId)).size,510);
 for(const t of C.topics){assert.equal(t.examples.length,2);for(const s of t.seeds){assert.ok(s.sentence.includes(s.focus),`${t.id}: ${s.sentence}`);assert.notEqual(s.focus,s.wrong);}}
 for(const q of Q){assert.equal(q.status,'reviewed');assert.ok(q.instruction&&q.explanation&&q.theoryUrl);assert.ok(A.accepted(q,q.answers[0]),q.id);if(q.type==='fill'||q.type==='choice')assert.ok(q.prompt.includes('_____'),q.id);if(q.type==='rewrite'){assert.ok(q.prompt&&q.requiredWord);assert.ok(q.answers[0].toLowerCase().split(/[^a-z']+/).includes(q.requiredWord.toLowerCase()),q.id);}if(q.type==='choice'){assert.equal(new Set(q.options.map(A.normalize)).size,2);assert.ok(!A.accepted(q,q.options[1]),q.id);}}
});
test('All 75 topic/level pools make balanced rounds in varied orders without repeated scenarios',()=>{
 for(const t of C.topics)for(let l=1;l<=3;l++)for(let seed=1;seed<=15;seed++){
  const pool=R.shuffle(Q.filter(q=>q.topic===t.id&&q.level===l),rng(seed));const selected=R.select(pool,{random:rng(seed+10)});
  assert.equal(selected.length,10,`${t.id}/${l}`);assert.equal(new Set(selected.map(q=>q.familyId)).size,10);
  for(const [type,count]of Object.entries(R.quota))assert.equal(selected.filter(q=>q.type===type).length,count);
 }
});
test('Review uses short pools, duplicate variants once, and missing types never get padded',()=>{
 const q=Q[0],variant=Q.find(item=>item.familyId===q.familyId&&item.id!==q.id);
 assert.equal(R.select([q,variant],{mode:'review'}).length,1);
 assert.equal(R.select(Q.filter(q=>q.topic==='be'&&q.type==='fill'&&q.level===1)).length,2);
});
test('Mixed rounds balance chosen topics and avoid a single topic dominating',()=>{
 for(let seed=1;seed<=25;seed++){
 const selected=R.select(Q.filter(q=>q.level===1&&['be','passive'].includes(q.topic)),{mode:'mixed',random:rng(seed)});
 assert.equal(selected.length,10);assert.equal(selected.filter(q=>q.topic==='be').length,5);assert.equal(selected.filter(q=>q.topic==='passive').length,5);
 for(const[type,count]of Object.entries(R.quota))assert.equal(selected.filter(q=>q.type===type).length,count);
 }
});
test('Unseen scenarios precede already practiced scenarios; due recall is first',()=>{
 const pool=Q.filter(q=>q.topic==='present-simple'&&q.level===1),first=R.select(pool,{random:rng(3)}),state=P.fresh();
 first.forEach(q=>P.record(state,q,{kind:'first',attempts:0},'first',0));
 const second=R.select(pool,{records:state.records,now:1,random:rng(6)});assert.ok(second.every(q=>!first.some(x=>x.familyId===q.familyId)));
 const due=first.find(q=>q.type==='choice');state.records[due.id].due=0;assert.ok(R.select(pool,{records:state.records,now:1,random:rng(6)}).some(q=>q.id===due.id));
});
test('Whitespace, smart quotes and contractions are accepted while negation and subject changes are rejected',()=>{
 const q=Q.find(q=>q.type==='rewrite'&&q.topic==='past-simple');
 assert.ok(A.accepted(q,'  He  did not come yesterday.  '));assert.ok(!A.accepted(q,"He didn’t come yesterday."));assert.ok(!A.accepted(q,'He came yesterday.'));assert.ok(!A.accepted(q,'They did not come yesterday.'));assert.ok(!A.accepted(q,''));
 const fill=Q.find(q=>q.type==='fill'&&q.topic==='past-simple'&&q.level===1);assert.ok(A.accepted(fill," didn’t finish "));
 const relative=Q.find(q=>q.type==='rewrite'&&q.topic==='relative-clauses');assert.ok(!A.accepted(relative,relative.answers[0].replace('who','that')));
});
test('Reveal and hints are gated by active elapsed time and attempts, never the wall clock',()=>{
 const q=Q.find(q=>q.type==='rewrite');const s=S.create([q],{topic:q.topic,level:q.level,mode:'topic'},0);
 assert.ok(!S.canReveal(s));s.elapsed=59999;assert.ok(!S.canHint(s,q));assert.ok(!S.canReveal(s));s.elapsed=60000;assert.ok(S.canHint(s,q));assert.ok(S.canReveal(s));s.elapsed=0;s.attempts=2;assert.ok(S.canReveal(s));
});
test('A revealed answer remains seen and repeated completion cannot inflate outcomes or stored scores',()=>{
 const q=Q[0],s=S.create([q],{topic:q.topic,level:1,mode:'topic'}),state=P.fresh();s.revealed=true;
 assert.ok(S.finishQuestion(s,'first'));assert.equal(s.outcomes[0].kind,'seen');assert.ok(!S.finishQuestion(s,'first'));
 assert.ok(P.record(state,q,s.outcomes[0],s.id));assert.ok(!P.record(state,q,{kind:'first',attempts:0},s.id));
 assert.equal(S.next(s),'complete');assert.ok(P.completed(state,s));assert.ok(!P.completed(state,s));assert.equal(state.rounds.length,1);
});
test('Wrong / corrected / seen / skipped start at 1 day; successful recalls advance 3,7,14 and reset after a new miss',()=>{
 for(const kind of kinds.filter(k=>k!=='first')){
 const state=P.fresh(),q=Q[0];let now=0;P.record(state,q,{kind,attempts:1},'a',now);assert.equal(state.records[q.id].due,P.DAY);
 for(const[step,days]of [[1,3],[2,7],[3,14]]){now=state.records[q.id].due;P.record(state,q,{kind:'first',attempts:0},`r${step}`,now);assert.equal(state.records[q.id].due-now,days*P.DAY);}
 assert.equal(state.records[q.id].needsReview,false);now=state.records[q.id].due;P.record(state,q,{kind:'corrected',attempts:1},'new-miss',now);assert.equal(state.records[q.id].due-now,P.DAY);assert.equal(state.records[q.id].needsReview,true);
 }
});
test('Storage failures and malformed content have safe fallbacks and preserve unrelated keys',()=>{
 const broken={getItem(){throw Error();},setItem(){throw Error();}};assert.ok(P.load(broken).warning);assert.equal(P.save(broken,P.fresh()),false);
 assert.ok(P.load({getItem:()=>'{'}).warning);assert.ok(P.load({getItem:()=>JSON.stringify({version:99})}).warning);
 const keys={'danh-g7-test':'keep'},storage={getItem:key=>keys[key]||null,setItem:(key,value)=>keys[key]=value};P.save(storage,P.fresh());assert.equal(keys['danh-g7-test'],'keep');assert.equal(P.load(storage).state.version,1);
});
test('Saved rounds retain question order, answer, retries and reject a changed question version',()=>{
 const qs=R.select(Q.filter(q=>q.topic==='be'&&q.level===1)),s=S.create(qs,{topic:'be',level:1,mode:'topic'});s.answer='draft';s.attempts=1;
 const restored=JSON.parse(JSON.stringify(s));assert.ok(S.compatible(restored,map));assert.deepEqual(restored.questionIds,s.questionIds);assert.equal(restored.answer,'draft');
 restored.questionVersions[0]=99;assert.ok(!S.compatible(restored,map));restored.questionVersions[0]=1;restored.index=20;assert.ok(!S.compatible(restored,map));
});
test('Mastery requires two disjoint complete rounds and a delayed recall; small banks stay in progress',()=>{
 const state=P.fresh(),pool=Q.filter(q=>q.topic==='present-simple'&&q.level===1),first=R.select(pool,{random:rng(1)}),second=R.select(pool.filter(q=>!first.some(x=>x.familyId===q.familyId)),{random:rng(2)});
 const store=(qs,id,mode,ended)=>{const s=S.create(qs,{topic:'present-simple',level:1,mode},0);s.id=id;s.outcomes=qs.map(()=>({kind:'first',attempts:0}));P.completed(state,s,ended);};
 store(first,'a','topic',0);store(second,'b','topic',P.DAY);assert.ok(!P.mastered(state,'present-simple',1,Q));store(first,'c','review',7*P.DAY);assert.ok(!P.mastered(state,'present-simple',1,Q));store(first,'d','review',8*P.DAY);assert.ok(P.mastered(state,'present-simple',1,Q));assert.ok(!P.mastered(state,'be',1,Q));
});
