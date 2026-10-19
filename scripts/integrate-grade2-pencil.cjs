/* Wire reviewed artwork into the existing topics without changing learning IDs. */
const fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..');
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'artifacts/grade2-pencil/generation.json'), 'utf8').replace(/^\uFEFF/, ''));
const topics = process.argv.includes('--topics') ? process.argv[process.argv.indexOf('--topics') + 1].split(',') : [...new Set(inventory.assets.map(a => a.topic))].filter(topic => topic !== 'numbers');
if (topics.includes('numbers')) throw Error('Numbers is excluded from this artwork update.');
const manifest = {};
for (const asset of inventory.assets) {
  if (asset.topic === 'numbers') continue;
  (manifest[asset.topic] ||= {})[asset.name.toLowerCase()] = `${asset.topic}/${asset.slug}-v1.webp`;
}
fs.writeFileSync(path.join(root, 'grade/lop2/assets/js/pencil-images-data.js'), '/* Local, reviewed pencil artwork. */\nwindow.DanhGrade2PencilManifest = ' + JSON.stringify(manifest, null, 2) + ';\n');
const vars = {clothes:'clothesVocabulary',dates:'daysAndMonthsVocab',familyfriends:'familyVocabulary',feeling:'emotionsVocabulary',fooddrinks:'foodVocabulary',fruits:'fruitVocab',numbers:'vocabNumbers',schoolsupplies:'schoolSupplies',householditems:'vocabList',verbs:'verbVocabulary'};
function afterArray(source, name, statement) {
  if (source.includes(statement)) return source;
  const start = source.indexOf(`const ${name} = [`);
  if (start < 0) throw Error('Missing array ' + name);
  const end = /\r?\n\s*\];/.exec(source.slice(start));
  if (!end) throw Error('Missing end of array ' + name);
  const position = start + end.index + end[0].length;
  return source.slice(0, position) + '\n  ' + statement + '\n' + source.slice(position);
}
for (const topic of topics) {
  const htmlFile = path.join(root, `grade/lop2/${topic}.html`);
  let html = fs.readFileSync(htmlFile, 'utf8');
  if (!html.includes('pencil-illustrations.js')) {
    html = html.replace('</head>', '<link rel="stylesheet" href="./assets/css/pencil-illustrations.css?v=pencil-20261019">\n<script src="./assets/js/pencil-images-data.js?v=pencil-20261019"></script>\n<script src="./assets/js/pencil-illustrations.js?v=pencil-20261019"></script>\n</head>');
    html = html.replace('class="grade2-topic"', 'class="grade2-topic g2-pencil"');
    html = html.replace(/Hình Minh Họa SVG Ghép Chi Tiết/g, 'Tranh bút chì màu');
    html = html.replace(/\((?:Hình Minh Họa )?SVG (?:Ghép )?Chi Tiết\)/g, '(Tranh bút chì màu)');
    html = html.replaceAll('learning-core.js?v=slow-sync-1','learning-core.js?v=pencil-20261019');
    for (const script of [`topics/${topic}`, 'extended-topic', 'bodyparts']) {
      html = html.replaceAll(`${script}.js?v=slow-sync-1`, `${script}.js?v=pencil-20261019`);
    }
  }
  html = html.replaceAll('pencil-illustrations.js?v=pencil-20261019"', 'pencil-illustrations.js?v=pencil-20261019-2"');
  fs.writeFileSync(htmlFile, html);
  if (!vars[topic]) continue;
  const jsFile = path.join(root, `grade/lop2/assets/js/topics/${topic}.js`);
  let js = fs.readFileSync(jsFile, 'utf8');
  js = afterArray(js, vars[topic], `window.DanhPencil?.apply('${topic}', ${vars[topic]});`);
  const questionArray = topic === 'dates' ? 'dateQuestions' : ['schoolsupplies','numbers'].includes(topic) ? 'countGameQuestions' : topic === 'fruits' ? null : 'sentenceQuestions';
  if (questionArray) js = afterArray(js, questionArray, `window.DanhPencil?.questions('${topic}', ${questionArray}, ${vars[topic]});`);
  if (['schoolsupplies','numbers'].includes(topic)) js = js.replaceAll('span.innerText = item.emoji;', 'span.innerHTML = item.emoji;');
  if (topic === 'dates') {
    js = js.replace('mainBox.innerText = item.main;', "mainBox.innerHTML = window.DanhPencil?.picture('dates', item.target) || '';\n    if (!mainBox.innerHTML) mainBox.textContent = item.main;");
  }
  fs.writeFileSync(jsFile, js);
}
console.log('Integrated: ' + topics.join(', '));
