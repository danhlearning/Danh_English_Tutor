const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const {units}=require('./grade10-art-plan.cjs');const extra=require('./grade10-grammar-content.cjs');
const root=path.resolve(__dirname,'..'),dir='grade/lop10/assets/js/';
const read=f=>fs.readFileSync(path.join(root,f),'utf8'),write=(f,t)=>fs.writeFileSync(path.join(root,f),t);
const c={window:{}};vm.createContext(c);vm.runInContext(read(dir+'units-data.js'),c);vm.runInContext(read(dir+'grammar-data.js'),c);const old=c.window.DanhGrade10Grammar;
// Never rename old question/word IDs: existing evidence and unfinished rounds still resolve.
const bank=old.filter(q=>!q.id.includes('-extra-')&&!q.id.includes('-rewrite-')&&!q.id.includes('-sound-')&&!q.id.includes('-prep-'));
const expandedRules={
3:['Liên từ và động từ nguyên mẫu','Want/hope/would like + to V; make/let + tân ngữ + V không to. And nối ý bổ sung, but nối ý tương phản, or nối lựa chọn, so nối kết quả.'],
5:['Hiện tại hoàn thành và cách dùng phát minh','Hiện tại hoàn thành: have/has + quá khứ phân từ; since chỉ mốc, for chỉ khoảng thời gian. Be useful for + V-ing; use/be used + to V chỉ mục đích sử dụng.'],
8:['Mệnh đề quan hệ','Who thay cho người, which/that thay cho vật, whose chỉ sở hữu. Mệnh đề không xác định đặt giữa dấu phẩy dùng who/which, không dùng that.'],
9:['Câu tường thuật','Sau động từ tường thuật quá khứ: hiện tại đơn thường lùi về quá khứ đơn, hiện tại tiếp diễn thành quá khứ tiếp diễn, quá khứ đơn thành quá khứ hoàn thành; will thành would, can thành could. Should thường giữ nguyên; must chỉ nghĩa vụ có thể giữ nguyên khi nghĩa vụ vẫn còn.']
};
for(const q of bank){const r=expandedRules[q.unit];if(r){const oldRule=q.rule;q.topic=r[0];q.rule=r[1];q.explain=q.explain.replace(oldRule,r[1]);}}
for(const u of units){u.color=['#2563eb','#15803d','#be185d','#7c3aed'][u.number%4];u.words.forEach(w=>{delete w.scene;w.image=`./assets/images/pencil/${u.id}/${w.id}-v1.webp`;});
 const source=old.find(q=>q.unit===u.number);
 extra.extra[u.number-1].split('\n').forEach((l,index)=>{
  const [prompt,answer,...wrong]=l.split('|'),level=['easy','medium','hard'][Math.floor(index/2)],serial=index+1;
  const complete=prompt.replace('___',answer),explain=`${source.rule} Câu đúng: ${complete}`;
  const add=q=>bank.push({id:`g10-u${u.number}-extra-${serial}-${q.type}`,unit:u.number,level,topic:source.topic,rule:source.rule,...q});
  add({type:'choice',prompt,answer,options:[answer,...wrong],explain});
  add({type:'fill',prompt:`${prompt} (Chọn cách viết đúng: ${[answer,...wrong].join(' / ')}.)`,answer,explain});
  add({type:'order',prompt:'Sắp xếp các từ thành câu đúng.',parts:complete.split(' '),answer:complete,explain});
  add({type:'correct',prompt:`Sửa phần sai và viết lại cả câu: ${prompt.replace('___',wrong[0])}`,answer:complete,explain});
 });
 extra.rewrites[u.number-1].forEach(([sourceText,cue,answer],index)=>bank.push({id:`g10-u${u.number}-rewrite-${index}`,unit:u.number,level:['easy','medium','hard'][index],type:'rewrite',topic:source.topic,rule:source.rule+' '+(sourceText.match(/\(([^)]*)\)/)?.[1]||''),source:sourceText,prompt:'Viết lại câu theo yêu cầu, giữ nguyên nghĩa.',cue:cue+' ...',answer,explain:source.rule}));
 const [title,parts]=extra.passages[u.number-1];const passageId=`g10-passage-u${u.number}`;
 const preps=['in','on','at','to','by','for','with','from','of','into','about','onto','inside'];
 parts.forEach(([passage,answers],part)=>answers.forEach((answer,index)=>{
  const excluded={on:['in','along'],inside:['in','within'],with:['to'],about:['on','of'],onto:['on','to'],in:['inside','within'],at:['in','inside'],into:['in','to'],from:['at'],to:['with'],for:['about']}[answer]||[];
  const options=[answer,...preps.filter(p=>p!==answer&&!excluded.includes(p)).slice(0,3)];
  bank.push({id:`g10-u${u.number}-prep-${part}-${index}`,unit:u.number,level:'easy',type:'preposition',topic:'Giới từ trong đoạn văn',passageId,passageTitle:title,passage,part,blank:part*2+index+1,prompt:`Chọn giới từ cho chỗ trống (${part*2+index+1}).`,answer,options,rule:'Đọc ngữ cảnh và cụm từ để chọn giới từ phù hợp.',explain:passage.replace(/\((\d+)\) ___/g,(_,n)=>answers[(Number(n)-1)%2])});
 }));
}
const addSound=(unit,prompt,answer,options,explain,marked)=>bank.push({id:`g10-u${unit}-sound-${bank.filter(q=>q.unit===unit&&q.type==='pronunciation').length}`,unit,level:'easy',type:'pronunciation',topic:'Phát âm Anh–Anh',prompt,answer,options,explain,rule:explain,...(marked?{marked}:{})});
const blendGroups={1:[['[br]ing','[br]ush','[br]ave','[cr]ab'],['[cr]eam','[cr]owd','[cr]ab','[tr]ee'],['[tr]ain','[tr]ee','[tr]avel','[br]ush'],['[br]idge','[br]ave','[br]ick','[tr]ack']],2:[['[pl]an','[pl]ant','[pl]ate','[pr]ice'],['[pr]ize','[pr]int','[pr]ice','[pl]ay'],['[gl]ad','[gl]ass','[gl]obe','[gr]een'],['[gr]ow','[gr]ass','[gr]een','[gl]ow']]};
for(const [unit,groups] of Object.entries(blendGroups))groups.forEach(marked=>{const options=marked.map(s=>s.replace(/[\[\]]/g,''));const ipa=s=>s==='cr'?'kr':s;const odd=ipa(marked[3].match(/\[([^\]]+)\]/)[1]),same=ipa(marked[0].match(/\[([^\]]+)\]/)[1]);addSound(Number(unit),'Chọn từ có cụm phụ âm gạch chân khác ba từ còn lại.',options[3],options,`Ba từ có cụm phụ âm /${same}/; ${options[3]} có /${odd}/.`,marked);});
const stressOptions=['Âm tiết thứ nhất','Âm tiết thứ hai','Âm tiết thứ ba','Âm tiết thứ tư'];
const stress={3:[['music',1,'MU-sic'],['perform',2,'per-FORM'],['singer',1,'SING-er'],['invite',2,'in-VITE']],4:[['record (danh từ: bản ghi)',1,'RE-cord'],['record (động từ: ghi lại)',2,'re-CORD'],['present (danh từ: món quà)',1,'PRE-sent'],['present (động từ: trình bày)',2,'pre-SENT']],5:[['invention',2,'in-VEN-tion'],['computer',2,'com-PU-ter'],['holiday',1,'HOL-i-day'],['instrument',1,'IN-stru-ment']],6:[['important',2,'im-POR-tant'],['beautiful',1,'BEAU-ti-ful'],['expensive',2,'ex-PEN-sive'],['excellent',1,'EX-cel-lent']],7:[['organisation',4,'or-gan-i-SA-tion'],['international',3,'in-ter-NA-tion-al'],['education',3,'ed-u-CA-tion'],['development',2,'de-VEL-op-ment']]};
for(const [unit,rows] of Object.entries(stress))rows.forEach(([word,position,guide])=>addSound(Number(unit),`Trọng âm chính của “${word}” rơi vào âm tiết nào?`,stressOptions[position-1],stressOptions,`Trọng âm chính: ${guide}; phần viết hoa là âm tiết được nhấn.`));
const prosody={
8:[['Trong câu “I study ONLINE on Fridays.”, từ nào được nhấn để phân biệt với học trực tiếp?','online',['online','I','on','Fridays'],'Nhấn ONLINE khi đối chiếu học trực tuyến với học trực tiếp.'],['Trong câu “MAI shared the notes.”, người nói muốn nhấn mạnh thông tin nào?','Người chia sẻ',['Người chia sẻ','Thời gian','Địa điểm','Màu sắc'],'Nhấn MAI để làm rõ ai chia sẻ.'],['Từ nào thường được nhấn trong câu trung tính “They use digital lessons.”?','digital',['digital','they','the','a'],'Tính từ mang nội dung như digital thường được nhấn trong câu trung tính.'],['Trong câu “We need TWO tablets.”, phần nhấn trả lời câu hỏi nào?','Cần bao nhiêu?',['Cần bao nhiêu?','Ai cần?','Cần khi nào?','Cần ở đâu?'],'Nhấn TWO để làm rõ số lượng.']],
9:[['Trong câu trung tính “We MUST PROTECT the FOREST.”, nhóm nào gồm các từ mang trọng âm chính?','must, protect, forest',['must, protect, forest','we, the','we, the, forest','the, protect'],'Nhịp câu dựa trên các từ được nhấn; we và the thường đọc nhẹ trong ngữ cảnh này.'],['Trong câu trung tính, từ nào thường đọc nhẹ: “Save the trees.”?','the',['the','save','trees','cả ba từ nhấn ngang nhau'],'Mạo từ the thường được đọc nhẹ, còn save và trees mang nội dung chính.'],['Để nhấn rằng cần bảo vệ sông, không phải đường, nên nhấn từ nào trong “Protect the RIVER.”?','river',['river','the','cả câu nhấn đều','không từ nào'],'Nhấn RIVER để đối chiếu với đối tượng khác.'],['Đọc “We can RECYCLE it.” theo nhịp trung tính: từ nào mang nội dung chính?','recycle',['recycle','we','can','it'],'RECYCLE mang thông tin hành động chính; các từ còn lại thường đọc nhẹ hơn.']],
10:[['Với câu hỏi Yes/No trung tính “Is this the trail?”, cuối câu thường có ngữ điệu nào?','Đi lên',['Đi lên','Đi xuống','Không có ngữ điệu','Nhấn đều mọi từ'],'Câu hỏi Yes/No trung tính thường lên giọng ở cuối; ngữ điệu thực tế còn tùy ý định.'],['Với câu hỏi thông tin trung tính “Where is the trail?”, cuối câu thường có ngữ điệu nào?','Đi xuống',['Đi xuống','Luôn đi lên','Không có ngữ điệu','Nhấn đều mọi từ'],'Câu hỏi Wh- hỏi thông tin trung tính thường xuống giọng ở cuối.'],['Với lời khẳng định trung tính “We respect local customs.”, cuối câu thường như thế nào?','Đi xuống',['Đi xuống','Luôn đi lên','Không có trọng âm','Ngắt sau từng từ'],'Lời khẳng định hoàn chỉnh thường có ngữ điệu xuống.'],['Trong câu lựa chọn trung tính “Shall we walk or cycle?”, ngữ điệu ở lựa chọn cuối “cycle” thường ra sao?','Đi xuống',['Đi xuống','Luôn đi lên','Không phát âm','Nhấn đều mọi âm'],'Câu hỏi lựa chọn thường lên ở lựa chọn trước và xuống ở lựa chọn cuối.']]
};
for(const [unit,rows] of Object.entries(prosody))rows.forEach(([prompt,answer,options,explain])=>addSound(Number(unit),prompt,answer,options,explain));
write(dir+'units-data.js',`window.DanhGrade10Units=${JSON.stringify(units,null,2)};\n`);
write(dir+'grammar-data.js',`/* 390 mục ngữ pháp từ 90 ngữ cảnh và 30 câu viết lại; 40 mục phát âm; 10 đoạn văn / 100 chỗ trống. */\nwindow.DanhGrade10Grammar=${JSON.stringify(bank,null,2)};\nwindow.DanhGrade10GrammarHints=Object.fromEntries(window.DanhGrade10Units.map(u=>[u.number,Object.fromEntries(u.words.map(w=>[w.term,w.meaning]))]));\n`);
const images=Object.fromEntries(units.map(u=>[u.id,Object.fromEntries(u.words.map(w=>[w.id,w.image]))]));write(dir+'pencil-images-data.js',`window.DanhGrade10PencilImages=${JSON.stringify(images,null,2)};\n`);
console.log(`Lớp 10: ${units.length} Unit, ${units.flatMap(u=>u.words).length} từ, ${bank.length} mục luyện.`);
