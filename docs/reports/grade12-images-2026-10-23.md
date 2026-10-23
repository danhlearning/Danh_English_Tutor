# Tranh bút chì màu và giao diện lớp 12 · 23/10/2026

Lớp 12 có đủ 80 tranh từ vựng: 61 tranh tạo mới bằng công cụ tạo ảnh tích hợp, 19 tranh dùng lại sau khi mở xem từng tệp. Giữ bìa riêng, tông chàm, chất giấy kraft và cấu trúc lớp 6/11. Không đổi từ, ví dụ, URL, ID, cách chấm hay khóa tiến độ.

## Ảnh cuối cùng

- Tranh mới: `grade/lop12/assets/images/pencil/unit<N>/<ID>-v<phiên bản>.webp`, 768 × 768 px. Hai bản v2 dùng cho `9/8` và `10/3`; các bản v1 bị loại chỉ giữ trong vùng kiểm tra.
- Tranh dùng lại có đường dẫn nội bộ trong lớp 6/7/10/11. Danh sách đủ 80 tệp và mã băm: [grade12-image-review.json](../content/grade12-image-review.json).
- Prompt cuối từng từ và cảnh: [image-plan.json](../../artifacts/grade12-images/image-plan.json). Prompt sửa màn hình thiết bị, nguồn tham chiếu và các lần tạo: [generated.json](../../artifacts/grade12-images/generated.json). Dùng công cụ tích hợp, không dùng CLI/API để tạo ảnh; chỉ chuyển kích thước và định dạng bằng bộ tối ưu nội bộ.
- Nhận xét từng ảnh: [visual-review-notes.json](../../artifacts/grade12-images/visual-review-notes.json). Đã mở riêng từng ảnh cuối cùng, đối chiếu nghĩa, hành động, nhân vật, vật dụng, tay/chân, số lượng, cấu tạo, điểm đỡ, quan hệ không gian và chữ. Nghĩa Việt nằm ngoài ảnh.

Loại năm ảnh định dùng lại: máy tái chế cho “sort”; trường học cho “urbanisation”; rùa bơi đơn thuần cho “endangered species”; một bài giải cầu cho “transferable skill”; lớp học có nét giống chữ trên bảng cho “learning opportunity”. Tạo riêng các cảnh rõ hơn. Hai ảnh mới được thay: phản chiếu khác tư thế trong “self-assessment”; nét giống ký tự nhỏ trên màn hình “upskill”. Đã mở xem lại hai bản thay thế.

## Giao diện

Khung tranh vuông, kích thước ảnh, lưới thẻ, font Nunito, nút nghe và các tab dùng cùng mẫu với lớp 6/11. Mặt trước lật thẻ giữ từ tiếng Anh; tranh chỉ nằm ở mặt nghĩa. Từ vựng, lật thẻ, chọn từ, gõ từ, ngữ pháp và ôn học kỳ giữ cách chơi hiện có. Viền danh sách ôn gõ đồng bộ nét đứt với lớp 11, màu chàm riêng. URL script dữ liệu và CSS đã đổi phiên bản để tab tải bản mới.

## Đã kiểm tra

- 11 kiểm tra dữ liệu, cấu trúc lớp 6–12, WAV, 80 mã băm ảnh và bảo toàn ID: đạt. Dựng lại giữ nguyên đầu ra và đủ 80 đường dẫn ảnh khác nhau.
- Trình duyệt Edge tự động: giải mã đủ 80 ảnh 768 × 768 và 80 mặt nghĩa thẻ; mặt trước không có ảnh. Không lỗi trang hoặc tài nguyên thiếu.
- Danh mục và 10 Unit ở 320/390/834/1280 px không tràn ngang. Đã mở xem ảnh chụp thẻ từ trên điện thoại, lưới từ trên máy tính và lật thẻ sau tích hợp.
- Khi chặn mạng ngoài, glyph thực tế của vùng gõ từ là Nunito nội bộ. Kiểm tra tĩnh font và liên kết/ID trên 322 trang: đạt.
- Giữ nháp sau tải lại, hai hồ sơ độc lập, tiếp tục lượt ngữ pháp 290 → 350 câu và phiên khi bộ nhớ bị chặn. Tắt âm đã lưu và giảm chuyển động được tôn trọng, không hiện điều chỉnh.
- Tắt Web Speech: quan sát Audio thật `playing` và `ended` cho đúng ngay và tự sửa đúng, đúng từ tiếng Anh. Mở trang và lật thẻ không tự đọc.

Bằng chứng: [browser-results.json](../../artifacts/grade12-images/browser-results.json), [continuity-results.json](../../artifacts/grade12-improvement/continuity-results.json), [preferences-results.json](../../artifacts/grade12-improvement/preferences-results.json). Ảnh chụp giao diện lưu cùng thư mục `artifacts/grade12-images/`. Chưa nghiệm thu trên điện thoại vật lý.

## Dựng lại

`node scripts/build-grade12-improvement.cjs` đọc danh sách đã duyệt để giữ đường dẫn tranh khi dựng lại hoặc đồng bộ mẫu. Không tự tạo lại ảnh. `scripts/prepare-grade12-images.cjs` dựng bộ prompt; `scripts/optimize-grade12-images.cjs` tối ưu các đầu ra đã tạo vào vùng kiểm tra; `scripts/install-grade12-reviewed-images.cjs` chỉ cài tệp có nhận xét duyệt. Không chạy bước cài nếu chưa mở xem các tệp mới.
