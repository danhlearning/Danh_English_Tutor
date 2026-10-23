// Chỉ nối ảnh có nhận xét trực tiếp và đã được duyệt.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),base='artifacts/grade12-images/';
const read=f=>JSON.parse(fs.readFileSync(path.join(root,f),'utf8'));
const plan=read(base+'image-plan.json'),generated=read(base+'generated.json'),notes=read(base+'visual-review-notes.json');
const assets=plan.map(a=>{
 const review=notes.assets[a.key];if(!review||review.length<30)throw Error('Chưa duyệt '+a.key);
 const candidate=generated.filter(g=>g.key===a.key).at(-1);
 let file,source,action;
 if(candidate){
  const suffix=`unit${a.unit}/${a.wordId}-v${candidate.version||1}.webp`;
  source=base+'pending/'+suffix;file='grade/lop12/assets/images/pencil/'+suffix;
  fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.copyFileSync(path.join(root,source),path.join(root,file));action='created';
 }else{file=a.file;source=a.file;action='reused';}
 if(!file||!fs.existsSync(path.join(root,file)))throw Error('Thiếu tệp '+a.key);
 return{key:a.key,unit:a.unit,wordId:a.wordId,term:a.term,file,source,action,reviewed:true,noReadableText:true,review,reviewedAt:'2026-10-23',sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex')};
});
if(assets.length!==80||!notes.cover)throw Error('Thiếu 80 ảnh hoặc nhận xét bìa');
fs.writeFileSync(path.join(root,'docs/content/grade12-image-review.json'),JSON.stringify({grade:12,cover:{file:'grade/lop12/assets/images/grade12-cover-pencil-v1.webp',reviewed:true,review:notes.cover},rejectedReuse:notes.rejectedReuse,rejectedGenerated:notes.rejectedGenerated,assets},null,2));
console.log(`Lớp 12: ${assets.filter(a=>a.action==='created').length} tranh mới, ${assets.filter(a=>a.action==='reused').length} tranh dùng lại đã xem.`);
