# Trang lớp 6 — bìa bút chì và danh mục gọn

- Mục tiêu: giúp học sinh chọn nhanh Unit, ôn học kỳ hoặc ngữ pháp. Mở trang/chọn bài không tính hoàn thành; cơ chế chơi, chấm, phản hồi khi sai và tổng kết trong bài giữ nguyên.
- Bố cục: bìa bút chì màu sinh động, một tiêu đề và nút chọn Unit; bỏ câu “Khám phá 12 Unit…”. Ba lối học rõ ràng; 12 thẻ Unit gọn, phần ôn/ngữ pháp ít chữ hơn. Giữ URL và ID neo.
- Theo yêu cầu trực tiếp: trang danh mục lớp 6 bật mặc định âm thanh/chuyển động và không dựng cụm tùy chỉnh hiệu ứng. Chỉ phát âm sau thao tác; vẫn tôn trọng giảm chuyển động thiết bị. Chế độ tự động chỉ trên trang này, không ghi đè tùy chọn đã lưu ở các bài/lớp khác.
- Bìa do image_gen tạo mới, nét bút chì màu, gợi chuyển động bằng tư thế và nét lướt; không có chữ trong tranh. CSS chuyển động nhẹ, dừng khi giảm chuyển động; không phát nhạc nền.
- Giữ tiến độ hồ sơ, dữ liệu từ/câu và nội dung Unit. Kiểm tra đủ 12 liên kết, ba lối học, không còn UI hiệu ứng, mặc định bật kể cả tùy chọn cũ tắt, không tự phát âm; kiểm tra 320/390/760/1280 px và ảnh thực.

## Cập nhật nền be và tỷ lệ thiết bị

- Nút chính đổi thành Vào học. Lấy nền be giấy từ vùng trống của ảnh bìa: #fcf5e5; dùng xuyên suốt danh mục, thanh hồ sơ và footer qua biến màu riêng của trang. Các trang khác giữ màu mặc định.
- Giữ mục tiêu chọn Unit/ôn học kỳ/ngữ pháp, không đổi cách chơi, chấm, hỗ trợ khi sai, hoàn thành hoặc tiến độ. Chỉ sắp xếp tỷ lệ trình bày.
- Hai cột Unit trên điện thoại, ba cột trên tablet dọc, bốn cột trên tablet ngang/máy tính; khung tối đa 1240 px. Tăng cỡ chữ phụ, thẻ tự cao theo nội dung, mũi tên có hàng riêng để không đè chữ. Nút bấm tối thiểu 44 px.
- Cỡ inch không quy đổi duy nhất ra bố cục web; kiểm tra theo vùng hiển thị CSS đại diện điện thoại 6.1 inch trở lên và tablet 11 inch trở lên, cả dọc/ngang, cùng máy tính. Kiểm tra phóng chữ, neo #units và font tiếng Việt; ghi rõ chỉ mô phỏng khi chưa thử thiết bị vật lý.
