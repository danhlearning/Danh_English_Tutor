# Sửa font tiếng Việt ở footer và phòng lỗi tái diễn

Footer đặt riêng font Nunito trong Shadow DOM, trong khi trang ôn từ dùng bộ nội bộ mang tên Danh Nunito. Trang không tải Nunito bên ngoài nên footer không cùng font với nội dung chính.

Đã cho footer ưu tiên Danh Nunito, tự nạp CSS font nội bộ nếu trang chưa có. CSS dùng chung khai báo cả hai tên Danh Nunito và Nunito từ ba bộ WOFF2 sẵn có: latin, latin-ext và vietnamese. Đặt font nền cho trang và cho điều khiển nhập liệu kế thừa font; không đổi nội dung, chấm bài hay tiến độ.

Đã bổ sung yêu cầu bền vững trong AGENTS.md: mọi vùng tiếng Việt, kể cả footer/hộp thoại/nút/Shadow DOM, cần font nội bộ đủ dấu và kiểm tra khi mạng ngoài bị chặn.

## Kiểm tra đã đạt

- `node scripts/check-vietnamese-fonts.cjs`: 199 trang UTF-8 hợp lệ, không có ký tự thay thế, có đường tải font chung; hai tên font có ba bộ glyph hợp lệ; footer ưu tiên font nội bộ.
- `node tests/learner-profiles/vietnamese-fonts.browser.cjs`: chặn toàn bộ mạng ngoài; trình duyệt xác nhận glyph thực tế của tiêu đề footer và chuỗi đủ dấu tiếng Việt lấy từ font Nunito nội bộ trên 11 trang đại diện. Có kiểm tra nút trong hộp đăng nhập và footer hoạt động độc lập với mô-đun hồ sơ.
- Trang kiểm tra gồm ôn học kỳ 1/2, danh mục, Unit 1 và ngữ pháp lớp 6; trang chủ, kỹ năng, phòng ngữ pháp, Body Parts lớp 2, danh mục lớp 4 và ôn lớp 7.
- Đã mở xem ảnh footer trang ôn lớp 6 tại 390 và 1280 px, lưu trong `artifacts/vietnamese-fonts/grade6-review-footer-<width>.png`. Không tràn ngang trong các trang đại diện.
- Footer hợp lệ trên 193 trang; liên kết/ID hợp lệ trên 199 trang.

Kiểm tra tự động không thay thế việc mở xem vùng giao diện được sửa. Chưa kiểm tra bằng điện thoại vật lý hoặc xem trực tiếp mọi vùng trên đủ 199 trang.
