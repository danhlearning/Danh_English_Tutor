const fs=require('node:fs'),path=require('node:path'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),work=path.join(root,'artifacts/grade10-pencil');
(async()=>{const assets=JSON.parse(fs.readFileSync(path.join(work,'generation.json'),'utf8')).assets;
const approvedFile=path.join(work,'final-prompts.json');
const approved=new Map((fs.existsSync(approvedFile)?JSON.parse(fs.readFileSync(approvedFile,'utf8')).assets:[]).map(a=>[a.key,a]));
for(const a of assets){const current=approved.get(a.key);if(current?.reviewedVisually&&current?.logicReviewedAt)Object.assign(a,{file:current.file,source:current.source,logicReviewedAt:current.logicReviewedAt,logicReview:current.logicReview,previousFile:current.previousFile,previousSha256:current.previousSha256,repairInitialPrompt:current.repairInitialPrompt});}
const single=JSON.parse(fs.readFileSync(path.join(work,'individual-sources.json'),'utf8'));
const sheets=[1,2,3].flatMap(i=>{const file=path.join(work,`atlas-sources-${i}.json`);return fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):[];});
const records=[];
for(const a of assets){const direct=single.find(r=>r.key===a.key),sheet=sheets.find(r=>r.unit===a.unit);if(!a.source&&!direct&&!sheet)continue;const out=path.join(root,a.file);if(fs.existsSync(out)){records.push({...a,source:a.source||direct?.source||sheet.source});continue;}fs.mkdirSync(path.dirname(out),{recursive:true});
let img=sharp(a.source||direct?.source||sheet.source);if(!a.source&&!direct){const m=await img.metadata(),col=(a.wordId-1)%4,row=Math.floor((a.wordId-1)/4);const left=Math.round(col*m.width/4),top=Math.round(row*m.height/2),right=Math.round((col+1)*m.width/4),bottom=Math.round((row+1)*m.height/2);img=img.extract({left,top,width:right-left,height:bottom-top});}
await img.resize(768,768,{fit:'contain',background:'#fffaf0'}).webp({quality:89}).toFile(out);records.push({...a,source:a.source||direct?.source||sheet.source,...(!a.source&&!direct?{atlasPrompt:sheet.prompt,cell:a.wordId}:{})});
}fs.writeFileSync(path.join(work,'prepared.json'),JSON.stringify(records,null,2));console.log(`Đã chuẩn bị ${records.length}/80 ảnh.`);})().catch(e=>{console.error(e);process.exitCode=1;});
