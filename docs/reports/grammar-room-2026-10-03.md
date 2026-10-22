# Kiểm tra phòng ngữ pháp — 03/10/2026

## Bản bàn giao

Điểm vào: `grammar-index.html` trong Luyện theo kỹ năng. 25 bài, 75 lựa chọn bài/cấp độ; 1.530 mục luyện từ 510 tình huống. Các địa chỉ chuyên đề và chuyển tiếp câu điều kiện cũ vẫn truy cập được.

Đã triển khai lý thuyết ngắn, ba câu thử nhanh, năm dạng luyện, lượt 10 câu, tự sửa trước khi xem đáp án, tổng kết, lưu lượt dở, ôn lỗi sai, lịch ôn, tìm kiếm không dấu, chọn bài ôn tổng hợp và đánh giá đã vững có điều kiện. Giao diện đang làm bài ưu tiên câu hỏi ở phía trên, không giữ phần giới thiệu lớn.

## Kết quả kiểm tra

| Kiểm tra | Kết quả |
| --- | --- |
| Toàn bộ kiểm tra Node của lớp 2/4/7 và phòng ngữ pháp | 54/54 đạt |
| Cú pháp JavaScript, bao gồm ngân hàng mới | 58 tệp đạt |
| Liên kết nội bộ và ID | 105 trang đạt |
| Footer chung | 98 trang đạt |
| Trình duyệt Microsoft Edge, bài/cấp độ | Hoàn thành 75 lượt, 750 câu; mỗi lượt đạt đúng số câu và tỷ lệ 3/2/2/1/2 |
| Sai, thử lại, nhấn kiểm tra lặp, xem đáp án | Không lộ đáp án sau lần sai đầu; không tăng lần thử do cùng một câu trả lời lặp; xem đáp án được ghi riêng |
| Tải lại và tiếp tục | Giữ câu hiện tại, câu trả lời nháp và số lần thử |
| Lý thuyết và các URL cũ | Các điểm vào được mở; hai ví dụ, ba câu thử nhanh và chấm đúng hoạt động |
| Trình duyệt chặn lưu; dữ liệu hỏng; lượt không tương thích | Vẫn mở được phòng/bài luyện, có thông báo và phục hồi phù hợp |
| Bố cục | Năm dạng ở 320/375/390/430/1280 px và ngang 844×390 không tràn; câu hỏi tối thiểu 24 px |
| Chọn lượt, lịch ôn, điểm và đã vững | Kiểm tra đủ dạng, tình huống trùng, thiếu câu, câu đã xem, các mốc 1/3/7/14 ngày và điều kiện ôn trễ |

Sau khi hoàn thành 75 lượt, bộ kiểm tra trình duyệt bổ sung được chạy riêng để sửa cách tạo dữ liệu thử và xác nhận lại giao diện cuối, các dạng, lý thuyết và phục hồi bộ nhớ. Lần kiểm tra bổ sung đạt, không có lỗi JavaScript trên trang. Ảnh xem thử trong `artifacts/grammar-room/`.

## Phạm vi xác nhận

### Bổ sung giao diện theo yêu cầu

Đã chuyển phòng và các trang chuyên đề sang Nunito lưu cục bộ, màu pastel, ngôi sao đồng hành và nút bo tròn. Có âm thanh phản hồi cho các thao tác học, hiệu ứng chuyển câu/đúng/thử lại và giấy màu kết thúc lượt. Các lựa chọn âm thanh/chuyển động được lưu riêng, tôn trọng giảm chuyển động và không tự phát khi mở trang.

`experience-browser.cjs` đạt: tải được Nunito tiếng Việt, âm thanh chỉ khởi động sau thao tác, tắt dừng các nốt, nhớ thiết lập sau tải lại, phản hồi đúng/thử lại, hoàn thành một lượt, dọn giấy màu, giảm chuyển động theo thiết bị và sáu kích thước. Bộ kiểm tra trình duyệt chức năng bổ sung cũng đạt sau thay đổi UI. Ảnh mới trong `artifacts/grammar-playful/`.

Các số lượng trên phân biệt tình huống với mục theo cấp độ. 360 câu cũ được ghi trạng thái ngừng sử dụng trong chấm điểm; không tự coi mọi đáp án cũ là đã đúng. Nội dung mới được tự biên soạn và rà soát cấu trúc, từ gợi ý, đáp án, phép biến đổi và yêu cầu từ bắt buộc; kiểm tra tự động không thay thế đánh giá sư phạm độc lập.

Kiểm tra trên trình duyệt và khung điện thoại mô phỏng. Chưa thao tác bàn phím trên điện thoại vật lý; không ghi bước đó là đã đạt. Tiến độ hiện lưu trên trình duyệt đang dùng, chưa đồng bộ nhiều thiết bị.
