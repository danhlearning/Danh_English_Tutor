# Kiểm tra Ghép chữ lớp 3 và 4

## Đã triển khai

- Bật Ghép chữ trên **40 Unit và hai trang ôn tập** của lớp 3/4. Dùng bộ từ/ID/nghĩa hiện có, giữ màu xanh lớp 3 và tím lớp 4; không tạo ảnh hay thay kho nội dung.
- Cùng cơ chế đã duyệt: các từ trộn xen kẽ, tránh lặp ngay khi có từ khác phù hợp; giảm hỗ trợ ngầm, rồi chuyển sang gõ cả từ. Không có thanh nấc/độ khó. Từ ngắn bỏ qua yêu cầu không phù hợp.
- Học kỳ của cả hai lớp chia Unit **1–10 / 11–20**. Lượt tối đa tám từ ưu tiên phủ Unit đã chọn, không đồng nghĩa hoàn thành cả học kỳ.
- Khóa g3/g4 riêng, không gộp tiến độ g2. Giữ lượt ôn tổng hợp cũ, thẻ, chính tả riêng và URL bài trước. Topic phụ vẫn dùng bài chung như trước.
- Bộ dựng đã tích hợp thành phần Ghép chữ cho lớp 3/4, loại bỏ khi dựng lớp 1/5. Không chạy lại bộ dựng ngân hàng/ảnh trong đợt này.

## Đã kiểm tra đạt

- Bộ kiểm tra dữ liệu toàn repo: **136/136**. Hai kiểm tra mới đối chiếu ngân hàng, khóa riêng, mốc học kỳ và thành phần trên 42 trang; bộ biến đổi trang chạy lặp không nhân đôi thành phần.
- Trình duyệt mở đủ **40 Unit**, kiểm tra không tràn ở 390 px và mọi từ có WAV nội bộ.
- Lượt chơi thực tế cả lớp 3/4: đi hết chuỗi chọn chữ đến tự gõ; phát media `playing/ended` cho đúng ngay và tự sửa khi Web Speech bị vô hiệu hóa, không tự đọc khi khôi phục; giữ nháp, thứ tự, chữ đã chọn. Kiểm tra 320/390/1280 px và xem trực tiếp ảnh chụp điện thoại/máy tính.
- Ôn học kỳ: chọn đúng 10 Unit mỗi học kỳ, chuyển hai bộ rồi khôi phục; khóa lưu đúng lớp và giữ lượt ôn tổng hợp trước không đổi. Không lỗi JavaScript hoặc 404.
- Chạy lại ôn Ghép chữ lớp 2 đạt, gồm chuỗi tự chuyển, media, nháp và hồ sơ An/Bình độc lập.
- Font thực tế **32 URL** với mạng ngoài bị chặn đạt, gồm Unit và ôn tập mới. Liên kết/ID và font tĩnh **323 trang**, footer **316 trang**, cú pháp và kiểm tra khoảng trắng đạt.

Đã kiểm tra bằng Edge trên máy tính và kích thước mô phỏng điện thoại; chưa kiểm tra điện thoại vật lý. Thay đổi ở bản cục bộ, chưa phát hành GitHub Pages trong đợt này.
