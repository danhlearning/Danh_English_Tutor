/* Versioned image candidates and the approved versions currently used on the website. */
window.thayDanhCandidates = {
  'gsunit1/pasta': [{ id: 'v1', label: 'Tranh mới · v1', src: 'candidates/gsunit1/pasta-v1.svg', note: 'Bát mì với sợi mì, sốt cà chua và lá húng.' }],
  'gsunit1/popcorn': [{ id: 'v1', label: 'Tranh mới · v1', src: 'candidates/gsunit1/popcorn-v1.svg', note: 'Hộp sọc đỏ và các hạt bỏng ngô nổi rõ.' }],
  'gsunit1/pizza': [{ id: 'v1', label: 'Tranh mới · v1', src: 'candidates/gsunit1/pizza-v1.svg', note: 'Bánh pizza tròn nhìn từ trên, có các đường chia miếng.' }],
  'gsunit2/kite': [{ id: 'v1', label: 'Tranh mới · v1', src: 'candidates/gsunit2/kite-v1.svg', note: 'Diều nhiều màu có dây và đuôi nơ.' }],
  'gsunit2/bike': [{ id: 'v1', label: 'Tranh mới · v1', src: 'candidates/gsunit2/bike-v1.svg', note: 'Xe đạp có hai bánh, khung, yên, bàn đạp và tay lái.' }],
  'gsunit2/kitten': [{ id: 'v1', label: 'Tranh mới · v1', src: 'candidates/gsunit2/kitten-v1.svg', note: 'Mèo con ngồi nhìn thẳng, có tai, ria và đuôi.' }]
};

/* Confirmed on the review board, then copied into Grade 2 lesson assets. */
window.thayDanhRollout = {
  'gsunit1/pasta': 'v1',
  'gsunit2/kite': 'photo-v1',
  'gsunit2/bike': 'photo-v1',
  'gsunit2/kitten': 'photo-v1'
};

/* Keep each image version for review and history. */
Object.assign(window.thayDanhCandidates, {
  'animals/dog': [{ id: 'photo-v1', kind: 'photo', label: 'Ảnh chân thật · v1', src: 'candidates/realistic/animals/dog-photo-v1.png', note: 'Chó thật ngồi, thấy rõ tai, mõm, thân và bốn chân.' }],
  'bodyparts/hand': [{ id: 'photo-v1', kind: 'photo', label: 'Ảnh chân thật · v1', src: 'candidates/realistic/bodyparts/hand-photo-v1.png', note: 'Bé vẫy bàn tay mở, thấy rõ lòng bàn tay và năm ngón.' }],
  'verbs/run': [{ id: 'photo-v1', kind: 'photo', label: 'Ảnh chân thật · v1', src: 'candidates/realistic/verbs/run-photo-v1.png', note: 'Bé chạy trên lối đi, thấy rõ tư thế chạy toàn thân.' }],
  'fruits/apple': [{ id: 'photo-v1', kind: 'photo', label: 'Ảnh chân thật · v1', src: 'candidates/realistic/fruits/apple-photo-v1.png', note: 'Một quả táo đỏ thật, rõ cuống và lá.' }]
});
window.thayDanhCandidates['gsunit1/popcorn'].push({ id: 'photo-v1', kind: 'photo', label: 'Ảnh chân thật · v1', src: 'candidates/realistic/gsunit1/popcorn-photo-v1.png', note: 'Hộp sọc đỏ trắng đầy bỏng ngô thật, thấy rõ từng hạt.' });
window.thayDanhCandidates['gsunit1/pizza'].push({ id: 'photo-v1', kind: 'photo', label: 'Ảnh chân thật · v1', src: 'candidates/realistic/gsunit1/pizza-photo-v1.png', note: 'Một chiếc pizza thật nguyên bánh, rõ viền bánh, phô mai và lớp phủ.' });
window.thayDanhCandidates['gsunit2/kite'].push({ id: 'photo-v1', kind: 'photo', label: 'Ảnh chân thật · v1', src: 'candidates/realistic/gsunit2/kite-photo-v1.png', note: 'Diều thật bốn màu bay trên trời, thấy rõ dây và đuôi.' });
window.thayDanhCandidates['gsunit2/bike'].push({ id: 'photo-v1', kind: 'photo', label: 'Ảnh chân thật · v1', src: 'candidates/realistic/gsunit2/bike-photo-v1.png', note: 'Xe đạp trẻ em thật nhìn ngang, đủ hai bánh, yên, tay lái và bàn đạp.' });
window.thayDanhCandidates['gsunit2/kitten'].push({ id: 'photo-v1', kind: 'photo', label: 'Ảnh chân thật · v1', src: 'candidates/realistic/gsunit2/kitten-photo-v1.png', note: 'Mèo con thật ngồi nhìn thẳng, dáng nhỏ, thấy rõ tai, ria và chân.' });
window.thayDanhCandidates['gsunit1/pasta'].push({ id: 'photo-v2', kind: 'photo', label: 'Ảnh chân thật · v2', src: 'candidates/realistic/gsunit1/pasta-photo-v2.png', note: 'Mì Ý thật trong bát, rõ sợi mì và sốt cà chua. Bản v1 đã lên web.' });

/* Photorealistic images for Transport and Rooms in a House. */
Object.assign(window.thayDanhCandidates, {
  "transport/car": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/car-photo-v1.png", note: "Ô tô gia đình thật, nhìn đủ thân xe và bốn bánh." }],
  "transport/bus": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/bus-photo-v1.png", note: "Xe buýt thật, thân dài, cửa lên xuống và nhiều cửa sổ." }],
  "transport/bike": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/bike-photo-v1.png", note: "Xe đạp thật, rõ hai bánh, khung, yên, bàn đạp và tay lái." }],
  "transport/train": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/train-photo-v1.png", note: "Tàu hỏa thật trên đường ray, rõ đầu tàu và các toa nối nhau." }],
  "transport/plane": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/plane-photo-v1.png", note: "Máy bay chở khách thật trên đường băng, rõ cánh và đuôi." }],
  "transport/boat": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/boat-photo-v1.png", note: "Thuyền chèo nhỏ thật trên hồ, thấy khoang ngồi và mũi thuyền." }],
  "transport/ship": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/ship-photo-v1.png", note: "Tàu thủy lớn thật, rõ nhiều tầng và thân tàu trên mặt nước." }],
  "transport/taxi": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/taxi-photo-v1.png", note: "Taxi vàng thật có biển trên nóc, dễ phân biệt với ô tô thường." }],
  "transport/motorbike": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/motorbike-photo-v1.png", note: "Xe máy thật, rõ động cơ, yên, hai bánh và gương." }],
  "transport/truck": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/truck-photo-v1.png", note: "Xe tải thùng thật, rõ cabin và khoang chở hàng lớn." }],
  "transport/helicopter": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/helicopter-photo-v1.png", note: "Trực thăng thật, rõ cánh quạt chính, đuôi và càng đáp." }],
  "transport/scooter": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/transport/scooter-photo-v1.png", note: "Xe trượt chân thật, hai bánh nhỏ, sàn đứng và tay lái; không có động cơ." }],
  "rooms/bedroom": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/rooms/bedroom-photo-v1.png", note: "Phòng ngủ thật với giường, gối, chăn và đèn đầu giường." }],
  "rooms/bathroom": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/rooms/bathroom-photo-v1.png", note: "Phòng tắm thật có bồn tắm, vòi sen, bồn rửa và gương." }],
  "rooms/kitchen": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/rooms/kitchen-photo-v1.png", note: "Nhà bếp thật, rõ bếp nấu, tủ bếp, bồn rửa và tủ lạnh." }],
  "rooms/living-room": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/rooms/living-room-photo-v1.png", note: "Phòng khách thật, rõ ghế sofa, bàn trà và ghế ngồi." }],
  "rooms/dining-room": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/rooms/dining-room-photo-v1.png", note: "Phòng ăn thật, bàn ăn bốn ghế và bát đĩa là điểm chính." }],
  "rooms/study": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/rooms/study-photo-v1.png", note: "Phòng học/làm việc thật, rõ bàn, ghế, màn hình và kệ sách." }],
  "rooms/garage": [{ id: "photo-v1", kind: "photo", label: "Ảnh chân thật · v1", src: "candidates/realistic/rooms/garage-photo-v1.png", note: "Gara trong nhà thật, có ô tô đỗ dưới cửa cuốn và giá dụng cụ." }]
});

/* Approved by Thầy Danh on 2026-09-28; copied to Grade 2 lesson assets. */
Object.assign(window.thayDanhRollout, {
  'animals/dog': 'photo-v1',
  'bodyparts/hand': 'photo-v1',
  'verbs/run': 'photo-v1',
  'fruits/apple': 'photo-v1',
  'gsunit1/pasta': 'photo-v2',
  'gsunit1/popcorn': 'photo-v1',
  'gsunit1/pizza': 'photo-v1',
  'transport/car': 'photo-v1',
  'transport/bus': 'photo-v1',
  'transport/bike': 'photo-v1',
  'transport/train': 'photo-v1',
  'transport/plane': 'photo-v1',
  'transport/boat': 'photo-v1',
  'transport/ship': 'photo-v1',
  'transport/taxi': 'photo-v1',
  'transport/motorbike': 'photo-v1',
  'transport/truck': 'photo-v1',
  'transport/helicopter': 'photo-v1',
  'transport/scooter': 'photo-v1',
  'rooms/bedroom': 'photo-v1',
  'rooms/bathroom': 'photo-v1',
  'rooms/kitchen': 'photo-v1',
  'rooms/living-room': 'photo-v1',
  'rooms/dining-room': 'photo-v1',
  'rooms/study': 'photo-v1',
  'rooms/garage': 'photo-v1',
});
