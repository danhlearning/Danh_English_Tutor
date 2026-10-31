# Điều hướng và chọn game trên iPad — 31/10/2026

- Mục tiêu học: chọn đúng hoạt động để ôn từ, nghe/chọn, ghép/gõ chữ hoặc viết câu; giữ lượt đang học khi đổi hoạt động.
- Cách chơi: thêm lối về hoạt động, Trang chủ, Lớp học và Ôn tập theo đúng lớp; nút Chọn game lớn mở bảng thẻ có biểu tượng, mô tả thao tác và đánh dấu game hiện tại. Thư viện/phòng ngữ pháp dùng lối chọn hoạt động hiện có.
- Chấm, hỗ trợ khi sai, hoàn thành: không đổi cách chấm, điểm, gợi ý, đáp án hoặc kết thúc lượt; điều hướng không được tính thành bằng chứng học.
- Dùng lại nút chuyển game của từng trang, không khởi tạo lại game hiện tại khi chỉ mở/đóng bảng chọn. Giữ URL ngữ cảnh lớp và nháp; không tự phát âm khi mở bảng.
- Bảng chọn hỗ trợ Đóng/Escape, focus bàn phím và giảm chuyển động; nút/thẻ dễ chạm, khung co giãn trên iPad dọc/ngang và cửa sổ hẹp. Không che ô nhập và nút chấm khi bảng đã đóng.

## Kết quả kiểm tra

- Có nút Hoạt động, Trang chủ, Lớp và Ôn tập trong khung. Thư viện/phòng học không xác định lớp có lối Kỹ năng. Liên kết giữ tiền tố website từ URL script và đúng ngữ cảnh lớp; đã tải kiểm tra các đích lớp 2, 6, 12 thành công.
- Nút Chọn game cao ít nhất 56 px, rộng đến 340 px; bảng thẻ hai cột, mỗi thẻ cao ít nhất 126 px trên iPad rộng (một cột, ít nhất 104 px ở cửa sổ hẹp). Có game hiện tại, hướng dẫn ngắn, nhãn/miêu tả cho đọc màn hình và nút đóng.
- Kiểm tra 7 khổ: 1024×768, 768×1024, 744×1133, 1366×1024, 600×744, 507×768, 320×568; bảng chọn và thanh điều khiển không tràn ngang. Đã xem ảnh trực tiếp ở khổ ngang/dọc.
- Mở/đóng/Escape/chạm nền đóng đúng, trả focus về nút chọn. Chọn lại game hiện tại giữ nguyên phần tử vùng chơi, không dựng lại. Mở bảng không phát giọng đọc.
- Đổi game và quay lại giữ nháp ghép chữ, nháp luyện câu, phần tử nhập/nháp gõ từ lớp 6; thư viện quay về chọn hoạt động và tiếp tục nháp đúng. Điện thoại giữ giao diện cũ.
- 168 kiểm tra tự động, cú pháp 156 tệp JS, liên kết/ID và font trên 324 trang, chân trang trên 316 trang đạt.
- Bộ khung iPad 10 trường hợp, bộ bàn phím lớn/tự chuyển và bộ bố cục 112 trường hợp đạt; giữ ô nhập lớn và nút chấm nhìn thấy khi đóng bảng.
- Animals: đủ 50 ảnh và 16 câu đếm dùng âm thật, điểm và bàn phím iPad đạt với bộ chọn game mới. Cập nhật kiểm tra cũ từ hộp select sang bảng thẻ.
- Phiên bản `ipad-navigation-20261031` được dùng cho trang/mẫu/bộ dựng và bộ nạp; chạy lại không tạo thay đổi.

Bằng chứng: `artifacts/ipad-navigation/results.json`, `chooser-1024-768.png`, `chooser-768-1024.png`, `navigation-landscape.png`; log `artifacts/publish-verification/navigation-unit-tests.txt` trong bản kiểm tra.

Giới hạn: Edge mô phỏng cảm ứng, chưa thử Safari/iPad vật lý.
