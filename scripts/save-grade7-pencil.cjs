const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..');
const [key,source]=process.argv.slice(2),asset=require('./grade7-pencil-plan.cjs').find(a=>`${a.unit}-${a.wordId}`===key);
if(!asset||!source)throw Error('Thiếu khóa ảnh hoặc đường dẫn ảnh tạo.');
(async()=>{const target=path.join(root,asset.file);fs.mkdirSync(path.dirname(target),{recursive:true});await sharp(source).resize(768,768,{fit:'contain',background:'#fbf6eb'}).webp({quality:88}).toFile(target);const record={...asset,mode:'built-in image_gen',source};const dir=path.join(root,'artifacts/grade7-pencil/records');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,key+'.json'),JSON.stringify(record,null,2));console.log('Saved '+asset.file);})().catch(e=>{console.error(e);process.exitCode=1});
