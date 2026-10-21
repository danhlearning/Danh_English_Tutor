# Sửa giọng đọc lớp 7 trên trình duyệt đang dùng

## Nguyên nhân và cách sửa

Lần kiểm tra trước chỉ mô phỏng `speechSynthesis.speak`, chưa xác nhận âm thanh được phát. Tab người dùng còn nạp phiên bản script cũ. Bản mới có tệp WAV nội bộ dự phòng khi trình duyệt không có Web Speech, chưa có giọng Anh hoặc giọng hệ thống báo lỗi. Đổi phiên bản URL script trên các trang đang dùng để nhận bản sửa.

`DanhAnswerSpeech` chọn giọng hệ thống nếu khả dụng, nếu không phát tệp theo khóa nội dung. Âm thanh chỉ được tải khi có thao tác học, không tải toàn bộ bộ âm và không tự phát lúc mở trang. Dừng khi tắt âm, đổi hoạt động hoặc rời/ẩn trang. Từ/cụm từ có cùng nội dung dùng chung tệp. Giữ nguyên URL bài học, ID và khóa tiến độ.

Bộ tệp có 3.794 câu/từ/cụm từ phân biệt; 339 mục dùng ở lớp 7, gồm đủ 96 mục từ. Nguồn là giọng tổng hợp Microsoft Zira Desktop tiếng Anh Mỹ, tốc độ -2, PCM mono 16 kHz, 16-bit. Đây là giọng dự phòng en-US, không phải mẫu phát âm en-GB. Kịch bản và danh sách ở `scripts/build-answer-audio-plan.cjs`, `scripts/render-answer-audio.ps1`, `artifacts/correct-answer-speech/audio-plan.json`. Tệp ở `shared/answer-audio/`.

Đã bổ sung cùng đường dự phòng cho nút nghe/luyện từ lớp 6–12, bộ Game 1–3 tiểu học, phần nghe của mẫu tiểu học và bài/ôn lớp 4. Không nhân đôi giọng đọc ở nơi đã có giọng hệ thống.

## Bằng chứng kiểm tra

- Trực tiếp trên tab người dùng: tiếp tục câu 2/8, chọn “taking photos”; DOM ghi nhận `answerSpeechMode=audio`, `answerSpeechState=playing`, `answerSpeechText=taking photos`. Giữ nguyên hồ sơ và lượt học.
- `audio-fallback.browser.cjs`: vô hiệu hóa Web Speech, dùng HTMLAudio thật; bảy lớp 6–12 đều có `playing` rồi `ended`, không thiếu tài nguyên. Lớp 7 thêm tự sửa đúng, nghe lại và không tự phát sau tải lại. Chặn mạng ngoài.
- `audio-files.test.cjs`: đủ 3.794 WAV hợp lệ và tín hiệu PCM không im lặng; kiểm tra đủ 96 từ lớp 7.
- `correct-answers.browser.cjs`: đúng ngay/tự sửa/gõ từ, ngữ pháp, ôn và khôi phục theo kịch bản; giọng hệ thống mô phỏng và thử tệp thực khi thiếu API.
- 31 kiểm tra dữ liệu/chấm bài/hồ sơ/âm thanh đạt. Glyph Nunito thực tế ở 11 trang/hộp hồ sơ/footer với mạng ngoài bị chặn đạt.

Đã xác nhận trình duyệt bắt đầu/kết thúc phát media thật; chưa ghi âm hoặc nghe bằng tai qua thiết bị của người dùng. Không triển khai lên website chính thức trong lượt này.
