# Nghiệm thu phần mở rộng topic Lớp 2

Ngày: 26/09/2026. Repo: `Danh_English_Tutor` (bản duy nhất đã hợp nhất).

## Phạm vi đã làm

Đã bổ sung sáu topic theo kế hoạch, dùng chung giao diện, điều hướng, footer, bộ chọn từ và Game 1–3. Game 4 của sáu topic dùng chung một bộ xử lý mới; sai không hiện đáp án, nút xem đáp án do học sinh chủ động bấm, kết quả phân loại đúng ngay/sửa đúng/đã xem, mỗi câu chỉ ghi một lần, hết lượt có tổng kết và chơi lại. Bộ chọn từ áp dụng cho cả bốn game. Dữ liệu từ và hình được dùng lại ở bảng từ, bộ chọn và các game.

| Topic | Từ | Câu Game 4 | Trang |
|---|---:|---:|---|
| Basic Adjectives | 12 | 12 | `adjectives.html` |
| Shapes | 8 | 8 | `shapes.html` |
| Toys | 12 | 12 | `toys.html` |
| Weather | 8 | 8 | `weather.html` |
| Rooms in a House | 7 | 7 | `rooms.html` |
| Transport | 12 | 12 | `transport.html` |
| **Tổng** | **59** | **59** | **6 trang** |

Trang danh sách hiện có 19 topic thật. `templates/lop2-topic-page.html` là mẫu dùng cho sáu trang trên. Workflow GitHub chạy bộ kiểm tra Node và kiểm tra footer khi push hoặc mở pull request.

## Đã kiểm tra

- `node --test grade/lop2/tests/*.test.cjs`: **26/26 đạt**. Bao gồm tính toàn vẹn dữ liệu, tài nguyên, đường dẫn, quy tắc sai/xem đáp án/chấm lặp của Game 4, lưu bộ từ trong Game 1–3 của Body Parts.
- `node scripts/check-contact-footer.cjs`: footer hợp lệ trên **21 trang** (trang chủ và mọi trang trong thư mục grade).
- `node --check` cho `extended-topics-data.js`, `extended-topic.js`, `learning-core.js`, `bodyparts.js`: cú pháp hợp lệ.
- 59 hình SVG: XML hợp lệ; đã kết xuất thành bảng ảnh cục bộ và rà bằng mắt. Không có chữ đáp án trong hình. Đã xem riêng các cặp tính từ, hình học, đồ chơi, thời tiết, phòng và phương tiện.
- `node scripts/check-local-links.cjs`: 35 trang đang dùng không có liên kết nội bộ hỏng hoặc ID trùng.
- Cú pháp 31 đoạn JavaScript nhúng trong HTML hợp lệ.
- `git -c core.whitespace=cr-at-eol diff --check`: không thấy lỗi khoảng trắng ở các file Git đang theo dõi.

## Giới hạn nghiệm thu

Chưa xác nhận thao tác trực tiếp hoặc bố cục cả trang trên trình duyệt. Công cụ duyệt của môi trường này từ chối URL `file://` theo chính sách bảo mật và cấm dùng đường vòng để mở cùng trang. Vì vậy kết quả trên là nghiệm thu mã, dữ liệu, liên kết và hình độc lập; **chưa phải nghiệm thu trực quan trang web hoặc âm thanh trên thiết bị người học**.

Các topic cũ ngoài Body Parts vẫn còn Game 4 riêng theo từng trang. Việc chuẩn hóa toàn bộ Game 4 cũ và kiểm thử nghe giọng thực tế là giai đoạn tiếp theo, không được tính là đã xong trong đợt mở rộng sáu topic.

## Cách kiểm tra thủ công khi có môi trường xem trang

1. Mở `grade/lop2/lop2.html` qua môi trường xem trang của dự án. Vào lần lượt sáu topic, xác nhận hình và chữ không tràn ở màn hình rộng, 390 px và 320 px.
2. Ở mỗi topic, mở bộ chọn từ trong Game 1–3, chọn một từ rồi Áp dụng: Game 1/3 và Game 4 còn đúng một từ/câu; Game 2 hướng dẫn cần thêm một từ. Áp dụng lại cùng bộ từ phải bắt đầu lượt mới ở cả bốn game.
3. Game 4: nhập sai, kiểm tra không hiện/đọc/tô đáp án; sửa đúng, kiểm tra ghi “Sửa đúng”. Bấm “Hiện đáp án”, kiểm tra không tự chuyển và chỉ ghi một lần; bấm “Câu tiếp theo”.
4. Chuyển tab giữa lúc đọc/chờ chuyển, kiểm tra không phát âm thanh cũ và quay lại câu đang làm. Tải lại trang để kiểm tra Game 1–3 khôi phục bộ từ, điểm và tiến độ.
5. Nghe các từ và câu, đặc biệt các từ dùng IPA Anh-Anh. Chất lượng giọng phụ thuộc giọng cài trên thiết bị.
