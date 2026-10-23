const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),base='grade/lop11/';
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
const ctx={window:{}};
vm.runInNewContext(read(base+'assets/js/units-data.js'),ctx);
vm.runInNewContext(read(base+'assets/js/grammar-data.js'),ctx);
const {extraWords}=require('./grade11-improvement-content.cjs');
for(const u of ctx.window.DanhGrade11Units){
 for(const [i,a] of extraWords[u.number-1].entries())if(!u.words.some(w=>w.id===i+7))u.words.push({id:i+7,term:a[0],meaning:a[1],example:a[2],icon:a[3],image:null});
}
const auditPath=path.join(root,'docs/content/grade11-image-review.json');
if(fs.existsSync(auditPath))for(const a of JSON.parse(fs.readFileSync(auditPath)).assets){
 if(!a.reviewed||!fs.existsSync(path.join(root,a.file)))throw Error('Chưa duyệt ảnh '+a.key);
 ctx.window.DanhGrade11Units[a.unit-1].words.find(w=>w.id===a.wordId).image='./'+path.posix.relative('grade/lop11',a.file);
}
require('./apply-upper-secondary-vocabulary.cjs').extend(11,ctx.window.DanhGrade11Units);
write(base+'assets/js/units-data.js','window.DanhGrade11Units = '+JSON.stringify(ctx.window.DanhGrade11Units,null,2)+';\n');
const questions=require('./grade11-grammar-scenarios.cjs').compile(ctx.window.DanhGrade11Grammar);
write(base+'assets/js/grammar-improvement-data.js','/* 60 tình huống độc lập; giữ nguyên ngân hàng và ID cũ. */\nwindow.DanhGrade11Grammar.push(...'+JSON.stringify(questions,null,2)+');\nwindow.DanhGrade11GrammarHints = Object.fromEntries(window.DanhGrade11Units.map(u=>[u.number,Object.fromEntries(u.words.map(w=>[w.term,w.meaning]))]));\n');
let lesson=read(base+'assets/js/lesson.js');
lesson=lesson.replace(/  const randomOrder = .*\r?\n/,'');
lesson=lesson.replace(/  let spellingOrder = [\s\S]*?  renderSpelling\(\);\r?\n/,`  window.DanhGrade11Spelling({stage:$('#spelling-stage'),words:unit.words,unitId:id});\n`);
if(!lesson.includes('const tabKey =')){
 lesson=lesson.replace("  function showTab(name) {",`  const tabKey = \`danh-g11-\${id}-tab-v1\`;\n  function showTab(name) {\n    window.DanhAnswerSpeech?.stop();\n    try { window.DanhLearners.storage.setItem(tabKey,name); } catch {}\n`);
 lesson=lesson.replace("  showTab('vocabulary');",`  let initialTab='vocabulary';\n  try { const saved=window.DanhLearners.storage.getItem(tabKey); if(tabs.some(t=>t.dataset.tab===saved))initialTab=saved; } catch {}\n  showTab(initialTab);`);
}
if(!lesson.includes('new URLSearchParams'))lesson=lesson.replace('  showTab(initialTab);',`  const requestedTab=new URLSearchParams(location.search).get('activity');\n  if(tabs.some(t=>t.dataset.tab===requestedTab))initialTab=requestedTab;\n  showTab(initialTab);`);
write(base+'assets/js/lesson.js',lesson);
for(const file of fs.readdirSync(path.join(root,base)).filter(n=>n.endsWith('.html'))){
 let s=read(base+file);
 s=s.replace(/units-data\.js\?[^"']*/g,'units-data.js?v=grade11-20261022').replace(/lesson\.js\?[^"']*/g,'lesson.js?v=grade11-20261022').replace(/catalog\.js\?[^"']*/g,'catalog.js?v=grade11-20261022').replace(/grade11\.css(?:\?[^"']*)?/g,'grade11.css?v=grade11-20261022');
 if(/^unit\d+\.html$/.test(file)){
  s=s.replace(/<p class="g6-note">(?:Đọc từ, xem tranh[^<]*|Đọc nghĩa tiếng Việt[^<]*|Nhìn nghĩa tiếng Việt[^<]*)<\/p>/g,'');
  s=s.replace('Nhìn từ tiếng Anh rồi thử đoán nghĩa trước khi lật.','Đoán nghĩa rồi chạm thẻ.');
  if(!s.includes('spelling-game.js'))s=s.replace('  <script src="./assets/js/lesson.js', '  <script src="./assets/js/spelling-game.js?v=grade11-20261022"></script>\n  <script src="./assets/js/lesson.js');
 }
 if(file==='grammar.html'&&!s.includes('grammar-improvement-data.js'))s=s.replace(/(  <script src="\.\/assets\/js\/grammar-complete-data.js[^\n]*\n)/,'$1  <script src="./assets/js/grammar-improvement-data.js?v=grade11-20261022"></script>\n');
 if(file==='grammar.html'){
  s=s.replace('<p class="g6-overline">CHỌN BÀI LUYỆN</p>','').replace('Bắt đầu theo cách của em','Chọn thử thách');
  s=s.replace(/<p>Chọn dạng bài, phạm vi và độ khó\.[^<]*<\/p>/,'').replace(/<p class="gg-field-note">Luyện từ dễ tới khó[^<]*<\/p>/,'');
  s=s.replace(/(<section class="gg-info"><h2>Ôn theo học kỳ<\/h2>)<p>[^<]*<\/p>/,'$1<p>Học kỳ 1: Unit 1–5 · Học kỳ 2: Unit 6–10</p>');
 }
 write(base+file,s);
}
require('./apply-upper-secondary-vocabulary.cjs').versionPages(11);
console.log(`Lớp 11: ${ctx.window.DanhGrade11Units.flatMap(u=>u.words).length} từ, thêm 60 tình huống; giữ ID/lượt cũ.`);
