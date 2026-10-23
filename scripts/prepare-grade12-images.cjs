const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),{reuse,scenes}=require('./grade12-image-content.cjs'),banks={};
for(const g of [6,7,10,11,12]){const c={window:{}};for(const f of ['pencil-images-data','units-data']){const p=path.join(root,`grade/lop${g}/assets/js/${f}.js`);if(fs.existsSync(p))vm.runInNewContext(fs.readFileSync(p,'utf8'),c);}banks[g]=c.window[`DanhGrade${g}Units`];}
const plan=banks[12].flatMap(u=>u.words.map(w=>{
 const key=`${u.number}/${w.id}`,r=reuse[key];
 if(r){const old=banks[r[0]].flatMap(u=>u.words).find(w=>w.term===r[1]);if(!old?.image)throw Error('Thiếu ảnh '+r);return{key,unit:u.number,wordId:w.id,term:w.term,meaning:w.meaning,reuse:r,file:path.posix.normalize(`grade/lop${r[0]}/`+old.image)};}
 if(!scenes[key])throw Error('Thiếu prompt '+key);
 const prompt=`Use case: illustration-story. Asset: one square English vocabulary illustration for grade 12. Meaning to convey: ${w.term} (${w.meaning}). Style: refined hand-drawn coloured-pencil illustration on warm cream textured paper, clearly visible pencil strokes and hatching, natural proportions, gently expressive faces, muted indigo-blue accents, rich but soft colours, mature high-school-friendly style matching a Vietnamese English learning workbook. Scene: ${scenes[key]} Constraints: exactly one unified illustration, no collage sheet or panel grid. NO readable text, letters, numbers, pseudo-writing, captions, labels, logos or watermarks anywhere. Physically coherent objects, grounded furniture and tools, anatomically correct separate arms and hands, no extra limbs. Leave a modest paper margin; composition must remain readable in a small square vocabulary card.`;
 return{key,unit:u.number,wordId:w.id,term:w.term,meaning:w.meaning,scene:scenes[key],prompt};
}));
fs.mkdirSync(path.join(root,'artifacts/grade12-images'),{recursive:true});fs.writeFileSync(path.join(root,'artifacts/grade12-images/image-plan.json'),JSON.stringify(plan,null,2));console.log(JSON.stringify(plan));
