const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const {Review,KEY,modes,normalize}=require('../assets/js/mixed-review-core.js');
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
 m.select(['gsunit1','gsunit2']);const r=m.start();assert.equal(r.tasks.length,10);
 assert(r.tasks.every(t=>['gsunit1','gsunit2'].includes(m.words.get(t.key).unitId)));
 for(const t of r.tasks)assert(t.options.every(k=>m.choiceDomain(t,r.units).some(o=>o.value===k)));
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
 for(let i=0;i<m.round.tasks.length;i++){
  if(m.isChoice())assert.equal(m.submit(m.solution()),'first');
  else assert.equal(m.submit('  '+m.expected().toUpperCase()+'  '),'first');
  assert(m.next());
 }
 assert.equal(m.state.history.length,1);assert(!m.next());assert.equal(m.state.history.length,1);assert.equal(m.totals().score,100);
 m.start();m.resolve('skipped');m.next();const needed=m.needsReview().filter(t=>m.round.answers[m.round.tasks.indexOf(t)].outcome);m.select(['gsunit16']);m.start(needed);
 assert(m.validRound(m.round));const restored=make(s);assert.equal(restored.round.tasks.length,1);assert(restored.validRound(restored.round));
});

test('Ngân hàng: 96 câu mới, 32 hội thoại, 800 nhiệm vụ; đủ 9 dạng ở từng Unit',()=>{
 const content=require('../assets/data/mixed-review-content.js'),m=make();
 assert.equal(content.sentences.length,96);assert.equal(content.dialogues.length,32);assert.equal(m.contexts.size,144);assert.equal(m.bank.size,800);
 for(const id of m.unitIds)for(const mode of modes)assert(m.catalog([id],[mode]).length>0,`${id}/${mode}`);
 for(const r of m.bank.values()){
  assert(m.words.has(r.key));assert(r.answer&&r.meaning);assert(!/[\u00c0-\u1ef9]/.test(r.answer),'English answer only');
  if(r.mode==='gap')assert.equal((r.masked.match(/____/g)||[]).length,1);
  if(r.mode==='letters')assert.equal(r.masked.replace('__',r.letter),r.answer.toLowerCase());
  const task=m.makeTask(r,m.unitIds);assert(task.options.length<=4);
  if(m.isChoice(task)){
   assert.equal(task.options.filter(v=>v===m.solution(task)).length,1);
   const labels=task.options.map(v=>m.choiceDomain(task,m.unitIds).find(o=>o.value===v).text);
   assert.equal(new Set(labels.map(normalize)).size,labels.length,'Distinct choice labels: '+r.id);
  }
 }
});

test('Mỗi lượt phủ Unit/dạng, không lặp tình huống; lượt tiếp ưu tiên nội dung khác',()=>{
 const m=make();let r=m.start();assert.equal(new Set(r.tasks.map(t=>t.mode)).size,9);
 assert.equal(new Set(r.tasks.map(t=>m.record(t).family)).size,r.tasks.length);
 m.select(['gsunit1']);const first=m.start(),families=new Set(first.tasks.map(t=>m.record(t).family));const second=m.start();
 assert(second.tasks.some(t=>!families.has(m.record(t).family)));
 assert(m.selectModes(['dialogue']));r=m.start();assert.equal(r.tasks.length,2);assert(r.tasks.every(t=>t.mode==='dialogue'));
 assert(!m.selectModes([]));assert(!m.selectModes(['unknown']));assert(m.selectModes(['meaning']));assert.equal(m.roundLength(),3);
});

test('Mọi từ/câu đúng đều có WAV tiếng Anh nội bộ thật để dự phòng',()=>{
 const m=make(),texts=new Set([...m.bank.values()].map(r=>r.answer));
 for(const text of texts){
  const clean=text.replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase();let hash=2166136261;
  for(const c of clean)hash=Math.imul(hash^c.charCodeAt(0),16777619);
  const file=path.resolve(__dirname,'../../../shared/answer-audio',(hash>>>0).toString(16).padStart(8,'0')+'.wav'),wav=fs.readFileSync(file);
  assert(wav.length>1000,text);assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,12),'WAVE');
 }
});

test('Mọi dạng chấm đúng ngay/tự sửa/gợi ý, đọc từ hoặc cả câu, phục hồi qua tải lại',()=>{
 for(const mode of modes){
  const s=storage(),m=make(s);m.select(['gsunit1','gsunit2']);m.selectModes([mode]);m.start();
  assert.equal(m.submit(''),'empty');assert.equal(m.answer.mistakes,0);
  const expected=m.expected(),correct=m.isChoice()?m.solution():expected;
  assert.equal(m.submit(m.isChoice()?m.task.options.find(v=>v!==correct):'not an answer'),'wrong');assert.equal(m.submit(correct),'retry');
  assert.equal(m.expected(),expected);if(mode==='letters')assert(expected.length>1,'Read the complete word, not a letter');
  assert.equal(m.submit(correct),'locked');assert.equal(m.totals().score,5);
  const restored=make(s);assert.deepEqual(restored.round,m.round);assert.equal(restored.expected(),expected);assert(restored.validRound(restored.round));
  restored.next();restored.hint();assert.equal(restored.submit(restored.isChoice()?restored.solution():restored.expected()),'hinted');assert.equal(restored.totals().score,8);
 }
});

test('Lượt v1 thật vẫn giữ nguyên thứ tự, lựa chọn, kết quả, mảnh câu và tổng điểm',()=>{
 const fixture=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/mixed-review-v1.json'),'utf8')),s=storage();s.setItem(KEY,JSON.stringify(fixture));
 const m=make(s);assert(!m.recovered);assert.deepEqual(m.round,fixture.active);assert.equal(m.task.mode,'sentence');assert.equal(m.answer.parts.length,1);assert.equal(m.totals().score,18);
 assert.equal(m.submit(m.expected()),'first');m.next();m.selectModes(['dialogue']);const old=JSON.stringify(m.round);m.select(['gsunit16']);assert.equal(JSON.stringify(m.round),old);
 const restored=make(s);assert.deepEqual(restored.round,m.round);assert.deepEqual(restored.state.selectedModes,['dialogue']);
});

test('Dữ liệu lượt mới giả không vượt khỏi Unit, ngân hàng hoặc giới hạn chấm',()=>{
 for(const mutate of [r=>r.tasks[0].id='no-task',r=>r.tasks[0].key='gsunit16:tent',r=>r.tasks[0].options.push('foreign'),r=>r.answers[0].outcome='first',r=>r.tasks[0].tokenOrder=[999]]){
  const s=storage(),m=make(s);m.select(['gsunit1']);m.start();const saved=JSON.parse(s.getItem(KEY));mutate(saved.active);s.setItem(KEY,JSON.stringify(saved));
  // A current first-try result is legal; make that forged result contradict its mistakes.
  if(saved.active.answers[0].outcome==='first'){saved.active.answers[0].mistakes=2;s.setItem(KEY,JSON.stringify(saved));}
  const restored=make(s);assert(restored.recovered);assert.equal(restored.round,null);
 }
});
test('Bộ nhớ hỏng/bị chặn và dữ liệu lượt giả không làm treo bài',()=>{
 const s=storage();s.setItem(KEY,'{broken');let m=make(s);assert(m.recovered);m.start();assert(m.round);
 const raw=JSON.parse(s.getItem(KEY));raw.active.tasks[0].key='foreign';s.setItem(KEY,JSON.stringify(raw));m=make(s);assert.equal(m.round,null);assert(m.recovered);
 const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};m=make(blocked);m.start();assert.equal(m.storageAvailable,false);assert(m.round);m.resolve('skipped');assert(m.next());
 const unrelated='danh.learning.gsunit1.v1';s.setItem(unrelated,'unit-progress');m=make(s);m.select(['gsunit1']);m.start();assert.equal(s.getItem(unrelated),'unit-progress');
});
