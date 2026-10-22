/* Bài luyện gốc của website: 12 Unit, 3 cấp độ, 5 dạng câu hỏi. */
(() => {
  'use strict';
  const groups = [
    { topic: 'Hiện tại đơn · Sở thích', rule: 'He/She/It + V-s/es; câu hỏi dùng do/does + chủ ngữ + V; sau enjoy dùng V-ing.', rows: [
      ['Mai ___ coins every weekend.', 'collects', 'collect', 'collecting'],
      ['We ___ models on Sundays.', 'make', 'makes', 'making'],
      ['My brother ___ cycling.', 'likes', 'like', 'liking'],
      ['I ___ my plants every morning.', 'water', 'waters', 'watering'],
      ['___ your sister enjoy gardening?', 'Does', 'Do', 'Is'],
      ['They do not ___ dolls.', 'collect', 'collects', 'collecting'],
      ['Nam ___ not play chess on weekdays.', 'does', 'do', 'is'],
      ['My father ___ old watches as a hobby.', 'repairs', 'repair', 'repairing'],
      ['Linh enjoys ___ photos of birds.', 'taking', 'take', 'takes'],
      ['My cousin ___ to the craft club every Friday.', 'goes', 'go', 'going'],
      ['How often ___ your friends build models?', 'do', 'does', 'are'],
      ['Making dollhouses ___ a lot of patience.', 'needs', 'need', 'needing']
    ], rewrites: [
      ['Collecting coins is my hobby.', 'Bắt đầu: My hobby', 'My hobby is collecting coins.'],
      ['Gardening is her hobby.', 'Bắt đầu: Her hobby', 'Her hobby is gardening.'],
      ['His hobby is making models.', 'Bắt đầu: Making models', 'Making models is his hobby.'],
      ['Lan likes taking photos.', 'Dùng: enjoys', 'Lan enjoys taking photos.'],
      ['Drawing pictures is what I enjoy.', 'Bắt đầu: I enjoy', 'I enjoy drawing pictures.'],
      ['My brother enjoys building dollhouses.', 'Bắt đầu: Building dollhouses', 'Building dollhouses is what my brother enjoys.']
    ]},
    { topic: 'Câu đơn', rule: 'Câu đơn có một mệnh đề độc lập: chủ ngữ + động từ, có thể thêm tân ngữ hoặc thông tin bổ sung. Chủ ngữ ghép vẫn có thể tạo câu đơn.', rows: [
      ['My sister ___ eight hours every night.', 'sleeps', 'sleep', 'sleeping'],
      ['Fresh vegetables ___ good for us.', 'are', 'is', 'be'],
      ['I ___ water after exercise.', 'drink', 'drinks', 'drinking'],
      ['The children ___ in the park.', 'exercise', 'exercises', 'exercising'],
      ['Lan and Minh ___ breakfast at home.', 'eat', 'eats', 'eating'],
      ['The healthy meal ___ fresh fruit.', 'includes', 'include', 'including'],
      ['My mother ___ a balanced meal every day.', 'cooks', 'cook', 'cooking'],
      ['My eyes ___ tired after a long day.', 'feel', 'feels', 'feeling'],
      ['Eating too many sweets ___ bad for your teeth.', 'is', 'are', 'be'],
      ['The boy with the red cap ___ a bottle of water.', 'has', 'have', 'having'],
      ['My brother and I ___ outdoors every afternoon.', 'play', 'plays', 'playing'],
      ['A balanced diet ___ our bodies stay healthy.', 'helps', 'help', 'helping']
    ], rewrites: [
      ['Lan drinks water. Nam drinks water.', 'Gộp thành một câu đơn, bắt đầu: Lan and Nam', 'Lan and Nam drink water.'],
      ['Mai exercises. Hoa exercises.', 'Gộp thành một câu đơn, bắt đầu: Mai and Hoa', 'Mai and Hoa exercise.'],
      ['My sister eats fruit. My brother eats fruit.', 'Gộp thành một câu đơn, bắt đầu: My sister and my brother', 'My sister and my brother eat fruit.'],
      ['I sleep well. I eat well.', 'Gộp thành một câu đơn, dùng một chủ ngữ I', 'I sleep and eat well.|I eat and sleep well.'],
      ['Lan walks in the park. Minh walks in the park.', 'Gộp thành một câu đơn, bắt đầu: Lan and Minh', 'Lan and Minh walk in the park.'],
      ['My father cooks healthy food. My mother cooks healthy food.', 'Gộp thành một câu đơn, bắt đầu: My father and my mother', 'My father and my mother cook healthy food.']
    ]},
    { topic: 'Quá khứ đơn', rule: 'Việc đã kết thúc trong quá khứ: V-ed hoặc V2. Câu hỏi và phủ định: did/did not + V nguyên mẫu.', rows: [
      ['We ___ the park yesterday.', 'cleaned', 'clean', 'cleaning'],
      ['Mai ___ books to the club last week.', 'donated', 'donates', 'donating'],
      ['The volunteers ___ trees last Sunday.', 'planted', 'plant', 'planting'],
      ['I ___ an older neighbour yesterday.', 'helped', 'help', 'helping'],
      ['We ___ to the nursing home last month.', 'went', 'go', 'going'],
      ['They did not ___ rubbish on the beach.', 'leave', 'left', 'leaving'],
      ['___ Nam join the clean-up last Saturday?', 'Did', 'Does', 'Is'],
      ['She ___ food for the volunteers yesterday.', 'made', 'make', 'making'],
      ['What did your class ___ last weekend?', 'do', 'did', 'doing'],
      ['My friend ___ three bags of rubbish yesterday.', 'collected', 'collect', 'collecting'],
      ['The students ___ tired after the clean-up last night.', 'were', 'are', 'was'],
      ['Linh did not ___ the old clothes away.', 'throw', 'threw', 'throwing']
    ], rewrites: [
      ['Yesterday, we cleaned the park.', 'Đưa Yesterday xuống cuối câu, bắt đầu: We', 'We cleaned the park yesterday.'],
      ['Last week, Mai donated books.', 'Đưa Last week xuống cuối câu, bắt đầu: Mai', 'Mai donated books last week.'],
      ['The volunteers were not late yesterday.', 'Viết lại với dạng rút gọn weren\'t', "The volunteers weren't late yesterday."],
      ['Nam did not join the clean-up.', 'Viết lại với dạng rút gọn didn\'t', "Nam didn't join the clean-up."],
      ['They helped us last month.', 'Bắt đầu: Last month', 'Last month, they helped us.'],
      ['She did not throw the clothes away.', 'Viết lại với dạng rút gọn didn\'t', "She didn't throw the clothes away."]
    ]},
    { topic: 'So sánh: like · different from · as … as', rule: 'Like diễn tả giống; different from diễn tả khác; as + tính từ + as diễn tả ngang bằng; not as … as diễn tả không bằng.', rows: [
      ['Her painting is different ___ mine.', 'from', 'to', 'as'],
      ['This drum is as big ___ that one.', 'as', 'than', 'from'],
      ['My drawing is ___ yours. They look the same.', 'like', 'different', 'as'],
      ['This violin is not as ___ as that one.', 'expensive', 'more expensive', 'expensively'],
      ['The school show was as ___ as the town show.', 'exciting', 'more exciting', 'excitedly'],
      ['His musical style is different ___ hers.', 'from', 'than', 'as'],
      ['This portrait is not ___ colourful as that one.', 'as', 'than', 'from'],
      ['Her voice sounds ___ her mother\'s voice.', 'like', 'as', 'same'],
      ['The new performance is not as ___ as the old one.', 'interesting', 'more interesting', 'interestingly'],
      ['My brother plays the guitar as well ___ his friend.', 'as', 'than', 'from'],
      ['These two paintings are different ___ each other.', 'from', 'as', 'like'],
      ['Our school band is as ___ as theirs.', 'popular', 'more popular', 'popularly']
    ], rewrites: [
      ['The two drums are equally big.', 'Bắt đầu: This drum is as; dùng that drum', 'This drum is as big as that drum.'],
      ['My painting and your painting are different.', 'Bắt đầu: My painting is different', 'My painting is different from your painting.'],
      ['This guitar is cheaper than that guitar.', 'Bắt đầu: This guitar is not as', 'This guitar is not as expensive as that guitar.'],
      ['Her voice and her mother\'s voice sound similar.', 'Bắt đầu: Her voice sounds like', "Her voice sounds like her mother's voice."],
      ['The town show is more exciting than the school show.', 'Bắt đầu: The school show is not as', 'The school show is not as exciting as the town show.'],
      ['The two bands are equally popular.', 'Bắt đầu: This band is as; dùng that band', 'This band is as popular as that band.']
    ]},
    { topic: 'Some · a lot of · lots of', rule: 'Some, a lot of và lots of dùng với danh từ đếm được số nhiều hoặc danh từ không đếm được. How many + danh từ đếm được; how much + danh từ không đếm được.', rows: [
      ['We have some fresh ___ in the fridge.', 'eggs', 'an egg', 'a egg'],
      ['There is ___ rice in the bowl.', 'some', 'many', 'a few'],
      ['She buys ___ vegetables at the market.', 'a lot of', 'a lot', 'much'],
      ['There are lots ___ apples on the table.', 'of', 'to', 'for'],
      ['How ___ flour do we need?', 'much', 'many', 'few'],
      ['How ___ lemons are in the basket?', 'many', 'much', 'little'],
      ['There ___ some milk in the glass.', 'is', 'are', 'be'],
      ['There ___ a lot of noodles in the bowl.', 'are', 'is', 'be'],
      ['We need a lot of ___ for the cakes.', 'flour', 'flours', 'a flour'],
      ['How many ___ does this recipe need?', 'eggs', 'egg', 'an egg'],
      ['Would you like ___ lemonade?', 'some', 'many', 'a few'],
      ['There is lots of ___ in the bottle.', 'water', 'waters', 'a water']
    ], rewrites: [
      ['We have a lot of apples.', 'Dùng: lots of', 'We have lots of apples.'],
      ['There is lots of rice in the pot.', 'Dùng: a lot of', 'There is a lot of rice in the pot.'],
      ['Mai buys lots of vegetables.', 'Dùng: a lot of', 'Mai buys a lot of vegetables.'],
      ['We need a lot of milk.', 'Dùng: lots of', 'We need lots of milk.'],
      ['There are lots of ingredients on the table.', 'Dùng: a lot of', 'There are a lot of ingredients on the table.'],
      ['The recipe uses a lot of flour.', 'Dùng: lots of', 'The recipe uses lots of flour.']
    ]},
    { topic: 'Giới từ thời gian và nơi chốn', rule: 'At + giờ/điểm cụ thể; on + ngày/bề mặt; in + tháng, năm, buổi hoặc bên trong một không gian.', rows: [
      ['The lesson starts ___ seven o\'clock.', 'at', 'in', 'on'],
      ['We visit the school ___ Monday.', 'on', 'at', 'in'],
      ['The new term begins ___ September.', 'in', 'on', 'at'],
      ['The books are ___ the table.', 'on', 'at', 'in'],
      ['Students study ___ the morning.', 'in', 'on', 'at'],
      ['The science club meets ___ Friday afternoon.', 'on', 'in', 'at'],
      ['The picture is ___ the classroom wall.', 'on', 'in', 'at'],
      ['The teacher is standing ___ the school gate.', 'at', 'on', 'in'],
      ['Our school was built ___ 2005.', 'in', 'on', 'at'],
      ['The visit takes place ___ 15 May.', 'on', 'in', 'at'],
      ['We have lunch ___ noon.', 'at', 'in', 'on'],
      ['The pencils are ___ the closed box.', 'in', 'on', 'at']
    ], rewrites: [
      ['At eight o\'clock, the lesson begins.', 'Bắt đầu: The lesson', "The lesson begins at eight o'clock."],
      ['On Tuesday, we visit the library.', 'Bắt đầu: We', 'We visit the library on Tuesday.'],
      ['In September, the new term starts.', 'Bắt đầu: The new term', 'The new term starts in September.'],
      ['On Friday afternoon, the club meets.', 'Bắt đầu: The club', 'The club meets on Friday afternoon.'],
      ['At noon, we eat lunch in the school canteen.', 'Bắt đầu: We', 'We eat lunch in the school canteen at noon.'],
      ['In 2010, our school opened.', 'Bắt đầu: Our school', 'Our school opened in 2010.']
    ]},
    { topic: 'It chỉ khoảng cách · Should / Shouldn\'t', rule: 'It is + khoảng cách + from … to …; How far is it …? Should/shouldn\'t + V nguyên mẫu để khuyên nên/không nên làm.', rows: [
      ['___ is two kilometres from my home to school.', 'It', 'There', 'They'],
      ['You should ___ a helmet on a motorbike.', 'wear', 'wears', 'wearing'],
      ['How ___ is it from here to the bus stop?', 'far', 'many', 'long'],
      ['Drivers should ___ at a red light.', 'stop', 'stops', 'stopping'],
      ['You should not ___ your phone while driving.', 'use', 'uses', 'using'],
      ['It ___ about five kilometres from the park to the station.', 'is', 'are', 'be'],
      ['We should ___ the road at the zebra crossing.', 'cross', 'crosses', 'crossing'],
      ['Passengers should ___ their seat belts.', 'fasten', 'fastens', 'fastening'],
      ['How far ___ it from your house to the cinema?', 'is', 'are', 'does'],
      ['You should not ___ through a red light.', 'go', 'goes', 'going'],
      ['It is three kilometres ___ the school to the library.', 'from', 'at', 'on'],
      ['Cyclists should ___ the traffic rules.', 'follow', 'follows', 'following']
    ], rewrites: [
      ['Wearing a helmet is a good idea.', 'Bắt đầu: You should', 'You should wear a helmet.'],
      ['Using your phone while driving is a bad idea.', 'Bắt đầu: You should not', 'You should not use your phone while driving.'],
      ['The distance from my house to school is two kilometres.', 'Bắt đầu: It is', 'It is two kilometres from my house to school.'],
      ['Crossing at the zebra crossing is a good idea.', 'Bắt đầu: You should', 'You should cross at the zebra crossing.'],
      ['The distance from the station to the park is five kilometres.', 'Bắt đầu: It is', 'It is five kilometres from the station to the park.'],
      ['Driving through a red light is a bad idea.', 'Bắt đầu: You should not', 'You should not drive through a red light.']
    ]},
    { topic: 'Although / though · However', rule: 'Although/though + mệnh đề diễn tả nhượng bộ; không dùng thêm but. However thường nối hai câu và có dấu phẩy theo sau.', rows: [
      ['___ the film was long, we enjoyed it.', 'Although', 'However', 'Despite'],
      ['The film was long. ___, we enjoyed it.', 'However', 'Although', 'Though'],
      ['We liked the film ___ it was quite sad.', 'although', 'however', 'despite'],
      ['The tickets were expensive. ___, we bought them.', 'However', 'Although', 'Though'],
      ['___ the actor was young, he performed well.', 'Though', 'However', 'Despite'],
      ['The cinema was crowded. ___, we found two seats.', 'However', 'Although', 'Though'],
      ['She watched the whole film ___ she was tired.', 'although', 'however', 'despite'],
      ['___ it rained, we went to the cinema.', 'Although', 'However', 'Despite'],
      ['The plot was simple. ___, the acting was excellent.', 'However', 'Although', 'Though'],
      ['___ I had seen the film before, I watched it again.', 'Though', 'However', 'Despite'],
      ['They enjoyed the documentary ___ it was very long.', 'although', 'however', 'despite'],
      ['The film was popular. ___, I did not like it.', 'However', 'Although', 'Though']
    ], rewrites: [
      ['The film was long, but we enjoyed it.', 'Bắt đầu: Although', 'Although the film was long, we enjoyed it.'],
      ['The tickets were expensive, but we bought them.', 'Viết thành hai câu, dùng: However', 'The tickets were expensive. However, we bought them.'],
      ['The actor was young, but he performed well.', 'Bắt đầu: Though', 'Though the actor was young, he performed well.'],
      ['She was tired, but she watched the whole film.', 'Bắt đầu: Although', 'Although she was tired, she watched the whole film.'],
      ['I had seen the film before, but I watched it again.', 'Bắt đầu: Although', 'Although I had seen the film before, I watched it again.'],
      ['The plot was simple, but the acting was excellent.', 'Viết thành hai câu, dùng: However', 'The plot was simple. However, the acting was excellent.']
    ]},
    { topic: 'Câu hỏi Yes / No', rule: 'Đưa be/trợ động từ lên trước chủ ngữ. Do/Does/Did + chủ ngữ + V; Is/Are + chủ ngữ + V-ing; Will + chủ ngữ + V.', rows: [
      ['___ the festival colourful?', 'Is', 'Do', 'Does'],
      ['___ you like lanterns?', 'Do', 'Does', 'Are'],
      ['___ Mai wear a costume every year?', 'Does', 'Do', 'Is'],
      ['___ the children excited?', 'Are', 'Is', 'Do'],
      ['___ you watch the parade yesterday?', 'Did', 'Do', 'Are'],
      ['___ they dancing at the moment?', 'Are', 'Do', 'Does'],
      ['Does your brother ___ a mask?', 'wear', 'wears', 'wearing'],
      ['Did the festival ___ at nine yesterday?', 'start', 'started', 'starting'],
      ['___ the fireworks beautiful last night?', 'Were', 'Are', 'Was'],
      ['___ you visit the festival tomorrow?', 'Will', 'Did', 'Are'],
      ['Is Mai ___ a lantern now?', 'making', 'make', 'makes'],
      ['Did your family ___ a feast last weekend?', 'prepare', 'prepared', 'preparing']
    ], rewrites: [
      ['Is the festival not colourful?', 'Viết câu hỏi với dạng rút gọn Isn\'t', "Isn't the festival colourful?"],
      ['Do you enjoy the parade?', 'Dùng: like thay cho enjoy', 'Do you like the parade?'],
      ['Did Mai enjoy the festival?', 'Dùng: like thay cho enjoy', 'Did Mai like the festival?'],
      ['Does your brother like making masks?', 'Dùng: enjoy thay cho like', 'Does your brother enjoy making masks?'],
      ['Will they not join the parade?', 'Viết câu hỏi với dạng rút gọn Won\'t', "Won't they join the parade?"],
      ['Are the children not wearing costumes?', 'Viết câu hỏi với dạng rút gọn Aren\'t', "Aren't the children wearing costumes?"]
    ]},
    { topic: 'Hiện tại tiếp diễn', rule: 'am/is/are + V-ing: hành động đang diễn ra. Câu hỏi đảo am/is/are; phủ định thêm not sau be.', rows: [
      ['They ___ installing solar panels now.', 'are', 'is', 'am'],
      ['She is ___ off the lights now.', 'turning', 'turn', 'turns'],
      ['I ___ studying wind energy at the moment.', 'am', 'is', 'are'],
      ['The workers ___ repairing the turbine now.', 'are', 'is', 'am'],
      ['___ he checking the light bulbs now?', 'Is', 'Does', 'Do'],
      ['We are not ___ electricity at the moment.', 'wasting', 'waste', 'wastes'],
      ['My father ___ reading about solar energy now.', 'is', 'are', 'am'],
      ['Look! The turbine is ___ in the wind.', 'turning', 'turn', 'turns'],
      ['What ___ the engineers doing at the moment?', 'are', 'is', 'do'],
      ['The students are ___ an energy-saving poster now.', 'making', 'make', 'makes'],
      ['Listen! The scientist ___ explaining the plan.', 'is', 'are', 'am'],
      ['They are ___ new batteries this week.', 'developing', 'develop', 'develops']
    ], rewrites: [
      ['They are not wasting electricity now.', 'Dùng dạng rút gọn aren\'t', "They aren't wasting electricity now."],
      ['She is not using the computer now.', 'Dùng dạng rút gọn isn\'t', "She isn't using the computer now."],
      ['At the moment, we are studying solar energy.', 'Bắt đầu: We', 'We are studying solar energy at the moment.'],
      ['I am turning off the lights now.', 'Dùng dạng rút gọn I\'m', "I'm turning off the lights now."],
      ['The engineers are not repairing the turbine now.', 'Dùng dạng rút gọn aren\'t', "The engineers aren't repairing the turbine now."],
      ['Now, the scientist is explaining the plan.', 'Bắt đầu: The scientist', 'The scientist is explaining the plan now.']
    ]},
    { topic: 'Tương lai đơn · Đại từ sở hữu', rule: 'Will/won\'t + V nguyên mẫu. Đại từ sở hữu mine/yours/his/hers/ours/theirs đứng độc lập, không thêm danh từ phía sau.', rows: [
      ['We will ___ by electric bus tomorrow.', 'travel', 'travels', 'travelling'],
      ['This bike belongs to me. It is ___.', 'mine', 'my', 'me'],
      ['That helmet belongs to Lan. It is ___.', 'hers', 'her', 'she'],
      ['People will ___ driverless cars in the future.', 'use', 'uses', 'using'],
      ['These tickets belong to us. They are ___.', 'ours', 'our', 'us'],
      ['___ you take the train tomorrow?', 'Will', 'Did', 'Are'],
      ['The blue car belongs to them. It is ___.', 'theirs', 'their', 'them'],
      ['Nam will not ___ his bike at home tomorrow.', 'leave', 'leaves', 'leaving'],
      ['Your bike is red, but ___ is blue. (xe của tôi)', 'mine', 'my', 'me'],
      ['Those bags belong to you. They are ___.', 'yours', 'your', 'you'],
      ['Will the new train ___ less electricity?', 'use', 'uses', 'using'],
      ['This helmet belongs to Minh. It is ___.', 'his', 'him', 'he']
    ], rewrites: [
      ['This bike belongs to me.', 'Bắt đầu: This bike is', 'This bike is mine.'],
      ['That helmet belongs to her.', 'Bắt đầu: That helmet is', 'That helmet is hers.'],
      ['These tickets belong to us.', 'Bắt đầu: These tickets are', 'These tickets are ours.'],
      ['We will not travel by car tomorrow.', 'Dùng dạng rút gọn won\'t', "We won't travel by car tomorrow."],
      ['The blue car belongs to them.', 'Bắt đầu: The blue car is', 'The blue car is theirs.'],
      ['Nam will not leave his bike at home tomorrow.', 'Dùng dạng rút gọn won\'t', "Nam won't leave his bike at home tomorrow."]
    ]},
    { topic: 'Mạo từ a / an / the', rule: 'A/an chỉ một đối tượng chưa xác định, chọn theo âm đầu. The chỉ đối tượng đã xác định, vật duy nhất hoặc các tên riêng cần the.', rows: [
      ['I saw ___ kangaroo at the zoo.', 'a', 'an', 'the'],
      ['She has ___ umbrella in her bag.', 'an', 'a', 'the'],
      ['___ sun is bright today.', 'The', 'A', 'An'],
      ['He is ___ English teacher.', 'an', 'a', 'the'],
      ['We visited ___ United Kingdom last year.', 'the', 'a', 'an'],
      ['I bought a book. ___ book is about Canada.', 'The', 'A', 'An'],
      ['There is ___ old castle on the hill.', 'an', 'a', 'the'],
      ['She is ___ university student.', 'a', 'an', 'the'],
      ['We waited for ___ hour before the tour.', 'an', 'a', 'the'],
      ['The Thames is ___ river in England.', 'a', 'an', 'the'],
      ['They visited ___ United States last summer.', 'the', 'a', 'an'],
      ['We stayed at a hotel. ___ hotel was near the coast.', 'The', 'A', 'An']
    ], rewrites: [
      ['I saw one kangaroo at the zoo.', 'Thay one bằng mạo từ phù hợp', 'I saw a kangaroo at the zoo.'],
      ['She bought one umbrella.', 'Thay one bằng mạo từ phù hợp', 'She bought an umbrella.'],
      ['We visited one old castle.', 'Thay one bằng mạo từ phù hợp', 'We visited an old castle.'],
      ['He is one university student in our group.', 'Thay one bằng mạo từ phù hợp', 'He is a university student in our group.'],
      ['We waited for one hour.', 'Thay one bằng mạo từ phù hợp', 'We waited for an hour.'],
      ['It is one useful guide to Australia.', 'Thay one bằng mạo từ phù hợp', 'It is a useful guide to Australia.']
    ]}
  ];
  const levels = ['easy', 'medium', 'hard'];
  const questions = [];
  groups.forEach((group, index) => {
    const unit = index + 1;
    levels.forEach((level, levelIndex) => {
      const add = item => questions.push({ id: `g7-u${unit}-${level}-${questions.length + 1}`, unit, level, topic: group.topic, rule: group.rule, ...item });
      const rows = group.rows.slice(levelIndex * 4, levelIndex * 4 + 4);
      rows.forEach(([prompt, answer, wrong1, wrong2]) => {
        const complete = prompt.replace('___', answer).replace(/ \([^)]*\)$/, '');
        const articleNote = unit === 12 && /^(a|an)$/i.test(answer) ? ' (Giới thiệu một đối tượng chưa xác định; chọn a hoặc an.)' : '';
        const explain = `${group.rule} Câu đúng: ${complete}`;
        add({ type: 'choice', prompt: prompt + articleNote, answer, options: [wrong1, answer, wrong2], explain });
        const alternatives = unit === 8 && /^(although|though)$/i.test(answer) ? 'although|though' : answer;
        add({ type: 'fill', prompt: `${prompt}${articleNote} (Điền dạng đúng; gợi ý: ${[answer, wrong1, wrong2].join(' / ')}.)`, answer: alternatives, explain });
      });
      const [orderPrompt, orderAnswer] = rows[3];
      const sentence = orderPrompt.replace('___', orderAnswer);
      add({ type: 'order', prompt: 'Sắp xếp các từ thành câu đúng.', parts: sentence.split(' '), answer: sentence, explain: group.rule });
      const [errorPrompt, corrected, error] = rows[0];
      add({ type: 'correct', prompt: `Sửa lỗi và viết lại cả câu: ${errorPrompt.replace('___', error).replace(/ \([^)]*\)$/, '')}`, answer: errorPrompt.replace('___', corrected).replace(/ \([^)]*\)$/, ''), explain: group.rule });
      group.rewrites.slice(levelIndex * 2, levelIndex * 2 + 2).forEach(([source, cue, answer]) => {
        add({ type: 'rewrite', prompt: 'Viết lại câu theo yêu cầu, giữ nguyên nghĩa.', source, cue, answer, explain: group.rule });
      });
    });
  });
  window.DanhGrade7Grammar = questions;
  window.DanhGrade7GrammarHints = Object.fromEntries(window.DanhGrade7Units.map(unit => [unit.number, Object.fromEntries(unit.words.map(word => [word.term, word.meaning]))]));
})();
