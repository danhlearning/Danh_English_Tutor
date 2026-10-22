const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const inventory = require('../../artifacts/vocabulary-3d/inventory.json');
const manifest = require('../../artifacts/vocabulary-3d/manifest.json');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
test('Every vocabulary entry has a generated compact illustration', () => {
  assert.equal(inventory.length,180);
  assert.equal(new Set(inventory.filter(x=>x.grade===2).map(x=>x.unit)).size,16);
  assert.equal(new Set(inventory.filter(x=>x.grade===4).map(x=>x.unit)).size,20);
  for (const asset of manifest) {
    assert.equal(asset.status,'generated',asset.slug);
    assert.ok(fs.statSync(path.join(root,asset.file)).size>1000,asset.slug);
    assert.ok(fs.statSync(path.join(root,asset.file)).size<100000,asset.slug);
  }
});
test('The same art reaches the vocabulary and all game data without changing word IDs', () => {
  for (const [grade,count] of [[2,16],[4,20]]) for(let number=1;number<=count;number++) {
    const unit = grade===2 ? `gsunit${number}` : `unit${number}`;
    const window = {};
    const document={body:{dataset:grade===2?{topic:unit}:{unit}},currentScript:{src:'http://localhost/shared/vocabulary-3d.js'}};
    const context={window,document,URL};
    const files=grade===2?[number===1?'grade/lop2/assets/data/gs-unit1-data.js':'grade/lop2/assets/data/gs-units-data.js']:['grade/lop4/assets/js/units-data.js','grade/lop4/assets/js/extended-units-data.js'];
    for(const f of files)vm.runInNewContext(read(f),context);
    const data=grade===2?window.grade2Units[unit]:window.DanhGrade4Units[unit];
    const ids=data.words.map(w=>w.id).join(',');
    vm.runInNewContext(read('shared/vocabulary-3d.js'),context);
    assert.equal(data.words.map(w=>w.id).join(','),ids);
    for(const word of data.words) {
      assert.match(word.visual,/class="danh-vocabulary-art"/);
      assert.match(word.visual,/preserveAspectRatio="xMidYMid meet"/);
      assert.doesNotMatch(word.visual,/<text\b/);
      const row=inventory.find(r=>r.grade===grade&&r.unit===unit&&r.id===word.id);
      assert.ok(word.visual.includes(path.basename(row.asset)),`${unit}:${word.id}`);
    }
    const html=read(`grade/lop${grade}/${unit}.html`);
    assert.ok(html.indexOf('vocabulary-3d.js') < html.indexOf(grade===2?'extended-topic.js':'lesson.js'));
  }
});
