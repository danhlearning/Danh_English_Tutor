const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
for (const [grade,count,wordCount,sentenceCount] of [[1,16,4,3],[5,20,6,4]]) {
  test(`Lớp ${grade}: nội dung, ảnh, ID, câu và trang công khai`,()=>{
    const context={window:{}};
    vm.runInNewContext(fs.readFileSync(path.join(root,`grade/lop${grade}/units.js`),'utf8'),context);
    const course=context.window.DanhPrimaryCourse;
    assert.equal(course.grade,grade);assert.equal(course.units.length,count);assert.equal(course.zones.length,4);
    for (const [i,u] of course.units.entries()) {
      assert.equal(u.id,`unit${i+1}`);assert.equal(u.number,i+1);assert.ok(u.goal&&u.title&&u.subtitle);
      assert.equal(u.words.length,wordCount);assert.equal(u.sentences.length,sentenceCount);
      for (const bank of [u.words,u.sentences]) {
        for (const field of ['id','term','meaning']) assert.equal(new Set(bank.map(w=>w[field])).size,bank.length,`${u.id}: ${field}`);
        for (const w of bank) assert.ok(w.id&&w.term&&w.meaning&&!w.term.includes('|'));
      }
      for (const s of u.sentences) {assert.match(s.term,/^[A-Z]/);assert.match(s.term,/[.?!]$/);assert.ok(s.term.split(' ').length>=2);}
      for (const w of u.words) if (/^[a-z-]+$/.test(w.art)) assert.ok(fs.existsSync(path.join(root,`shared/assets/vocabulary-3d/${w.art}-3d-v1.webp`)),w.art);
      const html=fs.readFileSync(path.join(root,`grade/lop${grade}/${u.id}.html`),'utf8');
      assert.ok(html.indexOf('learner-profile-core.js')<html.indexOf('learner-profile.js'));
      assert.ok(html.indexOf('learner-profile.js')<html.indexOf('primary-template-lesson.js'));
      assert.ok(html.includes(`data-unit="${u.id}"`));
    }
  });
}
test('Danh mục lớp 1–5 có đường dẫn hoạt động và giữ URL cũ',()=>{
  const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
  for(const grade of [1,2,3,4,5]) {
    const href=`grade/lop${grade}/lop${grade}.html`;
    assert.ok(home.includes(`href="${href}"`));
    assert.ok(fs.readFileSync(path.join(root,href),'utf8').includes(`<primary-grade-nav grade="${grade}">`));
  }
});
