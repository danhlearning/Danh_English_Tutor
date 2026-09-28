const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.createContext(context);
for (const name of ['assets/data/bodyparts-data.js', 'assets/js/bodyparts-diagrams.js', 'assets/js/lesson-core.js']) vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
const lesson = context.window.bodyPartsLesson;
const core = context.window.Lop2Lesson;
vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/learning-core.js'), 'utf8'), context);
const LearningState = context.window.DanhLesson.LearningState;
const plain = value => JSON.parse(JSON.stringify(value));
function memory() {
  const map = new Map();
  return { getItem: key => map.get(key) ?? null, setItem: (key, value) => map.set(key, value) };
}
test('Mặc định chọn đủ 16 từ và 16 câu', () => {
  const selection = core.createSelection(lesson, memory());
  assert.equal(selection.words().length, 16);
  assert.equal(selection.questions().length, 16);
});
test('Chọn 4 từ và lọc đúng câu nhiều từ mục tiêu', () => {
  const selection = core.createSelection(lesson, memory());
  selection.apply(['head', 'eyes', 'shoulder', 'foot']);
  assert.deepEqual(plain(selection.words().map(word => word.id)), ['head', 'eyes', 'shoulder', 'foot']);
  assert.equal(selection.questions().some(q => q.id === 'body-shoulder'), false);
  assert.equal(selection.questions().some(q => q.id === 'body-foot'), true);
  selection.apply(['head', 'hand', 'shoulder', 'foot']);
  assert.equal(selection.questions().some(q => q.id === 'body-shoulder'), true);
});
test('Không đổi bộ đang chơi nếu lựa chọn không đủ 4 từ duy nhất', () => {
  const selection = core.createSelection(lesson, memory());
  assert.throws(() => selection.apply(['head', 'head', 'eyes', 'missing']));
  assert.equal(selection.words().length, 16);
});
test('Bản sao ID không cho thay đổi bộ đã áp dụng', () => {
  const selection = core.createSelection(lesson, memory());
  const draft = selection.ids(); draft.pop();
  assert.equal(selection.ids().length, 16);
});
test('Nhớ bộ đã áp dụng và cách ly theo chủ đề', () => {
  const storage = memory();
  core.createSelection(lesson, storage).apply(['head', 'hair', 'eyes', 'ears']);
  assert.equal(core.createSelection(lesson, storage).words().length, 4);
  assert.equal(core.createSelection({...lesson, id: 'another-topic'}, storage).words().length, 16);
});
test('Dữ liệu lưu hỏng hoặc lỗi thời quay về tất cả', () => {
  for (const value of ['not json', '{}', '["head","eyes","missing"]']) {
    assert.equal(core.createSelection(lesson, {getItem: () => value}).words().length, 16);
  }
});
test('Lưu trữ bị chặn vẫn học với bộ đã chọn trong phiên', () => {
  const storage = {getItem() {throw Error('blocked')}, setItem() {throw Error('blocked')}};
  const selection = core.createSelection(lesson, storage);
  assert.equal(selection.apply(['head', 'hair', 'eyes', 'ears']).saved, false);
  assert.equal(selection.words().length, 4);
});
test('Xáo trộn không thêm từ ngoài bộ đã chọn', () => {
  const selection = core.createSelection(lesson, memory());
  selection.apply(['head', 'hair', 'eyes', 'ears']);
  const before = selection.words();
  assert.deepEqual(plain(core.shuffle(before).map(w => w.id).sort()), plain(before.map(w => w.id).sort()));
});
test('Bộ game chung nhớ lựa chọn Body Parts và không cộng điểm sau khi làm sai', () => {
  const storage = memory();
  let time = 1000;
  const now = () => time;
  const words = lesson.vocabulary.map(({ id }) => ({ id }));
  const state = new LearningState('bodyparts', words, storage, now);
  assert.equal(state.select(['head', 'eyes']), true);
  const restored = new LearningState('bodyparts', words, storage, now);
  assert.deepEqual(plain(restored.state.selected), ['head', 'eyes']);
  const round = restored.newRound('mcq');
  assert.equal(round.deck.length, 2);
  const wrong = round.deck.find(id => id !== round.deck[0]);
  assert.equal(restored.answer('mcq', false, wrong).score, 0);
  assert.equal(restored.answer('mcq', true, round.deck[0]).earned, 0);
  assert.equal(restored.answer('mcq', true, round.deck[0]), null);
  time += 1000;
  assert.equal(restored.advance('mcq'), true);
  assert.equal(restored.round('mcq').index, 1);
});

test('Cả 16 hình Body Parts có tên chỉ dẫn khi học và ẩn tên trong trò chơi', () => {
  assert.equal(lesson.vocabulary.length, 16);
  for (const word of lesson.vocabulary) {
    assert.match(word.diagramSvg, /<svg[^>]*bodyparts-diagram/);
    assert.match(word.diagramSvg, new RegExp(`<text[^>]*>${word.name}</text>`));
    assert.match(word.svg, /<svg[^>]*svg-icon/);
    assert.doesNotMatch(word.svg, /<text\b/i);
  }
});

test('Mỗi câu Body Parts chỉ tham chiếu từ và hình có thật', () => {
  const ids = new Set(lesson.vocabulary.map(word => word.id));
  assert.equal(ids.size, 16);
  assert.equal(lesson.questions.length, 16);
  for (const question of lesson.questions) {
    assert.equal(ids.has(question.imageWordId), true, question.id);
    assert.equal(question.targetWordIds.length > 0, true, question.id);
    assert.equal(question.targetWordIds.every(id => ids.has(id)), true, question.id);
    assert.equal(question.acceptedAnswers.includes(question.answer), true, question.id);
  }
});

test('Mọi trang Lớp 2 có đúng một footer và không gọi components.js bị thiếu', () => {
  const pages = fs.readdirSync(root).filter(name => name.endsWith('.html'));
  const menu = fs.readFileSync(path.join(root, 'lop2.html'), 'utf8');
  const linkedPages = [...menu.matchAll(/<a\s+href="([^"]+\.html)"\s+class="lesson-card"/g)].map(match => match[1]);
  assert.equal(new Set(linkedPages).size, linkedPages.length);
  assert.deepEqual(pages.slice().sort(), ['lop2.html', ...linkedPages].sort());
  for (const page of pages) {
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.equal((html.match(/<contact-danh>/g) || []).length, 1, page);
    const projectRoot = path.resolve(root, '../..');
    const footerScripts = [...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1[^>]*>/gi)]
      .map(match => match[2].split(/[?#]/, 1)[0])
      .filter(src => src.endsWith('contact-footer.js'));
    assert.equal(footerScripts.length, 1, page);
    assert.equal(path.resolve(path.dirname(path.join(root, page)), footerScripts[0]), path.join(projectRoot, 'shared', 'contact-footer.js'), page);
    assert.equal(html.includes('../../components.js'), false, page);
    assert.equal((html.match(/<footer>/g) || []).length, 0, page);
  }
});
