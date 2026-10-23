const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{test}=require('node:test');
const root=path.resolve(__dirname,'../..'),read=f=>fs.readFileSync(path.join(root,f),'utf8');
function load(){const c={window:{}};for(const n of ['units-data','grammar-data','grammar-complete-data','grammar-improvement-data'])vm.runInNewContext(read('grade/lop12/assets/js/'+n+'.js'),c);return c.window;}
test('Lớp 12 giữ từ và 290 câu cũ; bổ sung 20 từ và 60 tình huống riêng',()=>{
 const w=load(),units=w.DanhGrade12Units,bank=w.DanhGrade12Grammar;
 assert.equal(units.length,10);assert.equal(units.flatMap(u=>u.words).length,100);assert.equal(bank.length,350);assert.equal(new Set(bank.map(q=>q.id)).size,350);
 const old=require('../../scripts/upper-secondary-content.cjs')[12].split('\n\n');
 const previous=bank.filter(q=>!q.id.startsWith('g12-enhanced'));assert.equal(previous.length,290);
 const oldSentences=new Set(previous.map(q=>q.type==='order'||q.type==='correct'||q.type==='rewrite'?q.answer:q.prompt.replace('___',q.answer)));
 for(const u of units){
  assert.equal(u.words.length,10);assert.equal(new Set(u.words.map(w=>w.id)).size,10);
  old[u.number-1].split('\n').slice(1,7).forEach((row,i)=>{const [term,meaning,example]=row.split('|');assert.equal(u.words[i].id,i+1);assert.equal(u.words[i].term,term);assert.equal(u.words[i].meaning,meaning);assert.equal(u.words[i].example,example);});
  const added=bank.filter(q=>q.id.startsWith(`g12-enhanced-u${u.number}-`));assert.equal(added.length,6);
  const sentences=added.map(q=>q.type==='choice'||q.type==='fill'?q.prompt.replace('___',q.answer):q.answer);
  assert.equal(new Set(sentences).size,6);assert(sentences.every(s=>!oldSentences.has(s)));
  for(const level of ['easy','medium','hard'])for(const type of ['choice','fill','order','correct'])assert(bank.some(q=>q.id===`g12-u${u.number}-${level}-${type}`));
  for(const q of added){assert(q.answer&&q.explain&&q.rule);if(q.options){assert.equal(q.options.filter(a=>a===q.answer).length,1);assert.equal(new Set(q.options).size,4);}if(q.parts)assert.equal(q.parts.join(' '),q.answer);if(q.type==='rewrite')assert(q.source&&q.cue.includes('...'));}
 }
});
test('Từ mới và đáp án mới có WAV thật, không im lặng',()=>{
 const w=load(),plan=JSON.parse(read('artifacts/correct-answer-speech/audio-plan.json'));
 const clean=s=>s.replace(/[’‘]/g,"'").toLowerCase();
 for(const text of [...w.DanhGrade12Units.flatMap(u=>u.words.map(w=>w.term)),...w.DanhGrade12Grammar.filter(q=>q.id.startsWith('g12-enhanced')).map(q=>q.answer)]){
  const a=plan.find(a=>clean(a.text)===clean(text));assert(a,text);const bytes=fs.readFileSync(path.join(root,'shared/answer-audio/'+a.id+'.wav'));assert.equal(bytes.toString('ascii',0,4),'RIFF');assert(bytes.length>1000);assert(bytes.subarray(44).some(b=>b!==0),text);
 }
});
test('Trang lớp 12 nạp lượt gõ, font/hồ sơ/gap chung và giữ cấu trúc lớp 6',()=>{
 for(let u=1;u<=10;u++){
  const html=read(`grade/lop12/unit${u}.html`);
  for(const tab of ['vocabulary','flashcards','quiz','spelling','grammar'])assert(html.includes(`data-tab="${tab}"`));
  assert(html.indexOf('learner-profile-core.js')<html.indexOf('learner-profile.js'));
  assert(html.indexOf('spelling-game.js')<html.indexOf('assets/js/lesson.js'));
  assert(/improvement\.css\?v=(?:grade12|pencil)-20261023/.test(html));
  assert(html.includes(`grammar.html?unit=${u}`));
 }
 assert(read('grade/lop12/grammar.html').includes('grammar-improvement-data.js?v=grade12-20261023'));
 assert(read('scripts/sync-secondary-template.cjs').includes("if(g===12)"));
});
test('80 tranh lớp 12 đúng tệp đã mở duyệt, không dùng bản bị loại',()=>{
 const crypto=require('node:crypto'),audit=JSON.parse(read('docs/content/grade12-image-review.json')),units=load().DanhGrade12Units;
 assert.equal(audit.assets.length,80);assert.equal(audit.assets.filter(a=>a.action==='created').length,61);assert.equal(audit.assets.filter(a=>a.action==='reused').length,19);assert(audit.cover.reviewed);
 for(const a of audit.assets){
  assert(a.reviewed&&a.noReadableText&&a.review.length>30,a.key);
  const file=path.join(root,a.file);assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),a.sha256);
  assert.equal(path.resolve(root,'grade/lop12',units[a.unit-1].words.find(w=>w.id===a.wordId).image),file);
 }
 assert(audit.assets.find(a=>a.key==='9/8').file.endsWith('/8-v2.webp'));
 assert(!audit.assets.some(a=>a.key==='9/8'&&a.file.endsWith('/8-v1.webp')));
});
