# Đồng bộ ngữ pháp và từ vựng lớp 6/7

## Kết quả

- Cả hai trang ngữ pháp dùng `shared/grammar-game.js`, dữ liệu và khóa tiến độ vẫn riêng theo lớp. Hai tệp `grammar.js` cũ trở thành cấu hình khởi tạo, bảo toàn đường dẫn.
- Tách bộ âm/chuyển động của từ vựng thành `shared/learning-effects.js` để dùng chung với ngữ pháp. Mọi sự kiện học có cùng nhóm âm: chọn, bắt đầu, chuyển, đúng, tự sửa, sai, trợ giúp, chuỗi 3/5/10 và hoàn thành. Bấm nền/chữ không có hiệu ứng. Không phát thưởng khi khôi phục câu đã làm.
- Tùy chọn chung giữ khóa `danh-vocabulary-effects-v1`; chuyển đổi một lần, ưu tiên giữ lựa chọn tắt của ngữ pháp lớp 6 hoặc từ vựng cũ. Tắt âm dừng nốt đang phát; ẩn/rời trang dừng âm. Giữ giảm chuyển động của thiết bị.
- Hai trang ngữ pháp có cùng phong cách Nunito, pastel, nút/thẻ bo tròn và phản hồi chữ/màu; âm và animation được gọi trực tiếp từ chấm đáp án, không phụ thuộc vào sự kiện chuột toàn trang.
- Cả hai lớp có lựa chọn dạng bài riêng, bốn đáp án, viết lại với câu nguồn/phần mở đầu/ô nhập; gợi ý viết lại sau 120 giây học tích cực, không tính thời gian tab ẩn. Lượt dở giữ nháp, lỗi, mảnh câu và thứ tự lựa chọn.
- Lớp 7 bổ sung 24 câu phát âm theo chủ điểm 12 Unit, 120 câu giới từ theo bốn đoạn văn riêng (mỗi Unit có một câu chuyện với năm phần, mười chỗ trống). Ngân hàng lớp 7 có 576 mục, gồm 432 mục cũ. Giữ ID cũ và chuyển câu viết lại về phần mở đầu phù hợp, loại chỉ dẫn phụ khỏi dòng mở đầu.
- Nút bắt đầu/tiếp tục chỉ được bật khi bộ bài và sự kiện thao tác đã tải xong.

## Nghiệm thu

- Kiểm tra nội dung lớp 7: đủ Unit/cấp độ, ID độc lập, bốn lựa chọn duy nhất và đúng một đáp án, mở đầu viết lại khớp câu mẫu, dấu gạch chân và các phần/chỗ trống đoạn văn.
- Kiểm tra trình duyệt ngữ pháp chạy cho cả lớp 6 và 7: viết lại 120 giây học tích cực, sai/thử lại, nháp/lượt đã chấm khi tải lại không cộng điểm lặp, đoạn văn liên tục, mốc chuỗi 3/5/10, phát âm gạch chân, tùy chọn, xếp câu được khôi phục, lưu bị chặn và bố cục 320/390/760/1280 px.
- Kiểm tra phản hồi chung hai lớp: âm khi chọn bài hoặc chấm, dùng bàn phím, đúng/sai/tự sửa/xem/kết thúc, chuỗi và tải lại, đổi tùy chọn từ ngữ pháp sang từ vựng và ngược lại, dừng âm khi ẩn tab.
- Hai bộ kiểm tra từ vựng và phản hồi/lật thẻ vẫn đạt sau khi tách bộ hiệu ứng. Kiểm tra hồ sơ trình duyệt và 8 kiểm tra lõi hồ sơ đạt; liên kết/ID hợp lệ trên 107 trang.
- Đã xem ảnh điện thoại mô phỏng của viết lại và đoạn văn lớp 7. Chưa nghiệm thu trên điện thoại vật lý hoặc đánh giá chất âm bằng tai.
