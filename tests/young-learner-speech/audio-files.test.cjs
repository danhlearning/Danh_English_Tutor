const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),plan=JSON.parse(fs.readFileSync(path.join(root,'artifacts/correct-answer-speech/audio-plan.json'),'utf8'));
test('Every planned answer has non-silent PCM audio, including 96 grade 7 words and grammar',()=>{
 assert(plan.length>3700);const ids=new Set();
 for(const a of plan){assert(!ids.has(a.id));ids.add(a.id);const bytes=fs.readFileSync(path.join(root,'shared/answer-audio',a.id+'.wav'));assert.equal(bytes.toString('ascii',0,4),'RIFF');assert.equal(bytes.toString('ascii',8,12),'WAVE');let pos=12,data;while(pos+8<=bytes.length){const len=bytes.readUInt32LE(pos+4);if(bytes.toString('ascii',pos,pos+4)==='data'){data=bytes.subarray(pos+8,pos+8+len);break;}pos+=8+len+(len%2);}assert(data?.length>1000,a.text);let peak=0;for(let i=0;i+1<data.length;i+=2)peak=Math.max(peak,Math.abs(data.readInt16LE(i)));assert(peak>500,a.text+' silent');}
 const c={window:{}};require('node:vm').runInNewContext(fs.readFileSync(path.join(root,'grade/lop7/assets/js/units-data.js'),'utf8'),c);
 for(const u of c.window.DanhGrade7Units)for(const w of u.words)assert(plan.some(a=>a.text.toLowerCase()===w.term.toLowerCase()&&a.groups.includes('grade7')),w.term);
});
