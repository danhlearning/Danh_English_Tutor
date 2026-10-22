const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/schoolsupplies-migration.js'), 'utf8'), context);
const migrate = context.window.DanhSchoolSuppliesMigration;
const script = fs.readFileSync(path.join(root, 'assets/js/topics/schoolsupplies.js'), 'utf8');
const array = name => JSON.parse(JSON.stringify(vm.runInNewContext(script.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n  \\]);`))[1])));
const words = array('schoolSupplies'), questions = array('countGameQuestions');
const ids = words.map(w => w.name.toLowerCase());
const key = 'danh.learning.schoolsupplies.v1', archive = 'danh.learning.schoolsupplies.before-short-words.v1';
const retired = ['eraser', 'pencil case', 'calculator', 'paperclip', 'dictionary', 'highlighter', 'protractor'];
test('18 short words retain their names and counting uses only active pictures', () => {
  assert.deepEqual(ids, ['pencil','pen','ruler','book','school bag','scissors','glue','crayon','chair','blackboard','paper','folder','globe','compass','paintbrush','palette','stapler','backpack']);
  assert(!ids.some(id => retired.includes(id)));
  assert.equal(questions.length, 13);
  assert(questions.every(q => ids.includes(q.itemSingular)));
});
test('Changing a saved selection archives its full original and keeps surviving IDs', () => {
  const saved = {version:1,selected:['pen','eraser','book'],rounds:{mcq:{deck:['pen','eraser','book']}},cards:{index:1},best:{mcq:2},history:[{id:'original'}]};
  const values = new Map([[key,JSON.stringify(saved)],['danh.learning.fruits.v1','untouched']]);
  const storage = {getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
  assert.equal(migrate(storage,ids).changed,true);
  assert.deepEqual(JSON.parse(values.get(archive)),saved);
  const next = JSON.parse(values.get(key));
  assert.deepEqual(next.selected,['pen','book']);
  assert.deepEqual(next.rounds,{}); assert.equal(next.cards,null);
  assert.deepEqual(next.history,saved.history); assert.deepEqual(next.best,saved.best);
  assert.equal(values.get('danh.learning.fruits.v1'),'untouched');
  assert.equal(migrate(storage,ids).changed,false);
  assert.equal(values.get(archive),JSON.stringify(saved));
});
test('Unchanged selections retain rounds; retired-only selections get the new full deck', () => {
  for (const selected of [['pen','book'],retired]) {
    const saved = JSON.stringify({version:1,selected,rounds:{mcq:{id:'resume'}}});
    const values = new Map([[key,saved]]);
    migrate({getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)},ids);
    if (selected[0] === 'pen') assert.equal(values.get(key),saved);
    else assert.deepEqual(JSON.parse(values.get(key)).selected,ids);
  }
});
test('Blocked archives, malformed data and unknown IDs do not overwrite old progress', () => {
  for (const raw of ['broken',JSON.stringify({version:1,selected:['eraser','unknown']}),JSON.stringify({version:1,selected:retired})]) {
    let writes = 0;
    assert.equal(migrate({getItem:()=>raw,setItem:()=>{writes++;throw Error('blocked');}},ids).changed,false);
    assert(writes<=1);
  }
});
