# Ôn tập tổng hợp lớp 2 — 19/10/2026

## Kết quả

- Trang `grade/lop2/review.html`, truy cập từ đầu danh mục lớp 2 hoặc liên kết “Ôn tổng hợp” trong các bài. Bộ chọn gồm 16 Unit chính, 48 từ đang có; không mở rộng sang các chủ đề bổ trợ trong đợt này.
- Hộp chọn tương tự bộ chọn từ: tìm theo Unit/từ/nghĩa Việt, chọn tất cả, bỏ chọn, chọn Unit 1–8 hoặc 9–16, Áp dụng/Hủy. Không cho áp dụng bộ rỗng; Escape đóng, Tab/Shift+Tab giữ trong hộp, trả focus về nút mở.
- Lượt trộn chọn nghĩa, nghe chọn từ, gõ từ, xếp câu. Tối đa 10 câu với bộ nhỏ; nếu chọn hơn 10 Unit thì có ít nhất một câu mỗi Unit (tối đa 16). Bộ 1 Unit có 3 câu, dạng câu luân phiên theo các lượt đã kết thúc. Mỗi từ cùng Unit chỉ xuất hiện một lần/lượt.
- Sai cho thử lại; rỗng không tính sai; đúng ngay/tự sửa/có gợi ý/đã xem/bỏ qua phân biệt. Chấm 10/5/3/0/0 sao. Không tự chuyển câu, không đọc từ khi mở trang. Tổng kết có câu cần luyện và nút ôn lại.
- Lưu lựa chọn và lượt dở (thứ tự đáp án, nháp, mảnh câu, lỗi, trợ giúp, kết quả) riêng theo hồ sơ. Đổi Unit không xóa lượt dở; tiếp tục dùng bộ cũ. Bắt đầu lượt mới thay lượt dở cần xác nhận trong giao diện. Không sửa tiến độ của các bài Unit.
- Dùng Nunito nội bộ, thành phần âm/chuyển động và giọng đọc chậm dùng chung, có tùy chọn nhớ theo hồ sơ và tôn trọng giảm chuyển động.

## Bằng chứng

- `grade/lop2/tests/mixed-review.test.cjs`: 5 kiểm tra mô hình đạt — gộp 16 Unit, lọc/bao phủ Unit, không trùng từ, chấm/nhấn lặp, nháp/thứ tự/mảnh câu, tổng kết/lịch sử, ôn lại sau đổi lựa chọn, dữ liệu hỏng và lưu bị chặn. Kiểm tra không ghi đè khóa Unit có sẵn.
- `grade/lop2/tests/mixed-review.browser.cjs`: đạt trên Edge mô phỏng, 320/390/760/1280 px; bộ chọn/tìm/hủy/rỗng/bàn phím, cả 4 dạng câu, sai/sửa/gợi ý/xem/bỏ qua, tổng điểm, tiếp tục sau tải lại, giữ lượt khi chọn bộ khác, xác nhận hủy lượt mới, tổng kết/ôn lại, chữ 200%, đổi người học, tab cùng hồ sơ và bộ nhớ bị chặn. Không có lỗi JavaScript được ghi nhận.
- Kiểm tra lời gọi giọng đọc bằng mô phỏng: chỉ đọc khi bấm nghe, không tự đọc sau mở/tải lại. Sự kiện hiệu ứng có motion=false khi thiết bị yêu cầu giảm chuyển động; không có phần tử sparkle.
- Đã mở xem trực tiếp ảnh chụp setup, bộ chọn, lượt chơi, tổng kết và chữ lớn. Sửa các nút chọn nhanh bị chật thành bố cục xuống hàng. Bằng chứng trong `artifacts/grade2-mixed-review/`.
- Bộ kiểm tra hiện có đã cập nhật để nhận trang mới và xác nhận danh mục có đường vào ôn tập. Liên kết hợp lệ 199 trang; chân trang chung hợp lệ 193 trang. Hai script mới kiểm tra cú pháp đạt.
- Chạy toàn bộ nhóm kiểm tra nội dung/game/hồ sơ trong quy trình CI: 77/77 kiểm tra đạt.

## Giới hạn

Chưa kiểm tra điện thoại vật lý, trình đọc màn hình hoặc nghe âm/giọng đọc thực tế. Bài nghe dùng giọng đọc của thiết bị và có thông báo nếu không phát được. Không thêm hoặc thay ảnh từ vựng. Chưa commit/đẩy lên GitHub trong đợt tính năng này.
