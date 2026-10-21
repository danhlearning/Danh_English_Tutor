# Lớp 7 Global Success

## Nội dung

12 Unit, 96 từ (8 từ/Unit). Từ, nghĩa, câu ví dụ và bài tập do website biên soạn; đây là bộ luyện theo chủ đề, không phải toàn bộ từ hoặc bài tập trong sách. 432 mục luyện ngữ pháp gồm 144 câu điền khuyết, với hai cách luyện chọn đáp án và điền từ; thêm xếp câu, sửa lỗi và 72 bài viết lại câu. Mỗi Unit/cấp độ có 12 mục, đủ một lượt 10 câu với ít nhất 2 bài viết lại. Ba cấp độ dùng các câu khác nhau.

Các hoạt động gồm nghe bằng giọng thiết bị, xem từ vựng, lật thẻ, chọn nghĩa, gõ từ; ngữ pháp có Unit/học kỳ, điểm, chuỗi đúng, gợi ý trễ và đáp án sau hai lần sai hoặc một phút. Bộ nhớ tiến độ lớp 7 dùng khóa riêng, không lẫn với lớp 6. Kế thừa kiểu chữ lớn trên điện thoại của lớp 6.

## Chủ điểm

| Unit | Chủ điểm ngữ pháp |
| --- | --- |
| 1 | Hiện tại đơn |
| 2 | Câu đơn |
| 3 | Quá khứ đơn |
| 4 | Like, different from, (not) as … as |
| 5 | Some, a lot of, lots of |
| 6 | Giới từ thời gian và nơi chốn |
| 7 | It chỉ khoảng cách; should/shouldn't |
| 8 | Although/though, however |
| 9 | Câu hỏi Yes/No |
| 10 | Hiện tại tiếp diễn |
| 11 | Tương lai đơn; đại từ sở hữu |
| 12 | Mạo từ |

## Hình ảnh

Ngày 21/10/2026: dùng đủ 96 tranh bút chì màu, 768 × 768 px, tại `grade/lop7/assets/images/pencil/unit1/` đến `unit12/`, thay bộ 19 ảnh cũ. Nguồn, prompt cuối và SHA-256 ở `artifacts/grade7-pencil/final-prompts.json`; trang duyệt đủ tranh ở `artifacts/grade7-pencil/review.html`. Giữ hai bản sửa đồng xu và máy ảnh. Ảnh không có chữ/nhãn nghĩa bên trong; nghĩa Việt nằm ngoài ảnh. Native speaker dùng cảnh giao tiếp từ nhỏ trong gia đình; nghĩa và ví dụ giải thích khái niệm, không suy ra ngôn ngữ từ ngoại hình.

Ảnh xuất hiện ở danh sách từ và mặt nghĩa của thẻ. Mặt tiếng Anh, chọn từ và gõ từ không hiện ảnh để giữ nhiệm vụ nhớ từ. Cả 96 từ có tranh riêng; biểu tượng chỉ là dự phòng khi ảnh lỗi. Khung ảnh chung ở `shared/secondary-vocabulary-visuals.css`, co vừa khung và không cắt chủ thể. Giữ tông lavender, chất giấy và bìa riêng lớp 7; cấu trúc/cách chơi theo mẫu lớp 6 mới nhất. Phiên bản tải dữ liệu `pencil-20261021` được giữ trong bộ đồng bộ mẫu.

## Bản hoàn thiện hiện tại

576 mục gồm 432 mục ngữ pháp gốc (144 chọn, 144 điền, 36 xếp, 36 sửa lỗi, 72 viết lại), 24 mục nhận biết phát âm và 120 mục giới từ trong 12 đoạn văn (10 chỗ trống/đoạn). Nhiều dạng có thể luyện cùng ngữ cảnh; không coi đây là 576 ngữ cảnh độc lập. Viết lại đối chiếu đáp án mẫu; phát âm không chấm giọng nói. Lượt có tối đa 10 mục và báo đúng số thực tế. Giữ URL, ID từ/câu và khóa lớp 7/hồ sơ. Lật thẻ không ghi thành thạo; chọn từ tách đúng ngay, tự sửa và xem đáp án. Gõ từ chưa khôi phục nguyên lượt dở. Không hiện UI điều chỉnh âm/chuyển động, không tự phát khi tải trang.

Kiểm tra hiện tại: `node --test grade/lop7/tests/content.test.cjs tests/secondary-images/grade7-pencil.test.cjs tests/secondary-images/content.test.cjs tests/secondary-template/content.test.cjs`; `node tests/secondary-images/grade7-pencil.browser.cjs`; đặt `TEST_GRADES=7` rồi chạy `node tests/secondary-template/browser.cjs`. Bản ghi lớp được chọn không ghi đè kết quả kiểm tra cả bảy lớp. Hai bài trình duyệt này thay cho selector của giao diện cũ trong `grade/lop7/tests/browser-smoke.cjs`.

Đã kiểm tra 36 trang Unit ở 320/390/1280px, đủ 96 mặt thẻ, fallback ảnh lỗi, luồng đúng/sai/tự sửa/nhấn lặp/tải lại/tiếp tục, gõ từ, hai học kỳ và bốn nhóm ngữ pháp ở Unit 1/12; hồ sơ riêng và bộ nhớ bị chặn. Chặn mạng ngoài, xem trực tiếp ảnh chụp máy tính/điện thoại và chữ Việt. Kết quả ở `artifacts/grade7-pencil/browser-results.json` và `artifacts/secondary-template/browser-results-selected.json`. Đây là Edge mô phỏng, chưa kiểm tra điện thoại vật lý hoặc nghe âm bằng tai. Phần kiểm tra cũ bên dưới là lịch sử.

## Kiểm tra

`node --test grade/lop7/tests/*.test.cjs`, kiểm tra cú pháp, liên kết và footer. Kiểm tra trên trình duyệt phải bao gồm 12 trang Unit, 36 lựa chọn ngữ pháp Unit/cấp độ, các dạng trả lời, chuyển câu, xem kết quả, màn hình điện thoại và ảnh tải đúng.

Đã kiểm tra ngày 02/10/2026: toàn bộ các kiểm tra dữ liệu hiện có đạt; 102 trang không có liên kết nội bộ hỏng; footer đủ ở 86 trang thuộc phạm vi kiểm tra. Trình duyệt Edge tự động hoàn thành 36 lượt ngữ pháp (360 câu trả lời đúng), đủ 5 dạng và 2 bài viết lại/lượt; mở cả 12 Unit, tải đủ 19 ảnh, hoàn thành chọn nghĩa và gõ từ 8/8. Không tràn ngang ở các khung 375×812, 390×844, 430×932, 844×390 và 1280×800. Câu hỏi điện thoại có cỡ chữ tối thiểu 24 px. Ảnh xem thử lưu tại `artifacts/grade7-preview/`.

Chạy kiểm tra trình duyệt: cài hoặc dùng Playwright có sẵn, mở máy chủ tĩnh ở cổng 8001 và chạy `node grade/lop7/tests/browser-smoke.cjs`. Có thể đặt `PLAYWRIGHT_MODULE` trỏ tới runtime sẵn có, `LESSON_BASE_URL` để đổi cổng và `BROWSER_CHANNEL` để đổi trình duyệt. Giọng đọc dùng tiếng Anh trên thiết bị; chưa nghe và thử bàn phím trên điện thoại vật lý.
