# Hoàn tất UI ưu tiên cao và tranh lớp 2 — 19/10/2026

## Kết quả

- Đã hoàn tất các lỗi UI P1 trong báo cáo audit: ảnh dự phòng không tải lặp, hộp thoại dùng được bằng bàn phím, phóng to chữ và tiêu đề Unit không tràn màn hình nhỏ.
- Đã tạo và tích hợp **253 tranh bút chì màu 2D cho 16 chủ đề bổ trợ lớp 2**, dùng trong từ vựng và trò chơi. Animals, Colors, Numbers và 16 Unit chính giữ nguyên phạm vi nội dung.
- Đã mở trực tiếp từng tệp tranh cuối để kiểm tra nghĩa, chữ thừa, hình thể và số lượng khi dùng trong bài đếm. Không có nghĩa tiếng Việt hoặc nhãn từ trong ảnh. Lịch tháng dùng chữ số 1–12; dấu hỏi và nốt nhạc là ký hiệu minh họa.
- Tất cả tệp là WebP **768×768**, giữ tỉ lệ. Khung từ vựng 220×220 trên điện thoại, 240×240 trên màn hình lớn; hình câu hỏi180×180, thẻ lật120×120 và từng biểu tượng đếm56×56.
- Sửa thêm lookup tranh cho target câu viết dạng “run negative”, “read command”, “can you swim”; sửa hiệu ứng biểu tượng đếm để tôn trọng chế độ giảm chuyển động.
- Không thay ID từ, URL hoặc khóa lưu tiến độ/hồ sơ.

## Bằng chứng kiểm tra

- `artifacts/grade2-pencil/browser-results.json`: PASS **128 trạng thái**, gồm 16 chủ đề ở4 chiều rộng320/390/760/1280 và64 trạng thái trò chơi; 253 ảnh tải đúng kích thước, ID giữ nguyên, không lỗi trang hoặc tài nguyên nội bộ. Ba trang ngoại lệ không tải plugin tranh mới.
- `artifacts/grade2-pencil/individual-review.json`: đủ253 mục đã duyệt, đường dẫn/kích thước/SHA-256. `scripts/finalize-grade2-pencil.py` xác nhận hash hiện tại khớp bản đã xem.
- `ONLY_GRADE=2 node tests/vocabulary-3d/browser.cjs`: PASS16 Unit chính, ảnh tải,4 trò chơi, bố cục điện thoại và không lỗi trang.
- `node --test tests/vocabulary-3d/content.cjs`: PASS2 kiểm tra nội dung và ID.
- `node scripts/check-local-links.cjs`: PASS198 trang. `node scripts/check-contact-footer.cjs`: PASS192 trang.
- `artifacts/ui-audit-2026-10-19/fixes-test.cjs`: đã PASS các sửa P1; chi tiết trong checkpoint.
- Đã xem ảnh chụp từ vựng và các trạng thái trò chơi tiêu biểu, gồm bài đếm School Supplies, Body Parts, Adjectives và Rooms. Bài đếm School hiển thị rõ từng biểu tượng khi giảm chuyển động.
- Git diff rỗng trên HTML/JS của Animals, Colors, Numbers.

Một lượt chạy hai bộ trình duyệt đồng thời bị timeout khi chờ trang; chạy lại bộ16 chủ đề riêng đã PASS128 trạng thái. Các kết quả trên là kiểm tra trình duyệt mô phỏng, chưa kiểm tra phần cứng điện thoại hoặc nghe giọng đọc thực tế. Không thay cơ chế chấm điểm hay lưu hồ sơ trong đợt tranh này.

## Tệp bàn giao

- Tranh: `grade/lop2/assets/images/pencil/<topic>/<slug>-v1.webp`.
- Manifest dùng trên website: `grade/lop2/assets/js/pencil-images-data.js`.
- Nguồn và bộ prompt cuối: `artifacts/grade2-pencil/final-prompts.json` (253 mục, có các prompt sửa được chọn cuối).
- Chế độ tạo: **built-in image_gen** theo skill imagegen, không dùng API trả phí hoặc credit reset.
- Ảnh chụp kiểm tra: `artifacts/grade2-pencil/final-*.png`.

Không commit, deploy hoặc archive chat trong công việc này.

## Kiểm tra bổ sung sau yêu cầu tiếp tục đưa tranh vào chủ đề

- Xác nhận lại đủ 253 ảnh đã nằm trong 16 chủ đề, không có bộ ảnh đang chờ tích hợp. `finalize-grade2-pencil.py` kiểm tra lại SHA-256 của toàn bộ ảnh cuối và kích thước 768×768 đạt.
- Tìm và sửa một trường hợp còn dùng emoji: câu “These are my friends” có target `friends these` chưa khớp từ `Friend`. Đã nối đúng ảnh Friend, mở lại tệp ảnh và ảnh chụp câu luyện để xác nhận có hai người bạn được chỉ rõ, không có chữ trong tranh.
- Hai câu “Who is this/that?” giữ ký hiệu hỏi/chỉ vì không yêu cầu một quan hệ gia đình cụ thể. Không gán ảnh người thân tùy ý. Bộ kiểm tra đã phân biệt hai ngoại lệ này thay cho yêu cầu mọi câu ngẫu nhiên đều phải có tranh.
- `artifacts/grade2-pencil/check-question-art.cjs`: PASS 202 mẫu câu/đếm/ngày của các ngân hàng câu cũ, dựng từng câu để kiểm tra hình thay vì chỉ lấy câu đầu ngẫu nhiên. Bằng chứng trong `question-art-checked.json` và `friends-plural-game-mobile.png`.
- Chạy lại `browser-check.cjs`: PASS 128 trạng thái, 253 ảnh tải đúng; không lỗi trang/tài nguyên nội bộ; ID giữ nguyên. Animals, Colors, Numbers không tải bộ tranh và git diff các tệp HTML/JS của ba chủ đề vẫn rỗng.
- Tăng phiên bản script tranh trên 16 trang và đồng bộ integrator để trình duyệt lấy bản ánh xạ mới. Liên kết 198 trang/chân trang 192 trang và cú pháp script đạt. Chưa xuất bản lên website công khai.
