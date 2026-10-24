const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const R=require('../assets/js/letter-review.js'),C=require('../assets/js/letter-ladder-core.js');
const ctx={window:{}};for(const p of ['gs-unit1-data.js','gs-units-data.js'])vm.runInNewContext(fs.readFileSync('grade/lop2/assets/data/'+p,'utf8'),ctx);
const units=Object.values(ctx.window.grade2Units).sort((a,b)=>Number(a.id.replace(/\D/g,''))-Number(b.id.replace(/\D/g,''))),words=R.catalog(units),store=()=>{const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};};
test('Semester review reuses original words and senses with stable source IDs and deduplicated spellings',()=>{
 for(const w of words){const u=units.find(u=>u.id===w.unitIds[0]),source=u.words.find(s=>s.id===w.sourceId);assert.equal(w.name,source.name);assert.equal(w.meaning,source.meaning);assert.equal(w.id,u.id+':'+source.id);assert(w.unitIds.every(id=>units.find(u=>u.id===id).words.some(s=>s.name.toLowerCase()===w.name.toLowerCase()&&s.meaning.toLowerCase()===w.meaning.toLowerCase())));}
 assert.equal(new Set(words.map(w=>w.name.toLowerCase()+'|'+w.meaning.toLowerCase())).size,words.length);
});
test('Each eight-word semester group covers the eight selected Units before adding extra words',()=>{
 for(const offset of [0,8]){const ids=units.slice(offset,offset+8).map(u=>u.id),pool=words.filter(w=>w.unitIds.some(id=>ids.includes(id))).map(w=>w.id);for(const ranked of [pool,[...pool].reverse()]){const picked=R.chooseGroup(ranked,words,ids);assert.equal(picked.length,8);const covered=new Set(picked.flatMap(id=>words.find(w=>w.id===id).unitIds.filter(id=>ids.includes(id))));assert.deepEqual(covered,new Set(ids));}}
});
test('Semesters and custom sets have separate restorable rounds; old mixed-review and Unit keys stay untouched',()=>{
 const s=store();s.setItem('danh-g2-mixed-review-v1','old mixed turn');s.setItem('danh.learning.gsunit1.v1','old Unit');const first=units.slice(0,8).map(u=>u.id),second=units.slice(8).map(u=>u.id),a=C.create(s,R.scope(first,units),words),b=C.create(s,R.scope(second,units),words);
 a.start(words.filter(w=>w.unitIds.some(id=>first.includes(id))).map(w=>w.id));a.choose(0);b.start(words.filter(w=>w.unitIds.some(id=>second.includes(id))).map(w=>w.id));assert.notEqual(a.key,b.key);assert.deepEqual(C.create(s,R.scope(first,units),words).state.active,a.state.active);assert.equal(s.getItem('danh-g2-mixed-review-v1'),'old mixed turn');assert.equal(s.getItem('danh.learning.gsunit1.v1'),'old Unit');assert.equal(R.scope([first[2],first[0]],units),R.scope([first[0],first[2]],units));assert.notEqual(R.scope([first[0]],units),R.scope([first[1]],units));
});
