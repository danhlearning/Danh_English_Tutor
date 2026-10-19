# Checkpoint tranh lớp 6

## HOÀN TẤT — trạng thái cuối 19/10/2026

**96/96 ảnh đã tạo, tối ưu, mở xem trực tiếp, ghi hash và tích hợp đủ 12 Unit. Không tạo lại nhóm ảnh.** Cell93 đã hoàn tất toàn bộ queue, không lỗi và không còn yêu cầu tạo chạy. Có hai lượt sửa mục tiêu cho Save (đèn tắt) và Technology (bỏ dấu giống logo); đã mở lại bản WebP cuối rồi ghi hash.

`finalize-grade6-pencil.py` PASS96; `browser-check.cjs --complete` PASS48 trạng thái; browser lớp6/7 PASS115 bitmap và giữ tiến độ. Toàn bộ78 kiểm tra nội dung/game/hồ sơ, liên kết199 trang và chân trang193 trang đạt. Manifest đã đủ96, query script đổi thành `pencil-20261019-final`. Chi tiết trong `docs/reports/grade6-pencil-2026-10-19.md`. Các mục trạng thái bên dưới là lịch sử, không còn việc thiếu. Không commit/push.

## Yêu cầu

Tạo ảnh cho toàn bộ lớp 6 theo phong cách bút chì màu mới nhất của lớp 2; 96 mục từ, 12 Unit. Ưu tiên Unit 2 đang được xem, sau đó Unit 1, 3–12. Dùng built-in image_gen, không API trả phí, không tự tạo subagent, không commit/push trong yêu cầu tạo ảnh này.

## Dữ liệu bền vững

- `artifacts/grade6-pencil/generation.json`: 96 prompt và ID/nghĩa/ví dụ ban đầu; không thay đổi nội dung học.
- `artifacts/grade6-pencil/results/<unit>-<id>.json`: nguồn PNG và prompt từng ảnh. Đọc danh sách thực tế để tránh tạo trùng.
- `scripts/prepare-grade6-pencil.py`: tối ưu các nguồn mới thành WebP 768×768; không xử lý lại nguồn không đổi. Có `--approve <unit>/<id>,...` để ghi hash CHỈ cho các ảnh cuối đã thực sự mở xem.
- `individual-review.json`: các WebP đã mở xem cùng SHA-256. `prepared.json`: trạng thái tối ưu, không phải duyệt hình.
- `scripts/integrate-grade6-pencil.cjs`: chỉ ghi manifest runtime từ review có hash khớp. Chạy sau mỗi nhóm duyệt.
- Unit pages, danh mục và ôn học kỳ đã tải manifest trước units-data. Bộ dựng từ thêm image tùy chọn; lesson hỗ trợ ảnh và icon dự phòng một lần khi lỗi; không đổi IDs/tiến độ.

## Trạng thái đầu kiểm tra

- 23 ảnh đã mở trực tiếp và ghi hash: Unit 2 đủ 8, Unit 1 đủ 8, Unit 3 từ 1–7. Những ảnh còn lại chưa được tính đã duyệt.
- Unit3/8 Curly hair đã xuất hiện trong lượt xem tiếp theo; nhóm ảnh Curly hair + Unit4/1–4 đang chờ đầu ra tiếp của cell104. Chỉ ghi duyệt sau khi đã nhìn đủ từng ảnh.
- Cell93 đang tạo phần còn lại bằng 4 lượt song song, ghi từng kết quả ngay. Không tạo trùng queue; dừng cấp mới nếu gặp lỗi. Functions store `g6Generation` giữ 96 prompt nhưng bản JSON trên đĩa là nguồn phục hồi.
- Cell102 đang chạy kiểm tra trình duyệt 48 trạng thái. Lượt đầu session19192 bị dừng vì chờ decode ảnh lazy ngoài màn hình; đã sửa loading=eager trong browser-check. Không coi lượt đầu là đạt.
- Tệp kiểm tra mới `tests/secondary-images/grade6-pencil.test.cjs` đã đạt cho 9 ảnh lúc khởi tạo. Cần chạy lại khi đủ96.
- Tham khảo ảnh và prompt lớp2: `grade/lop2/assets/images/pencil/rooms/living-room-v1.webp`; trường học và nhân vật lớp6 đã duyệt đúng nghĩa, không chữ.

## Hoàn tất

1. Đợi tạo xong, tối ưu phần mới, mở xem từng WebP, sửa ảnh không đạt bằng imagegen và ghi nguồn sửa vào đúng result trước khi prepare lại.
2. Ghi duyệt các nhóm vừa xem; không duyệt dựa vào tên file hoặc contact sheet chưa mở. Tích hợp sau duyệt.
3. Khi đủ96: đổi phiên bản query của manifest/units-data/lesson thành bản cuối để tránh trình duyệt dùng manifest từng phần.
4. Chạy kiểm tra nội dung ảnh/hash, các test hiện có, browser-check48 trạng thái và browser lớp6/7 (đã cập nhật để nhận ảnh bút chì). Xem screenshot, kiểm tra fallback, liên kết/chân trang, ID/lưu học giữ nguyên.
5. Cập nhật docs/content/grade6-7-image-review.json phần grade6 (đang ghi 0bitmap lịch sử), báo cáo và checkpoint số cuối. Báo vị trí ảnh/prompt và chế độ built-in. Không báo xong96 khi còn thiếu.

Máy chủ `http://127.0.0.1:8001`. Node/Playwright theo runtime dự án. Python: `C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`. Nhiều thay đổi chưa commit của tính năng ôn tập lớp2 từ yêu cầu trước cần giữ nguyên.
