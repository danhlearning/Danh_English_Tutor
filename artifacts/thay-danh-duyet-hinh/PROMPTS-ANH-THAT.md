# Prompt ảnh chân thật mẫu

Công cụ: imagegen tích hợp. Mỗi từ là một lần tạo ảnh riêng. Các ảnh đã lưu là bản kết quả gốc, không cắt ghép hay chỉnh sửa bằng mã.

## Quy tắc chung của nhóm mẫu

Ảnh vuông cho thẻ từ vựng tiếng Anh Lớp 2. Ảnh chụp thật, chất liệu và tỷ lệ đời thực, một chủ thể chính, nhận biết rõ khi thu nhỏ còn khoảng 130 px. Ánh sáng tự nhiên sáng dịu, nền ít chi tiết, màu ấm nhẹ để hợp giao diện đáng yêu. Không hoạt hình, tranh vẽ, vector, 3D, chữ, nhãn hiệu hay watermark.

| Mã | Prompt nội dung đã dùng | Điểm cần thầy xem |
| --- | --- | --- |
| `gsunit1/pasta · photo-v2` | Bát mì spaghetti thật, sợi mì dài nhìn rõ, ít sốt cà chua và lá húng, chụp góc ba phần tư trên mặt bàn kem nhạt, bát chiếm khoảng 80% khung. | Có dễ nhận là pasta ở kích thước nhỏ không? |
| `gsunit1/popcorn · photo-v1` | Hộp giấy sọc đỏ trắng đầy bỏng ngô thật trên nền kem nhạt, hạt bỏng rõ ở kích thước nhỏ. | Đã kiểm tra: đúng bỏng ngô, không có chữ hoặc nhãn hiệu. |
| `gsunit1/pizza · photo-v1` | Một chiếc pizza thật nguyên bánh, nhìn hơi từ trên, rõ viền bánh, phô mai, sốt cà chua và rau. | Đã kiểm tra: dễ nhận là pizza, không có chữ hoặc nhãn hiệu. |
| `gsunit2/kite · photo-v1` | Diều vải thật hình thoi bốn màu bay trên trời xanh, rõ dây và đuôi, không có diều khác. | Đã kiểm tra: đủ dây và đuôi, rõ hình khi thu nhỏ. |
| `gsunit2/bike · photo-v1` | Xe đạp trẻ em thật nhìn ngang trên đường sáng, đủ hai bánh, khung, yên, tay lái và bàn đạp. | Đã kiểm tra: không nhầm với xe máy. |
| `gsunit2/kitten · photo-v1` | Một mèo con thật ngồi trong phòng nền kem, đầu tròn, thân nhỏ, thấy tai, ria, chân và đuôi. | Đã kiểm tra: rõ là mèo con, không có chi tiết thừa. |
| `animals/dog · photo-v1` | Một chú chó lông vàng nâu thật ngồi nhìn máy ảnh, thấy trọn tai, mõm, thân và các chân, nền phòng kem đơn giản, ánh sáng ban ngày. | Hình có đủ rõ và thân thiện không? |
| `bodyparts/hand · photo-v1` | Một bé tiểu học vui vẻ mặc áo màu pastel đang giơ bàn tay mở vẫy; lòng bàn tay và đúng năm ngón nhìn rõ, thấy cả đầu, vai và cánh tay để không có cảm giác bộ phận rời. | Bàn tay có là điểm chú ý chính không? Có cần thêm mũi chỉ trong giao diện không? |
| `verbs/run · photo-v1` | Một bé tiểu học đang chạy trên lối đi trong công viên, thấy toàn thân, một chân trước một chân sau, tay gập rõ, tư thế khác đi bộ, nền cây mờ nhẹ. | Hành động chạy có rõ khi thu nhỏ không? |
| `fruits/apple · photo-v1` | Một quả táo đỏ thật, nguyên quả, cuống và một lá xanh nhìn rõ, chụp góc ba phần tư trên mặt bàn kem nhạt, không có quả khác. | Có bị nhầm với cà chua hoặc đào không? |

Với các từ trừu tượng hoặc cần đếm/chỉ vị trí, ảnh thật sẽ đi cùng lớp chỉ dẫn chính xác do giao diện tạo sau khi thầy duyệt ảnh nền; không tạo số/chữ quan trọng trong ảnh bằng AI.
