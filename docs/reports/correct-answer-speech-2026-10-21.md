# Giọng đọc sau đáp án đúng

Đã lưu quy tắc xuyên suốt tại `AGENTS.md` và mục âm thanh của `docs/NGUYEN_TAC_GAME_HOC_TIENG_ANH.md`: đúng ngay hoặc tự sửa đúng đều kèm giọng đọc từ/cụm từ tiếng Anh; nhiệm vụ cả câu đọc câu đúng. Tôn trọng tắt âm, không tự đọc khi mở/khôi phục trang hoặc chấm lặp.

## Thay đổi

- API `DanhAnswerSpeech` khởi tạo đồng bộ qua `shared/learner-profile.js`, dùng chung giọng Anh trên thiết bị, cấu hình đọc chậm tiểu học khi có, dừng khi rời/ẩn trang và xử lý thiết bị thiếu API. Đọc được theo dõi tới sự kiện kết thúc/lỗi, có giới hạn chờ khi thiết bị không trả sự kiện.
- Chọn từ lớp 6–12 và ôn học kỳ: bổ sung đọc ở nhánh đúng ngay/tự sửa. Giữ nút nghe lại và không phát lại khi dựng trạng thái câu đã chấm.
- Gõ từ lớp 6–12: đọc ngay khi chấm đúng, tránh mất giọng đọc do bộ hẹn giờ bị thao tác tiếp theo hủy. Bộ đồng bộ mẫu lấy mã lớp 6 đã sửa.
- Ngữ pháp lớp 6–12: nhánh chấm đúng dùng cùng API, hỗ trợ từ, cụm từ và câu; ngữ điệu có nhãn Việt đọc câu mẫu tiếng Anh.
- Phòng ngữ pháp: bổ sung cho bài luyện và câu kiểm tra nhanh trong lý thuyết; tắt âm dừng giọng đang đọc.
- Tiểu học: bổ sung cho bộ game trước đây, lượt dùng từ/ôn của mẫu lớp 1/3/5 và ôn phối hợp lớp 2. Giữ các chỗ đã có giọng trong bộ Game 1–3, bài lớp 2 và bài/ôn lớp 4 để không phát đôi.
- Phản xạ IPA: đáp án đúng được đọc; chỉ chuyển sau khi giọng kết thúc. Thay cấp độ vô hiệu hóa lượt chờ cũ.

Không đổi cách chấm, ID hoặc khóa tiến độ. Không thêm UI âm thanh vào lớp 6–12.

## Kiểm tra

- `tests/young-learner-speech/correct-answers.browser.cjs`: bắt sự kiện speechSynthesis trên Edge, chặn mạng ngoài. Đúng ngay/tự sửa/gõ từ và khôi phục cả bảy lớp 6–12; bốn nhóm ngữ pháp lớp 7; dùng từ lớp 1/3/5; ôn phối hợp lớp 2; game lớp 3 trước đây; IPA chờ đọc xong; phòng ngữ pháp. Xác nhận nội dung tiếng Anh, giọng Anh, không tự phát, không phát đôi khi chấm lặp, tắt âm, thiếu API và pagehide. Bản ghi ở `artifacts/correct-answer-speech/browser-results.json`.
- 30 kiểm tra nội dung, chấm bài, phiên học, cách ly hồ sơ và cấu trúc tiểu học đạt.
- Kiểm tra glyph Nunito thật trên 11 trang, hộp hồ sơ và footer khi chặn mạng ngoài đạt; kiểm tra font/UTF-8 và liên kết 238 trang đạt.
- Kiểm tra cú pháp và khoảng trắng cho phần sửa đạt.

Bài hồi quy rộng cũ `tests/young-learner-speech/browser.cjs` chưa chạy hết: dừng ở trang Trái cây lớp 2 vì ảnh Banana che vùng bấm nút nghe Apple. Không báo bài này đạt; các thay đổi giọng đọc mới được kiểm tra bằng bài riêng ở trên. Lỗi bố cục trang Trái cây nằm ngoài các tệp giọng đọc sửa trong lượt này.

Giọng đọc trong bài kiểm tra được mô phỏng để xác nhận chính xác thời điểm/nội dung; chưa nghe giọng thực tế bằng tai hoặc thử trên điện thoại vật lý. Giọng thực tế phụ thuộc trình duyệt và giọng Anh cài trên thiết bị. Chưa triển khai lên website chính thức.
