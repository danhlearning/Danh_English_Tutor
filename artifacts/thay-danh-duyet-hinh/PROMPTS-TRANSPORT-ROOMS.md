# Prompt ảnh chân thật: Transport và Rooms in a House

Công cụ: imagegen tích hợp. **Mỗi từ có một lần tạo riêng**; các tệp PNG được sao chép nguyên bản, không cắt ghép hay sửa bằng mã. Mã của tất cả ảnh mới là `photo-v1`.

## Phần chung của prompt

> Use case: photorealistic-natural. Asset: square vocabulary photo for a grade 2 child. One clear real-life subject or room, accurate proportions, recognizable at 130px, warm soft natural daylight, simple uncluttered background, no cartoon, no toy, no illustration, no 3D render, no text, logos or watermark.

Với phương tiện, prompt yêu cầu thấy **toàn bộ xe/tàu/thuyền từ góc ba phần tư**, các bộ phận nhận biết chính và bối cảnh thật. Với phòng, prompt yêu cầu góc nhìn **từ cửa phòng** và đồ đạc đặc trưng rõ ở kích thước thẻ.

| Từ | Yêu cầu riêng trong prompt | Điểm phân biệt cần duyệt |
| --- | --- | --- |
| Car | Ô tô gia đình đỗ trên đường yên tĩnh, thấy thân và bốn bánh. | Khác taxi vì không có biển nóc. |
| Bus | Xe buýt đô thị dài, nhiều cửa sổ, cửa lên xuống, đỗ cạnh lề. | Khác xe tải vì có khoang hành khách. |
| Bike | Xe đạp trên lối công viên, rõ khung, bàn đạp, yên, tay lái và hai bánh. | Không có động cơ. |
| Train | Tàu chở khách trên đường ray, thấy đầu tàu và nhiều toa nối tiếp. | Không nhầm xe buýt. |
| Plane | Máy bay chở khách trên đường băng, rõ cánh, đuôi, buồng lái và càng đáp. | Máy bay nguyên hình, không chỉ cận cảnh đầu. |
| Boat | Thuyền chèo gỗ nhỏ trên hồ, thấy khoang ngồi, mũi thuyền. | Khác tàu thủy lớn. |
| Ship | Tàu biển lớn nhiều tầng trên mặt nước. | Kích thước và kết cấu khác thuyền nhỏ. |
| Taxi | Ô tô vàng có biển trống trên nóc, đỗ trên phố. | Khác ô tô thường. |
| Motorbike | Xe máy số dạng bước qua, rõ động cơ, gương, yên và hai bánh. | Khác xe đạp và xe trượt chân. |
| Truck | Xe tải thùng, rõ cabin và khoang chở hàng hình hộp. | Khác xe buýt. |
| Helicopter | Trực thăng đỗ trên bãi cỏ, rõ cánh quạt chính, cánh quạt đuôi và càng đáp. | Khác máy bay cánh cố định. |
| Scooter | **Xe trượt chân không động cơ** với sàn đứng, tay lái và hai bánh nhỏ. | Không có yên, không phải xe máy. |
| Bedroom | Phòng có giường, gối, chăn và đèn đầu giường. | Giường là điểm chính. |
| Bathroom | Phòng có bồn tắm/vòi sen, bồn rửa, gương và bồn cầu. | Gạch và thiết bị vệ sinh rõ. |
| Kitchen | Phòng có bếp nấu, tủ bếp, bồn rửa và tủ lạnh. | Bếp nấu là điểm chính, không nhầm phòng ăn. |
| Living room | Phòng có sofa, bàn trà, ghế bành và thảm. | Khác phòng ăn vì không có bàn ăn là điểm chính. |
| Dining room | Phòng có bàn ăn bốn ghế, bát đĩa và giỏ trái cây. | Bàn ăn và ghế là điểm chính. |
| Study | Phòng học/làm việc ở nhà với bàn, ghế, màn hình, vở và kệ sách. | Khác phòng ngủ và lớp học. |
| Garage | Gara trong nhà với ô tô đỗ, cửa cuốn mở, nền bê tông và giá dụng cụ. | Khác bãi đỗ xe ngoài trời. |

Trong kho duyệt, thầy có thể chọn **Cần sửa hình** và ghi cụ thể điểm chưa rõ. Bản sửa sẽ có mã phiên bản mới; ảnh chưa duyệt không vào bài học.
