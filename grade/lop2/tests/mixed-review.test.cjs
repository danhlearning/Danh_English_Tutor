const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {Review,KEY}=require('../assets/js/mixed-review-core.js');
const context={window:{}};vm.createContext(context);
for(const file of ['gs-unit1-data.js','gs-units-data.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../assets/data',file),'utf8'),context);
const units=JSON.parse(JSON.stringify(context.window.grade2Units));
const storage=()=>{const data=new Map();return {getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v),data};};
const make=store=>new Review(units,store||storage(),()=>.4);
test('16 Unit được gộp đầy đủ; chọn Unit giới hạn từ và phủ từng Unit trong lượt',()=>{
 const m=make();assert.equal(m.units.length,16);assert.equal(m.words.size,48);
 const all=m.start();assert.equal(all.tasks.length,16);assert.equal(new Set(all.tasks.map(t=>m.words.get(t.key).unitId)).size,16);
 assert.equal(new Set(all.tasks.map(t=>t.key)).size,16);assert(m.validRound(all));
 assert.equal(m.select([]),false);assert.equal(m.select(['no-unit']),false);
 m.select(['gsunit1','gsunit2']);const r=m.start();assert.equal(r.tasks.length,6);
 assert(r.tasks.every(t=>['gsunit1','gsunit2'].includes(m.words.get(t.key).unitId)));
 for(const t of r.tasks)assert(t.options.every(k=>['gsunit1','gsunit2'].includes(m.words.get(k).unitId)));
});
test('Rỗng, nhấn lặp, tự sửa, gợi ý, đã xem và bỏ qua có kết quả riêng',()=>{
 const m=make();m.select(['gsunit1','gsunit2','gsunit3','gsunit4']);m.start();
 assert.equal(m.submit(''),'empty');assert.equal(m.answer.mistakes,0);
 assert.equal(m.submit(m.task.options.find(k=>k!==m.task.key)),'wrong');assert.equal(m.answer.mistakes,1);
 assert.equal(m.submit(m.answer.lastAttempt),'repeat');assert.equal(m.answer.mistakes,1);
 assert.equal(m.submit(m.task.key),'retry');assert.equal(m.submit(m.task.key),'locked');assert.equal(m.totals().score,5);
 assert(m.next());assert(!m.next());m.hint();assert.equal(m.submit(m.task.key),'hinted');m.next();
 m.draft('nháp');assert(m.resolve('revealed'));assert(!m.resolve('skipped'));m.next();
 assert(m.resolve('skipped'));m.next();
 const totals=m.totals();assert.equal(totals.retry,1);assert.equal(totals.hinted,1);assert.equal(totals.revealed,1);assert.equal(totals.skipped,1);assert.equal(totals.score,8);
});
test('Đổi bộ không xóa lượt dở; lưu nháp, đáp án và mảnh câu qua tải lại',()=>{
 const s=storage(),m=make(s);m.select(['gsunit1','gsunit2','gsunit3','gsunit4']);m.start();
 const original=JSON.stringify(m.round);m.select(['gsunit16']);assert.equal(JSON.stringify(m.round),original);
 m.resolve('skipped');m.next();m.resolve('skipped');m.next();m.draft('piz');
 let restored=make(s);assert.equal(restored.answer.draft,'piz');assert.deepEqual(restored.round,m.round);assert.deepEqual(restored.state.selected,['gsunit16']);
 restored.resolve('skipped');restored.next();assert.equal(restored.task.mode,'sentence');
 restored.togglePart(restored.task.tokenOrder[0]);restored=make(s);assert.equal(restored.answer.parts.length,1);assert(restored.validRound(restored.round));
});
test('Chấm chính tả và câu theo đáp án bài; tổng kết không nhân đôi lịch sử, ôn lại khôi phục được',()=>{
 const s=storage(),m=make(s);m.select(['gsunit1','gsunit2']);m.start();
 while(m.task){
  const t=m.task;if(t.mode==='spelling')assert.equal(m.submit('  '+m.expected().toUpperCase()+'  '),'first');
  else if(t.mode==='sentence')assert.equal(m.submit(m.expected().toLowerCase().replace('.','')),'first');
  else m.submit(t.key);
  m.next();
 }
 assert.equal(m.state.history.length,1);assert(!m.next());assert.equal(m.state.history.length,1);assert.equal(m.totals().score,60);
 m.start();m.resolve('skipped');m.next();const needed=m.needsReview().filter(t=>m.round.answers[m.round.tasks.indexOf(t)].outcome);m.select(['gsunit16']);m.start(needed);
 assert(m.validRound(m.round));const restored=make(s);assert.equal(restored.round.tasks.length,1);assert(restored.validRound(restored.round));
});
test('Bộ nhớ hỏng/bị chặn và dữ liệu lượt giả không làm treo bài',()=>{
 const s=storage();s.setItem(KEY,'{broken');let m=make(s);assert(m.recovered);m.start();assert(m.round);
 const raw=JSON.parse(s.getItem(KEY));raw.active.tasks[0].key='foreign';s.setItem(KEY,JSON.stringify(raw));m=make(s);assert.equal(m.round,null);assert(m.recovered);
 const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};m=make(blocked);m.start();assert.equal(m.storageAvailable,false);assert(m.round);m.resolve('skipped');assert(m.next());
 const unrelated='danh.learning.gsunit1.v1';s.setItem(unrelated,'unit-progress');m=make(s);m.select(['gsunit1']);m.start();assert.equal(s.getItem(unrelated),'unit-progress');
});
