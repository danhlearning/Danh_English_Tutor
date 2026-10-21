const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..');
test('96 tranh lớp 7 khớp bản duyệt, nội dung và ID đang học',()=>{
 const manifest=JSON.parse(fs.readFileSync(path.join(root,'artifacts/grade7-pencil/final-prompts.json'),'utf8'));
 const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'grade/lop7/assets/js/units-data.js'),'utf8'),c);
 const units=c.window.DanhGrade7Units;
 assert.equal(manifest.assets.length,96);assert.equal(new Set(manifest.assets.map(a=>a.file)).size,96);
 assert.equal(units.length,12);
 for(const a of manifest.assets){
  const w=units[a.unit-1].words[a.wordId-1];assert.equal(w.id,a.wordId);
  for(const key of ['term','meaning','example'])assert.equal(w[key],a[key],`${a.unit}/${a.wordId}: ${key}`);
  assert.equal(path.resolve(root,'grade/lop7',w.image),path.resolve(root,a.file));
  assert(a.reviewedVisually&&a.noReadableText);assert(a.prompt&&a.source);
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,a.file))).digest('hex'),a.sha256,a.file);
 }
 for(const name of fs.readdirSync(path.join(root,'grade/lop7')).filter(n=>n.endsWith('.html'))){
  const html=fs.readFileSync(path.join(root,'grade/lop7',name),'utf8');
  if(html.includes('units-data.js'))assert(html.includes('units-data.js?v=pencil-20261021'),name);
 }
});
