/* Original topic-based practice for Global Success 4 Units 5–20. */
(() => {
  'use strict';
  const palette = ['#28698e', '#9b5b85', '#53824e', '#ac713d', '#586da5', '#a35c55'];
  const picture = emoji => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="22" fill="#eef6f8"/><circle cx="60" cy="60" r="48" fill="#fff"/><text x="60" y="81" text-anchor="middle" font-family="Arial, sans-serif" font-size="62">${emoji}</text></svg>`;
  const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const appearance = name => {
    const face = '<circle cx="60" cy="66" r="30" fill="#f6c9a2" stroke="#b77c5b" stroke-width="2"/><circle cx="49" cy="66" r="2" fill="#26384a"/><circle cx="71" cy="66" r="2" fill="#26384a"/><path d="M52 81q8 7 16 0" fill="none" stroke="#9b594f" stroke-width="2"/>';
    const details = {
      'curly hair': '<g fill="#5b342b">' + [32,43,54,65,76,87].map(x => `<circle cx="${x}" cy="42" r="10"/>`).join('') + '</g>',
      'straight hair': '<path d="M28 49q0-37 32-37t32 37v42h-12V48q-20-19-40 0v43H28Z" fill="#4f3630"/>',
      'glasses': '<g fill="none" stroke="#315e89" stroke-width="4"><circle cx="49" cy="66" r="11"/><circle cx="71" cy="66" r="11"/><path d="M60 63h0M38 63l-9-5m53 5 9-5"/></g>',
      'blond hair': '<path d="M29 56q-2-43 31-43t31 43q-10-23-24-20-21 18-38 20Z" fill="#e9bd42" stroke="#c49733" stroke-width="2"/>',
      beard: '<path d="M34 75q4 34 26 35t26-35q-9 23-26 24T34 75Z" fill="#633e30"/>',
      freckles: '<g fill="#a86b4d"><circle cx="39" cy="74" r="2"/><circle cx="45" cy="76" r="2"/><circle cx="50" cy="74" r="2"/><circle cx="70" cy="74" r="2"/><circle cx="76" cy="76" r="2"/><circle cx="81" cy="74" r="2"/></g>'
    };
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" rx="22" fill="#eef6f8"/>${name === 'straight hair' ? details[name] : ''}${face}${name === 'straight hair' ? '' : details[name]}</svg>`;
  };

  const specs = [
    {
      title: 'Things we can do', subtitle: 'Những việc chúng ta có thể làm', focus: 'Nói về khả năng của bản thân và bạn bè.',
      patterns: [['Can you swim?', 'Yes, I can.', 'Hỏi về khả năng.'], ['Can she ride a bike?', 'No, she cannot.', 'Hỏi về khả năng của bạn.']],
      words: [
        ['swim','bơi','/swɪm/','🏊','I can ____ across the pool.'],
        ['ride a bike','đi xe đạp','/raɪd ə baɪk/','🚴','I can ____ in the park.'],
        ['draw','vẽ','/drɔː/','🎨','I can ____ a picture of my family.'],
        ['sing','hát','/sɪŋ/','🎤','I can ____ a song for my friends.'],
        ['dance','nhảy múa','/dɑːns/','💃','I can ____ to the music.'],
        ['play the piano','chơi đàn piano','/pleɪ ðə piˈæn.əʊ/','🎹','I can ____ at home.']
      ]
    },
    {
      title: 'Our school facilities', subtitle: 'Các phòng và nơi chốn trong trường', focus: 'Gọi tên các khu vực ở trường và nói vị trí của chúng.',
      patterns: [['Where is the library?', 'It is next to the classroom.', 'Hỏi vị trí một phòng.'], ['Is there a playground?', 'Yes, there is.', 'Hỏi về cơ sở vật chất.']],
      words: [
        ['classroom','lớp học','/ˈklɑːs.ruːm/','🏫','We study in the ____.'],
        ['library','thư viện','/ˈlaɪ.brər.i/','📚','I borrow books from the ____.'],
        ['playground','sân chơi','/ˈpleɪ.ɡraʊnd/','🛝','We play on the ____ after class.'],
        ['computer room','phòng máy tính','/kəmˈpjuː.tə ruːm/','💻','We use computers in the ____.'],
        ['music room','phòng âm nhạc','/ˈmjuː.zɪk ruːm/','🎼','We sing songs in the ____.'],
        ['gym','phòng thể chất','/dʒɪm/','🏀','We play basketball in the ____.']
      ]
    },
    {
      title: 'Our timetables', subtitle: 'Thời khóa biểu của chúng em', focus: 'Hỏi và nói các môn học trong thời khóa biểu.',
      patterns: [['What subjects do you have today?', 'I have Maths and English.', 'Hỏi môn học hôm nay.'], ['When do you have Music?', 'I have Music on Friday.', 'Hỏi ngày có một môn học.']],
      words: [
        ['Maths','môn Toán','/mæθs/','➗','I have ____ on Monday. We learn numbers.'],
        ['English','môn Tiếng Anh','/ˈɪŋ.ɡlɪʃ/','🔤','I have ____ on Tuesday. We learn new words.'],
        ['Music','môn Âm nhạc','/ˈmjuː.zɪk/','🎵','I have ____ on Wednesday. We sing songs.'],
        ['Art','môn Mĩ thuật','/ɑːt/','🖌️','I have ____ on Thursday. We paint pictures.'],
        ['Science','môn Khoa học','/ˈsaɪ.əns/','🔬','I have ____ on Friday. We learn about plants.'],
        ['PE','môn Thể dục','/ˌpiː ˈiː/','⚽','I have ____ in the gym. We play sports.']
      ]
    },
    {
      title: 'My favourite subjects', subtitle: 'Những môn học yêu thích', focus: 'Nói môn học mình thích và lý do.',
      patterns: [['What is your favourite subject?', 'My favourite subject is Art.', 'Hỏi môn học yêu thích.'], ['Why do you like Science?', 'Because I like learning about animals.', 'Nói lý do yêu thích.']],
      words: [
        ['Art','môn Mĩ thuật','/ɑːt/','🎨','My favourite subject is ____. I like painting.'],
        ['Music','môn Âm nhạc','/ˈmjuː.zɪk/','🎺','I like ____ because I love singing.'],
        ['Science','môn Khoa học','/ˈsaɪ.əns/','🧪','I like ____ because I enjoy experiments.'],
        ['Maths','môn Toán','/mæθs/','🧮','I like ____ because I enjoy numbers.'],
        ['English','môn Tiếng Anh','/ˈɪŋ.ɡlɪʃ/','📖','I like ____ because I enjoy new words.'],
        ['PE','môn Thể dục','/ˌpiː ˈiː/','🏃','I like ____ because I enjoy running.']
      ]
    },
    {
      title: 'Our sports day', subtitle: 'Ngày hội thể thao của chúng em', focus: 'Nói về môn thể thao và hoạt động trong ngày hội.',
      patterns: [['When is your sports day?', 'It is on Friday.', 'Hỏi ngày tổ chức.'], ['What sport do you play?', 'I play badminton.', 'Hỏi môn thể thao.']],
      words: [
        ['football','bóng đá','/ˈfʊt.bɔːl/','⚽','We play ____ on the school field.'],
        ['badminton','cầu lông','/ˈbæd.mɪn.tən/','🏸','I play ____ with a racket.'],
        ['basketball','bóng rổ','/ˈbɑː.skɪt.bɔːl/','🏀','We throw the ball into a hoop in ____.'],
        ['table tennis','bóng bàn','/ˈteɪ.bəl ˌten.ɪs/','🏓','I play ____ with a small bat.'],
        ['running','chạy bộ','/ˈrʌn.ɪŋ/','🏃','I enjoy ____ in the race.'],
        ['swimming','bơi lội','/ˈswɪm.ɪŋ/','🏊','I practise ____ in the pool.']
      ]
    },
    {
      title: 'Our summer holidays', subtitle: 'Kỳ nghỉ hè của chúng em', focus: 'Nói về nơi đến và hoạt động trong kỳ nghỉ hè.',
      patterns: [['Where did you go last summer?', 'I went to the beach.', 'Kể nơi đã đến.'], ['What did you do there?', 'I swam in the sea.', 'Kể hoạt động đã làm.']],
      words: [
        ['beach','bãi biển','/biːtʃ/','🏖️','We built sandcastles on the ____.'],
        ['mountains','núi','/ˈmaʊn.tɪnz/','🏔️','We walked in the ____.'],
        ['island','hòn đảo','/ˈaɪ.lənd/','🏝️','We took a boat to the ____.'],
        ['museum','bảo tàng','/mjuːˈziː.əm/','🏛️','We saw old objects at the ____.'],
        ['camping','cắm trại','/ˈkæm.pɪŋ/','⛺','We went ____ beside the lake.'],
        ['sightseeing','tham quan','/ˈsaɪtˌsiː.ɪŋ/','📸','We went ____ around the city.']
      ]
    },
    {
      title: 'My home', subtitle: 'Ngôi nhà của em', focus: 'Giới thiệu các phòng và đồ vật trong nhà.',
      patterns: [['Is there a kitchen in your home?', 'Yes, there is.', 'Hỏi về một phòng trong nhà.'], ['Where is the sofa?', 'It is in the living room.', 'Hỏi vị trí đồ vật.']],
      words: [
        ['living room','phòng khách','/ˈlɪv.ɪŋ ruːm/','🛋️','We watch TV in the ____.'],
        ['bedroom','phòng ngủ','/ˈbed.ruːm/','🛏️','I sleep in my ____.'],
        ['kitchen','nhà bếp','/ˈkɪtʃ.ən/','🍳','My father cooks in the ____.'],
        ['bathroom','phòng tắm','/ˈbɑːθ.ruːm/','🛁','I brush my teeth in the ____.'],
        ['garden','khu vườn','/ˈɡɑː.dən/','🌻','We grow flowers in the ____.'],
        ['balcony','ban công','/ˈbæl.kə.ni/','🏡','I can see the street from the ____.']
      ]
    },
    {
      title: 'Jobs', subtitle: 'Nghề nghiệp', focus: 'Hỏi và nói về công việc của người thân.',
      patterns: [['What does your mother do?', 'She is a doctor.', 'Hỏi nghề nghiệp của người thân.'], ['Where does a teacher work?', 'A teacher works at school.', 'Nói nơi làm việc.']],
      words: [
        ['teacher','giáo viên','/ˈtiː.tʃə/','👩‍🏫','A ____ teaches children at school.'],
        ['doctor','bác sĩ','/ˈdɒk.tə/','👨‍⚕️','A ____ helps sick people.'],
        ['farmer','nông dân','/ˈfɑː.mə/','👩‍🌾','A ____ grows crops on a farm.'],
        ['firefighter','lính cứu hỏa','/ˈfaɪəˌfaɪ.tə/','👩‍🚒','A ____ puts out fires.'],
        ['chef','đầu bếp','/ʃef/','👨‍🍳','A ____ cooks meals in a restaurant.'],
        ['pilot','phi công','/ˈpaɪ.lət/','👩‍✈️','A ____ flies an aeroplane.']
      ]
    },
    {
      title: 'Appearance', subtitle: 'Ngoại hình', focus: 'Miêu tả một vài đặc điểm dễ nhận thấy.',
      patterns: [['What does she look like?', 'She has curly hair.', 'Hỏi và tả ngoại hình.'], ['Does he wear glasses?', 'Yes, he does.', 'Hỏi về một đặc điểm.']],
      words: [
        ['curly hair','tóc xoăn','/ˈkɜː.li heə/','👩‍🦱','She has ____. Her hair forms curls.'],
        ['straight hair','tóc thẳng','/streɪt heə/','👩','She has ____. Her hair is not curly.'],
        ['glasses','kính mắt','/ˈɡlɑː.sɪz/','👓','He wears ____ to read.'],
        ['blond hair','tóc vàng','/blɒnd heə/','👱','My friend has ____. It is yellow.'],
        ['beard','râu quai nón','/bɪəd/','🧔','My uncle has a ____ on his chin.'],
        ['freckles','tàn nhang','/ˈfrek.əlz/','🧑‍🦰','She has small brown ____ on her face.']
      ]
    },
    {
      title: 'Daily activities', subtitle: 'Hoạt động hằng ngày', focus: 'Kể các việc làm vào một ngày bình thường.',
      patterns: [['What do you do in the morning?', 'I brush my teeth.', 'Hỏi hoạt động buổi sáng.'], ['When do you do your homework?', 'I do it after school.', 'Hỏi thời điểm làm việc.']],
      words: [
        ['brush my teeth','đánh răng','/brʌʃ maɪ tiːθ/','🪥','Every morning, I ____ before breakfast.'],
        ['wash my face','rửa mặt','/wɒʃ maɪ feɪs/','🧼','After I get up, I ____.'],
        ['have breakfast','ăn sáng','/hæv ˈbrek.fəst/','🥣','I ____ before going to school.'],
        ['do homework','làm bài tập về nhà','/duː ˈhəʊm.wɜːk/','✏️','After school, I ____ at my desk.'],
        ['take a shower','tắm vòi sen','/teɪk ə ˈʃaʊ.ə/','🚿','In the evening, I ____ before bed.'],
        ['go to bed','đi ngủ','/ɡəʊ tə bed/','🛏️','At nine o’clock, I ____.']
      ]
    },
    {
      title: "My family's weekends", subtitle: 'Cuối tuần của gia đình em', focus: 'Kể những hoạt động làm cùng gia đình vào cuối tuần.',
      patterns: [['What does your family do at weekends?', 'We visit our grandparents.', 'Hỏi hoạt động cuối tuần.'], ['Where do you go on Sundays?', 'We go to the park.', 'Hỏi nơi đến cuối tuần.']],
      words: [
        ['visit grandparents','thăm ông bà','/ˈvɪz.ɪt ˈɡræn.peə.rənts/','👵','On Sunday, we ____ at their house.'],
        ['go shopping','đi mua sắm','/ɡəʊ ˈʃɒp.ɪŋ/','🛍️','At the weekend, we ____ at the market.'],
        ['have a picnic','đi dã ngoại','/hæv ə ˈpɪk.nɪk/','🧺','On Saturday, we ____ in the park.'],
        ['watch a film','xem phim','/wɒtʃ ə fɪlm/','🎬','We ____ together at the cinema.'],
        ['cook dinner','nấu bữa tối','/kʊk ˈdɪn.ə/','🍲','My family and I ____ together.'],
        ['play games','chơi trò chơi','/pleɪ ɡeɪmz/','🎲','We ____ around the table.']
      ]
    },
    {
      title: 'Weather', subtitle: 'Thời tiết', focus: 'Hỏi và miêu tả thời tiết; chọn hoạt động phù hợp.',
      patterns: [['What is the weather like today?', 'It is sunny.', 'Hỏi thời tiết hôm nay.'], ['What do you do when it rains?', 'I stay inside.', 'Nói hoạt động theo thời tiết.']],
      words: [
        ['sunny','có nắng','/ˈsʌn.i/','☀️','It is ____ today. The sun is bright.'],
        ['rainy','có mưa','/ˈreɪ.ni/','🌧️','It is ____. Take an umbrella.'],
        ['cloudy','nhiều mây','/ˈklaʊ.di/','☁️','It is ____. There are many clouds.'],
        ['windy','nhiều gió','/ˈwɪn.di/','🌬️','It is ____. The trees are moving.'],
        ['snowy','có tuyết','/ˈsnəʊ.i/','❄️','It is ____. Snow is falling.'],
        ['stormy','có bão','/ˈstɔː.mi/','⛈️','It is ____. We can hear thunder.']
      ]
    },
    {
      title: 'In the city', subtitle: 'Trong thành phố', focus: 'Gọi tên địa điểm trong thành phố và hỏi đường.',
      patterns: [['Where is the hospital?', 'It is next to the bank.', 'Hỏi vị trí địa điểm.'], ['How do I get to the park?', 'Go straight and turn left.', 'Hỏi và chỉ đường.']],
      words: [
        ['hospital','bệnh viện','/ˈhɒs.pɪ.təl/','🏥','A doctor works at the ____.'],
        ['post office','bưu điện','/ˈpəʊst ˌɒf.ɪs/','📮','I send letters at the ____.'],
        ['cinema','rạp chiếu phim','/ˈsɪn.ə.mə/','🎞️','We watch a film at the ____.'],
        ['park','công viên','/pɑːk/','🌳','We walk under the trees in the ____.'],
        ['supermarket','siêu thị','/ˈsuː.pəˌmɑː.kɪt/','🛒','We buy food at the ____.'],
        ['bus stop','trạm xe buýt','/ˈbʌs stɒp/','🚏','We wait for the bus at the ____.']
      ]
    },
    {
      title: 'At the shopping centre', subtitle: 'Tại trung tâm mua sắm', focus: 'Hỏi giá và nói món đồ muốn mua.',
      patterns: [['How much is this T-shirt?', 'It is fifty thousand dong.', 'Hỏi giá một món đồ.'], ['What do you want to buy?', 'I want to buy a pair of shoes.', 'Nói món đồ muốn mua.']],
      words: [
        ['T-shirt','áo phông','/ˈtiː.ʃɜːt/','👕','I want to buy a blue ____.'],
        ['dress','váy liền','/dres/','👗','She wants to buy a red ____.'],
        ['shoes','giày','/ʃuːz/','👟','I need new ____ for school.'],
        ['hat','mũ','/hæt/','🧢','He buys a ____ to wear in the sun.'],
        ['bag','túi xách','/bæɡ/','👜','She carries her books in a ____.'],
        ['watch','đồng hồ đeo tay','/wɒtʃ/','⌚','I wear a ____ on my wrist.']
      ]
    },
    {
      title: 'The animal world', subtitle: 'Thế giới động vật', focus: 'Gọi tên động vật và miêu tả chúng.',
      patterns: [['What animal is it?', 'It is a giraffe.', 'Hỏi tên con vật.'], ['What can a bird do?', 'It can fly.', 'Nói khả năng của con vật.']],
      words: [
        ['elephant','voi','/ˈel.ɪ.fənt/','🐘','An ____ has a long trunk.'],
        ['giraffe','hươu cao cổ','/dʒɪˈrɑːf/','🦒','A ____ has a very long neck.'],
        ['dolphin','cá heo','/ˈdɒl.fɪn/','🐬','A ____ swims in the sea.'],
        ['parrot','vẹt','/ˈpær.ət/','🦜','A ____ is a colourful bird.'],
        ['turtle','rùa','/ˈtɜː.təl/','🐢','A ____ has a shell.'],
        ['butterfly','bướm','/ˈbʌt.ə.flaɪ/','🦋','A ____ has colourful wings.']
      ]
    },
    {
      title: 'At summer camp', subtitle: 'Ở trại hè', focus: 'Nói về những hoạt động ở trại hè.',
      patterns: [['What are you doing?', 'I am making a kite.', 'Hỏi hoạt động đang diễn ra.'], ['Are they singing?', 'Yes, they are.', 'Hỏi hoạt động của nhóm bạn.']],
      words: [
        ['make a kite','làm diều','/meɪk ə kaɪt/','🪁','At camp, we ____ with paper and sticks.'],
        ['pitch a tent','dựng lều','/pɪtʃ ə tent/','⛺','We ____ before sleeping outside.'],
        ['tell stories','kể chuyện','/tel ˈstɔː.riz/','📖','At night, we ____ around the campfire.'],
        ['sing songs','hát các bài hát','/sɪŋ sɒŋz/','🎶','We ____ together at camp.'],
        ['take photos','chụp ảnh','/teɪk ˈfəʊ.təʊz/','📷','We ____ of our new friends.'],
        ['play games','chơi trò chơi','/pleɪ ɡeɪmz/','🎯','We ____ together in the afternoon.']
      ]
    }
  ];
  for (const [index, spec] of specs.entries()) {
    const number = index + 5;
    const id = `unit${number}`;
    window.DanhGrade4Units[id] = {
      id, number, title: spec.title, subtitle: spec.subtitle, focus: spec.focus,
      patterns: spec.patterns.map(([question, answer, note]) => ({ question, answer, note })),
      words: spec.words.map(([name, meaning, ipa, emoji, context], position) => ({
        id: slug(name), name, meaning, ipa, color: palette[position], visual: number === 13 ? appearance(name) : picture(emoji), context
      }))
    };
  }
})();
