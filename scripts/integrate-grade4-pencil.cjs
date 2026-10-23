/* Chỉ tích hợp bộ ảnh đã được xem và kiểm tra, giữ ID và tiến độ. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),file=path.join(root,'grade/lop4/assets/images/pencil/manifest.json');
const manifest=JSON.parse(fs.readFileSync(file,'utf8'));
if(manifest.wordCount!==132||Object.keys(manifest.images).length!==122)throw Error('Thiếu ảnh lớp 4');
for(const [name,art]of Object.entries(manifest.images)){
 if(!art.reviewed||crypto.createHash('sha256').update(fs.readFileSync(path.join(root,art.src))).digest('hex')!==art.sha256)throw Error('Ảnh chưa duyệt hoặc đã thay đổi: '+name);
}
const urls=Object.fromEntries(Object.entries(manifest.images).map(([name,art])=>[name,'../../'+art.src]));
const script=`/* Ảnh bút chì màu đã kiểm tra; dùng lại ở các bài trước của lớp 4. */\n(() => { const images=${JSON.stringify(urls)}; for(const unit of Object.values(window.DanhGrade4Units||{}))for(const word of unit.words){const src=images[word.name.toLowerCase()];if(src){word.image=src;word.visual=\`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 768" aria-hidden="true"><image href="\${src}" width="768" height="768" preserveAspectRatio="xMidYMid meet"/></svg>\`;}} })();\n`;
fs.writeFileSync(path.join(root,'grade/lop4/assets/js/pencil-images.js'),script);
for(const name of fs.readdirSync(path.join(root,'grade/lop4')).filter(n=>/^previous(?:-unit\d+)?\.html$/.test(n))){
 const file=path.join(root,'grade/lop4',name);let html=fs.readFileSync(file,'utf8');
 if(!html.includes('assets/js/pencil-images.js'))html=html.replace(/(<script src="\.\/assets\/js\/(?:lesson|index)\.js[^\"]*"><\/script>)/,'<script src="./assets/js/pencil-images.js?v=compact-listen-20261024"></script>\n$1');
 fs.writeFileSync(file,html);
}
require('./sync-primary-grade2.cjs');
console.log('PASS: 132 mục từ lớp 4 dùng ảnh đã duyệt; giữ nguyên ID và vùng lưu.');
