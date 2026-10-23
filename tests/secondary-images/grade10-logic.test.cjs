const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
test('Lớp 10: đủ 80 ảnh gốc đã rà logic, tám bản sửa đúng hash và cùng ID/nghĩa/câu',()=>{
 const audit=JSON.parse(read('docs/content/grade10-image-logic-review.json')),final=JSON.parse(read('artifacts/grade10-pencil/final-prompts.json'));
 const c={window:{}};vm.runInNewContext(read('grade/lop10/assets/js/units-data.js'),c);vm.runInNewContext(read('grade/lop10/assets/js/pencil-images-data.js'),c);
 assert.equal(audit.assets.length,80);assert.equal(audit.repairedImages,8);assert(audit.coverReviewed);assert.equal(new Set(audit.assets.map(a=>a.key)).size,80);
 assert.deepEqual(audit.assets.filter(a=>a.action==='repaired').map(a=>a.key).sort(),['unit3-7','unit5-4','unit5-5','unit6-7','unit7-2','unit8-4','unit10-2','unit10-6'].sort());
 for(const a of audit.assets){const unit=c.window.DanhGrade10Units[a.unit-1],word=unit.words.find(w=>w.id===a.wordId),record=final.assets.find(r=>r.key===a.key);assert.equal(word.term,a.term);assert.equal(path.resolve(root,'grade/lop10',word.image),path.resolve(root,a.file));assert.equal(c.window.DanhGrade10PencilImages[unit.id][word.id],word.image);assert(a.reviewedVisually&&a.noReadableText&&a.review);assert.equal(record.logicReviewedAt,a.key==='unit7-2'?'2026-10-23':'2026-10-22');assert.equal(record.file,a.file);
 const bytes=fs.readFileSync(path.join(root,a.file));assert.equal(bytes.toString('ascii',12,16),'VP8 ');assert.equal(bytes.readUInt16LE(26)&0x3fff,768);assert.equal(bytes.readUInt16LE(28)&0x3fff,768);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),a.sha256);
 if(a.action==='repaired'){assert.match(a.file,a.key==='unit7-2'?/-v4\.webp$/:/-v2\.webp$/);assert(record.repairPrompt&&record.source&&record.previousFile);assert.notEqual(record.sha256,record.previousSha256);}
 }
 for(let n=1;n<=10;n++)assert(read(`grade/lop10/unit${n}.html`).includes('units-data.js?v=vocab100-20261023-border1'));
 assert(read('scripts/build-grade10-complete.cjs').includes('currentImages.get'));
});
