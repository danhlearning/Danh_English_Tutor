const fs=require('node:fs'),path=require('node:path');
const content=require('./upper-secondary-content.cjs');
const root=path.resolve(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const write=(f,t)=>{fs.mkdirSync(path.dirname(path.join(root,f)),{recursive:true});fs.writeFileSync(path.join(root,f),t);};
const palettes={10:['#e7eadb','#fcfbef','#b7c1a0','#355b43'],11:['#f1dfd6','#fff5eb','#d1aaa0','#854c40'],12:['#e1e5ef','#f6f5fa','#b0bad1','#3e527c']};
// Lớp 10 đã có bộ dựng hoàn thiện riêng; không ghi đè tranh/ngân hàng đã bổ sung.
const requested=process.argv.slice(2).map(Number).filter(g=>[11,12].includes(g));
for(const grade of (requested.length?requested:[11,12])){
  if(grade===11){require('node:child_process').execFileSync(process.execPath,[path.join(__dirname,'build-grade11-improvement.cjs')],{stdio:'inherit'});continue;}
  if(grade===12){require('node:child_process').execFileSync(process.execPath,[path.join(__dirname,'build-grade12-improvement.cjs')],{stdio:'inherit'});continue;}
  const [paper,surface,line,accent]=palettes[grade];
  const questions=[];
  const units=content[grade].split('\n\n').map((block,i)=>{
    const [head,...lines]=block.split('\n');const [title,vietnamese,icon]=head.split('|');
    const ruleAt=lines.findIndex(l=>l.startsWith('>'));
    const [topic,rule]=lines[ruleAt].slice(1).split('|');
    lines.slice(ruleAt+1).forEach((row,li)=>{
      const [prompt,answer,...wrong]=row.split('|'),level=['easy','medium','hard'][li];
      const complete=prompt.replace('___',answer),explain=`${rule} Câu đúng: ${complete}`;
      const add=q=>questions.push({id:`g${grade}-u${i+1}-${level}-${q.type}`,unit:i+1,level,topic,rule,...q});
      add({type:'choice',prompt,answer,options:[answer,...wrong],explain});
      add({type:'fill',prompt:`${prompt} (Gợi ý: ${[answer,...wrong].join(' / ')}.)`,answer,explain});
      add({type:'order',prompt:'Sắp xếp các từ thành câu đúng.',parts:complete.split(' '),answer:complete,explain});
      add({type:'correct',prompt:`Sửa phần sai và viết lại cả câu: ${prompt.replace('___',wrong[0])}`,answer:complete,explain});
    });
    return {id:`unit${i+1}`,number:i+1,title,vietnamese,icon,color:accent,words:lines.slice(0,ruleAt).map((l,j)=>{const [term,meaning,example,icon]=l.split('|');return {id:j+1,term,meaning,example,icon,image:null};})};
  });
  if(units.length!==10||units.some(u=>u.words.length!==6)||questions.length!==120)throw Error('Ngân hàng thiếu dữ liệu');
  write(`grade/lop${grade}/assets/js/units-data.js`,`window.DanhGrade${grade}Units = ${JSON.stringify(units,null,2)};\n`);
  write(`grade/lop${grade}/assets/js/grammar-data.js`,`/* 120 mục luyện từ 30 ngữ cảnh, các dạng cùng luyện một ngữ cảnh. */\nwindow.DanhGrade${grade}Grammar = ${JSON.stringify(questions,null,2)};\nwindow.DanhGrade${grade}GrammarHints = Object.fromEntries(window.DanhGrade${grade}Units.map(u=>[u.number,Object.fromEntries(u.words.map(w=>[w.term,w.meaning]))]));\n`);
  const convert=t=>t.replaceAll('DanhGrade8',`DanhGrade${grade}`).replaceAll('lop8',`lop${grade}`).replaceAll('grade8',`grade${grade}`).replaceAll('lớp 8',`lớp ${grade}`).replaceAll('Lớp 8',`Lớp ${grade}`).replaceAll('LỚP 8',`LỚP ${grade}`).replaceAll('Tiếng Anh 8',`Tiếng Anh ${grade}`).replaceAll('danh-g8-',`danh-g${grade}-`).replaceAll('grade:8',`grade:${grade}`).replaceAll('grade: 8',`grade: ${grade}`).replaceAll('data-grade="8"',`data-grade="${grade}"`);
  write(`grade/lop${grade}/assets/js/catalog.js`,read('grade/lop6/assets/js/catalog.js').replaceAll('DanhGrade6',`DanhGrade${grade}`));
  write(`grade/lop${grade}/assets/js/lesson.js`,convert(read('grade/lop8/assets/js/lesson.js')));
  write(`grade/lop${grade}/assets/js/grammar.js`,`window.DanhGrammarGame({grade:${grade},storageKey:'danh-g${grade}-grammar-v1',termSplit:5});\n`);
  const nav=`<nav class="g6-shell secondary-nav" aria-label="Chọn lớp THPT">${[10,11,12].map(g=>`<a href="../lop${g}/lop${g}.html"${g===grade?' aria-current="page"':''}>Lớp ${g}</a>`).join('')}</nav>`;
  for(const name of ['grammar','vocabulary-review',...units.map(u=>u.id)]){
    // Each Unit starts from its matching template so links and grammar query agree.
    let html=convert(read(`grade/lop8/${name}.html`));
    html=html.replace(/<nav class="g6-shell secondary-nav"[^]*?<\/nav>/,nav);
    html=html.replaceAll('Unit 1–6','Unit 1–5').replaceAll('Unit 7–12','Unit 6–10').replaceAll('252 mục luyện','120 mục luyện');
    html=html.replace(/<label><input type="radio" name="activity" value="rewrite"><span>Viết lại câu<\/span><\/label>/,'');
    html=html.replace('<h1>Mỗi lần một bước nhỏ</h1><p>Ôn ngữ pháp theo Unit và học kỳ. Chọn thử thách, nhận gợi ý và tự sửa qua từng câu.</p>',`<h1>Ngữ pháp lớp ${grade}</h1>`);
    html=html.replace('<p>Các dạng bài có thể luyện lại cùng một ngữ cảnh. Câu viết tự do được đối chiếu với đáp án mẫu và các biến thể đã biên soạn.</p>','<p>30 ngữ cảnh được luyện qua bốn dạng: chọn, điền, xếp câu và sửa lỗi. Các dạng trong một Unit và cấp độ cùng luyện một ngữ cảnh; bài viết được đối chiếu với đáp án mẫu.</p>');
    html=html.replace(', viết lại câu giữ nguyên nghĩa','');
    html=html.replace('Lượt ngữ pháp có tối đa 10 câu; gợi ý viết lại xuất hiện sau 2 phút làm câu đó.','Mỗi Unit và cấp độ có 4 mục luyện; ôn học kỳ tối đa 10 mục.');
    html=html.replace(/<p class="g6-source">[^]*?<\/p>/,'');
    html=html.replace(/<p>Luyện ngữ pháp Unit \d+ từ dễ tới khó\. Mỗi lượt tối đa 10 câu, có chấm điểm và giải thích\.<\/p>/,'');
    html=html.replace('Ảnh minh họa xuất hiện ở mặt nghĩa.','Biểu tượng gợi nhớ xuất hiện ở mặt nghĩa.');
    if(name==='unit10')html=html.replace('<a href="./unit11.html">Unit 11 →</a>','<a href="./vocabulary-review.html?term=2">Ôn học kỳ 2 →</a>');
    html=html.replace('</head>',`  <link rel="stylesheet" href="../../shared/upper-secondary-paper.css?v=ui-20261022">\n</head>`).replace('<body ',`<body data-paper-grade="${grade}" `);
    write(`grade/lop${grade}/${name}.html`,html);
  }
  let catalog=read('grade/lop6/lop6.html').replaceAll('lớp 6',`lớp ${grade}`).replaceAll('LỚP 6',`LỚP ${grade}`).replaceAll('grade6',`grade${grade}`).replaceAll('12 chủ đề quen thuộc','10 chủ đề').replaceAll('12 Unit','10 Unit').replaceAll('Unit 1–6','Unit 1–5').replaceAll('Unit 7–12','Unit 6–10');
  catalog=catalog.replace(/  <link rel="preconnect"[^\n]*\n/g,'').replace(/  <link href="https:\/\/fonts.googleapis.com[^\n]*\n/g,'').replace(/  <script src="\.\/assets\/js\/pencil-images-data.js[^\n]*\n/,'');
  catalog=catalog.replace('./assets/css/catalog.css?v=beige-responsive-2','../lop6/assets/css/catalog.css?v=beige-responsive-2');
  catalog=catalog.replace(/<small>[^<]*<\/small>/g,'').replace('<p>Trộn chủ đề, nhớ lâu hơn.</p>','').replace('<p>Chọn Unit hoặc học kỳ. Mỗi lượt 10 câu, vừa sức để tiến bộ.</p>','');
  catalog=catalog.replace(/alt="Các bạn học sinh[^"]*"/,`alt="Minh họa hành trình học tiếng Anh lớp ${grade} bằng bút chì màu và giấy kraft."`);
  catalog=catalog.replace('</head>','  <link rel="stylesheet" href="../../shared/upper-secondary-paper.css?v=ui-20261022">\n</head>').replace('<body ',`<body data-paper-grade="${grade}" `).replace('<contact-danh>',nav+'\n  <contact-danh>');
  write(`grade/lop${grade}/lop${grade}.html`,catalog);
  write(`grade/lop${grade}/assets/css/grade${grade}.css`,read('grade/lop8/assets/css/grade8.css'));
  write(`grade/lop${grade}/assets/css/grammar.css`,read('grade/lop8/assets/css/grammar.css'));
  console.log(`Lớp ${grade}: 10 Unit, 60 từ/cụm từ, 30 ngữ cảnh / 120 mục ngữ pháp.`);
}
require('./build-secondary-template-extras.cjs');
require('./sync-secondary-template.cjs');

require('./install-site-letter-games.cjs').run();
