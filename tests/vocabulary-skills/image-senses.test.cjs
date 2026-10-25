const {test}=require('node:test'),assert=require('node:assert/strict');
const L=require('../../shared/vocabulary-library.js');
test('Images are shared only by exact normalized term AND meaning, regardless of source order',()=>{
 const sources=[{grade:2,data:[{id:'unit1',words:[{id:1,term:'square',meaning:'hình vuông',image:'./shape.svg'},{id:2,term:'bank',meaning:'bờ sông',image:'./river.svg'}]}]},{grade:6,data:[{id:'unit4',words:[{id:3,term:'square',meaning:'quảng trường'},{id:4,term:'bank',meaning:'ngân hàng'}]}]},{grade:9,data:[{id:'unit1',words:[{id:5,term:'Square',meaning:'quảng trường',image:'./town.svg'},{id:6,term:'bank',meaning:'ngân hàng',image:'https://other.invalid/wrong.svg'}]}]}];
 for(const order of [sources,[...sources].reverse()]){
  const w=L.collect(order);assert.equal(w.find(x=>x.key==='square|quảng trường').image,'grade/lop9/town.svg');assert.equal(w.find(x=>x.key==='square|hình vuông').image,'grade/lop2/shape.svg');assert.equal(w.find(x=>x.key==='bank|ngân hàng').image,null);assert.equal(w.find(x=>x.key==='square|quảng trường').sources.length,2);
 }
});
const fs=require('fs'),vm=require('vm'),path=require('path');
test('All 45 approved images survive source loading, and number diagrams contain the exact count',()=>{
 const approved=require('../../docs/content/vocabulary-image-repairs-20261025.json');assert.equal(approved.length,45);
 const courses=L.sources.map(s=>{const c={window:{},URL,document:{currentScript:{src:''}}};for(const f of s.files){c.document.currentScript.src='https://school.test/course/'+f;vm.runInNewContext(fs.readFileSync(path.resolve(__dirname,'../..',f),'utf8'),c)}return{grade:s.grade,data:c.window[s.global]}});
 const words=L.collect(courses,{},'https://school.test/course/');
 for(const r of approved){assert(fs.existsSync(path.resolve(__dirname,'../..',r.image)));const word=words.find(w=>w.key===L.key(r.term,r.meaning));if(word&&r.locations.some(l=>l.includes('flashcard.html')))assert.equal(word.image,r.image,r.term);}
 for(const n of [11,13,14,15]){const svg=fs.readFileSync(path.resolve(__dirname,`../../shared/assets/vocabulary-reviewed/number-${n}.svg`),'utf8');assert.equal((svg.match(/<circle /g)||[]).length,n);assert(svg.includes(`>${n}</text>`));}
 const apply=require('../../scripts/reviewed-vocabulary-images.cjs').apply;
 const units=[{words:[{term:'gong',meaning:'chuông',image:'bell.svg'},{term:'gong',meaning:'cồng, chiêng',image:null}]}];apply(8,units);assert.equal(units[0].words[0].image,'bell.svg');assert(units[0].words[1].image.endsWith('/gong-v1.webp'));
});
