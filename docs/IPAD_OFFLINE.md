# Chuyển sang tải trực tuyến — 28/10/2026

Theo yêu cầu mới, website không còn tải kho offline, cài service worker cho người dùng mới, hoặc tải trước trang khác. Ảnh và MP3 dùng cache HTTP bình thường và bộ nhớ giới hạn trong phiên.

- Giữ `sw.js` tại URL cũ khi phát hành: đây chỉ là worker chuyển đổi, không có fetch handler, tự nhận các trang đang mở, xóa đúng cache `danh-offline:<phạm vi website>:` và tự gỡ đăng ký.
- `shared/pwa.js` chỉ tìm worker của đúng website để cập nhật/gỡ; không đăng ký worker mới. Không chạm localStorage, sessionStorage hoặc dữ liệu hồ sơ.
- Không đưa `offline-catalog.js` hoặc `offline-packs/` lên host nữa. Lệnh dựng cũ chỉ thông báo cơ chế đã dừng. Trang `offline.html` giữ đường dẫn cũ và chuyển về trang chủ.
- Ứng dụng đã thêm vào màn hình chính vẫn có thể mở website trực tuyến; không còn cam kết học khi mất mạng.
- Ảnh nhỏ có tải sau; âm của nhóm thẻ gần màn hình được chuẩn bị im lặng. Không tải toàn bộ thư viện và không tự phát âm khi mở/khôi phục.

Kiểm tra: `node --test tests/offline/*.test.cjs`, `node tests/offline/browser.cjs`, `node --test tests/game-pacing/media.test.cjs`.
