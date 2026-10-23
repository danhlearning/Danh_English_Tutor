const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
test('Grade 4: every vocabulary entry uses reviewed pencil artwork and keeps its identity',()=>{
 const manifest=JSON.parse(read('grade/lop4/assets/images/pencil/manifest.json'));
 assert.equal(manifest.grade,4);assert.equal(manifest.style,'colored-pencil');assert.equal(Object.keys(manifest.images).length,122);
 const c={window:{}};for(const file of ['units-data.js','extended-units-data.js','pencil-images.js','grade2-course.js'])vm.runInNewContext(read('grade/lop4/assets/js/'+file),c);
 let count=0;
 for(const unit of c.window.DanhPrimaryGrade2Course.units){
  const original=c.window.DanhGrade4Units[unit.id];
  assert.deepEqual(Array.from(unit.words,w=>[w.id,w.name]),Array.from(original.words,w=>[w.id,w.name]));
  for(const w of unit.words){const art=manifest.images[w.name.toLowerCase()];assert.equal(art.reviewed,true);assert.equal(w.image,'../../'+art.src);assert.ok(w.visual.includes(w.image));assert.ok(original.words.find(x=>x.id===w.id).visual.includes(w.image));count++;}
  for(const prefix of ['', 'previous-'])assert.ok(read(`grade/lop4/${prefix}${unit.id}.html`).includes(prefix?'pencil-images.js?v=g4-pencil-20261022-1':'grade2-course.js?v=g4-pencil-20261022-1'));
 }
 assert.equal(count,132);assert.equal(manifest.wordCount,count);
 for(const art of Object.values(manifest.images)){const bytes=fs.readFileSync(path.join(root,art.src));assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),art.sha256);assert.equal(bytes.toString('ascii',8,12),'WEBP');}
 assert.equal(manifest.images.football.src,manifest.images['play football'].src);
 assert.notEqual(manifest.images.watch.src,manifest.images['watch tv'].src);
});
