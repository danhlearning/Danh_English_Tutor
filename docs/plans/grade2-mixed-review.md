# Ôn tập tổng hợp lớp 2

## Điều chỉnh ngày 22/10/2026

Giữ mục tiêu ôn nghĩa, nghe, chính tả và dùng câu ở chín dạng hiện có. Trang bắt đầu chỉ giữ hai nút chính “Chọn Unit” và “Chơi”, bộ chọn dạng và tiếp tục lượt dở; bỏ khối giới thiệu/chỉ số/danh sách Unit, hướng dẫn nhận sao và thiết lập hiệu ứng. Âm/chuyển động tự bật trong trang này qua chế độ automatic, vẫn tôn trọng giảm chuyển động của thiết bị; không sửa tùy chọn của bài khác và không tự phát khi mở trang.

Chấm/thưởng tự động theo kết quả hiện có: trắc nghiệm khi chọn, xếp câu khi đủ mảnh, gõ đúng sau khi ngừng gõ ngắn; gõ chưa đúng chỉ chấm khi rời ô hoặc nhấn Enter để không phạt lúc đang gõ dở. Không có nút kiểm tra hoặc thao tác nhận thưởng. Sai vẫn thử lại, đúng vẫn đọc từ/câu, điểm phân biệt đúng ngay/tự sửa/gợi ý/xem/bỏ qua. Mỗi lượt giữ độ dài và điều kiện hoàn thành hiện tại, người học tự chọn câu tiếp theo.

Nút “Xem đáp án” chỉ xuất hiện khi câu chưa hoàn thành sau 30 giây học thực tế. Không tính lúc ẩn tab hoặc ở màn chọn bài; giữ thời gian đã học qua tải lại/tiếp tục trong trường revealWaitMs của đáp án, cùng khóa hồ sơ hiện tại. Sang câu mới tính lại; trả lời sai hoặc dùng gợi ý không đặt lại thời gian. Lượt cũ không có trường này bắt đầu từ 0; không tự chấm nháp hay tự phát âm khi khôi phục.

Đã kiểm tra: 11 kiểm tra mô hình; trình duyệt đủ chín dạng với media playing/ended thật khi vô hiệu Web Speech ở cả đúng ngay và tự sửa; tự chấm gõ/xếp câu, tổng điểm và không cộng lặp; bộ kiểm tra thời gian riêng (29/30 giây, rời màn chơi, ẩn tab, tải lại, tiếp tục, gợi ý, câu mới); bốn chiều rộng 320/390/760/1280 px và chữ 200%; glyph Nunito nội bộ khi chặn mạng ngoài; giảm chuyển động; lượt v1 cũ; hồ sơ, nhiều tab và bộ nhớ bị chặn. Đã xem ảnh bố cục điện thoại/máy tính. Chưa kiểm tra điện thoại vật lý.

Lệnh kiểm tra thời gian: `node grade/lop2/tests/mixed-review-timing.browser.cjs`. Bộ kiểm tra trình duyệt chín dạng: `node grade/lop2/tests/mixed-review.browser.cjs`.

## Mục tiêu và phạm vi

Ôn nghĩa, nhận biết từ qua nghe, nhớ chính tả và tạo câu từ nội dung đã có của 16 Unit chính. Chọn nhiều Unit bằng hộp chọn tương tự bộ chọn từ trong bài: tìm kiếm, chọn tất cả/bỏ chọn, chọn học kỳ và Áp dụng/Hủy. Không thay nội dung hoặc tiến độ của Unit.

## Vòng học và chấm

- Chọn Unit → bắt đầu/tiếp tục → lượt trộn chọn nghĩa, nghe chọn từ, gõ từ, xếp câu → tổng kết → ôn câu cần luyện hoặc lượt mới.
- Mỗi lượt lấy tối đa 10 từ nếu chọn không quá 10 Unit; khi chọn nhiều hơn, có ít nhất một từ mỗi Unit (tối đa 16 câu). Nếu ngân hàng ít hơn thì dùng đúng số có sẵn. Không lặp một từ cùng Unit trong lượt.
- Trắc nghiệm dùng tối đa 4 lựa chọn từ bộ Unit đã chọn; loại phương án cùng tên/nghĩa với đáp án. Nghe chỉ phát khi bấm nút nghe. Gõ từ chấm đúng từ, không phân biệt hoa/thường; xếp câu chấm các câu mẫu của bài, bỏ dấu kết câu và khác biệt khoảng trắng.
- Sai cho thử lại, không tự hiện đáp án. Gợi ý chữ đầu/cấu trúc, xem đáp án và bỏ qua là thao tác riêng. Rỗng không tính sai; thao tác lặp không tăng điểm.
- Tách đúng ngay (10 sao), tự sửa (5), đúng có gợi ý (3), đã xem (0), bỏ qua (0). Tổng kết có câu cần luyện, không gắn nhãn thành thạo. Ôn câu cần luyện bắt đầu lượt mới.
- Không tự chuyển câu hoặc phát âm khi mở/tải lại. Nút Tiếp theo chủ động, tổng kết sau câu cuối.

## Lưu và kiểm tra

Khóa `danh-g2-mixed-review-v1` qua `DanhLearners.storage`, giữ lựa chọn, thứ tự câu/đáp án, nháp gõ/mảnh câu, lần sai, trợ giúp, kết quả và lịch sử tối đa 20 lượt. Tiến độ Unit giữ nguyên. Thay bộ chọn không xóa lượt dở; bắt đầu lượt mới có xác nhận nếu lượt cũ chưa xong. Dữ liệu hỏng được bỏ an toàn, lưu bị chặn vẫn học trong phiên và báo trạng thái. Dùng âm/chuyển động chung có nút nhớ lựa chọn và giảm chuyển động của máy.

Kiểm tra mô hình chấm, lọc Unit, tiếp tục, dữ liệu sai; trình duyệt ở 320/390/760/1280, hộp chọn/bàn phím, đúng/sai/sửa/gợi ý/xem/bỏ qua, tổng kết/ôn, nhấn lặp, tải lại/đổi người học/nhiều tab, lưu bị chặn, âm và giảm chuyển động. Dùng văn bản và ký hiệu ở phần mới, không bổ sung ảnh từ vựng.
