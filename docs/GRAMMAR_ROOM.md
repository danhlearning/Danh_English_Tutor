# Phòng luyện tập ngữ pháp

Cập nhật 03/10/2026. Điểm vào: `grammar-index.html`, bên trong Luyện theo kỹ năng.

## Nội dung đã triển khai

- 25 bài trong 7 nhóm: sáu thì, mệnh đề quan hệ, điều kiện, cấu tạo từ, nền tảng câu, so sánh/nối ý và vận dụng.
- 510 tình huống được biên soạn trong `assets/data/grammar/catalog.js`. Mỗi tình huống có một mục ở mỗi cấp độ, thành 1.530 mục luyện; không quảng bá ba cấp độ là ba tình huống khác nhau.
- Chín bài ban đầu có 30 tình huống mỗi bài, tức 810 mục ở ba cấp độ. Mười sáu bài mới có 15 tình huống mỗi bài, tức 720 mục. Chỉ những ngân hàng đủ hai lượt độc lập mới có thể đánh giá “Đã vững”.
- Cấp độ Nền tảng cung cấp công thức; Vận dụng bỏ hỗ trợ công thức; Thử thách yêu cầu hoàn thành cả câu ở bài điền/chọn. Các cấp độ không phải chứng chỉ hay điểm kỳ thi.
- Mỗi bài có cách dùng, hai ví dụ với nghĩa tiếng Việt, điểm dễ nhầm và ba câu thử nhanh không tính điểm.
- Năm dạng: chọn đáp án, điền từ, xếp câu, sửa lỗi, viết lại. Lượt chuẩn có tỷ lệ 3/2/2/1/2. Bài điền có từ gợi ý để giới hạn yêu cầu; viết lại có từ bắt buộc.
- Ôn tổng hợp cho chọn nhiều bài; tối đa năm câu/bài trong một lượt. Ôn lỗi sai và câu đến hạn có thể ít hơn 10 câu, luôn ghi số thực tế.

## Chấm, phản hồi và lưu

- Điểm chính chỉ tính đúng ngay. Kết quả tách đúng ngay, sửa đúng, đã xem và bỏ qua; các nhóm không chồng nhau.
- Sai lần đầu không lộ đáp án; sau hai câu trả lời sai khác nhau hoặc 60 giây hoạt động, người học được chủ động xem. Gợi ý mở sau 20 giây với chọn/điền ngắn, 60 giây với dạng khác. Không chạy thời gian học khi tab ẩn.
- Chấm theo đáp án và biến thể được biên soạn; chuẩn hóa khoảng trắng, dấu nháy và dạng rút gọn. Không bỏ phủ định/chủ ngữ. Bài viết lại phải có từ bắt buộc. Các cách diễn đạt ngoài mẫu được phản hồi “chưa khớp”, không hứa chấm mọi câu tự do.
- Tiến độ lưu ở khóa `danh-grammar-room-v1`. Giữ câu đang làm, thứ tự đáp án/từ, câu trả lời nháp, lần thử và kết quả. Xóa tiến độ chỉ tác động phòng này.
- Sai, sửa đúng, đã xem hoặc bỏ qua: ôn sau một ngày. Ôn đúng lần đầu kế tiếp: 3, 7, 14 ngày; sai lại trở về một ngày.
- Đã vững: hai lượt 10 câu đủ dạng, không trùng tình huống, mỗi lượt ít nhất 9 câu đúng ngay; sau lượt thứ hai ít nhất 7 ngày, ôn 10 tình huống đã học và đạt ít nhất 9 câu đúng ngay. Ngân hàng 15 tình huống không được gắn nhãn này.
- Bộ nhớ bị chặn vẫn cho học trong phiên, có thông báo. Dữ liệu hỏng hoặc lượt không tương thích được phục hồi an toàn.

## Giữ đường dẫn và nội dung cũ

Các trang `tense-*`, `relative-clause-*`, `condition-*`, `wordform-*` dùng bộ mới với nhóm tương ứng. `condition-pratice.html` vẫn chuyển tiếp. Không nhập hay thay tiến độ các lớp.

360 câu của bộ cũ đã được kiểm kê từng ID tại `reports/grammar-legacy-inventory.json`, trạng thái nghỉ sử dụng trong chấm điểm. Đáp án cũ không tự động nhập vào ngân hàng mới. Các tệp bài luyện cũ ở `assets/js/pages/` không còn được trang ngữ pháp tải.

## Giao diện và hiệu ứng

Nunito được lưu tại `assets/fonts/nunito/`, gồm chữ Latin và tiếng Việt, kèm giấy phép OFL. Phòng dùng màu pastel, thẻ bo tròn, nút có phản hồi khi nhấn và nhân vật ngôi sao bằng SVG. Cỡ câu hỏi vẫn tối thiểu 24 px trên điện thoại.

`assets/js/grammar/experience.js` tạo âm thanh nhẹ qua Web Audio cho chọn đáp án/xếp từ, bắt đầu, thử lại, sửa đúng, đúng ngay, gợi ý, xem đáp án, chuyển câu và kết thúc lượt. Âm thanh chỉ bắt đầu sau thao tác người dùng; tắt âm thanh ngừng các nốt đang phát. Không có nhạc nền tự phát.

Animation gồm chuyển câu, nhấn nút, phản hồi đúng/thử lại, ngôi sao đồng hành và giấy màu khi hoàn thành. Hiệu ứng ngắn, không che nút thao tác; giấy màu tự dọn sau 1,6 giây. Các lựa chọn âm thanh và chuyển động lưu riêng ở `danh-grammar-experience-v1`, không thay tiến độ bài học. Chế độ giảm chuyển động của hệ điều hành được ưu tiên.

Kiểm tra UI/âm thanh: `node tests/grammar-room/experience-browser.cjs`. Ảnh xem thử lưu ở `artifacts/grammar-playful/`.

## Kiểm tra chức năng

`node --test tests/grammar-room/*.test.cjs` kiểm tra toàn bộ dữ liệu, 75 ngân hàng bài/cấp độ, thiếu dạng, biến thể trùng, điểm, lịch ôn, lưu trữ và điều kiện đã vững.

`node tests/grammar-room/browser-smoke.cjs` hoàn thành 75 lượt/750 câu, thao tác cả năm dạng, trả lời sai/thử lại/xem đáp án, tiếp tục sau tải lại, đường dẫn cũ, lý thuyết, bộ nhớ bị chặn/hỏng và bố cục 320/375/390/430/1280 px cùng 844×390. Ảnh xem thử lưu trong `artifacts/grammar-room/`.

Thao tác bàn phím điện thoại vật lý cần kiểm chứng trên thiết bị thật. Giả lập trình duyệt kiểm tra bố cục và luồng học, không xác nhận cảm giác sử dụng bàn phím của mọi thiết bị.
