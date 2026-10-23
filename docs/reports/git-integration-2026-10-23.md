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

GitHub xác nhận PR #1 có thể gộp, không xung đột. Đợt CI đầu phát hiện bốn kiểm tra lỗi thời: hồ sơ Body Parts trước bản sửa nhân vật, tên bộ game cũ ở lớp 1/5 và giả định ảnh lớp 10 luôn nằm cùng thư mục. Đã cập nhật kiểm tra đúng bản hiện hành: 18 ảnh thay thế có hồ sơ và hash riêng, giữ đối chiếu bản trước; bộ game công khai phải là primary-grade2-lesson; ảnh dùng chung phải khớp hồ sơ đã duyệt và đường dẫn thực tế. Chạy lại đủ 112 kiểm tra đạt. Kiểm tra liên kết/ID 322 trang, footer 316 trang và font tĩnh đều đạt.

Chưa cập nhật main. Nhánh mới có cùng tổ tiên với main, cho phép xem diff và gộp theo luồng Git thông thường.
