const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '../../..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const artScript = 'grade/lop2/assets/js/unit-pencil-art.js';

test('all 48 Unit words use pencil art or preserved numbers without changing learning data', () => {
  const ctx = { window: {}, URL, document: { currentScript: { src: 'https://audit.local/' + artScript } } };
  for (const file of ['gs-unit1-data.js', 'gs-units-data.js']) vm.runInNewContext(read('grade/lop2/assets/data/' + file), ctx);
  const before = JSON.parse(JSON.stringify(ctx.window.grade2Units));
  vm.runInNewContext(read(artScript), ctx);
  const manifest = JSON.parse(read('grade/lop2/assets/images/pencil/units/manifest.json'));
  let pictures = 0, numbers = 0;
  for (const [id, unit] of Object.entries(ctx.window.grade2Units)) {
    assert.deepEqual(JSON.parse(JSON.stringify(unit.questions)), before[id].questions);
    for (const word of unit.words) {
      const original = before[id].words.find(w => w.id === word.id);
      if (manifest.preservedNumbers.includes(word.id)) {
        const number={eleven:11,thirteen:13,fourteen:14,fifteen:15}[word.id];
        assert.ok(number);const file='shared/assets/vocabulary-reviewed/number-'+number+'.svg';
        assert.ok(word.image.endsWith('/'+file));const svg=read(file);
        assert.equal((svg.match(/<circle /g)||[]).length,number);
        assert.ok(svg.includes('>'+number+'</text>'));
        numbers++;
      } else {
        const image = manifest.images[word.id];
        assert.ok(image, id + '/' + word.id);
        assert.match(image.src, /\/pencil\//);
        const file = fs.readFileSync(path.join(root, image.src));
        assert.equal(createHash('sha256').update(file).digest('hex'), image.sha256);
        assert.match(word.visual, new RegExp(image.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
        assert.doesNotMatch(word.visual, /3d-v|vocabulary-3d/);
        pictures++;
      }
      const { visual, image, ...learning } = JSON.parse(JSON.stringify(word));
      const { visual: oldVisual, image: oldImage, ...oldLearning } = original;
      assert.deepEqual(learning, oldLearning);
    }
  }
  assert.equal(pictures, 44);
  assert.equal(numbers, 4);
});

test('all 16 lessons and mixed review load the same art before starting games', () => {
  for (const page of [...Array.from({ length: 16 }, (_, i) => 'gsunit' + (i + 1)), 'review']) {
    const html = read('grade/lop2/' + page + '.html');
    assert.equal((html.match(/src="\.\/assets\/js\/unit-pencil-art\.js/g) || []).length, 1, page);
    assert.doesNotMatch(html, /src="[^"\n]*vocabulary-3d\.js/);
    const data = html.lastIndexOf('src="./assets/data/gs-unit');
    const art = html.indexOf('src="./assets/js/unit-pencil-art.js');
    const game = html.indexOf(page === 'review' ? 'src="./assets/js/mixed-review-core.js' : 'src="./assets/js/extended-topic.js');
    assert.ok(data < art && art < game, page + ' script order');
  }
});
