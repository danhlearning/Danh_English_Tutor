# Thầy Danh duyệt hình

Kho duyệt hình độc lập cho từ vựng Lớp 2. Mở `http://localhost:8765/artifacts/thay-danh-duyet-hinh/index.html` bằng máy chủ cục bộ của dự án. Quy chuẩn ảnh của website nằm ở [`docs/CHUAN_HINH_ANH_TU_VUNG.md`](../../docs/CHUAN_HINH_ANH_TU_VUNG.md).

## Phạm vi hiện tại

- Danh mục 396 mục từ thuộc 35 nhóm. Có 29 ảnh chân thật đang dùng trong bài học: Pasta, Popcorn, Pizza, Kite, Bike, Kitten, Dog, Hand, Run, Apple, toàn bộ Transport (12 từ) và Rooms in a House (7 từ).
- Trang duyệt vẫn hiển thị ảnh đã dùng để thầy xem và góp ý; quyết định sửa/chọn mới lưu trong trình duyệt và có thể xuất JSON. Danh sách phiên bản đã lên web được ghi bền vững trong `candidates.js`.
- 6 tranh SVG cũ còn lưu để đối chiếu. Cả ba từ Unit 1 và ba từ Unit 2 đang dùng ảnh thật; các tranh SVG của Unit 2 vẫn được giữ trong kho phiên bản.

## Quy trình ảnh mới

1. Tạo ảnh vuông riêng cho từng nghĩa; kiểm tra chủ thể, số lượng, tỷ lệ, chi tiết phân biệt và độ rõ ở 120–160 px.
2. Lưu phiên bản mới ở `candidates/realistic/<nhóm>/<từ>-photo-vN.png` và thêm vào `candidates.js`; không ghi đè phiên bản cũ.
3. Ảnh rõ nghĩa và đạt chuẩn được sao chép thẳng vào `grade/lop2/assets/images/approved/`, liên kết với bài học và ghi trong `window.thayDanhRollout`. Ảnh còn phân vân được để trên trang chờ thầy duyệt.
4. Khi dữ liệu từ trên web đổi, chạy `node artifacts/thay-danh-duyet-hinh/tools/build-catalog.cjs` để làm mới danh mục.

Prompt của nhóm ảnh mẫu được lưu trong [`PROMPTS-ANH-THAT.md`](PROMPTS-ANH-THAT.md); prompt của hai chủ đề mới ở [`PROMPTS-TRANSPORT-ROOMS.md`](PROMPTS-TRANSPORT-ROOMS.md). Ảnh được tạo bằng công cụ imagegen tích hợp, rồi sao chép nguyên bản vào artifact.
