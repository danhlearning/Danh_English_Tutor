/* Câu bổ sung và từ khóa gợi ý cho ngân hàng ngữ pháp lớp 6. */
(() => {
  const C = (prompt, options, answer, explain) => ({ type: 'choice', prompt, options, answer, explain });
  const F = (prompt, answer, explain) => ({ type: 'fill', prompt, answer, explain });
  const R = (parts, answer, explain) => ({ type: 'order', prompt: 'Sắp xếp các mảnh thành câu đúng.', parts, answer, explain });
  const E = (prompt, answer, explain) => ({ type: 'correct', prompt, answer, explain });
  window.DanhGrade6GrammarHints = {
    1: { school: 'trường học', English: 'môn Tiếng Anh', Monday: 'thứ Hai', teacher: 'giáo viên', library: 'thư viện', homework: 'bài tập về nhà', uniform: 'đồng phục', classmate: 'bạn cùng lớp', breakfast: 'bữa sáng', music: 'âm nhạc' },
    2: { bedroom: 'phòng ngủ', kitchen: 'nhà bếp', bathroom: 'phòng tắm', sofa: 'ghế sô pha', book: 'quyển sách', table: 'cái bàn', chair: 'cái ghế', bed: 'cái giường', window: 'cửa sổ', door: 'cửa ra vào', lamp: 'đèn bàn', desk: 'bàn học', garden: 'khu vườn' },
    3: { friend: 'người bạn', football: 'bóng đá', book: 'quyển sách', lunch: 'bữa trưa', music: 'âm nhạc', homework: 'bài tập về nhà', chess: 'cờ vua', sandwich: 'bánh mì kẹp', picture: 'bức tranh', basketball: 'bóng rổ' },
    4: { street: 'con phố', park: 'công viên', market: 'chợ', road: 'con đường', café: 'quán cà phê', museum: 'bảo tàng', cinema: 'rạp chiếu phim', library: 'thư viện', station: 'nhà ga', bank: 'ngân hàng', hotel: 'khách sạn', hospital: 'bệnh viện' },
    5: { island: 'hòn đảo', lake: 'hồ nước', water: 'nước', cave: 'hang động', beach: 'bãi biển', forest: 'khu rừng', mountain: 'ngọn núi', river: 'dòng sông', rubbish: 'rác', visitor: 'khách tham quan', path: 'lối đi', tent: 'lều' },
    6: { Tet: 'Tết', flower: 'bông hoa', candy: 'kẹo', lucky: 'may mắn', fireworks: 'pháo hoa', house: 'ngôi nhà', party: 'bữa tiệc', grandparent: 'ông bà', relative: 'họ hàng', gift: 'món quà', fruit: 'trái cây' },
    7: { programme: 'chương trình', cartoon: 'phim hoạt hình', comedy: 'chương trình hài', news: 'bản tin', channel: 'kênh truyền hình', film: 'bộ phim', television: 'truyền hình', documentary: 'phim tài liệu', evening: 'buổi tối', brother: 'anh/em trai' },
    8: { football: 'bóng đá', tennis: 'quần vợt', match: 'trận đấu', gym: 'phòng tập', team: 'đội', stadium: 'sân vận động', ball: 'quả bóng', badminton: 'cầu lông', swimming: 'bơi lội', race: 'cuộc đua' },
    9: { postcard: 'bưu thiếp', suitcase: 'va li', city: 'thành phố', ticket: 'vé', map: 'bản đồ', bag: 'cái túi', guidebook: 'sách hướng dẫn', photo: 'bức ảnh', camera: 'máy ảnh', hotel: 'khách sạn' },
    10: { house: 'ngôi nhà', robot: 'người máy', garden: 'khu vườn', swimming: 'bơi lội', energy: 'năng lượng', Moon: 'Mặt Trăng', electricity: 'điện', kitchen: 'nhà bếp', room: 'căn phòng', future: 'tương lai' },
    11: { bag: 'cái túi', apple: 'quả táo', paper: 'giấy', tree: 'cái cây', water: 'nước', plastic: 'nhựa', bin: 'thùng rác', classroom: 'lớp học', electricity: 'điện', bottle: 'chai', environment: 'môi trường' },
    12: { robot: 'người máy', shop: 'cửa hàng', machine: 'máy móc', show: 'buổi trình diễn', race: 'cuộc đua', competition: 'cuộc thi', class: 'lớp học', strong: 'khỏe', fast: 'nhanh', smart: 'thông minh', small: 'nhỏ' }
  };
  const additions = [
    { unit: 1, easy: [
      C('My classmates ___ lunch at school.', ['have', 'has', 'having'], 'have', 'Classmates là số nhiều nên dùng have.'),
      F('He ___ (do) his homework after dinner.', 'does', 'He + does ở hiện tại đơn.')
    ], medium: [
      C('My sister ___ goes to school on Sundays.', ['never', 'is', 'does'], 'never', 'Never đứng trước động từ thường goes.'),
      R(['often', 'the library.', 'visits', 'She'], 'She often visits the library.', 'Often đứng trước động từ thường visits.')
    ], hard: [
      E('Does your teacher teaches English?', 'Does your teacher teach English?', 'Sau does, động từ trở về dạng nguyên mẫu teach.'),
      F('How often ___ your classmates study music?', 'do', 'Chủ ngữ số nhiều classmates dùng do.')
    ] },
    { unit: 2, easy: [
      C('The lamp is ___ the desk.', ['on', 'between', 'behind'], 'on', 'On nghĩa là ở trên bề mặt.'),
      F('That is my ___ (father) chair.', "father's", 'Sở hữu cách của father là father’s.')
    ], medium: [
      C('The shoes are ___ the bed, on the floor.', ['under', 'in', 'on top'], 'under', 'Under nghĩa là ở phía dưới.'),
      R(['next to', 'is', 'the window.', 'The bed'], 'The bed is next to the window.', 'Next to nghĩa là ở bên cạnh.')
    ], hard: [
      E('My parents room is upstairs.', "My parents' room is upstairs.", 'Danh từ số nhiều parents có sẵn -s, thêm dấu nháy cuối từ.'),
      F('The bathroom is ___ the bedroom and the kitchen. (ở giữa)', 'between', 'Between dùng khi nằm giữa hai nơi.')
    ] },
    { unit: 3, easy: [
      C('I ___ my friend right now.', ['am calling', 'call', 'calls'], 'am calling', 'Right now chỉ việc đang xảy ra.'),
      F('They ___ (draw) a picture now.', 'are drawing', 'They + are + drawing.')
    ], medium: [
      C('Listen! Someone ___ at the door.', ['is knocking', 'knocks', 'knock'], 'is knocking', 'Listen! báo hiệu hành động đang diễn ra.'),
      R(['is', 'a sandwich', 'making', 'She', 'now.'], 'She is making a sandwich now.', 'She + is + making.')
    ], hard: [
      E('Are your friends play basketball now?', 'Are your friends playing basketball now?', 'Sau are ở thì tiếp diễn cần động từ-ing.'),
      F('My friend ___ (not watch) TV at the moment.', "isn't watching|is not watching", 'My friend là số ít: is not + watching.')
    ] },
    { unit: 4, easy: [
      C('This street is ___ than that one.', ['wider', 'widest', 'wide'], 'wider', 'Wide → wider trong so sánh hơn.'),
      F('The park is ___ (clean) than the market.', 'cleaner', 'Clean là tính từ ngắn, thêm -er.')
    ], medium: [
      C('This hotel is ___ than the small café.', ['more expensive', 'expensiver', 'most expensive'], 'more expensive', 'Tính từ dài expensive dùng more.'),
      R(['than', 'The library', 'the cinema.', 'is quieter'], 'The library is quieter than the cinema.', 'Quieter than là cấu trúc so sánh hơn.')
    ], hard: [
      E('The market is busyier than the park.', 'The market is busier than the park.', 'Busy đổi y thành i, rồi thêm -er.'),
      F('This road is ___ (narrow) than the main street.', 'narrower', 'Narrow dùng dạng so sánh hơn narrower.')
    ] },
    { unit: 5, easy: [
      C('There are two ___ near the river.', ['mountains', 'mountain', 'a mountain'], 'mountains', 'Sau two dùng danh từ số nhiều.'),
      F('You ___ stay with your group. (phải)', 'must', 'Must chỉ điều bắt buộc.')
    ], medium: [
      C('How ___ tents do we need?', ['many', 'much', 'a'], 'many', 'Tents là danh từ đếm được số nhiều.'),
      R(['must not', 'in the forest.', 'We', 'leave rubbish'], 'We must not leave rubbish in the forest.', 'Must not/mustn’t chỉ điều bị cấm.')
    ], hard: [
      E('There is many water in the bottle.', 'There is much water in the bottle.|There is a lot of water in the bottle.', 'Water không đếm được nên dùng much hoặc a lot of, không dùng many.'),
      F('You ___ (not swim) in this dangerous river.', "mustn't swim|must not swim", 'Sau must not dùng động từ nguyên mẫu swim.')
    ] },
    { unit: 6, easy: [
      C('We have ___ gifts for our relatives.', ['some', 'any', 'much'], 'some', 'Câu khẳng định dùng some với danh từ số nhiều.'),
      F('You ___ say nice things at Tet. (nên)', 'should', 'Should dùng để đưa lời khuyên.')
    ], medium: [
      C('There aren’t ___ flowers on the table.', ['any', 'some', 'a'], 'any', 'Câu phủ định thường dùng any.'),
      R(['should not', 'too many sweets.', 'Children', 'eat'], 'Children should not eat too many sweets.', 'Sau should not là động từ nguyên mẫu eat.')
    ], hard: [
      E('We have any fireworks at home.', 'We have some fireworks at home.', 'Câu khẳng định thường dùng some.'),
      F('Are there ___ gifts for the children?', 'any', 'Câu hỏi thường dùng any với danh từ số nhiều.')
    ] },
    { unit: 7, easy: [
      C('___ do you watch cartoons? — On Saturday.', ['When', 'Where', 'Who'], 'When', 'When hỏi về thời gian.'),
      F('I watch the news ___ my dad watches it too.', 'and', 'And nối hai ý cùng chiều.')
    ], medium: [
      C('She likes the comedy, ___ she watches it again.', ['so', 'but', 'or'], 'so', 'So chỉ kết quả.'),
      R(['do', 'Which programme', 'you', 'like?'], 'Which programme do you like?', 'Câu hỏi với you cần trợ động từ do.')
    ], hard: [
      E('Where does the programme start? — At 8 p.m.', 'When does the programme start? — At 8 p.m.|What time does the programme start? — At 8 p.m.', 'At 8 p.m. là thời gian nên hỏi When hoặc What time.'),
      F('The documentary is useful, ___ it is a little long.', 'but', 'But nối hai ý tương phản.')
    ] },
    { unit: 8, easy: [
      C('He ___ the race yesterday.', ['won', 'wins', 'winning'], 'won', 'Yesterday đi với quá khứ đơn; win → won.'),
      F('They ___ (visit) the stadium last week.', 'visited', 'Visit là động từ có quy tắc, thêm -ed.')
    ], medium: [
      C('___ run in the classroom.', ["Don't", "Doesn't", "Didn't"], "Don't", 'Mệnh lệnh phủ định bắt đầu bằng Don’t.'),
      R(['did', 'play?', 'When', 'your team'], 'When did your team play?', 'Câu hỏi quá khứ đơn: When did + chủ ngữ + động từ?')
    ], hard: [
      E('Did she went swimming last Sunday?', 'Did she go swimming last Sunday?', 'Sau did dùng go, không dùng went.'),
      F('We ___ (not watch) the match last night.', "didn't watch|did not watch", 'Phủ định quá khứ đơn: did not + watch.')
    ] },
    { unit: 9, easy: [
      C('This camera is ___.', ['mine', 'my', 'me'], 'mine', 'Mine đứng độc lập thay cho my camera.'),
      F('That is ___ hotel. (của họ)', 'their', 'Trước danh từ hotel dùng their.')
    ], medium: [
      C('Is this your bag? — Yes, it is ___.', ['mine', 'my', 'I'], 'mine', 'Đại từ sở hữu mine đứng độc lập.'),
      R(['is', 'ours.', 'This map'], 'This map is ours.', 'Ours đứng độc lập sau động từ be.')
    ], hard: [
      E('Those photos are our, not their.', 'Those photos are ours, not theirs.', 'Đại từ sở hữu đứng độc lập: ours, theirs.'),
      F('The blue tickets are hers; the red ones are ___. (của anh ấy)', 'his', 'His có thể đứng độc lập làm đại từ sở hữu.')
    ] },
    { unit: 10, easy: [
      C('We ___ have a robot in the future.', ['will', 'were', 'have'], 'will', 'Will đi trước động từ nguyên mẫu have.'),
      F('The house ___ (be) near the sea one day.', 'will be', 'Tương lai đơn: will be.')
    ], medium: [
      C('It ___ rain tomorrow; I am not sure.', ['might', 'must', 'does'], 'might', 'Might diễn tả khả năng chưa chắc chắn.'),
      R(['will', 'the kitchen.', 'clean', 'A robot'], 'A robot will clean the kitchen.', 'Sau will dùng động từ nguyên mẫu clean.')
    ], hard: [
      E('Will robots to cook meals for us?', 'Will robots cook meals for us?', 'Sau will không dùng to.'),
      F('They ___ (not live) on the Moon next year.', "won't live|will not live", 'Phủ định tương lai đơn: won’t/will not + live.')
    ] },
    { unit: 11, easy: [
      C('I put the bottle in ___ bin.', ['the', 'an', 'some'], 'the', 'The chỉ chiếc thùng rác đã xác định.'),
      F('I have ___ old plastic bottle.', 'an', 'Old bắt đầu bằng âm nguyên âm, dùng an.')
    ], medium: [
      C('If we save electricity, we ___ our planet.', ['will help', 'helped', 'helps'], 'will help', 'Mệnh đề chính trong điều kiện loại 1 dùng will + động từ.'),
      R(['will be cleaner.', 'If we plant trees,', 'our school'], 'If we plant trees, our school will be cleaner.', 'If + hiện tại đơn, mệnh đề chính dùng will.')
    ], hard: [
      E('If she will reuse the bag, she will use less plastic.', 'If she reuses the bag, she will use less plastic.', 'Sau if dùng hiện tại đơn reuses.'),
      F('If the school ___ (have) more bins, students will recycle more.', 'has', 'Sau if dùng hiện tại đơn; school là số ít nên have → has.')
    ] },
    { unit: 12, easy: [
      C('This is the ___ machine here.', ['strongest', 'stronger', 'strong'], 'strongest', 'So sánh nhất của strong là strongest.'),
      F('That robot is the ___ (small) in the shop.', 'smallest', 'Small → smallest.')
    ], medium: [
      C('Which robot is the ___ in the show?', ['fastest', 'faster', 'fast'], 'fastest', 'The fastest là dạng so sánh nhất.'),
      R(['is', 'the class.', 'the smartest', 'in', 'This robot'], 'This robot is the smartest in the class.', 'The smartest dùng khi so sánh trong cả lớp.')
    ], hard: [
      E('This is the bigest robot in the competition.', 'This is the biggest robot in the competition.', 'Big gấp đôi g trước -est: biggest.'),
      F('Of all the robots, this is the ___ (light) one.', 'lightest', 'Light là tính từ ngắn, thêm -est.')
    ] }
  ];
  window.DanhGrade6Grammar.push(...additions.flatMap(topic => ['easy', 'medium', 'hard'].flatMap(level => topic[level].map((question, index) => ({ ...question, id: `u${topic.unit}-${level}-extra-${index + 1}`, unit: topic.unit, level, topic: window.DanhGrade6Grammar.find(item => item.unit === topic.unit).topic, rule: window.DanhGrade6Grammar.find(item => item.unit === topic.unit).rule })))));
})();
