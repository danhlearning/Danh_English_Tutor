# Nghiệm thu hồ sơ người học — 03/10/2026

## Thành phẩm

- 104 trang công khai và hai mẫu trang dùng hồ sơ chung, nhập tên để bắt đầu, chọn tên cũ hoặc thêm tên mới. Giữ Nunito lưu trong dự án, màu pastel, nút lớn và bạn đồng hành.
- Tiến độ/tùy chọn/lượt ngữ pháp dở cách ly theo ID. Tải lại và chuyển bài giữ người đang học; phiên mới hỏi xác nhận. Các tab chọn người độc lập.
- Đổi tên, bạn đồng hành, tải sao lưu JSON, khôi phục thành hồ sơ mới, xác nhận xóa riêng hồ sơ và kết thúc phiên.
- Chuyển dữ liệu cũ cho hồ sơ đầu tiên theo lựa chọn; không chuyển email/mật khẩu. Loại bỏ biểu mẫu đăng nhập email/mật khẩu cũ ở flashcard.
- Ghi kết quả lượt phản xạ IPA kết thúc, không ghi hai lần khi thao tác lặp. Lượt IPA dở chưa được khôi phục.
- Tab cũ không ghi nhầm hồ sơ khi đổi tên học viên; tab dùng cùng hồ sơ nhận yêu cầu tải lại khi dữ liệu đã đọc bị cập nhật ở tab khác. Sự kiện lưu của chính tab khi tải lại không tạo cảnh báo nhầm.

## Đã kiểm tra

- 62 kiểm tra tự động về nội dung/game và hồ sơ đều đạt: trùng tên, đổi tên, xóa/cách ly, chuyển đổi một lần, rollback khi thiếu dung lượng, sao lưu/định dạng sai, tạo đồng thời, trang bị khóa và chuẩn hóa tên.
- Playwright/Edge: Minh/Hoa/Nam, giữ tiến độ cũ, bài ngữ pháp dở và âm thanh riêng, đổi hồ sơ giữa hai tab và lưu lúc rời trang, phiên mới/tải lại, đổi tên, tải/khôi phục/xóa bản sao lưu, kết quả flashcard và Chọn nghĩa lớp 7, trang lớp 2/4/6/7 và IPA.
- Kiểm tra trạng thái lưu bị chặn hoàn toàn vẫn dùng được hồ sơ tạm qua tải lại, kèm thông báo.
- Sáu chiều rộng 320, 375, 390, 430, 844 và 1280 px; hộp chọn tên không tràn ngang. Ảnh kiểm tra trong `artifacts/learner-profiles/`.
- Bộ kiểm tra trình duyệt ngữ pháp chạy lại phần tương tác, tiếp tục bài, dữ liệu hỏng/bị chặn, lý thuyết và đường dẫn cũ; bộ kiểm tra Nunito/âm thanh/animation/giảm chuyển động đạt. Không chạy lại 75 lượt đầy đủ trong thay đổi hồ sơ, vì nội dung/cách chấm không đổi; lần nghiệm thu phòng ngữ pháp trước đã chạy 750 đáp án.
- Kiểm tra riêng IPA: trả lời đúng được ghi trong lượt hết giờ; hết giờ/kết thúc lượt chỉ ghi một lần.
- Cú pháp JavaScript hợp lệ, liên kết/ID hợp lệ trên 105 HTML đang dùng của bộ kiểm tra, footer hợp lệ trên 98 trang. Xác minh riêng đủ 104 trang công khai tải hai script hồ sơ.

## Giới hạn

Kiểm tra điện thoại bằng mô phỏng trình duyệt, chưa thao tác trên thiết bị vật lý. Dữ liệu nằm trên trình duyệt và địa chỉ website hiện tại; chưa có đăng nhập/đồng bộ máy chủ. Hồ sơ dùng chung thiết bị không có mật khẩu hoặc kiểm soát truy cập. Cần tải bản sao lưu để chuyển thiết bị hoặc bảo vệ lộ trình trước khi xóa dữ liệu trình duyệt.
