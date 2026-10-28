const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../../..');
test('50 distinct pencil animals preserve vocabulary and have safe lightweight art',()=>{
 const manifest=require('../../../docs/content/animals-pencil-manifest.json');assert.equal(manifest.length,50);assert.equal(new Set(manifest.map(w=>fs.readFileSync(path.join(root,w.file),'utf8'))).size,50);
 for(const w of manifest){const svg=fs.readFileSync(path.join(root,w.file),'utf8');assert.doesNotMatch(svg,/<(?:text|script|filter|image)\b/i);assert.match(svg,/<pattern /);assert(w.bytes<18000);assert.equal(w.license,'CC-BY-4.0');}
 const source=fs.readFileSync(path.join(root,'grade/lop2/assets/js/topics/animals.js'),'utf8');
 const questions=vm.runInNewContext(source.match(/const countGameQuestions = (\[[\s\S]*?\n  \]);/)[1]);assert.equal(questions.length,16);
 const plan=require('../../../artifacts/correct-answer-speech/audio-plan.json');
 for(const q of questions){const text=`There ${q.count===1?'is':'are'} ${q.count} ${q.count===1?q.itemSingular:q.itemPlural}`,record=plan.find(r=>r.text===text);assert(record,text);assert(fs.statSync(path.join(root,'shared/answer-audio',record.id+'.mp3')).size>1000);}
});
