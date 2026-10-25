/* Install the reviewed replacements recorded in the 25/10/2026 image audit.
 * Run after generation.json contains local sources and repairs.json is approved visually.
 * Never changes word IDs, examples, URLs, answers or learner storage. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),dir=path.join(root,'artifacts/image-repair-20261025');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const save=(f,s)=>fs.writeFileSync(path.join(root,f),s);
const normal=s=>String(s).trim().toLowerCase();
(async()=>{
 const repairs=JSON.parse(fs.readFileSync(path.join(dir,'repairs.json'),'utf8'));
 const generated=JSON.parse(fs.readFileSync(path.join(dir,'generation.json'),'utf8'));
 // Fail before altering the website if any image has not been reviewed or generated.
 for(const r of repairs){if(r.review!=='approved')throw Error('Not reviewed: '+r.term);if(r.source==='generated'&&!generated.find(g=>g.term===normal(r.term)&&g.source&&fs.existsSync(g.source)))throw Error('Missing generated image: '+r.term);}
 for(const r of repairs.filter(r=>r.source==='generated')){
  const source=generated.find(g=>g.term===normal(r.term)).source,target=path.join(root,r.image);
  fs.mkdirSync(path.dirname(target),{recursive:true});await sharp(source).resize(768,768,{fit:'contain',background:'#fbf3e3'}).webp({quality:86}).toFile(target);
 }
 for(const [term,n]of [['eleven',11],['thirteen',13],['fourteen',14],['fifteen',15]]){
  const r=repairs.find(r=>normal(r.term)===term);fs.mkdirSync(path.dirname(path.join(root,r.image)),{recursive:true});
  const dots=Array.from({length:n},(_,i)=>`<circle cx="${82+(i%5)*49}" cy="${190+Math.floor(i/5)*49}" r="16" fill="#88b5aa" stroke="#526f68" stroke-width="2"/>`).join('');
  save(r.image,`<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" viewBox="0 0 360 360"><rect width="360" height="360" rx="22" fill="#fbf3e3"/><text x="180" y="135" text-anchor="middle" font-family="sans-serif" font-size="112" font-weight="700" fill="#655098">${n}</text>${dots}</svg>\n`);
 }
 const g2='grade/lop2/assets/js/unit-pencil-art.js';let art=read(g2);
 for(const term of ['eleven','thirteen','fourteen','fifteen'])if(!art.includes('"'+term+'":'))art=art.replace('  const images = {','  const images = {\n  "'+term+'": "'+repairs.find(r=>normal(r.term)===term).image+'",');
 art=art.replace('Keep the original, legible number diagrams in Unit 13.','Keep original artwork when no reviewed file is provided.');save(g2,art);
 const grape=repairs.find(r=>r.term==='Grape');const grapeFile='grade/lop2/assets/js/pencil-images-data.js';save(grapeFile,read(grapeFile).replace('fruits/grape-v1.webp',path.posix.relative('grade/lop2/assets/images/pencil',grape.image)));
 // Set the image on each affected Unit bank; all Unit, flashcard, game and review consumers share it.
 for(const grade of [8,9]){
  const file=`grade/lop${grade}/assets/js/units-data.js`,code=read(file),ctx={window:{}};vm.runInNewContext(code,ctx);
  const units=ctx.window[`DanhGrade${grade}Units`];
  for(const unit of units)for(const word of unit.words){const r=repairs.find(r=>normal(r.term)===normal(word.term)&&normal(r.meaning)===normal(word.meaning));if(r)word.image=path.posix.relative(`grade/lop${grade}`,r.image);}
  save(file,`/* Từ và ví dụ tự biên soạn. */\nwindow.DanhGrade${grade}Units = ${JSON.stringify(units,null,2)};\n`);
 }
 const old='assets/js/pages/flashcard.js';let code=read(old);
 for(const r of repairs.filter(r=>r.locations.some(l=>l.includes('flashcard-previous')))){
  const re=new RegExp('("'+r.term+'\\|[^\\r\\n"]*\\|)https://images\\.unsplash\\.com/[^"\\r\\n]+');
  if(!re.test(code)&&!code.includes('|'+r.image+'"'))throw Error('Old card not found: '+r.term);
  code=code.replace(re,'$1'+r.image);
 }save(old,code);
 for(const r of repairs)if(!fs.existsSync(path.join(root,r.image)))throw Error('Missing installed file '+r.image);
 console.log(`Installed ${repairs.length} reviewed word/sense replacements; learning data unchanged.`);
})().catch(e=>{console.error(e);process.exitCode=1;});
