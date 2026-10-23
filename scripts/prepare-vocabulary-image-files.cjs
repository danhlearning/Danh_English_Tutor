const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),work=path.join(root,'artifacts/upper-secondary-vocabulary');
(async()=>{
 const generated=JSON.parse(fs.readFileSync(path.join(work,'generated.json'),'utf8'));
 for(const a of generated){const file=path.join(work,'pending',a.key.replaceAll('/','-')+`-v${a.version||1}.webp`);fs.mkdirSync(path.dirname(file),{recursive:true});if(!fs.existsSync(file))await sharp(a.source).resize(768,768,{fit:'contain',background:'#fbf3e3'}).webp({quality:88}).toFile(file);}
 console.log(`${generated.length} ảnh ứng viên đã chuẩn bị để xem trực tiếp.`);
})();
