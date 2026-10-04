# Game từ vựng lớp 6 và 7 — 04/10/2026

## Đã thực hiện

- Thêm `vocabulary-review.html` cho mỗi lớp, chọn học kỳ 1 (Unit 1–6) hoặc 2 (Unit 7–12), có lối vào từ danh mục và toàn bộ 24 trang Unit.
- Thư viện học kỳ lấy 48 mục từ hiện có. Lượt 10 câu phủ cả 6 Unit, ưu tiên từ cần ôn và chưa chơi. Loại mục từ trùng trong lượt và loại lựa chọn trùng từ hoặc cùng nghĩa với đáp án.
- Toàn bộ trắc nghiệm Unit và học kỳ hỏi nghĩa tiếng Việt, đáp án là bốn từ/cụm từ tiếng Anh A–D. Không hiện ví dụ, hình hoặc giọng đọc đáp án trước khi giải xong câu.
- Đúng ngay 10 sao, tự sửa 5 sao, xem đáp án 0 sao; xem đáp án chỉ mở sau hai lần sai. Tổng kết phân biệt kết quả và có nút ôn những từ cần luyện. Không gọi một lượt là thành thạo.
- Game dùng Nunito trong dự án, pastel, thẻ bo tròn, bạn đồng hành và phản hồi chữ/màu. Khi bắt đầu hoặc chuyển câu, đưa câu hỏi vào vùng nhìn để chơi trên điện thoại.
- Sau rà soát UI, âm và animation gắn với chọn thẻ, lật, đúng/sai/tự sửa, trợ giúp, chuyển câu, mốc chuỗi và kết thúc; bấm nền hoặc chữ không phát hiệu ứng. Có nút tắt âm và giảm chuyển động, nhớ theo hồ sơ; tôn trọng giảm chuyển động của thiết bị và dừng âm/giọng đọc khi ẩn/rời trang. Không phát âm khi tải trang. Tia sáng không chặn thao tác và tự dọn.
- Giữ ảnh từ vựng lớp 7 và gõ từ; lật thẻ được thay bằng hai mặt quay 3D với tiếng giấy lật. Gõ từ thêm phản hồi và chặn việc nộp/tiếp tục lặp sau khi đã xong.
- Giữ URL Unit và khóa tiến độ từ cũ; thêm lượt dở và lịch sử trắc nghiệm riêng theo lớp/phạm vi qua vùng lưu hồ sơ. Ôn học kỳ không ghi đè tiến độ Unit.

## Kiểm tra

- `node tests/vocabulary-game/browser.cjs`: đạt cả lớp 6 và 7, hai học kỳ, câu Việt/bốn đáp án Anh, phủ sáu Unit, đúng ngay/tự sửa/xem và tổng điểm, không cộng điểm/nhảy câu khi nhấn lặp, tải lại giữ lựa chọn và kết quả, ôn từ yếu với lựa chọn từ toàn bộ thư viện, bấm nền không phát âm/tia sáng, không tự phát âm, tắt và nhớ tùy chọn, giảm chuyển động, đổi hồ sơ, lưu bị chặn, bố cục 320/390/760/1280 px. Kiểm tra tất cả 24 trang Unit có tài nguyên và lối vào học kỳ mới.
- `node tests/learner-profiles/browser.cjs`: đạt chuyển đổi, đổi người học, nhiều tab/xung đột, đổi tên, sao lưu/khôi phục/xóa một hồ sơ, phiên học và bộ nhớ bị chặn. Cập nhật phép kiểm tra từ vựng lớp 7 theo chiều hỏi mới và nút bắt đầu chơi.
- `node --test tests/learner-profiles/core.test.cjs`: 8 kiểm tra đạt.
- `node scripts/check-local-links.cjs`: liên kết và ID hợp lệ trên 107 trang.
- Đã xem ảnh điện thoại mô phỏng của danh mục, Unit và ôn học kỳ tại `artifacts/vocabulary-game/`.
- Chưa nghiệm thu trên điện thoại vật lý; âm được kiểm tra qua sự kiện tạo/phát/dừng, chưa đánh giá bằng tai trên thiết bị thật. Lật thẻ và gõ từ vẫn dùng khả năng tiếp tục vốn có; khôi phục nguyên lượt dở mới áp dụng cho trắc nghiệm.
