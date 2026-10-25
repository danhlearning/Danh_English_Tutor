# Rà ảnh từ vựng lớp 2 — 25/10/2026

## Đã thay ảnh sau khi rà soát

- Đã thay nguồn ảnh cho đủ 16 Unit và trang ôn tập: 44 tranh bút chì (30 ảnh tạo mới bằng built-in image_gen, 14 ảnh dùng lại đã xem), giữ 4 hình số gốc ở Unit 13.
- Không còn trang HTML lớp 2 nạp JavaScript ghi đè ảnh 3D. Bài học, các game lấy từ dữ liệu Unit và ôn tập đều nhận cùng nguồn tranh trước khi khởi tạo.
- Đã xem đủ 44 tranh. Sửa riêng Grapes thành chùm nho sau khi phát hiện ảnh grape cũ chỉ có một quả.
- Ảnh mới nằm trong `grade/lop2/assets/images/pencil/units/`; manifest có đường dẫn và SHA-256 cho cả 44 tranh. Toàn bộ prompt và nguồn ảnh được lưu tại `artifacts/grade2-image-audit/unit-art-prompts.json`.
- Bộ cài lại: `scripts/install-grade2-unit-art.py`. Chạy bằng Python có Pillow; chỉ tác động ảnh Unit và 17 trang lớp 2.
- 23 kiểm tra tự động đạt: đủ ảnh/tệp, thứ tự nạp, không đổi mã từ, câu hỏi hoặc đáp án, cùng các kiểm tra game/ôn tập hiện có.
- Trình duyệt: đã kiểm tra 16 trang ở 390 px, thẻ đầu/cuối chạm ảnh, chữ, khoảng trống và Enter/Space gọi nghe đúng một lần; không tự đọc lúc mở. Kiểm tra ảnh trong game ghép chữ và nguồn dữ liệu ôn tập; không có tệp bị thiếu hoặc lỗi JavaScript trong lượt kiểm tra ban đầu.
- Lượt kiểm tra cuối cũng đạt ở khổ 320/390/1280 px. Đã xác nhận tệp âm thanh thật của Fox và Volleyball chuyển sang trạng thái phát và kết thúc, đúng một lần cho mỗi lần chạm. Kết quả chi tiết trong `browser-results.json`.

Các phần dưới đây ghi lại tình trạng trước khi sửa.

## Kết quả
- Cả 48/48 từ trong Unit 1–16 vẫn dùng bộ ảnh 3D cũ qua shared/vocabulary-3d.js. Các tệp đều tồn tại; đây là sót chuyển bộ ảnh, không phải ảnh bị mất.
- Fox: Unit 6; Volleyball: Unit 8. Đã mở và xác nhận cả hai là ảnh nhân vật 3D cũ.
- Unit 1–2 có ảnh approved trong dữ liệu gốc nhưng bị lớp 3D ghi đè khi vào bài.
- Trang ôn tập không nạp bộ 3D: dùng ảnh approved cho Unit 1–2 và SVG cũ cho Unit 3–16. Bộ ảnh chưa thống nhất giữa bài và ôn tập.
- Bộ dựng scripts/integrate-grade2-pencil.cjs chỉ xử lý topic phụ, không bao gồm gsunit1–gsunit16.

## Toàn bộ từ còn dùng 3D

| Unit | Từ |
| --- | --- |
| 1 | Pasta, Popcorn, Pizza |
| 2 | Kite, Bike, Kitten |
| 3 | Sail, Sand, Sea |
| 4 | Rainbow, River, Road |
| 5 | Question, Square, Quiz |
| 6 | Box, Fox, Ox |
| 7 | Juice, Jelly, Jam |
| 8 | Village, Van, Volleyball |
| 9 | Yogurt, Yams, Yo-yos |
| 10 | Zoo, Zebra |
| 11 | Slide, Ride, Drive |
| 12 | Grapes, Cake, Table |
| 13 | Eleven, Thirteen, Fourteen, Fifteen |
| 14 | Brother, Sister, Grandmother |
| 15 | Shirts, Shoes, Shorts |
| 16 | Tent, Teapot, Blanket |

## Topic phụ

| Topic có trong manifest bút chì | Số ảnh | Tệp thiếu |
| --- | ---: | ---: |
| clothes | 20 | 0 |
| dates | 19 | 0 |
| familyfriends | 20 | 0 |
| feeling | 20 | 0 |
| fooddrinks | 20 | 0 |
| fruits | 18 | 0 |
| schoolsupplies | 25 | 0 |
| bodyparts | 33 | 0 |
| householditems | 16 | 0 |
| verbs | 20 | 0 |
| adjectives | 12 | 0 |
| shapes | 8 | 0 |
| toys | 12 | 0 |
| weather | 8 | 0 |
| rooms | 7 | 0 |
| transport | 12 | 0 |

Animals, Colors và Numbers nằm ngoài đợt chuyển bút chì trước đó theo scripts/finalize-grade2-pencil.py; Numbers và Dates được bảo toàn hình số/lịch theo scripts/integrate-grade2-pencil.cjs. Không tính hình số, lịch hoặc ký hiệu màu là ảnh cũ cần thay tự động.

## Phạm vi xác minh

Đã đánh giá mã nạp ảnh của đủ 16 trang Unit, xác minh đường dẫn ảnh Unit và manifest topic phụ trên ổ đĩa; đã xem trực tiếp ảnh Fox và Volleyball. Chưa kiểm tra trình duyệt, nghe âm thanh hoặc duyệt trực quan từng ảnh topic phụ. Chưa thay ảnh hay chỉnh chức năng website.
