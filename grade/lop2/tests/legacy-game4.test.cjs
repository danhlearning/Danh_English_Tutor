const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'assets/js/legacy-game4.js'), 'utf8');

function element() {
  return {
    textContent: '', value: '', disabled: false, hidden: false, style: {},
    children: [], handlers: {}, attrs: {},
    appendChild(child) { this.children.push(child); },
    addEventListener(name, handler) { this.handlers[name] = handler; },
    setAttribute(name, value) { this.attrs[name] = value; },
    removeAttribute(name) { delete this.attrs[name]; },
    focus() {}
  };
}

test('Game 4 cũ: sai, sửa đúng, xem đáp án, tổng kết và chơi lại', () => {
  const nodes = Object.fromEntries(
    ['count-sentence-input', 'count-feedback', 'count-score', 'count-counter-text'].map(id => [id, element()])
  );
  const controls = { check: element(), reveal: element() };
  nodes['count-sentence-input'].parentElement = element();
  nodes['game-count'] = {
    querySelector(selector) { return selector.includes('checkCountSentence') ? controls.check : controls.reveal; }
  };
  const document = {
    getElementById(id) { return nodes[id]; },
    createElement() { return element(); }
  };
  const window = { speechSynthesis: { cancel() {} } };
  vm.runInNewContext(script, { document, window });
  let index = 0;
  const questions = [{ answer: 'The cat is happy.' }, { answer: 'The dog is happy.' }];
  const game = window.DanhLegacyGame4.create({
    prepare() { index = 0; },
    questions: () => questions,
    setIndex(value) { index = value; },
    render() {
      nodes['count-sentence-input'].value = '';
      nodes['count-sentence-input'].disabled = false;
      nodes['count-feedback'].textContent = '';
      nodes['count-counter-text'].textContent = 'Câu ' + (index + 1) + ' / 2';
    },
    answers: item => [item.answer],
    primary: item => item.answer,
    speak() {},
    sound() {}
  });
  game.open();
  assert.match(nodes['count-score'].textContent, /Đã học 0\/2/);
  nodes['count-sentence-input'].value = 'wrong';
  game.check();
  assert.match(nodes['count-feedback'].textContent, /Chưa đúng/);
  assert.doesNotMatch(nodes['count-feedback'].textContent, /cat/);
  nodes['count-sentence-input'].value = 'The cat is happy.';
  game.check();
  game.check();
  assert.match(nodes['count-score'].textContent, /Sửa đúng 1/);
  const next = nodes['count-sentence-input'].parentElement.children[0];
  next.handlers.click();
  assert.equal(index, 1);
  game.reveal();
  game.reveal();
  assert.match(nodes['count-score'].textContent, /Xem đáp án 1/);
  next.handlers.click();
  assert.match(nodes['count-counter-text'].textContent, /Hoàn thành/);
  assert.equal(next.textContent, 'Chơi lại');
  next.handlers.click();
  assert.equal(index, 0);
  assert.match(nodes['count-score'].textContent, /Đã học 0\/2/);
});

test('11 trang cũ tải bộ Game 4 chung đúng thứ tự', () => {
  for (const name of ['animals','clothes','dates','familyfriends','feeling','fooddrinks',
    'fruits','householditems','numbers','schoolsupplies','verbs']) {
    const html = fs.readFileSync(path.join(root, name + '.html'), 'utf8');
    const common = html.indexOf('assets/js/legacy-game4.js');
    const topic = html.indexOf('assets/js/topics/' + name + '.js');
    const config = html.indexOf('assets/js/legacy-game4-config.js');
    assert.ok(common >= 0 && common < topic && topic < config, name);
  }
});
