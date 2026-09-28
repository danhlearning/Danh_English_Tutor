/* Grade 2 expansion: one stable entry per word and one sentence per practice item. */
(() => {
  'use strict';
  const svg = (body, background = '#f1f8ff') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><rect x="3" y="3" width="114" height="114" rx="20" fill="${background}"/>${body}</svg>`;
  const photoVisual = path => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><image href="./assets/images/approved/${path}-photo-v1.webp" width="120" height="120"/></svg>`;
  const circle = (x, y, r, fill, extra = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
  const rect = (x, y, w, h, fill, rx = 4, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;
  const line = (x1, y1, x2, y2, color = '#40566b', width = 4) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
  const stroke = 'stroke="#37516b" stroke-width="3"';
  const colors = ['#3978B7', '#A14A75', '#3B8758', '#935B26', '#673FA3', '#207F8A', '#9C462E', '#2E6F9F', '#885989', '#587728', '#935C43', '#316F69'];
  const word = (name, meaning, ipa, visual, index) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, meaning, ipa, color: colors[index % colors.length], visual });
  const make = (id, title, icon, description, pattern, entries, sentences) => ({
    id, title, icon, description, pattern,
    words: entries.map((entry, index) => word(entry[0], entry[1], entry[2], entry[3], index)),
    questions: sentences.map(([target, vietnamese, answer, acceptedAnswers = []], index) => ({
      id: `${id}-${index + 1}`, targetWordIds: [target], imageWordId: target,
      vietnamese, answer, acceptedAnswers: [answer, ...acceptedAnswers]
    }))
  });

  function adjectiveVisual(kind) {
    const base = rect(15, 90, 90, 7, '#92af88');
    const ball = (x, y, r, color) => circle(x, y, r, color, stroke) + circle(x - r / 3, y - r / 3, Math.max(2, r / 7), '#ffffff9a');
    const pencil = (x, y, length) => `<path d="M${x} ${y}l${length} 0 8 7-8 7h-${length}Z" fill="#F6CB52" ${stroke}/>`;
    const item = {
      big: ball(60, 55, 32, '#F27463'), small: ball(60, 69, 16, '#F27463'),
      long: pencil(19, 52, 70), short: pencil(39, 52, 28),
      old: rect(29, 41, 63, 43, '#A78365', 6, stroke) + `<path d="M35 49l20 8-10 20m25-32 13 14-15 17" fill="none" stroke="#6B4932" stroke-width="4"/>`,
      new: rect(29, 41, 63, 43, '#61A6E1', 6, stroke) + rect(37, 49, 46, 26, '#C5EDFC', 3),
      clean: rect(28, 42, 64, 44, '#F5F9FE', 5, stroke) + `<path d="M41 55l8 10 23-22" fill="none" stroke="#3AAA85" stroke-width="5"/>`,
      dirty: rect(28, 42, 64, 44, '#D5C8B4', 5, stroke) + circle(40, 54, 7, '#987457') + circle(69, 69, 9, '#987457') + circle(82, 50, 5, '#987457'),
      hot: rect(33, 43, 51, 47, '#E9A271', 5, stroke) + `<path d="M84 53h10q10 0 0 24H84M45 31q-7-10 0-18m17 18q-7-10 0-18" fill="none" stroke="#E36D54" stroke-width="4"/>`,
      cold: rect(33, 33, 51, 57, '#86CCE7', 5, stroke) + `<path d="M42 49h33M42 65h33" stroke="#E9F8FD" stroke-width="4"/>` + circle(85, 30, 8, '#A9DFF2'),
      fast: `<path d="M25 77h74l-12-26H39Z" fill="#F37D5F" ${stroke}/>` + circle(43, 80, 9, '#34475C') + circle(79, 80, 9, '#34475C') + line(11, 55, 26, 55, '#4C8EC8') + line(7, 65, 25, 65, '#4C8EC8'),
      slow: `<path d="M25 79h74l-12-26H39Z" fill="#F37D5F" ${stroke}/>` + circle(43, 82, 9, '#34475C') + circle(79, 82, 9, '#34475C')
    }[kind];
    return svg(base + item, '#F9FCF4');
  }
  function shapeVisual(kind) {
    const shape = {
      circle: circle(60, 60, 34, '#F27764', stroke),
      square: rect(27, 27, 66, 66, '#65ACD9', 0, stroke),
      triangle: `<path d="M60 22 100 94H20Z" fill="#EBC356" ${stroke}/>` ,
      rectangle: rect(17, 39, 86, 48, '#70B98A', 0, stroke),
      oval: `<ellipse cx="60" cy="60" rx="43" ry="27" fill="#B490D8" ${stroke}/>` ,
      star: `<path d="m60 16 12 29 31 2-24 20 8 32-27-17-27 17 8-32-24-20 31-2Z" fill="#F5CA55" ${stroke}/>` ,
      heart: `<path d="M60 99 22 65q-15-18 0-33 16-15 38 4 22-19 38-4 15 15 0 33Z" fill="#E97992" ${stroke}/>` ,
      diamond: `<path d="M60 17 105 60 60 103 15 60Z" fill="#77BDD7" ${stroke}/>`
    }[kind];
    return svg(shape, '#FFFDF4');
  }
  function toyVisual(kind) {
    const wheel = x => circle(x, 84, 10, '#3B4C61');
    const icons = {
      ball: circle(60, 60, 36, '#F17F60', stroke) + `<path d="M25 57q34-15 70 5M58 25q-14 34 2 70" fill="none" stroke="#FFF2E4" stroke-width="5"/>`,
      doll: circle(60, 34, 17, '#F8CAAB', stroke) + `<path d="M43 24q5-19 17-16 18 0 18 19" fill="#674534"/>` + `<path d="M45 52h30l14 39H31Z" fill="#E77791" ${stroke}/>` + line(48, 92, 45, 108) + line(72, 92, 75, 108),
      'teddy-bear': circle(39, 29, 11, '#A6784C', stroke) + circle(81, 29, 11, '#A6784C', stroke) + circle(60, 49, 29, '#A6784C', stroke) + circle(60, 88, 21, '#A6784C', stroke) + circle(50, 45, 3, '#242C38') + circle(70, 45, 3, '#242C38') + circle(60, 58, 6, '#EBD5B7'),
      kite: `<path d="M60 15 93 53 60 86 27 53Z" fill="#E75D72" ${stroke}/><path d="M60 15v71M27 53h66M60 87q-14 20-4 28" fill="none" stroke="#37516b" stroke-width="3"/>`,
      robot: rect(33, 16, 54, 44, '#86B7C8', 5, stroke) + rect(29, 60, 62, 38, '#6895A8', 5, stroke) + circle(48, 36, 5, '#FFF') + circle(72, 36, 5, '#FFF') + line(44, 102, 44, 112) + line(76, 102, 76, 112),
      'toy-car': rect(18, 58, 84, 25, '#E76F63', 7, stroke) + `<path d="M35 58 47 39h29l13 19" fill="#A8D9EF" ${stroke}/>` + wheel(38) + wheel(84),
      train: rect(15, 48, 58, 37, '#E56D54', 5, stroke) + rect(72, 59, 30, 26, '#E5AD50', 5, stroke) + rect(23, 35, 28, 15, '#7CB4D8', 2, stroke) + wheel(33) + wheel(67) + wheel(89),
      'yo-yo': circle(61, 64, 27, '#F1B54E', stroke) + circle(61, 64, 10, '#F7E5B2', stroke) + `<path d="M61 36V18q0-9 11-9" fill="none" stroke="#53697D" stroke-width="3"/>`,
      puzzle: `<path d="M24 35h24q-4-13 9-13 13 0 9 13h29v26q-13-5-13 8 0 13 13 9v23H68q5-13-8-13-13 0-8 13H24Z" fill="#7FC3A1" ${stroke}/>` ,
      blocks: rect(17, 67, 36, 34, '#EA8065', 2, stroke) + rect(53, 67, 36, 34, '#6DA7D9', 2, stroke) + rect(35, 33, 36, 34, '#EEC562', 2, stroke),
      drum: `<ellipse cx="60" cy="48" rx="33" ry="11" fill="#F5D291" ${stroke}/><path d="M27 48v42q33 18 66 0V48" fill="#D97966" ${stroke}/><path d="m27 50 66 40m0-40L27 90" stroke="#F7EBD7" stroke-width="3"/>` + line(26, 27, 58, 47) + line(89, 22, 59, 47),
      boat: `<path d="M18 76h84L88 99H36Z" fill="#6A9AC2" ${stroke}/><path d="M60 23v53M62 29l27 37H62Z" fill="#F9DD94" ${stroke}/>`
    };
    return svg(icons[kind], '#F5FAFD');
  }
  function weatherVisual(kind) {
    const sun = circle(47, 47, 22, '#F7C65D') + Array.from({length: 8}, (_, index) => {const a = index * Math.PI / 4; return line(47 + Math.cos(a)*30, 47 + Math.sin(a)*30, 47 + Math.cos(a)*39, 47 + Math.sin(a)*39, '#EFB847', 4);}).join('');
    const cloud = `<path d="M28 79q-15 0-15-15 0-12 14-15 5-20 27-17 12 1 17 12 23-3 27 16 3 19-18 19Z" fill="#D9E5EF" ${stroke}/>`;
    const icons = {
      sunny: sun, rainy: cloud + line(35, 87, 29, 103, '#4597C7') + line(58, 87, 52, 103, '#4597C7') + line(81, 87, 75, 103, '#4597C7'),
      cloudy: cloud, windy: `<path d="M13 44h72q18 0 14-15-4-12-19-4M10 65h90M24 87h56q18 0 16 13" fill="none" stroke="#74A6BC" stroke-width="8" stroke-linecap="round"/>`,
      snowy: cloud + circle(35, 94, 5, '#68B8D5') + circle(58, 98, 5, '#68B8D5') + circle(81, 92, 5, '#68B8D5'),
      stormy: cloud + `<path d="M59 77 46 99h16l-6 17 25-29H65l7-10Z" fill="#F5C75A" stroke="#8C6A37" stroke-width="2"/>`,
      foggy: cloud + line(15, 90, 103, 90, '#91A8B6', 5) + line(26, 103, 94, 103, '#91A8B6', 5),
      hot: sun + `<path d="M89 45v43a10 10 0 1 1-10 0V45a5 5 0 0 1 10 0Z" fill="#F26F61" ${stroke}/>`
    };
    return svg(icons[kind], '#EAF6FD');
  }
  function roomVisual(kind) {
    const shell = `<path d="M13 99V29l47-20 47 20v70" fill="#F8EBD6" ${stroke}/>`;
    const icons = {
      bedroom: rect(27, 64, 68, 24, '#79A7D1', 4, stroke) + rect(33, 55, 24, 13, '#FFF9EE', 3, stroke) + line(29, 89, 29, 100) + line(93, 89, 93, 100),
      bathroom: rect(26, 67, 68, 24, '#9CD9E6', 8, stroke) + `<path d="M30 66V41q0-12 14-12h12" fill="none" stroke="#537B91" stroke-width="5"/>` + circle(62, 40, 7, '#73B9D6'),
      kitchen: rect(23, 59, 74, 35, '#B7CBDA', 3, stroke) + circle(41, 68, 7, '#3C5D70') + circle(78, 68, 7, '#3C5D70') + rect(55, 29, 28, 28, '#E8F5FA', 2, stroke),
      'living-room': rect(24, 65, 72, 26, '#E8A77B', 8, stroke) + rect(28, 52, 64, 17, '#E8A77B', 5, stroke) + line(32, 91, 32, 101) + line(88, 91, 88, 101),
      'dining-room': `<ellipse cx="60" cy="72" rx="29" ry="10" fill="#B67F56" ${stroke}/>` + line(60, 80, 60, 101) + rect(21, 78, 15, 20, '#75A8BB', 3, stroke) + rect(84, 78, 15, 20, '#75A8BB', 3, stroke),
      study: rect(23, 65, 73, 11, '#B78456', 2, stroke) + line(31, 76, 31, 101) + line(88, 76, 88, 101) + rect(42, 37, 34, 28, '#75AACC', 3, stroke) + rect(48, 41, 22, 18, '#DFEEF7', 1),
      garage: rect(28, 39, 64, 59, '#A7B8C2', 3, stroke) + line(29, 53, 91, 53) + line(29, 67, 91, 67) + line(29, 81, 91, 81)
    };
    return svg(shell + icons[kind], '#EFF8EC');
  }
  function transportVisual(kind) {
    const wheels = (a, b) => circle(a, 88, 10, '#37485B') + circle(b, 88, 10, '#37485B');
    const body = (fill = '#E97C5D') => `<path d="M16 69h88v17H16Z" fill="${fill}" ${stroke}/>`;
    const icons = {
      car: body() + `<path d="M32 69 46 49h30l14 20Z" fill="#9ED6E9" ${stroke}/>` + wheels(35, 86),
      bus: rect(12, 39, 96, 47, '#E9B65D', 5, stroke) + rect(21, 47, 22, 18, '#C5E5F0', 2) + rect(49, 47, 22, 18, '#C5E5F0', 2) + rect(76, 47, 22, 18, '#C5E5F0', 2) + wheels(34, 88),
      bike: circle(32, 83, 18, 'none', stroke) + circle(89, 83, 18, 'none', stroke) + `<path d="m32 83 20-35 19 35H32l20-35m19 35 18-27M79 54h20" fill="none" stroke="#5589AE" stroke-width="5"/>`,
      train: rect(19, 33, 84, 53, '#7BA8CF', 6, stroke) + rect(29, 42, 19, 20, '#DBF2F8', 2) + rect(54, 42, 19, 20, '#DBF2F8', 2) + rect(79, 42, 16, 20, '#DBF2F8', 2) + wheels(39, 84),
      plane: `<path d="M13 66 53 55 55 18q2-10 10 0l3 37 39 11v10L68 71l-3 18 14 8v6l-20-4-20 4v-6l14-8-3-18-37 5Z" fill="#83B5D2" ${stroke}/>` ,
      boat: `<path d="M16 76h88L87 98H34Z" fill="#7DA6C7" ${stroke}/><path d="M57 28v48m3-46 31 38H60Z" fill="#F4DDA3" ${stroke}/>` ,
      ship: `<path d="M10 75h100L91 100H31Z" fill="#647F9D" ${stroke}/>` + rect(34, 48, 51, 27, '#EDF2F0', 3, stroke) + rect(45, 31, 25, 17, '#EDF2F0', 2, stroke),
      taxi: body('#F0C854') + `<path d="M32 69 46 49h30l14 20Z" fill="#B9DDEB" ${stroke}/>` + rect(48, 40, 23, 8, '#F0C854', 1, stroke) + wheels(35, 86),
      motorbike: circle(29, 85, 16, 'none', stroke) + circle(89, 85, 16, 'none', stroke) + `<path d="m29 85 25-24h21l14 24M46 59h31l-7-11H55" fill="none" stroke="#E17C61" stroke-width="7"/>`,
      truck: rect(12, 45, 61, 39, '#80A9C1', 4, stroke) + `<path d="M73 59h23l11 13v12H73Z" fill="#E8A564" ${stroke}/>` + wheels(35, 91),
      helicopter: `<path d="M19 60q0-22 34-22h11q26 0 26 30H31Z" fill="#77AFBD" ${stroke}/>` + rect(80, 62, 24, 7, '#77AFBD', 1, stroke) + line(57, 39, 57, 24) + line(26, 24, 88, 24) + line(32, 80, 84, 80),
      scooter: circle(34, 89, 11, '#394A5C') + circle(91, 89, 11, '#394A5C') + line(34, 85, 75, 85, '#E7A761', 8) + line(75, 85, 84, 38, '#E7A761', 6) + line(72, 38, 97, 38, '#E7A761', 5)
    };
    return svg(icons[kind], '#F4F9FD');
  }

  const adjectives = [
    ['Big','to','/bɪɡ/',adjectiveVisual('big')], ['Small','nhỏ','/smɔːl/',adjectiveVisual('small')],
    ['Long','dài','/lɒŋ/',adjectiveVisual('long')], ['Short','ngắn','/ʃɔːt/',adjectiveVisual('short')],
    ['Old','cũ','/əʊld/',adjectiveVisual('old')], ['New','mới','/njuː/',adjectiveVisual('new')],
    ['Clean','sạch','/kliːn/',adjectiveVisual('clean')], ['Dirty','bẩn','/ˈdɜːti/',adjectiveVisual('dirty')],
    ['Hot','nóng','/hɒt/',adjectiveVisual('hot')], ['Cold','lạnh','/kəʊld/',adjectiveVisual('cold')],
    ['Fast','nhanh','/fɑːst/',adjectiveVisual('fast')], ['Slow','chậm','/sləʊ/',adjectiveVisual('slow')]
  ];
  const adjectiveNouns = { big:['ball','Quả bóng to.'], small:['ball','Quả bóng nhỏ.'], long:['pencil','Bút chì dài.'], short:['pencil','Bút chì ngắn.'], old:['box','Chiếc hộp cũ.'], new:['box','Chiếc hộp mới.'], clean:['box','Chiếc hộp sạch.'], dirty:['box','Chiếc hộp bẩn.'], hot:['tea','Trà nóng.'], cold:['water','Nước lạnh.'], fast:['car','Chiếc xe chạy nhanh.'], slow:['car','Chiếc xe chạy chậm.'] };
  const adjectiveSentences = Object.entries(adjectiveNouns).map(([id, [noun, vietnamese]]) => [id, vietnamese, `The ${noun} is ${id}.`]);
  const shapes = [
    ['Circle','hình tròn','/ˈsɜːkəl/',shapeVisual('circle')], ['Square','hình vuông','/skweə/',shapeVisual('square')],
    ['Triangle','hình tam giác','/ˈtraɪæŋɡəl/',shapeVisual('triangle')], ['Rectangle','hình chữ nhật','/ˈrek.tæŋ.ɡəl/',shapeVisual('rectangle')],
    ['Oval','hình bầu dục','/ˈəʊvəl/',shapeVisual('oval')], ['Star','hình ngôi sao','/stɑː/',shapeVisual('star')],
    ['Heart','hình trái tim','/hɑːt/',shapeVisual('heart')], ['Diamond','hình thoi','/ˈdaɪəmənd/',shapeVisual('diamond')]
  ];
  const toys = [
    ['Ball','quả bóng','/bɔːl/',toyVisual('ball')], ['Doll','búp bê','/dɒl/',toyVisual('doll')],
    ['Teddy bear','gấu bông','/ˈted.i beə/',toyVisual('teddy-bear')], ['Kite','diều','/kaɪt/',toyVisual('kite')],
    ['Robot','người máy đồ chơi','/ˈrəʊ.bɒt/',toyVisual('robot')], ['Toy car','ô tô đồ chơi','/tɔɪ kɑː/',toyVisual('toy-car')],
    ['Train','tàu hỏa đồ chơi','/treɪn/',toyVisual('train')], ['Yo-yo','con quay yo-yo','/ˈjəʊ.jəʊ/',toyVisual('yo-yo')],
    ['Puzzle','trò ghép hình','/ˈpʌz.əl/',toyVisual('puzzle')], ['Blocks','các khối xếp hình','/blɒks/',toyVisual('blocks')],
    ['Drum','trống đồ chơi','/drʌm/',toyVisual('drum')], ['Boat','thuyền đồ chơi','/bəʊt/',toyVisual('boat')]
  ];
  const weather = [
    ['Sunny','có nắng','/ˈsʌn.i/',weatherVisual('sunny')], ['Rainy','có mưa','/ˈreɪ.ni/',weatherVisual('rainy')],
    ['Cloudy','nhiều mây','/ˈklaʊ.di/',weatherVisual('cloudy')], ['Windy','có gió','/ˈwɪn.di/',weatherVisual('windy')],
    ['Snowy','có tuyết','/ˈsnəʊ.i/',weatherVisual('snowy')], ['Stormy','có bão','/ˈstɔː.mi/',weatherVisual('stormy')],
    ['Foggy','có sương mù','/ˈfɒɡ.i/',weatherVisual('foggy')], ['Hot','nóng','/hɒt/',weatherVisual('hot')]
  ];
  const rooms = [
    ['Bedroom','phòng ngủ','/ˈbed.ruːm/',photoVisual('rooms/bedroom')], ['Bathroom','phòng tắm','/ˈbɑːθ.ruːm/',photoVisual('rooms/bathroom')],
    ['Kitchen','nhà bếp','/ˈkɪtʃ.ən/',photoVisual('rooms/kitchen')], ['Living room','phòng khách','/ˈlɪv.ɪŋ ruːm/',photoVisual('rooms/living-room')],
    ['Dining room','phòng ăn','/ˈdaɪ.nɪŋ ruːm/',photoVisual('rooms/dining-room')], ['Study','phòng học/làm việc','/ˈstʌd.i/',photoVisual('rooms/study')],
    ['Garage','nhà để xe','/ˈɡær.ɑːʒ/',photoVisual('rooms/garage')]
  ];
  const transport = [
    ['Car','ô tô','/kɑː/',photoVisual('transport/car')], ['Bus','xe buýt','/bʌs/',photoVisual('transport/bus')],
    ['Bike','xe đạp','/baɪk/',photoVisual('transport/bike')], ['Train','tàu hỏa','/treɪn/',photoVisual('transport/train')],
    ['Plane','máy bay','/pleɪn/',photoVisual('transport/plane')], ['Boat','thuyền','/bəʊt/',photoVisual('transport/boat')],
    ['Ship','tàu thủy','/ʃɪp/',photoVisual('transport/ship')], ['Taxi','xe taxi','/ˈtæk.si/',photoVisual('transport/taxi')],
    ['Motorbike','xe máy','/ˈməʊ.tə.baɪk/',photoVisual('transport/motorbike')], ['Truck','xe tải','/trʌk/',photoVisual('transport/truck')],
    ['Helicopter','trực thăng','/ˈhel.ɪˌkɒp.tə/',photoVisual('transport/helicopter')], ['Scooter','xe trượt','/ˈskuː.tə/',photoVisual('transport/scooter')]
  ];
  const names = entries => entries.map(([name, meaning]) => [name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), meaning]);
  const catalog = {
    adjectives: make('adjectives','Basic Adjectives','⭐','Tính từ cơ bản · 6 cặp đối lập','The + vật + is + tính từ.',adjectives,adjectiveSentences),
    shapes: make('shapes','Shapes','🔷','Nhận biết 8 hình cơ bản','It is a + tên hình.',shapes,names(shapes).map(([id, meaning]) => [id,`Đây là ${meaning}.`,`It is a ${id}.`])),
    toys: make('toys','Toys','🧸','Đồ chơi quen thuộc quanh em','I have a/an + đồ chơi; với nhiều món dùng some.',toys,names(toys).map(([id, meaning]) => [id,`Tôi có ${meaning}.`,`I have ${id === 'blocks' ? 'some ' : 'a '}${id === 'yo-yo' ? 'yo-yo' : id.replaceAll('-', ' ')}.`])),
    weather: make('weather','Weather','☀️','Nói về thời tiết hôm nay','It is + thời tiết + today.',weather,names(weather).map(([id, meaning]) => [id,`Hôm nay trời ${meaning}.`,`It is ${id} today.`])),
    rooms: make('rooms','Rooms in a House','🏡','Các phòng quen thuộc trong nhà','This is the + tên phòng.',rooms,names(rooms).map(([id, meaning]) => [id,`Đây là ${meaning}.`,`This is the ${id.replaceAll('-', ' ')}.`])),
    transport: make('transport','Transport','🚲','Tên các phương tiện đi lại','This is a + phương tiện.',transport,names(transport).map(([id, meaning]) => [id,`Đây là ${meaning}.`,`This is a ${id}.`]))
  };
  window.grade2ExtendedTopics = Object.freeze(catalog);
})();
