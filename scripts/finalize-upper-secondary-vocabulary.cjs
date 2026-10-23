const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),work=path.join(root,'artifacts/upper-secondary-vocabulary');
// Danh sách đã xem trực tiếp ngày 23/10/2026; thay ảnh phải xem lại và cập nhật hồ sơ.
const reviewedKeys=new Set([
 '10/1/9','10/1/10','10/2/9','10/2/10','10/3/9','10/3/10','10/4/9','10/4/10','10/5/9','10/5/10',
 '10/6/9','10/6/10','10/7/9','10/7/10','10/8/9','10/8/10','10/9/9','10/9/10','10/10/9','10/10/10',
 '11/1/9','11/1/10','11/2/9','11/2/10','11/3/9','11/3/10','11/4/9','11/4/10','11/5/9','11/5/10',
 '11/6/9','11/6/10','11/7/9','11/7/10','11/8/9','11/8/10','11/9/9','11/9/10','11/10/9','11/10/10',
 '12/1/9','12/1/10','12/2/9','12/2/10','12/3/9','12/3/10','12/4/9','12/4/10','12/5/9','12/5/10',
 '12/6/9','12/6/10','12/7/9','12/7/10','12/8/9','12/8/10','12/9/9','12/9/10','12/10/9','12/10/10'
]);
const file=path.join(root,'docs/content/upper-secondary-vocabulary-image-review.json');
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,f))).digest('hex');
if(fs.existsSync(file)){
 const previous=JSON.parse(fs.readFileSync(file,'utf8'));
 for(const a of previous.assets)if(hash(a.file)!==a.sha256)throw Error('Cần xem lại ảnh đã thay đổi: '+a.key);
 console.log('Hồ sơ kiểm tra ảnh đã tồn tại và hash khớp.');
}else{
 const plan=JSON.parse(fs.readFileSync(path.join(work,'image-plan.json'),'utf8'));
 const generated=JSON.parse(fs.readFileSync(path.join(work,'generated.json'),'utf8'));
 if(plan.length!==60)throw Error('Phải đủ 60 mục');
 const assets=plan.map(a=>{
  if(!reviewedKeys.has(a.key))throw Error('Chưa xem '+a.key);
  const g=generated.filter(x=>x.key===a.key).at(-1);
  let image=a.file;
  if(g){
   const pending=path.join(work,'pending',a.key.replaceAll('/','-')+`-v${g.version||1}.webp`);
   image=`grade/lop${a.grade}/assets/images/pencil/unit${a.unit}/${a.wordId}-vocab100-v1.webp`;
   fs.mkdirSync(path.dirname(path.join(root,image)),{recursive:true});fs.copyFileSync(pending,path.join(root,image));
  }
  return {key:a.key,term:a.term,file:image,sha256:hash(image),reviewed:true,noReadableText:true,
   review:'Đã mở và xem trực tiếp: đúng nghĩa trong ngữ cảnh học, không chữ, người/đồ vật và hành động hợp lý.',
   ...(g?{source:g.source,version:g.version||1}:{}),...(a.reference?{reference:a.reference}:{})};
 });
 fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify({reviewedOn:'2026-10-23',assets},null,2)+'\n');
 console.log('Đã lưu 60 mục tranh được xem trực tiếp, cùng hash tệp.');
}
