# Bài luyện lớp 6 — 04/10/2026

## Thay đổi

- 792 câu trắc nghiệm ngữ pháp hiện có được bổ sung lựa chọn nhiễu và loại đáp án trùng; giao diện đảo bốn lựa chọn A–D.
- 72 bài viết lại giữ ID, dùng câu gốc và phần mở đầu cố định trước ô nhập. Chấp nhận phần còn lại hoặc cả câu; gợi ý và nút xem đáp án mở sau 120 giây học nếu chưa hoàn thành. Không tính thời gian tab ẩn.
- 23 câu phát âm: Unit 1–9 nhận diện phần gạch chân, Unit 10 trọng âm hai âm tiết, Unit 11 nhịp câu, Unit 12 ngữ điệu trần thuật. Mỗi lượt báo số câu thực có, không thêm câu trùng để đủ 10.
- Bốn đoạn văn gốc, mỗi đoạn 5 phần × 2 câu × 2 chỗ trống. Một lượt luôn giữ cùng đoạn văn và thứ tự 10 chỗ trống. Các đoạn được gắn phạm vi Unit để chọn bài; có 40 chỗ trống thực, không phải 120 nội dung khác nhau.
- Hai dạng mới chọn theo Unit/học kỳ, không gắn cấp độ giả cho cùng nội dung.
- Giữ URL và khóa tiến độ cũ. Lượt dở lưu ID câu, thứ tự, nhập nháp, mảnh câu đã xếp, lượt thử và thời gian học trong vùng hồ sơ. Đúng ngay, tự sửa và đã xem được tổng kết riêng. Tùy chọn âm/chuyển động có khóa riêng theo hồ sơ.
- Bố cục điện thoại dành khoảng trống cho thanh hồ sơ; không che nút chơi. Giữ Nunito và chế độ giảm chuyển động.

## Bằng chứng kiểm tra

- `node tests/grade6-exam/browser.cjs`: đạt. Kiểm tra toàn ngân hàng về ID, bốn lựa chọn duy nhất và đáp án mẫu; phạm vi Unit; gợi ý trước/sau 120 giây, hai lần sai không mở đáp án sớm, tab ẩn, tải lại giữ nháp và mảnh câu; tải lại câu đã xong không cộng điểm lần nữa; xem đáp án không cộng điểm; trọn lượt giới từ 10 chỗ trống; gạch chân phát âm; nhớ tùy chọn; chiều rộng 320, 390, 760, 1280; học khi bộ nhớ bị chặn.
- `node --test tests/grammar-room/core.test.cjs tests/learner-profiles/core.test.cjs`: 20 kiểm tra đạt.
- `node tests/learner-profiles/browser.cjs`: đạt luồng hồ sơ, chuyển đổi dữ liệu cũ, đổi người học, đổi tên, sao lưu/khôi phục, xóa một hồ sơ, nhiều tab và xung đột, lưu bị chặn.
- Đã xem ảnh giao diện viết lại trước/sau gợi ý, đoạn văn và phát âm trên trình duyệt mô phỏng. Ảnh lưu tại `artifacts/grade6-exam/`.
- Kiểm tra lựa chọn bằng mã xác nhận cấu trúc và đáp án mẫu, không thay thế việc rà soát sư phạm từng câu của toàn ngân hàng cũ. Chưa nghiệm thu trên điện thoại vật lý hoặc đánh giá âm thanh bằng tai trên thiết bị thật.
