/* Global Success 2, Unit 1. Practice vocabulary and sentences for Unit 1. */
(() => {
  'use strict';
  const svg = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><rect x="3" y="3" width="114" height="114" rx="20" fill="#FFF8ED"/>${body}</svg>`;
  // Ảnh chân thật v2 đã được duyệt; giữ bản vẽ v1 trong kho tham chiếu.
  const pasta = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><image href="./assets/images/approved/gsunit1/pasta-photo-v2.webp" width="120" height="120"/></svg>`;
  const popcorn = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><image href="./assets/images/approved/gsunit1/popcorn-photo-v1.webp" width="120" height="120"/></svg>`;
  const pizza = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true"><image href="./assets/images/approved/gsunit1/pizza-photo-v1.webp" width="120" height="120"/></svg>`;
  const words = [
    { id: 'pasta', name: 'Pasta', meaning: 'mì Ý', ipa: '/ˈpæs.tə/', color: '#3978B7', visual: pasta },
    { id: 'popcorn', name: 'Popcorn', meaning: 'bỏng ngô', ipa: '/ˈpɒp.kɔːn/', color: '#A14A75', visual: popcorn },
    { id: 'pizza', name: 'Pizza', meaning: 'bánh pizza', ipa: '/ˈpiːt.sə/', color: '#3B8758', visual: pizza }
  ];
  const questions = words.map((word, index) => ({
    id: `gsunit1-${index + 1}`,
    targetWordIds: [word.id],
    imageWordId: word.id,
    vietnamese: `Tôi thích ${word.meaning}.`,
    answer: `I like ${word.name.toLowerCase()}.`,
    acceptedAnswers: [`I like ${word.name.toLowerCase()}.`]
  }));
  window.grade2Units = Object.freeze({
    gsunit1: {
      id: 'gsunit1', title: 'Unit 1 · At my birthday party', icon: '🎉',
      description: 'Tiếng Anh 2 – Global Success · Nhận biết âm đầu /p/ qua pasta, popcorn, pizza. Câu luyện do website biên soạn.',
      pattern: 'Câu luyện thêm: I like + tên món ăn.', words, questions
    }
  });
})();
