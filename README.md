# Danh English Tutor

Website học tiếng Anh tĩnh bằng HTML, CSS và JavaScript. Trang chủ là index.html; danh sách bài Lớp 2 là grade/lop2/lop2.html.

Cập nhật 23/10/2026: lớp 10–12 có 100 từ/cụm từ mỗi lớp, kèm tranh và giọng đọc; xem [báo cáo bổ sung từ vựng](docs/reports/upper-secondary-vocabulary-2026-10-23.md).

Định hướng sản phẩm là **game học tiếng Anh**: mỗi hoạt động có mục tiêu học, thử thách, phản hồi, tự sửa và ôn lại; dùng Nunito, phong cách dễ thương, âm thanh và animation phục vụ cách chơi. Khi phát triển, tuân theo [chỉ dẫn chung](AGENTS.md) và [nguyên tắc thiết kế game học tiếng Anh](docs/NGUYEN_TAC_GAME_HOC_TIENG_ANH.md).

## Mở website

Mở index.html bằng Chrome hoặc chạy một máy chủ tĩnh từ thư mục gốc repo. Giữ nguyên cấu trúc thư mục để liên kết và tài nguyên hoạt động. Các URL HTML hiện có được giữ để người học vẫn mở được liên kết đã lưu.

## Hồ sơ người học

Nhập tên để vào học, chọn lại tên khi bắt đầu phiên mới và đổi người học trên thanh đầu trang. Một trình duyệt có thể lưu nhiều hồ sơ với tiến độ, lượt dở và lựa chọn hiệu ứng riêng. Có đổi tên, sao lưu JSON, khôi phục thành hồ sơ mới và xác nhận xóa một hồ sơ. Tiến độ cũ có thể chuyển cho hồ sơ đầu tiên; chưa đồng bộ tự động giữa các thiết bị. Xem [hướng dẫn hồ sơ](docs/LEARNER_PROFILES.md).

## Cấu trúc

- Giao diện hiện tại lớp 1, 3, 5 theo mẫu lớp 4: bảng từ có ảnh AI/phiên âm/nghe, mẫu câu, lật thẻ, nghe chọn tranh, gõ từ và dùng từ trong câu; danh mục có ôn hôm nay. Dựng cả ba lớp bằng `node scripts/build-primary-template.cjs` (hai lệnh dựng cũ cũng gọi bộ dựng này). Bộ chạy ở `shared/primary-template-*.js`, dùng lại CSS lớp 4 và Game 1–3 đang có. Ngân hàng xuất ở `grade/lop<lớp>/assets/js/course.js`. Các lượt theo giao diện cũ được giữ ở `legacy.html?unit=unit<N>&mode=<mode>`; URL Unit cũ có tham số `mode` chuyển tới đúng lượt đó.
- Ảnh từ vựng lớp 1/3/5: bản đồ tại `shared/assets/primary-vocabulary/manifest.json`, prompt tạo ảnh tại `docs/primary-image-prompts.json`, ảnh WebP dùng trực tiếp từ kho mới và kho AI sẵn có. Bản gốc ảnh mới nằm trong `artifacts/primary-template/originals/`; tối ưu và xuất bảng QA bằng `scripts/optimize-primary-images.py`.
- grade/lop1/lop1.html và grade/lop5/lop5.html: 16 chặng lớp 1 (64 mục từ, 48 câu) và 20 chặng lớp 5 (120 mục từ/cụm từ, 80 câu). Nội dung tự biên soạn theo chủ đề; giao diện và bốn game theo mẫu lớp 4 tại shared/primary-template-*.js. Dựng lại bằng `node scripts/build-primary-grades.cjs`; kiểm tra trình duyệt bằng `node tests/primary-grades/browser.cjs` với máy chủ cổng 8001. Trang chủ và danh mục lớp 1–5 đã có liên kết chọn lớp.
- grade/lop3/lop3.html: danh mục lớp 3 theo mẫu lớp 4 với 20 Unit, 93 mục từ/cụm từ, 60 câu mẫu và bốn game. Dữ liệu ở grade/lop3/units.js; dựng lại các trang bằng `node scripts/build-grade3.cjs`; kiểm tra giao diện mới bằng `node tests/primary-grades/browser.cjs`, kiểm tra lượt cũ bằng `node tests/grade3/browser.cjs` khi máy chủ tĩnh chạy ở cổng 8001.
- Các trang HTML ở gốc: địa chỉ công khai hiện có.
- skills.html: trang Luyện theo kỹ năng, gom từ vựng, ngữ pháp, lý thuyết phát âm và luyện tập phản xạ. Trang chủ có hai lối vào: luyện kỹ năng và học theo lớp.
- grammar-index.html: phòng ngữ pháp với 25 bài, ba cấp độ, 1.530 mục luyện từ 510 tình huống; lượt 10 câu có năm dạng, lưu lượt dở, ôn lỗi sai và lịch ôn. Các đường dẫn chuyên đề cũ vẫn hoạt động.
- assets/data/grammar/ và assets/js/grammar/: nội dung và bộ luyện chung của phòng ngữ pháp; tiến độ cách ly với các lớp.
- assets/css/pages/ và assets/js/pages/: giao diện và mã của các trang ở gốc.
- grade/lop2/*.html: trang danh sách, 16 Unit Global Success và 19 chủ đề bổ trợ Lớp 2.
- grade/lop2/assets/: CSS, mã game và dữ liệu dùng trong bài Lớp 2; bộ Game 1–3 cũng phục vụ demo Lớp 4.
- grade/lop4/: trang danh mục, Unit 1–20, ảnh từ vựng, trò dùng từ trong câu và ôn tập Lớp 4.
- grade/lop6/: trang danh mục và 12 Unit Global Success Lớp 6; mỗi Unit có từ vựng, lật thẻ, chọn nghĩa và gõ từ. Mục Ngữ pháp có 1.872 câu hỏi, ba cấp độ và các set 10 câu.
- grade/lop7/: 12 Unit Global Success Lớp 7, 96 từ vựng, 19 ảnh AI theo ngữ cảnh và 432 bài luyện ngữ pháp ở ba cấp độ. Đã sửa/tạo lại 16 ảnh và chuẩn hóa đủ 19 ảnh 768 × 768, không có nhãn nghĩa Việt trong ảnh. Lớp 6–7 dùng khung ảnh/biểu tượng thống nhất; thẻ chỉ hiện ảnh ở mặt nghĩa. Xem `docs/reports/grade6-7-images-2026-10-19.md`.
- grade/lop8/ và grade/lop9/: mỗi lớp 12 Unit, 96 từ/cụm từ, 252 mục luyện từ 72 ngữ cảnh và 36 câu viết lại. Lật thẻ, chọn từ, gõ từ và ôn học kỳ; 18 ảnh dùng ở 20 vị trí, không có chữ/nghĩa Việt trong ảnh. Dựng lại bằng `node scripts/build-secondary-grades.cjs`; kiểm tra bằng `node --test tests/secondary-grades/content.test.cjs` và `node tests/secondary-grades/browser.cjs` (máy chủ cổng 8001). Xem [thiết kế](docs/plans/grade8-9.md).
- shared/: thành phần dùng trên nhiều khu vực.
- templates/: mẫu trang để sao chép vào vị trí bài học trước khi sử dụng.
- scripts/: lệnh kiểm tra chất lượng repo.
- grade/lop2/tests/: kiểm tra dữ liệu và quy tắc game.
- docs/: kiến trúc, kế hoạch, kiểm tra nội dung và biên bản nghiệm thu. Xem [mục lục tài liệu](docs/README.md).
- Hình ảnh từ vựng: [quy chuẩn ảnh chân thật](docs/CHUAN_HINH_ANH_TU_VUNG.md) và [artifact Thầy Danh duyệt hình](artifacts/thay-danh-duyet-hinh/README.md).

## Kiểm tra trước khi đưa lên GitHub

Chạy từ gốc repo:

    node --test grade/lop2/tests/*.test.cjs grade/lop4/tests/*.test.cjs grade/lop7/tests/*.test.cjs tests/grammar-room/*.test.cjs tests/learner-profiles/*.test.cjs tests/primary-grades/*.test.cjs
    find assets/data assets/js grade/lop1 grade/lop2/assets/js grade/lop3 grade/lop4/assets/js grade/lop5 grade/lop6/assets/js grade/lop7/assets/js shared -type f -name '*.js' -print0 | xargs -0 -n1 node --check
    node scripts/check-local-links.cjs
    node scripts/check-contact-footer.cjs

GitHub Actions chạy lại các lệnh này khi push hoặc mở pull request. Các bài kiểm tra tự động chưa thay được việc nghe giọng đọc và thao tác trực tiếp trên điện thoại.

Phòng ngữ pháp: `node scripts/build-grammar-pages.cjs` tái tạo các trang công khai từ mẫu chung. Kiểm tra trình duyệt bằng `node tests/grammar-room/browser-smoke.cjs` khi có Playwright; có thể đặt `PLAYWRIGHT_MODULE`, `BROWSER_CHANNEL` và `LESSON_BASE_URL` theo môi trường. Chi tiết nội dung, cách chấm và lưu tiến độ tại [tài liệu phòng ngữ pháp](docs/GRAMMAR_ROOM.md).

## Trạng thái phát triển

Lớp 12 cập nhật ngày 23/10/2026: 10 Unit, 80 từ/cụm từ có tranh bút chì màu và 350 mục ngữ pháp (thêm 60 tình huống độc lập). Gõ từ lưu lượt dở theo hồ sơ, phân biệt đúng ngay/tự sửa/có gợi ý/đã xem và có ôn từ còn khó. Giữ URL, ID và lượt chọn từ/ngữ pháp cũ. [Phạm vi và nghiệm thu](docs/reports/grade12-improvement-2026-10-23.md) · [80 tranh và giao diện](docs/reports/grade12-images-2026-10-23.md).

Lớp 2 có 16 Unit luyện từ vựng theo Tiếng Anh 2 – Global Success và 19 chủ đề bổ trợ. Mỗi Unit có từ vựng, câu luyện và tranh do website biên soạn; nội dung chưa đối chiếu từng Lesson với trang sách. Lớp 4 có đủ Unit 1–20 theo chủ đề Tiếng Anh 4 – Global Success, kèm phần ôn từ theo ngày. Unit 3–4 dùng ảnh minh họa phong cách ảnh chụp được tạo bằng AI; Unit 5–20 dùng biểu tượng minh họa. Lớp 6 có 12 Unit theo chủ đề Tiếng Anh 6 – Global Success, với 96 từ và các bài luyện do website biên soạn; phần Ngữ pháp có bài luyện theo Unit và học kỳ, năm dạng câu hỏi và streak. Lớp 7 có 12 Unit, 96 từ, 19 ảnh minh họa theo ngữ cảnh và 432 mục luyện ngữ pháp. Lớp 1 và 5 đã mở với bốn game theo chủ đề tự biên soạn; lớp 3 có 20 chặng, 93 mục từ và 60 câu. Lớp 8 và 9 đã có 12 Unit mỗi lớp, 96 từ/cụm từ và 252 mục luyện ngữ pháp mỗi lớp; các dạng có thể luyện cùng ngữ cảnh. Lớp 10–12 đã có bài học; xem báo cáo lớp 12 ở trên để biết phạm vi mới nhất. Xem [lộ trình](docs/ROADMAP.md).
