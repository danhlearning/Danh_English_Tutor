# Nguyên tắc thiết kế game học tiếng Anh

Định hướng chung của Danh English Tutor, được người dùng xác nhận ngày 03/10/2026. Áp dụng cho toàn bộ website và mọi phần phát triển tiếp theo.

## 1. Thiết kế từ việc học đến cách chơi

Danh English Tutor là website game học tiếng Anh. Người học thực hiện những hành động giúp hiểu nghĩa, nhận biết âm, nhớ từ, chọn cấu trúc và sử dụng ngôn ngữ; website phản hồi để họ biết mình đã làm được gì và nên luyện phần nào tiếp theo.

Mỗi game bắt đầu bằng một mục tiêu học cụ thể. Chọn cơ chế chơi phù hợp với mục tiêu đó, rồi xây giao diện, âm thanh và chuyển động để hỗ trợ thao tác. Thưởng, nhân vật và hiệu ứng tạo niềm vui, đồng thời giúp người học nhận ra tiến bộ thực tế.

Trước khi triển khai, ghi rõ:

1. Người học và điều họ cần làm được sau lượt chơi.
2. Hành động chính: nghe, chọn, ghép, xếp, gõ, nói hoặc viết.
3. Cách xác định đáp án đúng, các biến thể và giới hạn chấm.
4. Phản hồi khi đúng/sai, gợi ý, thử lại và cách xem đáp án.
5. Độ dài lượt, độ khó, cách ghi kết quả và điều kiện kết thúc.
6. Dữ liệu cần lưu và cách chọn nội dung để ôn lại.

## 2. Vòng học và nhịp chơi

**Chọn mục tiêu → thử thách → thao tác → phản hồi → tự sửa → tổng kết → ôn hoặc chơi tiếp.**

- Cho người học bắt đầu nhanh, với lời hướng dẫn ngắn và một thao tác chính dễ nhận ra.
- Dùng lượt ngắn: bài luyện thường khoảng 10 câu; điều chỉnh theo kỹ năng, độ tuổi và lượng nội dung thực tế. Hiển thị đúng số nhiệm vụ của lượt.
- Mỗi màn hình học tập trung vào một nhiệm vụ. Có tiến trình rõ ràng, câu hỏi lớn và nút tiếp tục dễ bấm.
- Độ khó tăng theo cấu trúc, yêu cầu nhớ và mức hỗ trợ. Người học được chọn bài/cấp độ phù hợp.
- Cho tiếp tục lượt dở và quay về danh mục dễ dàng. Lý thuyết, ví dụ và gợi ý luôn có lối tiếp cận phù hợp.
- Tổng kết cho biết điều đã làm được, phần cần ôn và hành động tiếp theo.

## 3. Giao diện vui, đáng yêu và dễ đọc

- **Nunito** là font chính; bảo đảm chữ tiếng Việt được tải và hiển thị đúng. Ưu tiên tài nguyên font có sẵn trong dự án.
- Dùng màu pastel, thẻ/nút bo tròn, biểu tượng rõ nghĩa và nhân vật đồng hành thân thiện. Phong cách được điều chỉnh theo độ tuổi trong cùng ngôn ngữ hình ảnh.
- Giữ tương phản tốt, nhãn dễ hiểu và khoảng trống đủ để đọc. Câu hỏi trên điện thoại ưu tiên 24–28 px, đáp án/ô nhập khoảng 18 px, giải thích từ 16 px; tăng cỡ chữ vẫn sử dụng được.
- Nút chính dễ nhận ra, vùng bấm ít nhất 44 px. Nội dung dài cuộn tự nhiên, không thu nhỏ chữ để ép vừa màn hình.
- Phản hồi đúng/sai có chữ hoặc biểu tượng ngoài màu sắc. Hỗ trợ focus bàn phím, nhãn ô nhập và thông báo phù hợp cho đọc màn hình.
- Thông tin kỹ thuật được giữ trong tài liệu phát triển; lời hướng dẫn trên website phục vụ việc học và thao tác chơi.

## 4. Âm thanh và chuyển động là phản hồi khi chơi

| Sự kiện | Phản hồi thiết kế |
| --- | --- |
| Chọn đáp án, chọn/ghép/xếp một phần | Âm ngắn, phản hồi nhấn hoặc đặt vào vị trí |
| Bắt đầu hoặc chuyển nhiệm vụ | Tín hiệu nhẹ và chuyển cảnh ngắn, giữ câu hỏi dễ đọc |
| Đúng ngay | Âm tích cực, xác nhận rõ và hiệu ứng nhỏ |
| Tự sửa đúng | Động viên và ghi nhận việc sửa, giữ cách tính điểm minh bạch |
| Chưa đúng | Âm nhẹ, thông báo khuyến khích và cơ hội thử lại |
| Dùng gợi ý hoặc xem đáp án | Tín hiệu trợ giúp, phân biệt với trả lời đúng |
| Hoàn thành lượt | Tổng kết và hiệu ứng chúc mừng ngắn |

- Có nút bật/tắt âm thanh và giảm chuyển động; nhớ lựa chọn giữa các lần mở trang.
- Chỉ phát âm thanh sau thao tác người học. Ngừng các nốt đang phát khi tắt âm thanh hoặc rời trang/tab.
- Tôn trọng tùy chọn giảm chuyển động của thiết bị. Hiệu ứng không che đề, đáp án hoặc vùng bấm; các phần tử trang trí được dọn sau khi chạy.
- Dùng âm phản hồi nhẹ, tránh gây áp lực khi sai. Tiếng đọc từ/câu được thiết kế riêng để phục vụ nghe và phát âm, với nút nghe lại rõ ràng.
- Dùng lại các thành phần đang ổn định, điều chỉnh theo cơ chế chơi; kiểm tra âm thanh và chuyển động cùng luồng học.

## 5. Phản hồi giúp học và cách ghi điểm

- Đúng: xác nhận, giải thích ngắn hoặc ví dụ khi phù hợp, rồi cho tiếp tục.
- Sai: giữ cơ hội tự suy nghĩ và thử lại trước khi chủ động xem đáp án. Gợi ý nhắc cách giải thay vì lập tức đưa đáp án.
- Tách kết quả đúng ngay, sửa đúng, đã xem và chưa hoàn thành. Nhập rỗng không bị tính thành một lần sai; thao tác lặp không nhân điểm hoặc bỏ qua nhiệm vụ.
- Khen nỗ lực và việc tự sửa. Điểm chính, chuỗi đúng hoặc huy hiệu phản ánh đúng quy tắc đã công bố; bài đã xem đáp án không được cộng thành đúng ngay.
- Huy hiệu có tiêu chí rõ. Nhãn “đã vững” cần bằng chứng nhớ và vận dụng, gồm ôn sau một khoảng thời gian; điều kiện cụ thể được thiết kế theo từng kỹ năng.
- Thời gian hỗ trợ tính trong lúc đang học; dùng tốc độ làm mục tiêu chỉ ở chế độ phản xạ được giải thích rõ. Tránh thúc ép bằng đồng hồ trong bài học thông thường.
- Câu trả lời mở được chấm trong phạm vi đã thiết kế. Phản hồi “chưa khớp đáp án mẫu” khi phù hợp, không hứa chấm mọi cách diễn đạt hoặc phát âm nếu chưa có khả năng đó.

## 6. Cơ chế phù hợp từng kỹ năng

| Khu vực | Hành động chơi ưu tiên | Mục tiêu học |
| --- | --- | --- |
| Từ vựng | Lật thẻ, nghe/chọn tranh, ghép từ–nghĩa, gõ từ, dùng từ trong câu | Hiểu nghĩa, nhận âm, nhớ và dùng từ |
| Ngữ pháp | Chọn, điền, xếp câu, sửa lỗi, viết lại, đọc ngữ cảnh | Hiểu và vận dụng cấu trúc |
| Phát âm | Nghe mẫu, phân biệt âm, chọn âm/từ, luyện cặp âm và nghe lại | Nhận biết và luyện âm; nêu rõ khả năng đánh giá thực tế |
| Phản xạ | Phản hồi câu hỏi ngắn, lựa chọn trong tình huống, thử thách tốc độ tùy chọn | Truy xuất và sử dụng kiến thức nhanh hơn |
| Theo lớp/Unit | Nhiệm vụ theo chủ đề và ôn phối hợp kỹ năng | Bám lộ trình học và nhớ lâu |
| Trang chủ/danh mục | Chọn nhiệm vụ, tiếp tục lượt, nhìn phần cần ôn | Biết bắt đầu ở đâu và bước học tiếp theo |

Hình minh họa đúng ngữ cảnh và rõ nghĩa. Từ trừu tượng có thể dùng nghĩa tiếng Việt khi học; ở nhiệm vụ kiểm tra, tránh để hình/chữ vô tình lộ đáp án. Công thức và sơ đồ cần đọc chính xác được dựng bằng chữ hoặc đồ họa rõ nét.

## 7. Tiến độ và cách mở rộng website

- Lưu kết quả thực tế, lượt dở và nội dung cần ôn. Trạng thái mở bài khác với hoàn thành và khác với thành thạo.
- Tiến độ từng kỹ năng, lớp và Unit có phạm vi rõ ràng. Tùy chọn âm thanh/chuyển động được quản lý riêng, tránh bị mất khi xóa tiến độ học.
- Nội dung ôn ưu tiên điều còn yếu và các câu đến hạn. Phân biệt tình huống mới với biến thể của cùng tình huống.
- Khi ngân hàng thiếu câu, dùng lượt ngắn và báo đúng số; không lặp nhiệm vụ để tạo cảm giác nhiều nội dung hơn.
- Dữ liệu lưu hỏng hoặc bị chặn vẫn cho học trong phiên, với thông báo ngắn và dễ hiểu.
- Áp dụng nguyên tắc này cho phần mới và những lần nâng cấp tiếp theo. Giữ URL và dữ liệu học đang dùng; việc chuyển đổi tiến độ phải có quy tắc rõ ràng.
- Tái sử dụng các phần ổn định của phòng ngữ pháp như Nunito, phong cách phản hồi và lựa chọn hiệu ứng. Mỗi kỹ năng vẫn có cách chơi và tiêu chí học riêng.

## 8. Nghiệm thu một hoạt động học

Một phần mới sẵn sàng bàn giao khi đã kiểm tra:

- Mục tiêu học rõ, nội dung/đáp án đủ ngữ cảnh và cách chơi thực sự luyện được mục tiêu đó.
- Luồng bắt đầu, đúng, sai, thử lại, gợi ý, xem đáp án, kết thúc, chơi tiếp và ôn hoạt động phù hợp.
- Điểm chính, kết quả và tiến độ khớp; nhấn lặp hoặc tải lại không làm tăng điểm.
- Âm thanh đúng sự kiện, bật/tắt được; chuyển động ngắn, dọn được và tôn trọng giảm chuyển động.
- Nunito tiếng Việt hiển thị đúng; không tràn/cắt câu trên điện thoại; bàn phím và các nút thao tác sử dụng được.
- Tiếp tục lượt, bộ nhớ bị chặn/hỏng và các đường dẫn hiện có được xử lý phù hợp.

Ghi rõ các bước đã kiểm tra trên trình duyệt, mô phỏng và thiết bị vật lý. Mức độ nghiệm thu phải phản ánh bằng chứng thực tế.
