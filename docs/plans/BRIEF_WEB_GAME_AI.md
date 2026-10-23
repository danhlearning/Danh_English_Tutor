# Brief phát triển Danh English Tutor thành web game học tiếng Anh

Ngày đóng gói: 24/10/2026.

## 1. Vai trò và mục tiêu

Bạn là người phát triển tiếp repo **Danh English Tutor** tại:

`C:\Users\Admin\Documents\Codex\Danh English Tutor`

Mục tiêu là phát triển website hiện có thành **web game học tiếng Anh 2D theo chặng**, với nhiệm vụ ngắn, thao tác rõ, phản hồi giúp học, cơ hội tự sửa và ôn lại.

Tận dụng nội dung, ảnh, âm thanh và các bộ game đang có. Ưu tiên nâng cấp từng phần; chưa viết lại toàn bộ website hoặc chuyển nền tảng khi chưa chứng minh được nhu cầu.

**Đợt đầu chỉ triển khai nền tảng cần thiết và một chương game thử nghiệm. Không đồng loạt chuyển đổi 12 lớp.**

## 2. Đọc trước khi làm

Đọc và tuân thủ:

- `AGENTS.md`
- `docs/NGUYEN_TAC_GAME_HOC_TIENG_ANH.md`
- `docs/LEARNER_PROFILES.md`
- `docs/ARCHITECTURE.md`
- Các tài liệu và báo cáo liên quan trực tiếp đến phần sẽ sửa.

Nếu tài liệu khác với mã đang chạy, kiểm tra và ghi rõ hiện trạng. Không xem báo cáo nghiệm thu cũ là bằng chứng rằng phiên bản hiện tại đã đạt.

Các nhận xét dưới đây xuất phát từ lần rà soát ngày 23/10/2026; cần xác minh lại trước khi sửa.

## 3. Định hướng trải nghiệm

Phát triển một **cuốn sổ phiêu lưu bằng tranh bút chì màu**:

- Mỗi Unit là một địa điểm hoặc một trang trong cuốn sổ.
- Mỗi chặng có một mục tiêu học cụ thể.
- Người học dùng tiếng Anh để hoàn thành việc có ý nghĩa trong tình huống.
- Một lượt chơi ngắn, khoảng 6–10 nhiệm vụ, điều chỉnh theo tuổi và nội dung.
- Kết thúc có tổng kết, ôn phần còn khó và quyền chọn chơi tiếp.
- Giữ lối chọn trực tiếp lớp, Unit và kỹ năng; không ép mọi người đi theo một đường duy nhất.

Vòng học:

**Chọn nhiệm vụ → thử sức → nhận phản hồi → tự sửa → tổng kết → ôn hoặc chơi tiếp.**

Phân biệt rõ:

- Hoàn thành lượt: đã xử lý hết nhiệm vụ.
- Kết quả học: đúng ngay, tự sửa, có gợi ý, đã xem hoặc bỏ qua.
- Thành thạo: có bằng chứng nhớ và vận dụng, gồm ôn sau một khoảng thời gian.

Không dùng điểm thưởng hoặc việc mở bài để suy ra thành thạo.

## 4. Những nền tảng cần giữ

- Thương hiệu **Danh English Tutor**.
- Phong cách bút chì màu, nền giấy và chữ Nunito nội bộ có đủ dấu tiếng Việt.
- Màu sắc, bìa và nội dung riêng từng lớp.
- Hai lối học theo lớp và theo kỹ năng.
- Phòng ngữ pháp và các cơ chế tự sửa, ôn lỗi sai, ôn cách quãng đang có.
- Hồ sơ riêng, sao lưu, lượt dở và khả năng học khi bộ nhớ bị chặn.
- Giọng đọc tiếng Anh và âm thanh nội bộ dự phòng.
- URL, ID nội dung và tiến độ hiện hữu.
- Topic phụ dùng chung giữa các lớp, không nhân bản thành nhiều bộ riêng.

Lớp 1–5 tiếp tục theo mẫu lớp 2. Lớp 6–12 tiếp tục lấy lớp 6 làm mẫu cấu trúc; đưa cải tiến đã được kiểm chứng về mẫu chung trước khi mở rộng.

## 5. Những điểm cần xác minh và xử lý

### 5.1. Chất lượng giữa các lớp chưa đồng đều

Ở thời điểm rà soát:

- Phần gõ từ lớp 6 giữ thứ tự, vị trí và điểm trong bộ nhớ trang.
- Lớp 11–12 có cơ chế lưu nháp, lần sai, gợi ý và kết quả chi tiết hơn.

Kiểm tra lại, rồi chuẩn hóa cơ chế dùng chung. Giữ dữ liệu từng lớp, Unit, kỹ năng và hồ sơ độc lập.

### 5.2. Trang chủ chưa ưu tiên việc học tiếp theo

Bổ sung ba hành động rõ ràng khi có dữ liệu phù hợp:

- **Chơi tiếp**: mở đúng lượt dở.
- **Ôn hôm nay**: tạo lượt ngắn từ nội dung cần ôn.
- **Chọn nhiệm vụ**: tự chọn lớp, Unit hoặc kỹ năng.

Chỉ hiện “Chơi tiếp” khi có thao tác học thực tế. Không coi việc ghé trang là lượt học dở.

Phần tổng hợp đọc dữ liệu qua bộ kết nối của từng kỹ năng; không gộp tất cả tiến độ thành một điểm chung.

### 5.3. Tên bài IPA và cách hỗ trợ khi sai

Ở thời điểm rà soát, bài IPA chủ yếu yêu cầu nhìn phiên âm rồi gõ từ, nhưng có tên “Luyện phát âm” hoặc “Luyện tập phản xạ”.

- Đặt tên đúng phạm vi, chẳng hạn **“Đọc phiên âm, đoán từ”**.
- Giữ URL cũ.
- Cho gợi ý và tự sửa trước khi chủ động xem đáp án.
- Không mô tả bài này như công cụ đánh giá phát âm.

### 5.4. Kiểm tra và tài liệu cần cập nhật

Ở thời điểm rà soát:

- Kiểm tra liên kết và ID đạt trên 322 trang.
- Kiểm tra font tĩnh đạt trên 322 trang.
- Một kiểm tra Body Parts thất bại vì còn đối chiếu ảnh `mouth-v1`, trong khi dữ liệu dùng `mouth-boy-v2`.
- Quy trình kiểm tra tự động chưa bao phủ nhóm `upper-secondary` và các luồng trình duyệt quan trọng.
- README và tài liệu kiến trúc còn một số mô tả cũ.

Xác minh lại các điểm này. Cập nhật kiểm tra theo hành vi và tài nguyên đã được duyệt; không phục hồi hành vi cũ chỉ để làm kiểm tra đạt.

## 6. Chương game thử nghiệm

Chọn một Unit lớp 2 có nội dung phù hợp sau khi kiểm tra ngân hàng hiện tại.

Ý tưởng ưu tiên: **“Chuẩn bị cặp đi học”**.

| Thành phần | Yêu cầu |
|---|---|
| Mục tiêu học | Nhận biết đồ dùng học tập, hiểu yêu cầu ngắn và nhớ cách viết một số từ |
| Bối cảnh | Nhân vật chuẩn bị đi học và cần người chơi giúp |
| Nhiệm vụ 1 | Nghe yêu cầu, chạm chọn đồ vật |
| Nhiệm vụ 2 | Đọc hoặc nghe câu ngắn, chọn đồ phù hợp để cho vào cặp |
| Nhiệm vụ 3 | Gõ lại một số từ đã học, với mức hỗ trợ phù hợp |
| Độ dài | Khoảng 6–8 nhiệm vụ cho một lượt thử nghiệm |
| Khi sai | Phản hồi nhẹ, cho nghe lại hoặc gợi ý, rồi thử lại |
| Xem đáp án | Do người học chủ động chọn; ghi riêng kết quả |
| Hoàn thành | Đã xử lý toàn bộ nhiệm vụ; phần cần trợ giúp chuyển sang lượt ôn |
| Phần thưởng | Hoàn thiện một trang sổ hoặc nhận vật trang trí nhỏ |
| Chơi lại | Ưu tiên nội dung còn khó và tình huống khác khi ngân hàng cho phép |

Không bắt buộc kéo thả; phải có cách chạm chọn thuận tiện trên điện thoại.

Nếu Unit hiện tại không phù hợp, chọn Unit khác và giải thích ngắn lý do. Không đổi tên một bài không liên quan để ép vào ý tưởng này.

Trước khi triển khai, ghi rõ mục tiêu học, nội dung, đáp án được chấp nhận, cách chấm, gợi ý, điều kiện hoàn thành và dữ liệu lưu.

## 7. Phạm vi phát triển theo giai đoạn

### Giai đoạn 1 — Xác minh và chuẩn hóa

- Kiểm tra hiện trạng repo và thay đổi chưa hoàn tất.
- Xác định nguồn dữ liệu, mẫu trang và bộ dựng đang được dùng.
- Lập bảng ngắn về tính năng các lớp: lưu lượt, tự sửa, gợi ý, giọng đọc, ôn tập.
- Xử lý kiểm tra lỗi thời và cập nhật tài liệu liên quan.
- Chốt cách bảo toàn URL, ID và tiến độ.

**Đầu ra:** hiện trạng được xác minh và danh sách thay đổi nhỏ, có thứ tự ưu tiên.

### Giai đoạn 2 — Nền tảng chơi và học tiếp

- Chuẩn hóa kết quả lượt chơi và lưu lượt cho phần được nâng cấp.
- Bổ sung “Chơi tiếp” và “Ôn hôm nay” trong phạm vi các bộ dữ liệu đã tích hợp.
- Không hiển thị số liệu toàn website nếu mới đọc được một phần.
- Nâng mẫu lớp 6 bằng các cải tiến phù hợp đã có ở lớp 11–12, giữ tương thích tiến độ.
- Sửa tên và luồng tự sửa của bài IPA nếu hiện trạng vẫn còn vấn đề.

**Đầu ra:** luồng học tiếp nhất quán, không mất hoặc ghi nhầm tiến độ.

### Giai đoạn 3 — Một chương game hoàn chỉnh

- Dựng chương thử nghiệm lớp 2.
- Kết nối ba nhiệm vụ bằng bối cảnh ngắn.
- Hoàn thiện phản hồi, âm thanh, tự sửa, tổng kết, lượt dở và ôn lại.
- Kiểm tra điện thoại, máy tính, bàn phím và giảm chuyển động.

**Đầu ra:** một chương chơi được từ đầu đến cuối, đủ để học sinh dùng thử.

### Giai đoạn 4 — Thử nghiệm với học sinh

Chuẩn bị kịch bản để thầy quan sát:

- Học sinh có tự bắt đầu được không?
- Có hiểu phải làm gì mà không cần giải thích thêm không?
- Sai ở đâu và có tự sửa được không?
- Sau vài ngày có nhớ lại được không?
- Có làm được một tình huống mới sử dụng cùng kiến thức không?

AI không được tự tuyên bố đã kiểm chứng hiệu quả học nếu chưa có dữ liệu thử với người học.

**Điểm dừng đợt đầu:** bàn giao chương thử nghiệm và kế hoạch quan sát. Chưa tự mở rộng toàn bộ các lớp.

## 8. Yêu cầu kỹ thuật và bảo toàn dữ liệu

- Tận dụng nền HTML/CSS/JavaScript hiện tại khi đáp ứng được mục tiêu.
- Tách rõ nội dung, luật chấm, trạng thái lượt chơi và giao diện.
- Dùng chung phần ổn định; không tạo một bộ xử lý gần giống nhau cho mỗi lớp.
- Không sửa riêng trang sinh ra rồi để bộ dựng ghi đè mất thay đổi.
- Tiến độ dùng `window.DanhLearners.storage` theo quy định repo.
- Giữ ID hồ sơ cố định trong vòng đời tài liệu.
- Giữ khóa cũ hoặc có cách chuyển đổi rõ ràng, kiểm tra được.
- Mọi chuyển đổi phải giữ bằng chứng học cũ; không nâng thành tích do thay cách tính.
- Xử lý tải lại, nhiều tab, đổi hồ sơ, lưu bị chặn và dữ liệu hỏng.
- Không yêu cầu tài khoản trực tuyến để chơi thử.
- Không thêm dịch vụ, framework hoặc phụ thuộc lớn nếu chưa nêu được nhu cầu cụ thể.

## 9. Quy tắc giao diện, ảnh và âm thanh

- Một nhiệm vụ chính trên mỗi màn hình.
- Nhãn ngắn, không có subtitle lặp lại tiêu đề.
- Không thêm mũi tên trang trí vào tiêu đề hoặc thẻ chọn mục.
- Vùng bấm thuận tiện, chữ lớn và tương phản rõ trên điện thoại.
- Tôn trọng giảm chuyển động của thiết bị.
- Không thêm UI chỉnh âm thanh/chuyển động vào lớp 6–12.
- Không tự phát âm thanh khi mở trang.
- Đáp án đúng, kể cả tự sửa đúng, phải đọc từ/cụm từ hoặc câu tiếng Anh tương ứng.
- Có âm thanh nội bộ dự phòng qua `DanhAnswerSpeech`.
- Không phát lại chỉ vì tải lại câu đã chấm hoặc bấm lặp.
- Dừng âm khi rời hoặc ẩn trang.
- Gap dùng bộ hiển thị chung của repo.
- Ảnh mới đúng phong cách bút chì màu, không chữ trong ảnh.
- Phải mở xem trực tiếp từng ảnh mới hoặc thay thế trước khi đưa vào website.
- Tuân thủ đầy đủ quy định riêng về hình người lính trong `AGENTS.md`.

## 10. Những việc chưa làm trong đợt đầu

- Chuyển đổi đồng loạt 12 lớp.
- Viết lại toàn bộ bằng framework khác.
- Thế giới 3D hoặc hệ thống nhân vật di chuyển phức tạp.
- Nhiều người chơi trực tiếp, chat hoặc bảng xếp hạng toàn trường.
- Hệ thống mạng sống khiến học sinh bị chặn học khi sai.
- Nhiều loại tiền, cửa hàng hoặc phần thưởng tách rời việc học.
- Chấm phát âm hoặc hội thoại mở bằng AI.
- Đồng bộ máy chủ và quản lý lớp học quy mô lớn.
- Tăng nội dung bằng cách chỉ đảo đáp án hoặc lặp tình huống.
- Xóa hàng loạt trang cũ, ảnh hoặc thư mục sản phẩm tạm.

Các tính năng trên chỉ xem xét sau khi chương thử nghiệm chứng minh được giá trị và có yêu cầu tiếp theo.

## 11. Tiêu chí nghiệm thu

Chỉ báo đạt những phần đã kiểm tra thực tế:

- Nội dung và đáp án đúng, đủ ngữ cảnh.
- Sai được hỗ trợ và có cơ hội tự sửa.
- Đúng ngay, tự sửa, có gợi ý, đã xem và bỏ qua được ghi đúng.
- Nhấn lặp, tải lại và quay lại trang không nhân điểm.
- Tiếp tục lượt giữ đúng vị trí, nháp và kết quả.
- Đổi hồ sơ không trộn tiến độ.
- Âm thanh đúng sự kiện; kiểm tra `playing`/`ended` khi tắt Web Speech.
- Nunito tiếng Việt hoạt động khi chặn mạng ngoài.
- Không tràn hoặc che thao tác trên điện thoại.
- Bàn phím và giảm chuyển động sử dụng được.
- URL cũ và tiến độ cũ được bảo toàn.
- Bộ dựng tái tạo được thay đổi mà không làm mất tính năng.
- Các kiểm tra phù hợp với phạm vi thay đổi đều đạt.

Phân biệt rõ kiểm tra tự động, kiểm tra trình duyệt mô phỏng, thiết bị vật lý và thử với học sinh.

## 12. Cách bắt đầu và báo cáo

Bắt đầu bằng việc đọc repo và xác minh hiện trạng, sau đó đưa kế hoạch triển khai ngắn theo các giai đoạn trên. Tiếp tục thực hiện các thay đổi cục bộ có thể hoàn tác trong phạm vi đợt đầu; chỉ hỏi khi thiếu thông tin quyết định hoặc cần thay đổi phạm vi đáng kể.

Không triển khai lên website công khai, xóa dữ liệu người học hoặc mở rộng sang tính năng ngoài brief khi chưa được yêu cầu.

Khi bàn giao, báo cáo:

1. Đã thay đổi gì và giúp người học như thế nào.
2. Chương thử nghiệm và cách mở để kiểm tra.
3. Cách bảo toàn URL và tiến độ.
4. Những kiểm tra đã chạy, kết quả và giới hạn.
5. Phần chưa hoàn thành hoặc cần học sinh dùng thử.
6. Bước tiếp theo được đề xuất dựa trên bằng chứng.

Ưu tiên cuối cùng: **một chương game ngắn, rõ, vui và giúp học sinh nhớ được tiếng Anh; sau đó mới nhân rộng.**
