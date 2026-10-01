# Danh English Tutor

Website học tiếng Anh tĩnh bằng HTML, CSS và JavaScript. Trang chủ là index.html; danh sách bài Lớp 2 là grade/lop2/lop2.html.

## Mở website

Mở index.html bằng Chrome hoặc chạy một máy chủ tĩnh từ thư mục gốc repo. Giữ nguyên cấu trúc thư mục để liên kết và tài nguyên hoạt động. Các URL HTML hiện có được giữ để người học vẫn mở được liên kết đã lưu.

## Cấu trúc

- Các trang HTML ở gốc: địa chỉ công khai hiện có.
- assets/css/pages/ và assets/js/pages/: giao diện và mã của các trang ở gốc.
- grade/lop2/*.html: trang danh sách, 16 Unit Global Success và 19 chủ đề bổ trợ Lớp 2.
- grade/lop2/assets/: CSS, mã game và dữ liệu dùng trong bài Lớp 2; bộ Game 1–3 cũng phục vụ demo Lớp 4.
- grade/lop4/: trang danh mục, Unit 1–20, ảnh từ vựng, trò dùng từ trong câu và ôn tập Lớp 4.
- shared/: thành phần dùng trên nhiều khu vực.
- templates/: mẫu trang để sao chép vào vị trí bài học trước khi sử dụng.
- scripts/: lệnh kiểm tra chất lượng repo.
- grade/lop2/tests/: kiểm tra dữ liệu và quy tắc game.
- docs/: kiến trúc, kế hoạch, kiểm tra nội dung và biên bản nghiệm thu. Xem [mục lục tài liệu](docs/README.md).
- Hình ảnh từ vựng: [quy chuẩn ảnh chân thật](docs/CHUAN_HINH_ANH_TU_VUNG.md) và [artifact Thầy Danh duyệt hình](artifacts/thay-danh-duyet-hinh/README.md).

## Kiểm tra trước khi đưa lên GitHub

Chạy từ gốc repo:

    node --test grade/lop2/tests/*.test.cjs grade/lop4/tests/*.test.cjs
    find assets/js grade/lop2/assets/js grade/lop4/assets/js shared -type f -name '*.js' -print0 | xargs -0 -n1 node --check
    node scripts/check-local-links.cjs
    node scripts/check-contact-footer.cjs

GitHub Actions chạy lại các lệnh này khi push hoặc mở pull request. Các bài kiểm tra tự động chưa thay được việc nghe giọng đọc và thao tác trực tiếp trên điện thoại.

## Trạng thái phát triển

Lớp 2 có 16 Unit luyện từ vựng theo Tiếng Anh 2 – Global Success và 19 chủ đề bổ trợ. Mỗi Unit có từ vựng, câu luyện và tranh do website biên soạn; nội dung chưa đối chiếu từng Lesson với trang sách. Lớp 4 có đủ Unit 1–20 theo chủ đề Tiếng Anh 4 – Global Success, kèm phần ôn từ theo ngày. Unit 3–4 dùng ảnh minh họa phong cách ảnh chụp được tạo bằng AI; Unit 5–20 dùng biểu tượng minh họa. Các lớp khác chưa có bài học nên trang chủ hiển thị “Sắp có”. Xem [lộ trình](docs/ROADMAP.md).
