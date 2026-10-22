# Tranh bút chì màu lớp 6 — 19/10/2026

## Kết quả

- Đã tạo và gắn **96 tranh cho 96 mục từ, đủ 12 Unit lớp 6**. Dùng phong cách mới nhất của bộ tranh bút chì màu lớp 2: hoạt hình 2D, vân chì và giấy ấm rõ, màu pastel, bối cảnh/nhân vật phù hợp học sinh THCS.
- Mỗi WebP cuối đều được mở xem trực tiếp để kiểm tra nghĩa, chữ, hình thể và ngữ cảnh. Nghĩa và ví dụ giữ ngoài ảnh; không nhúng nhãn từ hoặc nghĩa Việt. Bản duyệt gắn với SHA-256, không chỉ dựa vào tên tệp hoặc khả năng tải ảnh.
- Đã sửa hai bản trước khi nghiệm thu: **save** phải thể hiện đèn đã tắt trong phòng sáng tự nhiên; **technology** thay dấu phát video đỏ dễ giống logo nền tảng bằng biểu tượng mạng chung. Bản cũ còn ở kho nguồn, chỉ bản cuối được đưa vào website.
- Vật thể và các từ trừu tượng có ngữ cảnh riêng: friendly/kind/confident, recycle/reuse/reduce, recognise/move/repair. Hai mục robot ở Unit 10 và 12 có tranh theo ngữ cảnh riêng.
- Ảnh 768×768, WebP, tổng khoảng 20,8 MB; khung từ vựng/thẻ lật 220 px trên điện thoại và 240 px trên màn hình lớn, giữ tỉ lệ bằng contain.
- Từ vựng và mặt nghĩa thẻ lật dùng ảnh mới. Mặt trước thẻ và câu chọn từ không hiện ảnh làm lộ nghĩa. Ảnh lỗi chuyển một lần về biểu tượng sẵn có.
- Giữ nguyên ID, Unit, URL, nghĩa, ví dụ, đáp án, dữ liệu hồ sơ và tiến độ. Thêm manifest trước dữ liệu Unit và cập nhật phiên bản script cuối để tránh dùng bộ ảnh từng phần từ cache.

## Kiểm tra đạt

- `scripts/finalize-grade6-pencil.py`: 96/96 ảnh cuối có bản duyệt, hash hiện tại khớp và kích thước 768×768; lưu bộ prompt cuối.
- `tests/secondary-images/grade6-pencil.test.cjs`: khớp manifest/bản duyệt/hash; ID/nghĩa/ví dụ không đổi; 12 trang tải manifest trước dữ liệu.
- `artifacts/grade6-pencil/browser-check.cjs --complete`: PASS **48 trạng thái** của 12 Unit × 320/390/760/1280 px, 96 ảnh tải đúng kích thước, khung vuông, không tràn ngang; thẻ lật, khu vực trắc nghiệm và ảnh dự phòng đạt. Không có lỗi JavaScript trong bộ kiểm tra.
- `tests/secondary-images/browser.cjs`: PASS lớp 6 và lớp 7 — 24 Unit, 192 khung từ và 192 mặt nghĩa; bốn chiều rộng, tiến độ cũ giữ nguyên, câu kiểm tra không lộ ảnh. Tổng 115 bitmap (96 mới lớp 6 + 19 sẵn có lớp 7) tải đúng 768×768, không lỗi tài nguyên hoặc JavaScript.
- Bộ kiểm tra nội dung/game/hồ sơ đang có: **78/78 đạt**. Liên kết 199 trang và chân trang 193 trang đạt; cú pháp script và kiểm tra khoảng trắng diff đạt.
- Đã mở xem ảnh chụp thẻ lật Unit 1 và Unit 2 trên điện thoại mô phỏng; bố cục và ảnh đạt. Các WebP từ vựng đã được mở xem riêng từng tệp.

## Tệp bàn giao và cách tạo

- Ảnh: `grade/lop6/assets/images/pencil/unit<N>/<slug>-v1.webp`.
- Manifest website: `grade/lop6/assets/js/pencil-images-data.js`.
- Bản duyệt: `artifacts/grade6-pencil/individual-review.json`.
- Bộ prompt cuối và nguồn tham chiếu của hai bản sửa: `artifacts/grade6-pencil/final-prompts.json`.
- Chế độ: **built-in image_gen** theo skill imagegen; 96 ảnh mới và 2 chỉnh sửa mục tiêu, không CLI/API trả phí hoặc reset credit.
- Nguồn PNG gốc giữ dưới `C:/Users/Admin/.codex/generated_images/01a1542b-e78e-7982-83a7-eeda97ae81ba/`; dự án dùng bản WebP bên trong workspace.

Kiểm tra bằng Edge mô phỏng; chưa nghiệm thu điện thoại vật lý, trình đọc màn hình hoặc nghe âm/giọng đọc thực tế. Không thay cơ chế chấm điểm hay âm thanh. Không commit/push trong yêu cầu tạo ảnh này; giữ nguyên các thay đổi ôn tập lớp 2 đang có.
