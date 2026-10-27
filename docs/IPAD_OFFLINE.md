# Danh English Tutor trên iPad, dùng offline

## Người dùng

1. Mở địa chỉ website HTTPS bằng Safari. Trong Chia sẻ, chọn Thêm vào Màn hình chính, bật Mở dưới dạng ứng dụng web nếu có.
2. Mở biểu tượng vừa thêm. Chọn **Học offline** trên trang chủ hoặc cuối bất kỳ bài học.
3. Bấm **Tải toàn bộ** bằng Wi-Fi. Giữ ứng dụng mở, có thể cắm sạc. Kho hiện khoảng 515 MB (6.524 tệp), gồm mọi trang HTML đang triển khai, hình, mã game, font và âm thanh nội bộ. Hệ thống có thể cần thêm chỗ trống khi cập nhật.
4. Chỉ khi báo đủ kho mới tắt mạng. Bấm **Bắt đầu học**, mở thử Unit và nghe từ. Bấm **Kiểm tra bản tải** nếu cần kiểm tra lại từng tệp.
5. Khi tải gián đoạn/đóng app/ẩn app, phần đã lưu vẫn giữ. Mở lại và bấm **Tải tiếp**. Không có việc tự tải nửa gigabyte khi chỉ mở bài học.

Hãy tải từ chính biểu tượng ứng dụng đã cài; không giả định dữ liệu của Safari đã chuyển sang ứng dụng trên màn hình chính. Nếu từng học trong Safari, có thể sao lưu hồ sơ ở Safari và khôi phục trong ứng dụng.

Không cần đăng nhập để tải/học. Hồ sơ, lượt dở và cách chấm hiện có tiếp tục hoạt động offline. Tải kho không tạo kết quả học, không đọc tiếng và không sửa tiến độ. Giọng đọc từ/câu có sẵn dùng các WAV/MP3 nội bộ; từ/câu tự thêm cần giọng tiếng Anh đã tải trên thiết bị. Các liên kết Zalo/Facebook cần Internet.

iPad quản lý dữ liệu web và có thể thu hồi khi thiếu bộ nhớ. Ứng dụng yêu cầu lưu bền vững khi bắt đầu tải, nhưng quyền này do thiết bị quyết định. Giữ bộ nhớ trống, sao lưu hồ sơ JSON định kỳ, không xóa dữ liệu website nếu cần giữ tiến độ. Kiểm tra lại trước chuyến đi. Mở trực tiếp HTML từ Files không cài được chế độ này.

## Cập nhật và phát hành

- Giữ nguyên thư mục website và các URL cũ; dùng HTTPS. Hỗ trợ gốc tên miền hoặc thư mục dự án, ví dụ GitHub Pages `/repo/`.
- Sau khi chạy mọi bộ dựng/chỉnh nội dung, chạy `node scripts/build-offline-catalog.cjs`. Đưa cả `offline-catalog.js`, `sw.js`, manifest và các tệp được liệt kê lên host trong cùng đợt phát hành. Danh mục cố định cho một bản, gồm kích thước và SHA-256; nếu host trả nội dung cũ/trang lỗi, ứng dụng dừng và không nhận là đủ kho.
- Không đặt xác thực/redirect cho các tài nguyên này. Nên cho `sw.js` và `offline-catalog.js` được kiểm tra cập nhật thường xuyên. Không dùng CDN sửa nội dung JS/CSS/HTML tự động sau khi tính hash.
- Một worker mới chỉ tải bộ khung nhỏ rồi chờ; không kích hoạt giữa lượt chơi. Người dùng vào trang offline và chọn **Cập nhật ứng dụng**; tải tiếp để bổ sung kho của phiên bản mới. Tệp được lưu theo hash nội dung, dùng chung giữa các phiên bản: âm thanh/ảnh không đổi không tạo thêm một bản 515 MB. Giữ tệp cũ đến khi đủ kho mới, rồi dọn các tệp không còn dùng và bộ khung cũ đã hoàn tất; không dọn bộ khung của worker đang chờ, dữ liệu app khác hoặc hồ sơ.
- Tải toàn bộ chạy theo lô ngắn, tối đa hai tệp song song. Dừng khi ẩn trang/mất mạng hoặc người dùng bấm tạm dừng. Không phụ thuộc tải nền kéo dài trên iPad. Cache Storage quản lý dữ liệu trên đĩa; không giữ cả 511 MB trong RAM.
- Khi khởi động, số tệp thực có trong cache quyết định trạng thái. Kiểm tra bản tải đọc lại và đối chiếu SHA-256, loại bản lỗi. Range audio trả 206/416 phù hợp cho Safari.
- Ảnh từ thẻ cũ trước đây dùng Unsplash đã chuyển về `assets/images/legacy-vocabulary/`. Sáu URL gốc trả 404, dùng biểu tượng dự phòng nội bộ hiện có. Không đổi thành ảnh khác nghĩa. Bộ dựng kế hoạch âm thanh đã bổ sung ví dụ `speakWord` trong HTML cũ và từ của sổ tay cũ; tạo các WAV còn thiếu bằng giọng Windows như kho hiện có.
- `shared/contact-footer.js` nạp PWA cho toàn bộ trang hiện có và trang sinh lại dùng footer chung. Trang chủ có sẵn manifest/icon và lối vào. Bộ dựng chỉ cần tiếp tục giữ footer, sau đó tạo lại danh mục cuối cùng.

Kiểm tra tự động:

```text
node scripts/build-offline-catalog.cjs --check
node --test tests/offline/*.test.cjs
node tests/offline/browser.cjs
```

Bài trình duyệt tự mở máy chủ dưới `/course/`, tải cả kho thật (khoảng 515 MB vào hồ sơ trình duyệt tạm), dừng/tải tiếp, kiểm tra hash sai, thiếu tệp, kiểm tra lại toàn bộ khi offline, 12 lớp, thư viện/bài cũ, âm thanh/range, worker khởi động lại, cập nhật có giữ tiến độ và màn hình 390/768 px. Báo cáo/screenshot ở `artifacts/offline/`. Có thể đặt `PLAYWRIGHT_MODULE` và `BROWSER_CHANNEL` cho môi trường cục bộ.

Đã kiểm tra bằng Edge/Chromium với kích thước iPad mô phỏng; **chưa nghiệm thu Safari trên iPad vật lý**. Cần kiểm tra thao tác thêm vào màn hình chính, nghe thực tế, đóng/mở lại app trong chế độ máy bay và giữ dữ liệu sau khi iPad khởi động lại.

Nguồn: [Apple — thêm website thành ứng dụng](https://support.apple.com/guide/ipad/ipad8f1f7a29/ipados), [WebKit — chính sách lưu trữ](https://webkit.org/blog/14403/updates-to-storage-policy/).
