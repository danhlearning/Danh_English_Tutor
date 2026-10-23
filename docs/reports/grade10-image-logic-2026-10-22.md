# Rà logic ảnh lớp 10

Đã mở xem trực tiếp 80/80 ảnh từ vựng và ảnh bìa. Thay bảy ảnh lỗi bằng bản v2; 73 ảnh từ vựng còn lại và bìa giữ nguyên.

| Từ | Lỗi đã sửa | Ảnh đang dùng |
| --- | --- | --- |
| responsible | Chai có hai nắp; nay một nắp và đáy PET kín | [Unit 10 · 2](../../grade/lop10/assets/images/pencil/unit10/2-v2.webp) |
| impact | Chai nhựa ở bờ suối có hai miệng/nắp | [Unit 10 · 6](../../grade/lop10/assets/images/pencil/unit10/6-v2.webp) |
| experiment | Chai lọc không có giá giữ; nay có cột, vòng kẹp và chân đế | [Unit 5 · 4](../../grade/lop10/assets/images/pencil/unit5/4-v2.webp) |
| effective | Khí đi qua vỏ kín; nay có cửa thoát khí rõ | [Unit 5 · 5](../../grade/lop10/assets/images/pencil/unit5/5-v2.webp) |
| composer | Phím piano chồng/lệch; sửa cấu trúc bàn phím | [Unit 3 · 7](../../grade/lop10/assets/images/pencil/unit3/7-v2.webp) |
| equal pay | Chồng tiền không bằng nhau; nay hai chồng đều ba đồng | [Unit 6 · 7](../../grade/lop10/assets/images/pencil/unit6/7-v2.webp) |
| access | Laptop quay khỏi người học; sửa vị trí và hướng dùng | [Unit 8 · 4](../../grade/lop10/assets/images/pencil/unit8/4-v2.webp) |

Các ảnh mới được chỉnh bằng công cụ ImageGen tích hợp, giữ bút chì màu, không chữ và không watermark. Đã mở xem trực tiếp từng bản 768 × 768 WebP cuối trước tích hợp. Bản equal pay đầu tiên bị loại vì số tiền vẫn không bằng nhau, tạo lại và xem bản ba đồng mỗi bên mới đạt.

Prompt đầy đủ, nguồn và lần thử bị loại: [bộ prompt/kết quả](../../artifacts/grade10-logic-audit/generated.json). Hồ sơ rà từng ảnh và SHA-256: [80 ảnh](../content/grade10-image-logic-review.json). Tệp nguồn và thông tin duyệt gốc được giữ để đối chiếu.

Đã cập nhật cả dữ liệu bài, bản đồ ảnh và phiên bản script lớp 10 để tải ảnh mới; các bộ dựng giữ ảnh đã duyệt và prompt nguồn đã bổ sung các ràng buộc vật lý vừa sửa. ID từ/câu, tên, nghĩa, ví dụ, cách chấm và khóa tiến độ không đổi.

Kiểm tra đạt:

- 80 ảnh tải/giải mã thật và 80 mặt sau lật thẻ dùng đúng tệp ở đủ 10 Unit.
- Bố cục 320/390/1280 px; chặn mạng ngoài; không lỗi trang hoặc tài nguyên. Đã xem ảnh chụp thẻ responsible trên điện thoại/máy tính.
- Lượt trắc nghiệm cũ giữ câu, thứ tự lựa chọn và lần trả lời sai sau tải lại/tiếp tục; dữ liệu ôn học kỳ dùng đúng ảnh mới.
- Tám kiểm thử dữ liệu và ảnh đạt; 73 ảnh không sửa khớp nguyên hash trước đợt này. Liên kết 322 trang, font nội bộ, cú pháp script đã sửa và diff đều đạt.

Kết quả trình duyệt: [bản ghi](../../artifacts/grade10-logic-audit/browser-results.json). Kiểm tra bằng Edge mô phỏng, chưa thử trên điện thoại vật lý.
