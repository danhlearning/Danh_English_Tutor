# Kế hoạch và trạng thái Lớp 2

Cập nhật: 26/09/2026. Tài liệu này thay bản kế hoạch trước khi triển khai. Hướng dẫn mở thử và cấu trúc repo nằm trong `../../README.md`; kết quả kiểm tra chi tiết nằm trong `../reports/grade2-expansion-2026-09-26.md`.

## Đã làm

- Hợp nhất thành một repo Danh English Tutor. Phần Body Parts giữ 16 từ, 16 câu và hình đã chỉnh.
- Sửa các nhánh phản hồi sai được phát hiện để không tự đưa đáp án đúng sau khi học sinh nhập sai.
- Dùng điều hướng, giao diện và footer chung cho Lớp 2; Game 1–3 của 12 topic, gồm Body Parts, dùng bộ xử lý chung. Animals hiện còn bộ Game 1–3 riêng để giữ hiệu ứng đã thiết kế.
- Thêm sáu topic: Basic Adjectives, Shapes, Toys, Weather, Rooms in a House, Transport. Tổng cộng 59 từ và 59 câu luyện viết; danh sách Lớp 2 hiện có 19 topic.
- Sáu topic mới dùng cùng một trang mẫu, dữ liệu và Game 4 chung. Body Parts có Game 4 riêng đã được sửa lượt hữu hạn, xem đáp án chủ động và chống chấm lặp.
- Sửa các liên kết nội bộ hỏng ở trang chủ và trang ngữ pháp. Các lớp chưa có bài học hiển thị “Sắp có”.
- Thêm README, kiểm tra Node, liên kết và footer chạy trong GitHub Actions.

## Đã kiểm tra

- 26/26 bài kiểm tra Node đạt.
- 35 trang đang dùng không có liên kết nội bộ hỏng hoặc ID trùng.
- Footer hợp lệ trên 21 trang thuộc trang chủ và `grade/`.
- 59 hình SVG mới là XML hợp lệ và đã rà bảng ảnh đã kết xuất.
- Các đoạn JavaScript nhúng trong HTML đã qua kiểm tra cú pháp.

## Cần kiểm tra trên Chrome của người dùng

Công cụ duyệt tự động trong môi trường này chặn URL `file://`; không thể xác nhận trực quan toàn bộ trang hoặc nghe giọng thực. Mở `grade/lop2/lop2.html` bằng Chrome và kiểm tra:

1. Đi vào lần lượt sáu topic mới; kiểm tra bố cục máy tính và điện thoại.
2. Trong từng topic, chọn 1 rồi 4 từ: Game 1/3/4 dùng đúng bộ; Game 2 yêu cầu ít nhất 2 từ.
3. Game 4 nhập sai: không hiện/đọc đáp án. Chọn “Hiện đáp án”: chỉ hiện khi bấm, không cộng điểm và không tự chuyển. Kiểm tra hết lượt và chơi lại.
4. Body Parts: kiểm tra hình, giọng Anh-Anh và câu có nhiều từ mục tiêu.
5. Đổi tab khi đang nghe/chờ chuyển câu; không còn tiếng đọc hoặc chuyển câu từ tab cũ.

## Việc phát triển tiếp theo

- Rà và chuẩn hóa Game 4 của 12 topic cũ còn dùng mã riêng; xử lý các ngoại lệ về đáp án và nội dung từng trang.
- Đánh giá việc chuyển Animals sang bộ Game 1–3 chung sau khi chứng minh giữ đúng hình, hiệu ứng và tiến độ.
- Nghiệm thu âm thanh, kích thước điện thoại và thao tác bàn phím trên trình duyệt thật.
- Chốt nội dung theo sách giáo khoa cụ thể nếu người dùng cung cấp bộ sách. Danh sách từ/câu hiện được thiết kế theo website, chưa khẳng định bám một bộ sách chính thức.

`grade2-bodyparts-history.md` là lịch sử của giai đoạn làm Body Parts; có quy tắc và đường dẫn cũ, không dùng làm mô tả trạng thái hiện tại.
