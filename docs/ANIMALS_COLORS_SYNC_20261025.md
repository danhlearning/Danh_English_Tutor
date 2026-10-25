# Đồng bộ Animals và Colors lớp 2

## Thiết kế

- Mục tiêu: nhớ tên con vật/màu sắc, nhận nghĩa, ghép và viết đúng từ; vận dụng câu đếm hoặc câu mô tả màu.
- Cách chơi: cùng ba tab Từ vựng / Mẫu câu / Trò chơi và bốn lựa chọn Ghép chữ / Trắc nghiệm / Chính tả / Viết câu như các topic khác. Ghép chữ nằm trong game, bảng chọn từ và phản hồi dùng thành phần chung.
- Chấm: dùng learning-core và letter-ladder hiện có, giữ phân biệt đúng ngay, tự sửa, gợi ý, xem đáp án; giữ cửa ôn trước viết toàn từ. Game câu giữ bộ đáp án hiện tại.
- Hỗ trợ: chọn bộ từ, nghe lại bằng DanhAnswerSpeech, gợi ý/thử lại và tổng kết của bộ dựng chung; tải trước hiện tại + hai câu tiếp theo.
- Hoàn thành: theo độ dài bộ từ/lượt hiện có; tiếp tục lượt dở và kỷ lục. Không tăng điểm chỉ vì chuyển giao diện.
- Bảo toàn: không thay tệp hình hay ngân hàng từ. Chuyển ID số của trạng thái Animals sang ID ổn định, giữ bản gốc để phục hồi; chuyển lượt ghép chữ từ vị trí riêng sang game chung khi có. Colors giữ nguyên khóa tiến độ.

## Nghiệm thu

- Trình duyệt Edge: Animals và Colors có cùng bốn nút game; ghép chữ ở trong Game 1, không còn ô ghép chữ riêng phía trên danh sách.
- Kiểm tra thẻ đầu/cuối hai topic: chạm tên, hình, nghĩa, khoảng trống và Enter/Space đều gọi nghe đúng một lần. Mở trang không tự đọc.
- Trắc nghiệm: sai rồi tự sửa đúng; Game 4 vẫn mở và nhập được câu. Cửa ôn trước viết toàn từ được kiểm tra qua bài kiểm tra thích nghi dùng chung.
- Giả lập dữ liệu Animals cũ: giữ lựa chọn Dog/Fox, kỷ lục, lượt trắc nghiệm có lỗi đang làm, vị trí thẻ và lượt ghép chữ. Bản dữ liệu ID số gốc nằm ở `danh.learning.animals.v1.before-shared`. Kiểm tra ngữ cảnh topic được mở từ lớp 12.
- Bố cục ở 320, 390, 1280 px không tràn ngang; đã xem ảnh chụp game của cả hai topic. Nút Kiểm tra có nền và màu chữ phân biệt.
- Các kiểm tra đã chạy thành công: `tests/primary-grades/animals-colors.browser.cjs`, `tests/site-letter-games/adaptive.browser.cjs` và 6 kiểm tra trong `tests/site-letter-games/core.test.cjs`.
- Không ghi nhận lỗi JavaScript trong lượt kiểm tra. Không thay ảnh, không tuyên bố đã nghe thủ công mọi tệp âm thanh hoặc chơi hết mọi lượt ngẫu nhiên. Hồ sơ bố cục và kết quả ở `artifacts/animal-color-sync/`.
