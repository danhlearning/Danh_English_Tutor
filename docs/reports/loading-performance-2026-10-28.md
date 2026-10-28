# Tải ảnh và độ mượt game — 28/10/2026

## Phạm vi và nguyên tắc học

Giữ mục tiêu nhận nghĩa, nghe, nhớ từ, ghép/gõ và luyện câu của game hiện có. Giữ cách chơi, đáp án, cách chấm đúng ngay/tự sửa/có gợi ý/đã xem, hỗ trợ khi sai và điều kiện kết thúc. Không thay khóa lưu, URL bài hoặc tiến độ. Việc tải tài nguyên không tự phát tiếng hay ghi kết quả học.

## Nguyên nhân và thay đổi

- Ảnh raster trong SVG ở topic phụ không có tải sau tự nhiên: Food & Drinks tải cả 20 ảnh ngay khi mở. Dùng `img` có `loading=lazy`, `decoding=async`, kích thước cố định và `object-fit:contain`; giữ khung thẻ. Trong game, ảnh câu đang chơi tải ngay.
- Tạo 269 bản WebP 480 px từ đúng ảnh đã duyệt, giữ nguyên toàn bộ ảnh gốc. Tổng bản nhỏ 7.32 MB so với nguồn 28.36 MB (giảm 74.2%). `srcset` vẫn có ảnh gốc cho màn hình mật độ cao. Dựng lại bằng `scripts/build-compact-pencil-images.py` (Pillow).
- Không chuẩn bị tài nguyên cho game đang ẩn. Ghi nhớ cửa sổ câu đã chọn và chuẩn bị khi mở đúng panel; vẫn tối đa câu hiện tại và hai câu kế tiếp. Theo dõi riêng panel/thuộc tính ẩn, không theo dõi mọi animation. Hủy ảnh đang tải khi bị loại khỏi giới hạn sáu ảnh.
- Lượt điều hướng không đọc tọa độ thẻ vừa thay đổi DOM để đặt hiệu ứng. Giữ âm thanh và hiệu ứng; bấm lại tab đang chọn ở lớp 6–12 không dựng lại trạng thái hoặc chạy lại phản hồi.
- Bộ gắn thao tác nghe bỏ qua thẻ đã chuẩn bị và gộp các vùng thay đổi lồng nhau; vẫn nhận tên mới và thẻ dựng lại.
- Bộ tải trước trang chỉ dùng một kết nối; bài học không tự tải thử hai bài khác. Trang danh mục và thao tác chủ động chọn liên kết vẫn được chuẩn bị.
- Cập nhật URL tài nguyên ở trang/mẫu/bộ dựng; bộ tích hợp Ghép chữ giữ phiên bản mới và tính lặp lại. Đã dựng lại danh mục và 123 gói offline, 6.793 tệp, 239.3 MiB.

## Bằng chứng đo

Edge headless, màn hình 390×844. Lượt tải ảnh sau dùng mật độ màn hình 2×: Food & Drinks tải 14/20 ảnh gần màn hình, 434.992 byte, so với 20 ảnh / 2.231.378 byte ở lượt kiểm tra ban đầu cùng kích thước viewport (nguồn cũ chỉ có ảnh gốc). Giảm khoảng 80.5% dung lượng ảnh lúc mở. Đây là phép đo tải nội bộ; không phải cam kết thời gian tải trên host công khai.

Đổi thẻ/tab 30 thao tác, CPU chậm 4×, chuyển động bật:

| Trang | Số lần layout trước → sau | TaskDuration trước → sau | Khung hình >50 ms trước → sau |
| --- | --- | --- | --- |
| Lớp 6 Unit 1 | 105 → 55 | 4.601 → 3.232 giây | 25 → 7 |
| Lớp 10 Unit 7 | 110 → 51 | 5.189 → 2.028 giây | 30 → 3 |

Các lượt Animals/Clothes/Verbs/Bodyparts không cho thấy cải thiện TaskDuration đồng đều (có lượt tăng); không suy diễn mọi game đều nhanh hơn theo cùng tỷ lệ. Số liệu có dao động theo máy và tác vụ nền. Tệp đo: `artifacts/game-performance/load-lag-before.json`, `load-lag-final.json`; lượt `load-lag-after.json` là bản trung gian.

## Đã kiểm tra

- Kiểm tra mới `tests/ui-ux/loading-performance.browser.cjs`: giảm tải ảnh ban đầu, ảnh đầu/cuối tải được, chạm ảnh phát đúng một lần, không tự đọc; game ẩn không tải âm trước nhưng mở game có cache; bấm lặp tab không chạy phản hồi; điều hướng không đọc bố cục để đặt hiệu ứng; giảm chuyển động, không tràn ngang, không lỗi JS/404.
- `tests/game-pacing/browser.cjs`: dùng thật âm thanh đã chuẩn bị, không thêm yêu cầu mạng khi đọc cache, giữ tốc độ học/game, tiếp tục lượt, dừng khi đổi tab, chờ giọng đọc xong mới tự chuyển. Game mẫu lớp 1–12 và hai khu vực ngữ pháp đạt.
- `tests/young-learner-speech/topic-picture-audio.browser.cjs`: đủ 19 topic, nghe thật 38 lần từ thẻ đầu/cuối, tắt Web Speech; không đọc lặp/tự đọc/lỗi JS/tệp thiếu.
- `tests/learner-profiles/site-preload.browser.cjs`: cache dùng lại, không chạy bài đích sớm, giới hạn tài nguyên, âm tắt/mạng yếu/offline, hồ sơ và tiến độ qua điều hướng/tải lại đạt.
- 7 kiểm tra lõi media, 22 kiểm tra nội dung/giọng đọc/hồ sơ, 6 kiểm tra tích hợp Ghép chữ, 15 kiểm tra offline đạt. Liên kết/ID của 324 trang hợp lệ; danh mục/gói offline khớp tệp thực tế.
- `tests/offline/browser.cjs`: tải đủ gói, tạm dừng/tiếp tục, tính toàn vẹn; offline đủ 12 lớp, thư viện, trang cũ, audio range, khởi động lại worker, host thư mục con và bố cục đạt.
- Đã mở xem trực tiếp ảnh chụp Food & Drinks trên khổ điện thoại: `artifacts/loading-performance/fooddrinks-mobile.png`. Chưa kiểm tra trên điện thoại/iPad vật lý hoặc đo host công khai.

## Phát hành

Các thay đổi nằm trong workspace. Chưa push hoặc triển khai lên host công khai. Khi phát hành cần đưa cả thư mục `grade/lop2/assets/images/pencil/compact/`, các mã/trang đã đổi và bộ offline mới lên host. PWA đang dùng worker cũ tiếp tục theo luồng cập nhật đã có trên trang Học offline.
