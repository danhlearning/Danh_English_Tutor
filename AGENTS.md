# Chỉ dẫn phát triển Danh English Tutor

## Định hướng sản phẩm: game học tiếng Anh

- Phát triển toàn bộ website theo tư duy **game học tiếng Anh**. Mỗi hoạt động có mục tiêu học, thử thách vừa sức, thao tác chơi rõ ràng, phản hồi và cơ hội ôn lại. Cơ chế chơi phải giúp người học hiểu, nhớ hoặc sử dụng tiếng Anh.
- Áp dụng cho trang chủ, Luyện theo kỹ năng, các lớp/Unit, từ vựng, ngữ pháp, phát âm và phản xạ. Phòng ngữ pháp hiện tại là mẫu tham khảo về phong cách và phản hồi; điều chỉnh cơ chế theo kỹ năng và độ tuổi.
- Trước khi thêm game, bài học hoặc thay đổi đáng kể UX/UI, đọc [Nguyên tắc thiết kế game học tiếng Anh](docs/NGUYEN_TAC_GAME_HOC_TIENG_ANH.md). Ghi rõ mục tiêu học, cách chơi, cách chấm, hỗ trợ khi sai và điều kiện hoàn thành trước khi triển khai.
- Vòng học chuẩn: chọn mục tiêu → chơi lượt ngắn → nhận phản hồi → tự sửa → tổng kết → ôn hoặc chơi tiếp. Ưu tiên một nhiệm vụ rõ ràng trên điện thoại, giữ quyền chọn bài và tiếp tục lượt dở.
- Khen nỗ lực và việc tự sửa; tách đúng ngay, sửa đúng, đã xem đáp án và bỏ qua. Điểm, huy hiệu và trạng thái tiến bộ phải phản ánh bằng chứng học; lượt mở bài hoặc xem đáp án không trở thành bằng chứng thành thạo.
- Dùng lại thành phần hiển thị, âm thanh, animation và lưu tùy chọn khi phù hợp; giữ dữ liệu và tiến độ từng kỹ năng/lớp độc lập. Khi nâng cấp bài cũ, bảo toàn URL và tiến độ hoặc có cách chuyển đổi rõ ràng.
- Nghiệm thu cả trải nghiệm chơi và chất lượng học: nội dung/đáp án, phản hồi đúng/sai, thao tác lặp, tiếp tục lượt, âm thanh, giảm chuyển động và bố cục điện thoại. Chỉ báo đạt những bước đã kiểm tra.

## Nội dung và giao diện

- Thương hiệu của sản phẩm là **Danh English Tutor**.
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

