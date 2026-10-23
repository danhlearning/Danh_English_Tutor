const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),content=require('./upper-secondary-vocabulary-extension.cjs');
const data={};for(let grade=6;grade<=12;grade++){
 const c={window:{}};for(const f of ['pencil-images-data.js','units-data.js']){const file=path.join(root,`grade/lop${grade}/assets/js/${f}`);if(fs.existsSync(file))vm.runInNewContext(fs.readFileSync(file,'utf8'),c);}
 data[grade]=c.window[`DanhGrade${grade}Units`];
}
const assets=[];
for(const [g,units]of Object.entries(content))for(const [u,words]of units.entries())for(const [i,[term,meaning,example,reference]]of words.entries()){
 const a={key:`${g}/${u+1}/${i+9}`,grade:Number(g),unit:u+1,wordId:i+9,term,meaning,example};
 if(Array.isArray(reference)){
  const [grade,unit,id]=reference,w=data[grade][unit-1].words.find(w=>w.id===id);
  if(w?.image){a.file=path.posix.normalize(`grade/lop${grade}/${w.image}`);a.reference={grade,unit,id,term:w.term};}
 }
 if(!a.file)a.prompt=`Create one square educational vocabulary illustration for a Vietnamese upper-secondary English learner. Colored pencil drawing on warm cream paper, visible pencil grain, restrained pastel colors, clear hand-drawn outlines, friendly but age-appropriate, centered readable scene. No border, no words, no letters, no digits, no pseudo-writing, no captions, no logos anywhere. Depict the English meaning of '${term}'. ${typeof reference==='string'?reference:`Context to illustrate: ${example} Show a clear concrete scene that makes this meaning understandable, with natural anatomy and physically plausible objects.`} No text from the prompt in the image. This is one illustration, not a multi-panel atlas.`;
 assets.push(a);
}
const dir=path.join(root,'artifacts/upper-secondary-vocabulary');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'image-plan.json'),JSON.stringify(assets,null,2));
console.log(JSON.stringify({total:assets.length,reuse:assets.filter(a=>a.file).length,new:assets.filter(a=>a.prompt).map(a=>[a.key,a.term])},null,2));
