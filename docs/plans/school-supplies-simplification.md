# School Supplies lớp 2 — bộ từ ngắn và tranh đầy đủ

- Mục tiêu: nhận biết tranh, nghe và nhớ 18 từ/cụm từ dài 1–2 âm tiết về đồ dùng học tập.
- Bỏ khỏi bộ học: Eraser, Pencil case, Calculator, Paperclip, Dictionary, Highlighter, Protractor (3 âm tiết trở lên). Giữ ID của các từ còn lại; giữ tệp tranh cũ để lưu dấu kiểm duyệt.
- Cách chơi giữ nguyên: chọn từ, lật thẻ, chọn đáp án, gõ từ và đếm đồ vật/viết câu. Câu đếm chỉ dùng bộ từ mới. Chấm theo đáp án mẫu; sai được thử lại, xem đáp án được ghi riêng. Hoàn thành khi đi hết bộ đã chọn; không ghi thành thạo từ lượt mở thẻ.
- Sửa khung ngoài 90 px thành khung vuông tự co theo thẻ; tranh hiển thị toàn bộ, không phóng cắt. Không tạo hoặc sửa nội dung bitmap.
- Lưu trữ: trước khi đổi bộ chọn có từ đã bỏ, lưu nguyên dữ liệu cũ vào khóa hồ sơ `danh.learning.schoolsupplies.before-short-words.v1`. Giữ các từ đã chọn còn hợp lệ, hoặc chọn cả bộ nếu không còn từ nào. Chỉ khởi tạo lại lượt/thẻ bị ảnh hưởng; giữ kết quả lịch sử trong bản lưu. Không đổi dữ liệu chủ đề khác hay hồ sơ khác.
- Kiểm tra: nội dung bộ từ/câu đếm; chuyển đổi lựa chọn cũ và tải lại; khung/tranh/biên cắt ở 320, 390, 760, 1280 px; bốn game; không tràn ngang. Trình duyệt mô phỏng, chưa thử trên điện thoại vật lý.

## Kết quả 19/10/2026

- Đạt 44 kiểm tra tự động lớp 2; sau chỉnh câu mẫu chạy lại 4 kiểm tra riêng đều đạt. Liên kết/ID trên 199 trang hợp lệ.
- Trình duyệt: 18 ảnh tải đủ; SVG, khung trong và khung ngoài có cùng kích thước vuông ở 320/390/760/1280 px, không tràn ngang; bốn game mở và có tranh. Tranh đếm vẫn 56 × 56 px khi giảm chuyển động. Chuyển lựa chọn cũ pen/eraser/book thành pen/book và tải lại giữ nguyên; không lỗi trang.
- Đã mở trực tiếp ảnh chụp toàn trang máy tính và xem 18 tranh sau sửa khung; không thay bitmap. Ảnh nghiệm thu: `artifacts/grade2-pencil/school-supplies-fixed-1280.png`, các chiều rộng còn lại lưu cùng thư mục.
- Sửa câu ví dụ kéo thành “These are my scissors.”; câu đếm dùng “pairs of scissors”, “glue sticks”, “sheets of paper”; mẫu mượn đồ dùng ruler thay eraser để khớp bộ mới.
