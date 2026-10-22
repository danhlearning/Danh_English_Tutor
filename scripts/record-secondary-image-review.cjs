/* Chỉ chạy sau khi đã mở và duyệt trực tiếp tất cả ảnh. Không tự nhận diện chữ trong ảnh. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),entries=new Map();
for(const grade of [8,9]){
 const c={window:{}};vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,`grade/lop${grade}/assets/js/units-data.js`),'utf8'),c);
 for(const u of c.window[`DanhGrade${grade}Units`])for(const w of u.words)if(w.image){
  const file=path.resolve(root,`grade/lop${grade}`,w.image),key=path.relative(root,file).replaceAll('\\','/');
  if(!entries.has(key))entries.set(key,{path:key,sha256:crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),reviewed:'2026-10-19',method:'visual',noTextInside:true,placements:[]});
  entries.get(key).placements.push({grade,unit:u.number,term:w.term});
 }
}
fs.writeFileSync(path.join(root,'docs/content/grade8-9-image-review.json'),JSON.stringify({note:'Đã xem trực tiếp 18 ảnh trong hai bảng duyệt. Nghĩa Việt nằm ngoài ảnh; không có chữ trong ảnh. Dấu kiểm chỉ áp dụng cho đúng nội dung có SHA-256 này.',images:[...entries.values()]},null,2)+'\n');
