# Đảo ôn tập lớp 2

## Nội dung và cách chơi

Giữ 48 từ và 48 câu gốc của 16 Unit; bổ sung 96 câu ngữ cảnh và 32 hội thoại tự biên soạn. Ngân hàng có 144 câu ngữ cảnh, 32 hội thoại và 48 từ, triển khai thành 800 nhiệm vụ ở chín dạng. Con số 800 bao gồm các dạng luyện khác nhau từ cùng nội dung nền, không phải 800 tình huống độc lập.

| Dạng | Nhiệm vụ |
| --- | ---: |
| Chọn nghĩa | 48 |
| Nghe chọn từ | 48 |
| Gõ từ | 48 |
| Xếp câu | 144 |
| Điền từ vào câu | 144 |
| Tìm chữ thiếu | 48 |
| Chọn lời đáp | 32 |
| Nghe chọn câu | 144 |
| Viết câu | 144 |

- Cho chọn cả Unit lẫn dạng; lượt thường khoảng 10 câu, tối đa 16 khi chọn đủ 16 Unit. Lọc ít nội dung thì hiện đúng độ dài thực tế. Không lặp cùng tình huống ở nhiều dạng trong một lượt; lượt mới ưu tiên nội dung chưa xuất hiện gần đây.
- Giao diện giấy kem, bản đồ các chặng, bạn cáo động viên, hiệu ứng thao tác và cột mốc kết quả. Đường đi phân biệt đúng ngay, tự sửa, có gợi ý, đã xem, bỏ qua bằng biểu tượng riêng.
- Giữ cách chấm 10/5/3/0 sao; không thưởng lượt mở bài thành thành thạo. Không đếm ngược hoặc trừ lượt sống. Có tổng kết, chơi lại câu còn khó và chọn chuyến đi tiếp.
- Đã ghi yêu cầu ưu tiên cảm giác chơi và cơ hội học thực chất vào `AGENTS.md` để dùng cho thay đổi sau.

## Bảo toàn và âm thanh

- Giữ URL `grade/lop2/review.html`, khóa hồ sơ `danh-g2-mixed-review-v1` và phiên bản dữ liệu 1. Bộ đọc chấp nhận nguyên nhiệm vụ cũ không có ID ngân hàng; thứ tự câu/đáp án, kết quả, nháp và mảnh câu đang xếp được giữ nguyên.
- Nhiệm vụ mới dùng ID ngân hàng cố định. Lựa chọn Unit/dạng dành cho lượt mới, không sửa lượt đang dở. Ôn lại giữ Unit và câu của lượt vừa kết thúc. Không ghi vào tiến độ Unit.
- Mỗi câu đúng đọc từ hoặc câu tiếng Anh tương ứng, kể cả tự sửa. Tìm chữ thiếu đọc trọn từ; điền câu, nghe câu, viết câu và hội thoại đọc trọn đáp án, không đọc mã lựa chọn hoặc chữ cái.
- Nghe mẫu và nghe lại dùng `DanhAnswerSpeech`, tôn trọng tắt âm và dừng khi chuyển màn hình/ẩn trang. Bổ sung kế hoạch và WAV nội bộ cho đáp án mới. Đổi phiên bản script/CSS tại trang ôn tập.

## Đã kiểm tra

- 11 kiểm tra nội dung/game đạt: toàn bộ 800 nhiệm vụ, phạm vi Unit, chín dạng mỗi Unit, lựa chọn không trùng nhãn, gap/chữ thiếu, các kết quả/điểm, khôi phục nháp/mảnh câu, lượt v1 thật, dữ liệu hỏng/bộ nhớ chặn và WAV thật cho từng đáp án.
- Edge mô phỏng, mạng ngoài chặn: thao tác cả chín dạng; đúng ngay và tự sửa đều thu sự kiện media thật `playing`/`ended` khi Web Speech bị vô hiệu hóa, 18 trường hợp. Kiểm tra nút nghe mẫu, nghe trọn câu và không đọc lại do submit lặp.
- Kiểm tra gợi ý, xem, bỏ qua, tổng kết 68 sao với đủ năm loại kết quả, ôn lại, hủy lượt mới, đổi bộ giữ lượt cũ; bản nháp và mảnh câu qua tải lại; khôi phục fixture v1 trên trình duyệt.
- Kiểm tra tắt âm, không tự đọc khi tải lại, giảm chuyển động, cách ly hồ sơ, hai tab cùng hồ sơ và học khi cả localStorage/sessionStorage bị chặn.
- Chiều rộng 320, 390, 760, 1280 px và phóng chữ 200% không tràn ngang. Kiểm tra focus/vòng Tab trong hộp chọn Unit. Đã mở xem ảnh chụp trang chọn, năm dạng mới, tổng kết và bản cuối trên điện thoại/máy tính.
- Font: kiểm tra tĩnh 238 trang đạt; kiểm tra glyph Nunito nội bộ thực tế trên câu hỏi khi mạng ngoài bị chặn đạt. Cú pháp và diff đạt.
- Chưa kiểm tra trên thiết bị vật lý.

Kết quả và ảnh tại `artifacts/grade2-mixed-review-expanded/`: `results.json`, `audio-proof.json`, `final-visual-results.json`, `final-setup-390.png`, `final-setup-1280.png`, `final-gap-390.png`, `final-letters-390.png`.
