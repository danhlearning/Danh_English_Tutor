# Chỉ dẫn phát triển Danh English Tutor

## Định hướng sản phẩm: game học tiếng Anh

- Phát triển toàn bộ website theo tư duy **game học tiếng Anh**. Mỗi hoạt động có mục tiêu học, thử thách vừa sức, thao tác chơi rõ ràng, phản hồi và cơ hội ôn lại. Cơ chế chơi phải giúp người học hiểu, nhớ hoặc sử dụng tiếng Anh.
- Luôn ưu tiên cảm giác đang chơi: nhiệm vụ ngắn, nhiều cách tương tác, nhân vật/phản hồi thân thiện, cảm giác tiến bộ và quyền chọn chơi tiếp hoặc ôn lại. Nội dung mới phải tạo thêm cơ hội học thực chất; không chỉ tăng số câu bằng việc đổi thứ tự đáp án hoặc lặp cùng một tình huống.
- Áp dụng cho trang chủ, Luyện theo kỹ năng, các lớp/Unit, từ vựng, ngữ pháp, phát âm và phản xạ. Phòng ngữ pháp hiện tại là mẫu tham khảo về phong cách và phản hồi; điều chỉnh cơ chế theo kỹ năng và độ tuổi.
- Trước khi thêm game, bài học hoặc thay đổi đáng kể UX/UI, đọc [Nguyên tắc thiết kế game học tiếng Anh](docs/NGUYEN_TAC_GAME_HOC_TIENG_ANH.md). Ghi rõ mục tiêu học, cách chơi, cách chấm, hỗ trợ khi sai và điều kiện hoàn thành trước khi triển khai.
- Vòng học chuẩn: chọn mục tiêu → chơi lượt ngắn → nhận phản hồi → tự sửa → tổng kết → ôn hoặc chơi tiếp. Ưu tiên một nhiệm vụ rõ ràng trên điện thoại, giữ quyền chọn bài và tiếp tục lượt dở.
- Khen nỗ lực và việc tự sửa; tách đúng ngay, sửa đúng, đã xem đáp án và bỏ qua. Điểm, huy hiệu và trạng thái tiến bộ phải phản ánh bằng chứng học; lượt mở bài hoặc xem đáp án không trở thành bằng chứng thành thạo.
- Dùng lại thành phần hiển thị, âm thanh, animation và lưu tùy chọn khi phù hợp; giữ dữ liệu và tiến độ từng kỹ năng/lớp độc lập. Khi nâng cấp bài cũ, bảo toàn URL và tiến độ hoặc có cách chuyển đổi rõ ràng.
- Nghiệm thu cả trải nghiệm chơi và chất lượng học: nội dung/đáp án, phản hồi đúng/sai, thao tác lặp, tiếp tục lượt, âm thanh, giảm chuyển động và bố cục điện thoại. Chỉ báo đạt những bước đã kiểm tra.

## Nội dung và giao diện

- **Yêu cầu ngày 24/10/2026:** không hiển thị số lượng từ trên thẻ hoặc phần giới thiệu Unit. Không dùng mũi tên trang trí trong thẻ Unit, thẻ hướng dẫn hoặc thẻ chọn mục; cả thẻ là vùng bấm. Áp dụng cho trang hiện tại, thành phần dùng chung và bộ dựng. Giữ chỉ báo tiến độ lượt đang học và nút điều hướng có chức năng (trước/tiếp).

- **Yêu cầu ngày 24/10/2026:** thẻ Unit mở bài trực tiếp, không thêm nhãn/nút “Vào học”. Nút nghe chỉ hiện biểu tượng loa, giữ tên truy cập bằng `aria-label`. Thao tác chủ động bấm loa được phát độc lập với tùy chọn tắt âm phản hồi đã lưu; ưu tiên media playback khi thiết bị hỗ trợ. Không hứa vượt qua âm lượng media bằng 0 hoặc giới hạn của hệ điều hành.

- **Yêu cầu ngày 24/10/2026:** không hiển thị UI điều chỉnh âm thanh/chuyển động trên toàn website, kể cả trang cũ và mẫu dựng. Giữ nút nghe từ/câu phục vụ học, phản hồi âm thanh sau thao tác, tùy chọn đã lưu và giảm chuyển động của thiết bị. Quy tắc này thay thế yêu cầu hiển thị nút bật/tắt ở các phần bên dưới.

- Không dùng mũi tên trang trí ở đề mục/thẻ chọn mục. Ưu tiên chữ rõ, khoảng cách cân đối và vùng bấm dễ dùng; giữ các nút điều hướng có chức năng như thẻ trước/thẻ tiếp.

- **Phong cách UI toàn repo là tranh vẽ bút chì màu:** nền giấy, nét viền và chất liệu có cảm giác vẽ tay; áp dụng cho trang, thẻ, nút, biểu tượng và hình minh họa mới hoặc được chỉnh sửa. Giữ chữ Nunito rõ nét, tương phản và vùng bấm dễ dùng trên điện thoại.
- **Game và UI phải ngắn gọn:** tránh giải thích rườm rà, câu phụ lặp ý tiêu đề và đoạn mô tả thao tác hiển nhiên. Dùng nhãn ngắn, rõ; chỉ đặt hướng dẫn cần thiết ngay tại thao tác, và hiện gợi ý khi người học cần. Áp dụng cho toàn repo.
- Lớp 1–5 dùng cấu trúc, bốn game và ôn tổng hợp theo phiên bản lớp 2 hiện tại, giữ nội dung, bìa, tông màu, URL và tiến độ riêng từng lớp. Các topic phụ dùng chung một bộ bài ở tất cả các lớp; dẫn về cùng bài thay vì sao chép thành các bản riêng.

- **Nguyên tắc cốt lõi về ảnh:** sau khi tạo ảnh, phải tự mở và xem trực tiếp từng ảnh để kiểm tra tính hợp lý trước khi đưa vào website. Đối chiếu với nghĩa từ, nội dung bài và tình huống cần minh họa; kiểm tra hành động, đồ vật, nhân vật, số lượng, quan hệ không gian và logic thực tế trong ảnh. Nếu ảnh sai nghĩa, mơ hồ, vô lý hoặc có lỗi hình, phải sửa hoặc tạo lại rồi kiểm tra lại; chỉ đưa vào web khi ảnh đã đạt. Không coi việc tạo ảnh thành công là đã kiểm tra chất lượng.
- **Trang phục người lính:** mọi hình minh họa từ vựng có người lính phải dùng đúng trang phục bộ đội miền Bắc Việt Nam (Bộ đội Cụ Hồ), phù hợp thời kỳ và tình huống. Trước khi tạo hoặc sửa ảnh, tham khảo ảnh tư liệu trên internet để đối chiếu kiểu quân phục, màu sắc, mũ, quân hiệu, giày/dép và trang bị; không dùng quân phục nước ngoài hoặc pha trộn các thời kỳ. Với bối cảnh lịch sử phù hợp, đối chiếu quân phục xanh ô liu, mũ cối và dép cao su. Xem trực tiếp ảnh cuối trước khi đưa vào web. Không áp trang phục quân đội cho nghề khác như kiểm lâm. Nguồn tham khảo chỉ dùng khi biên soạn, không đưa tên hoặc liên kết nguồn vào tệp dự án hay UI.
- **Sửa đổi trực tiếp ngày 23/10/2026:** hình người lính theo mẫu người dùng phải đội **mũ cối xanh**, mặc quân phục xanh bộ đội; không dùng mũ hoặc áo bảo hộ xanh lam. Áp dụng cả tranh `peacekeeping` lớp 10. Không tự chuyển sang mẫu mũ xanh của lực lượng quốc tế; chỉ thay mẫu khi người dùng yêu cầu rõ.

### Mẫu thống nhất lớp 6–12

- Phiên bản mới nhất của lớp 6 là mẫu cấu trúc, cách chơi và thiết lập cho lớp 6–12. Khi tạo hoặc hoàn thiện lớp, đối chiếu trực tiếp mẫu lớp 6 đang có; áp dụng đủ danh mục, Unit, từ vựng, lật thẻ, chọn từ, gõ từ và các dạng luyện ngữ pháp. Nội dung theo đúng lớp, không đổi tên bài lớp 6 để dùng cho lớp khác.
- Vẫn giữ **tông màu, chất giấy kraft và ảnh bìa riêng cho từng lớp** để đa dạng. Thống nhất cấu trúc không có nghĩa là dùng chung màu hoặc bìa.
- Không hiển thị UI điều chỉnh **âm thanh/chuyển động** trên các trang lớp 6–12 theo yêu cầu trực tiếp của người dùng. Âm phản hồi sau thao tác, nút nghe phục vụ học và tôn trọng giảm chuyển động của thiết bị vẫn áp dụng; không tự đọc hoặc phát âm khi mở trang.
- Ảnh tạo mới theo phong cách **vẽ bút chì màu**, đúng nghĩa, không chữ trong hình; kiểm tra trực tiếp từng ảnh trước bàn giao. Giữ URL, ID từ/câu và tiến độ riêng từng lớp/hồ sơ khi nâng cấp.

- Thương hiệu của sản phẩm là **Danh English Tutor**.
- Quy tắc giọng đọc xuyên suốt repo: mỗi lần người học chọn hoặc nhập đáp án đúng, kể cả tự sửa đúng, phải có giọng đọc tiếng Anh của từ/cụm từ tương ứng; với nhiệm vụ cả câu, đọc câu đúng. Giữ nút nghe lại khi có. Không chỉ phát âm correct rồi bỏ qua giọng đọc; không đọc nhãn A/B/C/D, tiếng Việt hoặc ký hiệu IPA thay cho từ mẫu. Không tự đọc khi mở trang, khôi phục câu đã chấm hoặc nhấn lặp; tôn trọng lựa chọn tắt âm và dừng khi rời/ẩn trang. Kiểm tra sự kiện đọc thực tế cho cả đúng ngay và tự sửa đúng trước bàn giao.
- Giọng đọc phải có tệp âm thanh nội bộ dự phòng qua `DanhAnswerSpeech` khi trình duyệt thiếu hoặc lỗi Web Speech. Không nghiệm thu chỉ bằng mock `speechSynthesis.speak`: phải kiểm tra sự kiện media `playing`/`ended` với Web Speech bị vô hiệu hóa, và đổi phiên bản URL script khi cập nhật để tab cũ nạp bản mới. Bổ sung đáp án mới vào `scripts/build-answer-audio-plan.cjs` rồi dựng tệp âm thanh tương ứng.
- Mọi chỗ trống (gap) trong bài tập trên toàn repo phải hiển thị bằng **một nét gạch liền**, không dùng ba dấu gạch rời. Dùng bộ hiển thị chung `shared/exercise-gaps.js` và CSS trong `shared/learner-font.css`; ký hiệu placeholder nội bộ được giữ nguyên để không phá bộ dựng, chấm bài hoặc lượt dở. Trang/mẫu mới phải tải bộ chung qua `shared/learner-profile.js`.
- Không viết câu phụ (subtitle/sub) giải thích lại tiêu đề trong giao diện. Tiêu đề phải tự nói rõ nội dung; không thêm mô tả hiển nhiên bên dưới hoặc lặp ý bằng cách diễn đạt khác. Áp dụng từ nay cho mọi trang, mục và thành phần mới hoặc được chỉnh sửa. Hướng dẫn thao tác cần thiết của trò chơi đặt tại nơi thực hiện thao tác; slogan thương hiệu đã được người dùng duyệt giữ theo yêu cầu riêng.
- Nguồn đối chiếu bên ngoài chỉ dùng để tham khảo trong quá trình biên soạn. Không đưa tên thương hiệu hoặc đường dẫn của đơn vị phát hành nguồn đối chiếu vào UX/UI, mã nguồn, chú thích, dữ liệu, tài liệu hay các tệp tạo mới trong dự án.
- Có thể giữ tên bộ sách, lớp, Unit và chủ đề để học sinh chọn bài phù hợp. Nội dung luyện tập, ví dụ và hình minh họa được biên soạn riêng cho website.
- Áp dụng nguyên tắc trên cho mọi thay đổi tiếp theo, kể cả khi sao chép mẫu trang hoặc bổ sung một lớp mới.
- Phương châm giao diện: dùng font **Nunito**, phong cách đáng yêu, dễ thương, chữ lớn dễ đọc trên điện thoại. Bài luyện có âm thanh phản hồi nhẹ và animation phù hợp; có nút bật/tắt, nhớ lựa chọn và tôn trọng chế độ giảm chuyển động của thiết bị. Không tự phát âm thanh khi mở trang.
- Mọi vùng có tiếng Việt, kể cả footer, hộp thoại, nút và thành phần Shadow DOM, phải dùng Nunito có đủ dấu từ tệp nội bộ (`shared/learner-font.css`, ưu tiên `"Danh Nunito"`). Không chỉ dựa vào font tải ngoài. Trước bàn giao, kiểm tra dấu tiếng Việt ở vùng đã sửa khi chặn mạng ngoài; chạy kiểm tra font và xem trực tiếp giao diện trên điện thoại/máy tính.
- Kiểm tra font: `node scripts/check-vietnamese-fonts.cjs`; khi thay font hoặc thành phần dùng chung, chạy thêm `node tests/learner-profiles/vietnamese-fonts.browser.cjs` để kiểm tra glyph thực tế khi mạng ngoài bị chặn.
- Hình minh họa từ vựng không chứa chữ hoặc nghĩa tiếng Việt bên trong ảnh. Nghĩa tiếng Việt hiển thị bằng văn bản riêng ngoài ảnh. Luôn mở và xem trực tiếp từng ảnh được dùng để kiểm tra đúng nghĩa, không có chữ và không lỗi hình trước khi bàn giao; không dùng lại ảnh lớp 6–7 có nghĩa tiếng Việt trong hình.

## Hồ sơ và lưu lộ trình

- Đọc [Hồ sơ người học](docs/LEARNER_PROFILES.md) trước khi thay đổi lưu trữ hoặc luồng bắt đầu học.
- Tiến độ, lượt dở và tùy chọn cá nhân phải dùng `window.DanhLearners.storage`, với khóa học bắt đầu bằng `danh-`, `danh:` hoặc `danh.`. Không ghi trực tiếp vào vùng `localStorage` dùng chung; giữ ID hồ sơ cố định trong suốt vòng đời tài liệu.
- Trang và mẫu mới tải `shared/learner-profile-core.js`, rồi `shared/learner-profile.js` trước các script bài học. Không dùng tên làm định danh, không tự nhập chung hai hồ sơ trùng tên.
- Giữ khả năng chuyển đổi tiến độ cũ, đổi tên không mất dữ liệu, sao lưu/khôi phục và học trong phiên khi bộ nhớ bị chặn. Kiểm tra đổi người học, nhiều tab, tải lại và xóa chỉ một hồ sơ.

## Dựng và chỉnh sửa video

- Trước khi dựng hoặc chỉnh sửa video cho người dùng, đọc [Quy tắc dựng video](docs/VIDEO_EDITING_RULES.md). Áp dụng phản hồi ở vùng bên dưới, âm wrong/correct và zoom trực tiếp từ khóa trong câu; không dùng khung chữ lớn che nội dung.
- Các quy tắc video chỉ áp dụng cho sản phẩm video; hướng dẫn trực tiếp mới nhất của người dùng luôn được ưu tiên.

