# Kiểm tra phát triển lớp 1–5 · 15/10/2026

## Đã triển khai

- Lớp 1: 16 chặng, 64 mục từ, 48 câu ngắn. Lớp 5: 20 chặng, 120 mục từ/cụm từ, 80 câu theo tình huống. Nội dung tự biên soạn theo chủ đề; chưa đối chiếu từng Lesson sách.
- Bốn game: chọn nghĩa, nghe tìm từ, gõ từ, xếp câu; thẻ học và câu mẫu có nút nghe. Tổng kết phân biệt đúng ngay, tự sửa, có gợi ý, đã xem và bỏ qua; ôn mục không đúng ngay.
- Trang chủ mở lớp 1/5; danh mục lớp 1–5 có thanh chọn lớp. Trang bài giữ lối về bản đồ, bớt thanh điều hướng để dành chỗ cho nhiệm vụ trên điện thoại.
- `shared/primary-game.js` và CSS dùng chung lớp 1/3/5, giữ nguyên khóa/định dạng lớp 3. Lớp 2/4 giữ bộ bài và lưu trữ hiện có. Không thay đổi logic hồ sơ.
- Có bộ dựng trang lớp 1/5 và mở rộng kiểm tra CI. Bộ kiểm tra liên kết bỏ thư mục sản phẩm dựng/thư viện cục bộ để tránh quét runtime video không thuộc website.

## Bằng chứng kiểm tra

- 66/66 bài Node đạt: ngân hàng mới, ID, trang/ảnh, thứ tự tải hồ sơ; các bộ dữ liệu và quy tắc game lớp 2/4/7, ngữ pháp và hồ sơ hiện có.
- Liên kết/ID: 165 trang nguồn đạt; footer: 159 trang thuộc phạm vi kiểm tra đạt. Kiểm tra cú pháp 75 tệp JavaScript đạt.
- Edge headless, Playwright: 36 chặng mới × 4 chế độ, ảnh tải được, năm đường chọn lớp, đúng ngay/sửa đúng/gợi ý/xem/bỏ qua, chống nhấn lặp, ôn mục cần luyện, tải lại và giữ thứ tự/nháp/mảnh câu, kết thúc chặng cuối không dẫn ra trang thiếu. Cách ly lớp/người học, dữ liệu hỏng/bộ nhớ bị chặn, giảm chuyển động, bật/tắt và nhớ tùy chọn được kiểm tra.
- Bộ trình duyệt lớp 3 đạt với bộ chạy chung: 20 chặng, bốn chế độ, lượt/điểm, hồ sơ và các tình huống lưu trữ cũ.
- Bố cục kiểm tra 320, 390, 760, 1280px: danh mục, học thẻ và bốn game không tràn ngang. Đã xem ảnh chụp danh mục lớp 1 và xếp câu lớp 5; các ảnh lưu tại `artifacts/primary-grades/`.

## Giới hạn nghiệm thu

Giọng đọc được thay bằng hàm mô phỏng trong bộ kiểm tra để xác nhận chỉ phát sau thao tác và tôn trọng tắt tiếng; chưa nghe/chấm chất lượng giọng thật. Chưa thử trên điện thoại vật lý. Kiểm tra hồ sơ dùng bộ Node hiện có cùng luồng cách ly và lưu phiên trên trình duyệt; đợt này không chạy lại toàn bộ bộ trình duyệt hồ sơ nhiều tab/sao lưu/xóa. Không thay đổi cơ chế nhiều tab đó.
