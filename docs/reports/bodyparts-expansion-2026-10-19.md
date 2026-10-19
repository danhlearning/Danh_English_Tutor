# Body Parts lớp 2 — 32 từ

Đã mở rộng 16 → 32 bộ phận bên ngoài thường gặp. Thêm Face, Forehead, Eyebrows, Eyelashes, Cheeks, Chin, Lips, Tongue, Chest, Back, Elbow, Wrist, Thumb, Toes, Ankle, Heel; mỗi từ có IPA Anh-Anh, nghĩa, ví dụ và một câu luyện riêng.

Từ chính cho bụng đổi thành Stomach /ˈstʌm.ək/. Giữ ID từ `tummy` và câu `body-tummy` để giữ lựa chọn/lịch sử. Cách viết và đáp án mới chỉ dùng stomach. Khi có lượt chính tả cũ chứa từ này, lưu nguyên dữ liệu vào khóa hồ sơ riêng trước khi khởi tạo lại lượt chính tả; không xóa bộ chọn, lượt trắc nghiệm hoặc lịch sử.

## Tranh

- Tạo bằng công cụ image_gen tích hợp; 16 WebP 768 × 768 lưu tại `grade/lop2/assets/images/pencil/bodyparts/<id>-v1.webp`.
- Bộ prompt và nguồn ảnh: `artifacts/grade2-pencil/bodyparts-expansion-generation.json`.
- Đã mở trực tiếp từng WebP mới: đúng bộ phận và điểm chỉ, không chữ, không nghĩa tiếng Việt, không lỗi hình thấy được. Tranh vùng bụng hiện có cũng được mở kiểm tra để dùng cho Stomach.
- Danh sách 32 ảnh và SHA-256: `artifacts/grade2-pencil/bodyparts-expansion-review.json`. Các ảnh gốc còn lại giữ nguyên byte và hồ sơ kiểm duyệt cũ. Hình SVG chỉ bọc tranh; tên/nghĩa nằm ngoài hình.

## Kiểm tra đã đạt

- 49 kiểm tra tự động lớp 2: bộ từ, câu, ID, chọn từ, hình, kiểm tra byte ảnh, chuyển đổi lượt cũ và các bài đã có.
- Trình duyệt mô phỏng Edge ở 320, 390, 760, 1280 px: 32 ảnh tải đủ, khung vuông, không tràn ngang; bốn game mở và có tranh. Ảnh chụp `artifacts/grade2-pencil/final-bodyparts-1280.png` đã được mở xem toàn trang.
- Gõ tummy nhận phản hồi sai, sửa thành stomach được tính tự sửa; câu My tummy hurts a little chưa khớp, My stomach hurts a little được tính sửa đúng.
- Chọn 16 từ mới qua hộp chọn, kiểm tra đủ 16 câu/tranh không lặp: 15 đúng ngay, 1 xem đáp án, tổng kết đúng; tải lại giữ bộ chọn.
- Lượt chính tả cũ được lưu riêng và bộ chọn giữ nguyên khi chuyển cách viết; không lỗi trang trong luồng thử.
- Liên kết/ID hợp lệ trên 199 trang, footer hợp lệ trên 193 trang.
- Chưa thử trên điện thoại vật lý; kiểm tra giọng đọc dùng mô phỏng để kiểm tra luồng, chưa nghiệm thu chất lượng tiếng loa thực.
