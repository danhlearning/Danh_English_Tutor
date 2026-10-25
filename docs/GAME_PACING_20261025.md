# Nhịp game và chuẩn bị câu tiếp — 25/10/2026

- Mục tiêu học: giữ hoạt động nhận nghĩa, nghe, ghép chữ, chọn, gõ và viết câu của các game hiện có; giảm chờ tài nguyên để người học duy trì hứng thú.
- Cách chơi: giữ nút nghe lại và quyền tự chuyển câu; ở game đang tự chuyển, chờ giọng đáp án kết thúc rồi mới chuyển.
- Giọng game: TTS 0.95; tệp đọc 1.15×, giữ cao độ. Phần học thẻ và mẫu câu giữ nhịp đọc hiện có.
- Cách chấm: giữ nguyên đúng ngay, tự sửa, có gợi ý, xem mẫu/bỏ qua; tải trước không chấm, không tạo lượt và không thay thứ tự.
- Hỗ trợ khi sai: giữ gợi ý, thử lại, xem mẫu và thời gian hỗ trợ hiện có.
- Hoàn thành: theo điều kiện từng game; không thêm đếm ngược hoặc tự bỏ qua câu.
- Chuẩn bị: lấy câu hiện tại và tối đa hai câu kế tiếp từ thứ tự đã có, nạp trước giọng đọc và giải mã ảnh; không đọc thành tiếng hoặc dựng câu vào vùng trả lời.
- Tài nguyên: giới hạn hàng đợi, số tải đồng thời và bộ nhớ; chỉ cùng website; tôn trọng tiết kiệm dữ liệu, mất mạng, tab ẩn; thất bại tải trước không chặn chơi và có thể thử lại.
- Kiểm tra: nhịp game/học thẻ; cache dùng thật; không tự đọc khi mở/khôi phục; đúng/tự sửa, nhấn lặp, đổi tab, âm tắt; kiểm tra nguồn câu tiếp không thay trạng thái; ảnh và bố cục điện thoại.

## Kết quả nghiệm thu

- 132 kiểm tra tự động đạt, gồm 7 kiểm tra mới về tốc độ, tải im lặng, dùng lại cache, giới hạn bộ nhớ/tải đồng thời, lỗi tải, dừng đọc và tiếp tục tải khi trở lại tab.
- Edge trên máy tính, mô phỏng khổ điện thoại 390 px: game ghép chữ lớp 2 phát tệp WAV đã tải qua blob trong bộ nhớ, không phát sinh yêu cầu WAV mới khi chấm đúng. Đã kiểm tra tốc độ tệp 1.15× và giữ cao độ; thẻ từ giữ 0.85× như cũ.
- Đã thử mở/tiếp tục lượt, chuyển từ, chuyển tab, kiểm tra lượt không đổi khi tải trước; thử game mẫu của đủ lớp 1–12, ngữ pháp theo lớp và phòng ngữ pháp. Không ghi nhận lỗi JavaScript, thiếu tệp hay tràn ngang trong các bước được kiểm tra.
- Đã cố ý làm chậm một tệp trong bài kiểm tra để xác nhận game tự chuyển câu vẫn chờ giọng đọc kết thúc.
- Kiểm tra trình duyệt có sẵn về thư viện từ vựng đạt các luồng đúng, tự sửa, gợi ý, xem mẫu, nghe, gõ, điền câu, khôi phục và hồ sơ độc lập. Kiểm tra phát WAV khi không có Web Speech đạt lớp 6–12.
- Cập nhật phiên bản tài nguyên trong trang, mẫu và bộ dựng để người học nhận mã mới. Không thay cấu trúc lưu tiến độ, thứ tự bài, đáp án hay cách chấm.
- Bằng chứng: `artifacts/game-pacing/browser-results.json`, `artifacts/game-pacing/unit-tests.txt`; kiểm tra mới: `tests/game-pacing/`. Chưa kiểm tra trên điện thoại vật lý.
