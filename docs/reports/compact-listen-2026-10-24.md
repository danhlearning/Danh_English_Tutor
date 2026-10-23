# Thẻ Unit và nút loa — 24/10/2026

- Bỏ nhãn Vào học trên thẻ Unit; giữ liên kết của cả thẻ. Bỏ nút nhảy tới danh sách Unit ở bìa lớp 6–12.
- Nút nghe chỉ hiện biểu tượng, giữ aria-label và vùng bấm ít nhất 44 px. Bộ chung xử lý cả nút tạo động và các trang cũ, không đổi tên hoạt động nghe trong thanh chọn game.
- Bấm loa là yêu cầu nghe chủ động, độc lập với lựa chọn tắt âm phản hồi đã lưu. Ưu tiên tệp âm thanh nội bộ và chế độ media playback khi trình duyệt hỗ trợ; giữ lựa chọn đã lưu cho phản hồi tự động. Có dự phòng giọng trình duyệt nếu nội dung chưa có tệp.
- Đổi phiên bản script trang và bộ dựng. Không đổi ngân hàng nội dung, ID hay khóa tiến độ.

## Kiểm tra

- `tests/ui-ux/compact-listen.browser.cjs`: phát media thực tế đến playing/ended ở 14 trang đại diện lớp 1–12 (gồm topic cũ), Web Speech tắt và tùy chọn âm thanh đã tắt; giữ nguyên tùy chọn, không tự đọc khi mở trang. Kiểm tra 12 danh mục không còn Vào học và không lỗi JavaScript.
- Kiểm tra liên kết/ID và font tĩnh trên 322 trang đạt. Kiểm tra glyph tiếng Việt với mạng ngoài bị chặn đạt.
- Chưa kiểm tra công tắc im lặng trên iPhone/Android vật lý. Website không thể nâng âm lượng media của hệ điều hành từ 0 hoặc bảo đảm phát qua thiết bị đầu ra đã bị tắt.
