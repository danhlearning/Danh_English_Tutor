# Lớp 1, 3, 5 theo mẫu lớp 4 · 15/10/2026

- Mục tiêu: giữ nội dung từng lớp, dùng bố cục lớp 4 gồm bảng từ/ảnh/nghe, mẫu câu, lật thẻ, nghe chọn tranh, gõ từ và dùng từ trong câu; danh mục có tiến độ từng Unit và ôn hôm nay.
- Học theo lượt bằng số từ thực trong bộ chọn. Nghe chọn một trong các tranh; từ trừu tượng có nghĩa tiếng Việt hỗ trợ phân biệt. Gõ từ và điền chỗ trống chấm mẫu từ/cụm từ, bỏ qua hoa/thường và khoảng trắng; không chấm mọi câu mở. Lớp 1 dùng câu ngắn và có thể nhờ người lớn đọc hướng dẫn.
- Lật thẻ chỉ ghi đã xem. Tách đúng ngay, tự sửa, đã xem đáp án, bỏ qua; đúng ngay mới ghi dấu kỹ năng, sai/xem đưa vào ôn. Không biến lượt cũ sang thành thạo. Cho thử lại, gợi ý/xem chủ động, tổng kết và ôn từ yếu. Hoàn thành khi từng nhiệm vụ đã có kết quả.
- Dùng ảnh AI trong kho khi đúng nghĩa, tạo bổ sung bằng imagegen từng ảnh thiếu; không dùng emoji/SVG icon thay hình từ vựng. Số/màu/quan hệ trừu tượng có nhãn nghĩa do giao diện dựng chính xác. Ảnh mới được giữ bản gốc và tối ưu WebP trong dự án.
- Giữ khóa cũ `danh-g<lớp>-unit<N>-<mode>-v1` và đường tiếp tục giao diện cũ ở trang `legacy.html?unit=...&mode=...`; không đổi câu xếp thành điền câu. Bộ mới dùng khóa lớp/Unit riêng qua `DanhLearners.storage`; ôn cũng riêng theo lớp. Đổi tên/hồ sơ và nhiều tab tiếp tục dùng cơ chế core hiện có.
- Kiểm tra so với lớp 4: sáu tab, bộ chọn, ba game ảnh, bài điền, lịch ôn, tải lại và chống nhấn lặp, âm/thao tác/giảm chuyển động, bộ nhớ lỗi/bị chặn, không tràn 320–1280px; ghi rõ giới hạn kiểm tra giọng và thiết bị thật.
