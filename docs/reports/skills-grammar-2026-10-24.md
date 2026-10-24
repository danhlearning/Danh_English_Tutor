# Kiểm tra luyện ngữ pháp và từ vựng

## Phạm vi

- Ngữ pháp: trang chọn cấp độ/kiểu chơi mới, 25 chủ đề từ ngân hàng hiện có; chọn đáp án, điền, xếp, sửa và viết lại câu, hoặc lượt trộn. Tối đa tám tình huống khác nhau. Lượt trộn có các dạng thực sự tồn tại trong bộ; bộ ít câu không được chèn câu lặp.
- Mức luyện A1–B2 là phân nhóm tham chiếu của website theo cấu trúc. B2 hiện là các tình huống điều kiện loại ba; chưa phải bộ phủ toàn bộ B2. Pre A1/C1/C2 chưa có bộ riêng, chọn vào sẽ thấy trạng thái chờ và không mở lượt giả. Ba mức hỗ trợ trong bài cũ giữ nguyên ý nghĩa, không được đổi tên thành CEFR.
- Giữ URL bài, lý thuyết, ID câu, khóa và tiến độ phòng ngữ pháp; dữ liệu lớp và từ vựng riêng. Dùng gợi ý được ghi riêng, không nhận đúng ngay. Lượt mới có thể xin gợi ý ngay; xem mẫu sau một lần thử hoặc dùng gợi ý. Lượt cũ giữ điều kiện hỗ trợ trước đây.
- Từ vựng: năm kiểu luyện dùng chung kho lớp 1–12, phân cấp tham chiếu, lọc lớp/Unit, ôn và tiếp tục lượt. Trang sổ tay cũ vẫn truy cập được.
- Giao diện giấy và màu xanh đồng bộ; chữ ngắn, không thêm subtitle. Không tạo ảnh mới. Không thay tệp ảnh lớp trong đợt này.

## Đã chạy đạt

- Toàn bộ lệnh kiểm tra dữ liệu trong workflow: **123/123**; gồm chọn cấp độ/kiểu luyện, chấm, lưu trữ, lịch ôn, câu/âm thanh và dữ liệu lớp.
- `tests/vocabulary-skills/browser.cjs`: năm kiểu luyện, nháp/lượt dở, đúng ngay/tự sửa/gợi ý/xem mẫu, hồ sơ riêng, sổ tay cũ; media thật khi vô hiệu hóa Web Speech.
- `tests/grammar-room/skills-browser.cjs`: năm kiểu luyện và lượt trộn B2, không trùng tình huống, nháp/lượt dở, gợi ý và xem mẫu riêng, hoàn thành/tổng kết, hồ sơ độc lập, không ghi vào tiến độ khác, không lỗi JavaScript hoặc tài nguyên 404.
- Giọng đọc kiểm tra bằng sự kiện `playing` và `ended` của media thật khi Web Speech bị vô hiệu hóa, cho cả đúng ngay và tự sửa. Xếp/sửa/viết lại đọc cả câu đúng; nghe lại dùng cả câu. Tải lại câu đã chấm không tự đọc.
- `tests/grammar-room/experience-browser.cjs`: lựa chọn tắt âm đã lưu, loa nghe lại, giảm chuyển động của thiết bị, không còn UI điều chỉnh âm/chuyển động và sáu chiều rộng 320–1280 px.
- `tests/grammar-room/browser-smoke.cjs` với `GRAMMAR_SKIP_FULL=1`: thử lại/xem đáp án, tiếp tục lượt cũ, URL cũ, lý thuyết, lưu bị chặn/hỏng và sáu bố cục. Không chạy lại toàn bộ 75 lượt cũ trong trình duyệt; bộ kiểm tra dữ liệu vẫn duyệt 75 nhóm chủ đề/mức hỗ trợ.
- Kiểm tra font thực tế với mạng ngoài bị chặn: gồm hai mục kỹ năng, bài ngữ pháp, hộp hồ sơ và footer; chữ tiếng Việt dùng glyph Nunito nội bộ.
- Liên kết/ID và đường tải font: **323 trang**; footer **316 trang**. Đã mở xem ảnh chụp trang ngữ pháp ở 390/1280 px và màn bài ở 390 px; trang từ vựng đã được xem ở đợt liền trước.
- Dựng lại 11 trang ngữ pháp từ bộ dựng đã cập nhật, giữ mẫu trang đầu mới; kiểm tra cú pháp và kế hoạch âm thanh. Mọi câu nghe lại đã có WAV, không cần tạo tệp âm mới.

## Giới hạn

Đã kiểm tra bằng Edge trên máy tính và bố cục mô phỏng điện thoại, chưa kiểm tra trên điện thoại vật lý. Các mức luyện là lộ trình biên soạn, không phải bài xác định trình độ. Thay đổi đang ở bản cục bộ, chưa phát hành lên GitHub Pages trong đợt này.
