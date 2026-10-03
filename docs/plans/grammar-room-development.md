# Kế hoạch phát triển Phòng luyện tập ngữ pháp

Ngày lập và tự rà soát: 03/10/2026.

Trạng thái cập nhật 03/10/2026: các chức năng của sáu đợt đã được triển khai thành phòng có 25 bài. Chi tiết bản hiện tại và giới hạn kiểm tra tại [Phòng ngữ pháp](../GRAMMAR_ROOM.md). Phần hiện trạng và tự kiểm tra bên dưới ghi nhận thời điểm lập kế hoạch, trước khi triển khai. Phạm vi là phòng ngữ pháp trong Luyện theo kỹ năng. Phần ngữ pháp theo Unit của các lớp vẫn phục vụ lộ trình học theo lớp.

## 1. Mục tiêu và hiện trạng

Mục tiêu: giúp người học hiểu một cấu trúc, luyện một lượt ngắn, nhận biết lỗi của mình và ôn lại đúng phần còn yếu. Ưu tiên điện thoại, nội dung chính xác và cách chấm minh bạch.

Đã kiểm kê dữ liệu thực tế từ bốn tệp bài luyện:

| Chuyên đề hiện có | Dữ liệu | Thực trạng |
| --- | ---: | --- |
| 6 thì cơ bản | 180 câu; 30 câu/thì | Có sáu lựa chọn thì; một lượt chạy hết câu của thì |
| Mệnh đề quan hệ | 60 câu | Chạy lần lượt cả bộ |
| Câu điều kiện | 60 câu | Chạy lần lượt cả bộ |
| Cấu tạo từ | 60 câu | Chạy lần lượt cả bộ |
| Tổng | 360 câu | Chủ yếu điền từ/cụm từ |

Các vấn đề xác nhận trong mã:

- Sai lần đầu đã hiện đáp án và giải thích, khóa ô nhập; người học chưa có cơ hội tự sửa.
- Bốn bộ luyện chưa lưu tiến độ hay lịch ôn. Các nhãn độ khó nằm trong câu hỏi, chưa có bộ lọc thống nhất.
- Chấm bằng chữ thường và so sánh chuỗi đáp án, tách biến thể bằng dấu `/`; chưa xử lý thống nhất khoảng trắng, dấu nháy hoặc yêu cầu định dạng câu.
- Phần kết thúc luyện thì ghi cố định “10 câu” dù mỗi thì hiện có 30 câu.
- Trang danh mục có bốn thẻ chuyên đề, nhưng chưa có “Tiếp tục học”, “Ôn lỗi sai” hay kết quả theo cấu trúc.
- Giao diện bài luyện thì dùng câu hỏi 18 px. Cần nâng lên chuẩn chữ lớn đã áp dụng cho bài luyện trên điện thoại.
- Footer và điều hướng của các trang gốc chưa thống nhất. Trang danh mục đang có footer riêng; nhiều trang bài tập thiếu lối về danh mục.

Căn cứ kiểm kê: `grammar-index.html`; bốn tệp `assets/js/pages/*-practice.js`; `tense-practice.html`; CSS tương ứng; bộ chọn lượt và trải nghiệm ngữ pháp lớp 7. Kiểm kê này xác nhận cấu trúc và số câu, chưa phải kết luận rằng toàn bộ đáp án đã đúng.

## 2. Phạm vi và cấu trúc sản phẩm

### Luồng học

Trang chủ → Luyện theo kỹ năng → Phòng luyện tập ngữ pháp → chọn chuyên đề/cấp độ → đọc lý thuyết ngắn hoặc luyện ngay → lượt 10 câu → kết quả → ôn lỗi sai hoặc luyện tiếp.

Cho phép luyện ngay; lý thuyết là trợ giúp sẵn có, không phải bước bắt buộc. Người mới có thể chọn bài nền tảng được đề xuất. Bài kiểm tra định hướng chỉ bổ sung sau khi đủ ngân hàng câu hỏi, không khóa quyền tự chọn bài.

### Trang danh mục

Giữ ngôn ngữ hình ảnh và bố cục thẻ đang dùng. Bổ sung theo thứ tự:

1. Tiêu đề và nút quay về Luyện theo kỹ năng.
2. “Tiếp tục học” nếu có lượt dở; “Ôn lỗi sai” nếu có lỗi cần ôn.
3. Tìm chuyên đề và lọc Nền tảng / Vận dụng / Thử thách.
4. Thẻ chuyên đề: tên, cấu trúc sẽ học, tiến độ và hai lối vào Lý thuyết / Luyện tập.
5. Footer chung của Danh English Tutor.

Khi chưa có dữ liệu học, hiển thị lời mời bắt đầu ngắn gọn. Tiến độ dùng lời rõ nghĩa như “Đã luyện 2/6 thì”; không gắn nhãn “thành thạo” chỉ vì đã mở bài hoặc hoàn thành lượt.

### Ba cách luyện

| Cách luyện | Mục đích | Cách chọn câu |
| --- | --- | --- |
| Theo chuyên đề | Hiểu và vận dụng một nhóm cấu trúc | Chọn chuyên đề, cấp độ; ưu tiên câu chưa học và câu còn sai |
| Ôn lỗi sai | Sửa đúng điểm yếu | Câu đến hạn và lỗi chưa chắc; thiếu 10 câu thì dùng lượt ngắn, ghi đúng số câu |
| Ôn tổng hợp | Phân biệt cấu trúc trong ngữ cảnh | Trộn các chuyên đề người học chọn; tránh một chuyên đề chiếm cả lượt |

Luyện theo lớp có đường dẫn riêng để người học quay lại đúng lớp/Unit. Chỉ chia sẻ cách hiển thị và chấm; không tự nhập ngân hàng lớp 6–7 vào phòng chung khi chưa rà soát nội dung và phạm vi.

### Lý thuyết mỗi cấu trúc

- Dùng khi nào, cấu trúc câu và 2–3 ví dụ tự biên soạn có nghĩa tiếng Việt.
- Một cặp so sánh dễ nhầm, một lỗi thường gặp và cách sửa.
- Bài kiểm tra nhanh 3 câu để chuyển sang luyện tập; chưa cộng vào kết quả một lượt 10 câu.
- Với thì: dùng sơ đồ thời gian đơn giản; từ chỉ thời gian là gợi ý, không phải quy tắc tuyệt đối.
- Ảnh chỉ dùng khi làm rõ nghĩa hoặc tình huống. Chữ công thức và sơ đồ được trình bày trực tiếp để rõ nét, sửa được và hỗ trợ đọc màn hình.

## 3. Nội dung và ngân hàng câu hỏi

### Thứ tự mở rộng

| Nhóm | Nội dung | Quan hệ học trước |
| --- | --- | --- |
| A. Nền tảng câu | Chủ ngữ–động từ; be; đại từ; danh từ; mạo từ; lượng từ; tính từ/trạng từ; giới từ | Làm trước các cấu trúc phức tạp |
| B. Thời gian và tình thái | Sáu thì hiện có, phân biệt các thì, can/could, should, must/have to, may/might | Cần nền tảng câu; học thì riêng trước bài phân biệt |
| C. So sánh và nối ý | So sánh hơn/nhất/ngang bằng; liên từ; although/though/however; nguyên nhân–kết quả | Cần câu đơn và từ loại |
| D. Cấu trúc mở rộng | Mệnh đề quan hệ, điều kiện, bị động, câu tường thuật, V-ing/to V, câu hỏi | Điều kiện cần thì tương ứng; bị động cần be và phân từ; tường thuật cần thì và đại từ |
| E. Vận dụng | Viết lại câu, sửa lỗi, đoạn văn ngắn, ôn tổng hợp | Luyện sau các cấu trúc liên quan |

Bản đầu nâng cấp giữ bốn chuyên đề hiện có. Tách sáu thì thành sáu đơn vị luyện để đo tiến độ; mệnh đề quan hệ, điều kiện và cấu tạo từ có các mục nhỏ bên trong. Như vậy có chín đơn vị luyện ban đầu, không phải chín thẻ mới bắt buộc trên danh mục.

Ba cấp độ phản ánh độ khó cấu trúc và nhiệm vụ. Chủ đề học đường, đời sống, công việc là nhãn ngữ cảnh riêng. Không tự coi câu có từ vựng khó hoặc nhãn kỳ thi là bài ngữ pháp khó; không cam kết điểm kỳ thi từ kết quả luyện trên website.

### Quy mô có thể triển khai

- Thí điểm: hiện tại đơn, tối thiểu 15 mục đã rà soát/cấp độ, tổng 45 mục. Dùng để kiểm tra đủ năm dạng, chấm, gợi ý và lưu lượt.
- Bản đầu đầy đủ: chín đơn vị luyện × ba cấp độ × tối thiểu 15 mục = tối thiểu 405 mục đã rà soát. Bao gồm phần giữ lại từ 360 câu hiện có; số câu mới cần viết tùy kết quả rà soát, không mặc định mọi câu cũ đều được giữ.
- Đợt mở rộng: nâng mỗi đơn vị lên 30 mục/cấp độ, đạt tối thiểu 810 mục cho chín đơn vị; sau đó bổ sung nhóm A–D theo thứ tự trên.
- Báo cáo riêng số tình huống và số biến thể. Một câu chuyển qua nhiều dạng bài không được quảng bá như nhiều tình huống mới.

Mức tối thiểu 15 mục ở mỗi cấp độ phải thuộc 15 tình huống riêng; phân bố khởi đầu là 4 chọn đáp án, 3 điền từ, 3 xếp câu, 2 sửa lỗi và 3 viết lại. Khi tăng lên 30, dùng 9 chọn đáp án, 6 điền từ, 6 xếp câu, 3 sửa lỗi và 6 viết lại, thuộc 30 tình huống riêng. Biến thể bổ sung không thay thế các mức tối thiểu này. Đây là chỉ tiêu biên soạn; bước chọn lượt vẫn kiểm tra dữ liệu thực tế trước khi mở bài.

### Năm dạng và cấu trúc lượt

Lượt chuẩn 10 câu: 3 chọn đáp án + 2 điền từ + 2 xếp câu + 1 sửa lỗi + 2 viết lại câu. Ngân hàng phải đủ từng dạng ở mỗi đơn vị/cấp độ, không chỉ đủ tổng số câu. Có thể điều chỉnh tỷ lệ ở đợt sau nhưng giữ mục tiêu học và kiểm thử tương ứng.

Chọn đủ các dạng trước, sau đó xáo trộn thứ tự. Không chọn hai biến thể cùng tình huống trong một lượt. Không lặp ID. Ngân hàng thiếu câu phù hợp thì dùng lượt ngắn hoặc tạm chưa mở lựa chọn đó, không lặp câu để đủ 10. Lượt ôn lỗi sai có thể không đủ cả năm dạng; màn hình ghi rõ số câu thực tế.

### Quy trình biên soạn và duyệt

1. Xác định một mục tiêu ngữ pháp, cấp độ, ngữ cảnh và vốn từ phù hợp.
2. Viết câu, đáp án, các biến thể chấp nhận và lý do; tránh bối cảnh cho phép nhiều đáp án chưa được khai báo.
3. Kiểm tra đáp án sai: phải sai theo mục tiêu bài, không chỉ kém tự nhiên hơn đáp án mẫu.
4. Với viết lại câu: kiểm tra giữ nguyên nghĩa, chủ thể, thời gian, phủ định và mức độ nghĩa vụ/khả năng.
5. Đọc lại giải thích tiếng Việt; bỏ khẳng định tuyệt đối khi có ngoại lệ; không chỉ nhắc lại đáp án.
6. Kiểm tra trùng lặp, liên kết lý thuyết và khả năng chấm. Gắn trạng thái nháp / đã rà soát / cần sửa. Chỉ mục đã rà soát được phát hành.

Nguồn bên ngoài chỉ dùng để đối chiếu khi biên soạn; không đưa thương hiệu hay đường dẫn của đơn vị cung cấp nguồn vào giao diện hoặc các tệp dự án. Thương hiệu hiển thị là Danh English Tutor.

## 4. Trải nghiệm trả lời, phản hồi và tiến độ

### Điện thoại và khả năng tiếp cận

- Câu hỏi 24–28 px, đáp án và ô nhập 18 px, giải thích ít nhất 16 px; chữ theo đơn vị tương đối để người học tăng cỡ chữ.
- Một câu mỗi màn hình học. Khi nội dung dài, cuộn một khung liên tục, không ép nhỏ chữ hoặc tạo nhiều khung cuộn lồng nhau.
- Nút bấm cao ít nhất 44 px, ưu tiên 48–52 px. Có nhãn ô nhập, trạng thái phản hồi cho đọc màn hình, focus rõ và thao tác bàn phím.
- Bàn phím điện thoại không che ô nhập và nút kiểm tra. Tôn trọng tùy chọn giảm chuyển động; không dùng riêng màu để báo đúng/sai.
- Kiểm tra 320 px để không tràn ngang; ưu tiên khung điện thoại 375/390/430 px, ngang 844×390 và máy tính 1280 px. Đường chéo 6,1 inch không thay cho kiểm tra kích thước hiển thị thực tế.

### Quy tắc câu trả lời

| Tình huống | Hành vi |
| --- | --- |
| Chưa nhập gì | Nhắc nhập câu trả lời; không tính sai, không mất điểm |
| Đúng ngay | Ghi nhận đúng lần đầu; mở giải thích và nút tiếp tục |
| Sai lần đầu | Báo chưa đúng, cho thử lại; không lộ đáp án hoặc giải thích chứa đáp án |
| Sai lần hai | Cho phép chủ động xem đáp án; vẫn có thể thử tiếp |
| Chưa giải sau 60 giây học | Cho phép chủ động xem đáp án, không ép bỏ câu |
| Xem đáp án | Đánh dấu đã xem; không cộng đúng, điểm thành thạo hay chuỗi đúng |
| Sửa đúng sau sai | Ghi nhận đã sửa; tách khỏi số đúng ngay; đưa vào lịch ôn |
| Chủ động bỏ qua | Ghi chưa hoàn thành, đưa vào phần cần luyện lại; không tự lộ đáp án |
| Nhấn kiểm tra/tiếp tục nhiều lần | Chỉ ghi kết quả một lần, không bỏ qua câu hoặc nhân điểm |

Gợi ý sau 20 giây với trắc nghiệm/điền một từ; sau 60 giây với nhiệm vụ nhiều từ. Gợi ý chỉ nhắc vốn từ hoặc nguyên tắc cần dùng. Thời gian hỗ trợ tính khi trang đang hoạt động; không chấm điểm theo tốc độ và không chạy đồng hồ gây áp lực.

Chấm câu nhập: chuẩn hóa khoảng trắng, dấu nháy và chữ hoa phù hợp với mục tiêu; dùng danh sách đáp án được duyệt. Chấp nhận dạng đầy đủ/rút gọn khi bài không yêu cầu riêng dạng nào. Không bỏ phủ định, thay chủ thể hay bỏ từ bắt buộc chỉ để tạo kết quả khớp.

Đáp án mở không khớp mẫu hiển thị “Câu của em chưa khớp đáp án mẫu” và cho đối chiếu khi đủ điều kiện xem đáp án; không khẳng định mọi cách diễn đạt khác đều sai. Ghi rõ giới hạn này trong phần trợ giúp ngắn của bài viết lại. Bản đầu không hứa tự chấm mọi câu tiếng Anh hoặc dùng AI chấm trực tiếp.

### Kết quả và ôn lại

Kết thúc lượt ghi riêng: đúng ngay / đúng sau sửa / đã xem đáp án / chưa hoàn thành. Hiển thị cấu trúc cần ôn, tối đa ba lỗi ưu tiên, và nút Ôn lỗi sai / Luyện tiếp / Về chuyên đề. Số câu và điểm lấy từ lượt thực tế, không viết cố định trong thông báo.

Điểm chính là số câu đúng ngay trên tổng số câu của lượt, ví dụ 7/10; sửa đúng được ghi nhận riêng. Bốn nhóm kết quả không chồng nhau: đã xem đáp án thì luôn thuộc nhóm đã xem, kể cả sau đó nhập lại đúng. Người học có thể tiếp tục luyện câu đã xem, nhưng việc đó không đổi điểm hoặc trở thành bằng chứng nhớ độc lập.

Lịch ôn đề xuất: sai hoặc xem đáp án → ôn sau 1 ngày; lần ôn đúng ngay kế tiếp → 3 ngày, 7 ngày, 14 ngày. Sai lại quay về 1 ngày. Không đổi lịch vì mở trang hoặc xem lý thuyết. Lịch là phương án ban đầu, có thể điều chỉnh theo dữ liệu học.

“Đã vững” chỉ dùng khi có ít nhất hai lượt độc lập đạt 9/10 đúng ngay tại cấp độ mục tiêu và một lượt ôn sau ít nhất 7 ngày cũng đạt 90% đúng ngay. Hai lượt đầu phải gồm 20 tình huống khác nhau, mỗi lượt đủ tỷ lệ năm dạng; lượt ôn trễ dùng 10 câu thuộc phần đã học. Không tính hai biến thể cùng tình huống là hai lần kiểm tra độc lập. Chỉ mở đánh giá này khi ngân hàng đáp ứng được hai lượt độc lập: bản đầu có 15 tình huống/cấp độ chỉ dùng “Đang luyện” hoặc “Cần ôn”; bản mở rộng 30 tình huống/cấp độ có thể mở khi kiểm tra đủ từng dạng. Đề xuất nâng cấp độ khi đủ điều kiện, nhưng để người học tự chọn.

Lưu trên trình duyệt hiện tại: kết quả từng mục, lần thử, lịch ôn và lượt dở. Cho tiếp tục đúng câu đang học, giữ thứ tự đã chọn và kết quả đã ghi. Bộ nhớ hỏng/bị chặn vẫn luyện được trong phiên. Có nút xóa tiến độ với xác nhận rõ phạm vi. Bản đầu không yêu cầu đăng nhập và không hứa đồng bộ nhiều thiết bị.

## 5. Cách triển khai và bảo toàn bài đang dùng

Giữ các địa chỉ công khai hiện có: `grammar-index.html`, các trang lý thuyết và luyện tập, kể cả đường chuyển tiếp tên cũ của câu điều kiện. Trang chuyên đề trở thành điểm vào của bộ luyện chung; không chuyển tất cả sang trang mới làm mất liên kết đã lưu.

Tách thành các phần nhỏ:

| Thành phần dự kiến | Trách nhiệm |
| --- | --- |
| `assets/data/grammar/` | Danh mục mục tiêu, lý thuyết ngắn và câu hỏi |
| `assets/js/grammar/round-selection.js` | Chọn câu theo dạng, độ khó, lịch ôn và tình huống |
| `assets/js/grammar/answer-checker.js` | Chuẩn hóa và chấm theo quy tắc từng dạng |
| `assets/js/grammar/session.js` | Trạng thái câu/lượt; ghi kết quả đúng một lần |
| `assets/js/grammar/progress.js` | Lưu, nâng phiên bản dữ liệu, lịch ôn và tiếp tục lượt |
| `assets/js/grammar/render.js` | Hiển thị năm dạng, gợi ý và phản hồi |
| CSS dùng chung của phòng | Chữ lớn, bố cục, nút và trạng thái |

Mỗi mục có ID ổn định, phiên bản, ID tình huống, cấu trúc mục tiêu, cấp độ, ngữ cảnh, dạng, đề, đáp án mẫu, biến thể chấp nhận, giải thích, gợi ý, liên kết nội bộ tới lý thuyết và trạng thái rà soát. Dữ liệu lựa chọn, mảnh xếp câu hoặc yêu cầu viết lại tùy dạng. Tách ID của mục khỏi ID tình huống để chọn lượt không lặp biến thể.

Tái sử dụng kinh nghiệm chọn đủ hai bài viết lại và giao diện chữ lớn của lớp 7; tách phần dùng chung trước, không sao chép nguyên bộ lớp 7 rồi đổi tên hàng loạt. Các lớp vẫn dùng khóa tiến độ riêng. Đổi phiên bản câu phải vô hiệu hóa lượt dở chứa câu không còn tương thích và giải thích ngắn lý do cho người học; không âm thầm đổi đáp án trong một lượt đã lưu.

Không có tiến độ riêng của bốn bộ cũ để di chuyển theo kiểm kê hiện tại, nhưng cần giữ nguyên các khóa của từ vựng và lớp 2/4/6/7. Thêm phòng ngữ pháp và các trang con vào kiểm tra footer chung. Website tiếp tục chạy tĩnh, không cần máy chủ ứng dụng hay dịch vụ trả phí cho bản đầu.

## 6. Các đợt triển khai và điều kiện hoàn thành

| Đợt | Công việc và sản phẩm bàn giao | Điều kiện để sang đợt tiếp |
| --- | --- | --- |
| 1. Kiểm kê và chuẩn nội dung | Danh sách 360 câu, phân loại cấu trúc/cấp độ, đánh dấu câu mơ hồ, trùng lặp, giải thích cần sửa; chốt mẫu dữ liệu và quy tắc chấm | Mỗi câu có trạng thái; đã xác định đủ nguồn dữ liệu và địa chỉ cần giữ |
| 2. Thí điểm hiện tại đơn | 45 mục được rà soát; năm dạng; lượt 10 câu; gợi ý; điểm; chữ lớn; lưu và tiếp tục lượt; footer chung | Đạt ma trận kiểm tra; không lộ đáp án sớm, không ghi điểm hai lần; đủ dạng và không lặp tình huống |
| 3. Chuẩn hóa bốn chuyên đề | Chín đơn vị luyện; tối thiểu 405 mục; lý thuyết ngắn; giữ URL; ôn lỗi sai và kết quả | Mọi đơn vị/cấp độ mở được đều đủ lượt; kết quả và tiến độ khớp; các bài cũ vẫn truy cập được |
| 4. Phòng học và ôn tổng hợp | Tìm/lọc, tiếp tục học, danh mục tiến độ, lịch ôn, tổng hợp nhiều chuyên đề | Lượt tổng hợp phân bố đúng; ôn đúng ngày; không lẫn dữ liệu theo lớp |
| 5. Mở rộng nền tảng | Nhóm A, tình thái, so sánh, liên từ; nâng độ đa dạng ngân hàng cũ | Mỗi nội dung mới có lý thuyết, ba cấp độ, mục được duyệt và kiểm tra hồi quy |
| 6. Mở rộng vận dụng | Bị động, tường thuật, V-ing/to V, phân biệt cấu trúc, đoạn văn ngắn; bài định hướng tùy chọn | Nhiệm vụ có phạm vi chấm rõ; chỉ phát hành khi ngân hàng đủ đa dạng và đáp án chắc chắn |

Thứ tự phụ thuộc bắt buộc: đợt 1 → 2 → 3 → 4; các nội dung đợt 5–6 có thể biên soạn sớm nhưng chỉ phát hành sau chuẩn nội dung và bộ luyện đã ổn định. Mỗi đợt tạo một thay đổi có thể xem thử, có kết quả kiểm tra và có thể quay về phiên bản trước. Mốc hoàn thành gắn với điều kiện nghiệm thu, chưa đưa ngày hứa hẹn khi khối lượng sửa nội dung chưa rõ.

## 7. Kế hoạch kiểm tra và tự rà soát

### Ma trận nghiệm thu bắt buộc

| Nhóm | Tình huống kiểm tra | Kết quả cần đạt |
| --- | --- | --- |
| Nội dung | Đề đủ ngữ cảnh, đáp án biến thể, phủ định, thời gian, viết lại giữ nghĩa | Không phát hành câu mơ hồ/chưa được rà soát |
| Chọn lượt | Mọi thứ tự pool, lịch sử học khác nhau, thiếu dạng, cùng tình huống | Đủ tỷ lệ 10 câu khi ngân hàng đủ; không lặp; lượt ngắn ghi đúng số |
| Chấm | Đúng, sai, nhập rỗng, khoảng trắng, nháy cong, dạng rút gọn, từ bắt buộc | Chấp nhận đúng biến thể; không chấp nhận thay đổi nghĩa |
| Gợi ý/đáp án | Trước/sau mốc thời gian, một/hai lần sai, tab ẩn, bấm xem nhiều lần | Không lộ đáp án sớm; xem đáp án không thành đúng |
| Điểm/trạng thái | Bấm hai lần, Enter liên tiếp, sửa đúng, bỏ lượt | Ghi một kết quả/mục; tổng khớp từng loại kết quả |
| Đánh giá đã vững | Pool 15 hoặc 30 tình huống, hai lượt trùng biến thể, ôn trước/sau 7 ngày | Chỉ đánh giá khi đủ hai lượt riêng biệt; đạt đúng ngưỡng và thời gian; xem đáp án không được tính |
| Lưu/khôi phục | Tải lại giữa lượt, trình duyệt chặn lưu, dữ liệu hỏng, đổi phiên bản | Tiếp tục đúng hoặc phục hồi an toàn; không mất khóa tiến độ khu vực khác |
| Lịch ôn | Hạn 1/3/7/14 ngày, sai lại, sang ngày mới | Chọn đúng câu đến hạn; không nhảy lịch do xem bài |
| Điều hướng | Trang chủ → kỹ năng → ngữ pháp; mọi URL cũ; quay về lớp/Unit | Không liên kết hỏng, không vòng lặp điều hướng |
| Giao diện | 320/375/390/430 px, ngang, 1280 px, tăng chữ, bàn phím thật | Không tràn, không cắt câu, chữ đủ lớn, nút bấm và focus dùng được |
| Toàn dự án | Các bộ kiểm tra hiện có, cú pháp, liên kết, footer | Đạt trước khi phát hành; không làm hỏng từ vựng và học theo lớp |

Kiểm tra tự động dùng các trường hợp có khả năng phát hiện lỗi thực tế, đặc biệt chọn lượt và ghi điểm. Kiểm tra trên trình duyệt hoàn thành ít nhất một lượt cho mỗi đơn vị/cấp độ được mở. Thử thủ công trên điện thoại thật ở bản đầu đầy đủ để kiểm tra bàn phím, cuộn và cảm giác đọc; ảnh chụp giả lập không thay thế bước này.

### Kết quả tự kiểm tra kế hoạch

| Câu hỏi tự kiểm tra | Kết luận và điều chỉnh đã đưa vào kế hoạch |
| --- | --- |
| Có bám đúng yêu cầu lập kế hoạch? | Có: chỉ tạo kế hoạch, không triển khai chức năng hay tự phát hành |
| Có kiểm kê thay vì đoán ngân hàng hiện tại? | Có: 180 + 60 + 60 + 60 = 360 câu từ tệp dữ liệu thực tế |
| Số lượng dự kiến có khớp? | Có: thí điểm 1×3×15=45; bản đầu 9×3×15=405; mở rộng 9×3×30=810; số giữ lại phụ thuộc rà soát |
| Có đủ câu nhưng thiếu dạng không? | Đã xử lý: kiểm tra từng dạng/cấp độ, không chỉ tổng số; quy tắc thiếu dữ liệu rõ ràng |
| Có lặp một tình huống thành nhiều câu trong lượt? | Đã xử lý bằng ID tình huống; báo riêng số tình huống và biến thể |
| Có vô tình hứa chấm mọi đáp án mở? | Không: chỉ chấm biến thể đã duyệt, có phản hồi chưa khớp mẫu và cách đối chiếu |
| Có lộ đáp án qua giải thích trước khi được xem? | Đã xử lý: giải thích chứa đáp án chỉ mở sau đúng hoặc chủ động xem khi đủ điều kiện |
| Có lấy hoàn thành lượt làm thành thạo? | Không: tách đúng ngay/sửa đúng/xem đáp án và yêu cầu ôn trễ |
| Ngân hàng 15 tình huống có đủ cho hai lượt độc lập 10 câu? | Chưa đủ: bản đầu chỉ ghi đang luyện/cần ôn; chỉ mở đánh giá đã vững khi đủ 20 tình huống theo tỷ lệ năm dạng |
| Có đếm một câu vừa đã xem vừa sửa đúng hai lần? | Đã xử lý: nhóm đã xem được ưu tiên, điểm chính chỉ tính đúng ngay; bốn nhóm kết quả không chồng nhau |
| Có đánh đồng ngữ cảnh kỳ thi và độ khó? | Không: nhãn ngữ cảnh độc lập, không cam kết điểm thi |
| Có giữ bố cục, thương hiệu và các địa chỉ đang dùng? | Có: bám giao diện hiện có, giữ URL, điều hướng qua Luyện theo kỹ năng, không gắn thương hiệu nguồn tham khảo |
| Có làm lẫn tiến độ phòng chung với lớp? | Đã xử lý: khóa riêng, không di chuyển dữ liệu lớp khi chưa thiết kế nâng phiên bản |
| Có kiểm tra cả bàn phím và trình duyệt chặn lưu? | Có: nằm trong ma trận nghiệm thu; điện thoại thật là bước riêng |
| Có mở rộng quá sớm? | Đã điều chỉnh: chạy thí điểm một thì trước khi chuyển tất cả chuyên đề và thêm ngân hàng mới |

Kết luận: kế hoạch đủ để bắt đầu từ đợt 1, sau đó làm bản thí điểm hiện tại đơn. Những việc cần kiểm chứng khi triển khai là chất lượng từng câu, khả năng chấm biến thể và trải nghiệm bàn phím trên thiết bị thật; chưa gắn nhãn chúng là đã đạt.
