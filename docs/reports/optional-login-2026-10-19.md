# Nút Đăng nhập thay hộp hỏi khi mở web

- Mở web, hết hạn phiên hoặc kết thúc phiên đều hiển thị nút Đăng nhập, không tự bật hộp chọn tên và không tự chọn hồ sơ gần nhất.
- Khi bấm Đăng nhập, mở tạo hồ sơ nếu chưa có tên, hoặc danh sách hồ sơ đã lưu. Có Đóng/Escape, khóa tương tác nền chỉ trong lúc mở, trả focus về nút gọi.
- Giữ phiên còn hạn và toàn bộ dữ liệu/ID hồ sơ cũ. Học thử qua DanhLearners.storage có vùng tạm riêng theo tab, giữ qua tải lại/chuyển trang, không tự nhập vào hồ sơ khi đăng nhập. Không thêm đăng nhập máy chủ/mật khẩu.
- Nút trên thanh đầu trang dùng Nunito, màu tím, vùng bấm tối thiểu 44 px; không thêm âm thanh hoặc chuyển động mới.

Đã đạt 8 kiểm tra lõi hồ sơ. Kiểm tra trình duyệt hồ sơ đầy đủ đạt: chuyển đổi dữ liệu cũ, ba hồ sơ độc lập, lượt ngữ pháp, nhiều tab và khóa ghi, đổi tên, sao lưu/khôi phục/xóa riêng, flashcard, dấu từ lớp 7, hết phiên, sáu kích thước, lớp 2/4/6/7 và IPA, bộ nhớ bị chặn.

Kiểm tra riêng optional-login.browser.cjs đạt: lần đầu không hộp hỏi hoặc inert nền; mở/đóng/Escape/trả focus; học thử qua tải lại và chuyển trang; bài Body Parts mở chơi được; tab khác độc lập; không nhập tiến độ học thử vào hồ sơ; giữ dữ liệu hồ sơ qua đăng xuất/đăng nhập; hết 12 giờ; bố cục 320/390/760/1280 px; cả localStorage và sessionStorage bị chặn vẫn giữ lượt học thử qua window.name. Không lỗi trang trong luồng thử. Đã mở xem ảnh chụp trang chủ 390 px.

Kiểm tra ôn tổng hợp lớp 2 cũng đạt: chọn Unit/từ, bốn kiểu chơi, chấm, tiếp tục, cách ly hồ sơ, nhiều tab và bộ nhớ bị chặn. Liên kết/ID hợp lệ trên 199 trang. Các kiểm tra dùng trình duyệt mô phỏng, chưa thử trên điện thoại vật lý.
