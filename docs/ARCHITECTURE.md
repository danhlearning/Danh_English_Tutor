# Cấu trúc website

Website dùng HTML, CSS và JavaScript tĩnh; không cần bước build. Giữ nguyên các file HTML công khai ở gốc và grade/lop2/ để các liên kết đã lưu vẫn hoạt động. File condition-pratice.html là đường chuyển tiếp cho tên cũ.

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
