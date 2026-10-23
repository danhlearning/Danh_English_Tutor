const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const assert=require('node:assert/strict'),{test}=require('node:test');
const root=path.resolve(__dirname,'../..'),baseline=require('../../artifacts/upper-secondary-vocabulary/baseline-units.json');
const audit=require('../../docs/content/upper-secondary-vocabulary-image-review.json');
test('300 từ có ID riêng; giữ nguyên 240 từ cũ; 60 mục mới có tranh đã xem và WAV',()=>{
 const plan=require('../../artifacts/correct-answer-speech/audio-plan.json');assert.equal(audit.assets.length,60);
 for(const g of [10,11,12]){
  const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,`grade/lop${g}/assets/js/units-data.js`),'utf8'),c);
  for(const u of c.window[`DanhGrade${g}Units`]){
   assert.equal(u.words.length,10);assert.equal(new Set(u.words.map(w=>w.term)).size,10);
   const previous=baseline[g][u.number-1].words,actual=JSON.parse(JSON.stringify(u.words.slice(0,8)));
   for(let i=0;i<actual.length;i++)if(actual[i].image!==previous[i].image){
    const approved=require('../../docs/content/vietnamese-uniform-image-review.json').assets.find(a=>g===10&&a.key===`${u.id}-${actual[i].id}`);
    assert(approved,'Đổi ảnh cũ phải có hồ sơ sửa được duyệt');assert.equal(path.resolve(root,`grade/lop${g}`,actual[i].image),path.resolve(root,approved.file));actual[i].image=previous[i].image;
   }
   assert.deepEqual(actual,previous);
   for(const w of u.words.slice(8)){
    const a=audit.assets.find(a=>a.key===`${g}/${u.number}/${w.id}`);assert.equal(a.term,w.term);assert(a.reviewed&&a.noReadableText);
    const imagePath=path.resolve(root,`grade/lop${g}`,w.image);assert.equal(imagePath,path.resolve(root,a.file));
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(imagePath)).digest('hex'),a.sha256);
    const audio=plan.find(a=>a.text.toLowerCase()===w.term.toLowerCase());assert(audio,w.term);
    const wav=fs.readFileSync(path.join(root,'shared/answer-audio',audio.id+'.wav'));assert.equal(wav.toString('ascii',0,4),'RIFF');assert(wav.length>1000&&wav.subarray(44).some(b=>b!==0));
   }
  }
 }
});
