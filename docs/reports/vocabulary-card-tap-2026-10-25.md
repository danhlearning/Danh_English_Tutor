# Nghiệm thu chạm cả thẻ từ · 25/10/2026

## Hành vi

Toàn bộ vùng thẻ từ trong lưới (ảnh, tên, nghĩa, ví dụ và khoảng trống) phát âm từ tiếng Anh qua `DanhAnswerSpeech.listen`. Phản hồi gồm viền sáng ngắn và nhún nhẹ; giảm chuyển động dùng viền tĩnh. Nghe không cộng điểm hoặc chuyển câu. Thẻ chọn đáp án, thẻ lật và các liên kết/nút thao tác giữ chức năng học riêng.

Ảnh, khung và bố cục được giữ nguyên; chỉ thêm thao tác và phản hồi tạm thời. Phiên bản URL script mới là `whole-card-tap-20261025`.

## Kiểm tra đã đạt

- Rà 1.907 thẻ trên 265 trang (lớp 1–12, 19 topic chung, các Unit cũ): lần lượt kích hoạt cả thẻ, tên và ảnh; mỗi thao tác gọi đúng từ một lần, không thiếu tệp âm hoặc lồng vùng nghe. Kiểm tra tên từ được cập nhật khi dùng lại thẻ.
- Media thực tế với Web Speech vô hiệu hóa: chạm chữ trên thẻ ở cả 12 lớp; kiểm tra thêm nghĩa, ví dụ, ảnh, khoảng trống và Enter/Space tại lớp 7. Mỗi lần có đúng một sự kiện `playing` và `ended` với từ tương ứng.
- Viền hiện khi chạm, không nhún ở chế độ giảm chuyển động; bật chuyển động có nhún, nhấn nhanh chỉ còn tối đa một animation và dọn hết sau khi kết thúc.
- Thư viện Luyện từ vựng: chạm tên để nghe; liên kết nguồn vẫn chuyển trang và không phát âm.
- Nghe thực tế ở thẻ đầu/cuối 19 topic phụ bằng cách chạm khoảng trống trên thẻ, xác nhận phản hồi và âm nội bộ.
- 136 kiểm tra dữ liệu, trạng thái và tài nguyên đạt. Liên kết 323 trang, footer 316 trang, font tĩnh 323 trang đạt; glyph tiếng Việt thực tế trên 32 trang khi chặn mạng ngoài đạt.
- Đã xem trực tiếp ảnh chụp viền phản hồi trên thẻ lớp 7.

Kiểm tra bằng Edge tự động và màn hình điện thoại mô phỏng, chưa trên điện thoại vật lý. Bản này ở website cục bộ, chưa đẩy GitHub.
