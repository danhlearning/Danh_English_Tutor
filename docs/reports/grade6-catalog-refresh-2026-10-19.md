# Trang lớp 6 — giao diện và bìa mới

Đã sắp xếp lại trang danh mục lớp 6: bìa bút chì, tiêu đề lớn và một nút vào học; ba lối chọn Unit/ôn học kỳ/ngữ pháp; thẻ Unit gọn hơn và phần giới thiệu ít chữ. Bỏ câu “Khám phá 12 Unit qua từ vựng, ví dụ và bài luyện ngắn.”, giữ đủ 12 Unit và các địa chỉ cũ.

Trang danh mục dùng chế độ hiệu ứng tự động: âm thanh và chuyển động bật, không dựng cụm tùy chỉnh. Vẫn chỉ phát âm sau thao tác và tôn trọng prefers-reduced-motion. Chế độ áp dụng riêng trang danh mục này, không ghi đè lựa chọn đã lưu hay thay điều khiển trong các bài/lớp khác.

Ảnh bìa tạo bằng image_gen tích hợp, lưu `grade/lop6/assets/images/grade6-cover-pencil-v1.webp` (1536 × 1024). Prompt cuối, tệp nguồn và SHA-256 ở `artifacts/grade6-pencil/catalog-cover-generation.json`. Đã mở trực tiếp WebP cuối, kiểm tra không chữ và không lỗi hình nhìn thấy. Hiệu ứng CSS nâng nhẹ tranh và ngôi sao, không tạo video hay nhạc tự phát.

Đã đạt:

- Kiểm tra trình duyệt danh mục ở 320/390/760/1280 px: ảnh tải đủ và có kích thước hiển thị, không tràn ngang, 12 liên kết Unit đúng; không còn điều khiển âm thanh/chuyển động hoặc câu đã yêu cầu bỏ.
- Hiệu ứng vẫn bật khi tùy chọn lưu cũ là tắt; giá trị lưu cũ giữ nguyên. Không tạo AudioContext khi tải trang; nhấn thẻ có phản hồi. Khi thiết bị giảm chuyển động, animation bìa dừng và hàm hiệu ứng báo giảm chuyển động.
- Đã mở xem ảnh chụp toàn trang máy tính và điện thoại sau sửa, ảnh lưu `artifacts/grade6-pencil/catalog-<width>.png`.
- 5 kiểm tra nội dung/ảnh THCS đạt. Kiểm tra trình duyệt phản hồi từ vựng lớp 6 và 7 đạt: lật thẻ, bàn phím, khóa nhấn lặp, đúng/sai/tự sửa/xem đáp án, chuỗi, âm, tắt âm và giảm chuyển động trong bài.
- Liên kết/ID hợp lệ trên 199 trang; footer hợp lệ trên 193 trang. Không thay dữ liệu học hoặc tiến độ.

Kiểm tra dùng trình duyệt mô phỏng, chưa nghiệm thu trên điện thoại vật lý.

## Nền giấy be và tỷ lệ điện thoại/tablet

- Đổi “Cùng vào học” thành “Vào học”. Lấy mẫu vùng giấy trống của bìa (#fcf5e5), đồng bộ nền trang, bìa, thanh hồ sơ và footer; các bề mặt thẻ dùng kem nhạt #fffaf0. Bỏ nền xanh riêng ở thẻ học kỳ 2; nút xanh có bóng cùng màu. Chỉ trang danh mục lớp 6 khai báo biến màu mới, thành phần chung giữ giá trị mặc định cho trang khác.
- Khung tối đa 1240 px; Unit 2 cột ở điện thoại, 3 cột 601–1023 px, 4 cột từ 1024 px. Tăng chữ mô tả; thẻ co giãn theo nội dung, mũi tên ở hàng cuối riêng. Thu gọn bìa điện thoại, ôn học kỳ hai thẻ song song; căn lề thanh hồ sơ với nội dung.
- Đạt kiểm tra ở 375×812, 390×844, 393×852, 414×896, 430×932, 844×390, 768×1024, 820×1180, 834×1194, 1024×1366, 1194×834, 1366×1024, 1280×800, 1440×900, 1920×1080, 2560×1440 và 320×740 CSS px. Đây là các vùng hiển thị đại diện, không suy ra duy nhất từ kích thước inch.
- Kiểm tra tự động xác nhận màu nền liên tục qua Shadow DOM, 12 thẻ Unit, số cột, không tràn ngang, không chồng tiêu đề/nghĩa/mũi tên, vùng bấm ≥44 px, ảnh bìa có hiển thị, bìa không quá 500 px; phóng chữ 150% và neo #units hoạt động. Không lỗi trang trong luồng thử.
- Đã mở xem ảnh chụp toàn trang điện thoại, tablet dọc và máy tính; tệp `artifacts/grade6-pencil/beige-catalog-<width>.png`, kết quả số đo `beige-responsive-results.json` cùng thư mục. Kiểm tra font ngoại tuyến 11 trang và kiểm tra tĩnh 199 trang đạt; liên kết/ID 199 trang, footer 193 trang đều hợp lệ.
- Chưa thử trên điện thoại 6.1 inch/tablet 11 inch vật lý; nghiệm thu ở trên là mô phỏng trình duyệt.
