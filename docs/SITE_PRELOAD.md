# Tải trước website

`shared/learner-profile.js` nạp `shared/site-preload.js` cho toàn bộ trang và mẫu đang dùng hồ sơ người học. Áp dụng cả khi học thử và sau đăng nhập, không phải chờ chọn hồ sơ.

- Sau khi trang tải xong và trình duyệt rảnh, chuẩn bị tối đa hai liên kết bài học đang hiển thị trong vùng nội dung chính.
- Khi trỏ chuột, chạm hoặc chuyển bàn phím tới liên kết nội bộ, ưu tiên chuẩn bị trang đích.
- Tải HTML, CSS, JavaScript, tối đa ba ảnh đầu trang và tài nguyên ảnh/font được khai báo trong CSS. Không chạy mã của trang đích, không phát âm thanh, không ghi bằng chứng học hay tiến độ.
- Giới hạn mỗi trang đang mở: bốn trang đích, 24 tài nguyên, hai yêu cầu đồng thời, khoảng 3 MB dữ liệu đọc (một khối truyền cuối có thể vượt nhẹ). Mỗi yêu cầu tối đa sáu giây; bỏ tệp có kích thước khai báo vượt hạn mức. Không tải toàn bộ kho ảnh/giọng đọc.
- Không tải trước khi bật tiết kiệm dữ liệu, mạng 2G/3G hoặc offline nếu trình duyệt cung cấp thông tin đó. Hủy yêu cầu đang tải khi ẩn/rời trang; lỗi tải trước không chặn chuyển bài.
- Chỉ đọc tài nguyên cùng nguồn và cùng thư mục gốc website; hỗ trợ website xuất bản trong thư mục con. Bỏ liên kết tải xuống, liên kết ngoài và chuyển hướng máy chủ.

Dùng cache HTTP và quy tắc hết hạn/xác thực của máy chủ; không cài service worker hay lưu một bản website vĩnh viễn. Tệp chưa tải xong hoặc chưa được chuẩn bị vẫn tải theo cách thông thường. Tốc độ lần truy cập đầu phụ thuộc thiết bị và mạng; đây không phải chế độ tải toàn website để học offline. Việc dùng lại cache phụ thuộc cấu hình HTTP của nơi xuất bản.

Mã hồ sơ có phiên bản `preload-20261022`, bộ tải trước có phiên bản `20261022-1`. `node scripts/update-preload-version.cjs` đồng bộ phiên bản hồ sơ trên trang/mẫu/bộ dựng. Không sửa khóa hoặc dữ liệu người học.

Kiểm tra: `node tests/learner-profiles/site-preload.browser.cjs` (cần Playwright và Edge; hỗ trợ `PLAYWRIGHT_MODULE`, `BROWSER_CHANNEL`). Kiểm tra trình duyệt mới, cache thật được dùng khi chuyển trang, không chạy bài/âm thanh khi tải trước, mạng yếu/tiết kiệm dữ liệu/offline, thao tác bàn phím/chuột, đăng nhập và giữ dữ liệu sau chuyển trang/tải lại. Đây là kiểm tra bằng trình duyệt tự động, chưa phải điện thoại vật lý hay đo tốc độ trên máy chủ công khai.

## Kết quả kiểm tra ngày 22/10/2026

- Đạt toàn bộ kiểm tra trình duyệt tải trước; máy chủ kiểm thử xác nhận HTML và JavaScript không bị yêu cầu lại khi mở trang đã chuẩn bị với chính sách cache cho phép.
- Đạt tám kiểm tra lõi hồ sơ và bộ kiểm tra trình duyệt hồ sơ: cách ly nhiều người học, nhiều tab, đổi tên, sao lưu/khôi phục/xóa, tiếp tục lượt, hết phiên và bộ nhớ bị chặn.
- Đạt kiểm tra liên kết/ID trên 238 trang và kiểm tra font tĩnh. Bộ kiểm tra glyph thực tế đạt trên 11 trang khi chặn mạng ngoài, gồm hộp đăng nhập và footer độc lập.
- Đã xem trực tiếp ảnh trang chủ ở chiều rộng 390 và 1280 px. Ảnh kiểm tra tại `artifacts/site-preload/`.
- Chưa xuất bản thay đổi; chưa đo tốc độ thực tế trên máy chủ công khai hoặc thiết bị vật lý.
