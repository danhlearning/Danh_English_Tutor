const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{test}=require('node:test');
const root=path.resolve(__dirname,'../..');
function bank(g){const c={window:{}};vm.createContext(c);const h=fs.readFileSync(path.join(root,`grade/lop${g}/grammar.html`),'utf8');for(const m of h.matchAll(/src="\.\/assets\/js\/(.*?\.js)/g)){if(m[1]==='grammar.js')continue;vm.runInContext(fs.readFileSync(path.join(root,`grade/lop${g}/assets/js/${m[1]}`),'utf8'),c);}return {units:c.window[`DanhGrade${g}Units`],questions:c.window[`DanhGrade${g}Grammar`],html:h};}
for(const g of [6,7,8,9,10,11,12])test(`Lớp ${g}: cấu trúc, phạm vi và ngân hàng đủ các dạng`,()=>{
const {units,questions,html}=bank(g);assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
assert(html.includes('data-effects-mode="automatic"'));assert(!html.includes('id="sound-toggle"'));assert(!html.includes('id="motion-toggle"'));
for(const u of units){assert(u.words.length>=6);assert.equal(new Set(u.words.map(w=>w.id)).size,u.words.length);
for(const type of ['choice','fill','order','correct','rewrite','pronunciation','preposition'])assert(questions.some(q=>q.unit===u.number&&q.type===type),`g${g} u${u.number} ${type}`);
for(const level of ['easy','medium','hard'])assert(questions.some(q=>q.unit===u.number&&q.level===level&&q.type==='rewrite'));
const p=questions.filter(q=>q.unit===u.number&&q.type==='preposition');assert(p.length>=10);for(const id of new Set(p.map(q=>q.passageId)))assert.equal(new Set(p.filter(q=>q.passageId===id).map(q=>q.blank)).size,10);
}
for(const q of questions){assert(q.answer?.trim(),q.id);if(q.options){assert(q.options.includes(q.answer),q.id);assert.equal(new Set(q.options).size,q.options.length,q.id);assert(q.options.length>=2&&q.options.length<=4,q.id);}}
if(g===10){assert.equal(units.flatMap(u=>u.words).length,100);assert.equal(questions.length,530);for(const u of units)for(const w of u.words){assert(w.image?.startsWith('./assets/images/pencil/'));assert(fs.existsSync(path.join(root,'grade/lop10',w.image)),w.image);}const old=Array.from({length:10},(_,i)=>['easy','medium','hard'].flatMap(l=>['choice','fill','order','correct'].map(t=>`g10-u${i+1}-${l}-${t}`))).flat();for(const id of old)assert(questions.some(q=>q.id===id),'Mất ID cũ '+id);}
console.log(`  ${questions.length} mục · ${units.length} Unit`);
});
module.exports={bank};
