# Rà và sửa ảnh lớp 6–7 · 19/10/2026

## Kiểm kê và sửa ảnh

Đã rà 192 mục từ trong 24 Unit. Lớp 6 đang dùng biểu tượng, không có ảnh bitmap từ vựng. Lớp 7 có 19 ảnh, các mục khác dùng biểu tượng.

- Tạo lại 13 ảnh có nghĩa Việt in sẵn: balanced-diet, celebration, community-service, creativity, documentary, driverless, entrance-examination, gripping, ingredient, landmark, native-speaker, non-renewable-energy, renewable-energy.
- Tạo lại sunburn: bản cũ không thể hiện rõ da bị cháy nắng; bản mới thấy vùng da đỏ và ranh giới với vùng da bình thường, không có tổn thương nặng.
- Làm sạch donate và performance sau khi phóng to thấy nhãn chữ nhỏ trên áo và nhạc cụ. Rà lại entrance-examination và xóa cả nét chữ nhỏ trên giấy bằng một lượt chỉnh sửa ảnh.
- Giữ ba cảnh pedestrian, traffic-jam, water-puppet-show sau khi xem ảnh gốc; chuẩn hóa cùng kích thước với ảnh mới.

Tất cả 19 ảnh đang dùng là **WebP 768 × 768**, tên `*-v2.webp`, đã xem trực tiếp bản đầy đủ và bảng ảnh sau chuẩn hóa. Không thấy nhãn nghĩa Việt, chú thích hoặc chữ có thể đọc trong các ảnh đang dùng. Nghĩa Việt là văn bản HTML riêng. Các bản cũ được giữ để đối chiếu, nhưng ngân hàng Unit không gọi tới chúng.

Công cụ: **imagegen tích hợp**, mỗi ảnh một yêu cầu riêng, các lượt làm sạch dùng đúng ảnh tham chiếu. Không dùng CLI/API thay thế. Bộ prompt cuối và đường dẫn đủ 19 ảnh ở [grade7-image-prompts.json](../grade7-image-prompts.json). Ảnh triển khai nằm trong `grade/lop7/assets/images/`; bản gốc tạo mới và bảng trước/sau nằm trong `artifacts/grade6-7-image-audit/`.

## Kích thước và trải nghiệm

- Hai lớp dùng chung `shared/secondary-vocabulary-visuals.css`: khung vuông 220 px trên màn hình tối đa 480 px, 240 px trên màn hình lớn, áp dụng cho bảng từ và mặt nghĩa lật thẻ.
- Ảnh co vừa toàn bộ khung bằng `object-fit: contain`, không cắt chủ thể. Biểu tượng cũng có cùng khung; biểu tượng ghép được thu cỡ chữ riêng để không cắt hình hoặc đẩy thẻ tràn ngang.
- Đã sửa lỗi tràn ngang phát hiện ở Unit 4 lớp 7 khi phóng lớn biểu tượng artist. Khung thẻ có `min-width: 0`; biểu tượng ghép artist/curly hair/relative nằm gọn trong khung.
- Mặt từ tiếng Anh, chọn từ và gõ từ giữ kín hình. Không đổi ID từ, URL Unit, đáp án, quy tắc chấm hay khóa lưu; tiến độ cũ được giữ.
- Lời hướng dẫn cũ nói nghĩa Việt nằm trong ảnh đã thay bằng nghĩa hiển thị riêng bên ngoài; cập nhật tài liệu prompt để lần tạo tiếp không lặp lại chỉ dẫn lỗi.

## Kiểm tra

- Đã mở ảnh gốc và từng ảnh mới, kiểm tra nghĩa, chữ/nhãn nhỏ, bối cảnh, tay/người/vật; xem hai bảng ảnh sau chuẩn hóa.
- Kiểm tra nội dung: đủ 19 ảnh được duyệt có SHA-256, cùng kích thước 768 × 768, đúng đường dẫn mới và đủ 24 trang dùng CSS chung. Nếu nội dung ảnh đổi, kiểm tra yêu cầu xem và duyệt lại; dấu kiểm này không phải OCR tự động.
- Trình duyệt Edge tự động: 24 Unit/192 khung bảng từ và 192 mặt nghĩa lật thẻ ở 390 px; Unit 2 mỗi lớp tại 320/390/760/1280 px. Ảnh tải thành công, kích thước khung bằng nhau, không tràn ngang, mặt từ không có hình và câu chọn có bốn lựa chọn/kín ảnh.
- Dữ liệu cũ `[1,2]` của Unit 1 ở từng lớp còn nguyên sau duyệt toàn bộ bài. Không có lỗi JavaScript hoặc tài nguyên nội bộ tải lỗi trong lượt chạy.
- Đã thêm kiểm tra biểu tượng ghép không vượt khung sau lần sửa cuối.
- Kết quả lần chạy cuối: hai lớp đều đạt kiểm tra trình duyệt, 72 kiểm tra dữ liệu/game/hồ sơ/ảnh đạt, liên kết và ID trên 198 trang đạt, footer trên 192 trang đạt. Đã xem ảnh giao diện đại diện của cả hai lớp, thẻ lật và máy tính sau khi sửa; chi tiết các vị trí còn lại được đo tự động.

Chưa thử trên điện thoại vật lý hoặc nghe lại âm thanh qua loa; đợt này không thay logic âm thanh/game.
