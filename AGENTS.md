# Chỉ dẫn phát triển Danh English Tutor

## Định hướng sản phẩm: game học tiếng Anh

- Phát triển toàn bộ website theo tư duy **game học tiếng Anh**. Mỗi hoạt động có mục tiêu học, thử thách vừa sức, thao tác chơi rõ ràng, phản hồi và cơ hội ôn lại. Cơ chế chơi phải giúp người học hiểu, nhớ hoặc sử dụng tiếng Anh.
- Luôn ưu tiên cảm giác đang chơi: nhiệm vụ ngắn, nhiều cách tương tác, nhân vật/phản hồi thân thiện, cảm giác tiến bộ và quyền chọn chơi tiếp hoặc ôn lại. Nội dung mới phải tạo thêm cơ hội học thực chất; không chỉ tăng số câu bằng việc đổi thứ tự đáp án hoặc lặp cùng một tình huống.
- Áp dụng cho trang chủ, Luyện theo kỹ năng, các lớp/Unit, từ vựng, ngữ pháp, phát âm và phản xạ. Phòng ngữ pháp hiện tại là mẫu tham khảo về phong cách và phản hồi; điều chỉnh cơ chế theo kỹ năng và độ tuổi.
- Trước khi thêm game, bài học hoặc thay đổi đáng kể UX/UI, đọc [Nguyên tắc thiết kế game học tiếng Anh](docs/NGUYEN_TAC_GAME_HOC_TIENG_ANH.md). Ghi rõ mục tiêu học, cách chơi, cách chấm, hỗ trợ khi sai và điều kiện hoàn thành trước khi triển khai.
- Vòng học chuẩn: chọn mục tiêu → chơi lượt ngắn → nhận phản hồi → tự sửa → tổng kết → ôn hoặc chơi tiếp. Ưu tiên một nhiệm vụ rõ ràng trên điện thoại, giữ quyền chọn bài và tiếp tục lượt dở.
- Khen nỗ lực và việc tự sửa; tách đúng ngay, sửa đúng, đã xem đáp án và bỏ qua. Điểm, huy hiệu và trạng thái tiến bộ phải phản ánh bằng chứng học; lượt mở bài hoặc xem đáp án không trở thành bằng chứng thành thạo.
- Dùng lại thành phần hiển thị, âm thanh, animation và lưu tùy chọn khi phù hợp; giữ dữ liệu và tiến độ từng kỹ năng/lớp độc lập. Khi nâng cấp bài cũ, bảo toàn URL và tiến độ hoặc có cách chuyển đổi rõ ràng.
- Nghiệm thu cả trải nghiệm chơi và chất lượng học: nội dung/đáp án, phản hồi đúng/sai, thao tác lặp, tiếp tục lượt, âm thanh, giảm chuyển động và bố cục điện thoại. Chỉ báo đạt những bước đã kiểm tra.

## Nội dung và giao diện

- **Ghép chữ toàn website, ngày 25/10/2026:** dùng game chung cho Unit lớp 1–12, topic phụ, thư viện và ôn tập theo bộ đang chọn. Lượt tối đa 8 từ, đi từ ghép 1–2–3 chữ đến gõ cả từ; từ sai hoặc dùng gợi ý/xem mẫu phải tự làm đúng lại trước khi tăng mức. Giữ lượt ghép riêng với tiến độ các game khác, tải trước âm/ảnh, không hộp tick xanh và tôn trọng giảm chuyển động. Mẫu/bộ dựng phải giữ các lối vào và chạy tích hợp `scripts/install-site-letter-games.cjs` khi sinh trang. Chi tiết: [Ghép chữ trên toàn website](docs/SITE_LETTER_GAME_20261025.md).

- **Tải trước âm thanh toàn website, xác nhận ngày 25/10/2026:** áp dụng cho lớp 1–12, toàn bộ topic phụ, thư viện kỹ năng, game, ôn tập, trang cũ và mẫu trang/bộ dựng. Khi có lượt học, chuẩn bị im lặng âm thanh của câu hiện tại và tối đa hai câu kế tiếp theo đúng thứ tự đã chọn; chuẩn bị cả ảnh của câu tiếp theo khi có. Với danh sách thẻ, chỉ ưu tiên nhóm thẻ đang xem/sắp xem, không tải cả thư viện.
- Dùng lại `DanhGameFlow.prepare` và `DanhAnswerSpeech` khi phù hợp. Tệp đã tải phải được dùng khi phát thật; gộp yêu cầu trùng và giới hạn hàng đợi, tải đồng thời, bộ nhớ. Tải trước không tự phát tiếng, không lộ đáp án, không chấm điểm, không chuyển câu hoặc thay đổi lượt/tiến độ. Game tự chuyển phải đợi giọng đáp án kết thúc.
- Tôn trọng âm tắt và tiết kiệm dữ liệu; tạm dừng tải nền khi mất mạng hoặc tab ẩn, tiếp tục phần cần thiết khi quay lại. Lỗi tải trước không chặn học; có thể tải bình thường hoặc dùng giọng dự phòng khi người học yêu cầu nghe. Dừng giọng khi rời/ẩn trang, tránh tiếng chồng và phát lặp.
- Khi nghiệm thu âm thanh, kiểm tra cả câu đầu và câu kế tiếp, dùng lại tài nguyên đã tải, không tự đọc lúc mở/khôi phục, thao tác lặp, đổi tab, âm tắt, mạng lỗi và bộ nhớ giới hạn. Hướng dẫn chi tiết: [Nhịp game và chuẩn bị câu tiếp](docs/GAME_PACING_20261025.md).

- **Chạm cả thẻ nghe từ, sửa rõ ngày 25/10/2026:** toàn bộ thẻ trong lưới từ vựng lớp 1–12, topic phụ, trang cũ và thư viện kỹ năng là vùng phát âm bằng chạm/chuột và Enter/Space, dùng `DanhAnswerSpeech.listen`. Chạm ảnh, tên, nghĩa, ví dụ hoặc khoảng trống trên thẻ đều nghe đúng từ một lần. Có viền sáng và nhún nhẹ khi chạm; tôn trọng tùy chọn/thiết bị giảm chuyển động, khi đó chỉ hiện viền. Giữ nguyên tệp ảnh, khung, kích thước và bố cục hiện tại. Bỏ loa rời ở thẻ đã nghe được; bài không có thẻ vẫn giữ nút nghe. Nghe thẻ không lật, chuyển câu hoặc cộng điểm; thẻ đáp án và thẻ lật của game giữ chức năng học riêng. Liên kết/nút thao tác bên trong thẻ vẫn giữ chức năng. Không tự đọc khi mở/khôi phục; đúng và tự sửa đúng vẫn đọc tiếng Anh. Mẫu trang/bộ dựng phải giữ nguyên tắc này.

- Áp dụng thao tác nghe cho **từng thẻ từ lớp 1–12 và toàn bộ topic phụ**, kể cả thẻ ở cuối danh sách hoặc được dựng lại. Không để sự kiện nghe lồng nhau; mỗi thao tác chỉ phát đúng từ một lần. Khi kiểm tra, rà cả vùng ảnh, chữ và khoảng trống; nghe thử cả thẻ đầu/cuối các topic.
