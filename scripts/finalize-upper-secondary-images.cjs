const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..');
(async()=>{const sources=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));for(const {grade,source} of sources){
 const out=path.join(root,`grade/lop${grade}/assets/images`);fs.mkdirSync(out,{recursive:true});
 await sharp(source).resize({width:1200}).webp({quality:86}).toFile(path.join(out,`grade${grade}-cover-pencil-v1.webp`));
 console.log(`Lớp ${grade}: đã lưu bìa WebP.`);
}})().catch(e=>{console.error(e);process.exitCode=1;});
