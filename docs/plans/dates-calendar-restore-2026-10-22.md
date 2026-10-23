# Dates: trở lại phần hiển thị lịch cũ

Theo yêu cầu ngày 22/10/2026, Dates dùng lại ký hiệu thứ/tháng và lịch số; bỏ lớp tranh thay thế của chủ đề này. Game 4 phải hiện nguyên dữ kiện `main` và `sub`, gồm cả số ngày trong câu hỏi như 14/02, không thay bằng tranh tháng chung.

- Mục tiêu: nhận biết bảy thứ, mười hai tháng và viết câu ngày tháng từ dữ kiện lịch.
- Cách chơi: giữ bốn game, 19 từ và 50 câu; giữ cách chấm, thử lại, xem đáp án và tổng kết hiện có.
- Lưu trữ: giữ ID từ và khóa `danh.learning.dates.v1`, URL `dates.html`, các kết quả cũ và hồ sơ độc lập.
- Tiếng đọc: giữ giọng Anh khi đúng ngay/tự sửa; bổ sung âm nội bộ cho từ/câu Dates qua bộ chung. Không tự đọc khi mở trang.
- Bộ tích hợp tranh bỏ qua Dates để lần dựng sau không khôi phục lại lớp tranh đã bỏ.

Kiểm tra: `node grade/lop2/tests/dates.browser.cjs` đạt trên Edge mô phỏng, mạng ngoài bị chặn, ở 320/390/1280 px. Đủ 19 từ, 50 cặp dữ kiện lịch, bốn game, giữ lượt trắc nghiệm sau tải lại; đúng ngay/tự sửa của trắc nghiệm và viết câu phát WAV thật (`playing`/`ended`) khi Web Speech bị vô hiệu hóa. Không tự đọc khi mở/tải lại trang. Đã mở xem ảnh từ vựng và lịch 14/02 trên điện thoại/máy tính. Kế hoạch có 62 từ/câu Dates, bổ sung 50 WAV còn thiếu, không loại mục âm thanh cũ. Kiểm tra âm WAV không im lặng, cách chấm Game 4, liên kết 322 trang, font nội bộ và cú pháp đều đạt. Chưa kiểm tra điện thoại vật lý.
