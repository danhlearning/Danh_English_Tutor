/* Build a frozen review snapshot from the live Grade 2 vocabulary. Run with node. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '../../..');
const asset = (name) => path.join(root, 'grade/lop2/assets', name);
const read = (name) => fs.readFileSync(name, 'utf8');
const slug = (name) => name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const groups = [];
const words = [];
function addGroup(id, title, kind, entries, source) {
  if (!Array.isArray(entries) || !entries.length) throw new Error(`No words in ${id}`);
  groups.push({ id, title, kind, count: entries.length });
  const seen = new Set();
  for (const entry of entries) {
    const wordId = entry.id || slug(entry.name);
    const idInGroup = `${id}/${wordId}`;
    if (seen.has(idInGroup)) throw new Error(`Duplicate ${idInGroup}`);
    seen.add(idInGroup);
    const rawVisual = (entry.svg || entry.visual || entry.icon || entry.emoji || '').replace?.(/href="\.\/assets\//g, 'href="../../grade/lop2/assets/') || '';
    const visual = typeof rawVisual === 'string' && rawVisual.trimStart().startsWith('<svg')
      ? { type: 'svg', value: rawVisual }
      : typeof rawVisual === 'string' && rawVisual
        ? { type: 'text', value: rawVisual }
        : { type: 'text', value: entry.num ? String(entry.num) : '—' };
    words.push({ id: idInGroup, group: id, name: entry.name, meaning: entry.meaning || '', ipa: entry.ipa || '', current: visual, source });
  }
}
function readLegacy(file, variable) {
  const source = read(asset(`js/topics/${file}.js`));
  const marker = new RegExp(`\\bconst ${variable} = \\[`, 'm');
  const match = marker.exec(source);
  if (!match) throw new Error(`Missing ${variable} in ${file}`);
  const end = source.indexOf('];', match.index);
  if (end < 0) throw new Error(`Unclosed ${variable} in ${file}`);
  const context = { window: { AudioContext: class { constructor() { this.state = 'running'; } } }, console };
  vm.runInNewContext(`${source.slice(0, end + 2)}\n globalThis.__words = ${variable};`, context, { filename: `${file}.js`, timeout: 2000 });
  return Array.from(context.__words);
}
const legacy = [
  ['animals', 'Động vật', 'animalsList'],
  ['clothes', 'Quần áo', 'clothesVocabulary'],
  ['colors', 'Màu sắc', 'colorsData'],
  ['dates', 'Thứ và tháng', 'daysAndMonthsVocab'],
  ['familyfriends', 'Gia đình & bạn bè', 'familyVocabulary'],
  ['feeling', 'Cảm xúc & trạng thái', 'emotionsVocabulary'],
  ['fooddrinks', 'Đồ ăn & đồ uống', 'foodVocabulary'],
  ['fruits', 'Trái cây', 'fruitVocab'],
  ['householditems', 'Đồ dùng trong nhà', 'vocabList'],
  ['numbers', 'Số đếm', 'vocabNumbers'],
  ['schoolsupplies', 'Đồ dùng học tập', 'schoolSupplies'],
  ['verbs', 'Động từ', 'verbVocabulary']
];
for (const [id, title, variable] of legacy) {
  addGroup(id, title, 'Chủ đề', readLegacy(id, variable), `grade/lop2/${id}.html`);
}
const localWindow = { window: {} };
vm.runInNewContext(read(asset('data/bodyparts-data.js')), localWindow);
vm.runInNewContext(read(asset('js/bodyparts-diagrams.js')), localWindow);
addGroup('bodyparts', 'Bộ phận cơ thể', 'Chủ đề', localWindow.window.bodyPartsLesson.vocabulary.map(word => ({ ...word, svg: word.diagramSvg })), 'grade/lop2/bodyparts.html');
vm.runInNewContext(read(asset('data/extended-topics-data.js')), localWindow);
for (const topic of Object.values(localWindow.window.grade2ExtendedTopics)) {
  addGroup(topic.id, topic.title, 'Chủ đề mở rộng', topic.words, `grade/lop2/${topic.id}.html`);
}
vm.runInNewContext(read(asset('data/gs-unit1-data.js')), localWindow);
const units = { ...localWindow.window.grade2Units };
vm.runInNewContext(read(asset('data/gs-units-data.js')), localWindow);
Object.assign(units, localWindow.window.grade2Units);
for (const [id, unit] of Object.entries(units).sort((a,b) => Number(a[0].slice(6)) - Number(b[0].slice(6)))) {
  addGroup(id, unit.title, 'Global Success', unit.words, `grade/lop2/${id}.html`);
}
const catalog = { generatedAt: '2026-09-28', groups, words };
fs.writeFileSync(path.join(__dirname, '../catalog.js'), `/* Generated from Grade 2 data by tools/build-catalog.cjs. */\nwindow.thayDanhCatalog = ${JSON.stringify(catalog)};\n`);
console.log(`${groups.length} groups, ${words.length} review entries`);
console.log(groups.map(group => `${group.id}: ${group.count}`).join('\n'));
