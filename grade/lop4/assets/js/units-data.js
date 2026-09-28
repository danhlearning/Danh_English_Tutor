/* Demo vocabulary follows the themes of Global Success 4 Units 1–2. All art and practice prompts are original. */
(() => {
  'use strict';
  const svg = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="22" fill="#f2f8fb"/>${body}</svg>`;
  const frame = inner => svg(`<rect x="14" y="30" width="92" height="62" rx="4" fill="#fff" stroke="#36516a" stroke-width="3"/>${inner}`);
  const stripes = (colors, y = 32, height = 58) => colors.map((color, index) => `<rect x="16" y="${y + index * height / colors.length}" width="88" height="${height / colors.length + .5}" fill="${color}"/>`).join('');
  const star = (x, y, fill = '#ffe978', scale = 1) => `<path d="M${x} ${y - 12 * scale}l${3.1 * scale} ${8.4 * scale}h${8.8 * scale}l${-7.2 * scale} ${5.2 * scale} ${2.8 * scale} ${8.4 * scale}L${x} ${y + 5.4 * scale}l${-7.5 * scale} ${5.6 * scale} ${2.8 * scale} ${-8.4 * scale}l${-7.2 * scale} ${-5.2 * scale}h${8.8 * scale}Z" fill="${fill}"/>`;
  const flags = {
    america: frame(stripes(Array.from({ length: 13 }, (_, i) => i % 2 ? '#fff' : '#cb4052')) + '<rect x="16" y="32" width="39" height="31" fill="#2d5184"/>' + [[25,39],[36,39],[47,39],[25,49],[36,49],[47,49],[25,58],[36,58],[47,58]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="1.5" fill="#fff"/>`).join('')),
    australia: frame('<rect x="16" y="32" width="88" height="58" fill="#173f82"/><rect x="16" y="32" width="42" height="28" fill="#fff"/><path d="M16 32 58 60M58 32 16 60" stroke="#d6404e" stroke-width="5"/><path d="M37 32v28M16 46h42" stroke="#fff" stroke-width="10"/><path d="M37 32v28M16 46h42" stroke="#d6404e" stroke-width="5"/>' + [[73,43],[88,55],[70,73],[94,77],[55,82]].map(([x,y]) => star(x,y,'#fff',.45)).join('')),
    britain: frame('<rect x="16" y="32" width="88" height="58" fill="#21447d"/><path d="M16 32 104 90M104 32 16 90" stroke="#fff" stroke-width="14"/><path d="M16 32 104 90M104 32 16 90" stroke="#d9444f" stroke-width="6"/><path d="M60 32v58M16 61h88" stroke="#fff" stroke-width="19"/><path d="M60 32v58M16 61h88" stroke="#d9444f" stroke-width="10"/>'),
    japan: frame('<circle cx="60" cy="61" r="19" fill="#c9434f"/>'),
    malaysia: frame(stripes(Array.from({ length: 14 }, (_, i) => i % 2 ? '#fff' : '#d34049')) + '<rect x="16" y="32" width="44" height="32" fill="#25478c"/><circle cx="35" cy="48" r="11" fill="#ffe276"/><circle cx="39" cy="45" r="9" fill="#25478c"/>' + star(50,48,'#ffe276',.52)),
    vietnam: frame('<rect x="16" y="32" width="88" height="58" fill="#d94343"/>' + star(60,62,'#ffe16f',1.75))
  };
  const clock = (time, night = false) => `<circle cx="91" cy="26" r="20" fill="${night ? '#2d4a83' : '#ffe39a'}"/><text x="91" y="32" text-anchor="middle" font-family="Arial,sans-serif" font-size="13" font-weight="bold" fill="${night ? '#fff' : '#604c2b'}">${time}</text>`;
  const person = '<circle cx="43" cy="54" r="11" fill="#f3be9d"/><path d="M32 49q11-18 22 0" fill="none" stroke="#614b43" stroke-width="5"/><path d="M28 92V76q14-18 30 0v16" fill="#6f9fd1" stroke="#36516a" stroke-width="3"/>';
  const plate = '<ellipse cx="61" cy="83" rx="36" ry="16" fill="#fff" stroke="#6685a1" stroke-width="4"/><ellipse cx="61" cy="83" rx="24" ry="9" fill="#f3cf86"/>';
  const routines = {
    getup: svg(clock('6:30') + '<rect x="18" y="72" width="72" height="24" rx="5" fill="#92b8d8" stroke="#45698a" stroke-width="3"/><rect x="18" y="67" width="25" height="12" rx="4" fill="#fff"/>' + person),
    breakfast: svg(clock('7:00') + plate + '<path d="M32 46h28l-3 22H36Z" fill="#f2c575" stroke="#8e684c" stroke-width="3"/><path d="M38 43q8-12 16 0" fill="none" stroke="#fff" stroke-width="4"/><rect x="79" y="58" width="13" height="23" rx="3" fill="#ef9f72"/>'),
    school: svg(clock('7:30') + '<path d="M17 63 61 30l43 33" fill="#ea8c71" stroke="#36516a" stroke-width="4"/><rect x="25" y="62" width="72" height="42" fill="#f7d68a" stroke="#36516a" stroke-width="4"/><rect x="48" y="74" width="24" height="30" fill="#8bb7dc"/><text x="61" y="60" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#36516a">SCHOOL</text>'),
    lunch: svg(clock('12:00') + plate + '<path d="M45 76q6-10 13 0t13 0" fill="none" stroke="#80ae6c" stroke-width="7"/><path d="M21 58v33m73-33v33" stroke="#6b8293" stroke-width="5"/>'),
    dinner: svg(clock('7:00', true) + plate + '<path d="M44 76q9-10 18 0t17 0" fill="none" stroke="#dd8c72" stroke-width="8"/><path d="M21 58v33m73-33v33" stroke="#6b8293" stroke-width="5"/>'),
    bed: svg(clock('9:00', true) + '<rect x="16" y="69" width="86" height="25" rx="5" fill="#8db1d2" stroke="#405f80" stroke-width="4"/><rect x="22" y="63" width="27" height="15" rx="5" fill="#fff"/><path d="M17 95v9m85-9v9" stroke="#405f80" stroke-width="5"/>' + star(72,48,'#f7d878',.35))
  };
  const make = (id, name, meaning, ipa, color, visual, context) => ({ id, name, meaning, ipa, color, visual, context });
  window.DanhGrade4Units = {
    unit1: {
      id: 'unit1', number: 1, title: 'My friends', subtitle: 'Bạn bè của em',
      focus: 'Hỏi và giới thiệu bạn đến từ đâu.',
      patterns: [
        { question: 'Where are you from?', answer: 'I am from Viet Nam.', note: 'Hỏi và nói về bản thân.' },
        { question: 'Where is she from?', answer: 'She is from Japan.', note: 'Giới thiệu một người bạn.' }
      ],
      words: [
        make('america','America','nước Mỹ','/əˈmer.ɪ.kə/','#27477b',flags.america,'My new friend is from ____. Her flag has stars and stripes.'),
        make('australia','Australia','nước Úc','/ɒˈstreɪ.li.ə/','#427d93',flags.australia,'Leo is from ____. His flag has a blue background and stars.'),
        make('britain','Britain','nước Anh','/ˈbrɪt.ən/','#344c89',flags.britain,'Holly is from ____. Her flag has red and white crosses.'),
        make('japan','Japan','nước Nhật','/dʒəˈpæn/','#b7445c',flags.japan,'My friend Yuki is from ____. Her flag has a red circle.'),
        make('malaysia','Malaysia','nước Malaysia','/məˈleɪ.zi.ə/','#315f85',flags.malaysia,'Aina is from ____. Her flag has a crescent moon.'),
        make('vietnam','Viet Nam','nước Việt Nam','/ˌviː.et ˈnæm/','#bf4545',flags.vietnam,'Nam is from ____. His flag has a yellow star.')
      ]
    },
    unit2: {
      id: 'unit2', number: 2, title: 'Time and daily routines', subtitle: 'Giờ giấc và sinh hoạt hằng ngày',
      focus: 'Hỏi giờ và kể những việc em làm trong ngày.',
      patterns: [
        { question: 'What time is it?', answer: 'It is seven thirty.', note: 'Hỏi và đọc giờ.' },
        { question: 'What time do you get up?', answer: 'I get up at six thirty.', note: 'Hỏi giờ thực hiện một hoạt động.' }
      ],
      words: [
        make('getup','get up','thức dậy','/ɡet ʌp/','#436eaa',routines.getup,'On school days, I ____ when my alarm rings at six thirty.'),
        make('breakfast','have breakfast','ăn sáng','/hæv ˈbrek.fəst/','#ae6d42',routines.breakfast,'Before school, I ____ with my family.'),
        make('school','go to school','đi học','/ɡəʊ tə skuːl/','#49758c',routines.school,'At seven thirty, I ____ with my sister.'),
        make('lunch','have lunch','ăn trưa','/hæv lʌntʃ/','#768b4b',routines.lunch,'At noon, I ____ in the school canteen.'),
        make('dinner','have dinner','ăn tối','/hæv ˈdɪn.ə/','#9c624c',routines.dinner,'In the evening, I ____ with my family.'),
        make('bed','go to bed','đi ngủ','/ɡəʊ tə bed/','#605a9b',routines.bed,'At night, I ____ after reading a story.')
      ]
    }
  };
})();
