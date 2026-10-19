const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..');
test('Tranh bút chì lớp 6 chỉ dùng ảnh cuối đã xem và giữ nguyên ID/nghĩa/câu ví dụ',()=>{
 const plan=JSON.parse(fs.readFileSync(path.join(root,'artifacts/grade6-pencil/generation.json'),'utf8'));
 const review=JSON.parse(fs.readFileSync(path.join(root,'artifacts/grade6-pencil/individual-review.json'),'utf8'));
 assert.equal(plan.assets.length,96);assert.equal(new Set(plan.assets.map(a=>a.key)).size,96);
 const c={window:{}};vm.createContext(c);
 for(const file of ['pencil-images-data.js','units-data.js'])vm.runInContext(fs.readFileSync(path.join(root,'grade/lop6/assets/js',file),'utf8'),c);
 const units=c.window.DanhGrade6Units;assert.equal(units.length,12);
 for(const a of plan.assets){const w=units[a.unit-1].words[a.id-1];assert.equal(w.id,a.id);assert.equal(w.term,a.term);assert.equal(w.meaning,a.meaning);assert.equal(w.example,a.example);}
 assert.equal(units.flatMap(u=>u.words).filter(w=>w.image).length,review.records.length);
 for(const r of review.records){
  const a=plan.assets.find(a=>a.key===r.key),word=units[a.unit-1].words[a.id-1];
  assert.equal(path.resolve(root,'grade/lop6',word.image),path.resolve(root,r.file));
  assert(r.reviewedVisually&&r.noReadableText);assert.deepEqual(r.size,[768,768]);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root,r.file))).digest('hex'),r.sha256,r.key);
 }
 for(let n=1;n<=12;n++){const html=fs.readFileSync(path.join(root,`grade/lop6/unit${n}.html`),'utf8');assert(html.indexOf('pencil-images-data.js')<html.indexOf('units-data.js'));}
});
