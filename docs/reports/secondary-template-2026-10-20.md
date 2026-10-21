# Đồng bộ lớp 6–12 và hoàn thiện lớp 10

## Yêu cầu cuối cùng

Dùng cấu trúc và thiết lập phiên bản mới nhất lớp 6 cho lớp 6–12. Giữ tông màu, chất giấy và ảnh bìa riêng từng lớp. Không hiện UI điều chỉnh âm/chuyển động; vẫn có nút nghe từ, âm phản hồi sau thao tác, không tự phát khi mở trang và tôn trọng giảm chuyển động thiết bị. Đã ghi quy tắc vào `AGENTS.md`.

## Đã triển khai

- Mẫu chung lấy trực tiếp từ HTML, CSS và bộ chạy lớp 6: danh mục, năm tab Unit, ôn học kỳ, chọn/điền/xếp/sửa/viết lại, phát âm nhận biết và giới từ trong đoạn văn. Giữ số Unit và nội dung riêng từng lớp.
- Bảy tông: lớp 6 beige/teal; 7 lavender; 8 mint; 9 ochre; 10 sage; 11 hồng đất; 12 xanh chàm. Có biến thể vân giấy, màu thanh hồ sơ, footer, nút và thẻ. Bìa mới lớp 7/8/9/10 bằng bút chì màu; giữ bìa 6/11/12.
- Lớp 10: 10 Unit, 80 từ/cụm từ, ví dụ và **80 tranh bút chì riêng không chữ**. Đã mở xem từng ảnh cuối; sửa ba ảnh có dấu chữ/số ở máy giặt, quai balô và gáy sách, rồi xem lại bản sửa. Bản cuối 768×768 WebP có hash, nguồn, prompt và prompt sửa trong `artifacts/grade10-pencil/final-prompts.json`. Trang xem toàn bộ tranh: `artifacts/grade10-pencil/review.html`.
- Ngữ pháp lớp 10: 390 mục ngữ pháp từ 90 ngữ cảnh và 30 câu viết lại; 40 mục nhận biết phát âm/trọng âm/nhịp/ngữ điệu; 10 đoạn văn với 100 chỗ trống giới từ. Tổng 530 mục; các dạng có thể luyện lại cùng một ngữ cảnh, không phải 530 ngữ cảnh độc lập. Các lượt giới hạn tối đa 10 câu và hiển thị số thực tế.
- Bổ sung các dạng còn thiếu cho lớp 8/9/11/12, giữ nguyên ngân hàng gốc. Toàn bộ lớp 6–12 có đủ bốn nhóm hoạt động ngữ pháp; bài viết đối chiếu với đáp án mẫu, nhận biết phát âm không chấm giọng nói.
- Giữ URL, ID hồ sơ, khóa lưu lớp/hồ sơ; 120 ID ngữ pháp lớp 10 và sáu ID từ đầu mỗi Unit vẫn tồn tại. Lượt cũ không bị thêm câu/từ mới. Gõ từ vẫn là luyện trong trang như mẫu lớp 6, không hứa khôi phục nguyên lượt gõ dở.
- Bộ dựng dùng `scripts/sync-secondary-template.cjs`; các bộ dựng lớp 8/9/11/12 gọi lại bước đồng bộ để không tái tạo giao diện cũ.

## Kiểm tra đã đạt

- `node --test tests/secondary-template/content.test.cjs`: bảy lớp đủ các dạng theo Unit/cấp độ, ID không trùng, đáp án có trong lựa chọn, đoạn văn đủ mười chỗ trống; lớp 10 đủ 80 ảnh và 120 ID cũ.
- `node tests/secondary-template/browser.cjs`: 78 trang Unit, bảy danh mục ở 320/390/834/1280px, năm tab, lượt chọn từ đúng/sai/tự sửa/nhấn lặp/tải lại/tiếp tục, gõ từ, ôn hai học kỳ, đủ bốn nhóm ngữ pháp ở Unit đầu/cuối từng lớp, làm hết các lượt mẫu, nháp viết lại sau tải lại, không hiện gợi ý sớm, không UI hiệu ứng. Bảy palette khác nhau, không lỗi JavaScript hoặc thiếu tài nguyên; chặn toàn bộ mạng ngoài.
- Tách dữ liệu cả bảy lớp trong một hồ sơ, đổi sang hồ sơ mới không có dữ liệu lớp trước; bộ nhớ bị chặn vẫn tiếp tục lượt và không có animation thưởng khi giảm chuyển động.
- Kiểm tra bổ sung bằng thao tác click trình duyệt thật: lượt chọn từ lớp 10 cũ sáu từ tiếp tục đúng sáu từ sau khi nâng lên tám; không âm/giọng đọc khi tải, có âm phản hồi sau click đúng. Kết quả: `artifacts/secondary-template/experience-results.json`.
- `node tests/learner-profiles/vietnamese-fonts.browser.cjs`: glyph Nunito thật, hộp hồ sơ, footer, Shadow DOM và mạng ngoài bị chặn. `node scripts/check-vietnamese-fonts.cjs`: 238 trang UTF-8/đường tải font.
- Kiểm tra màu nhãn Unit trên nền sáng, màu nút theo từng lớp và các đường dẫn trang chủ. Đã xem trực tiếp ảnh chụp máy tính/điện thoại, trang Unit 4 và mặt sau thẻ lớp 10; ảnh lưu `artifacts/secondary-template/`.
- `node scripts/check-local-links.cjs`: liên kết/ID hợp lệ trên 238 trang; `git diff --check` không lỗi khoảng trắng.

Kiểm tra trình duyệt là Edge mô phỏng, chưa phải điện thoại vật lý; đã kiểm tra sự kiện âm bằng bộ đếm trình duyệt, chưa nghe âm bằng tai.

## Tệp hình và prompt

- Tranh: `grade/lop10/assets/images/pencil/unit1/` đến `unit10/`; đầy đủ từng tệp/prompt trong `artifacts/grade10-pencil/final-prompts.json`.
- Bìa: `grade/lop7/assets/images/grade7-cover-pencil-v1.webp`, tương tự lớp 8/9/10. Prompt tạo bìa: `artifacts/grade10-pencil/cover-sources.json`.
- Tạo bằng ImageGen tích hợp; tối ưu kích thước/tách bảng tranh bằng công cụ ảnh nội bộ, không lấy ảnh lớp 6–7 có chữ.
