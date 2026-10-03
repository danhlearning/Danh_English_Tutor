# Cấu trúc website

Website dùng HTML, CSS và JavaScript tĩnh; không cần bước build. Giữ nguyên các file HTML công khai ở gốc và grade/lop2/ để các liên kết đã lưu vẫn hoạt động. File condition-pratice.html là đường chuyển tiếp cho tên cũ.

## Định hướng phát triển

Toàn website phát triển theo tư duy **game học tiếng Anh**, với mục tiêu học và cơ chế chơi được thiết kế cùng nhau. Mỗi phần mới hoặc lần nâng cấp UX/UI tuân theo [nguyên tắc thiết kế game học tiếng Anh](NGUYEN_TAC_GAME_HOC_TIENG_ANH.md) và chỉ dẫn trong `AGENTS.md` ở gốc dự án. Dùng Nunito, phong cách dễ thương, phản hồi bằng âm thanh/chuyển động, hỗ trợ tự sửa, lưu tiến độ và ôn tập phù hợp từng kỹ năng.

Ưu tiên dùng lại thành phần ổn định về hiển thị và trải nghiệm; giữ ngân hàng nội dung, cách chấm và tiến độ theo đúng phạm vi từng game/lớp. Phòng ngữ pháp hiện tại là mẫu tham khảo: `assets/css/pages/grammar-playful.css`, `assets/js/grammar/experience.js` và [tài liệu phòng ngữ pháp](GRAMMAR_ROOM.md).

## Thư mục

- assets/css/pages/ và assets/js/pages/: giao diện và mã của các trang ở gốc.
- grade/lop2/assets/css/topics/ và assets/js/topics/: giao diện và mã riêng của các bài cũ.
- grade/lop2/assets/data/: dữ liệu tách riêng của Body Parts và sáu chủ đề mới.
- grade/lop2/assets/js/: bộ chọn từ, điều hướng, Game 4, theo dõi tiến độ dùng chung.
- grade/lop4/: 20 Unit Lớp 4, dữ liệu, giao diện và tiến độ ôn tập riêng.
- shared/: footer dùng trên nhiều trang.
- templates/: mẫu để sao chép vào vị trí bài học.
- scripts/ và grade/lop2/tests/: kiểm tra liên kết, footer, dữ liệu và hành vi game.

## Hai dạng trang Lớp 2

Sáu chủ đề mới (Adjectives, Shapes, Toys, Weather, Rooms, Transport) dùng cùng một mẫu HTML, dữ liệu trong extended-topics-data.js và Game 4 trong extended-topic.js. Body Parts có dữ liệu riêng và Game 4 riêng. Mười một chủ đề cũ khác vẫn chứa dữ liệu cùng logic hiển thị trong file JavaScript theo chủ đề; kết quả Game 4 của chúng đi qua legacy-game4.js và legacy-game4-config.js. Colors có Game 1–4; Game 4 dùng legacy-game4.js, lọc câu theo bộ từ đã chọn.

Khi thêm chủ đề mới, dùng mẫu dữ liệu của sáu chủ đề mới, không sao chép một trang cũ dài. Mẫu HTML trong templates/ dùng đường dẫn tính từ grade/lop2/ sau khi sao chép.

## Tiến độ học

grade2-progress.js lưu kết quả của một lượt Game 4 trong localStorage của trình duyệt. Dữ liệu nằm trên thiết bị hiện tại, không đồng bộ giữa các thiết bị. Trang lop2.html hiển thị chủ đề đã hoàn thành ít nhất một lượt.

## Kiểm tra

Chạy các lệnh trong README.md sau mỗi lần đổi đường dẫn hoặc game. Kiểm tra hình, tiếng đọc và thao tác trên trình duyệt thật sau thay đổi giao diện.

## Demo Lớp 4

Các trang `grade/lop4/unit1.html` đến `unit20.html` dùng chung bộ lật thẻ, nghe chọn tranh và chính tả trong `grade/lop2/assets/js/learning-core.js`; tùy chọn lớp 4 bật thẻ tự nhớ từ và nút hiện đáp án sau 10 giây. `grade/lop4/assets/js/lesson.js` xử lý câu luyện; `progress.js` lưu mức luyện từng từ và lịch ôn trên thiết bị. `lop4.html` gom từ cần ôn của cả 20 Unit.

## Lớp 6 và Ngữ pháp

`grade/lop6/lop6.html` là danh mục; `unit1.html` đến `unit12.html` dùng dữ liệu từ `assets/js/units-data.js` và bộ hiển thị `lesson.js`. Trang `grammar.html` dùng `grammar-data.js`, `grammar-extra-data.js` và `grammar-expanded-data.js`, `grammar-rewrite-data.js` (1.872 câu hỏi gốc, viết lại câu và biến thể theo tình huống, gắn Unit/cấp độ/dạng bài) và `grammar.js` (chọn set 10 câu, chấm điểm, streak, hiệu ứng và lưu tiến độ). Giao diện Ngữ pháp nằm trong `assets/css/grammar.css`. Kết quả được lưu bằng localStorage trên thiết bị.


## Hồ sơ người học

Các trang tải hai script `shared/learner-profile-core.js` và `shared/learner-profile.js` trước mã học. Dùng `window.DanhLearners.storage` cho tiến độ và tùy chọn, với phạm vi cố định theo ID trong từng tài liệu. Chọn hồ sơ mới tải lại trang; không thay thế API bộ nhớ của trình duyệt. [Quy tắc hồ sơ, chuyển đổi và nhiều tab](LEARNER_PROFILES.md).
