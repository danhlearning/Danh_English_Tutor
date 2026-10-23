# Body Parts lớp 2: ảnh cùng nhân vật

- Theo yêu cầu mới nhất, giữ nhân vật bé trai tóc nâu, áo xanh trong Head và Nose làm mẫu; giữ các ảnh đầu đã phù hợp, thay 18 ảnh: Mouth, Finger, Face, Forehead, Eyebrows, Eyelashes, Cheeks, Chin, Lips, Tongue, Chest, Back, Elbow, Wrist, Thumb, Toes, Ankle, Heel.
- Tạo bằng imagegen tích hợp, dùng trực tiếp Head/Nose làm tham chiếu nhân vật và nét chì màu. Không có chữ trong tranh; tên và nghĩa vẫn là văn bản riêng.
- Ảnh mới lưu trong `grade/lop2/assets/images/pencil/bodyparts/<id>-boy-v2.webp`. Danh sách đường dẫn, dung lượng và prompt cuối: `artifacts/bodyparts-pencil-fix/final-assets.json`.
- Đã mở xem ảnh cũ, từng ảnh tạo mới và hai bảng kiểm tra WebP cuối. Finger khoanh ngón trỏ, Thumb khoanh đúng ngón cái trên bàn tay có năm ngón; Toes có năm ngón mỗi bàn chân, khoanh riêng nhóm ngón; Ankle đánh dấu khớp cổ chân và Heel đánh dấu gót. Bản Thumb sinh lần đầu có ngón thừa đã loại, sửa bằng cách giữ bàn tay năm ngón của Finger và chỉ chuyển vị trí đánh dấu.
- Ánh xạ ảnh dùng chung cho từ vựng và cả bốn game. Giữ URL trang, 32 ID từ, câu/đáp án, bộ chọn từ và quy tắc chấm. Đổi phiên bản script ảnh và script bài học để tải bản mới.
- Khi kiểm tra phát âm, phát hiện 87 tệp dự phòng còn thiếu trong nhóm 96 từ/câu Body Parts. Đã bổ sung vào kế hoạch âm thanh và dựng WAV tiếng Anh nội bộ; phần viết câu dùng `DanhAnswerSpeech` để có dự phòng và dừng tiếng khi chuyển phần. Không có đáp án mới hoặc thay đổi cách chấm.

## Kiểm tra đã thực hiện

- Edge mô phỏng 320, 390, 768, 1280 px, mạng ngoài bị chặn: 32 ảnh tải đủ, đúng 18 đường dẫn ảnh mới, không tràn ngang, không có lỗi trang/tài nguyên. Đã xem ảnh chụp thẻ Finger trên điện thoại, Thumb/Toes và game viết câu.
- Cả bốn game hiển thị ảnh qua ánh xạ chung. Chọn Finger/Thumb/Toes, tải lại vẫn giữ đúng bộ từ.
- Trắc nghiệm, chính tả và viết câu: kiểm tra đúng ngay và tự sửa đúng với Web Speech vô hiệu hóa; thu sự kiện media thật `playing`/`ended`, không mock phát giọng. Viết câu đọc đủ câu, kết quả đúng ngay/sửa đúng tách biệt; tải lại im lặng.
- `node scripts/check-vietnamese-fonts.cjs` đạt 238 trang. Kiểm tra glyph thực tế ở nghĩa tiếng Việt của thẻ Body Parts bằng font Nunito nội bộ khi mạng ngoài bị chặn.
- Kiểm tra cú pháp và diff đạt. Chưa thử trên thiết bị vật lý.

Kết quả: `artifacts/bodyparts-pencil-fix/qa-results.json`, `sentence-audio-results.json`; ảnh kiểm tra tại cùng thư mục.
