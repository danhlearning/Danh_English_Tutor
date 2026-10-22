const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
class FakeElement {
  constructor(tag = 'div') {
    this.tagName = tag;
    this.children = [];
    this.handlers = new Map();
    this.dataset = {};
    this.style = {};
    this.attrs = new Map();
    this.classList = { add() {}, remove() {} };
    this.disabled = false;
    this.hidden = false;
    this.value = '';
    this.textContent = '';
  }
  addEventListener(name, handler) { this.handlers.set(name, handler); }
  dispatch(name, event = {}) { this.handlers.get(name)?.({ target: this, ...event }); }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this.children = [...children]; }
  setAttribute(name, value) { this.attrs.set(name, value); }
  removeAttribute(name) { this.attrs.delete(name); }
  focus() {}
}
function page(id, dataFile = 'assets/data/extended-topics-data.js') {
  const ids = ['topic-title','topic-description','vocab-title','sentences-title','vocab-grid-container',
    'sentence-pattern','sentence-examples','sentence-stage','sentence-input','sentence-check',
    'sentence-reveal','sentence-next','sentence-score','sentence-feedback','vocab','sentences',
    'game-flip','game-mcq','game-spelling','game-count'];
  const nodes = new Map(ids.map(key => [key, new FakeElement()]));
  nodes.get('sentence-next').hidden = true;
  let ready;
  let mounted;
  const document = {
    body: { dataset: { topic: id } },
    getElementById: key => nodes.get(key),
    createElement: tag => new FakeElement(tag),
    addEventListener: (event, callback) => { if (event === 'DOMContentLoaded') ready = callback; },
    querySelectorAll: selector => selector === '.tab-content' ? ids.filter(key => ['vocab','sentences','game-flip','game-mcq','game-spelling','game-count'].includes(key)).map(key => nodes.get(key)) : []
  };
  const window = { DanhLesson: { mount(config) { mounted = config; config.onSelectionChange(config.words.map(word => word.id)); } } };
  const context = { window, document, setTimeout, clearTimeout };
  vm.runInNewContext(fs.readFileSync(path.join(root, dataFile), 'utf8'), context);
  vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/extended-topic.js'), 'utf8'), context);
  ready();
  return { nodes, window, mounted: () => mounted };
}
function answer(page, value) {
  page.nodes.get('sentence-input').value = value;
  page.nodes.get('sentence-input').dispatch('input');
  page.nodes.get('sentence-check').dispatch('click');
}

test('Game 4: sai không lộ đáp án; hiện đáp án chỉ tính một lần và kết thúc lượt', () => {
  const p = page('adjectives');
  const mount = p.mounted();
  mount.onSelectionChange(['big'], true);
  p.window.switchTab('game-count');
  answer(p, 'This is big');
  assert.match(p.nodes.get('sentence-feedback').textContent, /Chưa đúng/);
  assert.doesNotMatch(p.nodes.get('sentence-feedback').textContent, /The ball is big/);
  assert.match(p.nodes.get('sentence-score').textContent, /Đã học 0\/1/);
  p.nodes.get('sentence-reveal').dispatch('click');
  p.nodes.get('sentence-reveal').dispatch('click');
  assert.match(p.nodes.get('sentence-feedback').textContent, /The ball is big/);
  assert.match(p.nodes.get('sentence-score').textContent, /Xem đáp án 1/);
  answer(p, 'The ball is big.');
  assert.match(p.nodes.get('sentence-score').textContent, /Đúng ngay 0/);
  p.nodes.get('sentence-next').dispatch('click');
  assert.match(p.nodes.get('sentence-stage').textContent, /Hoàn thành lượt/);
});

test('Game 4: sửa đúng sau sai không tính đúng ngay; áp dụng lại cùng bộ từ bắt đầu lượt mới', () => {
  const p = page('shapes');
  const mount = p.mounted();
  mount.onSelectionChange(['circle'], true);
  p.window.switchTab('game-count');
  answer(p, 'wrong');
  answer(p, 'It is a circle.');
  assert.match(p.nodes.get('sentence-score').textContent, /Sửa đúng 1/);
  assert.match(p.nodes.get('sentence-score').textContent, /Đúng ngay 0/);
  answer(p, 'It is a circle.');
  assert.match(p.nodes.get('sentence-score').textContent, /Sửa đúng 1/);
  p.nodes.get('sentence-next').dispatch('click');
  mount.onSelectionChange(['circle'], true);
  assert.match(p.nodes.get('sentence-score').textContent, /Đã học 0\/1/);
});


test('Unit 1 Global Success chạy Game 4 qua bộ bài học chung', () => {
  const p = page('gsunit1', 'assets/data/gs-unit1-data.js');
  const mount = p.mounted();
  assert.equal(mount.topic, 'gsunit1');
  assert.equal(mount.words.length, 3);
  mount.onSelectionChange(['pizza'], true);
  p.window.switchTab('game-count');
  answer(p, 'I like pizza.');
  assert.match(p.nodes.get('sentence-score').textContent, /Đúng ngay 1/);
  p.nodes.get('sentence-next').dispatch('click');
  assert.match(p.nodes.get('sentence-stage').textContent, /Hoàn thành lượt/);
});
