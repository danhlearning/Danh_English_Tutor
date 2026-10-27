# Nghiệm thu web app offline — 27/10/2026

## Phạm vi hoàn tất

- PWA cài từ Safari lên màn hình chính, hỗ trợ gốc host và thư mục dự án.
- Trang Học offline có dung lượng, tiến trình, tạm dừng/tải tiếp, kiểm tra nội dung và cập nhật chủ động.
- Danh mục 6.524 tệp, 539.315.112 byte (514,3 MiB), bao phủ trang học, ảnh, font, dữ liệu và 4.584 WAV cùng các MP3 sẵn có. Không đưa artifacts/tmp/tests/hồ sơ vào kho.
- Ảnh thẻ cũ được đưa vào repo; sáu ảnh gốc không còn tồn tại dùng hình dự phòng nội bộ. Bổ sung WAV cho các ví dụ phát âm và từ sổ tay cũ chưa có tệp.
- Tệp được kiểm tra SHA-256 và lưu theo nội dung, dùng chung qua các phiên bản. Bản cập nhật chỉ bổ sung tệp thay đổi; giữ tệp cũ cho đến khi kho mới đủ. Không thay khóa lưu học tập.
- Chuẩn hóa CRLF/LF cho tệp văn bản để cùng bản dựng chạy được từ Windows, Git và host Linux.

## Đã kiểm tra

Trình duyệt Edge/Chromium, máy chủ tự chạy dưới `/course/`, kích thước iPad 768×1024 và điện thoại 390×844, giảm chuyển động:

- Tải **toàn bộ kho thật** 6.524 tệp; không công bố đủ trước khi tệp được lưu.
- Tạm dừng, tải lại trang rồi tiếp tục mà giữ phần đã tải.
- Host trả nội dung sai hash bị từ chối; xóa một WAV được phát hiện và tải bổ sung.
- Tắt mạng và kiểm tra lại hash của **toàn bộ** tệp đã lưu.
- Mở Unit của cả 12 lớp, thư viện từ vựng, phòng ngữ pháp, topic đầu/cuối danh sách mẫu, ôn tập và trang cũ khi offline.
- Giữ nguyên lượt Ghép chữ qua tải lại; dữ liệu lưu thử vẫn còn sau đổi phiên bản.
- Không tự phát giọng khi mở/khôi phục; nghe `hello` và nút nghe `meet` ở trang phát âm cũ phát WAV từ kho offline.
- Yêu cầu Range WAV có tham số phiên bản trả đúng 206 và 44 byte đầu; kiểm tra đơn vị có thêm suffix, open-end và 416.
- Dừng worker rồi mở lại đường dẫn Unit sâu khi mất mạng. Đường dẫn lạ chuyển về trang offline với tài nguyên hoạt động.
- Worker mới chờ, không tự thay worker đang chạy; cập nhật có thay một tệp HTML chỉ cần bổ sung đúng một tệp, giữ một kho tệp chung, dọn bộ khung cũ sau khi đủ, giữ tiến độ.
- Nút Bắt đầu học hoạt động sau cập nhật và khi offline; không tràn ngang ở 390/768 px.
- Không có lỗi JavaScript trong lượt kiểm tra.

Kiểm tra tự động bổ sung: danh mục đầy đủ/cập nhật, PNG/icon, không phụ thuộc ảnh/font bên ngoài, WAV không im lặng, thiếu dung lượng, hash sai, cache bị hỏng, giới hạn lô/đồng thời, tái sử dụng khi không thể ghi thêm một bản sao, dọn cache đúng phạm vi và bảo vệ bộ khung worker đang chờ. Các nhóm kiểm tra dữ liệu/game/hồ sơ trong CI đều đạt; kiểm tra liên kết, footer và font tiếng Việt đạt.

Bằng chứng cục bộ: `artifacts/offline/results.json`, `ipad-before.png`, `ipad-offline-ready.png`, `phone-offline-ready.png`. Bài kiểm tra: `tests/offline/browser.cjs` và `tests/offline/*.test.cjs`.

## Giới hạn nghiệm thu

- Chưa thử Safari trên iPad vật lý hoặc thao tác thêm ứng dụng vào màn hình chính bằng tay. Không có WebKit cục bộ để mô phỏng engine Safari.
- Chưa phát hành những thay đổi này lên website công khai. Cần đưa bản dựng hoàn chỉnh lên HTTPS trước khi cài thật.
- iPad có thể thu hồi dữ liệu web; yêu cầu lưu bền vững không phải bảo đảm. Cần sao lưu hồ sơ và kiểm tra lại trước chuyến đi.
- Văn bản do người dùng tự thêm không thuộc kho giọng thu sẵn; cần giọng tiếng Anh có sẵn trên iPad. Liên kết liên hệ cần Internet.
