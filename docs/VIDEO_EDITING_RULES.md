# Quy tắc dựng video của người dùng

Áp dụng khi dựng hoặc chỉnh sửa video cho người dùng trong dự án này. Đây là quy tắc cho sản phẩm video, không thay đổi giao diện hay thương hiệu của website trong dự án.

## Duyệt hình trước khi dựng video

- Ngoại lệ cho bài City Animals: người dùng yêu cầu trực tiếp “Không cần tôi duyệt hình, bạn tự kiểm tra lại hình và làm video”. Tự kiểm tra và sửa lỗi hình trước khi dựng, không chờ xác nhận duyệt cho bài này; ghi kết quả kiểm tra trong tài liệu bài. Các yêu cầu khác như không đánh số góc phải phía trên vẫn áp dụng.

- Với video có hình minh họa, bắt buộc xuất một trang HTML có toàn bộ hình kèm số để người dùng xem và duyệt trước khi ghép hình vào video. Không dựng hoặc xuất bản video mới với hình chưa được người dùng duyệt rõ ràng.
- Trang duyệt là một tệp HTML mở được trên máy, ưu tiên nhúng hình và font để có thể xem độc lập. Mỗi hình có số ổn định, tên/ngữ cảnh ngắn và khả năng mở lớn; không cần khung nhập phản hồi trên trang. Người dùng gửi số hình cần xem lại và nhận xét trực tiếp trong chat.
- Số trên trang duyệt đặt cạnh tên hoặc ở góc trên bên trái của thẻ, ngoài nội dung hình. Đây là số để duyệt hình, không đưa vào video; quy tắc không đánh số góc trên bên phải video vẫn giữ nguyên.
- Trước khi gửi duyệt, tự kiểm tra logic hình: hướng đồ vật (đầu/cán bàn chải, vòi nước...), tư thế và cách cầm, tay/ngón tay, hành động có đúng câu học hay không, trạng thái trước/sau và quan hệ nguyên nhân–kết quả. Kiểm tra bố cục đẹp không thay thế bước kiểm tra logic.
- Nếu người dùng yêu cầu xem lại hình nào, giữ nguyên số của hình đó, tạo bản sửa riêng và cập nhật trang duyệt để người dùng duyệt lại. Giữ bản trước để đối chiếu; không tự coi các hình khác hoặc việc người dùng chưa trả lời là đã duyệt.
- Chỉ tiếp tục dựng video sau khi có xác nhận duyệt rõ ràng cho các hình sẽ sử dụng. Ghi nhận phản hồi và trạng thái duyệt trong tài liệu của bài.
- Phản hồi đã ghi nhận ở Caring for Earth: hình tiết kiệm nước có lỗi hướng bàn chải theo nhận xét của người dùng; phải xem lại hình này và gửi duyệt trước khi dùng trong bản video tiếp theo.

## Phản hồi và giải đáp

- Không dùng khung chữ lớn hoặc lớp chữ nổi che câu hỏi, câu giải thích hay các lựa chọn.
- Đặt phản hồi ngắn như “Sai nhé”, “B. is — đúng” ở vùng bên dưới nội dung bài, tách khỏi phụ đề. Đây là nhãn phản hồi, không phải footer cố định.
- Khi sai: nhãn phản hồi màu đỏ, phát sound effect wrong một lần đúng nhịp lời đọc; nhãn zoom nhẹ khoảng 10–15%, nhích lên khoảng 5–10 px rồi trở về. Câu hỏi và lựa chọn vẫn nhìn thấy.
- Khi giải đáp: phóng trực tiếp keyword đã thống nhất ngay trong câu gốc khoảng 60–70%, tô nền nhấn và gạch chân rõ và phát sound effect correct khi giọng đọc nói đến cụm đó. Ví dụ: “The teacher”, “The number”. Không sao chép chủ ngữ sang hộp nổi che nội dung.
- Khi đáp án đúng được công bố: lựa chọn đúng sáng xanh, nhãn xác nhận bên dưới zoom nhẹ và phát sound effect correct.
- Dùng cùng một logic phản hồi trong mọi câu của video và trong các video tiếp theo.
- Giữ trạng thái phản hồi đủ để đọc. Nếu người dùng yêu cầu thêm thời gian, kéo dài nhãn phản hồi hoặc điều chỉnh khoảng nghỉ đúng vị trí; không đổi thành một khung chữ lớn đè lên giao diện.

## Bố cục và âm thanh mặc định

- Video dọc 9:16, 1080 × 1920, 30 fps.
- Với chuỗi hiện tại, giọng đọc 1,2× so với file gốc, giữ cao độ; hướng dẫn mới của người dùng được ưu tiên.
- Không có heading cố định hoặc footer cố định. Nội dung chính và logo được giữ rõ ràng. Không có phụ đề.
- Không bao giờ đặt số thứ tự, số câu, số bài hoặc bộ đếm tiến trình ở góc trên bên phải video (ví dụ “01 / 05”). Áp dụng cho mọi video dựng hoặc chỉnh sửa từ nay, kể cả khi dùng lại mẫu cũ.
- Dùng logo chính thức của thương hiệu người dùng chọn, cố định ở góc video và xuyên suốt. Logo không chạy theo camera zoom.
- Giữ camera, nền, khung câu hỏi, các dòng không phải keyword và các ô đáp án đứng yên. Không zoom toàn giao diện, không pan/drift, không lắc hoặc bật nảy các lựa chọn.
- Chỉ zoom keyword đã thống nhất và nhãn phản hồi đúng/sai. Keyword lớn lên một lần khoảng 0,2–0,3 giây, rồi giữ kích thước và highlight trong phần giải thích; không liên tục phóng to rồi thu nhỏ. Các câu khác dùng animation xuất hiện một lần theo quy tắc bên dưới.
- Ưu tiên keyword như “The teacher”, “The number” đủ lớn, nổi bật, không che các dòng còn lại. Có thể xuống dòng câu từ trước để dành chỗ cố định cho keyword, tránh đẩy các chữ khác khi zoom.
- Đoạn giới thiệu bài vẫn có thể zoom một lần vào vùng bài cụ thể theo yêu cầu của người dùng; không thêm zoom dao động toàn khung.
- Chỗ trống là một gạch dài liền được vẽ trực tiếp, không phải ba ký tự gạch dưới rời.
- Sound effect rõ, ngắn, gắn với đúng/sai và từ khóa; giọng đọc vẫn là lớp chính. Không tự khẳng định âm thanh đang trending khi chưa xác minh.
- Giữ các bản xuất cũ để so sánh; sửa từ bản người dùng chỉ định.

## Kiểm tra trước khi giao

- Kiểm tra góc trên bên phải không có số thứ tự hoặc bộ đếm tiến trình.
- Xem các khung ở đỉnh zoom: câu hỏi, từ khóa, lựa chọn và logo không bị che hoặc cắt.
- Kiểm tra phản hồi đúng/sai, vị trí nhãn, nhịp sound effect và khoảng nghỉ giọng đọc.
- Kiểm tra file hoàn chỉnh: hình/âm thanh giải mã được, đúng 9:16 và thời lượng.

## Chữ theo câu và animation xuất hiện

- Mặc định chữ hiện theo từng câu hoặc ý trọn vẹn khi giọng đọc bắt đầu câu/ý đó. Không chạy từng từ hoặc gõ từng ký tự theo lời đọc.
- Bỏ phụ đề. Nội dung chính cần thể hiện ý của lời đọc, không có dải phụ đề lặp lại phía dưới.
- Luân phiên nhiều kiểu xuất hiện: trượt trái, trượt phải, trượt lên nhẹ, fade, mở từ trên xuống, mở từ giữa. Không dùng cùng một hiệu ứng cho tất cả câu.
- Animation xuất hiện chỉ chạy một lần, khoảng 0,25–0,35 giây; sau đó câu đứng yên đủ để đọc. Đây là chuyển động của chữ, không phải zoom/pan toàn camera.
- Câu hỏi hiện trọn vẹn trong một lượt animation rồi giữ nguyên. Các lựa chọn hiện nguyên ô chữ khi đọc đến lựa chọn đó, dùng hiệu ứng nhẹ khác nhau, sau đó đứng yên.
- Câu hỏi và lựa chọn đã hiện được giữ lại trong lúc phản hồi và giải thích. Không dùng khung chữ lớn che nội dung.
- Keyword đã thống nhất như “The teacher”, “The number” vẫn phóng lớn một lần, highlight rõ và giữ trong phần giải thích, kèm âm correct. Phản hồi wrong/correct vẫn nằm bên dưới.
- Căn đầu câu/ý theo voice over. Chữ lấy từ kịch bản gốc đã duyệt; hướng dẫn trực tiếp mới nhất được ưu tiên hơn các bản trước.
