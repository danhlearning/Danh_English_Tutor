# Giao diện điền chữ trên iPad và điện thoại — 31/10/2026

## Phạm vi học và chơi

- Mục tiêu: giữ việc nhớ cách viết từ/cụm từ trong bộ đã chọn.
- Cách chơi: chạm chữ để điền 1–2–3 ô, sau đó gõ cả từ; giữ nghe lại và quay về chọn hoạt động.
- Chấm và hoàn thành: giữ nguyên đúng ngay, tự sửa, gợi ý, xem mẫu và điều kiện tự nhớ trước khi tăng mức; không thay khóa lưu hay lượt dở.
- Hỗ trợ khi sai: giữ gợi ý, xem mẫu, phản hồi và cơ hội tự sửa.
- Sửa giao diện: vùng chạm ô chữ tối thiểu 44 px, thanh điều khiển co giãn theo khổ màn hình; đo chiều cao thực tế của thanh và bàn phím; mở nội dung dài chủ động trong khung cố định. iPad cửa sổ hẹp vẫn dùng bàn phím game, điện thoại giữ bàn phím hệ thống.

## Lỗi tái hiện trước sửa

- `shared/learner-font.css` ép ô chữ còn `1.2ch`, nhỏ hơn vùng chạm 44 px.
- Thanh điều khiển, bàn phím và vùng chơi tính theo các chiều cao cố định; các nút cuối bị cắt ở khung thấp khi có đề dài hoặc chuyển sang gõ cả từ.
- `min-height` của trang có thể thắng chiều cao khung chơi; iPad chia màn hình dưới 600 px thoát khung chơi.

## Kết quả nghiệm thu

- Edge headless với màn hình cảm ứng mô phỏng: 112 trường hợp đạt, gồm 88 trường hợp đề dài ở mức ghép 3 chữ/gõ cả từ trên hai kiểu trang, 12 lối vào Unit đại diện lớp 1–12 và 12 bố cục điện thoại dọc/ngang.
- Kích thước iPad: 768×1024, 744×1133, 820×1180, 834×1194, 1024×1366 và chiều ngang tương ứng; thêm 600×744, 507×768, 320×568, khung thấp và các khổ hẹp khác. Bộ thử giữ kích thước màn hình iPad độc lập với kích thước cửa sổ để kiểm tra Split View.
- Điện thoại: 320×568, 375×667, 390×844, 430×932, 360×800, 412×915, cả hai chiều. Khung iPad không xuất hiện khi xoay điện thoại; kiểm tra nút chấm và phản hồi nhập trống.
- Không tràn ngang, thanh điều khiển nằm trong cửa sổ, vùng chơi không bị bàn phím phủ. Ô chữ có vùng chạm ít nhất 44×44 px. Với đề dài vượt khung, nút “Xem đầy đủ” cho cuộn trong vùng chơi và tiếp cận nút kiểm tra, giữ nguyên trạng thái game.
- Giữ nguyên phần tử nhập và nháp khi đổi kích thước, xoay và thu cửa sổ; bàn phím game sửa phần được chọn, xóa và chấm sai ở cửa sổ 507 px. Không có lỗi JavaScript trong bộ thử mới.
- Bộ thử khung iPad có sẵn: 10 bố cục đạt, gồm sửa tại con trỏ, chữ hoa/dấu, bàn phím ngoài, giữ nháp thật của thư viện, chặn trượt trang ngoài game, quay lại và mở nội dung dài.
- 15 kiểm tra logic ghép chữ đạt: tự sửa, dùng gợi ý/xem mẫu, nhắc lại trước khi tăng mức, lưu nháp/lượt và độc lập tiến độ từng lớp.
- Đã xem ảnh 1024×768, cửa sổ 507×768 và 320×568 ở chế độ xem đầy đủ. Cập nhật phiên bản bộ nạp tại 331 trang/mẫu/bộ dựng; chạy lại không phát sinh thay đổi.

Bằng chứng: `artifacts/letter-responsive/results.json`, ảnh cùng thư mục; bộ thử `tests/ui-ux/letter-responsive.browser.cjs`, `tests/ui-ux/ipad-game-frame.browser.cjs`.

Giới hạn: đây là kiểm tra mô phỏng trên Edge, chưa kiểm tra Safari/iPadOS hoặc iPad/điện thoại vật lý. WebKit và Firefox chưa có sẵn trong môi trường. Âm thanh giữ mã hiện có; chưa nghiệm thu nghe thực tế trên thiết bị trong lần sửa giao diện này.
