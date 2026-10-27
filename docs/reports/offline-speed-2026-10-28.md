# Tăng tốc kho offline — 28/10/2026

- Dung lượng logic toàn kho: 539.315.112 → 243.597.523 byte, giảm khoảng 55%; giao diện khoảng 514,3 → 232,3 MiB.
- 4.584 giọng WAV PCM được chuyển từ cùng bản gốc sang MP3 mono 48 kb/s: 368.402.864 → 72.685.032 byte (giảm 80%). Giữ WAV nguồn trên host để các bản cũ vẫn nghe được khi có mạng; kho offline mới chỉ tải MP3.
- Giữ nguyên toàn bộ ảnh, ngân hàng bài, URL trang, cách chấm và khóa tiến độ.
- Toàn kho được đóng thành 120 gói khoảng 2 MiB. Lượt thử thật phát sinh 123 yêu cầu gói, đã gồm thử hash sai, tạm dừng và sửa tệp thiếu; thay cho hàng nghìn yêu cầu tệp lẻ.
- Mỗi tệp vẫn được kiểm tra SHA-256 và lưu riêng theo nội dung. Ba tác vụ tải, lô tối đa 12 tệp; đệm tối đa ba gói, gộp yêu cầu cùng gói. Không giữ cả kho trong RAM. Gói lỗi mạng có thể tải tệp lẻ, gói sai hash không được coi là đủ.
- Tiến trình phản ánh cả dung lượng lẫn số tệp; mở lại giữ phần đã tải. Cập nhật giữ ảnh/tệp không đổi và hồ sơ; chỉ dọn phần không còn dùng khi đủ phiên bản mới.
- `.gitattributes` giữ nguyên byte của gói nhị phân/MP3 qua Git trên Windows; danh mục và hash bao gồm vị trí tệp trong gói.

Đã đạt: kiểm tra đơn vị của dữ liệu/game/hồ sơ/nhịp chơi/offline; bao phủ/hash mọi gói; gộp yêu cầu; gói bị hỏng/thiếu; thiếu dung lượng; tải đủ 6.524 tệp; tạm dừng/tải tiếp; kiểm tra toàn bộ khi mất mạng; 12 lớp, thư viện, bài cũ; nghe MP3 `hello` và `meet`; Range 206; giữ lượt dở; worker khởi động lại; cập nhật chỉ đổi một tệp không nhân đôi toàn kho; màn hình 390/768 px. Không có lỗi JavaScript trong lượt trình duyệt.

Bằng chứng: `artifacts/offline/results.json` và ảnh trong cùng thư mục. Chạy Edge/Chromium, chưa có iPad vật lý. Không khẳng định số lần tăng tốc theo thời gian: tốc độ còn tùy Wi-Fi và máy chủ; số byte và số yêu cầu là các số đo trực tiếp.
