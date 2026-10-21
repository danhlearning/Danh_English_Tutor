# Hoàn thiện tích hợp tranh lớp 7

Đủ 96 tranh từ phiên trước đã được nối vào 12 Unit. Lượt này chốt phiên bản tải `pencil-20261021` cho các trang lớp 7 và giữ phiên bản đó trong bộ đồng bộ mẫu. Không đổi nội dung, ID từ/câu, URL hoặc khóa tiến độ. Giữ tông lavender, giấy và bìa riêng lớp 7; đủ năm tab Unit, ôn hai học kỳ và bốn nhóm ngữ pháp theo mẫu lớp 6.

Đã xem trực tiếp 12 bảng tranh, đủ từng mục, và hai WebP cuối sửa đồng xu/máy ảnh. Bộ 96 ảnh 768×768 khớp hash, từ, nghĩa và ví dụ trong manifest cuối. Không tạo lại ảnh. Cập nhật tài liệu lớp 7 và hồ sơ tranh đang mô tả bộ 19 ảnh cũ.

Kiểm tra đạt:

- 15 kiểm tra nội dung, ID, ánh xạ ảnh/hash và cấu trúc lớp 6–12.
- Trình duyệt ảnh lớp 7: 12 Unit × 3 chiều rộng 320/390/1280px, đủ 96 ảnh mặt nghĩa thẻ, không ảnh mặt tiếng Anh, fallback ảnh lỗi, Nunito nội bộ và chặn mạng ngoài. Đã xem ảnh chụp máy tính/điện thoại và mặt thẻ.
- Trình duyệt luồng học với `TEST_GRADES=7`: danh mục bốn chiều rộng, đủ năm tab/12 Unit, chọn từ đúng/sai/tự sửa/nhấn lặp/tải lại/tiếp tục, gõ từ, ôn học kỳ, bốn nhóm ngữ pháp Unit 1/12 và tổng kết. Hồ sơ độc lập, bộ nhớ bị chặn và giảm chuyển động đạt theo kịch bản chung; kịch bản bộ nhớ bị chặn dùng lớp 10 của cùng bộ chạy.
- Font nội bộ/UTF-8 và liên kết hợp lệ trên 238 trang; diff không lỗi khoảng trắng.

Bổ sung bước chờ dựng đủ thẻ và lựa chọn `TEST_GRADES` cho bài kiểm tra mẫu chung. Hai lượt kiểm tra toàn bộ lớp dừng vì đếm thẻ khi trang chưa dựng xong; không báo đạt kiểm tra trình duyệt cả bảy lớp trong lượt này. Bản kiểm tra riêng lớp 7 sau sửa đã đạt và lưu riêng `artifacts/secondary-template/browser-results-selected.json`.

Đây là Edge mô phỏng; chưa kiểm tra điện thoại vật lý hoặc nghe âm/giọng đọc bằng tai. Gõ từ vẫn luyện trong trang, chưa khôi phục nguyên lượt gõ dở. 576 mục ngân hàng không phải 576 ngữ cảnh độc lập. Không commit/push hoặc triển khai website.
