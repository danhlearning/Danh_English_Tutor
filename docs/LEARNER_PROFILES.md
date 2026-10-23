# Hồ sơ người học trên thiết bị

## Trải nghiệm

Mở website là xem và học thử ngay, không tự bật hộp hỏi tên. Thanh đầu trang có nút **Đăng nhập**; bấm nút để chọn hồ sơ có sẵn hoặc nhập tên, chọn bạn đồng hành và bấm **Vào học ngay**. Hộp có nút Đóng và phím Escape. Đây là đăng nhập hồ sơ trên thiết bị, không cần email hoặc mật khẩu. Khi đã chọn hồ sơ, thanh hiện tên, **Đổi người học** và **Hồ sơ**.

Trong cùng tab, chuyển bài và tải lại vẫn giữ người đã đăng nhập. Phiên có hạn tối đa 12 giờ; có thể chủ động **Kết thúc phiên học**. Hết phiên hoặc tab mới hiện nút Đăng nhập, không tự chọn tên gần nhất hay bật hộp hỏi. Mỗi tab giữ người học riêng.

Khi học thử, `DanhLearners.storage` dùng bộ nhớ riêng trong tab, lưu gói `danh-learner-guest-session-v1` trong sessionStorage, có dự phòng qua window.name khi bị chặn. ID tab ngăn tab mới dùng nhầm gói sao chép. Giữ lượt qua tải lại/chuyển bài trong tab; không ghi vào localStorage dùng chung hoặc hồ sơ có sẵn. Đăng nhập tải dữ liệu của hồ sơ đã chọn, không tự nhập kết quả học thử. Kết thúc phiên xóa gói học thử của tab. Dữ liệu hồ sơ cũ giữ nguyên.

Mỗi tên có ID độc lập. Trùng tên không nhập chung dữ liệu; đổi tên hoặc bạn đồng hành giữ lộ trình. Danh sách phân biệt hồ sơ trùng cả tên và hình bằng số hồ sơ. Xóa hồ sơ cần xác nhận, chỉ xóa dữ liệu của tên đó.

## Tiến độ và chuyển đổi

- Lớp 3 và lớp 4 được đồng bộ tiếp theo cùng khung lớp 2. Giữ ID từ và khóa `danh.learning.g3unit<N>.v1`, `danh.learning.g4unit<N>.v1`; tiến độ `danh.grade3.words.v1` và `danh.grade4.words.v1` không bị xóa hoặc gộp. Viết câu dùng `danh-g3-unit<N>-write-sentence-v1` / `danh-g4-unit<N>-write-sentence-v1`, ôn tổng hợp dùng `danh-g3-mixed-review-v1` / `danh-g4-mixed-review-v1`, độc lập theo lớp và hồ sơ. Lớp 3 giữ trang `legacy.html` và lượt điền câu trước. Lớp 4 giữ các trang `previous-unit<N>.html`, gồm thiệp mời, bài đọc của Unit 4, và `previous.html` cho phần ôn trước. Các trang mới không ghi lại kết quả mở trang thành bằng chứng học; đáp án trong cặp hỏi–đáp có ngữ cảnh câu hỏi khi luyện viết.

- Ngày 22/10/2026, lớp 1 và 5 dùng khung lớp 2 với dữ liệu riêng. Lật thẻ, trắc nghiệm và chính tả giữ `danh.learning.g<lớp>unit<N>.v1` và ID từ cũ. Viết cả câu dùng `danh-g<lớp>-unit<N>-write-sentence-v1`, lưu nháp, lỗi, thời gian chờ và đúng ngay/tự sửa/đã xem; ôn tổng hợp dùng `danh-g<lớp>-mixed-review-v1`, tách khỏi lớp 2 và tiến độ Unit. Lượt điền từ trong câu và ôn theo mẫu trước vẫn được giữ tại `previous-unit<N>.html` và `previous.html`, có liên kết khi phát hiện dữ liệu. Game cũ vẫn qua `legacy.html`. Topic phụ ở 12 lớp cùng trỏ về một bài lớp 2, cùng tiến độ topic theo hồ sơ; `fromGrade` chỉ chọn liên kết quay lại, không đổi dữ liệu hay danh tính người học.

- Body Parts lớp 2 có 32 từ; tên Stomach giữ ID từ/câu cũ `tummy`/`body-tummy`. Giữ nguyên bộ từ đã chọn; chọn Tất cả để thêm từ mới vào lượt luyện. Một lần chuyển đổi cách viết được đánh dấu bằng `danh.bodyparts.stomach-word.v1`: nếu lượt chính tả cũ có tummy, lưu nguyên trạng thái vào `danh.learning.bodyparts.before-stomach.v1` rồi bỏ riêng lượt chính tả đó, giữ lượt trắc nghiệm, bộ chọn và lịch sử; thông báo cho người học. Các khóa qua `DanhLearners.storage`, không gộp hồ sơ hay đổi bài khác.

- School Supplies lớp 2 rút còn 18 từ ngắn. Khi bộ chọn cũ chứa từ đã bỏ, lưu nguyên bản vào `danh.learning.schoolsupplies.before-short-words.v1` trước khi cập nhật `danh.learning.schoolsupplies.v1`, đều qua `DanhLearners.storage`. Giữ ID còn phù hợp hoặc chọn cả bộ nếu không còn từ nào; lượt/thẻ của bộ bị đổi bắt đầu lại và có thông báo. Bộ chọn không bị ảnh hưởng giữ lượt dở. Bản lưu chứa đầy đủ kết quả/lượt cũ, không làm thay đổi chủ đề hay người học khác.

- Ôn tập tổng hợp lớp 2 dùng `danh-g2-mixed-review-v1` qua `DanhLearners.storage`: chọn Unit, lượt trộn, thứ tự đáp án/mảnh câu, nháp, lần sai, gợi ý, kết quả và tối đa 20 lượt lịch sử. Giữ lượt cũ khi thay bộ Unit; tiếp tục vẫn dùng bộ ban đầu. Không ghi vào tiến độ Unit hoặc bằng chứng thành thạo. Không phát giọng đọc khi tải lại.
- Ngày 21/10/2026, ôn tập lớp 2 mở rộng thành 9 dạng. Giữ phiên bản dữ liệu 1, khóa và các nhiệm vụ cũ không có ID ngân hàng; lượt cũ giữ nguyên thứ tự, kết quả, mảnh câu và nháp. Nhiệm vụ mới có ID cố định từ ngân hàng riêng; lưu thêm `selectedModes` và tối đa 200 mã tình huống gần đây để thay đổi nội dung lượt mới. Danh sách gần đây chỉ giúp chọn câu, không ghi nhận tiến bộ hay thành thạo. Đổi Unit/dạng không sửa lượt đang dở; ôn câu khó giữ nội dung và Unit của lượt vừa kết thúc.

- Lớp 8/9 dùng bộ chạy chung với THCS, khóa riêng `danh-g8-unit<N>`, `danh-g9-unit<N>`, `danh-g8-vocabulary-game-<phạm vi>-v1`, `danh-g9-vocabulary-game-<phạm vi>-v1`, `danh-g8-grammar-v1`, `danh-g9-grammar-v1`, tất cả qua `DanhLearners.storage`. Phạm vi từ vựng là `unit1`…`unit12`, `term1`, `term2`. Lưu lượt chọn từ và ngữ pháp, dùng tùy chọn hiệu ứng chung theo hồ sơ. Gõ từ hiện là luyện tự do trong trang, chưa lưu nguyên lượt gõ dở và không ghi bằng chứng thành thạo.

- Giao diện theo mẫu lớp 4 của lớp 1/3/5 dùng `danh.learning.g<lớp>unit<N>.v1` cho bộ chọn, lật thẻ, nghe chọn tranh và gõ; `danh.grade<lớp>.words.v1` cho bằng chứng từng kỹ năng và lịch ôn; `danh-g<lớp>-unit<N>-template-context-v1` cho điền từ và `danh-g<lớp>-template-review-v1` cho lượt ôn. Nhớ tab bằng `danh-g<lớp>-unit<N>-template-tab-v1`. Các khóa đều qua `DanhLearners.storage`. Các khóa game cũ bên dưới được giữ nguyên, có lối tiếp tục trong Unit; không chuyển điểm xếp câu sang bằng chứng điền câu.
- Các lượt theo giao diện trước của lớp 1, 3, 5 dùng chung `shared/primary-game.js`, cấu hình và ngân hàng từng lớp riêng. Lớp 1 và 5 dùng `danh-g1-unit<N>-<mode>-v1` và `danh-g5-unit<N>-<mode>-v1`; giữ nguyên định dạng/khóa lớp 3. Bốn mode là `meaning`, `listen`, `spelling`, `sentence`; lượt, nháp, lần sai, gợi ý và kết quả lưu độc lập theo lớp/Unit/mode. Chọn lớp trong thanh tiểu học chỉ chuyển trang, không sao chép tiến độ giữa lớp.
- Lớp 3 dùng `danh-g3-unit<N>-<mode>-v1`, với `mode` là `meaning`, `listen`, `spelling`, `sentence`. Mỗi Unit và game giữ lượt riêng: thứ tự nhiệm vụ/lựa chọn, lần sai, gợi ý, bản nháp hoặc mảnh câu, vị trí và kết quả. Tách đúng ngay, tự sửa, đúng có gợi ý, đã xem, bỏ qua; mở thẻ không ghi hoàn thành. Ôn mục cần luyện bắt đầu lượt mới trong cùng game. Dùng tùy chọn hiệu ứng chung theo hồ sơ, không sửa khóa tiến độ lớp khác.
- Tách dữ liệu phòng ngữ pháp, ngữ pháp lớp 6/7, từ vựng lớp 2/4/6/7, sổ tay/ôn tập từ vựng và tùy chọn hiệu ứng theo hồ sơ.
- Phòng ngữ pháp tiếp tục lượt dở với thứ tự câu, câu trả lời và các lần thử đã lưu. Các hoạt động khác tiếp tục theo khả năng lưu tiến độ vốn có; không tự gắn trạng thái hoàn thành cho việc mở trang.
- Trắc nghiệm từ vựng lớp 6/7 tiếp tục lượt Unit hoặc học kỳ với thứ tự câu, bốn lựa chọn, lần sai và kết quả đã lưu. Ôn học kỳ 1 dùng Unit 1–6, học kỳ 2 dùng Unit 7–12. Lượt ôn học kỳ có tiến độ riêng, không ghi đè từ Unit đã trả lời đúng. Đúng ngay, tự sửa đúng và đã xem được phân biệt; chỉ đúng ngay trong Unit cập nhật danh sách từ đã đúng vốn có.
- Hiệu ứng từ vựng và ngữ pháp dùng chung lựa chọn âm/chuyển động giữa lớp 6 và lớp 7 của cùng một hồ sơ, giữ khóa `danh-vocabulary-effects-v1`. Lần chuyển đổi đầu giữ lựa chọn tắt của ngữ pháp lớp 6 cũ (`danh-g6-grammar-effects`) và từ vựng; cờ `shared` tránh chuyển đổi lại sau khi người học đổi tùy chọn. Lượt trắc nghiệm dùng khóa `danh-g6-vocabulary-game-<phạm vi>-v1` hoặc `danh-g7-vocabulary-game-<phạm vi>-v1`, phạm vi là `unit1`…`unit12`, `term1` hoặc `term2`. Các khóa đánh dấu từ cũ được giữ nguyên.
- Ngữ pháp hai lớp giữ khóa `danh-g6-grammar-v1` và `danh-g7-grammar-v1`, dùng bộ chạy chung nhưng ngân hàng riêng. Lượt dở giữ ID câu, thứ tự đáp án, lỗi, bản nháp, mảnh câu và thời gian học tích cực; viết lại chỉ mở gợi ý sau 120 giây. Tải lại câu đã chấm không cộng điểm hoặc phát lại âm thưởng.
- Phần phản xạ IPA ghi lịch sử lượt kết thúc và kết quả riêng. Chưa khôi phục nguyên lượt IPA dở. Đồng hồ không chạy trước khi xác nhận tên hoặc khi tab bị ẩn.
- Hồ sơ có lối **Tiếp tục bài gần đây**. Đây là lịch sử mở bài, không phải bằng chứng thành thạo.
- Nếu máy có tiến độ cũ, biểu mẫu đầu tiên mặc định chọn giữ tiến độ cho tên đó. Chuyển đổi chỉ một lần, không xóa bản cũ. Chỉ lấy dữ liệu học từ sổ tay cũ, không sao chép email/mật khẩu vào hồ sơ hoặc bản sao lưu.

## Sao lưu và giới hạn

Ngày 20/10/2026, lớp 6–12 dùng mẫu giao diện lớp 6 và hiệu ứng tự động, không hiện UI điều chỉnh âm/chuyển động theo yêu cầu trực tiếp. Nút nghe từ vẫn dùng cho việc học; thiết bị giảm chuyển động vẫn được tôn trọng. Các khóa tiến độ cũ được giữ nguyên. Lớp 10 giữ sáu ID từ đầu mỗi Unit và 120 ID ngữ pháp ban đầu, thêm ID từ 7–8 và các câu mới. Ngữ pháp 8/9/11/12 nạp ngân hàng bổ sung riêng sau ngân hàng gốc, không sửa ID câu gốc. Lượt đã lưu tiếp tục dùng bộ ID ban đầu, không tự thêm câu/từ vào lượt đang chơi.

Lớp 10/11/12 dùng `danh-g<lớp>-unit<N>`, `danh-g<lớp>-vocabulary-game-<phạm vi>-v1`, `danh-g<lớp>-grammar-v1` qua `DanhLearners.storage`. Phạm vi là `unit1`…`unit10`, `term1`, `term2`; học kỳ 1 gồm Unit 1–5, học kỳ 2 gồm Unit 6–10. Lượt chọn từ và ngữ pháp lưu độc lập từng lớp/hồ sơ; dùng tùy chọn hiệu ứng chung. Lật thẻ không ghi hoàn thành. Ở lớp 10, gõ từ vẫn luyện tự do trong trang, chưa lưu nguyên lượt gõ dở và không ghi bằng chứng thành thạo.

Ngày 22/10/2026, lớp 11 giữ 60 ID từ cũ, thêm ID 7–8 mỗi Unit và 60 ID ngữ pháp mới, giữ nguyên 290 ID câu cũ. Lượt chọn từ/ngữ pháp đang dở tiếp tục bộ ID đã chọn, không tự thêm nội dung vào lượt. Gõ từ dùng `danh-g11-spelling-unit<N>-v1` để giữ thứ tự, vị trí, nháp, lần sai, đã nghe gợi ý và kết quả từng từ. Tách đúng ngay, tự sửa đúng, đúng có gợi ý, đã xem; không ghi vào khóa đúng từ của trò chọn từ và không suy ra thành thạo. Ôn từ còn khó tạo lượt mới cùng kỹ năng/Unit. Tab dùng `danh-g11-unit<N>-tab-v1`; danh mục có lối tiếp tục gõ khi có nháp/kết quả thật. Cả hai khóa qua `DanhLearners.storage`, độc lập theo hồ sơ; bộ nhớ bị chặn vẫn tiếp tục trong cùng tab. Lượt gõ tự do trước đây không có dữ liệu lưu để chuyển đổi.

Ngày 23/10/2026, lớp 12 giữ 60 ID từ và 290 ID ngữ pháp cũ, thêm 20 từ và 60 tình huống riêng. Lượt chọn từ/ngữ pháp đã lưu giữ nguyên bộ ID. Gõ từ dùng `danh-g12-spelling-unit<N>-v1`, tab dùng `danh-g12-unit<N>-tab-v1`, qua `DanhLearners.storage`. Giữ thứ tự, vị trí, nháp, lần sai, gợi ý và kết quả; tách đúng ngay, sửa đúng, có gợi ý, đã xem. Đã nghe gợi ý thì kết quả luôn thuộc nhóm có gợi ý kể cả sau khi nhập sai rồi sửa. Ôn từ còn khó tạo lượt riêng trong cùng Unit; không cập nhật bằng chứng chọn từ hoặc thành thạo. Danh mục chỉ hiện tiếp tục khi có thao tác học thật. Không có lượt gõ cũ đã lưu để chuyển đổi. Giao diện hiệu ứng tự động vẫn tôn trọng tùy chọn tắt âm/chuyển động đã lưu.

Hồ sơ chỉ lưu trên cùng trình duyệt và địa chỉ website. Đổi thiết bị, trình duyệt, tên miền hoặc cổng preview sẽ dùng vùng dữ liệu khác. Xóa dữ liệu trình duyệt có thể mất lộ trình. Tải bản sao lưu JSON trong **Hồ sơ**, rồi khôi phục trên trình duyệt hoặc thiết bị khác. Khôi phục luôn tạo hồ sơ mới để tránh ghi đè người đang học; chỉ nhận định dạng và khóa dữ liệu học hợp lệ, tối đa 5 MB/1.000 khóa.

Hồ sơ là cách phân chia người học, không phải tài khoản bảo mật. Người dùng chung thiết bị có thể chọn các tên khác. Không có đăng nhập máy chủ, đồng bộ tự động hoặc gửi tên/lộ trình tới máy chủ từ tính năng này.

Nếu lưu lâu dài bị chặn, website dùng bộ nhớ phiên và thông báo rõ. Nếu cả hai bộ nhớ trình duyệt đều bị chặn, dữ liệu tạm giữ trong tab để tiếp tục khi chuyển trang; cần tải bản sao lưu trước khi đóng tab. Lỗi thiếu dung lượng hiển thị cảnh báo, không báo đã lưu thành công.

## Chỉ dẫn phát triển

`shared/learner-profile-core.js` quản lý hồ sơ, chuyển đổi, sao lưu và vùng lưu. `shared/learner-profile.js` khởi tạo đồng bộ trước mã bài học, hiển thị cửa chọn tên và quản lý phiên; giao diện cô lập bằng Shadow DOM, Nunito tự lưu trong dự án. Các trang công khai và mẫu trang nạp hai script này trước mã bài học.

Mã học dùng `window.DanhLearners.storage`. Mỗi tài liệu giữ cố định ID của người học khi khởi tạo. Đổi người học tải lại tài liệu; việc lưu trong `pagehide` của trang cũ vẫn ghi cho đúng người cũ. Không thay thế hay sửa prototype của `localStorage`.

Vùng lưu `danh-learner-data:<ID>:<khóa học>`, mô tả riêng từng ID, khóa phiên trong `sessionStorage`. ID tab trong `window.name` giúp tránh kế thừa xác nhận khi mở tab mới. Dấu nguồn ghi theo tab phân biệt sự kiện lưu khi tải lại với cập nhật từ tab khác. Tab dùng cùng hồ sơ và đã đọc dữ liệu bị thay đổi sẽ khóa ghi, yêu cầu tải lại; tab dùng hồ sơ khác không bị đổi tên hoặc ghi nhầm. Hồ sơ bị xóa ở tab khác không thể được phục hồi bởi trang cũ.

Khóa mới dùng tiền tố `danh-`, `danh:` hoặc `danh.`. Kiểm tra lưu bị chặn và dữ liệu hỏng. Không ghi tiến độ trực tiếp vào bộ nhớ dùng chung. Trang/mẫu mới cần tải hai script trước các script học; `scripts/install-learner-profiles.cjs` cài lại script theo đường dẫn tương đối. Bộ dựng trang ngữ pháp đã giữ bước này.

## Kiểm tra

- `node --test tests/learner-profiles/*.test.cjs`: trùng tên, đổi tên, cách ly, xóa, trang cũ, chuyển đổi/rollback, sao lưu/định dạng sai, tạo đồng thời, khóa ghi và chuẩn hóa tên.
- `node tests/learner-profiles/browser.cjs`: luồng chọn tên, ba hồ sơ, tiếp tục ngữ pháp và hiệu ứng riêng, tab độc lập, tải lại/phiên mới, đổi tên, sao lưu/khôi phục/xóa, flashcard, các lớp và IPA, sáu chiều rộng và lưu bị chặn.
- Giữ toàn bộ kiểm tra nội dung/game hiện có. Bộ kiểm tra trình duyệt ngữ pháp khởi tạo hồ sơ kiểm thử riêng, không vượt qua cửa chọn tên của người dùng thật.

Các kiểm tra trên dùng trình duyệt mô phỏng; chưa phải nghiệm thu trên điện thoại vật lý.
