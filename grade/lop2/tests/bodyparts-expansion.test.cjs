const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const context = {window:{}};
vm.createContext(context);
for (const file of ['assets/data/bodyparts-data.js','assets/js/bodyparts-content-update.js']) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const lesson = context.window.bodyPartsLesson, migrate = context.window.DanhBodyPartsContentUpdate;
const key = 'danh.learning.bodyparts.v1', archive = 'danh.learning.bodyparts.before-stomach.v1';
test('Stomach replaces the taught spelling and retains stable word and question IDs',()=>{
  const word = lesson.vocabulary.find(w=>w.id==='tummy');
  assert.equal(word.name,'Stomach'); assert.equal(word.ipa,'/ˈstʌm.ək/');
  assert.equal(word.meaning,'Bụng'); assert.deepEqual(Array.from(word.forms),['stomach','stomachs']);
  const question = lesson.questions.find(q=>q.id==='body-tummy');
  assert.equal(question.answer,'My stomach hurts a little');
  assert.equal(question.imageWordId,'tummy');
  assert(!JSON.stringify(lesson.vocabulary.map(w=>[w.name,w.sentence])).toLowerCase().includes('tummy'));
});
test('All 16 additions have a matching sentence and unambiguous singular/plural forms',()=>{
  const ids = ['face','forehead','eyebrows','eyelashes','cheeks','chin','lips','tongue','chest','back','elbow','wrist','thumb','toes','ankle','heel'];
  assert.equal(lesson.vocabulary.length,32); assert.equal(lesson.questions.length,32);
  for(const id of ids){
    const word=lesson.vocabulary.find(w=>w.id===id),q=lesson.questions.find(q=>q.id==='body-'+id);
    assert(word?.ipa&&word.meaning&&word.imageDescription,id);
    assert.equal(q.answer,word.sentence.replace(/\.$/,''));
    assert.equal(q.imageWordId,id);
    assert(q.acceptedAnswers.includes(q.answer));
    assert.equal(q.targetWordIds.length,1);
    assert.equal(q.targetWordIds[0],id);
  }
});
test('All 32 pictures resolve to reviewed assets with unchanged bytes',()=>{
  vm.runInContext(fs.readFileSync(path.join(root,'assets/js/pencil-images-data.js'),'utf8'),context);
  const repository=path.resolve(root,'../..');
  const review=JSON.parse(fs.readFileSync(path.join(repository,'artifacts/grade2-pencil/bodyparts-expansion-review.json'),'utf8'));
  assert.equal(review.assets.length,32);
  const updates=JSON.parse(fs.readFileSync(path.join(repository,'docs/content/bodyparts-character-image-review.json'),'utf8'));
  assert.equal(updates.assets.length,18);
  for(const asset of updates.assets){
    assert(asset.reviewed&&asset.noReadableText&&asset.reviewSource);
    assert.equal(asset.previousFile,review.assets.find(a=>a.id===asset.id).file);
    assert.equal(asset.previousSha256,review.assets.find(a=>a.id===asset.id).sha256);
  }
  for(const word of lesson.vocabulary){
    const asset=updates.assets.find(a=>a.id===word.id)||review.assets.find(a=>a.id===word.id);
    const file=context.window.DanhGrade2PencilManifest.bodyparts[word.name.toLowerCase()];
    assert.equal('grade/lop2/assets/images/pencil/'+file,asset.file);
    assert.deepEqual(asset.size,[768,768]);
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(repository,asset.file))).digest('hex'),asset.sha256);
  }
});
test('Only the spelling round containing the old word restarts; original evidence remains archived',()=>{
  const saved={version:1,selected:['tummy','head'],rounds:{spelling:{deck:['tummy','head'],index:1},mcq:{id:'keep'}},cards:{seen:['head','tummy']},history:[{id:'keep-history'}],best:{mcq:5}};
  const values=new Map([[key,JSON.stringify(saved)]]);
  const storage={getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)};
  assert.equal(migrate(storage),true);
  assert.deepEqual(JSON.parse(values.get(archive)),saved);
  const next=JSON.parse(values.get(key));
  assert.deepEqual(next.selected,saved.selected); assert.deepEqual(next.rounds.mcq,saved.rounds.mcq);
  assert.equal(next.rounds.spelling,undefined); assert.deepEqual(next.history,saved.history);
  assert.deepEqual(next.cards.seen,['head']);
  assert.equal(migrate(storage),false);
});
test('Unaffected spelling, malformed or blocked storage stays untouched',()=>{
  const raw=JSON.stringify({version:1,selected:['head'],rounds:{spelling:{deck:['head']}}});
  const values=new Map([[key,raw]]);
  assert.equal(migrate({getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)}),false);
  assert.equal(values.get(key),raw);
  assert.equal(migrate({getItem:()=>'{broken',setItem:()=>assert.fail('Must not write')}),false);
  assert.equal(migrate({getItem:()=>{throw Error('blocked')},setItem:()=>assert.fail('Must not write')}),false);
});
