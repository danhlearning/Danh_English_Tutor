# Lớp 7 Global Success

## Nội dung

12 Unit, 96 từ (8 từ/Unit). Từ, nghĩa, câu ví dụ và bài tập do website biên soạn; đây là bộ luyện theo chủ đề, không phải toàn bộ từ hoặc bài tập trong sách. 432 mục luyện ngữ pháp gồm 144 câu điền khuyết, với hai cách luyện chọn đáp án và điền từ; thêm xếp câu, sửa lỗi và 72 bài viết lại câu. Mỗi Unit/cấp độ có 12 mục, đủ một lượt 10 câu với ít nhất 2 bài viết lại. Ba cấp độ dùng các câu khác nhau.

Các hoạt động gồm nghe bằng giọng thiết bị, xem từ vựng, lật thẻ, chọn nghĩa, gõ từ; ngữ pháp có Unit/học kỳ, điểm, chuỗi đúng, gợi ý trễ và đáp án sau hai lần sai hoặc một phút. Bộ nhớ tiến độ lớp 7 dùng khóa riêng, không lẫn với lớp 6. Kế thừa kiểu chữ lớn trên điện thoại của lớp 6.

## Nguồn đối chiếu

- Danh sách 12 Unit Tiếng Anh 7 Global Success.
- [Book Map và ngữ pháp trong tài liệu tập huấn của NXBGDVN](https://medialib.qlgd.edu.vn/Uploads/THU_VIEN/shn/2/37/UserFiles/TLBD-Anh-7---Global-Success-434ab8a9-7aa0-48d3-a228-a433dd62d185.pdf), trang in 6–7, trang PDF 12.

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

19 ảnh riêng biệt được tạo bằng công cụ imagegen tích hợp, mỗi từ một yêu cầu tạo ảnh. Ảnh lưu tại `grade/lop7/assets/images/`; mô tả đầy đủ trong `grade7-image-prompts.json`. Ảnh chân thật, khung vuông, rõ bối cảnh. Các khái niệm trừu tượng có chữ nghĩa tiếng Việt ngay trong ảnh. Driverless là hình minh họa khái niệm xe tự lái; ảnh không khẳng định một mẫu xe thương mại cụ thể có tính năng này. Người bản ngữ là người tiếp thu ngôn ngữ từ nhỏ, không xác định bằng ngoại hình hay quốc tịch.

Ảnh xuất hiện ở danh sách từ và mặt nghĩa của thẻ. Mặt tiếng Anh, chọn nghĩa và gõ từ không hiện ảnh chứa nghĩa để tránh lộ đáp án. Các từ dễ nhận biết còn dùng biểu tượng như lớp 6.

## Kiểm tra

`node --test grade/lop7/tests/*.test.cjs`, kiểm tra cú pháp, liên kết và footer. Kiểm tra trên trình duyệt phải bao gồm 12 trang Unit, 36 lựa chọn ngữ pháp Unit/cấp độ, các dạng trả lời, chuyển câu, xem kết quả, màn hình điện thoại và ảnh tải đúng.

Đã kiểm tra ngày 02/10/2026: toàn bộ các kiểm tra dữ liệu hiện có đạt; 102 trang không có liên kết nội bộ hỏng; footer đủ ở 86 trang thuộc phạm vi kiểm tra. Trình duyệt Edge tự động hoàn thành 36 lượt ngữ pháp (360 câu trả lời đúng), đủ 5 dạng và 2 bài viết lại/lượt; mở cả 12 Unit, tải đủ 19 ảnh, hoàn thành chọn nghĩa và gõ từ 8/8. Không tràn ngang ở các khung 375×812, 390×844, 430×932, 844×390 và 1280×800. Câu hỏi điện thoại có cỡ chữ tối thiểu 24 px. Ảnh xem thử lưu tại `artifacts/grade7-preview/`.

Chạy kiểm tra trình duyệt: cài hoặc dùng Playwright có sẵn, mở máy chủ tĩnh ở cổng 8001 và chạy `node grade/lop7/tests/browser-smoke.cjs`. Có thể đặt `PLAYWRIGHT_MODULE` trỏ tới runtime sẵn có, `LESSON_BASE_URL` để đổi cổng và `BROWSER_CHANNEL` để đổi trình duyệt. Giọng đọc dùng tiếng Anh trên thiết bị; chưa nghe và thử bàn phím trên điện thoại vật lý.
