# Trang chủ giấy kraft và chì màu

- Bỏ hai câu phụ ở Luyện theo kỹ năng và Học theo lớp; giữ tiêu đề và slogan đã duyệt.
- Dùng imagegen tích hợp tạo hai tranh không chữ, đã xem trực tiếp từng ảnh nguồn và WebP cuối: `assets/images/home/skills-pencil-v1.webp` (36.624 byte) và `assets/images/home/grades-pencil-v1.webp` (38.242 byte). Prompt đầy đủ tại `artifacts/home-kraft-pencil/image-prompts.json`.
- Đồng bộ thẻ, danh sách 12 lớp và liên hệ theo giấy kem, viền chì nâu, xanh trầm; giữ màu riêng của các lớp 6–12. Footer chung thêm biến màu tùy chọn, có giá trị mặc định giữ giao diện các trang khác.
- Giữ nền đầu trang, ảnh thầy, URL học tập, liên hệ và dữ liệu lưu. Không thay chấm điểm hoặc giọng đọc bài học.
- Đã kiểm tra trình duyệt Edge mô phỏng ở chiều rộng 320, 375, 390, 430, 600, 601, 768, 834, 1024, 1440 và 1920 px: không tràn ngang, vùng bấm đủ lớn, hai lối học điều hướng đúng, các tệp lớp tồn tại, phóng 125%, focus bàn phím và giảm chuyển động hoạt động, không có lỗi trang hoặc sự kiện phát media khi tải.
- Đã chạy `node scripts/check-vietnamese-fonts.cjs` và kiểm tra glyph thực tế qua `node tests/learner-profiles/vietnamese-fonts.browser.cjs`: đạt 238 trang kiểm tra tĩnh và 11 trang trình duyệt với mạng ngoài bị chặn, cả footer và hộp hồ sơ.
- Đã xem ảnh chụp trang cuối 390 và 1440 px; kết quả và ảnh trong `artifacts/home-kraft-pencil/`. Chưa kiểm tra trên thiết bị vật lý.
