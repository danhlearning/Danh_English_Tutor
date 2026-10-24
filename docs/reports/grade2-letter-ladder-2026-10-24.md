# Nghiệm thu bản thử Ghép chữ lớp 2

## Đã triển khai

- Thay Game 1 lật thẻ bằng Ghép chữ trên 34 trang từ vựng lớp 2, gồm 16 Unit và 18 chủ đề. Chỉ bật trong phạm vi lớp 2; các lớp khác và topic mở từ lớp khác giữ giao diện cũ.
- Cùng nhóm tối đa tám từ đi qua nấc thiếu 1–2–3 chữ rồi tự gõ cả từ trong tab Chính tả. Không đủ chữ thì bỏ qua nấc không phù hợp. Khoảng trắng/dấu nối không bị che; chữ lặp có thẻ riêng, có thể trả chữ khỏi ô.
- Có gợi ý, xem mẫu, tự sửa, tổng kết cuối lượt, giữ nháp và lượt dở theo hồ sơ. Kết quả tách đúng ngay/tự sửa/gợi ý/đã xem. Lượt mới ghi vào khóa riêng; giữ thẻ và lượt chính tả cũ. Nút Chính tả riêng ở tổng kết cuối mở lại game cũ.
- Nút nghe chỉ có biểu tượng, giọng đọc đúng là từ tiếng Anh. Dùng giọng đọc chung/WAV nội bộ, tùy chọn âm đã lưu và giảm chuyển động. Không tự phát khi mở hoặc khôi phục bài.
- Ô trống dùng nét liền của `shared/exercise-gaps.js` và Nunito nội bộ. Mẫu HTML và bộ đồng bộ lớp khác đã được xử lý để không vô tình bật bản thử ở lớp khác. Không tạo hoặc thay ảnh.

## Đã kiểm tra đạt

- Bộ kiểm tra dữ liệu toàn repo: **130/130**, gồm sáu kiểm tra mới cho chuỗi nấc, chữ trùng, từ ngắn/cụm từ, phân loại kết quả, lưu/khôi phục, dữ liệu hỏng, bộ nhớ chặn và phạm vi lớp.
- `letter-ladder.browser.cjs`: hoàn thành toàn bộ 1–2–3–tự gõ với cùng từ ở Unit 1; sửa đúng, gợi ý, xem mẫu, nhập thiếu và nhấn lặp; giữ vị trí chữ/nháp qua tải lại, chuyển tab đúng lúc và hồ sơ An/Bình độc lập. Tiến độ học cũ giữ nguyên; chỉ trường tab hiện tại đổi theo điều hướng.
- `letter-ladder-pages.browser.cjs`: mở và bắt đầu game ở **34 trang**, không lỗi JavaScript hoặc 404, không tràn bố cục 390 px; **397 cách viết từ** đều có WAV nội bộ.
- `letter-ladder-mute.browser.cjs`: khi Web Speech bị vô hiệu hóa, loa chủ động có sự kiện media **playing/ended** ngay cả khi tắt âm phản hồi đã lưu; đáp án tự động tôn trọng tắt âm; khôi phục câu đã chấm không tự đọc. Giảm chuyển động và không có UI chỉnh âm/chuyển động.
- Kiểm tra chơi bình thường bằng media thật cho cả đúng ngay, tự sửa và đúng có gợi ý; xem mẫu không tự đọc.
- Đã mở và xem ảnh chụp 390/1280 px; xem nấc ba ở 390 px, kiểm tra thêm 320 px không tràn. Các thẻ chữ và ô có vùng bấm tối thiểu 44 px.
- Kiểm tra font thực tế ở **27 URL** với mạng ngoài bị chặn, gồm chữ nghĩa từ trong game mới, hộp hồ sơ và footer: glyph tiếng Việt dùng Nunito nội bộ.
- Kiểm tra liên kết/ID và đường tải font: **323 trang**; footer **316 trang**; cú pháp các tệp mới và bộ dựng đạt.
- Khi chạy toàn bộ kiểm tra, phát hiện trường hợp ôn từ có cùng cách viết nhưng khác nghĩa bị lọc nhầm trước khi ưu tiên từ đến hạn. Đã sửa thứ tự lọc trong bộ từ vựng theo kỹ năng, thêm kiểm tra hồi quy và chạy lại luồng trình duyệt của mục này đạt.

## Giới hạn và xem thử

Đã kiểm tra trên Edge máy tính, mô phỏng các chiều rộng điện thoại; chưa thử trên điện thoại vật lý. Bản này chỉ áp dụng lớp 2 và chưa được đẩy lên GitHub Pages.

Mở máy chủ cục bộ rồi truy cập `http://127.0.0.1:8001/grade/lop2/gsunit1.html?game=letters`. Vào game là mở từ hiện tại; tự tăng mức hỗ trợ cần nhớ và chuyển sang tự gõ, không hiển thị nhãn độ khó. Lượt dở giữ nguyên chữ đã chọn.

Cập nhật giao diện: đã bỏ thanh nấc, nhãn số chữ và các nút chọn nấc. Kiểm tra trình duyệt đã chạy lại chuỗi tự chuyển, tải lại, hồ sơ, media thật, tắt âm và 34 trang; đều đạt.
