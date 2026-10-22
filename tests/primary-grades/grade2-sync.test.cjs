const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const {Review,modes}=require('../../grade/lop2/assets/js/mixed-review-core.js');
function bank(g){const c={window:{}};vm.runInNewContext(read(`grade/lop${g}/assets/js/grade2-course.js`),c);vm.runInNewContext(read('shared/primary-grade2-review.js'),c);return c.window;}
for(const g of [1,3,4,5]){
 test(`Lớp ${g}: Unit riêng, bốn game, ảnh và đường dẫn lượt trước còn đủ`,()=>{
  const course=bank(g).DanhPrimaryGrade2Course;assert.equal(course.units.length,g===1?16:20);
  for(const name of [`lop${g}.html`,'review.html',...course.units.map(u=>u.id+'.html')]){const html=read(`grade/lop${g}/${name}`);for(const m of html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css|html))(?:\?[^\"]*)?"/g)){if(/^https?:/.test(m[1]))continue;assert.ok(fs.existsSync(path.resolve(root,`grade/lop${g}`,m[1])),`${g}/${name}: ${m[1]}`);}}
  assert.equal((read(`grade/lop${g}/lop${g}.html`).match(/src="\.\.\/\.\.\/shared\/shared-topics\.js/g)||[]).length,1);
  for(const u of course.units){const html=read(`grade/lop${g}/${u.id}.html`);assert.ok(html.includes(`data-topic="g${g}${u.id}"`));assert.ok(html.includes('primary-grade2-lesson.js'));for(const mode of ['flip','mcq','spelling','count'])assert.ok(html.includes(`id="game-${mode}"`));assert.ok(fs.existsSync(path.join(root,`grade/lop${g}/previous-${u.id}.html`)));for(const w of u.words){if(w.image)assert.ok(fs.existsSync(path.resolve(root,`grade/lop${g}`,w.image)));assert.ok(w.visual);}}
 });
 test(`Lớp ${g}: chín dạng ôn, đúng/tự sửa/lưu lại và âm thanh nội bộ`,()=>{
  const data=bank(g),map=new Map(),storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
  const create=()=>new Review(data.grade2Units,storage,Math.random,data.DanhGrade2ReviewContent,data.DanhReviewConfig.key);
  const m=create();assert.equal(m.words.size,data.DanhPrimaryGrade2Course.units.reduce((n,u)=>n+u.words.length,0));assert.equal(new Set([...m.bank.values()].map(r=>r.mode)).size,9);
  for(const mode of modes){assert.ok(m.selectModes([mode]));const round=m.start();assert.ok(round.tasks.length);assert.ok(round.tasks.every(t=>t.mode===mode));const result=m.submit(m.isChoice()?m.solution():m.expected());assert.equal(result,'first');assert.equal(m.answer.outcome,'first');assert.equal(create().answer.outcome,'first');}
  const clean=s=>String(s).replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim().toLowerCase();
  for(const r of m.bank.values()){let h=2166136261;for(const c of clean(r.answer))h=Math.imul(h^c.charCodeAt(0),16777619);const file=path.join(root,`shared/answer-audio/${(h>>>0).toString(16).padStart(8,'0')}.wav`);assert.ok(fs.existsSync(file),r.answer);assert.ok(fs.statSync(file).size>1000);}
  assert.ok(map.has(`danh-g${g}-mixed-review-v1`));assert.ok(!map.has('danh-g2-mixed-review-v1'));
 });
}
