# Danh English Tutor

Website học tiếng Anh tĩnh bằng HTML, CSS và JavaScript. Trang chủ là index.html; danh sách bài Lớp 2 là grade/lop2/lop2.html.

Định hướng sản phẩm là **game học tiếng Anh**: mỗi hoạt động có mục tiêu học, thử thách, phản hồi, tự sửa và ôn lại; dùng Nunito, phong cách dễ thương, âm thanh và animation phục vụ cách chơi. Khi phát triển, tuân theo [chỉ dẫn chung](AGENTS.md) và [nguyên tắc thiết kế game học tiếng Anh](docs/NGUYEN_TAC_GAME_HOC_TIENG_ANH.md).

## Mở website

Mở index.html bằng Chrome hoặc chạy một máy chủ tĩnh từ thư mục gốc repo. Giữ nguyên cấu trúc thư mục để liên kết và tài nguyên hoạt động. Các URL HTML hiện có được giữ để người học vẫn mở được liên kết đã lưu.

## Hồ sơ người học

Nhập tên để vào học, chọn lại tên khi bắt đầu phiên mới và đổi người học trên thanh đầu trang. Một trình duyệt có thể lưu nhiều hồ sơ với tiến độ, lượt dở và lựa chọn hiệu ứng riêng. Có đổi tên, sao lưu JSON, khôi phục thành hồ sơ mới và xác nhận xóa một hồ sơ. Tiến độ cũ có thể chuyển cho hồ sơ đầu tiên; chưa đồng bộ tự động giữa các thiết bị. Xem [hướng dẫn hồ sơ](docs/LEARNER_PROFILES.md).

## Cấu trúc

- Các trang HTML ở gốc: địa chỉ công khai hiện có.
- skills.html: trang Luyện theo kỹ năng, gom từ vựng, ngữ pháp, lý thuyết phát âm và luyện tập phản xạ. Trang chủ có hai lối vào: luyện kỹ năng và học theo lớp.
- grammar-index.html: phòng ngữ pháp với 25 bài, ba cấp độ, 1.530 mục luyện từ 510 tình huống; lượt 10 câu có năm dạng, lưu lượt dở, ôn lỗi sai và lịch ôn. Các đường dẫn chuyên đề cũ vẫn hoạt động.
- assets/data/grammar/ và assets/js/grammar/: nội dung và bộ luyện chung của phòng ngữ pháp; tiến độ cách ly với các lớp.
- assets/css/pages/ và assets/js/pages/: giao diện và mã của các trang ở gốc.
- grade/lop2/*.html: trang danh sách, 16 Unit Global Success và 19 chủ đề bổ trợ Lớp 2.
- grade/lop2/assets/: CSS, mã game và dữ liệu dùng trong bài Lớp 2; bộ Game 1–3 cũng phục vụ demo Lớp 4.
- grade/lop4/: trang danh mục, Unit 1–20, ảnh từ vựng, trò dùng từ trong câu và ôn tập Lớp 4.
- grade/lop6/: trang danh mục và 12 Unit Global Success Lớp 6; mỗi Unit có từ vựng, lật thẻ, chọn nghĩa và gõ từ. Mục Ngữ pháp có 1.872 câu hỏi, ba cấp độ và các set 10 câu.
- grade/lop7/: 12 Unit Global Success Lớp 7, 96 từ vựng, 19 ảnh AI theo ngữ cảnh và 432 bài luyện ngữ pháp ở ba cấp độ. Ảnh từ trừu tượng có nghĩa tiếng Việt; thẻ chỉ hiện ảnh ở mặt nghĩa.
- shared/: thành phần dùng trên nhiều khu vực.
- templates/: mẫu trang để sao chép vào vị trí bài học trước khi sử dụng.
- scripts/: lệnh kiểm tra chất lượng repo.
- grade/lop2/tests/: kiểm tra dữ liệu và quy tắc game.
- docs/: kiến trúc, kế hoạch, kiểm tra nội dung và biên bản nghiệm thu. Xem [mục lục tài liệu](docs/README.md).
- Hình ảnh từ vựng: [quy chuẩn ảnh chân thật](docs/CHUAN_HINH_ANH_TU_VUNG.md) và [artifact Thầy Danh duyệt hình](artifacts/thay-danh-duyet-hinh/README.md).

## Kiểm tra trước khi đưa lên GitHub

Chạy từ gốc repo:

    node --test grade/lop2/tests/*.test.cjs grade/lop4/tests/*.test.cjs grade/lop7/tests/*.test.cjs tests/grammar-room/*.test.cjs tests/learner-profiles/*.test.cjs
    find assets/data assets/js grade/lop2/assets/js grade/lop4/assets/js grade/lop6/assets/js grade/lop7/assets/js shared -type f -name '*.js' -print0 | xargs -0 -n1 node --check
    node scripts/check-local-links.cjs
    node scripts/check-contact-footer.cjs

GitHub Actions chạy lại các lệnh này khi push hoặc mở pull request. Các bài kiểm tra tự động chưa thay được việc nghe giọng đọc và thao tác trực tiếp trên điện thoại.

Phòng ngữ pháp: `node scripts/build-grammar-pages.cjs` tái tạo các trang công khai từ mẫu chung. Kiểm tra trình duyệt bằng `node tests/grammar-room/browser-smoke.cjs` khi có Playwright; có thể đặt `PLAYWRIGHT_MODULE`, `BROWSER_CHANNEL` và `LESSON_BASE_URL` theo môi trường. Chi tiết nội dung, cách chấm và lưu tiến độ tại [tài liệu phòng ngữ pháp](docs/GRAMMAR_ROOM.md).

## Trạng thái phát triển

Lớp 2 có 16 Unit luyện từ vựng theo Tiếng Anh 2 – Global Success và 19 chủ đề bổ trợ. Mỗi Unit có từ vựng, câu luyện và tranh do website biên soạn; nội dung chưa đối chiếu từng Lesson với trang sách. Lớp 4 có đủ Unit 1–20 theo chủ đề Tiếng Anh 4 – Global Success, kèm phần ôn từ theo ngày. Unit 3–4 dùng ảnh minh họa phong cách ảnh chụp được tạo bằng AI; Unit 5–20 dùng biểu tượng minh họa. Lớp 6 có 12 Unit theo chủ đề Tiếng Anh 6 – Global Success, với 96 từ và các bài luyện do website biên soạn; phần Ngữ pháp có bài luyện theo Unit và học kỳ, năm dạng câu hỏi và streak. Lớp 7 có 12 Unit, 96 từ, 19 ảnh minh họa theo ngữ cảnh và 432 mục luyện ngữ pháp. Các lớp còn lại chưa có bài học; tên lớp vẫn hiển thị trên trang chủ nhưng chưa mở được. Xem [lộ trình](docs/ROADMAP.md).
