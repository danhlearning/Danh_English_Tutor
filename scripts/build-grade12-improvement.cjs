const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),base='grade/lop12/';
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
const ctx={window:{}};
vm.runInNewContext(read(base+'assets/js/units-data.js'),ctx);
vm.runInNewContext(read(base+'assets/js/grammar-data.js'),ctx);
for(const u of ctx.window.DanhGrade12Units){
 for(const [i,a] of require('./grade12-improvement-content.cjs').extraWords[u.number-1].entries()){
  if(!u.words.some(w=>w.id===i+7))u.words.push({id:i+7,term:a[0],meaning:a[1],example:a[2],icon:a[3],image:null});
 }
}
const imageAudit=path.join(root,'docs/content/grade12-image-review.json');
if(fs.existsSync(imageAudit))for(const a of JSON.parse(fs.readFileSync(imageAudit,'utf8')).assets){
 if(!a.reviewed||!a.noReadableText||!fs.existsSync(path.join(root,a.file)))throw Error('Chưa duyệt ảnh '+a.key);
 const word=ctx.window.DanhGrade12Units[a.unit-1].words.find(w=>w.id===a.wordId);
 if(!word||word.term!==a.term)throw Error('Ảnh sai ID '+a.key);
 word.image='./'+path.posix.relative('grade/lop12',a.file);
}
require('./apply-upper-secondary-vocabulary.cjs').extend(12,ctx.window.DanhGrade12Units);
write(base+'assets/js/units-data.js','window.DanhGrade12Units = '+JSON.stringify(ctx.window.DanhGrade12Units,null,2)+';\n');
const questions=require('./grade12-grammar-scenarios.cjs').compile(ctx.window.DanhGrade12Grammar);
write(base+'assets/js/grammar-improvement-data.js','/* 60 tình huống riêng lớp 12; giữ ID và lượt cũ. */\nwindow.DanhGrade12Grammar.push(...'+JSON.stringify(questions,null,2)+');\nwindow.DanhGrade12GrammarHints = Object.fromEntries(window.DanhGrade12Units.map(u=>[u.number,Object.fromEntries(u.words.map(w=>[w.term,w.meaning]))]));\n');
let lesson=read(base+'assets/js/lesson.js');
lesson=lesson.replace(/  const randomOrder = .*\r?\n/,'');
lesson=lesson.replace(/  let spellingOrder = [\s\S]*?  renderSpelling\(\);\r?\n/,`  window.DanhGrade12Spelling({stage:$('#spelling-stage'),words:unit.words,unitId:id});\n`);
if(!lesson.includes('const tabKey =')){
 lesson=lesson.replace('  function showTab(name) {',`  const tabKey = \`danh-g12-\${id}-tab-v1\`;\n  function showTab(name) {\n    window.DanhAnswerSpeech?.stop();\n    try { window.DanhLearners.storage.setItem(tabKey,name); } catch {}\n`);
 lesson=lesson.replace("  showTab('vocabulary');",`  let initialTab='vocabulary';\n  try { const saved=window.DanhLearners.storage.getItem(tabKey); if(tabs.some(t=>t.dataset.tab===saved))initialTab=saved; } catch {}\n  const requestedTab=new URLSearchParams(location.search).get('activity');\n  if(tabs.some(t=>t.dataset.tab===requestedTab))initialTab=requestedTab;\n  showTab(initialTab);`);
}
write(base+'assets/js/lesson.js',lesson);
let catalog=read(base+'assets/js/catalog.js');
if(!catalog.includes('g12-unit-count')){
 catalog=catalog.replace("    const bottom = document.createElement('div'); bottom.className = 'g6-card-bottom';",`    const bottom = document.createElement('div'); bottom.className = 'g6-card-bottom';
    const count = document.createElement('span'); count.className='g12-unit-count';count.hidden=true;
    try {
      const round=JSON.parse(window.DanhLearners.storage.getItem(\`danh-g12-spelling-\${unit.id}-v1\`)||'null');
      if(round?.version===1&&Array.isArray(round.order)&&round.order.length>0&&round.order.length<=unit.words.length&&new Set(round.order).size===round.order.length&&round.order.every(id=>unit.words.some(w=>w.id===id))&&Number.isInteger(round.position)&&round.position>=0&&round.position<round.order.length&&Object.values(round.entries||{}).some(e=>e?.draft||e?.outcome||e?.attempts)){
        count.hidden=false;count.textContent=\`Tiếp tục gõ · \${round.position+1}/\${round.order.length}\`;
        card.href=\`./\${unit.id}.html?activity=spelling\`;
      }
    }catch{}
    bottom.append(count);`);
}
write(base+'assets/js/catalog.js',catalog);
for(const file of fs.readdirSync(path.join(root,base)).filter(n=>n.endsWith('.html'))){
 let s=read(base+file);
 s=s.replace(/(units-data|lesson|catalog)\.js\?[^"']*/g,'$1.js?v=grade12-20261023');
 if(fs.existsSync(imageAudit))s=s.replace(/units-data\.js\?[^"']*/g,'units-data.js?v=pencil-20261023-2');
 s=s.replace(/learning-effects\.js\?[^"']*/g,'learning-effects.js?v=prefs-20261023');
 if(!s.includes('improvement.css'))s=s.replace('</head>','  <link rel="stylesheet" href="./assets/css/improvement.css?v=grade12-20261023">\n</head>');
 if(fs.existsSync(imageAudit))s=s.replace(/improvement\.css\?[^"']*/g,'improvement.css?v=pencil-20261023');
 if(/^unit\d+\.html$/.test(file)){
  s=s.replace(/<p class="g6-note">(?:Đọc từ, xem tranh[^<]*|Đọc nghĩa tiếng Việt[^<]*|Nhìn nghĩa tiếng Việt[^<]*)<\/p>/g,'');
  s=s.replace('Nhìn từ tiếng Anh rồi thử đoán nghĩa trước khi lật.','Đoán nghĩa rồi chạm thẻ.');
  if(!s.includes('spelling-game.js'))s=s.replace('  <script src="./assets/js/lesson.js?v=loading-smooth-20261028','  <script src="./assets/js/spelling-game.js?v=game-pacing-20261025"></script>\n  <script src="./assets/js/lesson.js?v=loading-smooth-20261028');
 }
 if(file==='grammar.html'){
  if(!s.includes('grammar-improvement-data.js'))s=s.replace(/(  <script src="\.\/assets\/js\/grammar-complete-data.js[^\n]*\n)/,'$1  <script src="./assets/js/grammar-improvement-data.js?v=compact-listen-20261024"></script>\n');
  s=s.replace('<p class="g6-overline">CHỌN BÀI LUYỆN</p>','').replace('Bắt đầu theo cách của em','Chọn thử thách');
  s=s.replace(/<p>Chọn dạng bài, phạm vi và độ khó\.[^<]*<\/p>/,'').replace(/<p class="gg-field-note">Luyện từ dễ tới khó[^<]*<\/p>/,'');
  s=s.replace(/(<section class="gg-info"><h2>Ôn theo học kỳ<\/h2>)<p>[^<]*<\/p>/,'$1<p>Học kỳ 1: Unit 1–5 · Học kỳ 2: Unit 6–10</p>');
 }
 write(base+file,s);
}
require('./apply-upper-secondary-vocabulary.cjs').versionPages(12);
console.log(`Lớp 12: ${ctx.window.DanhGrade12Units.flatMap(u=>u.words).length} từ, thêm 60 tình huống; gõ từ giữ lượt riêng từng hồ sơ.`);
