const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,s)=>fs.writeFileSync(path.join(root,f),s);
const source="C:/Users/Admin/.codex/generated_images/01a167eb-828e-73d0-b75a-5eca4c77c5c4/exec-b29a42a7-8b2e-4254-82f7-8a0392899ab8.png";
const oldFile='grade/lop10/assets/images/pencil/unit7/2-v1.webp',file='grade/lop10/assets/images/pencil/unit7/2-v4.webp';
const hash=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
const review="Đã mở xem trực tiếp: hai người lính mặc quân phục xanh trơn, đội mũ cối xanh và đi dép cao su, đứng gác bên cột mốc trên đường biên núi rừng; một người quan sát bằng ống nhòm. Cờ đỏ có một sao vàng, không chữ trong ảnh, tay/người/ống nhòm và mặt đất hợp lý. Thay cảnh trao hàng cứu trợ theo yêu cầu trực tiếp của người dùng; giữ nghĩa peacekeeping là gìn giữ hòa bình.";
const prompt="Use case: illustration-story. Use attached image only as a reference for the two Vietnamese soldiers' faces, traditional olive-green uniforms, green Vietnamese pith helmets (mu coi) with all-around brim, chinstrap and small red front badge with one yellow star, national flag sleeve patches, and warm colored pencil art style. Replace the entire aid delivery situation with the owner's requested scene: the same two adult Vietnamese soldiers standing watch to protect their country's peaceful mountainous land border. Medium-wide full-body scene: one soldier holds binoculars correctly to his eyes with both hands while observing a distant mountain pass; the other stands upright attentively beside a single plain pale stone boundary marker on a safe grounded hillside path. Both wear plain olive-green long-sleeve military shirts with two chest pockets, matching olive trousers, simple dark belts and black rubber sandals. A small Vietnamese flag on a vertical pole nearby: red rectangle with exactly one centered yellow five-pointed star. Clear tranquil green forested mountains and winding frontier path, alert protective duty rather than combat. No mother, no children, no relief box, no village aid handover, no blue military clothing, no blue helmets, no blue vests, no camouflage, no armor, no foreign flags, no guns or violence. Boundary stone completely blank: no letters, numbers or writing. Do not depict an actual disputed border or identifiable geographic map. Natural anatomy, two coherent hands for each person, binoculars held naturally, realistic safe ground and flagpole. Single cohesive square image, colored pencil strokes on warm cream paper, no text or watermark anywhere.";
(async()=>{
 const previousSha256=JSON.parse(read('artifacts/uniform-audit/manifest.json')).assets.find(a=>a.file===oldFile).sha256;
 const bytes=await sharp(source).resize(768,768).webp({quality:90}).toBuffer();fs.writeFileSync(path.join(root,file),bytes);
 // Giữ URL cũ hoạt động, nhưng cả URL cũ cũng phải dùng tranh đã sửa.
 fs.writeFileSync(path.join(root,'grade/lop10/assets/images/pencil/unit7/2-v3.webp'),bytes);fs.writeFileSync(path.join(root,oldFile),bytes);fs.writeFileSync(path.join(root,'grade/lop10/assets/images/pencil/unit7/2-v2.webp'),bytes);const sha256=hash(bytes);
 const unitFile='grade/lop10/assets/js/units-data.js',c={window:{}};vm.runInNewContext(read(unitFile),c);
 c.window.DanhGrade10Units[6].words.find(w=>w.id===2).image='./assets/images/pencil/unit7/2-v4.webp';
 write(unitFile,`window.DanhGrade10Units = ${JSON.stringify(c.window.DanhGrade10Units,null,2)};\n`);
 write('grade/lop10/assets/js/pencil-images-data.js',`window.DanhGrade10PencilImages = ${JSON.stringify(Object.fromEntries(c.window.DanhGrade10Units.map(u=>[u.id,Object.fromEntries(u.words.map(w=>[w.id,w.image]))])),null,2)};\n`);
 for(const name of ['artifacts/grade10-pencil/prepared.json','artifacts/grade10-pencil/final-prompts.json']){
  const data=JSON.parse(read(name)),a=(Array.isArray(data)?data:data.assets).find(a=>a.key==='unit7-2');
  Object.assign(a,{file,sha256,source,previousFile:oldFile,previousSha256,repairPrompt:prompt,prompt,reviewedVisually:true,noReadableText:true,logicReviewedAt:'2026-10-23',logicReview:review});write(name,JSON.stringify(data,null,2)+'\n');
 }
 const auditName='docs/content/grade10-image-logic-review.json',audit=JSON.parse(read(auditName));
 Object.assign(audit.assets.find(a=>a.key==='unit7-2'),{file,sha256,issue:'Người dùng yêu cầu thay cảnh trao hàng bằng cảnh người lính canh giữ biên giới.',action:'repaired',review});
 audit.repairedImages=audit.assets.filter(a=>a.action==='repaired').length;audit.uniformReviewedAt='2026-10-23';write(auditName,JSON.stringify(audit,null,2)+'\n');
 const futurePlanName='artifacts/grade10-pencil/generation.json',futurePlan=JSON.parse(read(futurePlanName)),planned=futurePlan.assets.find(a=>a.key==='unit7-2');
 Object.assign(planned,{file,prompt,uniformUpdatedAt:'2026-10-23'});write(futurePlanName,JSON.stringify(futurePlan,null,2)+'\n');
 const atlasName='artifacts/grade10-pencil/atlas-plan.json',atlas=JSON.parse(read(atlasName));
 for(const a of atlas){if(a.unit===7)a.prompt=a.prompt.replace(/2\. [\s\S]*?(?=\n3\.)/,'2. '+require('./grade10-art-plan.cjs').units[6].words[1].scene);}
 write(atlasName,JSON.stringify(atlas,null,2)+'\n');
 const manifest=JSON.parse(read('artifacts/uniform-audit/manifest.json'));
 const candidates=[18,27,81,225,226,228,231,232,624,1157].map(index=>manifest.assets.find(a=>a.index===index));
 const record={date:'2026-10-23',mode:'built-in image_gen',scope:['grade','assets','shared','avatar.jpg'],filesScreened:manifest.files+1,uniqueImagesScreened:manifest.unique+1,contactSheetsReviewed:Array.from({length:20},(_,i)=>i),rootPortraitReviewed:true,militaryImagesFound:1,repairedImages:1,
  assets:[{key:'unit7-2',term:'peacekeeping',file,compatibilityFile:oldFile,sha256,previousSha256,source,prompt,reviewedVisually:true,noReadableText:true,review}],
  otherCandidates:candidates.filter(a=>a.index!==81).map(a=>({file:a.file,index:a.index,decision:'kept',reason:[624,1157].includes(a.index)?'Phi công hàng không dân dụng, không phải quân nhân.':'Nhân vật kiểm lâm/hướng dẫn người đi rừng; không đổi sang quân phục bộ đội.'})),
  limitations:'Rà kho tài nguyên ảnh website nội bộ; tệp ảnh tư liệu gốc ngoài repo và ảnh chụp kiểm thử cũ không phải tài nguyên giảng dạy.'};
 write('docs/content/vietnamese-uniform-image-review.json',JSON.stringify(record,null,2)+'\n');
 console.log('Đã tích hợp 1 tranh sửa; giữ URL tương thích và hồ sơ kiểm tra.');
})().catch(e=>{console.error(e);process.exitCode=1;});
