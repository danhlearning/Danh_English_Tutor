const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'..');
const files=[];function walk(dir){for(const e of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else if(f.endsWith('.html'))files.push(f);}}
for(const d of ['grade','templates'])walk(d);for(const f of fs.readdirSync(root))if(f.endsWith('.html'))files.push(f);
for(const f of fs.readdirSync(path.join(root,'scripts')))if(f.endsWith('.cjs')&&f!=='localize-game-fonts.cjs')files.push('scripts/'+f);
let count=0;for(const f of files){const file=path.join(root,f),old=fs.readFileSync(file,'utf8');if(!old.includes('learner-profile.js'))continue;
let text=old.replace(/<link\b[^>]*href=["']https:\/\/fonts\.googleapis\.com\/[^"']*family=Nunito(?=[:&"' ])[^"']*["'][^>]*>\s*/g,'');
if(text===old)continue;text=text.replace(/<link\b[^>]*rel=["']preconnect["'][^>]*href=["']https:\/\/fonts\.(?:googleapis|gstatic)\.com["'][^>]*>\s*/g,'');fs.writeFileSync(file,text);count++;}
console.log(`${count} trang/mẫu dùng Nunito nội bộ, bỏ stylesheet font mạng ngoài dư thừa.`);
