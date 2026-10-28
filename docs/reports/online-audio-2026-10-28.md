# Tải trực tuyến và nghe nhanh khi chạm thẻ — 28/10/2026

## Yêu cầu và phạm vi học

Bỏ cơ chế tải trang/kho offline; ưu tiên ảnh và giọng đọc của nhóm thẻ gần màn hình; đồng bộ tốc độ giữa các topic lớp 2. Giữ mục tiêu học, thao tác, cách chấm, cơ hội tự sửa, hỗ trợ khi sai, điều kiện kết thúc và các khóa tiến độ. Chuẩn bị không đọc thành tiếng, không đổi bài và không tạo bằng chứng thành thạo.

## Thay đổi

- Xóa danh mục/gói offline; bỏ nút tải kho ở trang chủ và chân trang. `offline.html` giữ URL cũ và chuyển về trang chủ. Lệnh dựng kho cũ chỉ thông báo đã dừng; CI chuyển sang kiểm tra gỡ worker.
- `shared/pwa.js` không đăng ký worker mới. Với thiết bị đã có worker đúng URL/phạm vi website, cập nhật/gỡ đăng ký và dọn đúng cache offline thuộc website. `sw.js` chỉ là tệp chuyển đổi nhỏ: tự nhận trang đang mở, bỏ cache cũ, tự gỡ; không có fetch handler, shell, hàng đợi hoặc import danh mục. Không đụng dữ liệu hồ sơ/tiến độ và cache ứng dụng khác.
- Bỏ tải trước trang đích, dành kết nối cho ảnh/MP3. Giữ cache HTTP bình thường; không tải toàn thư viện.
- Chuẩn bị im lặng tối đa tám thẻ đang xem/sắp xem bằng IntersectionObserver. Ưu tiên thẻ thật sự trong màn hình; cập nhật khi cuộn hoặc thẻ dựng lại. MP3 dùng chung bộ nhớ giới hạn 12 tệp / 2 MiB, hàng đợi tối đa chín, hai lượt tải đồng thời. Dùng lại cả blob và phần tử audio đã nạp khi chạm; nhấn lại dừng lượt trước và phát từ đầu. Chuẩn bị thẻ không đánh dấu là game.
- Dừng tải nền khi tab ẩn, mất mạng, tiết kiệm dữ liệu hoặc tắt âm; khôi phục nhóm cần thiết khi quay lại. Dọn audio/blob khi rời trang; lỗi chuẩn bị không chặn việc học hoặc tải/nghe chủ động. Game vẫn chuẩn bị câu hiện tại và hai câu tiếp theo, chờ đáp án đọc xong trước khi tự chuyển.
- Bổ sung ảnh nhỏ cho các Unit và Body Parts ngoài helper topic chung: tổng 299 WebP 480 px, 8.17 MB so với nguồn 31.58 MB (giảm 74.1%). Giữ nguyên ảnh gốc và khung ảnh. Dùng `loading=lazy`, `decoding=async`, kích thước cố định và `srcset`; ảnh câu đang chơi tải ngay.
- Thống nhất lớp 2: học từ/mẫu câu MP3 0.85×, TTS 0.82; trong game MP3 1.15×, TTS 0.95. Animals chuyển qua giọng chung thay vì luồng đọc riêng. Tốc độ không còn phụ thuộc topic có tải `young-learner-speech.js` hay không.
- Cập nhật phiên bản ở trang, mẫu, bộ dựng và trình nạp ngân hàng thư viện. Bộ tích hợp Ghép chữ vẫn lặp lại ổn định.

## Bằng chứng

Edge headless, màn 390×844, mật độ màn hình 2×. Giả lập thêm 300 ms cho mỗi yêu cầu MP3; tắt Web Speech để kiểm tra tệp thật. Sau khi nhóm thẻ được chuẩn bị, 46 lần chạm thẻ đầu/cuối ở đủ 19 topic và Unit 1/8/13/16 đều phát từ blob, không gửi yêu cầu MP3 mới khi chạm, đúng một lần và cùng tốc độ 0.85×. Độ trễ từ thao tác tới sự kiện `playing`: trung vị 2.2 ms, tối đa 10.1 ms. Đây là số đo trình duyệt sau chuẩn bị, không phải độ trễ loa trên thiết bị vật lý; lần chạm trước khi âm tải xong vẫn phụ thuộc mạng.

Kết quả: `artifacts/online-audio/instant-results.json`; kiểm tra: `tests/young-learner-speech/instant-card-audio.browser.cjs`. Đã kiểm tra nhấn liên tục không chồng tiếng và dừng giọng hoạt động.

Các kiểm tra khác đã đạt:

- 43 kiểm tra lõi riêng biệt: media/giọng chung, giới hạn bộ nhớ/hàng đợi, mute/Save-Data/mất mạng/tab ẩn, hồ sơ, nội dung topic, 48 từ Unit/ảnh gốc, tích hợp Ghép chữ và gỡ offline.
- `tests/offline/browser.cjs`: mô phỏng worker cũ thật, cập nhật sang tệp gỡ, trang dùng mạng trở lại, chỉ cache của website bị dọn, tiến độ giữ nguyên; khách mới không cài worker/tải gói; đường dẫn offline cũ về trang chủ.
- `tests/learner-profiles/site-preload.browser.cjs`: rê chuột/focus không tải trang trước, điều hướng thông thường vẫn hoạt động.
- `tests/game-pacing/browser.cjs`: đọc cache thật, không tự đọc khi mở/khôi phục, giữ lượt, dừng khi đổi tab, chờ giọng xong rồi chuyển; game mẫu đủ lớp 1–12 và hai khu vực ngữ pháp đạt.
- `tests/ui-ux/loading-performance.browser.cjs`: ảnh gần màn hình, tệp nhỏ, ảnh đầu/cuối, thao tác nghe đơn, tab lặp, điều hướng, giảm chuyển động và bố cục điện thoại đạt. Food & Drinks vẫn tải khoảng 435 KB ảnh lúc mở so với 2.2 MB nguồn ban đầu.
- Liên kết/ID hợp lệ trên 324 trang; chân trang trên 316 trang; cú pháp mã đã sửa hợp lệ. Không có lỗi JS hoặc tệp thiếu trong lượt nghe 23 trang.
- Đã mở xem trực tiếp ảnh chụp Body Parts và Unit 8 trên khổ điện thoại: `artifacts/online-audio/bodyparts-mobile.png`, `gsunit8-mobile.png`.

## Phát hành

Chưa push/triển khai lên host công khai. Cần phát hành tệp mã/trang và thư mục ảnh `compact/` mới; giữ `sw.js` tại URL cũ cho thiết bị đã có worker. Không phát hành lại danh mục/gói offline. Chưa đo trên điện thoại/iPad vật lý.
