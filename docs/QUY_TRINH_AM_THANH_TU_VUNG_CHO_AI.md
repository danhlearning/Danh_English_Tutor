# Chỉ dẫn tạo âm thanh từ vựng cho AI

Áp dụng cho website Danh English Tutor. Đọc thêm `AGENTS.md` ở gốc dự án và các chỉ dẫn dành riêng cho thư mục đang chỉnh sửa. Ưu tiên yêu cầu cụ thể mới nhất của người dùng khi yêu cầu đó thay đổi quy trình.

## Kết quả cần đạt

Mỗi thẻ từ phát đúng từ hoặc cụm từ tiếng Anh hiển thị trên thẻ bằng giọng **Adam – Dominant, Firm** của ElevenLabs, tốc độ tạo **0,7×**. Mỗi từ hoặc cụm từ có tệp MP3 riêng. Khi được yêu cầu làm mẫu câu, mỗi câu cũng có tệp riêng.

Ghi nhận nguồn và kết quả kiểm tra của từng tệp. Giữ URL, nội dung, bố cục, tiến độ và lượt học đang dở theo phạm vi yêu cầu. Dùng chung cơ chế thẻ, phát âm và tải trước đang có trong dự án.

## 1. Lập danh sách cần làm

1. Xác định chính xác trang, Unit hoặc topic và mọi lối vào mà người học sử dụng. Đọc dữ liệu thực tế của trang, không suy từ tên chủ đề.
2. Lập danh sách đầy đủ theo đúng chữ hiển thị trên từng thẻ. Kiểm tra cả tên viết tắt hoặc tên thẻ khác với tên trong dữ liệu game, ví dụ **Hippo** và **Rhino**.
3. Gộp các từ trùng sau khi chuẩn hóa để biết cần bao nhiêu tệp, nhưng giữ ánh xạ từ từng thẻ tới mục tương ứng. Phân biệt các từ đồng âm hoặc khác nghĩa nếu bối cảnh đòi hỏi cách đọc khác.
4. Rà chính tả, nghĩa, phiên âm và hình minh họa phù hợp nội dung, độ tuổi. Nếu thấy lỗi làm thay đổi nội dung học, xử lý trong phạm vi được giao và kiểm tra các game dùng chung dữ liệu.
5. Nếu yêu cầu bao gồm câu mẫu hoặc phản hồi game, lập danh sách câu riêng và rà các nút nghe, câu trả lời đúng, câu kế tiếp. Giữ dấu câu và các biến thể mà mã phát âm thực tế sử dụng.

## 2. Đối chiếu bản thu có sẵn

- Kiểm tra `docs/content/elevenlabs-recordings.json`, `docs/content/adam-vocabulary-2026-11-08.json`, các danh mục liên quan và tệp âm thật. Đây là điểm xuất phát, vì danh mục có thể đã được bổ sung sau thời điểm tài liệu này được viết.
- Dùng lại bản Adam khi xác minh được bản đó đọc đúng mục, âm rõ và không bị cắt. Tên tệp hoặc tên trong danh mục tự nó chưa chứng minh nội dung âm đúng.
- Chỉ dùng credit cho mục còn thiếu hoặc phát sai. Khi người dùng yêu cầu thu mới toàn bộ hoặc thu lại một mục, thực hiện đúng yêu cầu đó.
- Nếu dùng lại bản Adam ở tốc độ thường, có thể tạo bản 0,7× bằng xử lý giữ cao độ. Nghe kiểm tra kết quả, giữ bản nguồn và ghi rõ nguồn cùng cách xử lý. Bản đã thu hoặc xử lý chậm ở 0,7× được phát ở tốc độ tệp 1×, không làm chậm lần nữa.
- Nếu một tệp được dùng ở nhiều trang, kiểm tra các nơi sử dụng trước khi thay thế. Khi yêu cầu chỉ áp dụng cho một trang, dùng đường dẫn hoặc phiên bản riêng cho trang đó để giới hạn tác động.

## 3. Tạo từng bản thu trên ElevenLabs

1. Mở Text to Speech bằng phiên được phép sử dụng. Chọn giọng **Adam – Dominant, Firm**. Đợt trước đã dùng **Eleven Multilingual v2**.
2. Chọn tốc độ **0,7×** trong ElevenLabs trước khi tạo. Sau thao tác, kiểm tra giá trị hiển thị và tên tệp tải về. Đợt trước tên tệp có `sp70`. Nếu tệp thể hiện tốc độ khác, kiểm tra cài đặt và tạo lại mục đó.
3. Nhập **một từ hoặc một cụm từ**, tạo và tải MP3 của mục đó. Lặp lại cho từng mục. Với mẫu câu, nhập và tạo từng câu riêng. Không ghép nhiều từ hoặc nhiều câu trong một lượt tạo.
4. Ghi ngay từ đích, nội dung đã nhập, thời điểm hoặc tên tệp nguồn, giọng, model và tốc độ. Đối chiếu tệp vừa tải với đúng lượt vừa tạo trước khi chuyển sang mục tiếp theo.
5. Trường hợp phát âm sai hoặc tên ngắn dễ nhầm, tạo lại mục đó và kiểm tra. Nếu dùng cách viết đồng âm để gợi đúng âm, chỉ dùng khi phát âm thực sự trùng trong ngữ cảnh, ghi rõ chữ đã nhập và từ đích trong danh mục, và yêu cầu người nghe kiểm tra khi chưa xác minh được. Ví dụ thử nghiệm trước đây dùng “Thai” để tạo âm /taɪ/ cho **tie** nghĩa là cà vạt. Trường hợp này cần kiểm tra nghe, vì kết quả nhận dạng từ đồng âm không tự xác nhận được ý nghĩa.

Trước khi dùng công cụ tạo âm hoặc tự động hóa trình duyệt, kiểm tra đúng tài khoản, giọng và mức credit đang có. Làm theo các quy tắc cấp phép và công cụ áp dụng trong phiên làm việc.

## 4. Chuẩn bị và ghi nguồn tệp

- Giữ tệp gốc đã tải. Có thể chuẩn hóa âm lượng, đổi định dạng và nén MP3 để phù hợp website, miễn không làm mất đầu/cuối, méo tiếng hoặc thay đổi cao độ. Kiểm tra lại tệp cuối cùng sau xử lý.
- Đặt tệp trong thư mục có phạm vi rõ ràng dưới `shared/answer-audio/`. Dùng tên hoặc ID tương thích với cơ chế tra cứu hiện tại. Nếu sửa một tệp mà trình duyệt có thể giữ cache cũ, dùng tên phiên bản mới hoặc phiên bản URL phù hợp.
- Lưu danh mục có ít nhất các trường từ đích, ID hoặc đường dẫn tệp cuối, nguồn, giọng, model, tốc độ, cách xử lý và trạng thái kiểm tra. Ghi riêng trường hợp nhập chữ khác với chữ hiển thị.
- Một ví dụ đang có là `docs/content/adam-clothes-2026-11-09.json`. Kiểm tra cấu trúc và trạng thái thực tế trước khi dùng lại.
- Các tệp cũ có thể đang phục vụ trang khác. Chỉ thay hoặc loại bỏ tệp sau khi đã xác định đầy đủ nơi sử dụng và phạm vi người dùng cho phép.

## 5. Gắn vào trang và game

1. Dò đường phát âm thật từ thẻ và từ game trước khi chỉnh. Ưu tiên dùng `DanhAnswerSpeech.listen` cho thao tác nghe chủ động và cơ chế chung hiện có cho phát âm đáp án.
2. Bảo đảm đường URL chọn đúng tệp theo từ và phạm vi trang. Kiểm tra cả thẻ được dựng lại, từ cuối danh sách và các tên hiển thị khác dữ liệu gốc.
3. Thẻ từ đã nghe được là một vùng tương tác. Chạm ảnh, chữ, nghĩa, ví dụ hoặc khoảng trống, dùng chuột hoặc Enter/Space đều phát từ đúng một lần. Tránh gắn sự kiện lồng nhau và giữ chức năng riêng của nút hoặc liên kết bên trong.
4. Âm của thẻ học không tự phát lúc mở hoặc khôi phục trang. Giữ hiệu ứng chạm và tiêu điểm bàn phím theo `AGENTS.md`, cùng tùy chọn giảm chuyển động và hiệu ứng âm thanh.
5. Khi có thứ tự lượt học, dùng `DanhGameFlow.prepare` và `DanhAnswerSpeech` khi phù hợp để chuẩn bị im lặng câu hiện tại và tối đa hai câu tiếp theo. Dùng lại tài nguyên đã chuẩn bị khi phát, gộp yêu cầu trùng và giới hạn hàng đợi, tải đồng thời và bộ nhớ.
6. Tôn trọng âm tắt, tiết kiệm dữ liệu, tab ẩn và mất mạng. Lỗi tải trước không chặn học. Dừng tiếng khi rời hoặc ẩn trang, và tránh phát chồng. Game tự chuyển phải đợi giọng đáp án kết thúc.
7. Nếu thay đổi mẫu trang hoặc bộ dựng, cập nhật đường sinh tương ứng để lần dựng sau vẫn giữ lối vào và hành vi đã sửa.

## 6. Nghiệm thu trước khi báo hoàn thành

- **Nội dung âm**. Mỗi MP3 giải mã được, không im lặng hoặc méo, không bị cắt và đọc đúng chữ trên thẻ. Nghe từng tệp nếu có khả năng nghe. Nhận dạng giọng tự động chỉ là đối chiếu bổ trợ, đặc biệt với từ ngắn, từ đồng âm và tên riêng. Nếu không thể nghe hoặc kết quả còn mâu thuẫn, nêu rõ mục cần người dùng nghe.
- **Đường phát thực tế**. Đối chiếu từng thẻ với đúng tên và URL tệp, kiểm tra tốc độ phát thực tế. Khi thay tệp, kiểm tra nội dung được trả về là tệp mới, kể cả khi có cache.
- **Thao tác thẻ**. Thử ít nhất thẻ đầu và cuối, vùng ảnh, chữ và khoảng trống, chuột hoặc chạm và Enter/Space. Xác nhận một thao tác phát một lần, không cộng điểm, lật thẻ hoặc chuyển câu.
- **Vòng học và âm thanh**. Kiểm tra trả lời đúng, tự sửa đúng và câu kế tiếp khi thuộc phạm vi công việc. Kiểm tra không tự đọc khi mở hoặc khôi phục, tải trước im lặng, tắt âm, thao tác lặp, đổi hoặc ẩn tab và lỗi mạng. Với màn hình máy tính bảng có thay đổi liên quan, kiểm tra cả dọc và ngang.
- **Báo cáo**. Nêu số mục, nguồn được dùng lại hoặc số tệp thu mới, các thao tác đã kiểm tra và giới hạn kiểm tra. Gửi đường dẫn trang xem thử nếu người dùng cần. Phân biệt bản trên máy với bản đã đưa lên GitHub.

## Những lỗi đã gặp

- Trong Animals, tệp gắn cho **Hippo** từng trùng với tệp **Teapot**, còn tệp gắn cho **Rhino** từng đọc thành **Snail**. Phải kiểm tra nội dung âm thực tế, không chỉ kiểm tra tên tệp hay URL.
- Trong Clothes, bộ nhận dạng từng nhầm **Tie** với **T-shirt**. Từ ngắn và đồng âm cần kiểm tra nghe bổ sung khi có mâu thuẫn.
- Tốc độ ElevenLabs từng hiển thị 0,7× nhưng tệp tải xuống vẫn mang tốc độ trước đó. Xác minh cả cài đặt lẫn tệp xuất trước khi tiếp tục tạo hàng loạt.
