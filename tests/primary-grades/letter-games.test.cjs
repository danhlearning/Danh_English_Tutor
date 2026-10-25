const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const C=require('../../grade/lop2/assets/js/letter-ladder-core.js'),R=require('../../grade/lop2/assets/js/letter-review.js'),B=require('../../scripts/lib/primary-letter-pages.cjs');
const course=g=>{const c={window:{}};vm.runInNewContext(fs.readFileSync(`grade/lop${g}/assets/js/grade2-course.js`,'utf8'),c);return c.window.DanhPrimaryGrade2Course;};
const store=()=>{const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};};
test('Grades 3 and 4 have independent letter rounds and ten-Unit semesters using their own banks',()=>{
 const s=store(),keys=[];for(const grade of [3,4]){const units=course(grade).units,words=R.catalog(units);assert.equal(units.length,20);const first=units.slice(0,10).map(u=>u.id),second=units.slice(10).map(u=>u.id);assert.equal(R.scope(first,units),'review-term1');assert.equal(R.scope(second,units),'review-term2');assert.notEqual(R.scope(units.slice(0,8).map(u=>u.id),units),'review-term1');
  for(const term of [first,second]){const scope=R.scope(term,units),g=C.create(s,scope,words,{grade,chooseGroup:ids=>R.chooseGroup(ids,words,term)});g.start(words.filter(w=>w.unitIds.some(id=>term.includes(id))).map(w=>w.id));assert(g.key.startsWith(`danh-g${grade}-`));keys.push(g.key);assert(g.state.active.ids.length<=8);assert(g.state.active.ids.every(id=>words.find(w=>w.id===id).unitIds.some(u=>term.includes(u))));g.choose(0);assert.deepEqual(C.create(s,scope,words,{grade}).state.active,g.state.active);}
 }assert.equal(new Set(keys).size,4);assert.equal(s.getItem('danh-g2-letter-ladder-review-term1-v1'),null);
});
test('All primary Unit and review pages enable the shared game and retain legacy lesson data',()=>{
 for(const grade of [1,3,4,5]){const {units}=course(grade);for(const u of units){const html=fs.readFileSync(`grade/lop${grade}/${u.id}.html`,'utf8');assert(html.includes('letter-ladder-core.js'));assert(html.indexOf('letter-ladder.js?')<html.indexOf('assets/js/learning-core.js'));assert(html.includes(`data-grade="${grade}"`));assert.equal(B.enable(html,grade),html);}
  const review=fs.readFileSync(`grade/lop${grade}/review.html`,'utf8');assert(review.includes('id="start-letters"'));assert(review.includes('letter-review.js'));assert.equal(B.enable(review,grade,true),review);assert(fs.readFileSync(`grade/lop${grade}/previous-unit1.html`,'utf8').includes('letter-ladder-core.js'));
 }
 for(const grade of [1,5])assert(fs.readFileSync(`grade/lop${grade}/unit1.html`,'utf8').includes('letter-ladder-core.js'));
});
