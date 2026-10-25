# Nghiệm thu âm thanh qua hình · 25/10/2026

## Thay đổi

- Hình từ vựng đang có nhận thao tác bấm/Enter/Space để nghe qua `DanhAnswerSpeech.listen` trên toàn repo. Giữ nguyên tài nguyên ảnh, DOM bên trong hình, khung và kích thước. Không áp UI ảnh lớp 6 cho lớp khác.
- Thẻ lật tách thao tác nghe hình khỏi thao tác lật; không lồng nút trong nút. Ảnh không biến thành thao tác cộng điểm hoặc chuyển câu.
- Loa rời ở thẻ có hình nghe được không còn hiển thị/nhận focus; giữ chỗ cũ ở lưới để không dịch bố cục ảnh. Bài không có hình vẫn dùng nút nghe; hình đáp án vẫn dùng để chọn/chấm.
- Gõ từ có hình nghe mẫu, không tự đọc khi mở câu. Giữ đọc từ đúng, tự sửa đúng, tiến độ, URL và lượt dở.
- Cập nhật URL script/CSS trong trang, mẫu và bộ dựng để nạp phần âm thanh mới. Không sửa hoặc tạo ảnh, không thay ngân hàng từ hoặc đáp án.

## Đã kiểm tra

- Trình duyệt Edge tự động, chặn mạng ngoài: 170 Unit thuộc đủ 12 lớp dựng hình nghe được, không tự phát khi tải trang. Mỗi lớp có mẫu phát âm bằng tệp nội bộ khi Web Speech bị vô hiệu hóa, xác nhận `playing`/`ended`, đúng từ và đúng một lần.
- So sánh ảnh với bản xuất bản trước ở lớp 1, 5, 7–12: DOM ảnh gốc, vị trí, chiều rộng và chiều cao không đổi tại màn hình 390 px. Bộ kiểm tra so sánh cần bản đối chiếu tại `tmp/publish-main-20261024` trên máy này.
- Nghe hình trong thẻ lật không lật thẻ; kiểm tra bàn phím, lựa chọn tắt âm phản hồi đã lưu, hình gõ từ, topic chung, trang cũ và thư viện Luyện từ vựng. Hình đáp án bài nghe chọn tranh không nhận thao tác nghe riêng.
- Bài gõ từ lớp 1 và 5: đúng ngay và tự sửa đúng phát đúng một tệp âm nội bộ, không tự đọc khi chuyển vào bài. Lớp 6: 12 Unit, hai học kỳ, đúng/tự sửa, nghe lại, khôi phục và các chiều rộng đạt kiểm tra media thực tế.
- Bộ kiểm tra Luyện từ vựng đạt: đúng/sai, gợi ý/xem đáp án, âm nội bộ, nháp, tiếp tục thẻ, hồ sơ độc lập và dữ liệu cũ.
- 136 kiểm tra nội dung/trạng thái/tài nguyên đạt; kiểm tra liên kết 323 trang, footer 316 trang, font tĩnh 323 trang đạt. Glyph tiếng Việt thực tế trên 32 trang khi chặn mạng ngoài đạt.
- Đã xem trực tiếp ảnh chụp giao diện lớp 7 và phần thẻ của Luyện từ vựng; không thay chất liệu hoặc kiểu khung ảnh.

Bài kiểm tra lịch sử `correct-answers.browser.cjs` xác nhận phần lớp 6–12 nhưng dừng tại selector `data-tab=game-context` đã lỗi thời ở các trang lớp 1/3/5 hiện tại; không tính toàn bộ lượt đó là đạt. Các luồng gõ từ hiện tại được kiểm tra riêng bằng media thực tế như trên.

Chưa kiểm tra điện thoại vật lý hoặc nút gạt im lặng của iPhone. Bản này đang ở website cục bộ, chưa đẩy lên GitHub.
