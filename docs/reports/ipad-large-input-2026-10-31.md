# Bàn phím và ô điền lớn hơn — 31/10/2026

- Mục tiêu học/cách chơi: giữ ghép chữ, gõ cả từ và tự sửa của lượt hiện tại; giúp học sinh đọc rõ ô cần điền và phím chấm.
- Chấm, hỗ trợ khi sai và hoàn thành: giữ nguyên điểm, gợi ý/xem mẫu, tự chuyển sau giọng đọc và tổng kết; không đổi tiến độ.
- Tăng bàn phím iPad rộng lên 304–420 px, khung thấp 260 px; nút Enter rộng hơn, chữ/nút rõ hơn. Cửa sổ hẹp vẫn giữ bố cục gọn.
- Ô nhập cao 76–104 px, chữ 30–42 px; ô ghép chữ và chữ mẫu lớn hơn. Khung ngang thấp bố trí tranh/đề cạnh vùng nhập để giữ nút chấm trong vùng chơi.
- Giữ thao tác nảy, giảm chuyển động, sửa tại con trỏ, bàn phím ngoài và lối xem nội dung dài.

## Kết quả kiểm tra

- 168 kiểm tra tự động đạt; cú pháp 156 tệp JavaScript, liên kết/ID và font trên 324 trang, footer trên 316 trang đạt.
- Kiểm tra 10 khổ iPad/cửa sổ của bộ `ipad-roomy-flow`: bàn phím đúng chiều cao, Enter rộng trên 3 lần phím chữ cùng hàng, ô nhập cao ít nhất 76 px/chữ ít nhất 30 px ở cửa sổ rộng; không che ô nhập/nút kiểm tra.
- Đo ở 1024×768: bàn phím 304 px, Enter rộng khoảng 246 px, ô nhập cao 76 px, chữ 30 px. 768×1024: bàn phím 369 px, ô nhập 104 px, chữ khoảng 42 px. 1024×1366: bàn phím 420 px, ô nhập 104 px/chữ 42 px.
- Bộ khung chơi có sẵn đạt 10 bố cục và các thao tác bàn phím/đổi chiều. Bộ bố cục mở rộng đạt 112 trường hợp iPad/điện thoại/lối vào lớp 1–12.
- Giữ đủ kiểm tra nảy nút, giảm chuyển động, chấm lặp, tự sửa, chờ giọng mới chuyển, nghe lại, âm tắt/lỗi, lưu/khôi phục, chuyển bộ và bàn phím ngoài.
- Bố trí lại phần gõ từ lớp 6–12, luyện câu lớp nhỏ, thư viện và hàng thao tác ngữ pháp để vừa khung thấp; không bỏ đề, gợi ý hoặc nút thao tác.
- Đã xem ảnh dọc/ngang. Tài nguyên dùng phiên bản `ipad-large-input-20261031` để thiết bị đã mở bản cũ nhận bản mới; mẫu/bộ dựng giữ cùng phiên bản, chạy lại không sinh thay đổi.

Bằng chứng: `artifacts/ipad-roomy-flow/results.json` và ảnh cùng thư mục, `artifacts/letter-responsive/results.json`, `artifacts/ipad-game-frame/results.json`; log logic `artifacts/publish-verification/large-input-unit-tests.txt` trong bản kiểm tra.

Giới hạn: Edge mô phỏng cảm ứng; chưa thử Safari/iPad vật lý.
