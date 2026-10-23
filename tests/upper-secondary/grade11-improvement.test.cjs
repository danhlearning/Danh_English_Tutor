const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{test}=require('node:test');
const root=path.resolve(__dirname,'../..');
function load(){const c={window:{}};for(const n of ['units-data','grammar-data','grammar-complete-data','grammar-improvement-data'])vm.runInNewContext(fs.readFileSync(path.join(root,'grade/lop11/assets/js/'+n+'.js'),'utf8'),c);return c.window;}
test('Lớp 11 giữ 60 ID/nội dung cũ, thêm 20 từ và 60 tình huống độc lập',()=>{
 const w=load(),units=w.DanhGrade11Units,bank=w.DanhGrade11Grammar;
 assert.equal(units.length,10);assert.equal(units.flatMap(u=>u.words).length,100);assert.equal(bank.length,350);assert.equal(new Set(bank.map(q=>q.id)).size,350);
 const old=require('../../scripts/upper-secondary-content.cjs')[11].split('\n\n');
 for(const u of units){assert.equal(u.words.length,10);const rows=old[u.number-1].split('\n').slice(1,7);rows.forEach((row,i)=>{assert.equal(u.words[i].id,i+1);assert.equal(u.words[i].term,row.split('|')[0]);});
  const added=bank.filter(q=>q.id.startsWith(`g11-enhanced-u${u.number}-`));assert.equal(added.length,6);assert.equal(new Set(added.map(q=>q.answer)).size,6);
  for(const level of ['easy','medium','hard'])for(const type of ['choice','fill','order','correct'])assert(bank.some(q=>q.id===`g11-u${u.number}-${level}-${type}`));
 }
});
test('80 tranh dùng đúng tệp đã xem, không có đường dẫn ảnh thiếu',()=>{
 const audit=require('../../docs/content/grade11-image-review.json'),units=load().DanhGrade11Units;
 assert.equal(audit.assets.length,80);assert.equal(audit.assets.filter(a=>a.action==='created').length,52);assert(audit.cover.reviewed);
 for(const a of audit.assets){assert(a.reviewed&&a.noReadableText&&a.review.length>25);const file=path.join(root,a.file);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),a.sha256);assert.equal(path.resolve(root,'grade/lop11',units[a.unit-1].words.find(w=>w.id===a.wordId).image),file);}
});
test('Tất cả từ/đáp án mới có WAV dự phòng nội bộ',()=>{
 const w=load(),plan=require('../../artifacts/correct-answer-speech/audio-plan.json');
 const clean=s=>s.replace(/[’‘]/g,"'").toLowerCase();
 for(const text of [...w.DanhGrade11Units.flatMap(u=>u.words.map(w=>w.term)),...w.DanhGrade11Grammar.filter(q=>q.id.startsWith('g11-enhanced')).map(q=>q.answer)]){
  const a=plan.find(a=>clean(a.text)===clean(text));assert(a,text);assert(fs.statSync(path.join(root,'shared/answer-audio/'+a.id+'.wav')).size>44,text);
 }
});
