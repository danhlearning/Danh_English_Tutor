const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const details=JSON.parse(read('docs/content/primary-word-details.json'));
const images=JSON.parse(read('shared/assets/primary-vocabulary/manifest.json'));
const reference={window:{}};
for(const f of ['units-data.js','extended-units-data.js'])vm.runInNewContext(read(`grade/lop4/assets/js/${f}`),reference);
const known=Object.fromEntries(Object.values(reference.window.DanhGrade4Units).flatMap(u=>u.words.map(w=>[w.name.toLowerCase(),w])));
const palette=['#28698e','#9b5b85','#53824e','#ac713d','#586da5','#a35c55'];
const scripts=`  <script src="../../shared/contact-footer.js"></script>
  <script src="../../shared/primary-grade-nav.js"></script>
  <script src="../../shared/young-learner-speech.js"></script>
  <script src="../../shared/learning-effects.js"></script>
  <script src="./assets/js/course.js"></script>
  <script src="../../shared/primary-template-progress.js"></script>
  <script src="../../shared/primary-template-recall.js"></script>`;
for(const grade of [1,3,5]){
  const dir=path.join(root,`grade/lop${grade}`),c={window:{}};
  vm.runInNewContext(read(`grade/lop${grade}/units.js`),c);
  const source=c.window.DanhPrimaryCourse||{units:c.window.DanhGrade3Units};
  const units=source.units.map(u=>({id:u.id,number:u.number,title:u.title,subtitle:u.subtitle,focus:u.goal,
    patterns:u.sentences.map(s=>({question:s.term,answer:'',note:s.meaning})),
    words:u.words.map((w,i)=>{
      const d=details[w.term]||[known[w.term.toLowerCase()]?.ipa,known[w.term.toLowerCase()]?.context];
      if(!d?.[0]||!d?.[1]||!images[w.term])throw Error(`Thiếu dữ liệu ${grade}/${u.id}/${w.term}`);
      const file=images[w.term].src;
      return {id:w.id,name:w.term,meaning:w.meaning,ipa:d[0],context:d[1],color:palette[i%palette.length],image:file,
        visual:`<svg class="danh-vocabulary-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" aria-hidden="true"><image href="${file}" width="480" height="480" preserveAspectRatio="xMidYMid meet"/></svg>`};
    })}));
  fs.mkdirSync(path.join(dir,'assets/js'),{recursive:true});
  fs.writeFileSync(path.join(dir,'assets/js/course.js'),`/* Nội dung riêng, theo bố cục học lớp 4. */\nwindow.DanhPrimaryTemplateCourse=${JSON.stringify({grade,units},null,2)};\n`);
  let lesson=read('grade/lop4/unit1.html')
    .replace(/  <link rel="preconnect"[^\n]*\n/g,'').replace(/  <link href="https:\/\/fonts[^\n]*\n/g,'')
    .replace('./assets/css/grade4.css','../lop4/assets/css/grade4.css')
    .replace('  <link rel="stylesheet" href="../../shared/vocabulary-3d.css?v=3d-1">',`  <link rel="stylesheet" href="../../shared/primary-template.css?v=colors-20261016">\n  <link rel="stylesheet" href="../../shared/learning-effects.css">`)
    .replace('<body data-unit="unit1">',`<body data-grade="${grade}" data-unit="UNIT_ID">`)
    .replace('href="./lop4.html"',`href="./lop${grade}.html"`).replace('← Tiếng Anh lớp 4',`← Tiếng Anh lớp ${grade}`)
    .replace('<p class="g4-eyebrow" id="unit-number">',`<div class="primary-settings"><button id="sound" type="button">Âm thanh</button><button id="motion" type="button">Chuyển động</button></div><p class="g4-eyebrow" id="unit-number">`)
    .replace('<div class="g4-intro">','<div id="legacy-rounds" hidden></div><div class="g4-intro">')
    .replace(/    <p class="g4-source">[^]*?<\/p>/,`    <p class="g4-source">Bài luyện và hình do Danh English Tutor biên soạn. <a href="./lop${grade}.html">Ôn từ của các Unit lớp ${grade}</a>.</p>`)
    .replace(/  <script src="\.\.\/\.\.\/shared\/contact-footer.js">[^]*?<\/body>/,`${scripts}
  <script src="../lop2/assets/js/learning-core.js"></script>
  <script src="../../shared/primary-template-lesson.js?v=colors-20261016"></script>
</body>`);
  for(const unit of units)fs.writeFileSync(path.join(dir,unit.id+'.html'),lesson.replace('Unit 1 · My friends · Tiếng Anh lớp 4',`${unit.title} · Lớp ${grade} · Danh English Tutor`).replace('UNIT_ID',unit.id));
  let catalog=read('grade/lop4/lop4.html')
    .replace(/  <link rel="preconnect"[^\n]*\n/g,'').replace(/  <link href="https:\/\/fonts[^\n]*\n/g,'')
    .replace('./assets/css/grade4.css','../lop4/assets/css/grade4.css')
    .replace('  <link rel="stylesheet" href="../../shared/vocabulary-3d.css?v=3d-1">','  <link rel="stylesheet" href="../../shared/primary-template.css?v=colors-20261016">\n  <link rel="stylesheet" href="../../shared/learning-effects.css">')
    .replace('<body>',`<body data-grade="${grade}">`).replace('grade="4"',`grade="${grade}"`)
    .replace(/ · Global Success/g,'').replace('Global Success · Unit 1–20',`Unit 1–${units.length} · Luyện theo chủ đề`)
    .replaceAll('lớp 4',`lớp ${grade}`).replaceAll('Lớp 4',`Lớp ${grade}`)
    .replace('<p class="g4-eyebrow">',`<div class="primary-settings"><button id="sound" type="button">Âm thanh</button><button id="motion" type="button">Chuyển động</button></div><p class="g4-eyebrow">`)
    .replace(/    <p class="g4-source">[^]*?<\/p>/,'    <p class="g4-source">Nội dung luyện tập và hình minh họa được biên soạn riêng cho Danh English Tutor.</p>')
    .replace(/  <script src="\.\.\/\.\.\/shared\/contact-footer.js">[^]*?<\/body>/,`${scripts}
  <script src="../../shared/primary-template-index.js?v=colors-20261016"></script>
</body>`);
  fs.writeFileSync(path.join(dir,`lop${grade}.html`),catalog);
  const legacy=`<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Lượt trước · Lớp ${grade} · Danh English Tutor</title><script src="../../shared/learner-profile-core.js"></script><script src="../../shared/learner-profile.js"></script><link rel="stylesheet" href="../../shared/primary-game.css"><link rel="stylesheet" href="../../shared/learning-effects.css"><link rel="stylesheet" href="../../shared/grade-colors.css?v=all-grades-20261016-2"></head><body><header class="topbar"><a class="brand" href="lop${grade}.html">Danh English Tutor · Lớp ${grade}</a><div class="settings"><button id="sound">Âm thanh</button><button id="motion">Chuyển động</button></div></header><main id="app"></main><contact-danh></contact-danh><script src="../../shared/contact-footer.js"></script><script src="../../shared/young-learner-speech.js"></script><script src="../../shared/learning-effects.js"></script><script src="units.js"></script>${grade===3?'<script src="game.js"></script>':''}<script src="../../shared/primary-game.js"></script></body></html>`;
  fs.writeFileSync(path.join(dir,'legacy.html'),legacy.replace('<script src="../../shared/primary-game.js">','<script src="assets/js/course.js"></script><script src="../../shared/primary-game.js">'));
  console.log(`Lớp ${grade}: ${units.length} Unit theo mẫu lớp 4.`);
}
