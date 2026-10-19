# Áp dụng nền giấy ô ly đã duyệt cho trang chủ

- Người dùng chọn nền B bằng ảnh đính kèm và yêu cầu phủ chung ảnh đại diện, tiêu đề và slogan. Đã chuyển ảnh được duyệt sang WebP tại `assets/images/home/paper-grid-approved-v1.webp`; chỉ đổi định dạng, không vẽ lại hoặc sửa chân dung.
- Toàn bộ header dùng nền giấy chung, chữ xanh đậm đọc trên giấy sáng. Giữ slogan “Tối ưu cho học sinh tiếp thu chậm” và ảnh dẫn tới Zalo. Nền be tiếp nối thanh hồ sơ và footer.
- Điện thoại: ảnh 144 px, tiêu đề khoảng 26–30 px, slogan khoảng 17 px; giảm đệm và xếp lại thẻ chọn cách học để hai lối vào dễ thấy. Máy tính giữ ảnh 224 px, tablet dọc 188 px; header hai cột trên màn hình lớn. Không đổi nội dung luyện, chấm điểm, dữ liệu hồ sơ hoặc tiến độ.
- Kiểm tra mô phỏng tại 320×740, 375×812, 390×844, 430×932, 768×1024, 834×1194, 1194×834, 1440×900, 1920×1080: nền đúng nguồn, ảnh và chữ nằm trong header, không tràn ngang; ảnh vuông/cắt tròn đúng, liên kết Zalo đúng; nút chọn cách học đủ lớn; thẻ đầu tiên thấy trong màn hình đầu ở điện thoại. Phóng chữ 125% và bàn phím/neo #grades hoạt động.
- Đã mở xem ảnh chụp trang chủ mới ở 390 và 1440 px. Kết quả số đo lưu `artifacts/home-portrait-options/applied-results.json`, ảnh `applied-paper-<width>.png` cùng thư mục.
- Đã kiểm tra UTF-8/font nội bộ, liên kết và footer. Kiểm tra font trình duyệt khi chặn mạng ngoài đạt trên 11 trang đại diện. Chưa thử trên thiết bị vật lý.
