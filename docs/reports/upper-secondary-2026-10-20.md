# Lớp 10–12 · 20/10/2026

Đã thêm ba lớp từ trang chủ, dùng bố cục lớp 6: bìa, chọn Unit, ôn học kỳ và ngữ pháp. Tông và chất giấy riêng được áp dụng lên danh mục, bài học, ôn tập, thanh hồ sơ và chân trang. Bìa mới bằng ImageGen, đã xem trực tiếp cả ba ảnh và bố cục máy tính/điện thoại. Prompt và đường dẫn ảnh: `docs/content/upper-secondary-covers.md`.

Mỗi lớp có 10 Unit, 60 từ/cụm từ với ví dụ tự biên soạn, 30 ngữ cảnh ngữ pháp và 120 mục luyện (bốn dạng cùng luyện một ngữ cảnh). Đây là ngân hàng luyện tập ban đầu; không tuyên bố bao phủ toàn bộ sách. Học kỳ 1 Unit 1–5, học kỳ 2 Unit 6–10. Không sao chép nội dung hoặc tiến độ lớp 6 sang THPT. Gõ từ là lượt luyện tự do trong trang, chưa khôi phục lượt gõ dở; lượt chọn từ và ngữ pháp có lưu tiếp tục.

## Đã chạy đạt

- `node scripts/check-vietnamese-fonts.cjs`: 238 trang UTF-8, đường tải font nội bộ và đủ glyph tiếng Việt.
- `node scripts/check-local-links.cjs`: liên kết và ID của 238 trang.
- `node tests/learner-profiles/vietnamese-fonts.browser.cjs`: glyph Nunito thực tế, Shadow DOM, hộp hồ sơ và footer độc lập khi chặn mạng ngoài.
- `node tests/upper-secondary/browser.cjs`: 30 trang Unit; 360 mục ngữ pháp qua giao diện; lật thẻ; lượt chọn từ đúng/sai/tự sửa/xem đáp án/tổng kết/ôn lại; nhấn lặp; tải lại và tiếp tục; phạm vi ôn hai học kỳ; gõ từ; tách dữ liệu lớp/hồ sơ; nhớ nút âm/chuyển động; bộ nhớ bị chặn; giảm chuyển động; không lỗi trang hoặc thiếu tài nguyên. Chặn toàn bộ mạng ngoài. Kiểm tra font thực tế trên tiêu đề cả ba lớp, bố cục 320/390/834/1280px.
- `node tests/secondary-grades/smoke.cjs`: ôn học kỳ lớp 6/7, gõ từ lớp 8/9 và ngữ pháp lớp 9. Sửa phép tìm đáp án của kiểm thử thành khớp nghĩa đầy đủ: “hành tinh” không bị chọn nhầm trong “sinh vật ngoài hành tinh”. Không thay nội dung lớp 8/9.
- `node --test tests/secondary-grades/content.test.cjs`: hai kiểm thử nội dung lớp 8/9.
- `git diff --check`.

Kiểm tra trình duyệt dùng Edge mô phỏng. Đã xem trực tiếp ảnh chụp danh mục ba lớp ở máy tính và điện thoại; chưa nghiệm thu trên điện thoại vật lý, chưa nghe bằng tai giọng đọc hoặc âm phản hồi.

Ảnh kiểm tra được lưu ở `artifacts/upper-secondary/`.
