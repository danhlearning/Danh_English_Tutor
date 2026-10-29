const fs=require('node:fs'),vm=require('node:vm');const rewrites=require('./secondary-template-rewrites.cjs');const {passages}=require('./grade10-grammar-content.cjs');
const pools=[
[['s[i]t','m[i]lk','b[i]g','s[ee]'],['tr[ee]','s[ee]','m[ee]t','s[i]t'],'ɪ','iː'],
[['p[e]n','t[e]n','b[e]d','c[a]t'],['b[a]g','c[a]t','m[a]p','p[e]n'],'e','æ'],
[['s[u]n','c[u]p','b[u]s','c[a]r'],['c[a]r','f[a]ther','[a]rm','s[u]n'],'ʌ','ɑː'],
[['[s]un','[s]ea','[s]it','[sh]ip'],['[sh]ip','[sh]op','[sh]e','[s]ea'],'s','ʃ'],
[['[th]ink','[th]ree','[th]in','[th]is'],['[th]is','[th]at','[th]ey','[th]ink'],'θ','ð'],
[['b[oo]k','l[oo]k','c[oo]k','f[oo]d'],['f[oo]d','m[oo]n','s[oo]n','b[oo]k'],'ʊ','uː'],
[['g[o]','h[o]me','n[o]','h[ou]se'],['h[ou]se','n[ow]','t[ow]n','sn[ow]'],'əʊ','aʊ'],
[['t[i]me','l[i]ke','b[i]ke','r[ai]n'],['r[ai]n','d[ay]','pl[ay]','t[i]me'],'aɪ','eɪ'],
[['[b]ook','[b]ed','[b]oy','[p]en'],['[p]en','[p]ark','[p]icture','[b]ed'],'b','p'],
[['[t]en','[t]ea','[t]own','[d]oor'],['[d]oor','[d]ay','[d]esk','[t]en'],'t','d'],
[['[f]an','[f]ood','[f]ive','[v]an'],['[v]an','[v]ery','[v]isit','[f]an'],'f','v'],
[['[k]ey','[c]at','[c]ook','[g]o'],['[g]o','[g]ame','[g]ive','[k]ey'],'k','ɡ']
];
const stress=[['music',1,'MU-sic'],['protect',2,'pro-TECT'],['teacher',1,'TEACH-er'],['enjoy',2,'en-JOY'],['computer',2,'com-PU-ter'],['holiday',1,'HOL-i-day'],['important',2,'im-POR-tant'],['beautiful',1,'BEAU-ti-ful'],['international',3,'in-ter-NA-tion-al'],['education',3,'ed-u-CA-tion'],['recycle',2,'re-CY-cle'],['volunteer',3,'vol-un-TEER']];
for(const g of [8,9,11,12]){
 const dir=`grade/lop${g}/assets/js/`,c={window:{}};vm.createContext(c);for(const f of ['units-data','grammar-data'])vm.runInContext(fs.readFileSync(dir+f+'.js','utf8'),c);const units=c.window[`DanhGrade${g}Units`],bank=[];
 if(rewrites[g])rewrites[g].split('\n\n').forEach((block,i)=>block.split('\n').forEach((line,li)=>{const [source,cue,...variants]=line.split('|');const answer=variants.join('|');const q=c.window[`DanhGrade${g}Grammar`].find(q=>q.unit===i+1);bank.push({id:`g${g}-complete-u${i+1}-rewrite-${li}`,unit:i+1,level:['easy','medium','hard'][li],type:'rewrite',topic:q.topic,rule:q.rule+' '+(source.match(/\(([^)]*)\)/)?.[1]||''),source,prompt:'Viết lại câu theo yêu cầu, giữ nguyên nghĩa.',cue:cue+' ...',answer,explain:q.rule});}));
 units.forEach((u,i)=>{
  const add=q=>bank.push({id:`g${g}-complete-u${u.number}-${q.type}-${bank.filter(t=>t.unit===u.number&&t.type===q.type).length}`,unit:u.number,level:'easy',...q});
  const [a,b,ipaA,ipaB]=pools[i];for(const [marked,same,odd] of [[a,ipaA,ipaB],[b,ipaB,ipaA]]){const options=marked.map(s=>s.replace(/[\[\]]/g,''));const explain=`Ba từ có âm /${same}/ ở phần gạch chân; ${options[3]} có âm /${odd}/.`;add({type:'pronunciation',topic:'Phân biệt âm Anh–Anh',prompt:'Chọn từ có phần gạch chân phát âm khác ba từ còn lại.',answer:options[3],options,marked,rule:explain,explain});}
  for(const [word,n,guide] of [stress[i],stress[(i+3)%stress.length]]){const options=['Âm tiết thứ nhất','Âm tiết thứ hai','Âm tiết thứ ba','Âm tiết thứ tư'];add({type:'pronunciation',topic:'Trọng âm từ',prompt:`Trọng âm chính của “${word}” ở âm tiết nào?`,answer:options[n-1],options,rule:`Trọng âm: ${guide}.`,explain:`Trọng âm: ${guide}; âm tiết viết hoa được nhấn.`});}
  const maps={8:[2,3,0,9,9,0,1,1,3,7,4,4],9:[3,1,0,9,9,0,8,9,7,8,4,5],11:[0,0,1,6,1,9,7,7,3,8],12:[0,9,1,1,5,4,7,8,5,7]};
  const [title,parts]=passages[maps[g][i]],preps=['in','on','at','to','by','for','with','from','of','into','about','onto','inside'];
  parts.forEach(([passage,answers],part)=>answers.forEach((answer,index)=>{const excluded={on:['in','along'],inside:['in','within'],with:['to'],about:['on','of'],onto:['on','to'],in:['inside','within'],at:['in','inside'],into:['in','to'],from:['at'],to:['with'],for:['about']}[answer]||[];add({type:'preposition',topic:'Giới từ trong đoạn văn',passageId:`g${g}-complete-u${u.number}`,passageTitle:title,passage,part,blank:part*2+index+1,prompt:`Chọn giới từ cho chỗ trống (${part*2+index+1}).`,answer,options:[answer,...preps.filter(p=>p!==answer&&!excluded.includes(p)).slice(0,3)],rule:'Đọc ngữ cảnh và cụm từ để chọn giới từ phù hợp.',explain:passage.replace(/\((\d+)\) ___/g,(_,n)=>answers[(Number(n)-1)%2])});}));
 });
 fs.writeFileSync(dir+'grammar-complete-data.js',`/* Nội dung bổ sung theo cấu trúc lớp 6; không đổi ID câu đang có. */\nwindow.DanhGrade${g}Grammar.push(...${JSON.stringify(bank,null,2)});\n`);
 const page=`grade/lop${g}/grammar.html`;let html=fs.readFileSync(page,'utf8');if(!html.includes('grammar-complete-data.js'))html=html.replace('  <script src="../../shared/learning-effects.js?v=loading-smooth-20261028','  <script src="./assets/js/grammar-complete-data.js?v=compact-listen-20261024"></script>\n  <script src="../../shared/learning-effects.js?v=loading-smooth-20261028');fs.writeFileSync(page,html);
 console.log(`Lớp ${g}: thêm ${bank.length} mục cho những dạng còn thiếu.`);
}
