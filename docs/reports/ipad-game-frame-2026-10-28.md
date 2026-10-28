# Khung chơi iPad và bàn phím trong game — 28/10/2026

## Cập nhật bố cục kiểu iPadOS 27

Đã đổi bàn phím sang bốn hàng English US kiểu iPad: Xóa bên phải hàng QWERTY, hàng giữa lệch nửa phím với Return bên phải, Shift hai bên hàng thứ ba, dấu phẩy/chấm riêng, hàng cuối có .?123 / space / .?123 / ẩn bàn phím. Phím chức năng xám, chữ trên phím trắng, Return xanh thực hiện Kiểm tra. Có trang số và trang ký hiệu bổ sung. Khi ẩn bàn phím, thanh đầu khung có nút hiện lại; chạm ô nhập cũng hiện lại. Không thêm nút emoji/dictation không có chức năng trong game.

Tham khảo [hướng dẫn bàn phím iPadOS 27 của Apple](https://support.apple.com/en-by/guide/ipad/ipad997da459/27/ipados/27). Đây là bàn phím web mô phỏng để chơi game, không thay bàn phím hệ thống hoặc mô phỏng toàn bộ QuickType/QuickPath.

Giữ nguyên dock 224 px, vùng đề/ô nhập và cách chấm. Kiểm tra trình duyệt 10 bố cục dọc/ngang đạt lại sau đổi layout, gồm vị trí phím Xóa/Return/Shift, ẩn-hiện, chữ hoa/số/dấu, lưu nháp, bàn phím ngoài và chống trượt. 15 kiểm tra lõi thư viện/tích hợp cũng đạt. Đã mở xem ảnh chụp ngang và dọc mới; chưa kiểm tra iPad thật và chưa triển khai online. Phiên bản mã mới: `ipados-layout-20261028`.

## Thay đổi

Thành phần chung `shared/tablet-game.js` và `.css` được tải từ bộ hồ sơ chung, áp dụng cho trang hiện có, mẫu và trang sinh mới. Tự bật trên máy tính bảng có cảm ứng, bề ngang từ 600 px; điện thoại và máy tính giữ bố cục bình thường.

- Nhiệm vụ hiện tại chiếm khung cố định theo visualViewport, khóa trang nền và chặn vuốt một ngón ngoài vùng đọc chủ động. Không di chuyển/sao chép phần tử game. Giữ nút quay về chọn hoạt động và trả lại cuộn trang/thuộc tính ô nhập khi thoát.
- Khi cần gõ, dành riêng 224 px cho bàn phím QWERTY bên dưới; khung nhiệm vụ giảm theo đúng phần còn lại. Không phủ bàn phím lên câu hỏi hoặc ô nhập. Ô nhập dùng `inputmode=none`/chính sách bàn phím thủ công; vẫn nhập bằng bàn phím ngoài và đặt con trỏ/chọn chữ được.
- Có chữ hoa, số/dấu, khoảng trắng, xóa và Kiểm tra. Dùng chính ô nhập và nút chấm hiện có, phát sự kiện input để giữ nháp; không thêm điểm hoặc thay cách chấm. Đáp án bị khóa thì bàn phím ẩn, dành chỗ cho phản hồi và câu tiếp.
- Thu gọn khoảng cách, khung ảnh và thông tin lặp; giữ cỡ chữ câu hỏi khoảng 22–24 px, ô/phím từ 18 px, mục tiêu chạm tối thiểu 44 px. Giữ các hướng dẫn/gợi ý đang có. Nội dung vượt khung có nút “Xem đầy đủ”, chỉ khi chủ động bật mới cuộn vùng nội dung bên trong; trang nền vẫn cố định. Thu lại đưa nội dung về đầu.
- Đổi phiên bản URL bộ hồ sơ thành `ipad-play-20261028` trong trang/mẫu/bộ dựng để nhận mã mới; không khôi phục tính năng offline.

Mục tiêu, thao tác, cách chấm, hỗ trợ khi sai và điều kiện kết thúc được ghi trước triển khai tại `docs/plans/ipad-game-frame-2026-10-28.md`. Không thay ngân hàng, khóa tiến độ hoặc dữ liệu lưu.

## Đã kiểm tra

Edge headless giả lập cảm ứng ở 1024×768 và 768×1024, chuyển động giảm. Không xem đây là nghiệm thu Safari/iPad vật lý.

- `tests/ui-ux/ipad-game-frame.browser.cjs`: 10 trạng thái/bố cục, gồm đang gõ khi xoay dọc/ngang, đáp án đã chấm, ghép chữ lớp 2, viết câu Unit lớp 2, gõ từ thư viện và điền từ phòng ngữ pháp. Các nhiệm vụ mẫu không tràn ngang/dọc; ô nhập/câu hỏi không bị bàn phím phủ.
- Gõ, thay thế vùng chọn giữa từ, xóa, khoảng trắng, chữ hoa, số/dấu, gửi bằng Kiểm tra; chấm sai/đúng bằng nút gốc, tự ẩn khi giải xong; nhập bằng bàn phím ngoài vẫn được. Nháp thực tế của thư viện lưu đúng qua sự kiện input.
- Thử vuốt chéo bằng sự kiện cảm ứng thật qua CDP: tọa độ trang và khung giữ nguyên. Thoát trả lại inputmode. Nội dung giải thích dài mở/đóng vùng đọc được. Điện thoại 390 px và máy tính không cảm ứng 1280 px không bị khóa hay thêm bàn phím.
- Rà màn chơi mẫu đủ lớp 1–12 ở 1024×768: lớp 1–5 ghép chữ, lớp 6–12 gõ từ; đều nằm trọn khung. Dữ liệu tại `artifacts/ipad-game-frame/grades-survey.json`.
- 15 kiểm tra lõi tích hợp Ghép chữ/thư viện và 8 kiểm tra media đạt. Kiểm tra liên kết/ID 324 trang và chân trang 316 trang đạt; cú pháp mã mới hợp lệ.
- Đã mở xem trực tiếp các ảnh chụp ngang/dọc, viết câu và ngữ pháp trong `artifacts/ipad-game-frame/`. Kết quả trình duyệt tại `results.json`.

Trong lần rà mở rộng Game 4 Clothes, phát hiện một số tệp MP3 đáp án câu chưa có từ trước (ví dụ `7a2e2a1b.mp3`, `09d1603d.mp3`). Đây là khoảng trống âm thanh của bộ câu cũ, không phải tác động của bàn phím; đợt này giữ phạm vi bố cục/nhập liệu. Bộ nghiệm thu chính dùng Unit lớp 2 đã có âm và không có lỗi JS/tệp thiếu trong các bước đã kiểm tra.

## Giới hạn và phát hành

Chưa kiểm tra trên iPad/Safari thật; môi trường không có trình chạy WebKit. Nội dung dài, phóng đại chữ hoặc cửa sổ quá nhỏ có thể cần bấm “Xem đầy đủ”; không cắt bỏ nội dung để ép vừa. Chưa push hoặc triển khai lên host công khai.
