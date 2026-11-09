/* Một danh sách và một URL bài cho mọi lớp. */
(() => {
  const primaryTopics = [
    ['clocks', '🕒', 'Time & Clocks', 'Giờ và đồng hồ'],
    ['jobs', '🧑‍🍳', 'Jobs & Workplaces', 'Nghề nghiệp và nơi làm việc'],
    ['music', '🎸', 'Music & Instruments', 'Âm nhạc và nhạc cụ'],
    ['health', '🩺', 'Health & Symptoms', 'Sức khỏe và triệu chứng'],
    ['safety', '⚠️', 'Safety Signs', 'Biển báo an toàn'],
    ['plants', '🌱', 'Plants & Growing', 'Cây cối và trồng cây'],
    ['stories', '📖', 'Stories & Characters', 'Truyện và nhân vật'],
    ['tickets', '🎫', 'Travel & Tickets', 'Chuyến đi và vé'],
    ['cooking', '🥣', 'Cooking & Recipes', 'Nấu ăn và công thức'],
    ['celebrations', '🏮', 'Celebrations & Traditions', 'Lễ hội và phong tục'],
  ];
  const match=location.pathname.match(/\/grade\/lop(\d+)\/lop\d+\.html$/);if(!match)return;
  const grade=Number(match[1]);
  const topics=[['animals','🐶','Animals','Động vật'],['clothes','👕','Clothes','Quần áo'],['colors','🎨','Colors','Màu sắc'],['dates','📅','Dates','Ngày tháng'],['familyfriends','👨‍👩‍👧','Family & Friends','Gia đình và bạn bè'],['feeling','😊','Feelings','Cảm xúc'],['fooddrinks','🍜','Food & Drinks','Đồ ăn và thức uống'],['fruits','🍎','Fruits','Trái cây'],['numbers','🔢','Numbers','Số đếm'],['schoolsupplies','🎒','School Supplies','Đồ dùng học tập'],['shapes','🔷','Shapes','Hình dạng'],['toys','🪁','Toys','Đồ chơi'],['weather','🌤️','Weather','Thời tiết'],['bodyparts','🖐️','Body Parts','Bộ phận cơ thể'],['verbs','🏃','Verbs','Động từ'],['adjectives','🌟','Adjectives','Tính từ'],['householditems','🛋️','Household Items','Đồ dùng trong nhà'],['rooms','🏡','Rooms','Các phòng trong nhà'],['transport','🚲','Transport','Phương tiện đi lại']];
  // Danh mục lớp 2 là lối vào cũ; cập nhật đích dùng chung, giữ thẻ đang có.
  const createCard = ([id, icon, name, meaning]) => {
    const card = document.createElement('a');
    card.className = 'shared-topic-card';
    card.href = `../lop2/${id}.html?fromGrade=${grade}`;
    const picture = document.createElement('span');
    picture.textContent = icon;
    picture.setAttribute('aria-hidden', 'true');
    const title = document.createElement('strong');
    title.lang = 'en';
    title.textContent = name;
    const caption = document.createElement('span');
    caption.textContent = meaning;
    card.append(picture, title, caption);
    return card;
  };
  const addStyle = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../../shared/shared-topics.css?v=primary2-20261022';
    document.head.append(link);
  };
  if(grade===2){for(const a of document.querySelectorAll('.lesson-card')){const id=a.getAttribute('href')?.replace('.html','');if([...topics,...primaryTopics].some(t=>t[0]===id))a.href=`../lop2/${id}.html?fromGrade=2`;}const header=document.querySelector('.supplementary-header');header?.querySelectorAll('p').forEach(p=>p.remove());return;}
  if(document.getElementById('shared-topics'))return;
  const main=document.querySelector('main');if(!main)return;
  addStyle();
  const section=document.createElement('section');section.id='shared-topics';section.setAttribute('aria-labelledby','shared-topics-heading');
  const h=document.createElement('h2');h.id='shared-topics-heading';h.textContent='📚 Chủ đề luyện tập';section.append(h);
  const grid=document.createElement('div');grid.className='shared-topic-grid';
  grid.append(...topics.map(topic=>createCard(topic)));
  if(grade<=5)grid.append(...primaryTopics.map(topic=>createCard(topic)));
  section.append(grid);
  main.append(section);
})();
