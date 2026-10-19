/* Check published-page font wiring and UTF-8 before visual/browser verification. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),pages=[],errors=[];
function visit(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){
  if(['.git','templates','node_modules','artifacts','output','outputs','tmp','.codex-temp'].includes(item.name))continue;
  const file=path.join(dir,item.name);
  if(item.isDirectory())visit(file);else if(item.isFile()&&file.endsWith('.html'))pages.push(file);
}}
visit(root);
for(const file of pages){
  let html;try{html=new TextDecoder('utf-8',{fatal:true}).decode(fs.readFileSync(file));}catch{errors.push(path.relative(root,file)+': không phải UTF-8 hợp lệ');continue;}
  if(html.includes('\uFFFD'))errors.push(path.relative(root,file)+': có ký tự thay thế do lỗi mã hóa');
  if(!/(?:learner-profile\.js|contact-footer\.js|learner-font\.css)/.test(html))errors.push(path.relative(root,file)+': thiếu lối tải font nội bộ');
}
const css=fs.readFileSync(path.join(root,'shared/learner-font.css'),'utf8');
for(const family of ['Danh Nunito','Nunito']){
  const faces=[...css.matchAll(/@font-face\s*\{([^}]+)\}/g)].filter(m=>m[1].includes(`font-family:'${family}'`));
  assert.equal(faces.length,3,`${family}: cần đủ bộ latin, latin-ext, vietnamese`);
  assert(faces.some(m=>m[1].includes('vietnamese.woff2')&&m[1].includes('U+1EA0-1EF9')),family+' thiếu dải dấu tiếng Việt');
}
for(const file of ['latin','latin-ext','vietnamese'])assert.equal(fs.readFileSync(path.join(root,`assets/fonts/nunito/${file}.woff2`)).toString('ascii',0,4),'wOF2',file+' không phải WOFF2');
const footer=fs.readFileSync(path.join(root,'shared/contact-footer.js'),'utf8');
assert(footer.includes('"Danh Nunito", Nunito, system-ui, sans-serif'),'Footer phải ưu tiên Nunito nội bộ');
if(errors.length){errors.forEach(e=>console.error(e));process.exitCode=1;}else console.log(`Đạt: ${pages.length} trang UTF-8 và có đường tải font nội bộ; đủ hai tên font, ba bộ glyph và footer.`);
