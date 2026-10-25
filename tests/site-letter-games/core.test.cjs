const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const A=require('../../shared/site-letter-games.js'),C=require('../../grade/lop2/assets/js/letter-ladder-core.js'),L=require('../../shared/vocabulary-library.js'),I=require('../../scripts/install-site-letter-games.cjs');
const read=f=>fs.readFileSync(f,'utf8');
function course(g){const w={window:{}};const files=g===2?['assets/data/gs-unit1-data.js','assets/data/gs-units-data.js']:[g<=5?'assets/js/grade2-course.js':'assets/js/units-data.js'];for(const file of files)vm.runInNewContext(read(`grade/lop${g}/`+file),w);const data=g===2?w.window.grade2Units:g<=5?w.window.DanhPrimaryGrade2Course.units:w.window[`DanhGrade${g}Units`];return Array.isArray(data)?data:Object.values(data);}
test('adapter keeps source spellings and senses, deduplicates repeated senses, and uses stable compact IDs',()=>{
 const source=[{term:'T-shirt',meaning:'áo phông'},{name:'Bank',meaning:'ngân hàng'},{term:'bank',meaning:'bờ sông'},{name:'bank',meaning:'ngân hàng'},{term:'11',meaning:'số'}],before=JSON.stringify(source),bank=A.normalize(source);
 assert.equal(bank.length,3);assert.equal(bank[0].name,'T-shirt');assert.equal(bank[0].meaning,'áo phông');assert.equal(new Set(bank.map(w=>w.id)).size,3);assert(bank.every(w=>w.id.length<30));assert.equal(A.fingerprint(bank),A.fingerprint([...bank].reverse()));assert.equal(JSON.stringify(source),before);
});
test('all twelve classes use their own real banks and independent letter keys',()=>{
 const values=new Map(),storage={getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)};
 for(let grade=1;grade<=12;grade++){
  const units=course(grade),bank=A.normalize(units[0].words),game=C.create(storage,'site-unit1',bank,{grade});assert(bank.length>0);assert(game.start(bank.map(w=>w.id)));assert(game.key.startsWith(`danh-g${grade}-`));assert(game.state.active.ids.length<=8);
  assert.deepEqual(C.create(storage,'site-unit1',bank,{grade}).state.active,game.state.active);
 }
 assert.equal(new Set([...values.keys()]).size,12);const mixed=C.create(storage,'library',A.normalize(course(12)[0].words),{grade:0});assert(mixed.key.startsWith('danh-g0-'));
});
test('every active Unit and review page has the shared game and integration is repeatable',()=>{
 let unitsChecked=0;
 for(let grade=1;grade<=12;grade++){
  for(const unit of course(grade)){
   const file=`grade/lop${grade}/${unit.id}.html`,html=read(file);assert(html.includes('letter-ladder-core.js'),file);assert(html.includes('letter-ladder.js?'),file);assert(html.includes('letter-ladder.css'),file);
   if(grade>=6){assert(html.includes('data-tab="letters"'),file);assert(html.includes('id="letters-stage"'),file);assert(html.indexOf('site-letter-games.js')<html.indexOf('shared/vocabulary-game.js'),file);assert(html.includes('grade/lop2/assets/js/picture-audio.js'),file);}
   assert.equal(I.transform(html,file),html,file+' is not stable after rebuild');unitsChecked++;
  }
  const review=`grade/lop${grade}/${grade<=5?'review':'vocabulary-review'}.html`,html=read(review);
  assert(html.includes(grade<=5?'id="start-letters"':'site-letter-games.js'),review);assert.equal(I.transform(html,review),html);
 }
 assert(unitsChecked>=160);
});
test('library and its template expose letter mode, and builders keep the integration',()=>{
 for(const file of ['flashcard.html','templates/vocabulary-skills.html']){const html=read(file);assert(html.includes('data-mode="letters"'));assert(html.includes('site-letter-games.js'));assert(html.indexOf('site-letter-games.js')<html.indexOf('assets/js/pages/vocabulary-skills.js'));assert.equal(I.transform(html,file),html);}
 for(const file of ['build-primary-template','sync-primary-grade2','build-secondary-grades','sync-secondary-template','build-upper-secondary'])assert(read(`scripts/${file}.cjs`).includes("require('./install-site-letter-games.cjs').run()"));
 assert(read('shared/contact-footer.js').includes('flashcard.html?game=letters'));
});
test('the library resolves current pencil art correctly under a published project prefix',()=>{
 const data=[{grade:2,data:[{id:'gsunit6',words:[{id:'fox',name:'Fox',meaning:'con cáo',image:'https://school.test/project/grade/lop2/assets/images/pencil/units/fox-v1.webp'}]}]}];
 assert.equal(L.collect(data,{},'https://school.test/project/')[0].image,'grade/lop2/assets/images/pencil/units/fox-v1.webp');
});
test('all nineteen auxiliary topics use a letter entry, including shared Animals games',()=>{
 const topics=['animals','clothes','colors','dates','familyfriends','feeling','fooddrinks','fruits','numbers','schoolsupplies','shapes','toys','weather','bodyparts','verbs','adjectives','householditems','rooms','transport'];
 for(const topic of topics){const file=`grade/lop2/${topic}.html`,html=read(file);assert(html.includes('letter-ladder-core.js'),file);assert(html.includes('letter-ladder.js?'),file);assert.equal(I.transform(html,file),html);}
 assert(read('grade/lop2/animals.html').includes('animals-shared.js'));
 assert(read('grade/lop2/assets/js/animals-shared.js').includes("DanhLesson.mount({topic: 'animals'"));
 const generic=A.normalize([{term:'custom',meaning:'phong tục',icon:'👟'}])[0];assert(generic.visual.includes('✏️'));assert(!generic.visual.includes('👟'));
});
