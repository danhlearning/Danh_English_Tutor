const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'extended-topics-data.js'), 'utf8'), context);
const catalog = context.window.grade2ExtendedTopics;
const expected = { adjectives: 12, shapes: 8, toys: 12, weather: 8, rooms: 7, transport: 12 };

for (const [id, count] of Object.entries(expected)) {
  test(`${id}: dữ liệu từ, câu và hình thống nhất`, () => {
    const topic = catalog[id];
    assert.ok(topic, id);
    assert.equal(topic.words.length, count);
    assert.equal(topic.questions.length, count);
    const ids = new Set(topic.words.map(word => word.id));
    assert.equal(ids.size, count);
    const questionIds = new Set(topic.questions.map(question => question.id));
    assert.equal(questionIds.size, count);
    for (const word of topic.words) {
      assert.match(word.id, /^[a-z0-9-]+$/);
      assert.ok(word.name && word.meaning && word.ipa);
      assert.match(word.color, /^#[0-9A-Fa-f]{6}$/);
      assert.match(word.visual, /^<svg\b[^>]*viewBox=/);
      assert.ok(!word.visual.includes('<text'), `Hình ${word.id} chứa chữ có thể lộ đáp án`);
    }
    for (const question of topic.questions) {
      assert.equal(question.targetWordIds.length, 1);
      assert.ok(ids.has(question.targetWordIds[0]));
      assert.ok(ids.has(question.imageWordId));
      assert.equal(question.imageWordId, question.targetWordIds[0]);
      assert.ok(question.vietnamese && question.answer);
      assert.ok(question.acceptedAnswers.includes(question.answer));
    }
  });
  test(`${id}: trang dùng chung có đủ vùng, script và footer`, () => {
    const html = fs.readFileSync(path.join(root, `${id}.html`), 'utf8');
    assert.match(html, new RegExp(`data-topic="${id}"`));
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, new Set(ids).size);
    for (const required of ['vocab', 'sentences', 'game-flip', 'game-mcq', 'game-spelling', 'game-count',
      'sentence-input', 'sentence-check', 'sentence-reveal', 'sentence-next']) assert.ok(ids.includes(required));
    for (const stylesheet of ['learning-shared.css', 'grade2-theme.css', 'extended-topic.css']) {
      assert.ok(html.includes(`href="./${stylesheet}"`));
      assert.ok(fs.existsSync(path.join(root, stylesheet)));
    }
    for (const script of ['extended-topics-data.js', 'extended-topic.js', 'learning-core.js', 'grade2-navigation.js']) {
      assert.ok(html.includes(`src="./${script}"`));
      assert.ok(fs.existsSync(path.join(root, script)));
    }
    assert.equal((html.match(/<contact-danh>/g) || []).length, 1);
  });
}

test('Câu đặc biệt dùng ngữ pháp phù hợp', () => {
  const toy = id => catalog.toys.questions.find(question => question.imageWordId === id).answer;
  assert.equal(toy('blocks'), 'I have some blocks.');
  assert.equal(toy('yo-yo'), 'I have a yo-yo.');
  assert.equal(catalog.adjectives.questions.find(question => question.imageWordId === 'hot').answer, 'The tea is hot.');
  assert.equal(catalog.weather.questions.find(question => question.imageWordId === 'rainy').answer, 'It is rainy today.');
});
