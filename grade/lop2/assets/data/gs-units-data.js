/* Units 2–16: practice vocabulary, illustrations and sentences for Units 2–16. */
(() => {
  'use strict';
  const C = '#36516a';
  const r = (x, y, w, h, fill, rx = 3) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${C}" stroke-width="2"/>`;
  const c = (x, y, radius, fill) => `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}" stroke="${C}" stroke-width="2"/>`;
  const p = (d, fill, width = 2) => `<path d="${d}" fill="${fill}" stroke="${C}" stroke-width="${width}" stroke-linejoin="round" stroke-linecap="round"/>`;
  const t = (x, y, value, size = 27, fill = C) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial,sans-serif" font-size="${size}" font-weight="bold" fill="${fill}">${value}</text>`;
  const person = (x, shirt, hair = '#634431') => c(x, 36, 12, '#f6c9a2') + `<path d="M${x - 13} 30q12-20 26 0" fill="none" stroke="${hair}" stroke-width="5"/>` + p(`M${x - 17} 89V61q17-19 34 0v28Z`, shirt);
  const bike = c(30, 83, 17, '#fff') + c(88, 83, 17, '#fff') + p('M30 83 52 49 70 83H30l22-34m18 34 18-30M76 52h21', 'none', 4);
  const car = r(18, 65, 84, 23, '#f17a65', 6) + p('M34 65 46 47h28l14 18Z', '#a8def0') + c(38, 89, 8, '#43566a') + c(83, 89, 8, '#43566a');
  const tree = (x, y) => r(x - 4, y + 18, 8, 28, '#986444') + c(x, y + 10, 22, '#72bb7b');
  const art = {
    kite: p('M60 13 95 52 60 90 25 52Z', '#ec667f') + p('M60 13v77M25 52h70M60 90q-18 12-5 25', 'none'),
    bike,
    kitten: c(60, 66, 31, '#d39c69') + p('M34 46 30 19l24 20M66 39 90 19l-4 27', '#d39c69') + c(49, 63, 3, C) + c(71, 63, 3, C) + p('m55 75 5 4 5-4', '#f28891') + p('M27 75 7 69m86 6 20-6', 'none'),
    sail: p('M18 82h84L86 99H35Z', '#69a6d3') + p('M58 17v65m3-59 30 52H61Z', '#f9d781') + p('M57 30 29 72h28Z', '#fff7e9'),
    sand: p('M5 84q35-20 62-4 26 11 48-4v36H5Z', '#efd18a') + c(32, 62, 7, '#f8c78e') + c(78, 67, 5, '#e7ad77') + p('m49 89 5-12 5 12 12 3-12 3-5 12-5-12-12-3Z', '#ef8b79'),
    sea: r(3, 10, 114, 104, '#d9f3fc', 20) + p('M4 66q14-12 28 0t28 0 28 0 28 0v42H4Z', '#5aa6d2') + p('M5 85q15-12 29 0t29 0 28 0 26 0', 'none', 4) + c(88, 32, 12, '#f8ca60'),
    rainbow: '<path d="M10 93a50 50 0 0 1 100 0" fill="none" stroke="#e86e6c" stroke-width="10"/><path d="M20 93a40 40 0 0 1 80 0" fill="none" stroke="#f2be57" stroke-width="10"/><path d="M30 93a30 30 0 0 1 60 0" fill="none" stroke="#6dbba7" stroke-width="10"/>' + c(25, 95, 9, '#fff') + c(95, 95, 9, '#fff'),
    river: p('M6 109q35-22 25-45t28-47h25q-31 37-18 50t42 42Z', '#74b9da') + tree(17, 27) + tree(99, 30),
    road: p('M42 10h36l35 101H7Z', '#6e7882') + p('M60 18v12m0 14v15m0 16v24', 'none', 4),
    question: r(23, 17, 74, 91, '#fff', 7) + t(60, 77, '?', 65, '#4e9ac7'),
    square: r(25, 25, 70, 70, '#70b8db', 0),
    quiz: r(19, 14, 82, 95, '#fff', 6) + t(59, 42, 'QUIZ', 19, '#5686b4') + c(39, 62, 6, '#fff') + r(53, 57, 30, 8, '#f3d27d', 1) + c(39, 85, 6, '#fff') + r(53, 80, 30, 8, '#8ed5a0', 1),
    box: p('M20 47 60 28l40 19v43L60 108 20 90Z', '#d7aa76') + p('M20 47 60 68l40-21M60 68v40', 'none'),
    fox: p('M20 29 40 45 60 38l20 7 20-16-5 52-35 25-35-25Z', '#e89155') + p('M33 75 60 99l27-24-27 10Z', '#fff7ed') + c(45, 65, 3, C) + c(75, 65, 3, C),
    ox: c(60, 68, 31, '#b88f69') + p('M33 51Q11 45 19 22q19 18 27 21M87 51q22-6 14-29-19 18-27 21', '#f3e7cf') + c(48, 62, 3, C) + c(72, 62, 3, C) + p('M44 79q16-13 32 0v19H44Z', '#eac0a1') + c(54, 87, 2, C) + c(67, 87, 2, C),
    juice: p('M35 34h50l-7 69H42Z', '#f7ba54') + p('M27 32h66M70 35 86 13h12', 'none', 4) + r(47, 60, 26, 14, '#f9d889', 7),
    jelly: p('M28 59q0-25 32-25t32 25l-9 36H37Z', '#e78eaf') + p('M29 59q31 16 62 0', 'none') + c(48, 48, 4, '#fff'),
    jam: r(32, 32, 56, 70, '#db667b', 9) + r(28, 20, 64, 17, '#78a2b9', 4) + r(41, 52, 38, 29, '#fff9e7', 8) + c(60, 66, 9, '#e76678'),
    village: p('M14 57 35 38l21 19v44H14Z', '#e6b37f') + p('M61 46 86 26l24 20v55H61Z', '#9cc9d7') + r(78, 65, 14, 36, '#fff5d8') + tree(58, 19),
    van: r(14, 52, 84, 35, '#8cb7d5', 5) + p('M22 52 34 32h38l17 20Z', '#bde3ee') + c(35, 88, 9, '#3e536c') + c(82, 88, 9, '#3e536c'),
    volleyball: c(60, 62, 39, '#fff') + p('M27 42q42-12 68 16M48 25q-16 34 4 72M86 35q-29 15-38 59', 'none', 4),
    yogurt: p('M26 46h68l-9 57H35Z', '#dfeafa') + r(21, 36, 78, 12, '#8abbd6', 5) + c(60, 69, 13, '#f38b9d'),
    yams: p('M16 72q-8-24 17-30 18-6 27 13 8 24-10 38-23 15-34-21Z', '#ad785c') + p('M59 72q-8-24 17-30 18-6 27 13 8 24-10 38-23 15-34-21Z', '#bd8768') + p('M29 39q-3-15 11-19m39 19q-3-15 11-19', 'none', 3),
    'yo-yos': c(44, 72, 22, '#f6be5c') + c(83, 78, 18, '#7cb7d8') + c(44, 72, 8, '#fff0c8') + c(83, 78, 6, '#d9f4fb') + p('M44 49V22q0-12 12-12m27 49V27q0-12 12-12', 'none'),
    zoo: p('M17 101V42q43-55 86 0v59Z', '#b5d8b0') + p('M29 101V54q31-37 62 0v47', '#edf7e7') + t(60, 52, 'ZOO', 18, '#477a51') + r(18, 95, 84, 8, '#9b8769'),
    zebra: p('M27 39 77 34l18 25-12 34H38L24 66Z', '#fff') + p('M39 36 49 89M54 35 64 91M70 35 79 89M28 48l18 15M81 46l12 15', 'none', 5) + p('M75 38 90 18l17 12-12 32Z', '#fff') + c(92, 37, 2, C),
    slide: p('M39 30v68m0-59h35l26 53H64Z', '#f6a65f') + p('M23 30h55M24 30v68m-5 0h24', 'none', 4) + c(28, 19, 6, '#f1d074'),
    ride: bike + person(60, '#ee8d82') + p('M43 85 54 63l14 21', 'none', 4),
    drive: car + person(60, '#f6d477') + p('M44 60h32', 'none'),
    grapes: [c(48, 50, 10, '#9e77bc'),c(70, 50, 10, '#9e77bc'),c(38, 69, 10, '#9e77bc'),c(59, 69, 10, '#9e77bc'),c(80, 69, 10, '#9e77bc'),c(49, 88, 10, '#9e77bc'),c(70, 88, 10, '#9e77bc'),c(60, 104, 9, '#9e77bc')].join('') + p('M59 39q5-18 22-21', 'none', 4),
    cake: p('M18 63h84v38H18Z', '#f0b7bc') + p('M18 62q12-13 22 0t20 0 20 0 22 0V51H18Z', '#fff9ec') + r(56, 25, 8, 25, '#f4cc6b') + p('M60 22q-7-10 0-17 7 8 0 17Z', '#f19155'),
    table: p('M13 45h94v15H13Z', '#ba8a60') + r(25, 60, 9, 43, '#ba8a60') + r(86, 60, 9, 43, '#ba8a60'),
    eleven: t(60, 80, '11', 60, '#407eb4'),
    thirteen: t(60, 80, '13', 60, '#9a6ab2'),
    fourteen: t(60, 80, '14', 60, '#4b987d'),
    fifteen: t(60, 80, '15', 60, '#c27b49'),
    brother: person(60, '#61a3d6') + person(24, '#e29b8f'),
    sister: person(60, '#e689a8') + person(96, '#61a3d6'),
    grandmother: person(60, '#b28bbf', '#ddd') + p('M33 54q-6-30 10-35m34 0q16 5 10 35', 'none', 5) + c(53, 37, 2, C) + c(67, 37, 2, C) + p('M48 37h24', 'none'),
    shirts: p('M21 31 42 19h36l21 12-12 25-11-7v54H44V49l-11 7Z', '#75b6d8') + p('M55 19v21l5 6 5-6V19', '#fff'),
    shoes: p('M14 64q15 3 24-17l20 13q6 20 28 19v20H14Z', '#e98c76') + p('M53 81q16 2 28 0', 'none') + p('M43 44q14 1 21 18', 'none'),
    shorts: p('M28 21h64l-6 75H62l-3-34-3 34H32Z', '#75abd1') + p('M28 37h64M60 21v33', 'none'),
    tent: p('M15 101 59 18l46 83Z', '#e4a36b') + p('M59 18v83H15m44-83 23 83', 'none') + p('M50 101 59 65l10 36Z', '#f8dfb7'),
    teapot: p('M30 48h57v44q-28 19-57 0Z', '#a3c8d2') + p('M29 55 9 64q2 15 21 10M87 58q25-13 25 11t-25 12', 'none', 5) + r(42, 38, 36, 10, '#86b3c5') + c(60, 34, 5, '#86b3c5'),
    blanket: p('M23 29h73v66q-33 13-73 0Z', '#db90ad') + p('M23 43h73M31 29v66m16-66v72m17-72v73m17-73v69', 'none', 3)
  };
  const colors = ['#3978B7', '#A14A75', '#3B8758', '#935B26'];
  const svg = key => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true">${art[key]}</svg>`;
  // Ảnh chân thật Unit 2 đã được duyệt; giữ tranh SVG cũ trong kho phiên bản.
  const approvedUnit2Visuals = Object.freeze({
    kite: './assets/images/approved/gsunit2/kite-photo-v1.webp',
    bike: './assets/images/approved/gsunit2/bike-photo-v1.webp',
    kitten: './assets/images/approved/gsunit2/kitten-photo-v1.webp'
  });
  const approvedSvg = source => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><image href="${source}" width="120" height="120"/></svg>`;
  // Each row: word, Vietnamese meaning, British IPA, illustration key, original practice sentence, translation.
  const units = [
    [2, 'In the backyard', '🪁', 'âm /k/', 'This is a + tên đồ vật hoặc con vật.', [
      ['Kite','con diều','/kaɪt/','kite','This is a kite.','Đây là một con diều.'],
      ['Bike','xe đạp','/baɪk/','bike','This is a bike.','Đây là một chiếc xe đạp.'],
      ['Kitten','mèo con','/ˈkɪt.ən/','kitten','This is a kitten.','Đây là một chú mèo con.']]],
    [3, 'At the seaside', '🏖️', 'âm /s/', 'I can sail. / I see + sự vật.', [
      ['Sail','đi thuyền','/seɪl/','sail','I can sail.','Tôi có thể đi thuyền.'],
      ['Sand','cát','/sænd/','sand','I see sand.','Tôi nhìn thấy cát.'],
      ['Sea','biển','/siː/','sea','I see the sea.','Tôi nhìn thấy biển.']]],
    [4, 'In the countryside', '🌈', 'âm /r/', 'I see a + sự vật.', [
      ['Rainbow','cầu vồng','/ˈreɪn.bəʊ/','rainbow','I see a rainbow.','Tôi nhìn thấy cầu vồng.'],
      ['River','dòng sông','/ˈrɪv.ə/','river','I see a river.','Tôi nhìn thấy một dòng sông.'],
      ['Road','con đường','/rəʊd/','road','I see a road.','Tôi nhìn thấy một con đường.']]],
    [5, 'In the classroom', '❓', 'âm /kw/', 'This is a + từ mới.', [
      ['Question','câu hỏi','/ˈkwes.tʃən/','question','This is a question.','Đây là một câu hỏi.'],
      ['Square','hình vuông','/skweə/','square','This is a square.','Đây là một hình vuông.'],
      ['Quiz','bài đố','/kwɪz/','quiz','This is a quiz.','Đây là một bài đố.']]],
    [6, 'On the farm', '🦊', 'âm /ɒks/', 'This is a/an + từ mới.', [
      ['Box','cái hộp','/bɒks/','box','This is a box.','Đây là một cái hộp.'],
      ['Fox','con cáo','/fɒks/','fox','This is a fox.','Đây là một con cáo.'],
      ['Ox','con bò đực','/ɒks/','ox','This is an ox.','Đây là một con bò đực.']]],
    [7, 'In the kitchen', '🧃', 'âm /dʒ/', 'I like + món ăn hoặc thức uống.', [
      ['Juice','nước ép','/dʒuːs/','juice','I like juice.','Tôi thích nước ép.'],
      ['Jelly','thạch','/ˈdʒel.i/','jelly','I like jelly.','Tôi thích thạch.'],
      ['Jam','mứt','/dʒæm/','jam','I like jam.','Tôi thích mứt.']]],
    [8, 'In the village', '🏡', 'âm /v/', 'This is a + từ mới.', [
      ['Village','ngôi làng','/ˈvɪl.ɪdʒ/','village','This is a village.','Đây là một ngôi làng.'],
      ['Van','xe van','/væn/','van','This is a van.','Đây là một chiếc xe van.'],
      ['Volleyball','quả bóng chuyền','/ˈvɒl.i.bɔːl/','volleyball','This is a volleyball.','Đây là một quả bóng chuyền.']]],
    [9, 'In the grocery store', '🛒', 'âm /j/', 'I see + từ mới.', [
      ['Yogurt','sữa chua','/ˈjɒɡ.ət/','yogurt','I see yogurt.','Tôi nhìn thấy sữa chua.'],
      ['Yams','những củ khoai','/jæmz/','yams','I see yams.','Tôi nhìn thấy những củ khoai.'],
      ['Yo-yos','những con quay yo-yo','/ˈjəʊ.jəʊz/','yo-yos','I see yo-yos.','Tôi nhìn thấy những con quay yo-yo.']]],
    [10, 'At the zoo', '🦓', 'âm /z/', 'I see a + nơi chốn hoặc con vật.', [
      ['Zoo','sở thú','/zuː/','zoo','I see a zoo.','Tôi nhìn thấy một sở thú.'],
      ['Zebra','ngựa vằn','/ˈzeb.rə/','zebra','I see a zebra.','Tôi nhìn thấy một con ngựa vằn.']]],
    [11, 'In the playground', '🛝', 'các hành động ở sân chơi', 'I can + động từ. / My dad can drive.', [
      ['Slide','trượt cầu trượt','/slaɪd/','slide','I can slide.','Tôi có thể trượt cầu trượt.'],
      ['Ride','đi xe','/raɪd/','ride','I can ride.','Tôi có thể đi xe.'],
      ['Drive','lái xe','/draɪv/','drive','My dad can drive.','Bố tôi có thể lái xe.']]],
    [12, 'At the café', '🍰', 'âm /eɪ/', 'I see + từ mới.', [
      ['Grapes','nho','/ɡreɪps/','grapes','I see grapes.','Tôi nhìn thấy nho.'],
      ['Cake','bánh ngọt','/keɪk/','cake','I see a cake.','Tôi nhìn thấy một chiếc bánh ngọt.'],
      ['Table','cái bàn','/ˈteɪ.bəl/','table','I see a table.','Tôi nhìn thấy một cái bàn.']]],
    [13, 'In the maths class', '🔢', 'số đếm', 'The number is + số.', [
      ['Eleven','mười một','/ɪˈlev.ən/','eleven','The number is eleven.','Đây là số mười một.'],
      ['Thirteen','mười ba','/ˌθɜːˈtiːn/','thirteen','The number is thirteen.','Đây là số mười ba.'],
      ['Fourteen','mười bốn','/ˌfɔːˈtiːn/','fourteen','The number is fourteen.','Đây là số mười bốn.'],
      ['Fifteen','mười lăm','/ˌfɪfˈtiːn/','fifteen','The number is fifteen.','Đây là số mười lăm.']]],
    [14, 'At home', '👪', 'người thân trong gia đình', 'This is my + người thân.', [
      ['Brother','anh hoặc em trai','/ˈbrʌð.ə/','brother','This is my brother.','Đây là anh hoặc em trai của tôi.'],
      ['Sister','chị hoặc em gái','/ˈsɪs.tə/','sister','This is my sister.','Đây là chị hoặc em gái của tôi.'],
      ['Grandmother','bà','/ˈɡræn.mʌð.ə/','grandmother','This is my grandmother.','Đây là bà của tôi.']]],
    [15, 'In the clothes shop', '👕', 'âm /ʃ/', 'I see + quần áo.', [
      ['Shirts','những chiếc áo sơ mi','/ʃɜːts/','shirts','I see shirts.','Tôi nhìn thấy những chiếc áo sơ mi.'],
      ['Shoes','những đôi giày','/ʃuːz/','shoes','I see shoes.','Tôi nhìn thấy những đôi giày.'],
      ['Shorts','quần đùi','/ʃɔːts/','shorts','I see shorts.','Tôi nhìn thấy quần đùi.']]],
    [16, 'At the campsite', '⛺', 'âm /t/ và từ cắm trại', 'This is a + vật dụng.', [
      ['Tent','cái lều','/tent/','tent','This is a tent.','Đây là một cái lều.'],
      ['Teapot','ấm trà','/ˈtiː.pɒt/','teapot','This is a teapot.','Đây là một ấm trà.'],
      ['Blanket','cái chăn','/ˈblæŋ.kɪt/','blanket','This is a blanket.','Đây là một cái chăn.']]]
  ];
  const catalog = {};
  for (const [number, title, icon, focus, pattern, entries] of units) {
    const id = `gsunit${number}`;
    const words = entries.map(([name, meaning, ipa, image], index) => ({
      id: name.toLowerCase(), name, meaning, ipa, color: colors[index % colors.length],
      visual: id === 'gsunit2' && approvedUnit2Visuals[name.toLowerCase()]
        ? approvedSvg(approvedUnit2Visuals[name.toLowerCase()]) : svg(image)
    }));
    const questions = entries.map(([name, , , , answer, vietnamese], index) => ({
      id: `${id}-${index + 1}`, targetWordIds: [words[index].id], imageWordId: words[index].id,
      answer, vietnamese, acceptedAnswers: [answer]
    }));
    catalog[id] = { id, title: `Unit ${number} · ${title}`, icon,
      description: `Tiếng Anh 2 – Global Success · Luyện ${focus}. Câu luyện do website biên soạn.`,
      pattern: `Câu luyện thêm: ${pattern}`, words, questions };
  }
  window.grade2Units = Object.freeze(catalog);
})();
