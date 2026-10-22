const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/data/gs-units-data.js'), 'utf8'), context);
const catalog = context.window.grade2Units;

test('Unit 2–16 có đủ trang và dữ liệu trò chơi nhất quán', () => {
  assert.equal(Object.keys(catalog).length, 15);
  for (let number = 2; number <= 16; number++) {
    const id = `gsunit${number}`;
    const unit = catalog[id];
    const page = fs.readFileSync(path.join(root, `${id}.html`), 'utf8');
    assert.ok(unit, `Missing ${id}`);
    assert.match(unit.title, new RegExp(`^Unit ${number} · `));
    assert.match(unit.description, /website biên soạn/);
    assert.ok(unit.words.length >= 2, `${id} needs MCQ choices`);
    assert.equal(unit.words.length, unit.questions.length, `${id} questions`);
    assert.equal(new Set(unit.words.map(word => word.id)).size, unit.words.length, `${id} duplicate word IDs`);
    assert.match(page, new RegExp(`data-topic="${id}"`));
    for (const script of ['gs-units-data.js', 'grade2-progress.js', 'extended-topic.js', 'learning-core.js', 'grade2-navigation.js']) {
      assert.ok(page.includes(`src="./assets/${script === 'gs-units-data.js' ? 'data' : 'js'}/${script}`), `${id}: ${script}`);
    }
    assert.match(page, /<contact-danh><\/contact-danh>/);
    const byId = new Map(unit.words.map(word => [word.id, word]));
    for (const word of unit.words) {
      assert.match(word.ipa, /^\/.+\/$/, `${id}: ${word.name} IPA`);
      assert.match(word.color, /^#[0-9a-f]{6}$/i);
      assert.match(word.visual, /^<svg\b[^>]*viewBox="0 0 120 120"/);
      assert.doesNotMatch(word.visual, /<script|<foreignObject|(?:href|src)=["']https?:/i);
      const question = unit.questions.find(item => item.imageWordId === word.id);
      assert.ok(question, `${id}: ${word.name} question`);
      assert.deepEqual(Array.from(question.targetWordIds), [word.id]);
      assert.ok(question.acceptedAnswers.includes(question.answer));
      assert.ok(question.vietnamese);
      assert.ok(byId.has(question.imageWordId));
    }
  }
});
