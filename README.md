# Danh English Tutor

Website học tiếng Anh dạng HTML, CSS và JavaScript tĩnh. Trang chủ là `index.html`; phần Lớp 2 nằm trong `grade/lop2/`.

## Mở thử trên máy

Mở `index.html` bằng Chrome rồi chọn **Lớp 2**, hoặc mở thẳng `grade/lop2/lop2.html`. Các trang dùng tài nguyên tương đối trong cùng repo, nên giữ nguyên cấu trúc thư mục khi sao chép hoặc đưa lên GitHub.

Chrome trên máy người dùng có thể mở tệp cục bộ; công cụ duyệt tự động trong môi trường phát triển này chặn `file://`. Vì vậy các thay đổi mới đã qua kiểm tra mã và tài nguyên nhưng vẫn cần kiểm tra thao tác, âm thanh và bố cục trực tiếp trên Chrome.

## Cấu trúc chính

- `grade/lop2/lop2.html`: danh sách 19 topic hiện có.
- `grade/lop2/learning-core.js`: bộ chọn từ và Game 1–3 dùng chung cho các topic đã chuyển sang bộ này.
- `grade/lop2/extended-topics-data.js`, `extended-topic.js`, `extended-topic.css`: dữ liệu và giao diện của sáu topic mới.
- `grade/lop2/bodyparts-data.js`, `bodyparts.js`, `lesson-core.js`: dữ liệu và Game 4 riêng của Body Parts.
- `grade/lop2/grade2-navigation.js`, `grade2-theme.css`: điều hướng và giao diện chung.
- `shared/contact-footer.js`: footer dùng chung.
- `templates/`: mẫu để **sao chép** vào thư mục bài học; đường dẫn tài nguyên trong mẫu tính theo vị trí sau khi sao chép.

## Kiểm tra trước khi đưa lên GitHub

Chạy từ gốc repo:

```sh
node --test grade/lop2/tests/*.test.cjs
node scripts/check-local-links.cjs
node scripts/check-contact-footer.cjs
```

Workflow trong `.github/workflows/` chạy lại ba lệnh này khi push hoặc mở pull request. Xem `grade/lop2/NGHIEM_THU_MO_RONG_TOPIC.md` để biết phạm vi đã nghiệm thu và phần còn cần kiểm tra trên trình duyệt.

Các lớp 1 và 3–12 hiện chưa có bài học nên trang chủ hiển thị **Sắp có** thay vì liên kết tới trang không tồn tại.
