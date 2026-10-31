# Tạo lại minh họa Colors và Animals — 31/10/2026

- Mục tiêu học: nhận biết chính xác 13 màu/đặc tính màu và 50 động vật bằng hình; dùng lại trong các game hiện có.
- Cách chơi, chấm, hỗ trợ khi sai và hoàn thành: giữ nguyên hoạt động chọn, nghe, điền/ghép chữ, gõ từ và viết câu; giữ gợi ý, tự sửa, xem mẫu và quy tắc tiến độ hiện tại.
- Ảnh mới: tạo từng ảnh bằng công cụ imagegen tích hợp, nét chì màu trên giấy ngà, không chữ/nhãn trong ảnh, chủ thể rõ ở cỡ nhỏ; không thay khung thẻ hay âm thanh.
- Phân biệt đúng Gray/Silver, Black/White và Transparent. Hình động vật đúng loài và giải phẫu, không quần áo hay chi tiết trang trí gây nhầm.
- Lưu ảnh nhẹ trong dự án và dùng chung nguồn cho thẻ từ/game; giữ tải ảnh theo nhóm đang xem, không tải cả bộ khi mở trang.

## Ảnh và cách tái dùng

- Đủ 63 ảnh mới: 13 Colors, 50 Animals. Mỗi ảnh được tạo bằng một yêu cầu riêng với imagegen tích hợp; không dùng CLI/API key.
- Ảnh dùng trong trang: `grade/lop2/assets/images/pencil/colors/*-pencil-v2.webp` và `grade/lop2/assets/images/pencil/animals/*-pencil-v2.webp` (768×768), có bản `compact/` 384×384 cho thẻ từ. Hai bộ được dùng chung trong thẻ từ, ghép chữ, chính tả, trắc nghiệm và viết câu/đếm thú.
- Giữ nguyên khung thẻ, lazy loading, âm thanh, tên từ, ID và khóa tiến độ. Cập nhật phiên bản script của hai trang và quy tắc phiên bản trong bộ tích hợp để nhận ảnh mới.
- Ảnh PNG gốc đã chọn: `artifacts/colors-animals-20261031/originals/`. Prompt đầy đủ và prompt sửa bạch tuộc: `docs/content/colors-animals-art-prompts-20261031.json`.
- Bộ dựng Colors/Animals kiểm tra và giữ bộ v2 đã chọn; chạy lại không ghi đè bằng bộ SVG cũ. Các SVG cũ và nguồn giấy phép của chúng được giữ nguyên để đối chiếu.

## Nghiệm thu

- Đã xem trực tiếp đủ 63 ảnh trên các trang ảnh duyệt, không có chữ/nhãn trong ảnh. Xem riêng ảnh cua, nhện, ong, kiến và bạch tuộc ở cỡ lớn. Phát hiện bạch tuộc đầu tiên có 7 tay; đã chỉnh bằng imagegen và kiểm tra lại đủ 8 tay (4 trái, 4 phải).
- 5 kiểm tra dữ liệu/ảnh đạt: đủ 13/50 tệp riêng biệt, định dạng WebP hợp lệ, bản nhẹ có sẵn; giữ đầy đủ tên, IPA và tệp âm của Animals. Bộ dựng giữ được ảnh mới.
- Trình duyệt Edge mô phỏng: giải mã đủ 63 ảnh ở 5 khổ 320×568, 390×844, 768×1024, 1024×768 và 1280×900; ảnh trong game dùng bộ v2, không tràn ngang, không thiếu tệp hay lỗi JavaScript.
- Bộ thử Colors: đủ 13 ảnh và 13 câu viết với âm thanh thật, chấm điểm và bàn phím iPad đạt.
- Bộ thử Animals: đủ 50 ảnh và 16 câu đếm với âm thanh thật, chấm điểm và bàn phím iPad đạt.
- Bộ thử chung Animals/Colors: chạm ảnh/tên/nghĩa/khoảng trống thẻ đầu và cuối chỉ nghe một lần, Enter/Space, sai rồi tự sửa đúng, tiếp tục tiến độ và ngữ cảnh lớp 12 đạt; kiểm tra bố cục ở 320/390/1280 px.

Bằng chứng: `artifacts/colors-animals-20261031/browser-results.json`, `files.json`, các ảnh `colors-review-*` / `animals-review-*` và ảnh chụp trình duyệt cùng thư mục. Kiểm tra âm thanh/câu viết: `artifacts/colors-pencil-sync/browser-results.json`, `artifacts/animals-pencil/results.json`, `artifacts/animal-color-sync/results.json`.

Giới hạn: các bước tương tác được thử bằng Edge mô phỏng; chưa thử trên iPad/điện thoại vật lý. Bản sửa ở mã nguồn địa phương, chưa triển khai lên máy chủ công khai.
