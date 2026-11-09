/* Từ và cụm từ mở rộng được biên soạn theo nội dung Unit lớp 1–5. */
(() => {
  'use strict';

  const unitWords = {
    1: [
      [['hi', 'chào'], ['bye', 'tạm biệt'], ['see you', 'hẹn gặp lại']],
      [['ruler', 'thước kẻ'], ['eraser', 'cục tẩy'], ['notebook', 'vở ghi']],
      [['black', 'màu đen'], ['white', 'màu trắng'], ['pink', 'màu hồng']],
      [['five', 'số năm'], ['six', 'số sáu'], ['seven', 'số bảy']],
      [['baby', 'em bé'], ['grandma', 'bà'], ['grandpa', 'ông']],
      [['hair', 'tóc'], ['chin', 'cằm'], ['cheek', 'má']],
      [['rabbit', 'con thỏ'], ['hamster', 'chuột hamster'], ['turtle', 'con rùa']],
      [['teddy bear', 'gấu bông'], ['train', 'tàu hỏa đồ chơi'], ['robot', 'rô-bốt đồ chơi']],
      [['pear', 'quả lê'], ['mango', 'quả xoài'], ['peach', 'quả đào']],
      [['yogurt', 'sữa chua'], ['juice', 'nước ép'], ['cracker', 'bánh quy giòn']],
      [['lamp', 'đèn bàn'], ['pillow', 'gối'], ['window', 'cửa sổ']],
      [['socks', 'đôi tất'], ['coat', 'áo khoác'], ['shorts', 'quần đùi']],
      [['walk', 'đi bộ'], ['clap', 'vỗ tay'], ['hop', 'nhảy lò cò']],
      [['goat', 'con dê'], ['sheep', 'con cừu'], ['horse', 'con ngựa']],
      [['cloud', 'đám mây'], ['leaf', 'chiếc lá'], ['grass', 'cỏ']],
      [['tall', 'cao'], ['short', 'thấp'], ['quiet', 'yên tĩnh']],
    ],
    2: [
      [['party', 'bữa tiệc'], ['pie', 'bánh nướng có nhân'], ['pear', 'quả lê']],
      [['key', 'chìa khóa'], ['slide', 'cầu trượt'], ['fence', 'hàng rào']],
      [['shell', 'vỏ sò'], ['sandcastle', 'lâu đài cát'], ['seagull', 'chim mòng biển']],
      [['rice field', 'cánh đồng lúa'], ['bridge', 'cây cầu'], ['hill', 'ngọn đồi']],
      [['answer', 'câu trả lời'], ['whiteboard', 'bảng trắng'], ['marker', 'bút viết bảng']],
      [['hen', 'gà mái'], ['goat', 'con dê'], ['barn', 'nhà kho ở trang trại']],
      [['jar', 'lọ'], ['jug', 'bình có quai'], ['spoon', 'cái thìa']],
      [['vet', 'bác sĩ thú y'], ['market', 'chợ'], ['garden', 'khu vườn']],
      [['basket', 'giỏ mua hàng'], ['bag of rice', 'túi gạo'], ['bottle of milk', 'chai sữa']],
      [['zookeeper', 'người chăm sóc thú trong sở thú'], ['zoo map', 'bản đồ sở thú'], ['giraffe', 'hươu cao cổ']],
      [['swing', 'xích đu'], ['seesaw', 'bập bênh'], ['skip rope', 'nhảy dây']],
      [['menu', 'thực đơn'], ['tray', 'cái khay'], ['teacup', 'tách trà']],
      [['twelve', 'số mười hai'], ['sixteen', 'số mười sáu'], ['plus', 'cộng']],
      [['grandfather', 'ông'], ['aunt', 'cô hoặc dì'], ['uncle', 'chú hoặc cậu']],
      [['try on', 'mặc hoặc đi thử'], ['jacket', 'áo khoác'], ['sandals', 'dép quai hậu']],
      [['torch', 'đèn pin'], ['sleeping bag', 'túi ngủ'], ['campfire', 'lửa trại']],
    ],
    3: [
      [['good morning', 'chào buổi sáng'], ['nice to meet you', 'rất vui được gặp bạn'], ['see you tomorrow', 'hẹn gặp lại ngày mai']],
      [['first name', 'tên riêng'], ['surname', 'họ'], ['spell', 'đánh vần']],
      [['classmate', 'bạn cùng lớp'], ['best friend', 'bạn thân nhất'], ['new student', 'học sinh mới']],
      [['shoulder', 'vai'], ['elbow', 'khuỷu tay'], ['knee', 'đầu gối']],
      [['painting', 'vẽ bằng màu'], ['reading comics', 'đọc truyện tranh'], ['taking photos', 'chụp ảnh']],
      [['school gate', 'cổng trường'], ['school hall', 'hội trường'], ['computer room', 'phòng máy tính']],
      [['look at the board', 'nhìn lên bảng'], ['raise your hand', 'giơ tay'], ['work in pairs', 'làm việc theo cặp']],
      [['pencil case', 'hộp bút'], ['sharpener', 'gọt bút chì'], ['glue stick', 'keo dán dạng thỏi']],
      [['purple', 'màu tím'], ['brown', 'màu nâu'], ['grey', 'màu xám']],
      [['skip rope', 'nhảy dây'], ['play tag', 'chơi đuổi bắt'], ['take turns', 'chơi lần lượt']],
      [['cousin', 'anh, chị hoặc em họ'], ['twins', 'hai anh, chị hoặc em sinh đôi'], ['family photo', 'ảnh gia đình']],
      [['nurse', 'y tá'], ['mechanic', 'thợ sửa máy hoặc xe'], ['bus driver', 'tài xế xe buýt']],
      [['hallway', 'hành lang'], ['dining room', 'phòng ăn'], ['upstairs', 'ở tầng trên']],
      [['wardrobe', 'tủ quần áo'], ['bookshelf', 'kệ sách'], ['desk lamp', 'đèn bàn học']],
      [['chopsticks', 'đôi đũa'], ['bowl', 'cái bát'], ['napkin', 'khăn ăn']],
      [['goldfish', 'cá vàng'], ['puppy', 'chó con'], ['kitten', 'mèo con']],
      [['building blocks', 'khối xếp hình'], ['toy train', 'tàu hỏa đồ chơi'], ['puzzle', 'bộ ghép hình']],
      [['writing a story', 'đang viết truyện'], ['making a model', 'đang làm mô hình'], ['playing the guitar', 'đang chơi ghi-ta']],
      [['skating', 'trượt patin hoặc trượt băng'], ['hiking', 'đi bộ đường dài'], ['flying a kite', 'thả diều']],
      [['zookeeper', 'người chăm sóc thú trong sở thú'], ['hippo', 'hà mã'], ['rhino', 'tê giác']],
    ],
    4: [
      [['Thailand', 'Thái Lan'], ['Singapore', 'Singapore'], ['South Korea', 'Hàn Quốc']],
      [['half past', 'qua nửa giờ, dùng khi nói giờ'], ['quarter past', 'qua 15 phút, dùng khi nói giờ'], ['leave home', 'rời nhà']],
      [['weekday', 'ngày trong tuần từ thứ Hai đến thứ Sáu'], ['weekend', 'cuối tuần'], ['every other day', 'cách một ngày']],
      [['birthday candle', 'nến sinh nhật'], ['party invitation', 'thiệp mời dự tiệc'], ['blow out the candles', 'thổi tắt nến']],
      [['skate', 'trượt patin hoặc trượt băng'], ['do a handstand', 'trồng cây chuối'], ['play the drums', 'chơi trống']],
      [['canteen', 'căng tin'], ['science lab', 'phòng thí nghiệm khoa học'], ['sports field', 'sân thể thao']],
      [['timetable', 'thời khóa biểu'], ['break time', 'giờ ra chơi'], ['double lesson', 'hai tiết học liền nhau']],
      [['interesting', 'thú vị'], ['challenging', 'có tính thử thách'], ['do experiments', 'làm thí nghiệm']],
      [['relay race', 'cuộc đua tiếp sức'], ['finish line', 'vạch đích'], ['cheer for', 'cổ vũ cho']],
      [['go snorkelling', 'lặn với ống thở'], ['souvenir', 'đồ lưu niệm'], ['day trip', 'chuyến đi trong ngày']],
      [['front yard', 'sân trước'], ['garage', 'nhà để xe'], ['laundry room', 'phòng giặt đồ']],
      [['dentist', 'nha sĩ'], ['architect', 'kiến trúc sư'], ['paramedic', 'nhân viên cấp cứu y tế']],
      [['wavy hair', 'tóc gợn sóng'], ['ponytail', 'tóc buộc đuôi ngựa'], ['dimples', 'lúm đồng tiền']],
      [['pack my bag', 'soạn cặp của em'], ['feed the pet', 'cho thú cưng ăn'], ['set the alarm', 'đặt báo thức']],
      [['bake a cake', 'nướng bánh'], ['go for a walk', 'đi dạo'], ['tidy the house', 'dọn dẹp nhà']],
      [['foggy', 'có sương mù'], ['humid', 'ẩm'], ['weather forecast', 'dự báo thời tiết']],
      [['crossroads', 'ngã tư'], ['pedestrian crossing', 'vạch sang đường'], ['town square', 'quảng trường']],
      [['changing room', 'phòng thử đồ'], ['price tag', 'nhãn giá'], ['receipt', 'hóa đơn mua hàng']],
      [['habitat', 'môi trường sống'], ['wings', 'đôi cánh'], ['scales', 'vảy động vật']],
      [['camp leader', 'người phụ trách trại'], ['treasure hunt', 'trò săn kho báu'], ['water bottle', 'chai đựng nước']],
    ],
    5: [
      [['neighbourhood', 'khu dân cư'], ['move to', 'chuyển đến'], ['postal code', 'mã bưu chính']],
      [['balanced meal', 'bữa ăn cân đối'], ['drink enough water', 'uống đủ nước'], ['get enough sleep', 'ngủ đủ giấc']],
      [['join a club', 'tham gia câu lạc bộ'], ['rehearse a play', 'tập dượt vở kịch'], ['volunteer', 'làm tình nguyện']],
      [['patient', 'kiên nhẫn'], ['reliable', 'đáng tin cậy'], ['work well together', 'phối hợp tốt với nhau']],
      [['vet', 'bác sĩ thú y'], ['software developer', 'lập trình viên phần mềm'], ['design buildings', 'thiết kế các tòa nhà']],
      [['take notes', 'ghi chép'], ['look up a word', 'tra một từ'], ['give feedback', 'góp ý']],
      [['setting', 'bối cảnh truyện'], ['plot', 'cốt truyện'], ['main character', 'nhân vật chính']],
      [['warm up', 'khởi động'], ['coach', 'huấn luyện viên'], ['teammate', 'đồng đội']],
      [['guest list', 'danh sách khách mời'], ['party games', 'trò chơi trong buổi tiệc'], ['send out invitations', 'gửi thiệp mời']],
      [['meeting point', 'điểm tập trung'], ['permission slip', 'phiếu xin phép phụ huynh'], ['tour guide', 'hướng dẫn viên']],
      [['runny nose', 'sổ mũi'], ['stomach ache', 'đau bụng'], ['make an appointment', 'đặt lịch hẹn']],
      [['seat belt', 'dây an toàn'], ['slippery floor', 'sàn trơn'], ['first aid kit', 'hộp sơ cứu']],
      [['ingredients', 'nguyên liệu'], ['stir', 'khuấy'], ['slice', 'thái lát']],
      [['roundabout', 'bùng binh'], ['go past', 'đi ngang qua'], ['on the corner', 'ở góc đường']],
      [['boarding pass', 'thẻ lên máy bay'], ['platform', 'sân ga'], ['return ticket', 'vé khứ hồi']],
      [['dry season', 'mùa khô'], ['rainy season', 'mùa mưa'], ['heatwave', 'đợt nắng nóng']],
      [['waterfall', 'thác nước'], ['nature reserve', 'khu bảo tồn thiên nhiên'], ['scenic route', 'tuyến đường có phong cảnh đẹp']],
      [['borrowed', 'đã mượn'], ['met', 'đã gặp'], ['made', 'đã làm ra']],
      [['sort waste', 'phân loại rác'], ['refill', 'châm thêm hoặc nạp lại'], ['compost', 'ủ rác hữu cơ làm phân']],
      [['set a goal', 'đặt mục tiêu'], ['make progress', 'tiến bộ'], ['keep a journal', 'viết nhật ký']],
    ],
  };

  // Keep enrichment outside the core word grid and the saved game decks.
  const unitPage = location.pathname.match(/\/grade\/lop([1-5])\/(?:gs)?unit(\d+)\.html$/i);
  if (unitPage) {
    const [, grade, number] = unitPage;
    const words = unitWords[grade][Number(number) - 1];
    const core = document.querySelector('#vocab-grid-container');
    if (words && core) {
      const section = document.createElement('section');
      section.className = 'primary-unit-extras';
      section.setAttribute('aria-labelledby', 'primary-unit-extras-title');
      const heading = document.createElement('h2');
      heading.id = 'primary-unit-extras-title';
      heading.textContent = 'Từ vựng bổ trợ';
      const instruction = document.createElement('p');
      instruction.textContent = 'Chạm vào thẻ để nghe từ và cụm từ mở rộng của Unit này.';
      const grid = document.createElement('div');
      grid.className = 'vocab-grid g2-vocab-grid';
      for (const [english, vietnamese] of words) {
        const card = document.createElement('article');
        card.className = 'vocab-item g2-example';
        const name = document.createElement('h3');
        name.lang = 'en';
        name.textContent = english;
        const meaning = document.createElement('span');
        meaning.textContent = vietnamese;
        card.append(name, meaning);
        grid.append(card);
      }
      section.append(heading, instruction, grid);
      core.after(section);
    }
  }
})();
