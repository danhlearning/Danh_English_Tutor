# Tích hợp cập nhật website vào lịch sử GitHub

Nhánh `codex/integrate-main-20261023` bắt đầu từ `origin/main` tại `7af4f4f`. Áp dụng thay đổi của `92926a0` bằng cherry-pick ba chiều, không force push, không dùng chiến lược merge `ours` và không thay gốc lịch sử.

Đã xử lý 134 khối xung đột chỉ khác query phiên bản tài nguyên; kiểm tra tương đương nội dung sau khi bỏ query trước khi chọn phiên bản mới. Đã đối chiếu riêng 28 khối còn lại: kiểm tra Web Speech, giọng đọc Dates, tải tranh lớp 4 và bộ cài hồ sơ.

Một số tính năng đã tồn tại trong bản lưu ban đầu nên không nằm trong diff của commit: đã đưa rõ bộ tải trước trong learner-profile, ảnh bút chì của course lớp 4, script đồng bộ tương ứng và tài liệu quy tắc vào nhánh mới. Giữ bốn tệp kết quả kiểm tra cũ của GitHub khi chúng không thuộc phần sửa sản phẩm. Bổ sung baseline từ vựng cần cho bộ kiểm tra có thể chạy lại từ checkout sạch.

Đã kiểm tra trên chính checkout tích hợp, máy chủ riêng cổng 8002:

- 19 topic: đổi game, bấm thẻ liên tục, focus, tải lại/lượt dở; WAV playing/ended khi đúng ngay và tự sửa đúng; dừng/giảm chuyển động. Không lỗi JavaScript hoặc yêu cầu nội bộ thất bại.
- Giao diện Kỹ năng 320/390/760/1280 px và chữ 200%; bàn phím các lớp 6–12.
- Tải trước thật: cache HTML/CSS/JS/ảnh, không chạy sớm bài học/âm thanh, giới hạn tải và tôn trọng mạng chậm/Save-Data/offline.
- Dates: 19 từ, 50 gợi ý lịch, bốn game, lưu tiến độ và WAV thật.
- Dữ liệu 300 từ lớp 10–12; bảo toàn 240 từ cũ, kiểm tra hash tranh và WAV của 60 từ mới.
- Tranh bút chì lớp 4: nội dung, định danh và hash tài nguyên.
- Font tĩnh 322 trang; glyph tiếng Việt và các vùng hồ sơ/footer thực tế khi chặn mạng ngoài.

Chưa cập nhật main. Nhánh mới có cùng tổ tiên với main, cho phép xem diff và gộp theo luồng Git thông thường.
