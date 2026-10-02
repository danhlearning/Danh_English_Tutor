/* Bài viết lại câu giữ nguyên nghĩa, biên soạn theo chủ điểm Global Success 6. */
(() => {
  const rewrite = (unit, level, source, cue, answer, rule, vocab = '', explain = '') => ({
    id: `g6-rewrite-u${unit}-${level}-${rewrite.index++}`,
    unit, level, type: 'rewrite', topic: 'Viết lại câu',
    prompt: 'Viết lại câu sao cho nghĩa không đổi. Dùng từ hoặc phần mở đầu được cho.',
    source, cue, answer, rule, vocab,
    explain: explain || `Viết lại theo cấu trúc: ${rule}`
  });
  rewrite.index = 1;
  const groups = [
    [1, {
      easy: [
        ['I go to school on foot.', 'I walk ...', 'I walk to school.', 'go to school on foot = walk to school', 'on foot = đi bộ'],
        ['She has English on Monday.', 'Monday is ...', 'Monday is the day she has English.', 'have a subject on + day ↔ day is the day ...', 'English = môn Tiếng Anh'],
      ], medium: [
        ['He goes to the library every Saturday.', 'He always ...', 'He always goes to the library on Saturdays.', 'always + động từ thường; every Saturday = on Saturdays', 'library = thư viện'],
        ['My sister does not get up late.', 'My sister never ...', 'My sister never gets up late.', 'not ... ever = never; never đứng trước động từ thường', 'get up = thức dậy'],
      ], hard: [
        ['Lan goes to school at seven every day.', 'What time ...?', 'What time does Lan go to school every day?', 'What time + does + chủ ngữ số ít + động từ nguyên mẫu?', 'at seven = lúc bảy giờ'],
        ['My friends often play football after school.', 'How often ...?', 'How often do your friends play football after school?', 'How often + do + chủ ngữ số nhiều + động từ nguyên mẫu?', 'often = thường xuyên'],
      ]
    }],
    [2, {
      easy: [
        ['This is the bedroom of my parents.', "This is my parents' ...", "This is my parents' bedroom.", "danh từ số nhiều kết thúc bằng s + ' + danh từ", 'bedroom = phòng ngủ'],
        ['The book is on the desk.', 'There is ...', 'There is a book on the desk.', 'The book is on ... ↔ There is a book on ...', 'desk = bàn học'],
      ], medium: [
        ['The kitchen is next to the bathroom.', 'The bathroom ...', 'The bathroom is next to the kitchen.', 'next to diễn tả vị trí hai chiều', 'next to = bên cạnh'],
        ['The lamp belongs to my sister.', "It is my sister's ...", "It is my sister's lamp.", "belong to + người = sở hữu cách với 's", 'lamp = đèn bàn'],
      ], hard: [
        ['The sofa is next to the table.', 'The table is ...', 'The table is next to the sofa.', 'next to diễn tả vị trí hai chiều', 'sofa = ghế sô pha'],
        ['My parents have a room upstairs.', "My parents' ...", "My parents' room is upstairs.", "chủ sở hữu số nhiều có s → thêm dấu ' sau s", 'upstairs = ở tầng trên'],
      ]
    }],
    [3, {
      easy: [
        ['She is reading a book now.', 'At the moment, ...', 'At the moment, she is reading a book.', 'now = at the moment; hiện tại tiếp diễn: be + V-ing', 'read a book = đọc sách'],
        ['Look! The boys are playing football.', 'The boys ...', 'The boys are playing football now.', 'Look! báo hiệu hành động đang diễn ra; dùng be + V-ing', 'boys = các bạn nam'],
      ], medium: [
        ['She is not watching TV now.', "She isn't ...", "She isn't watching TV now.", "is not = isn't", 'watch TV = xem ti vi'],
        ['The children are drawing pictures at the moment.', 'What ...?', 'What are the children doing at the moment?', 'What + are + chủ ngữ + doing?', 'draw pictures = vẽ tranh'],
      ], hard: [
        ['Is your friend playing chess now?', 'Is your friend ...?', 'Is your friend playing chess at the moment?', 'now = at the moment; giữ dạng câu hỏi', 'chess = cờ vua'],
        ['My sister is studying in her room at the moment.', 'Where ...?', 'Where is your sister studying at the moment?', 'Where + is + chủ ngữ + V-ing?', 'at the moment = lúc này'],
      ]
    }],
    [4, {
      easy: [
        ['This street is wider than that street.', 'That street is ...', 'That street is narrower than this street.', 'wider than ↔ narrower than', 'wide = rộng; narrow = hẹp'],
        ['The park is quieter than the market.', 'The market is ...', 'The market is noisier than the park.', 'quieter than ↔ noisier than', 'quiet = yên tĩnh; noisy = ồn ào'],
      ], medium: [
        ['The cinema is more expensive than the café.', 'The café is ...', 'The café is cheaper than the cinema.', 'more expensive than ↔ cheaper than', 'expensive = đắt; cheap = rẻ'],
        ['This road is not as long as the main road.', 'The main road is ...', 'The main road is longer than this road.', 'not as + tính từ + as ↔ so sánh hơn', 'long = dài'],
      ], hard: [
        ['No street in this town is wider than King Street.', 'King Street is ...', 'King Street is the widest street in this town.', 'No + danh từ + is ... than ↔ so sánh nhất', 'widest = rộng nhất'],
        ['The library is quieter than both the cinema and the market.', 'The library is ...', 'The library is the quietest of the three places.', 'so sánh hơn với hai nơi còn lại ↔ so sánh nhất trong ba nơi', 'quietest = yên tĩnh nhất'],
      ]
    }],
    [5, {
      easy: [
        ['It is necessary to bring water.', 'You must ...', 'You must bring water.', 'It is necessary to + V = You must + V', 'bring = mang theo'],
        ['Do not leave rubbish in the forest.', 'You must not ...', 'You must not leave rubbish in the forest.', 'Do not + V = You must not + V', 'rubbish = rác'],
      ], medium: [
        ['There are not many visitors on the island.', 'There are only ...', 'There are only a few visitors on the island.', 'not many + danh từ đếm được = only a few', 'visitors = du khách'],
        ['How much water is in the bottle?', 'How much water does ...?', 'How much water does the bottle have?', 'There is ... in + vật chứa ↔ vật chứa has ...', 'bottle = chai'],
      ], hard: [
        ['Swimming in this river is not allowed.', 'You must not ...', 'You must not swim in this river.', 'is not allowed ↔ must not + động từ nguyên mẫu', 'river = sông'],
        ['There is very little water in the cave.', 'There is not ...', 'There is not much water in the cave.', 'very little + danh từ không đếm được ↔ not much', 'cave = hang động'],
      ]
    }],
    [6, {
      easy: [
        ['It is a good idea to visit your grandparents at Tet.', 'You should ...', 'You should visit your grandparents at Tet.', 'It is a good idea to + V = You should + V', 'grandparents = ông bà'],
        ['Do not eat too many sweets.', 'You should not ...', 'You should not eat too many sweets.', 'lời khuyên phủ định: should not + V', 'sweets = kẹo'],
      ], medium: [
        ['We do not have any flowers.', 'There are not ...', 'There are not any flowers.', 'have no/ not have any ↔ there are not any', 'flowers = hoa'],
        ['It is not a good idea to stay up late at Tet.', 'You should not ...', 'You should not stay up late at Tet.', 'not a good idea ↔ should not', 'stay up late = thức khuya'],
      ], hard: [
        ['We have some gifts for the children.', 'There are ...', 'There are some gifts for the children.', 'have some gifts for ... ↔ There are some gifts for ...', 'gifts = quà'],
        ['Children should be polite to their relatives.', 'It is a good idea ...', 'It is a good idea for children to be polite to their relatives.', 'should + V ↔ It is a good idea for + người + to V', 'polite = lễ phép'],
      ]
    }],
    [7, {
      easy: [
        ['I like cartoons. I like comedies, too.', 'I like cartoons and ...', 'I like cartoons and comedies.', 'and nối hai đối tượng cùng thích', 'cartoons = phim hoạt hình'],
        ['She watches TV at eight o’clock.', 'What time ...?', 'What time does she watch TV?', 'What time + does + chủ ngữ + V?', 'watch TV = xem ti vi'],
      ], medium: [
        ['The film is interesting. It is long.', 'The film is interesting, but ...', 'The film is interesting, but it is long.', 'but nối hai ý tương phản', 'interesting = thú vị'],
        ['I like this programme because it is funny.', 'This programme is funny, so ...', 'This programme is funny, so I like it.', 'because nêu nguyên nhân; so nêu kết quả', 'programme = chương trình'],
      ], hard: [
        ['The cartoon is on at seven o’clock.', 'When ...?', 'When is the cartoon on?', 'When + be + chủ ngữ + on?', 'cartoon = phim hoạt hình'],
        ['My brother watches the news every evening.', 'How often ...?', 'How often does your brother watch the news?', 'How often + does + chủ ngữ số ít + V?', 'news = bản tin'],
      ]
    }],
    [8, {
      easy: [
        ['I played football yesterday.', 'Yesterday, ...', 'Yesterday, I played football.', 'đổi vị trí trạng ngữ thời gian nhưng giữ thì quá khứ', 'yesterday = hôm qua'],
        ['They visited the stadium last week.', 'They went ...', 'They went to the stadium last week.', 'visited + địa điểm = went to + địa điểm', 'stadium = sân vận động'],
      ], medium: [
        ['He lost the race.', 'He was not ...', 'He was not the winner of the race.', 'lost the race ↔ was not the winner', 'race = cuộc đua'],
        ['We visited the gym yesterday.', 'We went ...', 'We went to the gym yesterday.', 'visited + địa điểm ↔ went to + địa điểm', 'gym = phòng tập'],
      ], hard: [
        ['Lan played badminton last Sunday.', 'What ...?', 'What did Lan play last Sunday?', 'What + did + chủ ngữ + V?', 'badminton = cầu lông'],
        ['Their team won the match last night.', 'Which team ...?', 'Which team won the match last night?', 'Which team + động từ quá khứ + tân ngữ?', 'match = trận đấu'],
      ]
    }],
    [9, {
      easy: [
        ['This is my camera.', 'This camera is ...', 'This camera is mine.', 'my + danh từ ↔ mine', 'camera = máy ảnh'],
        ['Those are her photos.', 'Those photos are ...', 'Those photos are hers.', 'her + danh từ ↔ hers', 'photos = ảnh'],
      ], medium: [
        ['The blue suitcase belongs to us.', 'The blue suitcase is ...', 'The blue suitcase is ours.', 'belong to us ↔ ours', 'suitcase = va li'],
        ['This map is not yours. It is mine.', 'This is my ...', 'This is my map, not yours.', 'mine ↔ my + danh từ; yours đứng độc lập', 'map = bản đồ'],
      ], hard: [
        ['These tickets belong to them, not to us.', 'These tickets are ...', 'These tickets are theirs, not ours.', 'belong to them/us ↔ theirs/ours', 'tickets = vé'],
        ['Her hotel is smaller than our hotel.', 'Our hotel is ...', 'Our hotel is bigger than hers.', 'her hotel ↔ hers; đổi chiều so sánh smaller ↔ bigger', 'hotel = khách sạn'],
      ]
    }],
    [10, {
      easy: [
        ['My future house will have a garden.', 'There will be ...', 'There will be a garden at my future house.', 'will have ↔ there will be ... at', 'garden = khu vườn'],
        ['It is possible that robots will cook.', 'Robots might ...', 'Robots might cook.', 'It is possible that ↔ might + V', 'robot = người máy'],
      ], medium: [
        ['Maybe our house will have a big garden.', 'Our house might ...', 'Our house might have a big garden.', 'Maybe ... will ↔ might', 'garden = vườn'],
        ['There will be two robots in my house.', 'My house will ...', 'My house will have two robots.', 'There will be ... in ↔ nơi chốn will have ...', 'robots = người máy'],
      ], hard: [
        ['Perhaps robots will clean our houses in the future.', 'Robots might ...', 'Robots might clean our houses in the future.', 'Perhaps + tương lai ↔ might + V', 'future = tương lai'],
        ['My future house will have a swimming pool.', 'There will be ...', 'There will be a swimming pool in my future house.', 'will have ↔ there will be ... in', 'swimming pool = bể bơi'],
      ]
    }],
    [11, {
      easy: [
        ['If we recycle paper, we will save trees.', 'We will save trees if ...', 'We will save trees if we recycle paper.', 'If + hiện tại đơn, will + V; có thể đảo hai mệnh đề', 'recycle = tái chế'],
        ['Do not throw rubbish on the ground.', 'You should not ...', 'You should not throw rubbish on the ground.', 'lời khuyên phủ định: should not + V', 'throw rubbish = vứt rác'],
      ], medium: [
        ['We will save water if we turn off the tap.', 'If we turn off the tap, ...', 'If we turn off the tap, we will save water.', 'If + hiện tại đơn, will + V', 'tap = vòi nước'],
        ['There is a reusable bottle in my bag.', 'My bag has ...', 'My bag has a reusable bottle in it.', 'there is ... in + vật chứa ↔ vật chứa has ... in it', 'reusable = có thể dùng lại'],
      ], hard: [
        ['If we do not plant trees, the air will be dirty.', 'The air will be ...', 'The air will be dirty if we do not plant trees.', 'If + hiện tại đơn, will + V; đảo hai mệnh đề', 'plant trees = trồng cây'],
        ['Recycle the paper or we will need more trees.', 'If we do not ...', 'If we do not recycle the paper, we will need more trees.', 'mệnh lệnh + or ... ↔ If + phủ định hiện tại, will ...', 'recycle paper = tái chế giấy'],
      ]
    }],
    [12, {
      easy: [
        ['This robot is faster than that robot.', 'That robot is ...', 'That robot is slower than this robot.', 'faster than ↔ slower than', 'fast = nhanh; slow = chậm'],
        ['Robot A is stronger than Robot B.', 'Robot B is ...', 'Robot B is weaker than Robot A.', 'stronger than ↔ weaker than', 'strong = khỏe; weak = yếu'],
      ], medium: [
        ['No robot in the shop is smaller than this one.', 'This is ...', 'This is the smallest robot in the shop.', 'No ... smaller than ↔ the smallest', 'shop = cửa hàng'],
        ['This robot can clean floors and wash dishes.', 'This robot is able ...', 'This robot is able to clean floors and wash dishes.', 'can + V ↔ be able to + V', 'wash dishes = rửa bát'],
      ], hard: [
        ['Robot X is faster than every other robot in the race.', 'Robot X is ...', 'Robot X is the fastest robot in the race.', 'faster than every other ... ↔ the fastest', 'race = cuộc đua'],
        ['No machine in the class is smarter than this robot.', 'This robot is ...', 'This robot is the smartest machine in the class.', 'No ... smarter than ↔ the smartest', 'machine = máy móc'],
      ]
    }]
  ];
  for (const [unit, levels] of groups) {
    for (const [level, items] of Object.entries(levels)) {
      for (const [source, cue, answer, rule, vocab, explain] of items) {
        window.DanhGrade6Grammar.push(rewrite(unit, level, source, cue, answer, rule, vocab, explain));
      }
    }
  }
})();
