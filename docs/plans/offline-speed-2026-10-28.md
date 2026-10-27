# Tăng tốc tải kho offline

- Giữ nguyên mục tiêu học, game, cách chấm, hỗ trợ khi sai, điều kiện hoàn thành và tiến độ; đây là thay đổi cách vận chuyển tài nguyên.
- Đổi giọng PCM WAV sang MP3 mono 48 kb/s từ chính bản gốc, giữ bản WAV nguồn. Bản học mới ưu tiên MP3; blob chuẩn bị âm dùng đúng kiểu dữ liệu phản hồi. Kiểm tra phát tiếng, độ dài và lượt dở.
- Gộp tài nguyên thành gói nhị phân khoảng 2 MiB. Danh mục ghi gói/vị trí/hash của từng tệp. Worker kiểm tra cả gói và từng tệp trước khi lưu; dùng lại tệp đã lưu theo hash, vẫn tải tiếp được.
- Bộ nhớ gói giới hạn ba gói và gộp yêu cầu cùng gói. Dừng khi ẩn/mất mạng; lỗi gói có thể tải tệp lẻ, lỗi hash không được coi là hoàn tất.
- Tải rõ tiến độ theo số tệp và dung lượng; không tự phát tiếng, ghi điểm hay thay đổi lượt.
- Nghiệm thu: dung lượng trước/sau; số yêu cầu tải với độ trễ mô phỏng; MP3 offline/range; dừng/tải tiếp; hash sai, thiếu gói, thiếu dung lượng; cập nhật từ bản trước không xóa hồ sơ; điện thoại/iPad mô phỏng. Chưa thử iPad vật lý.
