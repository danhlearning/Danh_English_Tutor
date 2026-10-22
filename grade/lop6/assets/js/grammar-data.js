/* Câu hỏi gốc của website, theo chủ điểm ngữ pháp Tiếng Anh 6 Global Success. */
(() => {
  const C = (prompt, options, answer, explain) => ({ type: 'choice', prompt, options, answer, explain });
  const F = (prompt, answer, explain) => ({ type: 'fill', prompt, answer, explain });
  const R = (parts, answer, explain) => ({ type: 'order', prompt: 'Sắp xếp các mảnh thành câu đúng.', parts, answer, explain });
  const E = (prompt, answer, explain) => ({ type: 'correct', prompt, answer, explain });
  window.DanhGrade6Grammar = [
    {
      unit: 1, topic: 'Hiện tại đơn · Trạng từ tần suất', rule: 'He/She/It + động từ thêm -s/-es. Trạng từ tần suất thường đứng trước động từ thường.',
      easy: [
        C('She ___ English every Monday.', ['study', 'studies', 'studying'], 'studies', 'She là ngôi thứ ba số ít nên study → studies.'),
        C('I ___ to school at 7 a.m.', ['go', 'goes', 'going'], 'go', 'Với I, động từ giữ dạng nguyên mẫu.'),
        F('They ___ (play) football after school.', 'play', 'They là chủ ngữ số nhiều nên dùng play.')
      ],
      medium: [
        C('He ___ get up late on school days.', ["don't", "doesn't", "isn't"], "doesn't", 'Phủ định hiện tại đơn với he dùng does not/doesn’t.'),
        F('___ your sister walk to school every day?', 'Does', 'Câu hỏi hiện tại đơn với she dùng Does.'),
        R(['always', 'We', 'our uniforms', 'wear', 'on Mondays.'], 'We always wear our uniforms on Mondays.', 'Always đứng trước động từ thường wear.')
      ],
      hard: [
        C('How often ___ your friends ___ the library?', ['do / visit', 'does / visit', 'do / visits'], 'do / visit', 'Chủ ngữ số nhiều your friends dùng do + động từ nguyên mẫu.'),
        E('She usually go to school by bike.', 'She usually goes to school by bike.', 'She đi với goes ở hiện tại đơn.'),
        F('My teacher ___ (not teach) on Sundays.', "doesn't teach", 'Sau doesn’t, động từ giữ nguyên dạng teach.')
      ]
    },
    {
      unit: 2, topic: 'Sở hữu cách · Giới từ chỉ vị trí', rule: 'Sở hữu cách: tên người + ’s. Giới từ như in, on, under, behind cho biết vị trí.',
      easy: [
        C('This is ___ bedroom.', ["Lan's", 'Lans', 'Lan'], "Lan's", 'Dùng ’s sau tên người để chỉ sở hữu.'),
        C('The book is ___ the table.', ['on', 'between', 'behind'], 'on', 'On diễn tả vật ở trên bề mặt bàn.'),
        F('The cat is ___ the box. (ở trong)', 'in', 'In nghĩa là ở trong.')
      ],
      medium: [
        C('The sofa is ___ the TV and the window.', ['under', 'between', 'in'], 'between', 'Between dùng khi vật nằm giữa hai vật khác.'),
        F('My ___ (brother) desk is near the door.', "brother's", 'Thêm ’s sau brother để chỉ bàn của anh/em trai.'),
        R(['is', 'the kitchen.', 'The fridge', 'in'], 'The fridge is in the kitchen.', 'Trật tự: chủ ngữ + be + giới từ + nơi chốn.')
      ],
      hard: [
        C('The teacher’s desk is ___ the students’ desks.', ['in front of', 'in', 'on'], 'in front of', 'In front of diễn tả vị trí phía trước.'),
        E('This is my sisters room.', "This is my sister's room.", 'Sister cần ’s để chỉ sở hữu.'),
        F('The schoolbag is ___ the chair. (ở phía sau)', 'behind', 'Behind nghĩa là ở phía sau.')
      ]
    },
    {
      unit: 3, topic: 'Hiện tại tiếp diễn', rule: 'am/is/are + động từ-ing diễn tả việc đang xảy ra. Now và at the moment là dấu hiệu thường gặp.',
      easy: [
        C('Look! The boys ___ football.', ['play', 'are playing', 'plays'], 'are playing', 'Look! cho biết hành động đang diễn ra.'),
        C('She ___ a book now.', ['is reading', 'reads', 'read'], 'is reading', 'She + is + reading.'),
        F('I ___ (write) an email at the moment.', 'am writing', 'I + am + writing.')
      ],
      medium: [
        C('They ___ lunch right now.', ["aren't having", "don't have", "isn't having"], "aren't having", 'They + are not + having diễn tả việc không đang xảy ra.'),
        F('___ he listening to music now?', 'Is', 'Câu hỏi tiếp diễn với he bắt đầu bằng Is.'),
        R(['are', 'What', 'you', 'doing', 'now?'], 'What are you doing now?', 'Câu hỏi: What + are + you + doing?')
      ],
      hard: [
        C('My friend usually walks, but today she ___ to school.', ['cycles', 'is cycling', 'cycle'], 'is cycling', 'Today ở đây đối lập thói quen, chỉ việc đang diễn ra hôm nay.'),
        E('He are playing chess now.', 'He is playing chess now.', 'He đi với is.'),
        F('Be quiet! The baby ___ (sleep).', 'is sleeping', 'Việc đang diễn ra: is sleeping.')
      ]
    },
    {
      unit: 4, topic: 'So sánh hơn của tính từ', rule: 'Tính từ ngắn thường thêm -er; tính từ dài dùng more. Khi so sánh hai đối tượng, dùng than.',
      easy: [
        C('My street is ___ than yours.', ['quiet', 'quieter', 'quietest'], 'quieter', 'So sánh hơn của quiet là quieter.'),
        C('This park is ___ than that one.', ['large', 'larger', 'largest'], 'larger', 'Large → larger trước than.'),
        F('The blue house is ___ (small) than the red house.', 'smaller', 'Small là tính từ ngắn: small → smaller.')
      ],
      medium: [
        C('The new market is ___ than the old one.', ['more modern', 'moderner', 'most modern'], 'more modern', 'Modern dùng more trong so sánh hơn.'),
        F('This road is ___ (busy) than my street.', 'busier', 'Busy đổi y thành i rồi thêm -er.'),
        R(['is', 'than', 'This café', 'that café.', 'cheaper'], 'This café is cheaper than that café.', 'Mẫu câu: A + is + tính từ so sánh hơn + than + B.')
      ],
      hard: [
        C('The museum is ___ than the cinema.', ['more interesting', 'interestinger', 'most interesting'], 'more interesting', 'Interesting là tính từ dài, dùng more.'),
        E('The library is quietter than the market.', 'The library is quieter than the market.', 'Quiet chỉ thêm -er: quieter.'),
        F('The bus station is ___ (far) from here than the bank.', 'farther|further', 'Far có thể đổi thành farther hoặc further.')
      ]
    },
    {
      unit: 5, topic: 'Danh từ đếm được · Must / Mustn’t', rule: 'Danh từ đếm được có dạng số nhiều. Must chỉ điều cần làm; mustn’t chỉ điều bị cấm.',
      easy: [
        C('There are three ___ in the lake.', ['island', 'islands', 'an island'], 'islands', 'Sau three dùng danh từ đếm được số nhiều.'),
        C('You ___ bring water on a long hike.', ['must', "mustn't", 'are'], 'must', 'Must diễn tả điều cần làm.'),
        F('There are many ___ (cave) in this area.', 'caves', 'Many đi với danh từ đếm được số nhiều caves.')
      ],
      medium: [
        C('You ___ leave rubbish in the national park.', ['must', "mustn't", 'can'], "mustn't", 'Mustn’t diễn tả điều không được làm.'),
        F('There is ___ (a/an) island near the coast.', 'an', 'Island bắt đầu bằng âm nguyên âm, dùng an.'),
        R(['must', 'the rules.', 'Visitors', 'follow'], 'Visitors must follow the rules.', 'Sau must dùng động từ nguyên mẫu follow.')
      ],
      hard: [
        C('How ___ water should we take?', ['many', 'much', 'a lot'], 'much', 'Water là danh từ không đếm được, dùng how much.'),
        E('You must to stay on the path.', 'You must stay on the path.', 'Sau must không dùng to.'),
        F('There are five ___ (child) on the beach.', 'children', 'Số nhiều bất quy tắc của child là children.')
      ]
    },
    {
      unit: 6, topic: 'Should / Shouldn’t · Some / Any', rule: 'Should/shouldn’t đưa lời khuyên. Some thường dùng ở câu khẳng định; any thường dùng ở câu hỏi và phủ định.',
      easy: [
        C('You ___ visit your grandparents at Tet.', ['should', "shouldn't", 'are'], 'should', 'Should đưa ra lời khuyên nên làm.'),
        C('We have ___ flowers for Tet.', ['some', 'any', 'much'], 'some', 'Câu khẳng định thường dùng some.'),
        F('You ___ eat too much candy. (không nên)', "shouldn't", 'Shouldn’t diễn tả lời khuyên không nên làm.')
      ],
      medium: [
        C('Do you have ___ lucky money?', ['some', 'any', 'many'], 'any', 'Câu hỏi thông thường dùng any.'),
        F('We do not have ___ fireworks at home.', 'any', 'Câu phủ định thường dùng any.'),
        R(['should', 'before Tet.', 'We', 'clean our house'], 'We should clean our house before Tet.', 'Sau should là động từ nguyên mẫu clean.')
      ],
      hard: [
        C('There is ___ peach blossom in the living room.', ['a', 'any', 'many'], 'a', 'Một cây/cành hoa đào đếm được số ít dùng a.'),
        E('You should to wish your grandparents good health.', 'You should wish your grandparents good health.', 'Sau should không dùng to.'),
        F('___ I bring some fruit to the party?', 'Should', 'Should đứng đầu câu để hỏi lời khuyên.')
      ]
    },
    {
      unit: 7, topic: 'Từ để hỏi · And / But / So', rule: 'Từ để hỏi phù hợp với thông tin cần biết. And nối ý bổ sung, but nối ý trái ngược, so chỉ kết quả.',
      easy: [
        C('___ is your favourite TV programme?', ['What', 'Where', 'When'], 'What', 'What hỏi về sự vật/chương trình.'),
        C('I like cartoons ___ comedies.', ['and', 'but', 'so'], 'and', 'And nối hai sở thích cùng chiều.'),
        F('___ do you watch TV? — In the evening.', 'When', 'When hỏi về thời gian.')
      ],
      medium: [
        C('I like this show, ___ my brother does not.', ['and', 'but', 'so'], 'but', 'But nối hai ý trái ngược.'),
        F('The programme is funny, ___ I watch it every week.', 'so', 'So nối nguyên nhân với kết quả.'),
        R(['do', 'What time', 'start?', 'the news', 'does'], 'What time does the news start?', 'Câu hỏi dùng does trước chủ ngữ số ít the news.')
      ],
      hard: [
        C('___ channel shows the nature programme? — VTV2.', ['Which', 'Why', 'How often'], 'Which', 'Which hỏi chọn một kênh trong các kênh.'),
        E('Why you like this cartoon?', 'Why do you like this cartoon?', 'Câu hỏi hiện tại đơn với you cần do.'),
        F('The film is long, ___ it is very interesting.', 'but', 'But thể hiện sự tương phản.')
      ]
    },
    {
      unit: 8, topic: 'Quá khứ đơn · Câu mệnh lệnh', rule: 'Quá khứ đơn diễn tả việc đã xảy ra. Mệnh lệnh dùng động từ nguyên mẫu; phủ định dùng Don’t + động từ.',
      easy: [
        C('We ___ football yesterday.', ['play', 'played', 'playing'], 'played', 'Yesterday là dấu hiệu quá khứ đơn.'),
        C('___ carefully when you cross the road.', ['Walk', 'Walking', 'Walked'], 'Walk', 'Câu mệnh lệnh bắt đầu bằng động từ nguyên mẫu.'),
        F('My team ___ (win) the match last week.', 'won', 'Quá khứ của win là won.')
      ],
      medium: [
        C('She ___ to the gym last Sunday.', ['go', 'went', 'goes'], 'went', 'Quá khứ của go là went.'),
        F('We ___ (not play) tennis yesterday.', "didn't play", 'Phủ định quá khứ: didn’t + động từ nguyên mẫu.'),
        R(['the ball.', "Don't", 'throw', 'inside'], "Don't throw the ball inside.", 'Mệnh lệnh phủ định: Don’t + động từ nguyên mẫu.')
      ],
      hard: [
        C('___ you watch the match last night?', ['Did', 'Do', 'Were'], 'Did', 'Câu hỏi quá khứ đơn với động từ thường bắt đầu bằng Did.'),
        E('He did not played badminton yesterday.', 'He did not play badminton yesterday.', 'Sau did not, động từ ở dạng nguyên mẫu.'),
        F('There ___ (be) many fans at the stadium yesterday.', 'were', 'Many fans là số nhiều, quá khứ của are là were.')
      ]
    },
    {
      unit: 9, topic: 'Tính từ sở hữu · Đại từ sở hữu', rule: 'Tính từ sở hữu đứng trước danh từ: my, your, his... Đại từ sở hữu thay cả cụm danh từ: mine, yours, hers...',
      easy: [
        C('This is ___ postcard.', ['my', 'mine', 'me'], 'my', 'Trước danh từ postcard cần tính từ sở hữu my.'),
        C('That suitcase is ___.', ['her', 'hers', 'she'], 'hers', 'Sau is, khi không có danh từ phía sau, dùng hers.'),
        F('We love ___ city. (của chúng tôi)', 'our', 'Trước city dùng tính từ sở hữu our.')
      ],
      medium: [
        C('These tickets belong to us. They are ___.', ['our', 'ours', 'we'], 'ours', 'Ours thay cho our tickets.'),
        F('This is Nam’s map. It is ___.', 'his', 'His có thể là đại từ sở hữu, thay cho his map.'),
        R(['is', 'That blue bag', 'mine.', 'not'], 'That blue bag is not mine.', 'Mine đứng độc lập sau is not.')
      ],
      hard: [
        C('Her city is larger than ___, but ours is quieter.', ['my', 'mine', 'me'], 'mine', 'Mine thay cho my city.'),
        E('This guidebook is your, not mine.', 'This guidebook is yours, not mine.', 'Đại từ sở hữu của your là yours.'),
        F('Their photos are here; ___ are in my bag. (của chúng tôi)', 'ours', 'Ours là đại từ sở hữu thay cho our photos.')
      ]
    },
    {
      unit: 10, topic: 'Tương lai đơn · Might', rule: 'Will + động từ nguyên mẫu diễn tả tương lai. Might + động từ nguyên mẫu diễn tả điều có thể xảy ra.',
      easy: [
        C('I ___ live in a smart house one day.', ['will', 'am', 'was'], 'will', 'Will diễn tả dự đoán hoặc ý định tương lai.'),
        C('Robots ___ help us clean the house.', ['will', 'will to', 'are will'], 'will', 'Sau will là động từ nguyên mẫu help.'),
        F('Our future house ___ (have) a garden.', 'will have', 'Tương lai đơn: will + have.')
      ],
      medium: [
        C('We ___ have a swimming pool; I am not sure.', ['might', 'must', 'did'], 'might', 'Might diễn tả khả năng chưa chắc chắn.'),
        F('___ your home use solar energy in the future?', 'Will', 'Câu hỏi tương lai đơn bắt đầu bằng Will.'),
        R(['might', 'a robot', 'I', 'at home.', 'have'], 'I might have a robot at home.', 'Sau might dùng động từ nguyên mẫu have.')
      ],
      hard: [
        C('They ___ live on the Moon, but nobody knows.', ['might', 'will to', 'are'], 'might', 'Might phù hợp với but nobody knows.'),
        E('My future house will has ten rooms.', 'My future house will have ten rooms.', 'Sau will dùng have, không dùng has.'),
        F('We ___ (not use) much electricity in our future home.', "won't use|will not use", 'Phủ định tương lai: won’t/will not + use.')
      ]
    },
    {
      unit: 11, topic: 'Mạo từ · Câu điều kiện loại 1', rule: 'A/an dùng với danh từ đếm được số ít; the chỉ vật xác định. Điều kiện loại 1: If + hiện tại đơn, will + động từ.',
      easy: [
        C('I have ___ reusable bag.', ['a', 'an', 'the'], 'a', 'Reusable bắt đầu bằng âm /r/, dùng a.'),
        C('She bought ___ apple.', ['a', 'an', 'some'], 'an', 'Apple bắt đầu bằng âm nguyên âm, dùng an.'),
        F('If we recycle paper, we ___ (save) trees.', 'will save', 'Mệnh đề chính của điều kiện loại 1 dùng will + save.')
      ],
      medium: [
        C('If it ___ tomorrow, we will stay at home.', ['rains', 'will rain', 'rain'], 'rains', 'Sau if dùng hiện tại đơn, không dùng will.'),
        F('If you turn off the tap, you ___ (save) water.', 'will save', 'Kết quả trong tương lai dùng will save.'),
        R(['we', 'If', 'reuse bags,', 'less plastic.', 'we will use'], 'If we reuse bags, we will use less plastic.', 'If + hiện tại đơn, will + động từ ở mệnh đề chính.')
      ],
      hard: [
        C('If everyone ___ less plastic, our world will be cleaner.', ['uses', 'will use', 'use'], 'uses', 'Everyone là số ít; sau if dùng uses.'),
        E('If we will plant trees, the air will be cleaner.', 'If we plant trees, the air will be cleaner.', 'Không dùng will ngay sau if trong điều kiện loại 1.'),
        F('This is ___ only recycling bin in our classroom.', 'the', 'Only xác định một thùng rác cụ thể, dùng the.')
      ]
    },
    {
      unit: 12, topic: 'So sánh nhất của tính từ ngắn', rule: 'So sánh từ ba đối tượng trở lên: the + tính từ ngắn thêm -est; một số từ đổi y → i hoặc gấp đôi phụ âm.',
      easy: [
        C('This is the ___ robot in the shop.', ['small', 'smaller', 'smallest'], 'smallest', 'So sánh nhất: the smallest.'),
        C('My robot is the ___ of the three.', ['tall', 'taller', 'tallest'], 'tallest', 'Trong ba đối tượng, dùng so sánh nhất tallest.'),
        F('That is the ___ (fast) robot here.', 'fastest', 'Fast → fastest.')
      ],
      medium: [
        C('This is the ___ robot in our class.', ['smartest', 'smarter', 'smart'], 'smartest', 'The + smartest là so sánh nhất.'),
        F('That machine is the ___ (heavy) in the room.', 'heaviest', 'Heavy đổi y thành i rồi thêm -est.'),
        R(['the', 'in the show.', 'is', 'This robot', 'biggest'], 'This robot is the biggest in the show.', 'Big gấp đôi g rồi thêm -est: biggest.')
      ],
      hard: [
        C('Of all the robots, this one is the ___.', ['most strong', 'strongest', 'stronger'], 'strongest', 'Strong là tính từ ngắn, dùng strongest.'),
        E('This is the more fast robot in the competition.', 'This is the fastest robot in the competition.', 'So sánh nhất của fast là fastest.'),
        F('The red robot is the ___ (hot) one after the race.', 'hottest', 'Hot gấp đôi t rồi thêm -est.')
      ]
    }
  ].flatMap(topic => ['easy', 'medium', 'hard'].flatMap(level => topic[level].map((question, index) => ({ ...question, id: `u${topic.unit}-${level}-${index + 1}`, unit: topic.unit, level, topic: topic.topic, rule: topic.rule }))));
})();
