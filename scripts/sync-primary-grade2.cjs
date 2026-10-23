/* Lớp 1/5 dùng khung và bộ chơi lớp 2, giữ dữ liệu từng lớp. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8'),write=(p,s)=>fs.writeFileSync(path.join(root,p),s);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const version='primary2-20261022-34';
const targetGrades=process.env.PRIMARY_SYNC_GRADES?process.env.PRIMARY_SYNC_GRADES.split(',').map(Number):[1,3,4,5];
for(const grade of targetGrades){
  const courseVersion=grade===4?'g4-pencil-20261022-1':version;
  const dir=`grade/lop${grade}`,ctx={window:{}};
  let units;
  if(grade===4){
    for(const file of ['units-data.js','extended-units-data.js'])vm.runInNewContext(read(`${dir}/assets/js/${file}`),ctx);
    const meanings=JSON.parse(read('docs/content/grade4-sentence-meanings.json'));
    const imageManifest=JSON.parse(read('shared/assets/primary-vocabulary/manifest.json'));
    const book='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="22" fill="#eef6f8"/><path d="M60 30Q38 16 14 27v66q24-11 46 3 22-14 46-3V27Q82 16 60 30Z" fill="#fff" stroke="#5278a5" stroke-width="5"/><path d="M60 30v66" stroke="#5278a5" stroke-width="4"/><path d="M74 13h29v23H91l-8 8v-8h-9Z" fill="#f3ce83" stroke="#a27a35" stroke-width="3"/></svg>';
    const balcony='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="22" fill="#eef6f8"/><path d="M20 5h80v106H20Z" fill="#f3d4ae"/><rect x="38" y="15" width="44" height="58" fill="#b4d9ef" stroke="#6f6052" stroke-width="4"/><path d="M60 15v58M27 72h66v28H27Zm0 10h66M38 73v26m15-26v26m15-26v26m15-26v26" fill="none" stroke="#70698b" stroke-width="5"/><path d="M19 103h82" stroke="#70698b" stroke-width="8"/></svg>';
    units=Object.values(ctx.window.DanhGrade4Units).map(u=>{
      const sentences=u.patterns.flatMap(p=>[p.question,p.answer]).filter(Boolean),notes=meanings[u.id];
      if(notes?.length!==sentences.length)throw Error(`Thiếu nghĩa câu ${u.id}`);
      return {...u,icon:['🌏','⏰','📅','🎂','🏊','🏫','📚','🎨','🏸','🏖️','🏡','🧑‍⚕️','😊','🌞','👪','🌦️','🏙️','🛍️','🦒','⛺'][u.number-1],dialoguePatterns:u.patterns,
        patterns:sentences.map((question,i)=>({question,answer:'',note:notes[i],...(i%2?{context:sentences[i-1]}:{})})),
        words:u.words.map(w=>{
          let visual=w.visual.replaceAll('./assets/images/','../lop4/assets/images/').replace(/<text\b[^>]*>SCHOOL<\/text>/g,'');
          if(['playground','brush my teeth'].includes(w.name)){const src=imageManifest[w.name].src;visual=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" aria-hidden="true"><image href="${src}" width="480" height="480"/></svg>`;}
          if(w.name==='English')visual=book;if(w.name==='balcony')visual=balcony;
          return {...w,visual};
        })};
    });
    const pencilFile=path.join(root,'grade/lop4/assets/images/pencil/manifest.json');
    if(fs.existsSync(pencilFile)){
      const manifest=JSON.parse(fs.readFileSync(pencilFile,'utf8'));
      if(manifest.grade!==4||manifest.style!=='colored-pencil')throw Error('Sai bộ ảnh lớp 4');
      for(const u of units)for(const w of u.words){
        const art=manifest.images[w.name.toLowerCase()];
        if(!art?.reviewed)throw Error(`Ảnh lớp 4 chưa được kiểm tra: ${w.name}`);
        const file=path.join(root,art.src),hash=require('node:crypto').createHash('sha256').update(fs.readFileSync(file)).digest('hex');
        if(hash!==art.sha256)throw Error(`Ảnh lớp 4 đã đổi sau khi kiểm tra: ${w.name}`);
        w.image='../../'+art.src;
        w.visual=`<svg class="danh-vocabulary-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 768" aria-hidden="true"><image href="${w.image}" width="768" height="768" preserveAspectRatio="xMidYMid meet"/></svg>`;
      }
    }
  }else{
    vm.runInNewContext(read(`${dir}/assets/js/course.js`),ctx);vm.runInNewContext(read(`${dir}/units.js`),ctx);
    const course=ctx.window.DanhPrimaryTemplateCourse,source=ctx.window.DanhPrimaryCourse||{units:ctx.window.DanhGrade3Units};
    units=course.units.map(u=>({...u,icon:source.units.find(s=>s.id===u.id).icon}));
  }
  write(`${dir}/assets/js/grade2-course.js`,`window.DanhPrimaryGrade2Course=${JSON.stringify({grade,units},null,2)};\n`);
  const oldIndex=`${dir}/previous.html`;if(!fs.existsSync(path.join(root,oldIndex)))write(oldIndex,read(`${dir}/lop${grade}.html`));
  for(const u of units){
    const old=`${dir}/previous-${u.id}.html`;if(!fs.existsSync(path.join(root,old)))write(old,read(`${dir}/${u.id}.html`));
    let html=read('grade/lop2/gsunit1.html').replace(/<!--[^]*?-->/g,'').replace(/  <link rel="preconnect"[^\n]*\n/g,'').replace(/  <link href="https:\/\/fonts[^\n]*\n/g,'');
    html=html.replace(/<title>[^]*?<\/title>/,`<title>${escape(u.title)} · Lớp ${grade} · Danh English Tutor</title>`)
      .replaceAll('./assets/css/','../lop2/assets/css/').replace('data-topic="gsunit1"',`data-grade="${grade}" data-unit="${u.id}" data-topic="g${grade}${u.id}"`)
      .replace('<p id="topic-description"></p>','').replace('  <script src="./assets/data/gs-unit1-data.js"></script>','')
      .replace('  <script src="./assets/js/grade2-progress.js"></script>','')
      .replace('  <script src="./assets/js/extended-topic.js?v=slow-sync-1"></script>','')
      .replace('  <script src="./assets/js/learning-core.js?v=smooth-20261023-1"></script>',`  <script src="../../shared/learning-effects.js?v=smooth-20261023-1"></script>\n  <script src="../lop2/assets/js/learning-core.js?v=smooth-20261023-1"></script>\n  <script src="./assets/js/grade2-course.js?v=${version}"></script>\n  <script src="../../shared/primary-grade2-lesson.js?v=${version}"></script>`)
      .replace(/\.\/assets\/js\/grade2-navigation\.js\?v=[^"\s]+/,`../lop2/assets/js/grade2-navigation.js?v=${version}`)
      .replace('</head>',`<link rel="stylesheet" href="../../shared/primary-grade2.css?v=${version}"></head>`);
    if(grade===4)html=html.replace(`grade2-course.js?v=${version}`,`grade2-course.js?v=${courseVersion}`);
    write(`${dir}/${u.id}.html`,html);
  }
  const cards=units.map(u=>`<a href="${u.id}.html" class="lesson-card"><div><div class="card-header-flex"><span class="lesson-badge">Unit ${u.number}</span><span class="lesson-icon">${u.icon}</span></div><h3>${escape(u.title)}</h3></div><span class="btn-study">Vào học →</span></a>`).join('\n');
  let index=read('grade/lop2/lop2.html');
  index=index.replace(/<script src="\.\.\/\.\.\/shared\/shared-topics\.js[^\"]*"><\/script>/g,'');
  index=index.replace(/  <link rel="preconnect"[^\n]*\n/g,'').replace(/  <link href="https:\/\/fonts[^\n]*\n/g,'').replace(/    <link href="https:\/\/fonts[^\n]*\n/g,'');
  index=index.replace(/<title>[^]*?<\/title>/,`<title>Tiếng Anh lớp ${grade} · Danh English Tutor</title>`).replaceAll('./assets/css/','../lop2/assets/css/')
    .replace('class="grade2-index primary-cover-page primary-cover-2"',`data-grade="${grade}" class="grade2-index primary-cover-page primary-cover-${grade}"`)
    .replace('Tiếng Anh Lớp 2',`Tiếng Anh Lớp ${grade}`).replace(/<p>Theo chương trình[^]*?<\/p>/,'')
    .replace('./assets/images/grade2-cover-pencil-v1.webp',`./assets/images/grade${grade}-cover-pencil-v1.webp`)
    .replace('alt="Cáo và vịt đi học trong khu vườn"',`alt="Bìa lớp ${grade}"`)
    .replace(/<main class="main-container">[^]*?<\/main>/,`<main class="main-container"><section class="g2-review-entry"><h2>🏝️ Ôn tập tổng hợp lớp ${grade}</h2><a href="review.html" class="btn-study">Chơi →</a><a href="previous.html" class="previous-round" id="previous-review" hidden>Tiếp tục lượt ôn trước</a></section><section><h2>📖 Unit lớp ${grade}</h2><div class="lesson-grid unit-grid">${cards}</div></section></main>`)
    .replace('    <script src="./assets/js/grade2-progress.js"></script>','')
    .replace('</head>',`<link rel="stylesheet" href="../../shared/primary-grade2.css?v=${version}"></head>`)
    .replace('</body>',`<script src="../../shared/shared-topics.js?v=${version}"></script><script>if(DanhLearners.storage.getItem('danh-g${grade}-template-review-v1')${grade===4?"||DanhLearners.storage.getItem('danh.grade4.words.v1')":''})document.getElementById('previous-review').hidden=false;</script></body>`);
  write(`${dir}/lop${grade}.html`,index.replace(/[ \t]+$/gm,''));
  let review=read('grade/lop2/review.html').replaceAll('lớp 2',`lớp ${grade}`).replaceAll('Lớp 2',`Lớp ${grade}`).replace('./lop2.html',`./lop${grade}.html`).replaceAll('./assets/css/','../lop2/assets/css/').replace('Unit 1–8',`Unit 1–${units.length/2}`).replace('Unit 9–16',`Unit ${units.length/2+1}–${units.length}`)
    .replace(/  <script src="\.\/assets\/data\/[^\n]+\n/g,'')
    .replace('<p>Chọn nhiều Unit giống như chọn từ trong bài.</p>','')
    .replace('  <script src="./assets/js/mixed-review-core.js',`  <script src="./assets/js/grade2-course.js?v=${version}"></script>\n  <script src="../../shared/primary-grade2-review.js?v=${version}"></script>\n  <script src="../lop2/assets/js/mixed-review-core.js`)
    .replace('./assets/js/mixed-review.js', '../lop2/assets/js/mixed-review.js').replaceAll('v=island-simple-20261022',`v=${version}`);
  if(grade===4)review=review.replace(`grade2-course.js?v=${version}`,`grade2-course.js?v=${courseVersion}`);
  write(`${dir}/review.html`,review);
}
// Mọi danh mục lớp cùng dùng một bộ topic. Lớp 2 giữ các liên kết đang có.
for(let grade=2;grade<=12;grade++){
  if(grade===5)continue;const file=`grade/lop${grade}/lop${grade}.html`;let html=read(file);
  if(!html.includes('shared/shared-topics.js'))html=html.replace('</body>',`<script src="../../shared/shared-topics.js?v=${version}"></script>\n</body>`);
  write(file,html);
}
for(const name of fs.readdirSync(path.join(root,'grade/lop2')).filter(n=>n.endsWith('.html'))){
  const file=`grade/lop2/${name}`;let html=read(file);
  html=html.replace(/grade2-navigation\.js\?v=[^"\s]+/g,`grade2-navigation.js?v=${version}`);
  if(name==='animals.html')html=html.replace(/topics\/animals\.js\?v=[^"\s]+/,`topics/animals.js?v=${version}`);
  if(name==='review.html')html=html.replaceAll('v=island-simple-20261022',`v=${version}`);
  write(file,html);
}
console.log(`Đã đồng bộ lớp ${targetGrades.join(', ')} theo lớp 2.`);
