const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({ window: {} });
for (const file of ['units-data.js', 'grammar-data.js', 'round-selection.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js', file), 'utf8'), context);
}
const units = context.window.DanhGrade7Units;
const questions = context.window.DanhGrade7Grammar;
test('12 chủ đề lớp 7, 96 từ và đủ trang học', () => {
  assert.equal(units.length, 12);
  assert.equal(units.reduce((n, u) => n + u.words.length, 0), 96);
  assert.equal(units[0].title, 'Hobbies');
  assert.equal(units[11].title, 'English-speaking Countries');
  for (const unit of units) {
    assert.ok(fs.existsSync(path.join(root, `${unit.id}.html`)));
    assert.equal(new Set(unit.words.map(w => w.term)).size, unit.words.length);
    for (const word of unit.words) {
      assert.ok(word.term && word.meaning && word.example);
      if (word.image) assert.ok(fs.existsSync(path.resolve(root, word.image)), word.image);
    }
  }
  assert.equal(units.flatMap(u => u.words).filter(w => w.image).length, 19);
});
test('mỗi Unit/cấp độ đủ 10 câu và ít nhất 2 câu viết lại', () => {
  assert.equal(questions.length, 432);
  assert.equal(new Set(questions.map(q => q.id)).size, questions.length);
  for (const unit of units) {
    for (const level of ['easy', 'medium', 'hard']) {
      const pool = questions.filter(q => q.unit === unit.number && q.level === level);
      assert.ok(pool.length >= 10);
      assert.ok(pool.filter(q => q.type === 'rewrite').length >= 2);
      assert.deepEqual([...new Set(pool.map(q => q.type))].sort(), ['choice', 'correct', 'fill', 'order', 'rewrite']);
      for (const q of pool) {
        assert.ok(q.prompt && q.answer && q.explain && q.rule);
        assert.ok(!q.answer.includes('___'));
        if (q.type === 'choice') {
          assert.equal(q.options.filter(x => x === q.answer).length, 1);
          assert.equal(new Set(q.options).size, q.options.length);
        }
        if (q.type === 'order') assert.equal(q.parts.join(' '), q.answer);
        if (q.type === 'rewrite') assert.ok(q.source && q.cue);
      }
    }
  }
});
test('tiến độ lớp 7 được lưu riêng và ảnh không lộ nghĩa ở mặt trước thẻ', () => {
  const lesson = fs.readFileSync(path.join(root, 'assets/js/lesson.js'), 'utf8');
  const grammar = fs.readFileSync(path.join(root, 'assets/js/grammar.js'), 'utf8');
  assert.ok(lesson.includes('danh-g7-'));
  assert.ok(grammar.includes('danh-g7-grammar-v1'));
  assert.ok(!lesson.includes('DanhGrade6') && !grammar.includes('DanhGrade6'));
});
test('lượt 10 câu luôn giữ hai bài viết lại ở mọi vị trí trong pool', () => {
  const select = context.window.DanhGrade7Round.select;
  for (const unit of units) {
    for (const level of ['easy', 'medium', 'hard']) {
      const pool = questions.filter(q => q.unit === unit.number && q.level === level);
      // Two rewrites can land at any positions after the priority sort.
      const rewrites = pool.filter(q => q.type === 'rewrite');
      const others = pool.filter(q => q.type !== 'rewrite');
      for (let first = 0; first < 11; first++) {
        for (let second = first + 1; second < 12; second++) {
          const arranged = [...others];
          arranged.splice(first, 0, rewrites[0]);
          arranged.splice(second, 0, rewrites[1]);
          const chosen = select(arranged, 10);
          assert.equal(chosen.length, 10);
          assert.equal(new Set(chosen.map(q => q.id)).size, 10);
          assert.equal(chosen.filter(q => q.type === 'rewrite').length, 2);
          assert.equal(arranged.length, 12);
        }
      }
    }
  }
});

test('bộ nâng cấp: bốn lựa chọn, viết lại có mở đầu, phát âm và đoạn văn đủ 12 Unit', () => {
  const upgraded=vm.createContext({window:{}});
  for(const file of ['units-data.js','grammar-data.js','grammar-exam-data.js'])vm.runInContext(fs.readFileSync(path.join(root,'assets/js',file),'utf8'),upgraded);
  const bank=upgraded.window.DanhGrade7Grammar;
  assert.equal(new Set(bank.map(q=>q.id)).size,bank.length);
  for(const q of bank){
    if(q.options){assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);assert.equal(q.options.filter(x=>x===q.answer).length,1,q.id);}
    if(q.type==='rewrite'){const prefix=q.cue.split('...')[0].trim();assert.ok(prefix && !prefix.includes('Bắt đầu:'),q.id);assert.ok(q.answer.split('|')[0].startsWith(prefix),q.id);}
    if(q.marked){assert.equal(q.marked.length,4);assert.ok(q.marked.every(x=>/\[[^\]]+\]/.test(x)));}
  }
  for(let unit=1;unit<=12;unit++){
    assert.ok(bank.some(q=>q.unit===unit&&q.type==='pronunciation'));
    const passage=bank.filter(q=>q.unit===unit&&q.type==='preposition');
    assert.equal(passage.length,10);assert.equal(new Set(passage.map(q=>q.passageId)).size,1);
    assert.deepEqual(Array.from(passage,q=>q.blank),[1,2,3,4,5,6,7,8,9,10]);
    assert.equal(new Set(passage.map(q=>q.part)).size,5);
    for(const q of passage)assert.equal((q.passage.match(/\(\d+\) ___/g)||[]).length,2);
  }
});
