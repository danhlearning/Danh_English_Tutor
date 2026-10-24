# Kiểm tra Ghép chữ ôn học kỳ lớp 2

- Thêm Ghép chữ vào trang ôn tập lớp 2; dùng chung hộp chọn học kỳ 1, học kỳ 2 và Unit tùy chọn. Bộ tám từ ưu tiên phủ Unit đã chọn, gộp từ cùng cách viết/nghĩa và giữ nguồn. Không thêm ngân hàng tiếng Anh hoặc ảnh mới.
- Dùng lại Ghép chữ đã duyệt: trộn từ, tăng yêu cầu nhớ ngầm rồi tự gõ. Không hiển thị độ khó/nấc. Mỗi bộ Unit có lượt riêng, chuyển bộ rồi trở lại giữ nguyên chữ đã đặt và nháp. Chín dạng ôn cũ giữ nguyên dữ liệu và lượt dở.
- Kiểm tra dữ liệu toàn repo: **134/134**. Ba kiểm tra mới xác nhận nguồn từ/ID/nghĩa, phủ tám Unit từng học kỳ và lưu độc lập theo bộ.
- Kiểm tra trình duyệt `letter-review.browser.cjs` đạt: hai học kỳ có đủ các Unit trong nhóm từ, tiếp tục lượt chính xác, các chiều rộng 320/390/1280 không tràn, tự chuyển sang gõ, nháp qua tải lại và hồ sơ An/Bình độc lập. So sánh lượt ôn tổng hợp cũ trước/sau không thay đổi; không lỗi JavaScript hoặc 404.
- Web Speech bị vô hiệu hóa: có sự kiện media **playing/ended** cho đúng ngay và tự sửa, không chỉ gọi mock. Tải lại phần đang gõ không tự đọc. Dùng WAV nội bộ hiện có qua DanhAnswerSpeech.
- Đã mở xem ảnh chụp giao diện học kỳ 1 ở 390/1280 px. Font glyph thực tế đạt trên **28 URL** với mạng ngoài bị chặn, gồm trang ôn tập mới, nghĩa từ, hộp hồ sơ và footer.
- Kiểm tra lại game ở Unit sau khi mở rộng bộ dùng chung đạt, gồm tự sửa/gợi ý/xem mẫu, tăng ngầm, nháp và hồ sơ. Liên kết/ID và đường font **323 trang**, footer **316 trang** đạt.
- Mẫu đồng bộ lớp khác loại bỏ các thành phần của bản thử học kỳ; các lớp khác không tự bật game mới.

Kiểm tra trên Edge máy tính và kích thước mô phỏng điện thoại; chưa kiểm tra trên điện thoại vật lý. Bản cục bộ tại `http://127.0.0.1:8001/grade/lop2/review.html`; chưa phát hành lên GitHub Pages trong đợt này.
