# Colors nét chì, bổ sung giọng đọc và đồng bộ website

## Thay đổi

- Colors giữ đủ 13 từ/IPA/nghĩa/ví dụ, IDs và khóa tiến độ. 13 minh họa SVG từ bộ đồ vật sẵn có được dựng lại với đường viền/mảng gạch nét chì; không chữ, script, bộ lọc hoặc animation bên trong hình. Có giấy kem và dấu màu trên thẻ; ảnh dùng chung ở thẻ, ghép chữ và viết câu. Bộ dựng `scripts/build-colors-pencil.cjs`, manifest `docs/content/colors-pencil-manifest.json`. Đây là chỉnh sửa đồ họa vector gốc, không dùng dịch vụ sinh ảnh.
- Bỏ mã game Colors cũ chạy riêng; ghép chữ/chọn/gõ dùng DanhLesson/DanhLetterLadder, câu dùng DanhLegacyGame4, giọng chung DanhAnswerSpeech. Giữ tự sửa, lựa chọn từ và lối ôn. Khung iPad và bàn phím kiểu iPadOS dùng chung.
- Kế hoạch âm thanh nay gồm cả chuỗi đáp án/ví dụ/câu của topic cũ, thay vì chỉ tên từ. Bổ sung 288 WAV gốc và MP3 tương ứng bằng giọng Windows Zira đã cài, nén MP3 mono 16 kHz/48 kbps. Tổng 4.871 mục trong kế hoạch đều có tệp; đủ 20 đáp án Clothes, gồm ba tệp 404 đã quan sát online.
- Đồng bộ những sửa đổi đã kiểm tra trước đó: tải ảnh nhỏ và MP3 theo nhóm thẻ, bỏ tải kho/trang offline, gỡ worker cũ an toàn, khung chơi iPad và bàn phím web. Bản phát hành được chuẩn bị từ main sạch, chỉ lấy nguồn website/game/tài liệu liên quan; không lấy video, tệp tạm hoặc môi trường công cụ.

## Kiểm tra trước phát hành

- 148 kiểm tra lõi nội dung/ảnh/âm thanh/hồ sơ đạt; thêm sáu kiểm tra tích hợp Ghép chữ đạt và đưa vào CI. 13 kiểm tra media/gỡ offline đạt.
- Cú pháp 156 tệp JavaScript hợp lệ; liên kết/ID 324 trang, font nội bộ 324 trang và chân trang 316 trang đạt.
- Animals/Colors: nghe cả thẻ đầu/cuối, bàn phím, ghép chữ/chọn/gõ, sai rồi tự sửa, chuyển game, tiến độ đã lưu và khổ 320/390/1280 px đạt.
- Colors trên iPad giả lập: 13 ảnh tải/giải mã được; trả lời đủ 13 câu bằng bộ chấm chung và nghe tệp thật tới kết thúc; câu đầu gõ bằng bàn phím web, đúng số điểm; dọc/ngang không tràn. Không lỗi JS hoặc thiếu tệp trong lượt kiểm tra này.
- Khung iPad chung: 10 trạng thái/bố cục đạt, sửa ở con trỏ/chữ hoa/số/dấu, lưu nháp, bàn phím ngoài, vuốt không trượt và nội dung dài. Chưa thử iPad/Safari vật lý.

Bằng chứng tại `artifacts/colors-pencil-sync/`, `artifacts/animal-color-sync/` và `artifacts/ipad-game-frame/`. Kiểm tra công khai sau phát hành ghi riêng vào kết quả audit, không suy nghiệm thu local thành online.
