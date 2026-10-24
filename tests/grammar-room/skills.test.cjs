const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const Q=require('../../assets/data/grammar/questions.js'),C=require('../../assets/data/grammar/catalog.js'),L=require('../../assets/js/grammar/skills-library.js'),R=require('../../assets/js/grammar/round-selection.js'),S=require('../../assets/js/grammar/session.js'),P=require('../../assets/js/grammar/progress.js'),A=require('../../assets/js/grammar/answer-checker.js');
test('Skill levels and modes select original reviewed families without duplicating support variants',()=>{
 for(const cefr of [...L.bands,'all'])for(const game of Object.keys(L.modes)){
  const settings={cefr,game},pool=L.pool(Q,settings),turn=L.select(Q,settings,R,{});
  assert.equal(turn.length,Math.min(8,new Set(pool.map(q=>q.familyId)).size));assert.equal(new Set(turn.map(q=>q.familyId)).size,turn.length);
  for(const q of turn){assert(Q.includes(q));assert.equal(q.level,2);assert(cefr==='all'||L.band(q)===cefr);assert(game==='mixed'||q.type===game);assert(A.accepted(q,q.answers[0]));}
  if(game==='mixed')for(const type of new Set(pool.map(q=>q.type)))assert(turn.some(q=>q.type===type),cefr+' '+type);
 }
 assert(L.pool(Q,{cefr:'B2'}).every(q=>q.topic==='conditionals'));for(const cefr of ['Pre A1','C1','C2'])assert.equal(L.pool(Q,{cefr}).length,0);
});
test('Every replay sentence and scored answer has a real internal WAV; no new sentence bank is copied',()=>{
 const key=s=>{let h=2166136261;for(const c of s.replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase())h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0).toString(16).padStart(8,'0');};
 for(const q of Q){assert(C.topics.find(t=>t.id===q.topic).seeds.some(s=>s.sentence===L.sentence(q)));for(const text of [L.sentence(q),q.answers[0]])assert(fs.existsSync(`shared/answer-audio/${key(text)}.wav`),text);}
});
test('Hint-assisted answers remain review evidence and survive restore without becoming first-try success',()=>{
 const q=Q[0],s=S.create([q],{topic:q.topic,level:q.level,mode:'topic'});s.hint=true;S.finishQuestion(s,'corrected');assert.equal(S.result(s).hinted,true);
 const state=P.fresh();P.record(state,q,S.result(s),s.id);assert.equal(state.records[q.id].hinted,true);assert.equal(state.records[q.id].needsReview,true);assert.equal(state.records[q.id].stage,-1);
 const map={[q.id]:q};assert(S.compatible(JSON.parse(JSON.stringify(s)),map));assert.equal(S.finishQuestion(s,'first'),false);
});
