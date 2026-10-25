const fs = require('node:fs');
const path = require('node:path');
const {vocabulary} = require('./secondary-content.cjs');
const grammar = require('./secondary-grammar.cjs');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const write = (file, text) => {fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),text);};
const clean = value => value.replace(/\s*\([^)]*\)/g,'').replace(/\s+/g,' ').trim();
const sentence = (prompt, answer) => clean(prompt).replace('___',answer === 'Ø' ? '' : answer).replace(/\s+/g,' ').trim();
for (const grade of [8,9]) {
  const units = vocabulary[grade].split('\n\n').map((block,index) => {
    const [head,...lines] = block.split('\n');
    const [title,vietnamese,icon] = head.split('|');
    return {title,vietnamese,icon,color:['#2563eb','#15803d','#be185d','#7c3aed'][index%4],number:index+1,id:`unit${index+1}`,words:lines.map((line,i)=>{
      const [term,meaning,example,icon,asset] = line.split('|');
      return {id:i+1,term,meaning,example,icon,image:asset?`../../shared/assets/vocabulary-3d/${asset}-3d-v1.webp`:null};
    })};
  });
  require('./reviewed-vocabulary-images.cjs').apply(grade,units);
  const questions=[];
  grammar[grade].split('\n\n').forEach((block,index)=>{
    const [head,...lines]=block.split('\n'), [topic,rule]=head.split('|');
    const rows=lines.filter(line=>!line.startsWith('>')).map(line=>line.split('|'));
    const rewrites=lines.filter(line=>line.startsWith('>')).map(line=>line.slice(1).split('|'));
    if(rows.length!==6||rewrites.length!==3)throw Error(`Invalid g${grade} unit ${index+1}`);
    ['easy','medium','hard'].forEach((level,li)=>{
      let serial=0;
      const add=q=>questions.push({id:`g${grade}-u${index+1}-${level}-${++serial}`,unit:index+1,level,topic,rule,...q});
      const selected=rows.slice(li*2,li*2+2);
      selected.forEach(([prompt,answers,...wrong])=>{
        const variants=answers.split('~'),answer=variants[0];
        const explain=`${rule} Câu đúng: ${sentence(prompt,answer)}`;
        add({type:'choice',prompt,answer,options:[answer,...wrong],explain});
        add({type:'fill',prompt:`${prompt} (Điền từ/cụm từ; gợi ý: ${[answer,...wrong].join(' / ')}.)`,answer:variants.join('|'),explain});
      });
      const [orderPrompt,orderAnswer]=selected[1],complete=sentence(orderPrompt,orderAnswer.split('~')[0]);
      add({type:'order',prompt:'Sắp xếp các từ thành câu đúng.',parts:complete.split(' '),answer:complete,explain:rule});
      const [errorPrompt,answers,error]=selected[0];
      add({type:'correct',prompt:`Sửa lỗi và viết lại cả câu: ${sentence(errorPrompt,error)}`,answer:sentence(errorPrompt,answers.split('~')[0]),explain:rule});
      const [source,cue,...variants]=rewrites[li];
      const instruction=source.match(/\(([^)]*)\)/)?.[1];
      add({type:'rewrite',prompt:'Viết lại câu theo yêu cầu, giữ nguyên nghĩa.',source,rule:rule+(instruction?' Yêu cầu: '+instruction+'.':''),cue:`${cue} ...`,answer:variants.join('|'),explain:rule});
    });
  });
  write(`grade/lop${grade}/assets/js/units-data.js`,`/* Từ và ví dụ tự biên soạn. */\nwindow.DanhGrade${grade}Units = ${JSON.stringify(units,null,2)};\n`);
  write(`grade/lop${grade}/assets/js/grammar-data.js`,`/* ${questions.length} mục luyện từ 72 ngữ cảnh và 36 câu viết lại; các dạng có thể cùng luyện một ngữ cảnh. */\nwindow.DanhGrade${grade}Grammar = ${JSON.stringify(questions,null,2)};\nwindow.DanhGrade${grade}GrammarHints = Object.fromEntries(window.DanhGrade${grade}Units.map(u=>[u.number,Object.fromEntries(u.words.map(w=>[w.term,w.meaning]))]));\n`);
  const convert=text=>text.replaceAll('DanhGrade7',`DanhGrade${grade}`).replaceAll('lop7',`lop${grade}`).replaceAll('grade7',`grade${grade}`).replaceAll('lớp 7',`lớp ${grade}`).replaceAll('Lớp 7',`Lớp ${grade}`).replaceAll('LỚP 7',`LỚP ${grade}`).replaceAll('Tiếng Anh 7',`Tiếng Anh ${grade}`).replaceAll('danh-g7-',`danh-g${grade}-`).replaceAll('grade: 7',`grade: ${grade}`).replaceAll('grade:7',`grade:${grade}`).replaceAll('data-grade="7"',`data-grade="${grade}"`).replaceAll('432',String(questions.length));
  for(const name of ['catalog','lesson','grammar']){
    let script=convert(read(`grade/lop7/assets/js/${name}.js`));
    if(name==='lesson')script=script.replace('spellingStreak++; mark(word);','spellingStreak++;');
    write(`grade/lop${grade}/assets/js/${name}.js`,script);
  }
  write(`grade/lop${grade}/assets/css/grammar.css`,read('grade/lop7/assets/css/grammar.css'));
  write(`grade/lop${grade}/assets/css/grade${grade}.css`,read('grade/lop7/assets/css/grade7.css')+'\n.secondary-nav{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}.secondary-nav a{padding:10px 14px;border-radius:12px;background:white;color:#245d6b;font-weight:800;border:1px solid #c3dcd5}.secondary-nav [aria-current]{background:#245d6b;color:white}\n');
  const names=['lop7','grammar','vocabulary-review',...Array.from({length:12},(_,i)=>`unit${i+1}`)];
  for(const name of names){
    let html=convert(read(`grade/lop7/${name}.html`)).replace(/  <link rel="preconnect"[^\n]*\n/g,'').replace(/  <link href="https:\/\/fonts.googleapis.com[^\n]*\n/g,'');
    html=html.replace(/  <script src="\.\/assets\/js\/grammar-exam-data.js?v=compact-listen-20261024"><\/script>\r?\n/,'');
    html=html.replace(/<label><input type="radio" name="activity" value="(?:pronunciation|preposition)"><span>[^<]*<\/span><\/label>/g,'');
    html=html.replace('Luyện từng câu theo Unit, hoặc đọc từng phần của một đoạn văn.','Chọn thử thách, nhận gợi ý và tự sửa qua từng câu.');
    html=html.replace('ba cấp độ và mỗi set 10 câu.','ba cấp độ và mỗi lượt tối đa 10 câu.');
    html=html.replace('Mỗi set gồm 10 câu, có chấm điểm và giải thích.','Mỗi lượt tối đa 10 câu, có chấm điểm và giải thích.');
    html=html.replace('Luyện tiếp 10 câu','Luyện lượt tiếp theo');
    html=html.replace('Ảnh theo ngữ cảnh; từ trừu tượng có nghĩa tiếng Việt trong ảnh.','Ảnh theo ngữ cảnh; từ trừu tượng có nghĩa tiếng Việt.');
    html=html.replace('Đọc từ, xem ảnh, nghĩa và câu ví dụ. Từ khó có ảnh theo ngữ cảnh; từ trừu tượng có nghĩa tiếng Việt trong ảnh.','Đọc từ, xem hình hoặc biểu tượng, nghĩa và câu ví dụ. Thử đoán nghĩa trước khi lật thẻ nhé.');
    html=html.replace('Mỗi Unit có từ vựng, câu ví dụ và hình minh họa cho từ khó.','');
    html=html.replace('viết lại câu giữ nguyên nghĩa, phát âm và điền giới từ trong đoạn văn thường gặp trong phần ôn tập.','viết lại câu giữ nguyên nghĩa.');
    html=html.replace(`${questions.length} câu hỏi`,`${questions.length} mục luyện`);
    html=html.replace('Có 252 mục luyện,','Có 252 mục luyện từ 72 ngữ cảnh và 36 câu viết lại,');
    if(name==='grammar')html=html.replace('<section class="gg-info">','<section class="gg-info"><p>Các dạng bài có thể luyện lại cùng một ngữ cảnh. Câu viết tự do được đối chiếu với đáp án mẫu và các biến thể đã biên soạn.</p>');
    html=html.replace('<contact-danh>',`<nav class="g6-shell secondary-nav" aria-label="Chọn lớp THCS">${[6,7,8,9].map(g=>`<a href="../lop${g}/lop${g}.html"${g===grade?' aria-current="page"':''}>Lớp ${g}</a>`).join('')}</nav>\n  <contact-danh>`);
    write(`grade/lop${grade}/${name==='lop7'?`lop${grade}`:name}.html`,html);
  }
  console.log(`Lớp ${grade}: ${units.length} Unit, ${units.flatMap(u=>u.words).length} từ, ${questions.length} mục luyện.`);
}
require('./build-secondary-template-extras.cjs');
require('./sync-secondary-template.cjs');

require('./install-site-letter-games.cjs').run();
