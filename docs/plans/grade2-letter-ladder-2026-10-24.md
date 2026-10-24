# Thử nghiệm ghép chữ lớp 2

## Điều chỉnh được duyệt: tăng độ khó ngầm

Các từ được trộn lại giữa các lần ôn, không giữ thứ tự cố định cho cả lượt. Khi có từ khác phù hợp, không để từ cuối vừa làm lặp ngay ở câu tiếp theo. Vẫn đi qua các từ trong nhóm trước khi giảm thêm hỗ trợ; không luyện liên tục hết các mức của riêng một từ. Thứ tự đã trộn được lưu, tải lại không trộn lại lượt dở.

Không hiển thị nhãn nấc, số chữ còn thiếu theo cấp, lộ trình độ khó hoặc lời mời thử thách. Vào game là mở từ hiện tại. Sau từ cuối của một nấc, thao tác Từ tiếp tự mở nấc tiếp theo; không dừng ở bảng tổng kết hay nút chọn độ khó. Tự chuyển sang tab Chính tả khi đến lượt gõ cả từ. Chỉ tổng kết sau khi hoàn thành toàn bộ lượt. Lượt dở và cơ chế chấm giữ nguyên.

- Phạm vi: chỉ các bài từ vựng lớp 2, thay giao diện Game 1 lật thẻ bằng Ghép chữ. Các lớp khác và mục Luyện từ vựng theo kỹ năng giữ nguyên.
- Mục tiêu: nhận ra vị trí chữ trong từ, nhớ dần cách viết và tự truy xuất cả từ khi giảm hỗ trợ.
- Cách chơi: một nhóm tối đa tám từ từ bộ đã chọn đi qua nấc thiếu một, hai, ba chữ. Bấm các chữ cho sẵn vào ô trống; bấm ô đã điền để trả chữ. Các chữ trùng nhau có thẻ riêng. Khoảng trắng, dấu nối và dấu nháy luôn giữ nguyên. Từ quá ngắn bỏ qua nấc không đủ chữ, không tạo độ khó giả.
- Mỗi từ chỉ xuất hiện một lần ở mỗi nấc. Các nấc tăng lượng cần nhớ và vị trí che; không chỉ đổi thứ tự đáp án. Có tổng kết từng nấc, rồi chủ động sang nấc tiếp. Sau nấc ba, chuyển sang tab Game 3 Chính tả để gõ toàn bộ chính các từ vừa luyện, không còn chữ cho sẵn. Game Chính tả riêng trước đây vẫn truy cập được, giữ nguyên lượt cũ.
- Chấm đúng theo chính tả gốc, không phân biệt hoa/thường, chuẩn hóa khoảng trắng và dấu nháy cong. Không bỏ dấu nối hay các chữ trong từ. Nhập thiếu/rỗng không tính sai. Nhấn lặp cùng đáp án sai không tăng số lần sai; đáp án đã chấm không ghi điểm hay phát âm lại.
- Sai được gỡ chữ và thử lại. Gợi ý nhắc chữ cần điền hoặc chữ đầu của từ; xem mẫu mở sau một lần thử hoặc xin gợi ý. Tách đúng ngay, tự sửa, dùng gợi ý, đã xem. Không gọi hoàn thành có hỗ trợ là thành thạo.
- Mỗi lần trả lời đúng hoặc tự sửa đúng đọc từ tiếng Anh qua DanhAnswerSpeech và WAV dự phòng; nghe lại chủ động có nút loa. Không tự đọc khi mở hoặc tải lại bài. Dừng âm khi đổi tab/rời trang và tôn trọng tùy chọn âm đã lưu/giảm chuyển động của thiết bị.
- Lưu riêng qua DanhLearners.storage bằng `danh-g2-letter-ladder-<topic>-v1`: bộ chọn, thứ tự từ, vị trí khuyết, thứ tự chữ, chữ đã đặt, nháp tự gõ, kết quả và nấc đang chơi. Không đổi ID từ, URL bài, tiến độ lớp khác hoặc khóa lật thẻ/chính tả cũ. Khi đổi bộ chọn, giữ lượt trước trong trường previous trước khi bắt đầu nhóm mới.
- Nghiệm thu: từ có chữ trùng/từ ngắn/cụm từ, tăng nấc, nối sang tự gõ, đúng/sai/gợi ý/xem mẫu, thao tác lặp, nháp qua tải lại, đổi hồ sơ, âm thanh media thực tế khi tắt Web Speech, không tự đọc, giảm chuyển động, Nunito có dấu và bố cục điện thoại/máy tính. Không tạo hoặc thay ảnh trong đợt này.
