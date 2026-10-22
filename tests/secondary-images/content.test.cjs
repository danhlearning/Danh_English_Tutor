const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..');
test('Ảnh lớp 7 chỉ dùng phiên bản đã duyệt, cùng kích thước và không có chú thích trong ảnh',()=>{
 const review=JSON.parse(fs.readFileSync(path.join(root,'artifacts/grade7-pencil/final-prompts.json'),'utf8'));
 const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'grade/lop7/assets/js/units-data.js'),'utf8'),c);
 const words=c.window.DanhGrade7Units.flatMap(u=>u.words).filter(w=>w.image);assert.equal(words.length,96);assert.equal(review.assets.length,96);
 for(const word of words){
  assert.match(word.image,/\/pencil\/unit\d+\/\d+-v1\.webp$/);const file=path.resolve(root,'grade/lop7',word.image),record=review.assets.find(r=>path.resolve(root,r.file)===file);
  assert.ok(record?.reviewedVisually);assert.ok(record?.noReadableText);
  const bytes=fs.readFileSync(file);assert.equal(bytes.toString('ascii',12,16),'VP8 ');assert.equal(bytes.readUInt16LE(26)&0x3fff,768);assert.equal(bytes.readUInt16LE(28)&0x3fff,768);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),record.sha256,'Ảnh đổi nội dung: phải xem và duyệt lại.');
 }
 assert.ok(review.assets.every(r=>r.prompt&&r.source));
});
test('Đủ 24 Unit lớp 6–7 dùng chung khung, không còn hướng dẫn nghĩa nằm trong ảnh',()=>{
 for(const grade of [6,7])for(let unit=1;unit<=12;unit++){
  const html=fs.readFileSync(path.join(root,`grade/lop${grade}/unit${unit}.html`),'utf8');assert.match(html,/shared\/secondary-vocabulary-visuals\.css/);assert.ok(!html.includes('nghĩa tiếng Việt trong ảnh'));
 }
});
