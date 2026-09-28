const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/units-data.js'), 'utf8'), context);
const units = context.window.DanhGrade4Units;
const { createStore, DAY } = require('../assets/js/progress.js');

test('Bốn Unit có trang, từ, hình và câu luyện nhất quán', () => {
  assert.deepEqual(Object.keys(units), ['unit1', 'unit2', 'unit3', 'unit4']);
  for (const [key, unit] of Object.entries(units)) {
    const html = fs.readFileSync(path.join(root, `${key}.html`), 'utf8');
    assert.match(html, new RegExp(`data-unit="${key}"`));
    assert.equal(unit.words.length, 6);
    assert.equal(new Set(unit.words.map(word => word.id)).size, 6);
    assert.ok(unit.patterns.length >= 2);
    for (const word of unit.words) {
      assert.match(word.ipa, /^\/.+\/$/);
      assert.match(word.color, /^#[0-9a-f]{6}$/i);
      assert.match(word.visual, /^<svg\b[^>]*viewBox="0 0 120 120"/);
      assert.ok(!/<script|foreignObject|(?:href|src)=["']https?:/i.test(word.visual));
      if (unit.number >= 3) {
        const match = word.visual.match(/href="(\.\/assets\/images\/unit[34]\/[^".]+\.webp)"/);
        assert.ok(match, `${word.name} cần ảnh WebP nội bộ`);
        assert.ok(fs.statSync(path.join(root, match[1])).size > 1000);
      }
      assert.equal(word.context.split('____').length, 2);
    }
  }
});

test('Tiến độ lớp 4 cách ly theo Unit, ôn theo ngày và không tính đáp án được xem', () => {
  const cache = new Map();
  const storage = { getItem: key => cache.get(key) || null, setItem: (key, value) => cache.set(key, value) };
  let time = 1_000_000;
  const store = createStore(storage, () => time);
  store.practice('unit1:japan', 'spelling', { correct: true, firstTry: true });
  assert.equal(store.get('unit1:japan').skills.spelling, true);
  assert.equal(store.due(['unit1:japan']).length, 0);
  assert.equal(store.get('unit2:japan'), null);
  time += DAY;
  assert.deepEqual(store.due(['unit1:japan']), ['unit1:japan']);
  store.review('unit1:japan', true);
  assert.equal(store.get('unit1:japan').reviewStage, 1);
  assert.equal(store.get('unit1:japan').dueAt, time + DAY);
  store.practice('unit2:bed', 'spelling', { correct: false, revealed: true });
  assert.equal(store.get('unit2:bed').skills.spelling, undefined);
  assert.deepEqual(store.due(['unit2:bed']), ['unit2:bed']);
  const restored = createStore(storage, () => time);
  assert.equal(restored.get('unit1:japan').reviewStage, 1);
});

test('Xem đáp án trong bộ chính tả chung không được tính là trả lời đúng', () => {
  const core = { window: {}, crypto: { randomUUID: () => 'test-round' }, setTimeout, clearTimeout };
  vm.runInNewContext(fs.readFileSync(path.join(root, '../lop2/assets/js/learning-core.js'), 'utf8'), core);
  let time = 2000;
  const memory = new Map();
  const storage = { getItem: key => memory.get(key) || null, setItem: (key, value) => memory.set(key, value) };
  const LearningState = core.window.DanhLesson.LearningState;
  const state = new LearningState('g4unit1', [{ id: 'japan' }], storage, () => time, 'picture');
  assert.equal(state.cards().mode, 'picture');
  state.newRound('spelling');
  assert.equal(state.reveal('spelling'), true);
  assert.equal(state.reveal('spelling'), false);
  const answer = state.round('spelling').answers[0];
  assert.equal(answer.revealed, true);
  assert.equal(state.totals(state.round('spelling')).score, 0);
  assert.equal(state.totals(state.round('spelling')).firstTry, 0);
  time += 1000;
  assert.equal(state.advance('spelling'), true);
});
