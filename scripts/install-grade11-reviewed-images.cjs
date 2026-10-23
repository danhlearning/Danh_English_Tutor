// Chỉ cài các tệp có nhận xét sau khi đã xem trực tiếp từng ảnh.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const plan=require('../artifacts/grade11-improvement/image-plan.json');
const generated=require('../artifacts/grade11-improvement/generated-reviewed-candidates.json');
const notes=require('../artifacts/grade11-improvement/visual-review-notes.json');
const assets=plan.map(a=>{
 const candidate=generated.filter(x=>x.key===a.key).at(-1);
 let file,review,action,source;
 if(candidate){
  review=notes.new[a.key];if(!review)throw Error('Chưa duyệt '+a.key);
  const suffix=`unit${a.unit}/${a.wordId}-v${candidate.version||1}.webp`;
  source='artifacts/grade11-improvement/pending/'+suffix;
  file='grade/lop11/assets/images/pencil/'+suffix;
  fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.copyFileSync(path.join(root,source),path.join(root,file));action='created';
 }else{file=a.file;review=notes.reuse[a.key];source=a.file;action='reused';}
 if(!file||!review)throw Error('Thiếu ảnh đã duyệt '+a.key);
 const sha256=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
 return {key:a.key,unit:a.unit,wordId:a.wordId,term:a.term,file,source,sha256,action,reviewed:true,noReadableText:true,review,reviewedAt:'2026-10-22'};
});
if(assets.length!==80)throw Error('Thiếu ảnh');
fs.writeFileSync(path.join(root,'docs/content/grade11-image-review.json'),JSON.stringify({grade:11,cover:{file:'grade/lop11/assets/images/grade11-cover-pencil-v1.webp',review:notes.cover,reviewed:true},assets},null,2));
console.log(`Đã cài ${assets.filter(x=>x.action==='created').length} tranh mới, ${assets.filter(x=>x.action==='reused').length} tranh dùng lại đã xem.`);
