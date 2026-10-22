/* Nội dung luyện tập do Danh English Tutor biên soạn. */
(() => {
  'use strict';
  const bank = window.DanhGrade6Grammar;
  const pools = {
    1: ['did', 'are', 'am', 'was', 'always', 'never'],
    2: ['from', 'to', 'with', 'of', 'under', 'between'],
    3: ['am', 'was', 'be', 'did'],
    4: ['most', 'more', 'as'], 5: ['should', 'must to', 'much', 'any'],
    6: ['should to', 'must to', 'a', 'an'], 7: ['Who', 'How', 'or', 'because'],
    8: ['Have', 'Are', 'will', 'was'], 9: ['us', 'them', 'its', 'it'],
    10: ['will be', 'might to', 'will to', 'does'], 11: ['any', 'the', 'would', 'was'],
    12: ['more', 'most', 'as']
  };
  for (const q of bank.filter(q => q.type === 'choice')) {
    const candidates = [];
    const a = q.answer;
    if (a.includes(' / ')) candidates.push(a.replace('do /', 'does /').replace('visit', 'visiting'));
    if (/^[A-Z].*\s.*[.!?]$/.test(a)) {
      candidates.push(a.replace(/\bis\b/, 'be'), a.replace(/\bare\b/, 'is'), a.replace(/\b(will|must|should)\b/, '$1 to'));
      // A misplaced infinitive is a common error in sentence construction.
      const words = a.split(' '); words.splice(1, 0, 'to'); candidates.push(words.join(' '));
    } else if (/^(is|are|am) /.test(a)) candidates.push(a.replace(/^(is|are|am)/, 'be'), `does ${a.split(' ').slice(1).join(' ')}`);
    else if (/^will /.test(a)) candidates.push(a.replace('will ', 'will be '));
    else if (/^more /.test(a)) candidates.push(a.replace('more ', 'the most '));
    else if (/^most /.test(a)) candidates.push(a.replace('most ', 'more '));
    else if (/['’]s$/.test(a)) candidates.push(a.replace(/['’]s$/, "s'"));
    else if (/ing$/.test(a)) candidates.push(`to ${q.options.find(x => !/s$|ing$/.test(x)) || a}`);
    else if (/er$/.test(a)) candidates.push(`most ${q.options.find(x => !/er$|est$/.test(x)) || a}`);
    else if (/est$/.test(a)) candidates.push(`more ${a}`);
    else if (q.unit === 1 || q.unit === 8 || q.unit === 11) {
      const base = q.options.find(x => /^is /.test(x));
      if (base) candidates.push(`to ${base.slice(3)}`);
      else if (q.options.some(x => /ing$/.test(x))) candidates.push(`to ${q.options.find(x => !/s$|ing$|ed$/.test(x)) || a}`);
    }
    if (q.unit === 5 && /There are/.test(q.prompt)) candidates.push(`an ${q.options.find(x => !x.includes(' ') && x !== a) || a}`);
    q.options = [...new Set([...q.options, ...candidates, ...pools[q.unit]])].slice(0, 4);
  }

  const sounds = [
    [1, '/ɑː/ và /ʌ/', [['cl[a]ss','f[a]ther','[a]rm','c[u]p'], ['s[u]n','l[u]nch','r[u]n','c[a]r']], ['/ɑː/','/ʌ/']],
    [2, 'Âm cuối /s/ và /z/', [['book[s]','desk[s]','lamp[s]','room[s]'], ['bed[s]','chair[s]','table[s]','map[s]']], ['/s/','/z/']],
    [3, '/b/ và /p/', [['[b]ook','[b]ag','[b]oy','[p]en'], ['[p]ark','[p]en','[p]icture','[b]ed']], ['/b/','/p/']],
    [4, '/ɪ/ và /iː/', [['s[i]t','b[i]g','m[i]lk','s[ee]'], ['tr[ee]','m[ee]t','s[ee]','s[i]t']], ['/ɪ/','/iː/']],
    [5, '/t/ và /d/', [['[t]ent','[t]own','[t]ea','[d]esk'], ['[d]oor','[d]ay','[d]esk','[t]en']], ['/t/','/d/']],
    [6, '/s/ và /ʃ/', [['[s]un','[s]ea','[s]it','[sh]op'], ['[sh]e','[sh]op','[sh]ip','[s]ea']], ['/s/','/ʃ/']],
    [7, '/θ/ và /ð/', [['[th]ink','[th]ree','[th]ank','[th]is'], ['[th]ey','[th]at','[th]ose','[th]in']], ['/θ/','/ð/']],
    [8, '/e/ và /æ/', [['p[e]n','t[e]n','b[e]d','c[a]t'], ['b[a]g','m[a]p','h[a]t','d[e]sk']], ['/e/','/æ/']],
    [9, '/əʊ/ và /aʊ/', [['g[o]','n[o]','h[o]me','h[ou]se'], ['n[ow]','t[ow]n','br[ow]n','sn[ow]']], ['/əʊ/','/aʊ/']]
  ];
  for (const [unit, topic, groups, ipa] of sounds) {
    for (const level of ['easy']) groups.forEach((marked, index) => {
      const options = marked.map(x => x.replace(/[\[\]]/g, ''));
      bank.push({ id:`g6-sound-u${unit}-${level}-${index}`, unit, level, type:'pronunciation', topic,
        prompt:'Chọn từ có phần gạch chân phát âm khác ba từ còn lại.', options, marked,
        answer:options[3], rule:`Phân biệt ${topic}.`,
        explain:`Phần gạch chân trong ${options[3]} đọc là ${ipa[1-index]}; ba từ còn lại đọc là ${ipa[index]}.` });
    });
  }
  const stressGroups = [['robot','palace','motor','machine'], ['hotel','degree','machine','picture'], ['happy','funny','busy','enjoy']];
  for (const level of ['easy']) stressGroups.forEach((options,i) => bank.push({
    id:`g6-sound-u10-${level}-${i}`,unit:10,level,type:'pronunciation',topic:'Trọng âm từ hai âm tiết',
    prompt:'Chọn từ có trọng âm khác ba từ còn lại.',options,answer:options[3],
    rule:'Tìm âm tiết được nhấn trong từ hai âm tiết.',explain:`${options[3]} nhấn âm tiết ${i===1?'thứ nhất':'thứ hai'}; ba từ còn lại nhấn âm tiết ${i===1?'thứ hai':'thứ nhất'}.`
  }));
  for (const level of ['easy']) {
    bank.push({id:`g6-sound-u11-${level}`,unit:11,level,type:'pronunciation',topic:'Nhịp điệu câu',
      prompt:'Trong câu nói trung tính “We should recycle bottles.”, nhóm từ nào thường được nhấn để tạo nhịp?',
      options:['recycle · bottles','we · should','we · recycle','should · bottles'],answer:'recycle · bottles',
      rule:'Nhịp câu dựa vào từ mang nội dung: động từ chính, danh từ, tính từ.',explain:'Recycle và bottles mang nội dung chính; we và should thường đọc nhẹ trong câu trung tính.'});
    bank.push({id:`g6-sound-u12-${level}`,unit:12,level,type:'pronunciation',topic:'Ngữ điệu câu trần thuật',
      prompt:'Khi nói trung tính “My robot can cook meals.” để thông báo, giọng cuối câu thường như thế nào?',
      options:['Hạ giọng ↘','Lên giọng ↗','Lên rồi hạ ↗↘','Hạ rồi lên ↘↗'],answer:'Hạ giọng ↘',
      rule:'Câu trần thuật trung tính thường có ngữ điệu xuống.',explain:'Câu này thông báo một sự việc hoàn chỉnh nên thường hạ giọng ở cuối câu.'});
  }

  // Each set is one continuous story. Each part contains two sentences and two blanks.
  window.DanhGrade6Passages = [
    {id:'school-day',title:'A day at school',units:[1,3],parts:[
      ['I arrive (1) ___ school at seven. I carry my books (2) ___ my closed schoolbag.', ['at','in']],
      ['Our first lesson starts (3) ___ eight o’clock. We have English (4) ___ Monday.', ['at','on']],
      ['After class, I go (5) ___ the library. I read a book (6) ___ animals.', ['to','about']],
      ['I have lunch (7) ___ my classmates. We talk (8) ___ our school project.', ['with','about']],
      ['I go home (9) ___ bus. I do my homework (10) ___ the evening.', ['by','in']]
    ]},
    {id:'home',title:'Our new home',units:[2],parts:[
      ['My family lives (1) ___ a small house. There is a picture hanging (2) ___ the wall.', ['in','on']],
      ['My books are (3) ___ a closed box in my room. My pens are (4) ___ a zipped pencil case.', ['in','in']],
      ['I study (5) ___ seven o’clock every evening. My sister sits (6) ___ me so we can study together.', ['at','beside']],
      ['There is a bridge (7) ___ the river near our house. We walk across it (8) ___ Sunday.', ['over','on']],
      ['We have dinner (9) ___ six o’clock. Then we talk (10) ___ our day.', ['at','about']]
    ]},
    {id:'town',title:'A weekend in Green Town',units:[4,5,6],parts:[
      ['Green Town is (1) ___ the north of our country. We travel there (2) ___ train.', ['in','by']],
      ['We arrive (3) ___ Saturday morning. Our visit starts (4) ___ nine o’clock.', ['on','at']],
      ['We walk (5) ___ the bridge to reach the other side of the river. Then we go (6) ___ the town museum.', ['across','to']],
      ['We learn (7) ___ the town’s history. Later, we have lunch (8) ___ our friends.', ['about','with']],
      ['The weather is warm (9) ___ summer. We take a bus home (10) ___ the evening.', ['in','in']]
    ]},
    {id:'club',title:'Our green club',units:[7,8,9,10,11,12],parts:[
      ['Our club meets (1) ___ Sunday. We arrive (2) ___ school at eight.', ['on','at']],
      ['We talk (3) ___ a new recycling project. We work (4) ___ our teachers.', ['about','with']],
      ['We put old paper (5) ___ a box and close it. We write a label (6) ___ the lid.', ['in','on']],
      ['We take the paper (7) ___ a recycling centre. We get there (8) ___ bus.', ['to','by']],
      ['We go home (9) ___ noon. Our next meeting is (10) ___ October.', ['at','in']]
    ]}
  ];
  const preps = ['in','on','at','to','by','with','about','across','over','beside'];
  for (const passage of window.DanhGrade6Passages) {
    for (const unit of passage.units) for (const level of ['easy']) {
      passage.parts.forEach(([text,answers],part) => answers.forEach((answer,index) => bank.push({
        id:`g6-prep-${passage.id}-u${unit}-${level}-${part}-${index}`,unit,level,type:'preposition',topic:'Giới từ trong đoạn văn',
        passageId:passage.id,part,blank:part*2+index+1,passage:text,passageTitle:passage.title,
        prompt:`Chọn giới từ cho chỗ trống (${part*2+index+1}).`,options:[answer,...preps.filter(p=>p!==answer && !(answer === 'about' && p === 'on')).slice(0,3)],answer,
        rule:'Xem ngữ cảnh để chọn giới từ chỉ thời gian, nơi chốn, phương tiện hoặc quan hệ.',
        explain:text.replace(/\((\d+)\) ___/g, (_, number) => answers[(Number(number)-1)%2])
      })));
    }
  }
})();
