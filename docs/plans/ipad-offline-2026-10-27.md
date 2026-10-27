# Web app cài trên iPad và tải toàn bộ để học offline

## Phạm vi và trải nghiệm

- Mục tiêu học: tiếp tục các game, lớp 1–12, topic phụ, thư viện và bài cũ khi mất mạng; giữ nguyên nội dung, cách chấm, gợi ý, tự sửa và điều kiện hoàn thành của từng bài.
- Thao tác chuẩn bị: Safari → thêm vào màn hình chính → mở ứng dụng → Học offline → Tải toàn bộ. Tải kho là thao tác chủ động riêng, không phải tải trước trong lượt học.
- Không ghi điểm/tiến độ/thành thạo khi tải, kiểm tra hay mở ứng dụng. Tiến độ vẫn dùng hồ sơ hiện tại và có sao lưu JSON.
- Hoàn thành tải chỉ khi tất cả tài nguyên của phiên bản đều đã lưu và được kiểm tra. Có dung lượng, số tệp, tạm dừng, tải tiếp, xử lý thiếu dung lượng/mạng lỗi. Ẩn trang dừng tải; khi quay lại cho tiếp tục.
- Giao diện giấy/chì màu, Nunito nội bộ, nút ≥44px, bàn phím, trạng thái bằng chữ; không tự phát âm, không thêm animation.

## Kỹ thuật

- PWA cùng gốc, cùng thư mục triển khai; hỗ trợ cả GitHub Pages dưới đường dẫn repo. Yêu cầu HTTPS (localhost dùng để kiểm tra).
- Danh mục dựng tự động từ trang gốc, assets, shared, grade; bỏ tests, artifacts, tmp, mã phát triển. SHA-256 và dung lượng từng tệp để xác minh tải, chống lưu trang lỗi dưới URL JS/ảnh và tái sử dụng tệp không đổi khi cập nhật.
- Service worker chỉ tải bộ khung khi cài. Tải toàn bộ theo từng lô ngắn do trang điều khiển, tối đa hai yêu cầu đồng thời; không dựa vào tác vụ nền kéo dài trên iPad. Tải lại tiếp tục từ bộ nhớ đã có.
- Danh mục theo phiên bản, tệp lưu theo hash dùng chung giữa các phiên bản để tránh nhân đôi cả kho khi cập nhật. Không tự kích hoạt worker mới giữa lượt học. Giữ tệp cũ đến khi tải đủ bản mới. Không xóa localStorage/hồ sơ khi dọn cache.
- Phục vụ HTML có tham số từ tệp gốc, JS/CSS có phiên bản từ đúng bản đã tải; hỗ trợ Range cho audio trên Safari.
- Tất cả tài nguyên học phải nội bộ. Ảnh Unsplash của thẻ cũ chuyển thành bản nội bộ; liên hệ Zalo/Facebook là liên kết ngoài và cần mạng. Giọng của thiết bị cho văn bản tự nhập nằm ngoài kho âm thanh thu sẵn.

## Nghiệm thu dự kiến

- Kiểm tra danh mục bao phủ toàn bộ tệp triển khai và không chứa dữ liệu cá nhân/mã phát triển.
- Trình duyệt thực: cài worker, tải đủ, dừng/tải tiếp, tệp lỗi, thiếu dung lượng, kiểm tra mất tệp, offline và khởi động lại, URL con/đường dẫn repo, Range audio, lưu lượt/hồ sơ, thao tác lặp, trang chưa tải.
- Kiểm tra bố cục điện thoại và iPad mô phỏng. Không ghi nhận đã thử iPad vật lý nếu chưa có thiết bị.
- Giới hạn iPad: hệ điều hành có thể thu hồi dữ liệu web; yêu cầu lưu bền vững là nỗ lực tốt nhất. Cần sao lưu hồ sơ và dùng màn hình kiểm tra offline sau khi dọn bộ nhớ/cập nhật hệ điều hành.

Nguồn nền tảng: https://webkit.org/blog/14403/updates-to-storage-policy/ và https://support.apple.com/guide/ipad/ipad8f1f7a29/ipados .
