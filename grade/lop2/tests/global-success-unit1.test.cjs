const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const index = fs.readFileSync(path.join(root, 'lop2.html'), 'utf8');
const page = fs.readFileSync(path.join(root, 'gsunit1.html'), 'utf8');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/data/gs-unit1-data.js'), 'utf8'), context);
const unit = context.window.grade2Units.gsunit1;

test('Danh mục Global Success mở đủ 16 Unit theo đúng thứ tự', () => {
  const section = index.match(/<section aria-labelledby="global-success-heading">([\s\S]*?)<\/section>/)?.[1];
  assert.ok(section);
  const badges = [...section.matchAll(/<span class="lesson-badge">Unit (\d+)<\/span>/g)].map(match => Number(match[1]));
  assert.deepEqual(badges, Array.from({ length: 16 }, (_, index) => index + 1));
  const links = [...section.matchAll(/href="gsunit(\d+)\.html"/g)].map(match => Number(match[1]));
  assert.deepEqual(links, badges);
});

test('Unit 1 giữ ba từ, hình và câu luyện nhất quán', () => {
  assert.equal(unit.id, 'gsunit1');
  assert.deepEqual(Array.from(unit.words, word => word.id), ['pasta', 'popcorn', 'pizza']);
  assert.equal(unit.questions.length, 3);
  for (const word of unit.words) {
    assert.match(word.color, /^#[0-9A-F]{6}$/i);
    assert.match(word.visual, /^<svg\b[^>]*viewBox=/);
    assert.doesNotMatch(word.visual, /<text\b/);
    const question = unit.questions.find(item => item.imageWordId === word.id);
    assert.ok(question);
    assert.deepEqual(Array.from(question.targetWordIds), [word.id]);
    assert.equal(question.answer, `I like ${word.id}.`);
  }
  assert.match(unit.description, /Câu luyện do website biên soạn/);
  assert.match(page, /data-topic="gsunit1"/);
  for (const file of ['assets/data/gs-unit1-data.js', 'assets/js/extended-topic.js', 'assets/js/learning-core.js', 'assets/js/grade2-navigation.js']) {
    assert.ok(page.includes(`src="./${file}`));
  }
});
