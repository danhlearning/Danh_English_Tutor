const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),work=path.join(root,'artifacts/grade7-pencil'),plan=require('./grade7-pencil-plan.cjs');
(async()=>{
 const reviewed=new Set(JSON.parse(fs.readFileSync(path.join(work,'reviewed-keys.json'),'utf8')));
 const records=[];
 for(const a of plan){const key=`${a.unit}-${a.wordId}`;if(!reviewed.has(key))throw Error('Chưa xem trực tiếp '+key);const file=path.join(root,a.file),m=await sharp(file).metadata();if(m.width!==768||m.height!==768)throw Error('Sai kích thước '+key);const record=JSON.parse(fs.readFileSync(path.join(work,'records',key+'.json'),'utf8'));records.push({...record,reviewedVisually:true,noReadableText:true,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')});}
 const file=path.join(root,'grade/lop7/assets/js/units-data.js');let source=fs.readFileSync(file,'utf8');
 source=source.replace(/image: image \? `\.\/assets\/images\/\$\{image\}-v2\.webp` : null/, 'image: `./assets/images/pencil/unit${index + 1}/${wordIndex + 1}-v1.webp`');
 if(!source.includes('image: `./assets/images/pencil/'))throw Error('Không tìm thấy ánh xạ ảnh lớp 7');
 const before={window:{}},after={window:{}};
 vm.runInNewContext(fs.readFileSync(file,'utf8'),before);vm.runInNewContext(source,after);
 const content=units=>JSON.stringify(units.map(u=>({...u,words:u.words.map(({image,...word})=>word)})));
 if(content(before.window.DanhGrade7Units)!==content(after.window.DanhGrade7Units))throw Error('Dữ liệu từ vựng bị đổi ngoài trường ảnh');
 fs.writeFileSync(file,source);
 // Chỉ đổi phiên bản dữ liệu lớp 7; giữ nguyên ID và các khóa tiến độ.
 for(const name of fs.readdirSync(path.join(root,'grade/lop7')).filter(n=>n.endsWith('.html'))){const page=path.join(root,'grade/lop7',name),old=fs.readFileSync(page,'utf8');const next=old.replace(/(src="\.\/assets\/js\/units-data\.js)(?:\?[^"\s]*)?"/g,'$1?v=pencil-20261021"');if(next!==old)fs.writeFileSync(page,next);}
 fs.writeFileSync(path.join(work,'final-prompts.json'),JSON.stringify({mode:'built-in image_gen',assets:records},null,2));
 const figures=records.map(a=>`<figure><img src="../../${a.file}" width="240" height="240" loading="lazy" alt="${a.meaning}"><figcaption>Unit ${a.unit} · ${a.term}</figcaption></figure>`).join('\n');
 fs.writeFileSync(path.join(work,'review.html'),`<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Tranh bút chì lớp 7</title><link rel="stylesheet" href="../../shared/learner-font.css"><style>body{font-family:'Danh Nunito',sans-serif;background:#f4eef7;color:#504362;margin:24px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:16px}figure{margin:0;padding:12px;background:#fffaf0;border-radius:18px;text-align:center}img{width:100%;height:auto;border-radius:12px}figcaption{padding:10px;font-weight:800}</style><h1>96 tranh bút chì lớp 7</h1><main>${figures}</main></html>`);
 console.log('PASS 96 ảnh đã xem trực tiếp, 768×768; giữ nguyên toàn bộ ID từ.');
})().catch(e=>{console.error(e);process.exitCode=1});
