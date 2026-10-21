const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),entries=new Map();
const clean=s=>String(s||'').replace(/[\[\]]/g,'').replace(/·/g,',').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();
const key=s=>{let h=2166136261;for(const c of clean(s).toLowerCase())h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0).toString(16).padStart(8,'0');};
function add(text,group){text=clean(text);if(!text)return;const id=key(text),old=entries.get(id);if(old&&old.text.toLowerCase()!==text.toLowerCase())throw Error('Audio hash collision');if(old){if(!old.groups.includes(group))old.groups.push(group);}else entries.set(id,{id,text,groups:[group]});}
function question(q,group){const answer=String(q.answer??q.answers?.[0]??'').split('|')[0],example=String(q.prompt||'').match(/[“"]([^”"]+)[”"]/)?.[1];add(/[\u00c0-\u1ef9↗↘→]/.test(answer)||/^\/[^/]+\/$/.test(answer)?example:answer,group);}
function run(c,file){vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),c);}
for(const g of [6,7,8,9,10,11,12]){
 const c=vm.createContext({window:{}}),html=fs.readFileSync(path.join(root,`grade/lop${g}/grammar.html`),'utf8');
 for(const m of html.matchAll(/src="\.\/assets\/js\/(.*?\.js)/g))if(m[1]!=='grammar.js')run(c,`grade/lop${g}/assets/js/${m[1]}`);
 for(const u of c.window[`DanhGrade${g}Units`])for(const w of u.words)add(w.term,`grade${g}`);
 for(const q of c.window[`DanhGrade${g}Grammar`])question(q,`grade${g}`);
}
for(const g of [1,3,5]){const c=vm.createContext({window:{}});run(c,`grade/lop${g}/assets/js/course.js`);for(const u of c.window.DanhPrimaryTemplateCourse.units){for(const w of u.words)add(w.name,`grade${g}`);for(const p of u.patterns||[])add(p.question,`grade${g}`);}}
for(const g of [3]){const c=vm.createContext({window:{}});run(c,`grade/lop${g}/units.js`);for(const u of c.window.DanhGrade3Units){for(const w of [...u.words,...u.sentences])add(w.term,`grade${g}`);}}
const primary=vm.createContext({window:{}});run(primary,'grade/lop4/assets/js/units-data.js');run(primary,'grade/lop4/assets/js/extended-units-data.js');for(const u of Object.values(primary.window.DanhGrade4Units)){for(const w of u.words)add(w.name,'grade4');for(const p of u.patterns||[])add(`${p.question} ${p.answer}`,'grade4');}
const g2=vm.createContext({window:{}});for(const name of fs.readdirSync(path.join(root,'grade/lop2/assets/data')).filter(n=>/^gs-unit\d+-data\.js$/.test(n)))run(g2,`grade/lop2/assets/data/${name}`);for(const u of Object.values(g2.window.grade2Units||{})){for(const w of u.words)add(w.name,'grade2');for(const q of u.questions)add(q.answer,'grade2');}
for(const q of require('../assets/data/grammar/questions.js'))question(q,'grammar-room');for(const t of require('../assets/data/grammar/catalog.js').topics)for(const seed of t.seeds)add(seed.focus,'grammar-room');
const ipa=vm.createContext({window:{}});let source=fs.readFileSync(path.join(root,'assets/js/pages/ipa-practice.js'),'utf8').split('// Trạng thái ứng dụng')[0];vm.runInContext(source+';window.words=[...basicWords,...intermediateWords,...toeicWords];',ipa);for(const w of ipa.window.words)for(const text of w.word.split('/'))add(text,'ipa');
const plan=[...entries.values()].sort((a,b)=>Number(b.groups.includes('grade7'))-Number(a.groups.includes('grade7'))||a.id.localeCompare(b.id));
fs.mkdirSync(path.join(root,'artifacts/correct-answer-speech'),{recursive:true});fs.writeFileSync(path.join(root,'artifacts/correct-answer-speech/audio-plan.json'),JSON.stringify(plan,null,2));console.log(`${plan.length} English audio files; ${plan.filter(a=>a.groups.includes('grade7')).length} for grade 7.`);
