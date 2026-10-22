const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'../..');
const crypto=require('node:crypto');
const imageReview=JSON.parse(fs.readFileSync(path.join(root,'docs/content/grade8-9-image-review.json'),'utf8'));
for(const grade of [8,9])test(`Lớp ${grade}: nội dung, đáp án, hình và vùng lưu`,()=>{
  const c={window:{}};vm.createContext(c);
  for(const file of ['units-data','grammar-data'])vm.runInContext(fs.readFileSync(path.join(root,`grade/lop${grade}/assets/js/${file}.js`),'utf8'),c);
  const units=c.window[`DanhGrade${grade}Units`],bank=c.window[`DanhGrade${grade}Grammar`];
  assert.equal(units.length,12);assert.equal(bank.length,252);assert.equal(new Set(bank.map(q=>q.id)).size,252);
  for(const u of units){
    assert.equal(u.words.length,8);assert.equal(new Set(u.words.map(w=>w.term)).size,8);
    for(const w of u.words){for(const field of ['term','meaning','example','icon'])assert.ok(w[field]);if(w.image){const file=path.resolve(root,`grade/lop${grade}`,w.image);assert.ok(fs.existsSync(file),w.image);const review=imageReview.images.find(r=>path.resolve(root,r.path)===file);assert.ok(review?.noTextInside,'Ảnh chưa được xem trực tiếp: '+w.image);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),review.sha256,'Ảnh đã thay đổi; cần xem và duyệt lại.');}}
    for(const level of ['easy','medium','hard']){
      const group=bank.filter(q=>q.unit===u.number&&q.level===level);assert.equal(group.length,7);
      assert.equal(new Set(group.map(q=>q.type)).size,5);
      for(const q of group){assert.ok(q.answer);assert.ok(q.rule);assert.ok(q.explain);if(q.options){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.equal(q.options.filter(v=>v===q.answer).length,1);}if(q.parts)assert.equal(q.parts.join(' '),q.answer);if(q.type==='rewrite')assert.ok(q.answer.split('|').every(v=>v.startsWith(q.cue.split(' ...')[0])));}
    }
    const html=fs.readFileSync(path.join(root,`grade/lop${grade}/${u.id}.html`),'utf8');
    assert.ok(html.indexOf('learner-profile-core.js')<html.indexOf('learner-profile.js'));assert.ok(html.indexOf('learner-profile.js')<html.indexOf('units-data.js'));
  }
  for(const q of bank.filter(q=>q.type==='choice'))assert.ok(!q.prompt.toLowerCase().includes('dùng '+q.answer.toLowerCase()),'Đề chép đáp án: '+q.id);
  const lesson=fs.readFileSync(path.join(root,`grade/lop${grade}/assets/js/lesson.js`),'utf8');assert.ok(lesson.includes(`danh-g${grade}-`));assert.ok(!lesson.includes('localStorage'));assert.ok(!lesson.includes('mark(word);'),'Gõ từ không được ghi đè bằng chứng chọn từ.');
});
