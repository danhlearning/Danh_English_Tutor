/* Bài luyện riêng cho lớp 7, giữ nguyên ID của bộ ngữ pháp hiện có. */
(() => {
  'use strict';
  const bank=window.DanhGrade7Grammar;
  for(const q of bank){
    if(q.type==='choice'){
      const special={4:'than',5:'a lots of',6:'of',8:'Because of',12:'these'};
      const fourth=special[q.unit] || (q.answer==='It'?'Its':q.answer==='far'?'often':q.answer==='from'?'of':q.unit===11&&['mine','hers','ours','theirs','yours'].includes(q.answer)?`${q.answer}'`:`to ${q.answer}`);
      q.options=[...new Set([...q.options,fourth,q.unit===4?'like':`to ${q.answer}`])].slice(0,4);
    }
    if(q.type==='rewrite'){
      const old=q.cue;
      const prefix=old.match(/bắt đầu:\s*([^;]+)/i)?.[1].trim() || (old.includes('However')?`${q.answer.split('However')[0]}However,`:q.answer.split('|')[0].split(' ').slice(0,2).join(' '));
      q.cue=`${prefix} ...`;
      q.rule=`${q.rule} Yêu cầu: ${old}.`;
    }
  }
  const sounds=[
    [1,'/ə/ và /ɜː/',[['[a]bout','sof[a]','banan[a]','b[ir]d'],['w[or]d','n[ur]se','b[ir]d','teach[er]']],['/ə/','/ɜː/']],
    [2,'/f/ và /v/',[['[f]an','[f]ood','lea[f]','[v]an'],['[v]an','[v]isit','li[v]e','[f]an']],['/f/','/v/']],
    [3,'Âm cuối -ed',[['look[ed]','wash[ed]','help[ed]','want[ed]'],['play[ed]','clean[ed]','live[ed]','visit[ed]'],['want[ed]','need[ed]','visit[ed]','watch[ed]']],['/t/','/d/','/ɪd/']],
    [4,'/ʃ/ và /ʒ/',[['[sh]e','[sh]op','[sh]ip','vi[s]ion'],['mea[s]ure','vi[s]ion','plea[s]ure','[sh]op']],['/ʃ/','/ʒ/']],
    [5,'/ɒ/ và /ɔː/',[['h[o]t','sh[o]p','n[o]t','c[or]n'],['f[or]k','s[or]t','sp[or]t','p[o]t']],['/ɒ/','/ɔː/']],
    [6,'/tʃ/ và /dʒ/',[['[ch]air','[ch]ild','[ch]eese','[j]am'],['[j]uice','[j]ob','[j]am','[ch]eck']],['/tʃ/','/dʒ/']],
    [7,'/aɪ/ và /eɪ/',[['b[i]ke','l[i]ne','k[i]te','r[ai]n'],['d[ay]','tr[ai]n','r[ai]n','b[i]ke']],['/aɪ/','/eɪ/']],
    [8,'/ɪə/ và /eə/',[['h[ear]','n[ear]','y[ear]','b[ear]'],['h[air]','c[are]','sh[are]','n[ear]']],['/ɪə/','/eə/']]
  ];
  for(const [unit,topic,groups,ipa] of sounds)groups.forEach((marked,index)=>{
    const options=marked.map(word=>word.replace(/[\[\]]/g,''));
    const other=unit===3?(index===2?'/t/':'/ɪd/'):ipa[1-index];
    bank.push({id:`g7-sound-u${unit}-${index}`,unit,level:'easy',type:'pronunciation',topic,marked,options,answer:options[3],prompt:'Chọn từ có phần gạch chân phát âm khác ba từ còn lại.',rule:`Phân biệt ${topic} theo giọng Anh–Anh.`,explain:`Phần gạch chân của ${options[3]} đọc là ${other}; ba từ còn lại đọc là ${ipa[index]}.`});
  });
  for(const [unit,groups] of [[9,[['money','happy','teacher','enjoy'],['arrive','enjoy','hotel','picnic']]],[10,[['energy','popular','holiday','pollution'],['computer','banana','potato','animal']]]])groups.forEach((options,index)=>bank.push({id:`g7-sound-u${unit}-${index}`,unit,level:'easy',type:'pronunciation',topic:`Trọng âm từ ${unit===9?'hai':'ba'} âm tiết`,options,answer:options[3],prompt:'Chọn từ có trọng âm khác ba từ còn lại.',rule:'Xác định âm tiết được nhấn trong từ.',explain:`${options[3]} nhấn âm tiết ${index===0?'thứ hai':'thứ nhất'}; ba từ còn lại nhấn âm tiết ${index===0?'thứ nhất':'thứ hai'}.`}));
  bank.push({id:'g7-sound-u11-0',unit:11,level:'easy',type:'pronunciation',topic:'Trọng âm câu',prompt:'Trong câu trung tính “We will travel by electric bus.”, nhóm từ nào thường được nhấn?',options:['travel · electric · bus','we · will · by','we · by · bus','will · by · electric'],answer:'travel · electric · bus',rule:'Từ mang nội dung thường được nhấn; từ chức năng thường đọc nhẹ.',explain:'Travel, electric và bus mang nội dung chính của câu.'});
  for(const [index,sentence,answer] of [[0,'Do you like this city?','Lên giọng ↗'],[1,'Where do you live?','Hạ giọng ↘']])bank.push({id:`g7-sound-u12-${index}`,unit:12,level:'easy',type:'pronunciation',topic:'Ngữ điệu câu hỏi',prompt:`Khi hỏi trung tính “${sentence}”, giọng cuối câu thường như thế nào?`,options:['Lên giọng ↗','Hạ giọng ↘','Luôn giữ giọng ngang →','Luôn lên rồi hạ ↗↘'],answer,rule:'Câu hỏi Yes/No thường lên giọng; câu hỏi Wh thường hạ giọng trong ngữ cảnh trung tính.',explain:index===0?'Đây là câu hỏi Yes/No nên thường lên giọng.':'Đây là câu hỏi Wh nên thường hạ giọng.'});

  const passages=[
    {id:'hobby-club',title:'A hobby club afternoon',units:[1,2,3],parts:[
      ['Our hobby club meets (1) ___ Saturday. We arrive (2) ___ school at two o’clock.',['on','at']],
      ['We work (3) ___ our friends to make models. We keep small pieces (4) ___ closed boxes.',['with','in']],
      ['Lan writes a label (5) ___ the outside of each box. I read a book (6) ___ model ships.',['on','about']],
      ['We take a break (7) ___ three o’clock. We drink water and talk (8) ___ our next project.',['at','about']],
      ['We take the finished models (9) ___ the school hall. We go home (10) ___ bus.',['to','by']]
    ]},
    {id:'school-visit',title:'Our school visit',units:[4,5,6],parts:[
      ['Our class visits another school (1) ___ Monday. We travel there (2) ___ bus.',['on','by']],
      ['The welcome meeting starts (3) ___ nine o’clock. We learn (4) ___ the school’s history.',['at','about']],
      ['We go (5) ___ the music room after the meeting. A student plays a song (6) ___ the piano.',['to','on']],
      ['At noon, we have lunch (7) ___ the school canteen. We eat rice (8) ___ vegetables.',['in','with']],
      ['We put our notebooks (9) ___ our zipped bags. We return home (10) ___ the afternoon.',['in','in']]
    ]},
    {id:'festival-trip',title:'A trip to the film festival',units:[7,8,9],parts:[
      ['The film festival takes place (1) ___ July. Our family travels there (2) ___ train.',['in','by']],
      ['We arrive (3) ___ Friday morning. The first film starts (4) ___ ten o’clock.',['on','at']],
      ['We walk (5) ___ the bridge to reach the other side. Then we go (6) ___ the cinema.',['across','to']],
      ['We talk (7) ___ the film after watching it. We have lunch (8) ___ our cousins.',['about','with']],
      ['I keep our tickets (9) ___ a closed box at home. Our next visit will be (10) ___ August.',['in','in']]
    ]},
    {id:'green-travel',title:'Our green travel project',units:[10,11,12],parts:[
      ['Our project begins (1) ___ September. We meet (2) ___ school every Tuesday.',['in','at']],
      ['We learn (3) ___ electric buses. We discuss our ideas (4) ___ our science teacher.',['about','with']],
      ['We put our notes (5) ___ a closed folder. We write our names (6) ___ the outside of its cover.',['in','on']],
      ['We go (7) ___ the transport museum on Saturday. The visit starts (8) ___ nine o’clock.',['to','at']],
      ['We return home (9) ___ bus. We finish our report (10) ___ the evening.',['by','in']]
    ]}
  ];
  window.DanhGrade7Passages=passages;
  const alternatives={in:['to','of','with'],on:['in','of','to'],at:['on','of','with'],to:['of','for','about'],by:['at','of','about'],with:['to','of','about'],about:['with','to','across'],across:['of','with','about']};
  for(const passage of passages)for(const unit of passage.units)passage.parts.forEach(([text,answers],part)=>answers.forEach((answer,index)=>bank.push({id:`g7-prep-${passage.id}-u${unit}-${part}-${index}`,unit,level:'easy',type:'preposition',topic:'Giới từ trong đoạn văn',passageId:passage.id,part,blank:part*2+index+1,passage:text,passageTitle:passage.title,prompt:`Chọn giới từ cho chỗ trống (${part*2+index+1}).`,options:[answer,...alternatives[answer]],answer,rule:'Dựa vào ngữ cảnh để chọn giới từ thời gian, nơi chốn, phương tiện và quan hệ.',explain:text.replace(/\((\d+)\) ___/g,(_,number)=>answers[(Number(number)-1)%2])})));
})();
