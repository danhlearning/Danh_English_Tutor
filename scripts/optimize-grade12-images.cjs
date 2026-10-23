const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),base=path.join(root,'artifacts/grade12-images');
(async()=>{const items=JSON.parse(fs.readFileSync(path.join(base,'generated.json'),'utf8'));
for(const a of items){const [u,w]=a.key.split('/'),file=path.join(base,`pending/unit${u}/${w}-v${a.version||1}.webp`);fs.mkdirSync(path.dirname(file),{recursive:true});if(!fs.existsSync(file))await sharp(a.source).resize(768,768,{fit:'contain',background:'#fffaf0'}).webp({quality:88}).toFile(file);}
console.log(`Đã tối ưu ${items.length} ảnh để kiểm tra, chưa nối vào bài.`);})().catch(e=>{console.error(e);process.exitCode=1});
