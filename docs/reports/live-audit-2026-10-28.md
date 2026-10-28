# Kiểm tra website công khai — 28/10/2026

Địa chỉ: https://danhlearning.github.io/Danh_English_Tutor/ . Trình duyệt Edge thật ở phiên riêng, giả lập cảm ứng 1024×768 và màn điện thoại 390×844; không thay đổi hoặc phát hành website.

## Kết quả

- 34 lượt mở trang (32 URL riêng biệt): trang chủ, Unit mẫu đủ lớp 1–12, 19 topic lớp 2 và các lượt mở lại để kiểm tra nghe/game. Các lượt đều HTTP 200; không có lỗi JavaScript hay kết nối thất bại được ghi nhận. Game mẫu của 12 lớp mở được. Không phát hiện tràn ngang trong bước tải trang.
- Bản online vẫn yêu cầu `learner-profile.js?v=save-chip-20261025`, không có `DanhTabletGame`, chưa có khung cố định hoặc bàn phím kiểu iPadOS. Trang chủ vẫn có mục offline. Đây là bản cũ, không phải các sửa đổi mới trong workspace.
- Thẻ đầu/cuối Food & Drinks phát được tiếng đọc. Thẻ Pizza phát đúng một lần và kết thúc; từ thao tác tới sự kiện playing khoảng 375.5 ms trong lượt đo đầu. Không suy diễn số này là độ trễ ổn định cho mọi mạng/thiết bị.
- Game Viết câu Clothes phát hiện ba tệp MP3 tải trước HTTP 404 trong cửa sổ câu được chọn: `917cd269.mp3`, `0297e13b.mp3`, `750bbb3e.mp3`. Không kết luận cả ngân hàng chỉ thiếu ba tệp; đây là ba tệp đã quan sát trong lượt này.
- Màn Viết câu Clothes còn cao 1601 px so với viewport iPad 768 px; chưa cố định. Ảnh chụp lớp 6 cũng cho thấy ô nhập nằm dưới vùng màn hình ban đầu.

Bằng chứng: `artifacts/live-audit-20261028/results.json`, `home-ipad.png`, `grade6-game-ipad.png`, `clothes-sentence-ipad.png`, `fooddrinks-phone.png`. Lệnh kiểm tra: `scripts/audit-live-site.cjs` (truy cập mạng công khai). Các kiểm tra chỉ mở game và nghe mẫu; chưa duyệt/chấm mọi câu hoặc thử iPad/Safari vật lý.

Chưa triển khai thay đổi lên website công khai trong lượt này. Cần phát hành bản mới và bổ sung/kiểm tra âm thanh của bộ câu Clothes trước khi coi bản online đã có đầy đủ sửa đổi.
