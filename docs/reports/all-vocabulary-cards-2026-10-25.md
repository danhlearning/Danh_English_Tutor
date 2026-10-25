# Đồng bộ mọi thẻ từ vựng · 25/10/2026

## Phạm vi

- Rà toàn bộ thẻ từ trên các trang có lưới từ vựng trong lớp 1–12: Unit hiện tại, 19 topic phụ dùng chung và các trang Unit cũ.
- Giữ ảnh, khung và bố cục; chỉ bổ sung và củng cố thao tác bấm hình nghe từ.
- Bộ gắn nghe dùng chung cập nhật cả khi tên từ đổi trên cùng một thẻ, kể cả sửa trực tiếp nút văn bản.
- Loại bỏ vùng nghe con khi sao chép tranh vào nút hình mới. Đây là lỗi tìm thấy khi kiểm tra thẻ cuối của topic gia đình: nút hình sao chép một vùng nghe đã có, tạo hai lớp tương tác. Giờ hình chỉ có một vùng nghe; không đổi nội dung tranh.
- Đổi phiên bản URL hồ sơ/thao tác nghe và script tranh trong trang, mẫu, bộ dựng để nạp mã mới.

## Kiểm tra

- `all-vocabulary-cards.browser.cjs`: rà 265 trang và 1.907 thẻ thực tế; bỏ các tiêu đề nhóm khỏi số thẻ. Mỗi hình gọi đúng từ một lần; không có vùng nghe con bị lồng, thiếu liên kết phát âm hoặc thiếu tệp WAV. Không có lỗi JavaScript hoặc tự phát khi tải trang. Kiểm tra thêm thay đổi tên từ trên cùng thẻ không giữ giọng đọc cũ.
- `topic-picture-audio.browser.cjs`: kiểm tra media thực tế ở thẻ đầu/cuối của từng topic, gồm thao tác cuộn tới thẻ cuối; vô hiệu hóa Web Speech, xác nhận `playing`/`ended`, đúng từ và đúng một lần. Không dùng kết quả giả lập gọi hàm để thay cho kiểm tra media.
- 136 kiểm tra dữ liệu, trạng thái và tài nguyên đều đạt. Kiểm tra liên kết và font tĩnh trên 323 trang, footer 316 trang đạt.

Đây là kiểm tra trên Edge tự động với màn hình điện thoại mô phỏng; chưa xác nhận trên điện thoại vật lý. Bản thay đổi ở máy cục bộ, chưa đẩy GitHub.
