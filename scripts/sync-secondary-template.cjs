/* Dùng phiên bản hiện tại lớp 6 làm mẫu chung, giữ dữ liệu từng lớp. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const write=(f,t)=>{fs.mkdirSync(path.dirname(path.join(root,f)),{recursive:true});fs.writeFileSync(path.join(root,f),t.replace(/[ \t]+$/gm,''));};
const base={catalog:read('grade/lop6/lop6.html'),unit:read('grade/lop6/unit1.html'),review:read('grade/lop6/vocabulary-review.html'),grammar:read('grade/lop6/grammar.html'),lesson:read('grade/lop6/assets/js/lesson.js'),catalogJS:read('grade/lop6/assets/js/catalog.js')};
for(const g of [6,7,8,9,10,11,12]){
 const c={window:{}};vm.createContext(c);for(const f of ['pencil-images-data','units-data']){const p=`grade/lop${g}/assets/js/${f}.js`;if(fs.existsSync(path.join(root,p)))vm.runInContext(read(p),c);}
 const units=c.window[`DanhGrade${g}Units`],split=Math.ceil(units.length/2);
 const convert=s=>s.replaceAll('DanhGrade6',`DanhGrade${g}`).replaceAll('lop6',`lop${g}`).replaceAll('grade6',`grade${g}`).replaceAll('lớp 6',`lớp ${g}`).replaceAll('Lớp 6',`Lớp ${g}`).replaceAll('LỚP 6',`LỚP ${g}`).replaceAll('Tiếng Anh 6',`Tiếng Anh ${g}`).replaceAll('danh-g6-',`danh-g${g}-`).replaceAll('grade:6',`grade:${g}`).replaceAll('grade: 6',`grade: ${g}`).replaceAll('data-grade="6"',`data-grade="${g}"`);
 const tidy=s=>s.replace(/  <link rel="preconnect"[^\n]*\n/g,'').replace(/  <link href="https:\/\/fonts.googleapis.com[^\n]*\n/g,'').replace(/  <link rel="stylesheet" href="\.\.\/\.\.\/shared\/upper-secondary-paper.css[^\n]*\n/g,'').replace(/  <script src="\.\/assets\/js\/pencil-images-data.js[^\n]*\n/g,'').replace(/<nav class="g6-shell secondary-nav"[^]*?<\/nav>/g,'').replace(/ data-paper-grade="\d+"/g,'').replace(/ data-effects-mode="[^"]*"/g,'').replace(/<body\b/,`<body data-paper-grade="${g}" data-effects-mode="automatic"`).replace(/<p class="g6-source">[^]*?<\/p>/g,'').replace('</head>','  <link rel="stylesheet" href="../../shared/upper-secondary-paper.css?v=ui-20261022">\n</head>').replaceAll('Unit 1–6',`Unit 1–${split}`).replaceAll('Unit 7–12',`Unit ${split+1}–${units.length}`).replace(/\.\/assets\/js\/units-data.js(?:\?[^"']*)?/g,'./assets/js/units-data.js?v=secondary-template-3');
 function pencil(s){
  if(g===10)s=s.replace(/units-data\.js\?[^"']*/g,'units-data.js?v=logic-20261022');
  if(g===7)return s.replace(/units-data\.js\?[^"']*/g,'units-data.js?v=pencil-20261021');
  return g===6||g===10?s.replace(/  <script src="\.\/assets\/js\/units-data/,`  <script src="./assets/js/pencil-images-data.js?v=compact-listen-20261024'logic-20261022':'pencil-complete-3'}"></script>\n  <script src="./assets/js/units-data`):s;
 }
 let catalog=tidy(convert(base.catalog));
 catalog=catalog.replace(/href="(?:\.\/|\.\.\/lop\d+\/)assets\/css\/catalog.css[^"]*"/,'href="../lop6/assets/css/catalog.css?v=secondary-template-3"').replaceAll('12 Unit',`${units.length} Unit`).replace(/<small>[^<]*<\/small>/g,'').replace('<p>Trộn chủ đề, nhớ lâu hơn.</p>','').replace('<p>Chọn Unit hoặc học kỳ. Mỗi lượt 10 câu, vừa sức để tiến bộ.</p>','').replace(/alt="Các bạn học sinh[^"]*"/,`alt="Hành trình học tiếng Anh lớp ${g} qua tranh bút chì màu."`);
 write(`grade/lop${g}/lop${g}.html`,pencil(catalog));
 for(const u of units){let html=tidy(convert(base.unit)).replaceAll('unit1',u.id).replaceAll('Unit 1',`Unit ${u.number}`).replaceAll('?unit=1',`?unit=${u.number}`).replace('<a href="./unit2.html">Unit 2 →</a>',u.number<units.length?`<a href="./unit${u.number+1}.html">Unit ${u.number+1} →</a>`:`<a href="./vocabulary-review.html?term=2">Ôn học kỳ 2 →</a>`);
  html=html.replace(/<p>Luyện ngữ pháp Unit \d+ từ dễ tới khó\.[^]*?<\/p>/,'');write(`grade/lop${g}/${u.id}.html`,pencil(html));
 }
 write(`grade/lop${g}/vocabulary-review.html`,pencil(tidy(convert(base.review))));
 let grammar=tidy(convert(base.grammar)).replace(/<button id="(sound|motion)-toggle"/g,'<button hidden id="$1-toggle"');
 grammar=grammar.replace(/<h1>Mỗi lần một bước nhỏ<\/h1><p>[^]*?<\/p>/,`<h1>Ngữ pháp lớp ${g}</h1>`);
 // Keep every existing bank script for each grade, including its stable question IDs.
 const old=read(`grade/lop${g}/grammar.html`);
 const bankScripts=[...new Set([...old.matchAll(/  <script src="\.\/assets\/js\/(grammar-(?:data|extra-data|expanded-data|rewrite-data|exam-data|complete-data)\.js)(?:\?[^"]*)?"><\/script>/g)].map(m=>`  <script src="./assets/js/${m[1]}?v=secondary-template-3"></script>`))].join('\n');
 grammar=grammar.replace(/id="library-count">[^<]*/, 'id="library-count">Đang tải bài luyện');
 grammar=grammar.replace('Câu hỏi do website biên soạn, không phải đề thi chính thức.','Bài viết được đối chiếu với đáp án mẫu; các dạng có thể cùng luyện một ngữ cảnh.');
 write(`grade/lop${g}/grammar.html`,pencil(grammar));
 if(g!==6){write(`grade/lop${g}/assets/js/lesson.js`,convert(base.lesson));write(`grade/lop${g}/assets/js/picture-audio.js`,convert(read('grade/lop6/assets/js/picture-audio.js')));write(`grade/lop${g}/assets/css/picture-audio.css`,read('grade/lop6/assets/css/picture-audio.css'));if(g!==11)write(`grade/lop${g}/assets/js/catalog.js`,convert(base.catalogJS));}
 write(`grade/lop${g}/assets/js/grammar.js`,`window.DanhGrammarGame({grade:${g},storageKey:'danh-g${g}-grammar-v1',termSplit:${split},pronunciationSummary:'Phân biệt âm, trọng âm và ngữ điệu theo Unit'});\n`);
 if(g===11)require('node:child_process').execFileSync(process.execPath,[path.join(__dirname,'build-grade11-improvement.cjs')],{stdio:'inherit'});
 if(g===12)require('node:child_process').execFileSync(process.execPath,[path.join(__dirname,'build-grade12-improvement.cjs')],{stdio:'inherit'});
 console.log(`Đồng bộ lớp ${g}: ${units.length} Unit, giữ ngân hàng và tiến độ riêng.`);
}

require('./install-site-letter-games.cjs').run();
