# Bổ sung từ vựng lớp 10–12 · 23/10/2026

Đã thêm 2 mục cho mỗi Unit của lớp 10, 11 và 12: mỗi lớp có 100 từ/cụm từ, tổng cộng 300 mục. Giữ nguyên ID, nghĩa, ví dụ và ảnh của 240 mục trước nâng cấp; thêm ID 9–10 cho từng Unit. Nội dung bổ sung dùng trong danh mục từ, lật thẻ, chọn từ, gõ từ và ôn học kỳ.

Đã mở và xem trực tiếp 56 tệp ảnh dùng cho 60 mục, gồm 30 ảnh mới từ phiên trước và các ảnh dùng lại. Lưu tệp cuối và hash trong [hồ sơ kiểm tra ảnh](../content/upper-secondary-vocabulary-image-review.json). Các ví dụ mới về giảm rác, hòa nhạc, môi trường sống, di sản và khán giả được chỉnh khớp với tranh. Ảnh minh họa kiểm lâm giữ đúng nghề kiểm lâm.

Đã bổ sung quy tắc trang phục bộ đội miền Bắc Việt Nam/Bộ đội Cụ Hồ vào AGENTS.md theo yêu cầu cuối phiên trước, sau khi đối chiếu tư liệu trên internet. Tên/đường dẫn nguồn đối chiếu không được đưa vào dự án.

## Kiểm tra đã đạt

- Kiểm tra dữ liệu: 300 mục, giữ 240 mục cũ; không trùng từ trong Unit; 60 mục mới có ảnh đúng hash, có WAV nội bộ chứa âm thanh.
- Trình duyệt Edge mô phỏng, chặn mạng ngoài: mở đủ 30 Unit, giải mã toàn bộ 300 tranh; lật đủ 300 thẻ; chơi đủ 300 câu chọn từ và 300 câu gõ từ, bao gồm toàn bộ 60 mục mới.
- Tắt Web Speech: Audio thật phát sự kiện `playing` và `ended` cho đúng ngay/tự sửa đúng trong chọn từ và gõ từ ở cả ba lớp; nhấn lại không phát lặp. Không tự phát khi mở bài.
- Tạo lượt chọn từ bằng ngân hàng 8 từ rồi nạp ngân hàng 10 từ: giữ nguyên lượt, thứ tự, đáp án và lần sai ở cả ba lớp. Lớp 11–12 giữ lượt gõ 8 từ và nháp; lượt mới đủ 10 từ. Lớp 10 vốn không lưu lượt gõ qua tải lại, đợt bổ sung này không thay đổi cơ chế đó.
- Ôn học kỳ 1/2 chọn được các mục mới, với phạm vi Unit đúng học kỳ.
- Bố cục không tràn ở 320/390/1280 px; đã mở xem ảnh giao diện điện thoại/máy tính. Glyph tiếng Việt của mục mới ở cả ba lớp dùng Nunito nội bộ khi chặn mạng ngoài. Bộ kiểm tra font trình duyệt dùng chung, kiểm tra font tĩnh và liên kết nội bộ đều đạt.
- Các kiểm tra nội dung lớp 11–12 hiện có đều đạt; đã dựng lại cả ba lớp và kiểm tra phần bổ sung vẫn còn.

Bằng chứng: [luồng chơi](../../artifacts/upper-secondary-vocabulary/browser-results.json). Chưa kiểm tra trên điện thoại vật lý.

## Dựng và kiểm tra lại

Các bộ dựng `build-grade10-complete.cjs`, `build-grade11-improvement.cjs`, `build-grade12-improvement.cjs` gọi `apply-upper-secondary-vocabulary.cjs`. Bước này kiểm tra hash ảnh và đổi phiên bản URL dữ liệu để tab cũ tải bộ từ mới.

Âm thanh: chạy `node scripts/build-answer-audio-plan.cjs`, rồi `scripts/render-answer-audio.ps1` bằng Windows PowerShell có quyền dùng giọng tiếng Anh của máy.

Kiểm tra mới: `node --test tests/upper-secondary/vocabulary-extension.test.cjs`; hai tệp `vocabulary-extension.browser.cjs` và `vocabulary-extension-visual.browser.cjs` trong cùng thư mục dùng `LESSON_BASE_URL` trỏ tới máy chủ tĩnh và Playwright.
