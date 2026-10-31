# Khung iPad rộng, bàn phím cao và chuyển từ — 31/10/2026

- Mục tiêu học: nhớ cách viết từ của bộ đang chọn qua ghép 1–2–3 chữ và gõ cả từ.
- Cách chơi: giữ chạm chữ, trả chữ, gõ/sửa tại con trỏ và chấm; phóng lớn đề, ảnh, chữ và nút theo diện tích còn lại trên iPad. Bàn phím cao 264–360 px trên cửa sổ lớn; 240 px khi vùng nhìn bị thanh trình duyệt giảm còn 600–699 px; cửa sổ hẹp giữ 224 px.
- Chấm: giữ đúng ngay, tự sửa, có gợi ý và đã xem; bấm lặp không cộng lại hoặc đi qua hai từ.
- Hỗ trợ: sai/rỗng giữ nguyên từ để thử lại; xem mẫu vẫn chủ động chuyển. Sau khi tự làm đúng, đợi giọng đáp án kết thúc và phản hồi ngắn rồi tự chuyển; từ có trợ giúp vẫn phải tự nhớ lại trước khi tăng mức.
- Hoàn thành: kết thúc đúng lượt để hiện tổng kết, không tự tạo lượt mới. Khôi phục đáp án đã chấm không tự đọc/chuyển. Rời game/ẩn tab hủy chuyển tự động đang chờ; nghe lại hoặc mở hộp chọn từ sẽ giữ từ hiện tại để người học chủ động tiếp tục.
- Phản hồi chạm: nảy nhẹ ngay khi chạm, không viền đậm; không thay hành động native click, không phát thêm giọng. Bàn phím ngoài giữ viền focus, tôn trọng giảm chuyển động.
- Tiến độ và URL giữ nguyên; bàn phím riêng chỉ trong khung game trên máy tính bảng.

## Kết quả kiểm tra

- 168 kiểm tra tự động của kho đạt; kiểm tra cú pháp 156 tệp JavaScript đạt. Liên kết/ID, UTF-8/font trên 324 trang và chân trang trên 316 trang đạt.
- Bộ kiểm tra mới đo 10 cửa sổ: 1024×768, 768×1024, 744×1133, 1133×744, 820×1180, 1180×820, 1024×1366, 1366×1024, 1024×620 và 507×768. Xác nhận chiều cao bàn phím, ô nhập lớn hơn, nút kiểm tra không bị che, không tràn ngang.
- Đã kiểm tra nảy ngay ở pointerdown, hành động chỉ chạy một lần khi thả, không viền đậm của phản hồi đáp án; giảm chuyển động tắt animation nhưng vẫn thao tác được.
- Giả lập giọng đọc kéo dài để xác nhận không chuyển sớm; bấm chấm lặp chỉ đọc/chấm một lần. Kiểm tra tự sửa đúng, âm tắt/lỗi, nghe lại, chuyển thủ công trong khi chờ, hủy khi ẩn tab/rời game, khôi phục, thay bộ trên cùng vùng chơi và giữ tổng kết.
- Sau khi tự chuyển ở mức gõ cả từ, bàn phím ngoài gõ ngay vào ô mới; chỉ focus sau khi bộ điều khiển đã đặt `inputmode="none"`, không chủ động mở bàn phím hệ thống trên iPad.
- Bộ cũ về khung iPad: 10 bố cục và thao tác sửa tại con trỏ, bàn phím ngoài, quay lại, đọc nội dung dài đạt. Bộ bố cục mở rộng: 112 trường hợp iPad/điện thoại/lối vào lớp 1–12 đạt.
- Bộ ghép chữ lớp 2 dùng giọng thật đạt toàn bộ lượt ghép 1–2–3 chữ và gõ cả từ, tự sửa/gợi ý/xem mẫu, tải lại và hồ sơ riêng. Bộ phản hồi lớp 2/3/4 đạt với chuyển động bật/tắt.
- Cập nhật bản kiểm tra cũ để hỗ trợ cả tự chuyển sau giọng và nút tiếp tục thủ công. Cập nhật phiên bản tài nguyên và các bộ dựng, chạy lại không tạo thay đổi.
- Đã xem ảnh ở khổ 1024×768 và 768×1024. Bằng chứng: `artifacts/ipad-roomy-flow/results.json` cùng ảnh, `artifacts/letter-responsive/results.json`, `artifacts/ipad-game-frame/results.json`; kiểm tra logic tại `artifacts/publish-verification/roomy-unit-tests.txt` trong bản kiểm tra.

Giới hạn: kiểm tra trình duyệt Edge có mô phỏng cảm ứng; chưa thử trên Safari/iPad vật lý. Tốc độ chạm thực tế trên từng thiết bị cần được xác nhận thêm trên máy.
