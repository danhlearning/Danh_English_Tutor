// Mặc định tốc độ đọc là 0.5 (Chậm rõ cho bé)
  /* Bộ Vector SVG hiển thị chuẩn xác từng hình ảnh đồ vật minh họa */
  const svgIcons = {
    apple: `<svg viewBox="0 0 64 64"><path fill="#E53E3E" d="M32 12c-6-6-16-4-20 4-5 10-1 24 8 32 4 4 8 6 12 6s8-2 12-6c9-8 13-22 8-32-4-8-14-10-20-4z"/><path fill="#38A169" d="M32 12c2-4 6-6 10-6-1 3-3 6-6 7-2 1-4 0-4-1z"/><path fill="#744210" d="M31 6h2v7h-2z"/></svg>`,
    umbrella: `<svg viewBox="0 0 64 64"><path fill="#3182CE" d="M32 10C16 10 6 24 6 36h52C58 24 48 10 32 10z"/><path fill="#2B6CB0" d="M32 10c-5 8-5 18 0 26 5-8 5-18 0-26z"/><path fill="#718096" d="M31 36h2v18c0 3-2 5-5 5s-5-2-5-5h2c0 2 1 3 3 3s3-1 3-3V36z"/><path fill="#3182CE" d="M31 6h2v4h-2z"/></svg>`,
    /* Đã cập nhật SVG Chuối Vàng Dài Hơn & Cong Tự Nhiên Hơn */
    banana: `<svg viewBox="0 0 64 64"><path fill="#F6E05E" stroke="#D69E2E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="M8 52C16 58 42 56 56 12c-8 3-22 9-32 5C16 13 10 32 8 52z"/><path fill="#744210" d="M55 10l3-3 2 1-2 4zM6 52l2 3-3 1z"/></svg>`,
    leaf: `<svg viewBox="0 0 64 64"><path fill="#38A169" d="M52 12C28 12 12 28 12 52c24 0 40-16 40-40z"/><path fill="#276749" d="M12 52C28 36 40 24 52 12M28 36l-6 6M38 26l-6 6M46 18l-4 4"/></svg>`,
    orange: `<svg viewBox="0 0 64 64"><circle cx="32" cy="34" r="22" fill="#ED8936"/><path fill="#38A169" d="M32 12c4-4 10-4 14 0-4 3-8 4-14 0z"/><circle cx="24" cy="28" r="1.5" fill="#DD6B20"/><circle cx="38" cy="38" r="1.5" fill="#DD6B20"/><circle cx="30" cy="44" r="1.5" fill="#DD6B20"/></svg>`,
    grapes: `<svg viewBox="0 0 64 64"><circle cx="26" cy="24" r="7" fill="#9F7AEA"/><circle cx="38" cy="24" r="7" fill="#9F7AEA"/><circle cx="20" cy="34" r="7" fill="#805AD5"/><circle cx="32" cy="34" r="7" fill="#805AD5"/><circle cx="44" cy="34" r="7" fill="#805AD5"/><circle cx="26" cy="44" r="7" fill="#6B46C1"/><circle cx="38" cy="44" r="7" fill="#6B46C1"/><circle cx="32" cy="52" r="7" fill="#553C9A"/><path fill="#38A169" d="M32 14c-6-4-12-2-14 2 6 1 11 0 14-2z"/><path fill="#744210" d="M31 8h2v7h-2z"/></svg>`,
    flower: `<svg viewBox="0 0 64 64"><circle cx="32" cy="20" r="8" fill="#ED64A6"/><circle cx="44" cy="32" r="8" fill="#ED64A6"/><circle cx="32" cy="44" r="8" fill="#ED64A6"/><circle cx="20" cy="32" r="8" fill="#ED64A6"/><circle cx="32" cy="32" r="7" fill="#ECC94B"/></svg>`,
    cat: `<svg viewBox="0 0 64 64"><path fill="#2D3748" d="M16 18l8 10V46h16V28l8-10-8 4c-4-3-12-3-16 0l-8-4z"/><circle cx="26" cy="32" r="2" fill="#ECC94B"/><circle cx="38" cy="32" r="2" fill="#ECC94B"/><path fill="#ED64A6" d="M30 36l2 2 2-2h-4z"/></svg>`,
    dog: `<svg viewBox="0 0 64 64"><path fill="#E2E8F0" d="M18 20c0-6 6-10 14-10s14 4 14 10v20c0 8-6 14-14 14s-14-6-14-14V20z"/><path fill="#A0AEC0" d="M14 22c0 8 4 14 4 14s2-8 0-14-4 0-4 0zM50 22c0 8-4 14-4 14s-2-8 0-14 4 0 4 0z"/><circle cx="26" cy="24" r="2.5" fill="#2D3748"/><circle cx="38" cy="24" r="2.5" fill="#2D3748"/><ellipse cx="32" cy="30" rx="4" ry="3" fill="#2D3748"/></svg>`,
    elephant: `<svg viewBox="0 0 64 64"><path fill="#A0AEC0" d="M12 28c0-10 8-16 20-16s20 6 20 16v18H12V28z"/><path fill="#CBD5E0" d="M8 24c0 8 4 12 8 12V20c-4 0-8 0-8 4zM56 24c0 8-4 12-8 12V20c4 0 8 0 8 4z"/><path fill="#A0AEC0" d="M28 32v16c0 4 3 6 6 6s4-2 2-4v-8"/><circle cx="24" cy="26" r="2" fill="#2D3748"/><circle cx="40" cy="26" r="2" fill="#2D3748"/></svg>`,
    watch: `<svg viewBox="0 0 64 64"><rect x="26" y="6" width="12" height="52" fill="#CBD5E0" rx="3"/><circle cx="32" cy="32" r="16" fill="#E2E8F0" stroke="#718096" stroke-width="3"/><path stroke="#2D3748" stroke-width="2" stroke-linecap="round" d="M32 32V22M32 32h6"/></svg>`,
    bear: `<svg viewBox="0 0 64 64"><circle cx="18" cy="18" r="7" fill="#744210"/><circle cx="46" cy="18" r="7" fill="#744210"/><circle cx="32" cy="32" r="20" fill="#8C521F"/><ellipse cx="32" cy="38" rx="8" ry="6" fill="#D69E2E"/><circle cx="25" cy="28" r="2" fill="#2D3748"/><circle cx="39" cy="28" r="2" fill="#2D3748"/><ellipse cx="32" cy="36" rx="3" ry="2" fill="#2D3748"/></svg>`,
    bottle: `<svg viewBox="0 0 64 64"><path fill="rgba(255,255,255,0.4)" stroke="#4A5568" stroke-width="2.5" stroke-linejoin="round" d="M26 12h12v6l5 6v28c0 3-2 4-5 4H26c-3 0-5-1-5-4V24l5-6v-6z"/><path fill="#CBD5E0" d="M24 8h16v4H24z"/><path stroke="#A0AEC0" stroke-width="2" stroke-linecap="round" d="M25 28c3 2 8 2 12 0M25 36c3 2 8 2 12 0"/></svg>`
  };

  /* Dữ liệu 13 Từ Vựng Tiếng Anh */
  const colorsData = [
    { name: 'Red', ipa: '/rɛd/', meaning: 'Màu đỏ', hex: '#E53E3E', textColor: '#FFF', icon: svgIcons.apple, example: 'Red apple 🍎', sentence: 'It is a red apple.' },
    { name: 'Blue', ipa: '/bluː/', meaning: 'Màu xanh dương', hex: '#3182CE', textColor: '#FFF', icon: svgIcons.umbrella, example: 'Blue umbrella ☂️', sentence: 'The umbrella is blue.' },
    { name: 'Yellow', ipa: '/ˈjɛloʊ/', meaning: 'Màu vàng', hex: '#ECC94B', textColor: '#2D3748', icon: svgIcons.banana, example: 'Yellow banana 🍌', sentence: 'I have a yellow banana.' },
    { name: 'Green', ipa: '/ɡriːn/', meaning: 'Màu xanh lá', hex: '#38A169', textColor: '#FFF', icon: svgIcons.leaf, example: 'Green leaf 🍃', sentence: 'The leaf is green.' },
    { name: 'Orange', ipa: '/ˈɔːrɪndʒ/', meaning: 'Màu cam', hex: '#ED8936', textColor: '#FFF', icon: svgIcons.orange, example: 'Orange fruit 🍊', sentence: 'It is an orange fruit.' },
    { name: 'Purple', ipa: '/ˈpɜːrpəl/', meaning: 'Màu tím', hex: '#9F7AEA', textColor: '#FFF', icon: svgIcons.grapes, example: 'Purple grapes 🍇', sentence: 'The grapes are purple.' },
    { name: 'Pink', ipa: '/pɪŋk/', meaning: 'Màu hồng', hex: '#ED64A6', textColor: '#FFF', icon: svgIcons.flower, example: 'Pink flower 🌸', sentence: 'I like the pink flower.' },
    { name: 'Black', ipa: '/blæk/', meaning: 'Màu đen', hex: '#2D3748', textColor: '#FFF', icon: svgIcons.cat, example: 'Black cat 🐈‍⬛', sentence: 'The cat is black.' },
    { name: 'White', ipa: '/waɪt/', meaning: 'Màu trắng', hex: '#FFFFFF', textColor: '#2D3748', border: '2px solid #CBD5E0', icon: svgIcons.dog, example: 'White dog 🐕', sentence: 'The dog is white.' },
    { name: 'Gray', ipa: '/ɡreɪ/', meaning: 'Màu xám', hex: '#A0AEC0', textColor: '#FFF', icon: svgIcons.elephant, example: 'Gray elephant 🐘', sentence: 'It is a gray elephant.' },
    { name: 'Silver', ipa: '/ˈsɪlvər/', meaning: 'Màu bạc', hex: '#E2E8F0', textColor: '#2D3748', border: '2px solid #A0AEC0', icon: svgIcons.watch, example: 'Silver watch ⌚', sentence: 'The watch is silver.' },
    { name: 'Brown', ipa: '/braʊn/', meaning: 'Màu nâu', hex: '#744210', textColor: '#FFF', icon: svgIcons.bear, example: 'Brown bear 🐻', sentence: 'It is a brown bear.' },
    { name: 'Transparent', ipa: '/trænˈspærənt/', meaning: 'Trong suốt', isTransparent: true, textColor: '#2D3748', border: '2px solid #A0AEC0', icon: svgIcons.bottle, example: 'Transparent glass bottle 🫙', sentence: 'The glass bottle is transparent.' }
  ];

  /* Pencil artwork is shared by vocabulary, letter practice and sentences. */
  for (const word of colorsData) {
    word.sourceIcon = word.icon;
    const file = `${word.name.toLowerCase()}-pencil-v2.webp`;
    word.image = `./assets/images/pencil/colors/${file}`;
    word.icon = `<img class="colors-pencil-art" src="./assets/images/pencil/colors/compact/${file}" srcset="./assets/images/pencil/colors/compact/${file} 384w, ${word.image} 768w" sizes="(max-width:600px) 110px, 160px" width="360" height="360" alt="" loading="lazy" decoding="async" draggable="false">`;
  }
  function speak(text) {
    return window.DanhListenControls?.isManualRequest()
      ? window.DanhAnswerSpeech.listen(text) : window.DanhAnswerSpeech.say(text);
  }
  function renderVocabGrid() {
    const grid = document.getElementById('vocab-grid-container');
    grid.replaceChildren();
    for (const item of colorsData) {
      const card = document.createElement('article');
      card.className = 'color-card colors-pencil-card';
      card.style.setProperty('--color-swatch', item.hex || '#90a4ae');
      card.innerHTML = `<div class="real-obj-wrapper">${item.icon}</div>
        <h3 class="word-title">${item.name}</h3><p class="phonetic">${item.ipa}</p>
        <p class="meaning">${item.meaning}</p><div class="example-box"><span>${item.example}</span><p lang="en">${item.sentence}</p></div>`;
      grid.append(card);
    }
  }
  renderVocabGrid();
  function switchTab(id, event) {
    window.DanhAnswerSpeech.stop();
    for (const panel of document.querySelectorAll('.tab-content')) panel.classList.toggle('active', panel.id === id);
    for (const button of document.querySelectorAll('.nav-btn')) button.classList.toggle('active', button === (event?.currentTarget || event?.target));
  }
