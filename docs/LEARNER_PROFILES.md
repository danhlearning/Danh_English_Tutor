# Hồ sơ người học trên thiết bị

## Trải nghiệm

Lần đầu mở website, người học nhập tên, có thể chọn bạn đồng hành và bấm **Vào học ngay**. Không cần email hoặc mật khẩu. Các trang học đều có thanh tên, **Đổi người học** và **Hồ sơ**.

Phiên học mới gợi ý tên gần nhất và hỏi “Hôm nay vẫn là … phải không?”. Người học chọn **Đúng rồi, vào học** hoặc chọn một tên khác, thêm người học. Trong cùng tab, chuyển bài và tải lại vẫn giữ người đang học. Phiên được xác nhận trong tối đa 12 giờ; có thể chủ động **Kết thúc phiên học**. Mỗi tab giữ người học riêng.

Mỗi tên có ID độc lập. Trùng tên không nhập chung dữ liệu; đổi tên hoặc bạn đồng hành giữ lộ trình. Danh sách phân biệt hồ sơ trùng cả tên và hình bằng số hồ sơ. Xóa hồ sơ cần xác nhận, chỉ xóa dữ liệu của tên đó.

## Tiến độ và chuyển đổi

- Tách dữ liệu phòng ngữ pháp, ngữ pháp lớp 6/7, từ vựng lớp 2/4/6/7, sổ tay/ôn tập từ vựng và tùy chọn hiệu ứng theo hồ sơ.
- Phòng ngữ pháp tiếp tục lượt dở với thứ tự câu, câu trả lời và các lần thử đã lưu. Các hoạt động khác tiếp tục theo khả năng lưu tiến độ vốn có; không tự gắn trạng thái hoàn thành cho việc mở trang.
- Phần phản xạ IPA ghi lịch sử lượt kết thúc và kết quả riêng. Chưa khôi phục nguyên lượt IPA dở. Đồng hồ không chạy trước khi xác nhận tên hoặc khi tab bị ẩn.
- Hồ sơ có lối **Tiếp tục bài gần đây**. Đây là lịch sử mở bài, không phải bằng chứng thành thạo.
- Nếu máy có tiến độ cũ, biểu mẫu đầu tiên mặc định chọn giữ tiến độ cho tên đó. Chuyển đổi chỉ một lần, không xóa bản cũ. Chỉ lấy dữ liệu học từ sổ tay cũ, không sao chép email/mật khẩu vào hồ sơ hoặc bản sao lưu.

## Sao lưu và giới hạn

Hồ sơ chỉ lưu trên cùng trình duyệt và địa chỉ website. Đổi thiết bị, trình duyệt, tên miền hoặc cổng preview sẽ dùng vùng dữ liệu khác. Xóa dữ liệu trình duyệt có thể mất lộ trình. Tải bản sao lưu JSON trong **Hồ sơ**, rồi khôi phục trên trình duyệt hoặc thiết bị khác. Khôi phục luôn tạo hồ sơ mới để tránh ghi đè người đang học; chỉ nhận định dạng và khóa dữ liệu học hợp lệ, tối đa 5 MB/1.000 khóa.

Hồ sơ là cách phân chia người học, không phải tài khoản bảo mật. Người dùng chung thiết bị có thể chọn các tên khác. Không có đăng nhập máy chủ, đồng bộ tự động hoặc gửi tên/lộ trình tới máy chủ từ tính năng này.

Nếu lưu lâu dài bị chặn, website dùng bộ nhớ phiên và thông báo rõ. Nếu cả hai bộ nhớ trình duyệt đều bị chặn, dữ liệu tạm giữ trong tab để tiếp tục khi chuyển trang; cần tải bản sao lưu trước khi đóng tab. Lỗi thiếu dung lượng hiển thị cảnh báo, không báo đã lưu thành công.

## Chỉ dẫn phát triển

`shared/learner-profile-core.js` quản lý hồ sơ, chuyển đổi, sao lưu và vùng lưu. `shared/learner-profile.js` khởi tạo đồng bộ trước mã bài học, hiển thị cửa chọn tên và quản lý phiên; giao diện cô lập bằng Shadow DOM, Nunito tự lưu trong dự án. Hai script xuất hiện trên 104 trang công khai và hai mẫu trang.

Mã học dùng `window.DanhLearners.storage`. Mỗi tài liệu giữ cố định ID của người học khi khởi tạo. Đổi người học tải lại tài liệu; việc lưu trong `pagehide` của trang cũ vẫn ghi cho đúng người cũ. Không thay thế hay sửa prototype của `localStorage`.

Vùng lưu `danh-learner-data:<ID>:<khóa học>`, mô tả riêng từng ID, khóa phiên trong `sessionStorage`. ID tab trong `window.name` giúp tránh kế thừa xác nhận khi mở tab mới. Dấu nguồn ghi theo tab phân biệt sự kiện lưu khi tải lại với cập nhật từ tab khác. Tab dùng cùng hồ sơ và đã đọc dữ liệu bị thay đổi sẽ khóa ghi, yêu cầu tải lại; tab dùng hồ sơ khác không bị đổi tên hoặc ghi nhầm. Hồ sơ bị xóa ở tab khác không thể được phục hồi bởi trang cũ.

Khóa mới dùng tiền tố `danh-`, `danh:` hoặc `danh.`. Kiểm tra lưu bị chặn và dữ liệu hỏng. Không ghi tiến độ trực tiếp vào bộ nhớ dùng chung. Trang/mẫu mới cần tải hai script trước các script học; `scripts/install-learner-profiles.cjs` cài lại script theo đường dẫn tương đối. Bộ dựng trang ngữ pháp đã giữ bước này.

## Kiểm tra

- `node --test tests/learner-profiles/*.test.cjs`: trùng tên, đổi tên, cách ly, xóa, trang cũ, chuyển đổi/rollback, sao lưu/định dạng sai, tạo đồng thời, khóa ghi và chuẩn hóa tên.
- `node tests/learner-profiles/browser.cjs`: luồng chọn tên, ba hồ sơ, tiếp tục ngữ pháp và hiệu ứng riêng, tab độc lập, tải lại/phiên mới, đổi tên, sao lưu/khôi phục/xóa, flashcard, các lớp và IPA, sáu chiều rộng và lưu bị chặn.
- Giữ toàn bộ kiểm tra nội dung/game hiện có. Bộ kiểm tra trình duyệt ngữ pháp khởi tạo hồ sơ kiểm thử riêng, không vượt qua cửa chọn tên của người dùng thật.

Các kiểm tra trên dùng trình duyệt mô phỏng; chưa phải nghiệm thu trên điện thoại vật lý.
