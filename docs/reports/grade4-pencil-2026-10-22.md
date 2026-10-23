# Ảnh từ vựng lớp 4 — 22/10/2026

Đã đưa ảnh bút chì màu vào đủ 132 mục từ thuộc 20 Unit. Có 122 khóa từ, dùng 121 ảnh: 85 ảnh tạo mới bằng công cụ ImageGen tích hợp và 36 ảnh bút chì màu đã có được xem lại. `football` và `play football` dùng chung một ảnh.

## Kiểm tra hình ảnh

- Mở và xem trực tiếp từng ảnh mới; xem lại toàn bộ 36 ảnh tái sử dụng. Kiểm tra nghĩa, hình thể, tay/chân, cách dùng đồ vật, logic cảnh và chữ trong hình trước khi tích hợp.
- Ảnh không chứa từ tiếng Anh hoặc nghĩa tiếng Việt; nghĩa nằm ở phần văn bản ngoài ảnh. Ảnh lịch tháng giữ số tháng để phân biệt, không có tên tháng trong ảnh.
- Tạo riêng chùm nho cho `grapes`; không dùng ảnh một quả nho. Tạo đồng hồ đeo tay cho `watch`, phân biệt với động từ xem.
- `take a shower` dùng vòi nước đang chảy trong buồng tắm có rèm kín. Lần tạo đầu không thành công; ảnh được chọn là lần tạo lại với cảnh không có người nhìn thấy.
- Ảnh mới được thu nhỏ thành WebP 768 × 768, tổng khoảng 15,6 MB. Không chỉnh sửa nội dung hình sau khi tạo.
- Danh sách ảnh dùng trên web có cờ đã duyệt và SHA-256. Bộ tích hợp từ chối ảnh thiếu duyệt hoặc đã đổi nội dung sau khi duyệt.

## Tích hợp và nghiệm thu

- 20 Unit hiện tại, ôn tổng hợp và các trang bài luyện trước dùng cùng bộ ảnh. Giữ ID từ, câu, URL và khóa tiến độ.
- Đổi phiên bản dữ liệu lớp 4 để tab cũ tải bộ ảnh mới.
- Đạt 12 bài kiểm tra dữ liệu, ID, đường dẫn, hash, nội dung và tiến độ.
- Trình duyệt đã tải đủ 132 ảnh trên 20 Unit khi chặn mạng ngoài; không lỗi trang. Đã xem trực tiếp ảnh chụp điện thoại Unit 1, Unit 20 và máy tính Unit 19.
- Kiểm tra bốn game, chín dạng ôn, tải lại lượt dở, trả lời đúng/tự sửa và sự kiện âm thanh nội bộ `playing`/`ended` khi tắt Web Speech đều đạt. Không tự phát âm khi mở lại trang; bố cục đạt ở 320, 390 và 1280 px.
- Kiểm tra font tiếng Việt: 322 trang đạt điều kiện font nội bộ. Không thay font hoặc thành phần font chung.

Tệp đối chiếu: `artifacts/grade4-pencil/plan.json` (prompt), `results.json` (ảnh được chọn và kiểm tra), `reused-review.json`, `browser-results.json`. Ảnh bàn giao tại `grade/lop4/assets/images/pencil/`; ánh xạ đầy đủ tại `manifest.json` trong thư mục đó.
