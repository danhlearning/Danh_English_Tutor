# Cập nhật lớp 12 · 23/10/2026

Phần hình ảnh đã được hoàn thiện trong đợt tiếp theo cùng ngày: [80 tranh và giao diện lớp 12](grade12-images-2026-10-23.md).

Giữ 10 Unit, cấu trúc lớp 6, URL, bìa, bảng màu chàm và chất giấy kraft. Đợt này tập trung nội dung và vòng luyện tập; chưa bổ sung ảnh raster từ vựng. Từ trừu tượng dùng biểu tượng, nghĩa và ví dụ riêng.

## Nội dung và cách chơi

- 60 → 80 từ/cụm từ: thêm hai mục riêng theo chủ đề mỗi Unit, giữ sáu ID từ cũ.
- 290 → 350 mục ngữ pháp: thêm 60 tình huống độc lập qua chọn/điền/xếp/sửa/viết lại, giữ toàn bộ ngân hàng cũ. 350 là số mục luyện, không phải 350 ngữ cảnh độc lập.
- Gõ từ lưu thứ tự, nháp, lần sai, gợi ý và kết quả theo người học/Unit. Không cộng sai cho nhập trống hoặc cộng kết quả/phát âm lại do chấm lặp.
- Tổng kết tách đúng ngay, tự sửa, có nghe gợi ý, đã xem. Sau hai lần sai có thể xem đáp án; hết lượt có ôn từ còn khó hoặc chơi tiếp. Nghe gợi ý rồi sửa vẫn được ghi có gợi ý.
- Danh mục hiện tiếp tục gõ khi có thao tác học thực tế. Mở trang/lật thẻ không tạo bằng chứng thành thạo. Lượt chọn từ/ngữ pháp cũ giữ ID và dữ liệu đang làm.
- Nhãn và hướng dẫn gọn, vùng bấm lớn, giữ Nunito nội bộ và gap chung. Không hiện điều chỉnh âm/chuyển động. Bộ hiệu ứng chung sửa một điều kiện để chế độ tự động giữ lựa chọn tắt âm/chuyển động đã lưu; trang lớp 12 nạp phiên bản script mới.
- Đúng ngay và tự sửa đọc từ/câu tiếng Anh. Đáp án mới được bộ lập kế hoạch âm thanh thu từ script ngân hàng mới trong trang; đã dựng WAV nội bộ. Không phát khi tải/khôi phục, không phát lặp do chấm lại, dừng khi chuyển tab học.

## Đã kiểm tra

- 18 kiểm tra dữ liệu, cấu trúc lớp 6–12, ID cũ, hồ sơ, sao lưu/xóa/khóa tab và WAV có tín hiệu: đạt. Kiểm tra liên kết/ID và font tĩnh trên 322 trang: đạt.
- Edge tự động: 10 Unit có đủ tám từ và bộ thẻ; bố cục 320/390/1280 px không tràn ngang. Đã mở ảnh chụp giao diện điện thoại/máy tính để xem trực tiếp lượt gõ, tổng kết và ngữ pháp.
- Chơi đủ 60 tình huống ngữ pháp mới qua bộ chấm thật; lượt gõ đủ đúng ngay/sai/tự sửa/gợi ý/xem/tổng kết/ôn; giữ nháp/lần sai sau tải lại và tách hai Unit.
- Tắt Web Speech: quan sát `playing`/`ended` từ Audio thật cho đúng ngay, tự sửa và nghe gợi ý. Không tự phát khi mở/khôi phục hoặc chấm lặp.
- Đổi hai hồ sơ giữ nháp riêng; có lối tiếp tục từ danh mục. Chặn localStorage/sessionStorage vẫn giữ nháp khi tải lại trong cùng tab.
- Tạo lượt bằng ngân hàng 290 câu rồi nạp bản 350 câu: giữ ID, thứ tự, lần sai, nháp. Giữ lượt chọn từ và phạm vi ôn học kỳ.
- Lựa chọn tắt âm/chuyển động đã lưu được tôn trọng; thiết bị giảm chuyển động được tôn trọng; không hiện điều chỉnh. Nghe gợi ý → sai → tải lại → sửa đúng vẫn thuộc nhóm có gợi ý. Âm đang đọc dừng khi chuyển tab học.
- Chặn mạng ngoài: truy vấn font glyph thực tế vùng gõ từ lớp 12 là Nunito nội bộ. Bộ kiểm tra font trình duyệt toàn repo chạy đạt, gồm vùng footer, cửa hồ sơ và bộ dấu tiếng Việt.

Bằng chứng: [luồng chơi](../../artifacts/grade12-improvement/browser-results.json), [tiếp tục và hồ sơ](../../artifacts/grade12-improvement/continuity-results.json), [tùy chọn và âm](../../artifacts/grade12-improvement/preferences-results.json). Chưa nghiệm thu trên điện thoại vật lý; bài viết được đối chiếu với đáp án mẫu, chưa chấm mọi cách diễn đạt tự do.

## Dựng lại

`node scripts/build-grade12-improvement.cjs` áp dụng nội dung bổ sung và luồng chơi, không tạo ảnh. Bộ dựng THPT và đồng bộ mẫu gọi bước này để giữ bổ sung. Âm: `node scripts/build-answer-audio-plan.cjs`, rồi `scripts/render-answer-audio.ps1`. Kiểm tra: `node --test tests/upper-secondary/grade12-improvement.test.cjs`; ba tệp trình duyệt `grade12-improvement.browser.cjs`, `grade12-continuity.browser.cjs`, `grade12-preferences.browser.cjs` dùng `LESSON_BASE_URL` trỏ tới máy chủ tĩnh.
