const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),content=require('./upper-secondary-vocabulary-extension.cjs');
const auditFile=path.join(root,'docs/content/upper-secondary-vocabulary-image-review.json');
function extend(grade,units){
 if(!content[grade]||!fs.existsSync(auditFile))return units;
 const audit=JSON.parse(fs.readFileSync(auditFile,'utf8')).assets;
 for(const unit of units)for(const [index,row]of content[grade][unit.number-1].entries()){
  const id=index+9,key=`${grade}/${unit.number}/${id}`,a=audit.find(a=>a.key===key);
  if(!a||a.term!==row[0]||!a.reviewed||!a.noReadableText)throw Error('Ảnh chưa duyệt: '+key);
  if(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,a.file))).digest('hex')!==a.sha256)throw Error('Ảnh đã thay đổi: '+key);
  const word={id,term:row[0],meaning:row[1],example:row[2],icon:unit.icon,image:'./'+path.posix.relative(`grade/lop${grade}`,a.file)};
  const existing=unit.words.find(w=>w.id===id);
  if(existing&&existing.term!==word.term)throw Error('ID đã dùng: '+key);
  if(existing)Object.assign(existing,word);else unit.words.push(word);
 }
 return units;
}
function versionPages(grade){
 if(!fs.existsSync(auditFile))return;
 const dir=path.join(root,`grade/lop${grade}`);
 const version=grade===10?'vocab100-20261023-border1':'vocab100-20261023';
 for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.html'))){const file=path.join(dir,name),s=fs.readFileSync(file,'utf8');fs.writeFileSync(file,s.replace(/((?:pencil-images-data|units-data)\.js)(?:\?[^"']*)?/g,'$1?v='+version).replace(/<p class="g6-note">Đọc từ, xem tranh[^<]*<\/p>/g,''));}
}
module.exports={extend,versionPages};
if(require.main===module){
 if(!fs.existsSync(auditFile))throw Error('Chưa có hồ sơ kiểm tra ảnh.');
 for(const grade of [10,11,12]){
  const dir=path.join(root,`grade/lop${grade}/assets/js`),file=path.join(dir,'units-data.js'),c={window:{}};
  vm.runInNewContext(fs.readFileSync(file,'utf8'),c);const units=c.window[`DanhGrade${grade}Units`];extend(grade,units);
  fs.writeFileSync(file,`window.DanhGrade${grade}Units = ${JSON.stringify(units,null,2)};\n`);
  if(grade===10)fs.writeFileSync(path.join(dir,'pencil-images-data.js'),`window.DanhGrade10PencilImages = ${JSON.stringify(Object.fromEntries(units.map(u=>[u.id,Object.fromEntries(u.words.map(w=>[w.id,w.image]))])),null,2)};\n`);
  versionPages(grade);console.log(`Lớp ${grade}: ${units.flatMap(u=>u.words).length} từ.`);
 }
}
