const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
for (const [grade,count,wordCount,sentenceCount] of [[1,16,4,3],[5,20,6,4]]) {
  test(`Lớp ${grade}: nội dung, ảnh, ID, câu và trang công khai`,()=>{
    const context={window:{}};
    vm.runInNewContext(fs.readFileSync(path.join(root,`grade/lop${grade}/units.js`),'utf8'),context);
    vm.runInNewContext(fs.readFileSync(path.join(root,`grade/lop${grade}/assets/js/grade2-course.js`),'utf8'),context);
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
      const scripts=['learner-profile-core.js','learner-profile.js','learning-core.js','grade2-course.js','primary-grade2-lesson.js'];
      for(const script of scripts)assert.ok(html.indexOf(script)>=0,`${u.id}: thiếu ${script}`);
      for(let n=1;n<scripts.length;n++)assert.ok(html.indexOf(scripts[n-1])<html.indexOf(scripts[n]),`${u.id}: thứ tự tải ${scripts[n]}`);
      const current=context.window.DanhPrimaryGrade2Course.units.find(unit=>unit.id===u.id);
      assert.ok(current,`${u.id}: thiếu dữ liệu hiện tại`);
      assert.deepEqual(Array.from(current.words,w=>[w.id,w.name,w.meaning]),Array.from(u.words,w=>[w.id,w.term,w.meaning]));
      for(const word of current.words){
        assert.ok(word.image&&word.visual.includes(word.image),`${u.id}/${word.id}: ảnh hiện tại`);
        assert.ok(fs.existsSync(path.resolve(root,`grade/lop${grade}`,word.image)),word.image);
      }
      assert.ok(html.includes(`data-unit="${u.id}"`));
    }
  });
}
test('Danh mục lớp 1–5 có đường dẫn hoạt động và giữ URL cũ',()=>{
  const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
  for(const grade of [1,2,3,4,5]) {
    const href=`grade/lop${grade}/lop${grade}.html`;
    assert.ok(home.includes(`href="${href}"`));
    const catalog=fs.readFileSync(path.join(root,href),'utf8');
    assert.ok(catalog.includes('href="../../index.html"'));
    assert.ok(catalog.includes(`grade${grade}-cover-pencil-v1.webp`));
    assert.ok(!catalog.includes('<primary-grade-nav'));
  }
});
