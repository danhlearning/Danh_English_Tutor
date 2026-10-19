/* Only inspected, hash-matching images enter the runtime manifest. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const review=JSON.parse(fs.readFileSync(path.join(root,'artifacts/grade6-pencil/individual-review.json'),'utf8'));
const images={};
for(const r of review.records){
 const [unit,id]=r.key.split('/'),file=path.join(root,r.file);
 if(!r.reviewedVisually||!r.noReadableText||crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')!==r.sha256)throw Error('Image must be inspected: '+r.key);
 (images[unit]||={})[id]='./assets/images/pencil/'+r.file.split('/pencil/')[1];
}
fs.writeFileSync(path.join(root,'grade/lop6/assets/js/pencil-images-data.js'),'/* Reviewed local colored-pencil artwork for Grade 6. */\nwindow.DanhGrade6PencilImages = '+JSON.stringify(images,null,2)+';\n');
if(review.records.length===96){
 for(const name of fs.readdirSync(path.join(root,'grade/lop6')).filter(n=>n.endsWith('.html'))){
  const file=path.join(root,'grade/lop6',name),html=fs.readFileSync(file,'utf8');
  const updated=html.replaceAll('pencil-20261019"','pencil-20261019-final"');
  if(updated!==html)fs.writeFileSync(file,updated);
 }
}
console.log(`Integrated ${review.records.length}/96 inspected images`);
