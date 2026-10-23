# Cải tiến lớp 11 · 22/10/2026

Áp dụng các nguyên tắc game học tiếng Anh, mẫu lớp 6, tranh bút chì màu, giọng đọc đáp án và hồ sơ độc lập. Giữ 10 Unit, URL, bìa riêng, giấy kraft hồng đất, 60 ID từ và 290 ID ngữ pháp cũ.

## Nội dung và trò chơi

- Từ vựng tăng từ 60 lên 80: hai từ mới mỗi Unit, nghĩa và ví dụ riêng theo chủ đề lớp 11.
- Ngữ pháp tăng từ 290 lên 350 mục: thêm 60 tình huống độc lập, sáu mục mỗi Unit, qua chọn/điền/xếp/sửa/viết lại. Không nhân bản cùng câu qua các dạng.
- Gõ từ lưu thứ tự, nháp, lỗi, gợi ý, kết quả và tab. Phân biệt đúng ngay, tự sửa, đúng có gợi ý, đã xem. Nhập rỗng không tính sai; chấm lặp không cộng kết quả/phát âm lại. Sau hai lần sai có quyền xem đáp án.
- Tổng kết chỉ rõ kết quả và cho ôn từ còn khó; danh mục có lối tiếp tục lượt gõ. Không biến mở trang/lật thẻ thành bằng chứng thành thạo.
- Rút hướng dẫn lặp, giữ vùng bấm lớn, bảng màu hồng đất và nét giấy/nét viền; không hiện điều chỉnh âm/chuyển động. Tôn trọng giảm chuyển động của thiết bị.

## Hình ảnh

Đã mở và xem riêng 80 tranh cuối cùng cùng bìa: nghĩa, chữ, hành động, tay/chân, điểm đỡ, màn hình, chai/nắp, quan hệ không gian. Có 52 tranh mới và 28 tranh dùng lại phù hợp nghĩa sau khi xem trực tiếp.

Loại bốn ảnh dự định dùng lại: thả diều cho thể lực; phố có biển chữ; hóa trang tiên cho trang phục truyền thống; rùa đơn thuần cho bảo tồn. Bốn tranh tạo mới phải sửa lại: cánh tay mơ hồ qua tủ kính; thẻ lơ lửng; biểu tượng ở mặt lưng điện thoại; kính lúp phóng sai vị trí. Chỉ các bản đã xem lại và duyệt mới nối vào website.

- Tệp cuối: `grade/lop11/assets/images/pencil/unit<N>/` và các ảnh dùng lại trong lớp 6/7/10.
- Danh sách 80 tệp, mã băm và nhận xét từng ảnh: [grade11-image-review.json](../content/grade11-image-review.json).
- Dùng công cụ tạo ảnh tích hợp (built-in), không dùng CLI/API. Prompt gốc và prompt sửa: [generated-reviewed-candidates.json](../../artifacts/grade11-improvement/generated-reviewed-candidates.json); các tệp được chọn đối chiếu theo key và phiên bản trong danh sách duyệt. Các bản bị loại vẫn nằm trong artifacts, không dùng trên trang.

## Đã kiểm tra

- 19 kiểm tra dữ liệu, ID cũ, cấu trúc lớp 6–12, mã băm ảnh, hồ sơ và WAV không rỗng/không im lặng: đạt.
- Trình duyệt: 10 Unit, giải mã 80 ảnh, 80 mặt sau lật thẻ, bố cục 320/390/1280 px không tràn ngang.
- Chơi đủ 60 câu ngữ pháp mới qua bộ chấm thật; lượt gõ đủ đúng ngay/sai/tự sửa/gợi ý/xem/tổng kết/ôn; nháp và lỗi tiếp tục sau tải lại; giữ lượt chọn từ và phạm vi học kỳ.
- Tắt Web Speech: quan sát sự kiện `playing` và `ended` của Audio thật cho đúng ngay, tự sửa, nghe gợi ý; đọc đúng từ/đáp án. Không tự phát khi mở/khôi phục, không phát lặp do chấm lại. Từ và đáp án mới đã có WAV nội bộ.
- Đổi hai hồ sơ: nháp riêng, quay lại giữ dữ liệu; chặn localStorage/sessionStorage vẫn giữ nháp khi tải lại trong cùng tab.
- Tạo lượt từ ngân hàng 290 câu, nạp bản 350 câu và tiếp tục: giữ ID/thứ tự/lỗi/nháp của lượt cũ.
- Chặn mạng ngoài: font hiển thị thực tế là Nunito nội bộ; kiểm tra tĩnh 322 trang đạt.

Kết quả máy đọc: [browser-results.json](../../artifacts/grade11-improvement/browser-results.json), [continuity-results.json](../../artifacts/grade11-improvement/continuity-results.json). Kiểm thử dùng Edge tự động trên máy tính; chưa nghiệm thu điện thoại vật lý.

## Dựng lại

`node scripts/build-grade11-improvement.cjs` cập nhật nội dung riêng và tham chiếu ảnh đã duyệt, không sinh lại ảnh. Bộ đồng bộ mẫu gọi bước này sau lớp 11; bộ dựng THPT chuyển lớp 11 qua bộ dựng riêng để giữ bổ sung. Âm được thu từ toàn bộ script ngân hàng trong trang ngữ pháp qua `scripts/build-answer-audio-plan.cjs`, rồi tạo phần WAV còn thiếu bằng `scripts/render-answer-audio.ps1`.
