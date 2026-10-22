# Rà soát UI và phản hồi từ vựng lớp 6/7

## Thay đổi

- Thay việc đổi chữ ngay lập tức bằng hai mặt thẻ quay 180 độ trong 540 ms, có phối cảnh và ẩn mặt sau. Hai mặt cùng khung nên không đổi chiều cao khi lật; ảnh ở mặt nghĩa. Chặn bấm lặp trong 560 ms; điều hướng thẻ trả về mặt tiếng Anh.
- Tiếng giấy lật tổng hợp từ nhiễu lọc và âm ngắn bắt đầu cùng thao tác lật. Dùng các nhóm âm riêng: chọn, bắt đầu, chuyển câu, đúng với hai biến thể, tự sửa, sai, trợ giúp, chuỗi và hoàn thành. Âm được tạo riêng cho website.
- Loại âm/tia sáng ở cú nhấp toàn trang. Âm chọn bài gắn với thẻ danh mục; âm trả lời được gọi trực tiếp trong logic chấm, hoạt động cả qua bàn phím.
- Đúng bật nhẹ, sai rung ngang nhẹ, mốc chuỗi và hoàn thành có chuyển động chúc mừng. Phản hồi chữ/màu vẫn hiện khi tắt chuyển động.
- Mốc 3, 5, 10 và mỗi 5 câu tiếp theo có âm thưởng riêng. Chuỗi chỉ gồm câu đúng ngay, sai/xem/tự sửa ngắt chuỗi. Lượt trắc nghiệm suy ra chuỗi từ kết quả đang lưu nên tải lại không phát thưởng lặp.
- Gõ từ cũng có phản hồi đúng/sai/tự sửa, chuỗi và kết thúc. Giọng đọc tự động sau câu đúng đợi hiệu ứng kết thúc; chuyển thao tác hoặc tắt âm hủy lịch đọc còn chờ.
- Giữ khóa lưu, quy tắc sao, dữ liệu/tiến độ và lựa chọn âm/chuyển động. Thêm phiên bản tài nguyên trên 24 trang Unit, hai danh mục và hai trang ôn để tải bản mới.

## Kiểm tra

- `tests/vocabulary-game/feedback-browser.cjs`: hai lớp, hai mặt và chuyển động 3D giữa lượt lật, tiếng lật được khởi chạy, bấm nhanh, bàn phím, thẻ ảnh lớp 7, chiều cao ổn định và các chiều rộng 320/390/760/1280 px. Kiểm tra sự kiện phát âm đúng/sai/tự sửa/trợ giúp/kết thúc, mốc 3/5/10 ở cả hai học kỳ, ngắt chuỗi, tải lại không phát thưởng, gõ từ, tắt âm và giảm chuyển động hệ thống.
- `tests/vocabulary-game/browser.cjs`: nội dung/cách chấm/ôn/tiếp tục lượt/hồ sơ/lưu bị chặn và hai học kỳ của cả hai lớp; cập nhật yêu cầu bấm nền không phát âm.
- `tests/learner-profiles/browser.cjs`: chuyển đổi hồ sơ, nhiều tab, lưu tiến độ, các lớp và phiên học đều đạt.
- Kiểm tra liên kết/ID đạt trên 107 trang. Kiểm tra cú pháp script và khoảng trắng thay đổi đạt.
- Đã xem ảnh chụp trình duyệt ở kích thước điện thoại: mặt nghĩa lớp 6, lớp 7 và thẻ có ảnh. Có khoảng cách giữa nút điều hướng thẻ và liên kết ôn học kỳ.

## Giới hạn

Kiểm tra bằng trình duyệt mô phỏng và sự kiện tạo/phát/dừng âm; chưa đánh giá chất âm bằng tai trên loa/điện thoại thật. Không đổi khả năng tiếp tục lượt vốn có của gõ từ và lật thẻ; lượt trắc nghiệm giữ khả năng tiếp tục đầy đủ.
