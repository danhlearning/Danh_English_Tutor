const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {createStore,DAY}=require('../../shared/primary-template-progress.js');
const root=path.resolve(__dirname,'../..'),memory=()=>{const data=new Map();return {getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};};
test('Ba lớp có sáu hoạt động cùng lớp 4, nội dung/IPA/ảnh bitmap và câu có đúng một chỗ trống',()=>{
  const reference=fs.readFileSync(path.join(root,'grade/lop4/unit1.html'),'utf8');
  const tabs=[...reference.matchAll(/data-tab="([^"]+)"/g)].map(m=>m[1]);
  for(const grade of [1,3,5]){
    const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,`grade/lop${grade}/assets/js/course.js`),'utf8'),c);
    const course=c.window.DanhPrimaryTemplateCourse;
    assert.equal(course.grade,grade);assert.equal(course.units.length,grade===1?16:20);
    for(const u of course.units){
      const html=fs.readFileSync(path.join(root,`grade/lop${grade}/${u.id}.html`),'utf8');
      assert.deepEqual([...html.matchAll(/data-tab="([^"]+)"/g)].map(m=>m[1]),tabs);
      assert.ok(html.includes('../lop4/assets/css/grade4.css'));assert.ok(html.includes('../lop2/assets/js/learning-core.js'));
      for(const w of u.words){assert.match(w.ipa,/^\/.+\/$/);assert.equal(w.context.split('____').length,2,`${grade} ${u.id} ${w.name}`);assert.ok(w.visual.includes('<image href='));assert.ok(!w.visual.includes('<text'));assert.ok(!/\p{Extended_Pictographic}/u.test(w.visual));assert.ok(fs.existsSync(path.resolve(root,`grade/lop${grade}`,w.image)),`${grade} ${u.id}: ${w.image}`);}
    }
    assert.ok(fs.existsSync(path.join(root,`grade/lop${grade}/legacy.html`)));
  }
});
test('Tiến độ/lịch ôn mới cách ly lớp, không biến tự sửa/xem thành đúng ngay, lưu lỗi an toàn',()=>{
  const storage=memory();let now=0;const a=createStore(storage,1,()=>now),b=createStore(storage,3,()=>now),c=createStore(storage,5,()=>now);
  a.practice('unit1:w1','listening',{correct:false});assert.equal(a.summary(['unit1:w1']).due,1);
  a.practice('unit1:w1','listening',{correct:true,firstTry:false});assert.equal(a.get('unit1:w1').skills.listening,undefined);
  a.practice('unit1:w2','spelling',{correct:false,revealed:true});assert.equal(a.get('unit1:w2').skills.spelling,undefined);
  a.practice('unit1:w3','spelling',{correct:true,firstTry:true});assert.equal(a.get('unit1:w3').skills.spelling,true);
  assert.equal(b.get('unit1:w1'),null);assert.equal(c.get('unit1:w1'),null);
  a.review('unit1:w1',true);assert.equal(a.get('unit1:w1').dueAt,DAY);now=DAY;assert.ok(a.due(['unit1:w1']).includes('unit1:w1'));
  a.review('unit1:w1',false);assert.equal(a.get('unit1:w1').reviewStage,0);
  assert.ok(createStore(storage,1).get('unit1:w1'));assert.equal(createStore(storage,3).get('unit1:w1'),null);
  storage.setItem('danh.grade5.words.v1',JSON.stringify({version:1,words:{'unit1:w1':{skills:'bad',attempts:'bad'},'unit1:w2':null}}));
  const fixed=createStore(storage,5);fixed.practice('unit1:w1','spelling',{correct:true,firstTry:true});assert.equal(fixed.get('unit1:w1').skills.spelling,true);
  const blocked=createStore({getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}},1);blocked.practice('unit1:w1','spelling',{correct:true,firstTry:true});assert.equal(blocked.get('unit1:w1').skills.spelling,true);
});
