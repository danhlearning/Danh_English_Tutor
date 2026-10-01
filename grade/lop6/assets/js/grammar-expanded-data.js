/* 1.620 biến thể câu hỏi theo 12 Unit; mỗi Unit 15 tình huống × 9 dạng luyện. */
(() => {
  'use strict';
  const bank = window.DanhGrade6Grammar;
  const C = (prompt, options, answer, explain) => ({ type: 'choice', prompt, options, answer, explain });
  const F = (prompt, answer, explain) => ({ type: 'fill', prompt, answer, explain });
  const R = (parts, answer, explain) => ({ type: 'order', prompt: 'Sắp xếp các mảnh thành câu đúng.', parts, answer, explain });
  const E = (prompt, answer, explain) => ({ type: 'correct', prompt, answer, explain });
  const put = (unit, rows, make) => {
    const reference = bank.find(question => question.unit === unit);
    rows.forEach((row, rowIndex) => {
      const groups = make(row, rowIndex);
      ['easy', 'medium', 'hard'].forEach(level => {
        groups[level].forEach((question, index) => bank.push({
          ...question, id: `u${unit}-${level}-expanded-${rowIndex + 1}-${index + 1}`,
          unit, level, topic: reference.topic, rule: reference.rule, vocab: row.vocab
        }));
      });
    });
  };
  const context = (values, keys) => values.map(value => Object.fromEntries(keys.map((key, index) => [key, value[index]])));

  // Unit 1 · Present simple; adverbs of frequency
  put(1, context([
    ['Lan','study','studies','English','every Monday','usually','English = môn Tiếng Anh'],
    ['Nam','play','plays','football','after school','often','football = bóng đá'],
    ['Mai','do','does','her homework','in the evening','always','homework = bài tập về nhà'],
    ['Minh','have','has','breakfast','at 7 a.m.','usually','breakfast = bữa sáng'],
    ['Hoa','read','reads','books in the library','on Fridays','often','library = thư viện'],
    ['Phong','wear','wears','his school uniform','on Mondays','always','uniform = đồng phục'],
    ['Linh','walk','walks','to school','in the morning','sometimes','school = trường học'],
    ['Khoa','watch','watches','educational programmes','at weekends','often','programme = chương trình'],
    ['Trang','go','goes','to the music club','on Tuesdays','usually','music club = câu lạc bộ âm nhạc'],
    ['Huy','help','helps','his classmates','after class','always','classmates = bạn cùng lớp'],
    ['Vy','write','writes','new words in a notebook','every evening','often','notebook = vở ghi'],
    ['Duy','clean','cleans','the classroom','on Fridays','usually','classroom = phòng học'],
    ['Nhi','take','takes','the school bus','every morning','sometimes','school bus = xe buýt trường học'],
    ['Binh','finish','finishes','his homework','before dinner','always','dinner = bữa tối'],
    ['An','visit','visits','the school library','on Wednesdays','rarely','library = thư viện']
  ], ['s','base','third','object','time','frequency','vocab']), r => ({
    easy: [
      C(`${r.s} ___ ${r.object} ${r.time}.`, [r.third, r.base, `is ${r.base}`], r.third, `${r.s} là ngôi thứ ba số ít, dùng ${r.third}.`),
      F(`${r.s} ___ (${r.base}) ${r.object} ${r.time}.`, r.third, `Hiện tại đơn: ${r.s} + ${r.third}.`),
      C(`Chọn câu đúng nói về thói quen của ${r.s}.`, [`${r.s} ${r.third} ${r.object}.`, `${r.s} ${r.base} ${r.object}.`, `${r.s} does ${r.third} ${r.object}.`], `${r.s} ${r.third} ${r.object}.`, `Động từ theo chủ ngữ số ít là ${r.third}.`)
    ],
    medium: [
      C(`${r.s} ___ ${r.base} ${r.object} on Sundays.`, ["doesn't", "don't", "isn't"], "doesn't", `Phủ định với ${r.s}: doesn't + ${r.base}.`),
      F(`___ ${r.s} ${r.base} ${r.object} ${r.time}?`, 'Does', 'Câu hỏi hiện tại đơn với ngôi thứ ba số ít bắt đầu bằng Does.'),
      R([r.s, r.frequency, r.third, r.object, `${r.time}.`], `${r.s} ${r.frequency} ${r.third} ${r.object} ${r.time}.`, `${r.frequency} đứng trước động từ thường ${r.third}.`)
    ],
    hard: [
      C(`How often ___ ${r.s} ${r.base} ${r.object}?`, ['does','do','is'], 'does', `How often does ${r.s} + ${r.base}...?`),
      E(`${r.s} ${r.frequency} ${r.base} ${r.object}.`, `${r.s} ${r.frequency} ${r.third} ${r.object}.`, `Sau chủ ngữ ${r.s}, động từ đổi thành ${r.third}.`),
      F(`${r.s} ${r.frequency} ___ (${r.base}) ${r.object}.`, r.third, `Trạng từ ${r.frequency} không làm mất đuôi ngôi thứ ba: ${r.third}.`)
    ]
  }));

  // Unit 2 · Possessive case; prepositions of place
  put(2, context([
    ['Lan','book','the desk','on','ở trên','book = quyển sách'],
    ['Nam','schoolbag','the chair','under','ở dưới','schoolbag = cặp sách'],
    ['Mai','lamp','the bed','next to','ở bên cạnh','lamp = đèn bàn'],
    ['Minh','notebook','the drawer','in','ở trong','drawer = ngăn kéo'],
    ['Hoa','picture','the sofa','above','ở phía trên','picture = bức tranh'],
    ['Phong','ball','the door','behind','ở phía sau','ball = quả bóng'],
    ['Linh','pencil case','the books','between','ở giữa (hai vật)','pencil case = hộp bút'],
    ['Khoa','coat','the wardrobe','in','ở trong','wardrobe = tủ quần áo'],
    ['Trang','ruler','the notebook','on','ở trên','ruler = thước kẻ'],
    ['Huy','clock','the window','beside','ở cạnh','clock = đồng hồ'],
    ['Vy','toy','the bed','under','ở dưới','toy = đồ chơi'],
    ['Duy','computer','the bookshelf','next to','ở bên cạnh','computer = máy tính'],
    ['Nhi','mirror','the door','behind','ở phía sau','mirror = gương'],
    ['Binh','jacket','the wardrobe','in','ở trong','jacket = áo khoác'],
    ['An','dictionary','the exercise books','between','ở giữa (hai vật)','dictionary = từ điển']
  ], ['owner','item','place','prep','vi','vocab']), r => {
    const possessive = `${r.owner}'s`;
    const place = r.prep === 'between' ? `${r.place} and the lamp` : r.place;
    return {
      easy: [
        C(`This is ___ ${r.item}. (${r.owner})`, [possessive,r.owner,`${r.owner}s`], possessive, `Sở hữu cách: ${r.owner} + 's.`),
        F(`This is ___ ${r.item}. (của ${r.owner})`, possessive, `Dùng ${possessive} trước danh từ.`),
        C(`The ${r.item} is ___ ${place}. (${r.vi})`, [r.prep,'into','at'], r.prep, `${r.prep} diễn tả vị trí ${r.vi}.`)
      ],
      medium: [
        C(`Whose ${r.item} is this? — It is ___.`, [possessive,r.owner,`${r.owner}s`], possessive, `It is ${possessive} nghĩa là của ${r.owner}.`),
        F(`The ${r.item} is ___ ${place}. (${r.vi})`, r.prep, `Giới từ phù hợp là ${r.prep}.`),
        R([`The ${r.item}`,'is',r.prep,`${place}.`], `The ${r.item} is ${r.prep} ${place}.`, 'Vị trí: chủ ngữ + is + giới từ + nơi chốn.')
      ],
      hard: [
        E(`This is ${r.owner} ${r.item}.`, `This is ${possessive} ${r.item}.`, `Tên người sở hữu cần thêm 's.`),
        C(`Chọn câu đúng về vị trí của ${r.item}.`, [`The ${r.item} is ${r.prep} ${place}.`, `The ${r.item} are ${r.prep} ${place}.`, `The ${r.item} is ${place} ${r.prep}.`], `The ${r.item} is ${r.prep} ${place}.`, 'Danh từ số ít đi với is; giới từ đứng trước nơi chốn.'),
        F(`___ ${r.item} is ${r.prep} ${place}. (của ${r.owner})`, possessive, `Sở hữu cách của ${r.owner} là ${possessive}.`)
      ]
    };
  });

  // Unit 3 · Present continuous and contrast with routines
  put(3, context([
    ['Lan','read','reading','reads','a storybook','storybook = sách truyện'],
    ['Nam','play','playing','plays','football','football = bóng đá'],
    ['Mai','write','writing','writes','an email','email = thư điện tử'],
    ['Minh','draw','drawing','draws','a picture','picture = bức tranh'],
    ['Hoa','make','making','makes','a sandwich','sandwich = bánh mì kẹp'],
    ['Phong','listen to','listening to','listens to','music','music = âm nhạc'],
    ['Linh','do','doing','does','her homework','homework = bài tập về nhà'],
    ['Khoa','watch','watching','watches','a cartoon','cartoon = phim hoạt hình'],
    ['Trang','take','taking','takes','photos','photos = ảnh chụp'],
    ['Huy','study','studying','studies','English','English = môn Tiếng Anh'],
    ['Vy','cook','cooking','cooks','dinner','dinner = bữa tối'],
    ['Duy','clean','cleaning','cleans','the classroom','classroom = phòng học'],
    ['Nhi','talk to','talking to','talks to','a friend','friend = người bạn'],
    ['Binh','practise','practising','practises','badminton','badminton = cầu lông'],
    ['An','paint','painting','paints','a poster','poster = áp phích']
  ], ['s','base','ing','third','object','vocab']), r => ({
    easy: [
      C(`Look! ${r.s} ___ ${r.object}.`, [`is ${r.ing}`,r.third,`are ${r.ing}`], `is ${r.ing}`, 'Look! chỉ việc đang diễn ra; chủ ngữ số ít dùng is + V-ing.'),
      F(`${r.s} ___ (${r.base}) ${r.object} now.`, `is ${r.ing}`, `Hiện tại tiếp diễn: is ${r.ing}.`),
      C(`${r.s} is ___ ${r.object} at the moment.`, [r.ing,r.base,r.third], r.ing, `Sau is cần dạng -ing: ${r.ing}.`)
    ],
    medium: [
      C(`${r.s} ___ ${r.ing} ${r.object} right now.`, ['is','are','does'], 'is', `Chủ ngữ ${r.s} số ít dùng is.`),
      F(`___ ${r.s} ${r.ing} ${r.object} now?`, 'Is', 'Đảo is lên đầu câu hỏi hiện tại tiếp diễn.'),
      R([r.s,'is',r.ing,r.object,'now.'], `${r.s} is ${r.ing} ${r.object} now.`, 'Trật tự: chủ ngữ + is + V-ing + bổ ngữ.')
    ],
    hard: [
      C(`${r.s} often ${r.third} ${r.object}, and right now ${r.s} ___ it.`, [`is ${r.ing}`,r.third,r.base], `is ${r.ing}`, 'Often là thói quen; now diễn tả hành động hiện tại.'),
      E(`${r.s} are ${r.ing} ${r.object} now.`, `${r.s} is ${r.ing} ${r.object} now.`, `${r.s} là số ít nên dùng is.`),
      F(`${r.s} ___ (not ${r.base}) ${r.object} at the moment.`, `isn't ${r.ing}|is not ${r.ing}`, `Phủ định hiện tại tiếp diễn: is not ${r.ing}.`)
    ]
  }));

  // Unit 4 · Comparative adjectives
  put(4, context([
    ['This street','that street','wide','wider','more wide','street = con phố'],
    ['The park','the square','quiet','quieter','quietter','park = công viên'],
    ['The new market','the old market','modern','more modern','moderner','market = chợ'],
    ['This road','that road','busy','busier','busyier','road = con đường'],
    ['The village','the city','peaceful','more peaceful','peacefuler','village = ngôi làng'],
    ['The blue house','the yellow house','large','larger','largeer','house = ngôi nhà'],
    ['This café','that café','cheap','cheaper','more cheap','café = quán cà phê'],
    ['The museum','the cinema','interesting','more interesting','interestinger','museum = bảo tàng'],
    ['This bridge','that bridge','long','longer','more long','bridge = cây cầu'],
    ['The library','the school hall','small','smaller','more small','library = thư viện'],
    ['The new hotel','the old hotel','comfortable','more comfortable','comfortabler','hotel = khách sạn'],
    ['This bus stop','that bus stop','near','nearer','more near','bus stop = trạm xe buýt'],
    ['The river','the canal','deep','deeper','more deep','river = dòng sông'],
    ['The new station','the old station','beautiful','more beautiful','beautifuler','station = nhà ga'],
    ['This shop','that shop','clean','cleaner','more clean','shop = cửa hàng']
  ], ['a','b','adj','comp','wrong','vocab']), r => ({
    easy: [
      C(`${r.a} is ___ than ${r.b}.`, [r.comp,r.adj,r.wrong], r.comp, `Dạng so sánh hơn của ${r.adj} là ${r.comp}.`),
      F(`${r.a} is ___ (${r.adj}) than ${r.b}.`, r.comp, `Dùng ${r.comp} trước than.`),
      C(`Chọn cụm so sánh hơn đúng của “${r.adj}”.`, [r.comp,r.wrong,`the ${r.comp}`], r.comp, `So sánh hơn: ${r.comp}.`)
    ],
    medium: [
      C(`${r.a} looks ___ than ${r.b}.`, [r.comp,r.wrong,`the ${r.comp}`], r.comp, 'Trong so sánh hai đối tượng, dùng dạng so sánh hơn + than.'),
      F(`Compared with ${r.b}, ${r.a} is ___ (${r.adj}).`, r.comp, `So sánh hơn của ${r.adj}: ${r.comp}.`),
      R([r.a,'is',r.comp,'than',`${r.b}.`], `${r.a} is ${r.comp} than ${r.b}.`, 'Trật tự: A + is + tính từ so sánh hơn + than + B.')
    ],
    hard: [
      E(`${r.a} is ${r.wrong} than ${r.b}.`, `${r.a} is ${r.comp} than ${r.b}.`, `Dùng ${r.comp}, không dùng ${r.wrong}.`),
      C(`Chọn câu dùng dạng so sánh hơn đúng của “${r.adj}”.`, [`${r.a} is ${r.comp} than ${r.b}.`, `${r.a} is ${r.wrong} than ${r.b}.`, `${r.a} is ${r.adj} than ${r.b}.`], `${r.a} is ${r.comp} than ${r.b}.`, `Dạng đúng là ${r.comp} than.`),
      F(`Viết dạng so sánh hơn của “${r.adj}” để điền vào câu: ${r.a} is ___ than ${r.b}.`, r.comp, `Dạng cần viết là ${r.comp}.`)
    ]
  }));

  // Unit 5 · Countable nouns and must/mustn't
  put(5, context([
    ['the lake','island','islands','three','bring water','must','island = hòn đảo'],
    ['the forest','tree','trees','four','leave rubbish','must not','forest = rừng'],
    ['the valley','mountain','mountains','two','stay with the group','must','mountain = núi'],
    ['the beach','shell','shells','five','protect the animals','must','beach = bãi biển'],
    ['the national park','cave','caves','six','write on the rocks','must not','cave = hang động'],
    ['the river','boat','boats','three','wear a life jacket','must','river = dòng sông'],
    ['the campsite','tent','tents','four','light a fire here','must not','tent = lều'],
    ['the waterfall','visitor','visitors','seven','follow the path','must','waterfall = thác nước'],
    ['the island','bird','birds','eight','feed wild birds','must not','bird = chim'],
    ['the trail','sign','signs','five','read the signs','must','trail = đường mòn'],
    ['the desert','camel','camels','two','carry enough water','must','camel = lạc đà'],
    ['the bay','rock','rocks','six','throw plastic into the sea','must not','bay = vịnh'],
    ['the hill','flower','flowers','nine','pick rare flowers','must not','flower = bông hoa'],
    ['the park','bench','benches','three','keep the park clean','must','bench = ghế dài'],
    ['the coast','village','villages','four','ask before entering','must','coast = bờ biển']
  ], ['place','thing','plural','count','action','modal','vocab']), (r, rowIndex) => {
    const uncountable = ['water','sand','food','rain','luggage','information','rice','juice','sunshine','milk','bread','air','paper','tea','salt'][rowIndex];
    const shortModal = r.modal === 'must not' ? "mustn't" : 'must';
    const vi = r.modal === 'must' ? 'bắt buộc' : 'bị cấm';
    return {
      easy: [
        C(`There are ${r.count} ___ near ${r.place}.`, [r.plural,r.thing,`a ${r.thing}`], r.plural, `Sau ${r.count} dùng danh từ số nhiều ${r.plural}.`),
        F(`There are ${r.count} ___ (${r.thing}) near ${r.place}.`, r.plural, `Số nhiều của ${r.thing} là ${r.plural}.`),
        C(`Visitors ___ ${r.action} at ${r.place}. (${vi})`, [shortModal,shortModal === 'must' ? "mustn't" : 'must','are'], shortModal, `${shortModal} diễn tả quy tắc ${vi}.`)
      ],
      medium: [
        C(`How ___ ${r.plural} are near ${r.place}?`, ['many','much','a'], 'many', `${r.plural} là danh từ đếm được số nhiều.`),
        F(`At ${r.place}, visitors ___ ${r.action}. (${vi})`, `${shortModal}|${r.modal}`, `Quy tắc này dùng ${shortModal}.`),
        R(['Visitors',r.modal,r.action,`at ${r.place}.`], `Visitors ${r.modal} ${r.action} at ${r.place}.`, 'Sau must/must not dùng động từ nguyên mẫu.')
      ],
      hard: [
        E(`There are ${r.count} ${r.thing} near ${r.place}.`, `There are ${r.count} ${r.plural} near ${r.place}.`, `Sau số đếm dùng ${r.plural}.`),
        C(`Which notice is grammatically correct at ${r.place}?`, [`Visitors ${r.modal} ${r.action}.`, `Visitors ${r.modal} to ${r.action}.`, `Visitors ${r.modal} be ${r.action}.`], `Visitors ${r.modal} ${r.action}.`, 'Sau động từ khuyết thiếu không dùng to, động từ giữ nguyên mẫu.'),
        F(`How ___ ${uncountable} is there?`, 'much', `${uncountable} là danh từ không đếm được nên dùng how much.`)
      ]
    };
  });

  // Unit 6 · Should/shouldn't; some/any
  put(6, context([
    ['Children','visit their grandparents','flowers','at Tet','should','flowers = hoa'],
    ['Families','decorate their homes','gifts','before Tet','should','gifts = quà tặng'],
    ['Students','stay up all night','sweets','on New Year’s Eve','should not','sweets = kẹo'],
    ['Neighbours','wish each other well','cards','during Tet','should','cards = thiệp chúc mừng'],
    ['Children','fight over lucky money','cakes','at Tet','should not','lucky money = tiền mừng tuổi'],
    ['We','help clean the house','balloons','before Tet','should','balloons = bóng bay'],
    ['Visitors','throw rubbish on the street','fireworks','during the festival','should not','fireworks = pháo hoa'],
    ['Friends','send kind wishes','letters','at Tet','should','letters = lá thư'],
    ['Children','eat too many sweets','biscuits','at the party','should not','biscuits = bánh quy'],
    ['Families','share a meal','peaches','on the first day','should','peaches = quả đào'],
    ['We','forget our relatives','apricot blossoms','during Tet','should not','relatives = họ hàng'],
    ['Students','make New Year cards','red envelopes','before Tet','should','red envelopes = bao lì xì'],
    ['Children','play with fireworks','lanterns','during Tet','should not','lanterns = đèn lồng'],
    ['Families','prepare food together','bananas','for the celebration','should','bananas = chuối'],
    ['We','give warm wishes','decorations','on New Year’s Day','should','decorations = đồ trang trí']
  ], ['subject','action','things','time','modal','vocab']), r => {
    const shortModal = r.modal === 'should not' ? "shouldn't" : 'should';
    const vi = r.modal === 'should' ? 'nên' : 'không nên';
    return {
      easy: [
        C(`${r.subject} ___ ${r.action} ${r.time}. (${vi})`, [shortModal,shortModal === 'should' ? "shouldn't" : 'should','are'], shortModal, `Dùng ${shortModal} để khuyên ${vi}.`),
        F(`My advice: ${r.subject} ___ ${r.action} ${r.time}. (${vi})`, `${shortModal}|${r.modal}`, `Lời khuyên ${vi} dùng ${shortModal}.`),
        C(`We have ___ ${r.things} ${r.time}.`, ['some','any','much'], 'some', 'Câu khẳng định với danh từ số nhiều thường dùng some.')
      ],
      medium: [
        C(`Do you have ___ ${r.things} ${r.time}?`, ['any','some','much'], 'any', 'Câu hỏi thông thường dùng any.'),
        F(`We do not have ___ ${r.things} ${r.time}.`, 'any', 'Câu phủ định dùng any.'),
        R([r.subject,r.modal,r.action,`${r.time}.`], `${r.subject} ${r.modal} ${r.action} ${r.time}.`, 'Sau should/should not dùng động từ nguyên mẫu.')
      ],
      hard: [
        E(`We have any ${r.things} ${r.time}.`, `We have some ${r.things} ${r.time}.`, 'Câu khẳng định thông thường dùng some, không dùng any.'),
        C(`Choose the correct advice for ${r.subject.toLowerCase()}.`, [`${r.subject} ${r.modal} ${r.action}.`, `${r.subject} ${r.modal} to ${r.action}.`, `${r.subject} does ${r.modal} ${r.action}.`], `${r.subject} ${r.modal} ${r.action}.`, 'Sau should/should not là động từ nguyên mẫu, không có to.'),
        F(`Are there ___ ${r.things} ${r.time}?`, 'any', 'Câu hỏi với danh từ số nhiều thường dùng any.')
      ]
    };
  });

  // Unit 7 · Wh-questions and conjunctions
  put(7, context([
    ['Lan','cartoon','Saturday','VTV7','nature show','cartoon = phim hoạt hình'],
    ['Nam','sports programme','Sunday','VTV3','football match','sports programme = chương trình thể thao'],
    ['Mai','documentary','Monday','VTV2','music show','documentary = phim tài liệu'],
    ['Minh','news programme','Tuesday','VTV1','game show','news = bản tin'],
    ['Hoa','comedy','Wednesday','HTV7','cartoon','comedy = chương trình hài'],
    ['Phong','travel programme','Thursday','VTV7','documentary','travel programme = chương trình du lịch'],
    ['Linh','quiz show','Friday','VTV3','comedy','quiz show = chương trình đố vui'],
    ['Khoa','science programme','Saturday evening','VTV2','nature show','science = khoa học'],
    ['Trang','music show','Sunday evening','HTV7','cartoon','music show = chương trình âm nhạc'],
    ['Huy','weather forecast','Monday evening','VTV1','news programme','weather forecast = dự báo thời tiết'],
    ['Vy','nature show','Tuesday evening','VTV7','documentary','nature = thiên nhiên'],
    ['Duy','talent show','Wednesday evening','VTV3','music show','talent show = chương trình tài năng'],
    ['Nhi','children’s programme','Thursday evening','VTV7','cartoon','children = trẻ em'],
    ['Binh','film programme','Friday evening','HTV7','sports programme','film = phim'],
    ['An','cooking programme','Saturday morning','VTV2','travel programme','cooking = nấu ăn']
  ], ['person','show','time','channel','other','vocab']), r => ({
    easy: [
      C(`___ TV programme does ${r.person} like? — The ${r.show}.`, ['Which','Where','When'], 'Which', 'Which hỏi lựa chọn một chương trình.'),
      F(`___ does the ${r.show} air? — On ${r.time}.`, 'When', 'When hỏi về thời gian.'),
      C(`${r.person} likes the ${r.show} ___ the ${r.other}.`, ['and','but','so'], 'and', 'And nối hai chương trình cùng được yêu thích.')
    ],
    medium: [
      C(`${r.person} likes the ${r.show}, ___ a friend prefers the ${r.other}.`, ['but','and','so'], 'but', 'But nối hai ý trái ngược.'),
      F(`The ${r.show} is interesting, ___ ${r.person} watches it every week.`, 'so', 'So nối nguyên nhân với kết quả.'),
      R(['Which channel','shows',`the ${r.show}?`], `Which channel shows the ${r.show}?`, 'Which channel hỏi về kênh truyền hình cụ thể.')
    ],
    hard: [
      E(`Where does the ${r.show} air? — On ${r.time}.`, `When does the ${r.show} air? — On ${r.time}.`, 'Câu trả lời chỉ ngày/giờ nên hỏi When.'),
      C(`___ channel shows the ${r.show}? — ${r.channel}.`, ['Which','Why','When'], 'Which', 'Which hỏi kênh nào.'),
      F(`${r.person} likes the ${r.show}, ___ a friend does not.`, 'but', 'But diễn tả sự tương phản.')
    ]
  }));

  // Unit 8 · Past simple and imperatives
  put(8, context([
    ['Lan','play','played','badminton','yesterday','Run slowly.','badminton = cầu lông'],
    ['Nam','win','won','the match','last Sunday','Warm up first.','match = trận đấu'],
    ['Mai','visit','visited','the gym','last week','Bring your shoes.','gym = phòng tập'],
    ['Minh','watch','watched','a football game','last night','Stay behind the line.','football = bóng đá'],
    ['Hoa','go','went','to the stadium','yesterday morning','Follow the coach.','stadium = sân vận động'],
    ['Phong','do','did','some exercise','last weekend','Drink some water.','exercise = bài tập thể dục'],
    ['Linh','take','took','a swimming lesson','last Monday','Hold the rail.','swimming = bơi lội'],
    ['Khoa','buy','bought','a tennis racket','last month','Keep your racket safe.','racket = vợt'],
    ['Trang','join','joined','a sports club','last term','Listen to the rules.','sports club = câu lạc bộ thể thao'],
    ['Huy','run','ran','a short race','yesterday','Start at the whistle.','race = cuộc đua'],
    ['Vy','see','saw','the final match','last Saturday','Cheer for your team.','final match = trận chung kết'],
    ['Duy','ride','rode','his bike to the park','last Friday','Wear a helmet.','helmet = mũ bảo hiểm'],
    ['Nhi','make','made','a team poster','last weekend','Write your team name.','poster = áp phích'],
    ['Binh','have','had','a football lesson','last Tuesday','Pass the ball.','ball = quả bóng'],
    ['An','meet','met','the new coach','yesterday afternoon','Be polite.','coach = huấn luyện viên']
  ], ['s','base','past','object','time','command','vocab']), r => ({
    easy: [
      C(`${r.s} ___ ${r.object} ${r.time}.`, [r.past,r.base,`is ${r.base}`], r.past, `${r.time} chỉ thời gian đã qua, dùng ${r.past}.`),
      F(`${r.s} ___ (${r.base}) ${r.object} ${r.time}.`, r.past, `Quá khứ của ${r.base} là ${r.past}.`),
      C(`Chọn câu mệnh lệnh đúng cho lời nhắc “${r.command}”`, [r.command,`To ${r.command.toLowerCase()}`,`Does ${r.command.toLowerCase()}`], r.command, 'Câu mệnh lệnh khẳng định bắt đầu bằng động từ nguyên mẫu.')
    ],
    medium: [
      C(`${r.s} ___ ${r.base} ${r.object} ${r.time}. (phủ định)`, ["didn't","doesn't","isn't"], "didn't", 'Phủ định quá khứ đơn: did not + động từ nguyên mẫu.'),
      F(`${r.s} ___ (${r.base}, phủ định) ${r.object} ${r.time}.`, `didn't ${r.base}|did not ${r.base}`, `Dùng didn't + ${r.base}.`),
      R(['Did',r.s,r.base,r.object,`${r.time}?`], `Did ${r.s} ${r.base} ${r.object} ${r.time}?`, 'Câu hỏi quá khứ đơn: Did + chủ ngữ + động từ nguyên mẫu?')
    ],
    hard: [
      E(`Did ${r.s} ${r.past} ${r.object} ${r.time}?`, `Did ${r.s} ${r.base} ${r.object} ${r.time}?`, `Sau Did dùng dạng nguyên mẫu ${r.base}.`),
      C(`___ ${r.s} ${r.base} ${r.object} ${r.time}?`, ['Did','Does','Is'], 'Did', 'Hỏi về quá khứ dùng Did.'),
      F(`Yesterday, ${r.s} ___ (${r.base}) ${r.object}.`, r.past, `Động từ quá khứ đúng là ${r.past}.`)
    ]
  }));

  // Unit 9 · Possessive adjectives and possessive pronouns
  put(9, context([
    ['I','my','mine','postcard','postcard = bưu thiếp'],
    ['you','your','yours','suitcase','suitcase = va li'],
    ['he','his','his','map','map = bản đồ'],
    ['she','her','hers','camera','camera = máy ảnh'],
    ['we','our','ours','guidebook','guidebook = sách hướng dẫn'],
    ['they','their','theirs','hotel room','hotel room = phòng khách sạn'],
    ['I','my','mine','ticket','ticket = vé'],
    ['you','your','yours','travel bag','travel bag = túi du lịch'],
    ['he','his','his','city photo','photo = bức ảnh'],
    ['she','her','hers','passport','passport = hộ chiếu'],
    ['we','our','ours','travel plan','travel plan = kế hoạch du lịch'],
    ['they','their','theirs','train ticket','train ticket = vé tàu'],
    ['I','my','mine','dictionary','dictionary = từ điển'],
    ['she','her','hers','blue umbrella','umbrella = ô, dù'],
    ['we','our','ours','holiday album','album = tập ảnh']
  ], ['owner','adjective','pronoun','noun','vocab']), r => {
    const other = r.pronoun === 'mine' ? 'ours' : 'mine';
    const objectOwner = ({ I: 'me', you: 'you', he: 'him', she: 'her', we: 'us', they: 'them' })[r.owner];
    const vietnameseOwner = ({ I: 'tôi', you: 'bạn', he: 'anh ấy', she: 'cô ấy', we: 'chúng tôi', they: 'họ' })[r.owner];
    const wrongStandalone = r.adjective === r.pronoun ? r.owner : r.adjective;
    const wrongBeforeNoun = r.adjective === r.pronoun ? other : r.pronoun;
    return {
      easy: [
        C(`This is ___ ${r.noun}. (của ${vietnameseOwner})`, [r.adjective,wrongBeforeNoun,r.owner], r.adjective, `Trước danh từ ${r.noun} cần tính từ sở hữu ${r.adjective}.`),
        F(`___ ${r.noun} is on the table. (của ${vietnameseOwner})`, r.adjective, `Tính từ sở hữu đứng trước danh từ: ${r.adjective}.`),
        C(`This ${r.noun} belongs to ${objectOwner}. It is ___.`, [r.pronoun,wrongBeforeNoun,r.owner], r.pronoun, `Không có danh từ theo sau thì dùng đại từ sở hữu ${r.pronoun}.`)
      ],
      medium: [
        C(`The ${r.noun} is ___. (của ${vietnameseOwner})`, [r.pronoun,wrongStandalone,other], r.pronoun, `${r.pronoun} đứng độc lập sau is.`),
        F(`That ${r.noun} is ___. (của ${vietnameseOwner})`, r.pronoun, `Dùng đại từ sở hữu ${r.pronoun}.`),
        R([`The ${r.noun}`,'is',`${r.pronoun}.`], `The ${r.noun} is ${r.pronoun}.`, 'Đại từ sở hữu đứng độc lập sau động từ be.')
      ],
      hard: [
        E(`This ${r.noun} is ${wrongStandalone}.`, `This ${r.noun} is ${r.pronoun}.`, `Sau is không còn danh từ, dùng ${r.pronoun}.`),
        C(`The ${r.noun} belongs to ${objectOwner}. Which sentence is correct?`, [`It is ${r.pronoun}.`,`It is ${wrongStandalone}.`,`It is ${r.owner === wrongStandalone ? other : r.owner}.`], `It is ${r.pronoun}.`, 'Đại từ sở hữu thay cho cả cụm tính từ sở hữu + danh từ.'),
        F(`This ${r.noun} is not ${other}; it is ___. (của ${vietnameseOwner})`, r.pronoun, `Đại từ sở hữu cần điền: ${r.pronoun}.`)
      ]
    };
  });

  // Unit 10 · Future simple and might
  put(10, context([
    ['Lan','live','in a smart house','one day','smart house = ngôi nhà thông minh'],
    ['Nam','use','a home robot','next year','home robot = người máy trong nhà'],
    ['Mai','build','a house by the sea','in the future','by the sea = bên bờ biển'],
    ['Minh','have','a garden on the roof','one day','roof = mái nhà'],
    ['Hoa','install','solar panels','next year','solar panels = tấm pin mặt trời'],
    ['Phong','design','a floating house','in the future','floating house = nhà nổi'],
    ['Linh','buy','a smart fridge','one day','smart fridge = tủ lạnh thông minh'],
    ['Khoa','grow','vegetables on the balcony','next summer','balcony = ban công'],
    ['Trang','use','a wireless speaker','next year','wireless = không dây'],
    ['Huy','put','a robot in the kitchen','in the future','kitchen = nhà bếp'],
    ['Vy','build','a small house in the mountains','one day','mountains = núi'],
    ['Duy','have','a solar-powered car','next year','solar-powered = dùng năng lượng mặt trời'],
    ['Nhi','make','her bedroom smarter','in the future','bedroom = phòng ngủ'],
    ['Binh','use','a robot to clean the floor','one day','floor = sàn nhà'],
    ['An','create','a house with a sky garden','in the future','sky garden = vườn trên cao']
  ], ['s','base','object','time','vocab']), r => ({
    easy: [
      C(`${r.s} ___ ${r.base} ${r.object} ${r.time}.`, ['will','did','was'], 'will', 'Tương lai đơn: will + động từ nguyên mẫu.'),
      F(`${r.s} ___ (${r.base}) ${r.object} ${r.time}.`, `will ${r.base}`, `Dùng will ${r.base}.`),
      C(`Chọn cụm diễn tả tương lai đúng cho ${r.s}.`, [`will ${r.base}`,`will to ${r.base}`,`will ${r.base}s`], `will ${r.base}`, 'Sau will dùng động từ nguyên mẫu, không có to.')
    ],
    medium: [
      C(`${r.s} ___ ${r.base} ${r.object}; nobody is sure.`, ['might','must','did'], 'might', 'Might diễn tả khả năng chưa chắc chắn.'),
      F(`${r.s} ___ (${r.base}) ${r.object}. (có thể, chưa chắc)`, `might ${r.base}`, `Might + động từ nguyên mẫu ${r.base}.`),
      R([r.s,'will',r.base,r.object,`${r.time}.`], `${r.s} will ${r.base} ${r.object} ${r.time}.`, 'Trật tự tương lai đơn: chủ ngữ + will + động từ.')
    ],
    hard: [
      E(`${r.s} will to ${r.base} ${r.object} ${r.time}.`, `${r.s} will ${r.base} ${r.object} ${r.time}.`, 'Sau will không dùng to.'),
      C(`${r.s} ___ ${r.base} ${r.object}; perhaps it will happen.`, ['might','did','must'], 'might', 'Perhaps chỉ khả năng chưa chắc chắn, dùng might.'),
      F(`${r.s} ___ (not ${r.base}) ${r.object} ${r.time}.`, `won't ${r.base}|will not ${r.base}`, 'Phủ định tương lai đơn: will not/won’t + động từ nguyên mẫu.')
    ]
  }));

  // Unit 11 · Articles and the first conditional
  put(11, context([
    ['reusable bag','a','Lan','use','uses','a reusable bag','reduce plastic waste','bag = cái túi'],
    ['old bottle','an','Nam','recycle','recycles','old bottles','save materials','bottle = chai'],
    ['paper box','a','Mai','reuse','reuses','a paper box','make less rubbish','box = cái hộp'],
    ['empty can','an','Minh','collect','collects','empty cans','keep the park clean','can = lon'],
    ['electric bike','an','Hoa','ride','rides','an electric bike','make less pollution','electric bike = xe đạp điện'],
    ['green plant','a','Phong','plant','plants','a green plant','make the room fresher','plant = cây'],
    ['orange bin','an','Linh','sort','sorts','rubbish into bins','recycle more easily','bin = thùng rác'],
    ['solar lamp','a','Khoa','use','uses','a solar lamp','save electricity','solar lamp = đèn năng lượng mặt trời'],
    ['old envelope','an','Trang','reuse','reuses','old envelopes','save paper','envelope = phong bì'],
    ['cloth bag','a','Huy','carry','carries','a cloth bag','use fewer plastic bags','cloth bag = túi vải'],
    ['empty jar','an','Vy','clean','cleans','empty jars','reuse them at home','jar = lọ'],
    ['small tree','a','Duy','plant','plants','small trees','give the street more shade','tree = cây'],
    ['eco-friendly bottle','an','Nhi','choose','chooses','eco-friendly bottles','reduce plastic waste','eco-friendly = thân thiện môi trường'],
    ['recycled notebook','a','Binh','buy','buys','recycled notebooks','save paper','notebook = vở ghi'],
    ['old newspaper','an','An','collect','collects','old newspapers','recycle more paper','newspaper = báo']
  ], ['noun','article','s','base','third','object','result','vocab']), r => ({
    easy: [
      C(`This is ___ ${r.noun}.`, [r.article,r.article === 'a' ? 'an' : 'a','some'], r.article, `Chọn ${r.article} theo âm đầu của ${r.noun}.`),
      F(`We found ___ ${r.noun}. (a/an)`, r.article, `Mạo từ đúng là ${r.article}.`),
      C(`If ${r.s} ${r.third} ${r.object}, ${r.s} ___ ${r.result}.`, ['will','did','is'], 'will', 'Mệnh đề kết quả điều kiện loại 1 dùng will.')
    ],
    medium: [
      C(`If ${r.s} ___ ${r.object}, ${r.s} will ${r.result}.`, [r.third,r.base,`will ${r.base}`], r.third, 'Sau if dùng hiện tại đơn; chủ ngữ số ít thêm -s/-es.'),
      F(`If ${r.s} ${r.third} ${r.object}, ${r.s} ___ ${r.result}.`, 'will', 'Mệnh đề chính dùng will + động từ nguyên mẫu.'),
      R(['If',r.s,r.third,`${r.object},`,r.s,'will',`${r.result}.`], `If ${r.s} ${r.third} ${r.object}, ${r.s} will ${r.result}.`, 'Điều kiện loại 1: If + hiện tại đơn, will + động từ.')
    ],
    hard: [
      E(`If ${r.s} will ${r.base} ${r.object}, ${r.s} will ${r.result}.`, `If ${r.s} ${r.third} ${r.object}, ${r.s} will ${r.result}.`, 'Mệnh đề if dùng hiện tại đơn, không dùng will.'),
      C(`Which first conditional is correct about ${r.s}?`, [`If ${r.s} ${r.third} ${r.object}, ${r.s} will ${r.result}.`,`If ${r.s} will ${r.base} ${r.object}, ${r.s} will ${r.result}.`,`If ${r.s} ${r.base} ${r.object}, ${r.s} will ${r.result}.`], `If ${r.s} ${r.third} ${r.object}, ${r.s} will ${r.result}.`, 'Sau if là hiện tại đơn với ngôi thứ ba số ít.'),
      F(`If ${r.s} ___ (${r.base}) ${r.object}, ${r.s} will ${r.result}.`, r.third, `Sau if dùng ${r.third}, không dùng will.`)
    ]
  }));

  // Unit 12 · Superlative adjectives (short forms)
  put(12, context([
    ['robot A','small','smallest','more small','in the shop','small = nhỏ'],
    ['robot B','tall','tallest','more tall','in the class','tall = cao'],
    ['robot C','fast','fastest','more fast','in the show','fast = nhanh'],
    ['robot D','strong','strongest','most strong','in the team','strong = khỏe'],
    ['robot E','smart','smartest','most smart','in the exhibition','smart = thông minh'],
    ['robot F','light','lightest','most light','in the lab','light = nhẹ'],
    ['robot G','heavy','heaviest','heavyest','in the shop','heavy = nặng'],
    ['robot H','big','biggest','bigest','in the show','big = lớn'],
    ['robot I','hot','hottest','hotest','after the race','hot = nóng'],
    ['robot J','quiet','quietest','quiettest','in the library','quiet = yên tĩnh'],
    ['robot K','nice','nicest','niceest','in the collection','nice = đẹp'],
    ['robot L','safe','safest','safeest','in the workshop','safe = an toàn'],
    ['robot M','clean','cleanest','most clean','in the house','clean = sạch'],
    ['robot N','young','youngest','most young','in the group','young = trẻ'],
    ['robot O','new','newest','most new','in the museum','new = mới']
  ], ['subject','adj','super','wrong','group','vocab']), r => ({
    easy: [
      C(`The guide says ${r.subject} is the ___ robot ${r.group}.`, [r.super,r.adj,r.wrong], r.super, `So sánh nhất của ${r.adj} là ${r.super}.`),
      F(`This is the ___ (${r.adj}) robot ${r.group}.`, r.super, `The ${r.super} là dạng so sánh nhất.`),
      C(`Chọn dạng so sánh nhất đúng của “${r.adj}”.`, [r.super,r.wrong,`${r.adj}er`], r.super, `Dạng đúng: ${r.super}.`)
    ],
    medium: [
      C(`Among all the robots, ${r.subject} is the ___.`, [r.super,r.wrong,`${r.adj}er`], r.super, 'Among all chỉ so sánh từ ba đối tượng trở lên.'),
      F(`${r.subject} is the ___ (${r.adj}) one ${r.group}.`, r.super, `Dùng the ${r.super}.`),
      R([r.subject,'is','the',r.super,`${r.group}.`], `${r.subject} is the ${r.super} ${r.group}.`, 'Trật tự: chủ ngữ + is + the + tính từ so sánh nhất.')
    ],
    hard: [
      E(`${r.subject} is the ${r.wrong} ${r.group}.`, `${r.subject} is the ${r.super} ${r.group}.`, `Dạng đúng của ${r.adj} là ${r.super}.`),
      C(`There are five robots. Which description of ${r.subject} uses the superlative correctly?`, [`${r.subject} is the ${r.super}.`,`${r.subject} is the ${r.wrong}.`,`${r.subject} is ${r.adj}er.`], `${r.subject} is the ${r.super}.`, 'So sánh nhất cần the + dạng -est.'),
      F(`Of all the robots ${r.group}, ${r.subject} is the ___ (${r.adj}).`, r.super, `Tính từ ${r.adj} đổi thành ${r.super}.`)
    ]
  }));
})();
