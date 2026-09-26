> **Lưu trữ lịch sử:** Tài liệu này ghi kế hoạch Body Parts trước lần hợp nhất. Để xem trạng thái hiện tại, đọc `../../README.md`, `../../KE_HOACH_MO_RONG_LOP2_GPT6_SOL.md` và `NGHIEM_THU_MO_RONG_TOPIC.md`.

# Kế hoạch Lớp 2 — bản mẫu Body Parts

## Phạm vi đã được cho phép
- Chỉ tạo/sửa file trong grade/lop2. Trang chủ chỉ đọc để tham khảo.
- Làm chuẩn Body Parts trước, người dùng duyệt bản mẫu rồi mới nhân rộng game.
- Tất cả 14 trang HTML hiện có trong lop2 phải dùng chung footer liên hệ giống trang chủ. Mã footer nằm trong lop2; không tạo components.js ở gốc repo.

## Quy tắc bản mẫu
- Sáu mục: từ vựng, mẫu câu, flashcard, trắc nghiệm, chính tả, luyện câu.
- Chọn từ: Tất cả / Tự chọn; ô tick + hình + Anh + Việt; số X/Y; nút Áp dụng cho 4 game. Không có chọn theo phần trăm hoặc chọn ngẫu nhiên.
- Mặc định tất cả; ít nhất 4 từ; cả đáp án gây nhiễu thuộc bộ chọn; câu nhiều từ mục tiêu yêu cầu chọn đủ. Nhớ bộ từ từng chủ đề trên trình duyệt.
- Áp dụng bộ mới bắt đầu lượt mới. Chuyển tab giữ vị trí trong phiên.
- Flashcard 1 giây; game khác 1,5 giây sau khi đúng; phải chờ đọc xong. Flashcard bật/tắt tự chuyển. Sai hoặc hiện đáp án không tự chuyển.
- Hai chế độ flashcard; trắc nghiệm 4 lựa chọn; Enter cho chính tả/luyện câu; nút nghe và hiện đáp án.
- Game 2–4 có lượt hữu hạn, tổng kết, chơi lại. Phân biệt đúng ngay / đúng sau thử lại / đã xem đáp án. Một câu chỉ được ghi nhận một lần.
- Hình khớp nghĩa và số lượng; một trọng tâm; không viết đáp án trong hình; dùng lại cùng hình cho mỗi từ.
- Chỉnh điện thoại, bàn phím, đường quay lại Lớp 2.

## Tiến độ
1. Xác nhận kế hoạch: đã nhận yêu cầu bắt đầu bước kế tiếp.
2. Chuẩn hóa dữ liệu cơ thể: đã tách 16 từ và 16 câu; gắn ID, dạng số ít/nhiều, từ mục tiêu và đáp án được chấp nhận. Đã kiểm tra tính toàn vẹn dữ liệu, khởi tạo 4 game và trang từ vựng trên trình duyệt.
3. Chức năng dùng chung + bộ chọn từ + footer: đã triển khai. Bộ tick áp dụng cho 4 game của Body Parts; footer chung có trên 14 trang HTML hiện có.
4. Hoàn thiện game và kiểm thử bản mẫu: chưa triển khai.
5. Người dùng trải nghiệm và duyệt mẫu.
6. Nhân rộng theo nhóm: Quần áo/Cảm xúc/Đồ vật → Đồ ăn/Gia đình/Động từ → Động vật/Dụng cụ/Số đếm/Trái cây/Ngày tháng → Màu sắc. Tính từ thiếu file, cần chốt nội dung riêng.

## Rà soát nội dung bước 2
- Giữ 16 mục từ và 16 câu. Head, Hair, Eyes, Ears, Nose, Mouth, Teeth, Neck, Shoulder, Arm, Hand, Finger, Leg, Knee, Foot, Tummy.
- Leg: sửa nghĩa Chân (đùi) thành Chân; hình đổi thành một chân, bàn chân làm nền nhạt.
- Eyes/Ears/Teeth: chỉ rõ số nhiều; bổ sung forms để liên kết tooth–teeth, foot–feet mà không coi biến thể là đáp án chính tả tự động.
- Knee: đổi I hurt my knee thành My knee hurts để khớp nghĩa hiện tại và mẫu câu đã học.
- Shoulder: câu có hand và shoulder, targetWordIds chứa cả hai. Liên kết hình bằng ID thay vì vị trí trong mảng.
- Mouth: chấp nhận Open your mouth please và Please open your mouth; sửa gợi ý cho đủ please.
- Bổ sung hướng dẫn mô tả, giác quan, mệnh lệnh và số ít/nhiều để bao phủ các bài luyện.
- Giữ hệ IPA thiên Anh-Anh đang có, chọn locale en-GB và chỉ ưu tiên giọng đúng locale. Chất lượng giọng còn phụ thuộc thiết bị; chưa xác nhận âm thanh thực tế.
- Chỉnh hình vai/cổ/chân/đầu gối/bụng để làm nổi bật đúng bộ phận. Các hình khác giữ nét vẽ hiện có; cần người dùng duyệt hình ở bản mẫu.

## Footer dùng chung đã triển khai
- Tiêu đề: Kết nối với thầy Danh.
- Zalo: 0911594794 — https://zalo.me/0911594794
- Facebook — https://www.facebook.com/cong.danh.0210
- Giữ giao diện, biểu tượng và dòng bản quyền giống trang chủ; đặt CSS/JS dùng chung trong lop2, tránh xung đột CSS từng chủ đề.

## Kiểm tra trước khi duyệt mẫu
- Chọn tất cả/4–5 từ: bốn game đúng bộ từ, câu nhiều từ không lọt bộ chọn.
- Không cộng điểm lặp khi click nhanh/Enter, điểm không vượt tổng.
- Hiện đáp án được phân loại; hết lượt có tổng kết, chơi lại được.
- Đổi tab không có âm thanh/timer chạy ngoài ý muốn; bộ chọn được lưu riêng từng topic.
- Kiểm tra 1s/1,5s và chờ đọc xong; điện thoại không tràn ngang; bàn phím thao tác được.
- Footer có mặt đúng một lần ở mọi trang Lớp 2, liên kết đúng; không còn tham chiếu components.js bị thiếu.
- Git diff không có file ngoài grade/lop2.

## Nguồn tham khảo phát âm
- https://dictionary.cambridge.org/pronunciation/english/nose
- https://dictionary.cambridge.org/pronunciation/english/shoulder
- https://dictionary.cambridge.org/pronunciation/english/finger
- https://assets.cambridge.org/97805211/36198/excerpt/9780521136198_excerpt.pdf

## Kiểm tra bước 2
- Đã kiểm tra 16 từ/16 câu, ID không trùng, mọi liên kết hình và từ đều tồn tại; từ nào cũng có bài luyện.
- Kiểm tra câu Shoulder yêu cầu cả hand và shoulder; đổi thứ tự từ không làm đổi liên kết hình.
- Khởi tạo bốn game với dữ liệu mới trong môi trường kiểm tra; trang thực tải đủ 16 thẻ.
- Chưa kiểm thử tiếng đọc thực tế trên thiết bị người dùng; các lỗi game đã nêu ở bản phân tích vẫn thuộc bước 4.

## Kiểm tra bước 3
- Chạy node --test grade/lop2/tests/selection.test.cjs: 9/9 kiểm thử đạt.
- Kiểm tra chọn 4 từ trên trình duyệt: flashcard 4 thẻ, trắc nghiệm chỉ gồm 4 từ đã chọn, chính tả và luyện câu đúng bộ chọn. Dưới 4 từ không áp dụng được.
- Tải lại trang giữ bộ từ đã áp dụng; bản chọn nháp không đổi bộ đang chơi.
- Bộ chọn và footer đã kiểm tra hiển thị ở desktop và 390px; footer trang danh sách cũng hiển thị đúng.
- lesson-core.js chứa lọc/lưu bộ từ, giao diện tick, xáo trộn và chuẩn hóa đáp án. bodyparts.js chứa xử lý riêng của bản mẫu. Footer dùng chung nằm ở `shared/contact-footer.js`; Shadow DOM tránh CSS chủ đề ghi đè.
- Phần Từ vựng vẫn hiển thị đủ 16 từ; chỉ game được lọc.
- Bước 4 còn lại: mốc 1s/1,5s chờ giọng đọc, bật/tắt tự chuyển, giữ trạng thái khi đổi tab, chống chấm lặp, tổng kết lượt và phân loại kết quả. Chưa coi bản mẫu đã hoàn thiện.
