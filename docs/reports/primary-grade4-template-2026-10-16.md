# Lớp 1, 3, 5 theo mẫu lớp 4 · 16/10/2026

## Kết quả

- 56 Unit: lớp 1 có 16, lớp 3 và 5 mỗi lớp 20. Giữ 277 mục từ/cụm từ và 188 câu mẫu từ ngân hàng hiện có; bổ sung IPA và câu điền cho từng mục.
- Dùng đúng CSS/bố cục lớp 4 và bộ Game 1–3 sẵn có. Sáu tab: Từ vựng, Mẫu câu, Lật thẻ, Nghe chọn tranh, Gõ từ, Dùng trong câu. Có bộ chọn từ và danh mục ôn hôm nay.
- Bảng từ, thẻ, bộ chọn, nghe chọn tranh, gõ và điền câu đều dùng ảnh bitmap, không dùng emoji/SVG vẽ icon thay hình từ vựng. Biểu tượng nút thao tác/phản hồi vẫn theo bộ dùng chung.
- Kho mới có 163 WebP gồm một phiên bản sửa của “small”; 162 ảnh mới được chọn, kết hợp 64 ảnh AI có sẵn thành 226 ảnh dùng trong bản đồ nội dung. Bản gốc giữ ở `artifacts/primary-template/originals/`. Ảnh “bag” tạo mới thành ba lô học sinh; “small” chọn bản v2 có gấu tí hon trên lòng bàn tay.
- Tạo bằng công cụ imagegen tích hợp, không dùng CLI/API riêng. Prompt đầy đủ: `docs/primary-image-prompts.json`; prompt sửa small: `docs/primary-small-v2-prompt.txt`. Bản đồ chọn ảnh: `shared/assets/primary-vocabulary/manifest.json`.

## Tiến độ

Bộ chọn, lật thẻ, nghe/gõ dùng `danh.learning.g<lớp>unit<N>.v1`. Bằng chứng từng kỹ năng/lịch ôn dùng `danh.grade<lớp>.words.v1`; điền câu, ôn và tab dùng các khóa `danh-g<lớp>-...-template-...-v1`. Tất cả qua `DanhLearners.storage`; không sửa core hồ sơ.

Điền câu và lượt ôn giữ nháp, thứ tự, vị trí, lỗi và kết quả. Tách đúng ngay, tự sửa, đã xem và bỏ qua; mở thẻ không thành luyện đúng. Hiện đáp án sau 10 giây học tích cực, tạm ngừng đếm khi rời hoạt động hoặc ẩn tab. Câu sai được ưu tiên ôn. Không gắn nhãn thành thạo từ lượt mở bài.

Giữ nguyên toàn bộ khóa game cũ. Unit có lối tiếp tục các lượt trước ở `legacy.html?unit=unit<N>&mode=<mode>`; URL Unit cũ có tham số mode chuyển đến đúng lượt đó. Không biến kết quả xếp câu cũ thành bằng chứng điền từ mới.

## Kiểm tra

- 68/68 kiểm tra Node đạt, gồm dữ liệu/ảnh/IPA/câu điền, sáu tab, tiến độ mới và hồi quy lớp 2/4/7, phòng ngữ pháp, hồ sơ.
- 168 trang nguồn đạt liên kết/ID; 162 trang trong phạm vi đạt footer; 82 tệp JavaScript đạt cú pháp.
- Edge headless/Playwright đạt trên 56 Unit, gồm tải ảnh thực cho mọi mục từ, sáu tab, bốn game, chọn bộ, điểm đúng ngay/sửa/xem/bỏ qua, chống nhấn lặp, nháp/thứ tự/tải lại, lịch ôn và tiếp tục ôn, mute và nhớ tùy chọn, không tự đọc khi tải lại, cách ly lớp/hồ sơ, lưu hỏng/bị chặn và giảm chuyển động. Kiểm tra tải lại riêng cả sáu tab trên ba lớp (18 trường hợp). Khung 320/390/760/1280px không tràn ngang.
- Bộ game chung có tùy chọn `initialTab` và `onTabChange` để khôi phục hoạt động và cập nhật tab từ cùng một điểm; thao tác dựng giao diện Từ vựng bên trong Game 1–3 không ghi đè tab người học đang tiếp tục. Các trang cũ tiếp tục dùng thiết lập mặc định.
- Bộ trình duyệt game cũ lớp 3 đạt: 20 Unit, bốn mode, chấm/ôn, nhấn lặp, lượt dở, tùy chọn và lưu trữ. Các thử nghiệm cũ dùng trang legacy.
- Đã xem năm bảng QA bao gồm toàn bộ kho ảnh mới và ảnh chụp giao diện điện thoại. Ảnh chụp/bảng QA tại `artifacts/primary-template/`.

Giọng đọc được mô phỏng trong kiểm tra để kiểm chứng điều kiện phát, tắt và nhịp chuyển. Chưa kiểm tra nghe giọng thật hay thao tác trên điện thoại vật lý; không chạy lại toàn bộ bộ trình duyệt hồ sơ nhiều tab/sao lưu/xóa trong đợt này. Bộ Node hồ sơ và kiểm tra cách ly/lưu phiên của luồng mới đã đạt.

## Dựng lại

`node scripts/build-primary-template.cjs` xuất ba lớp từ `units.js`, dữ liệu chi tiết và bản đồ ảnh. Các lệnh dựng lớp 1/5 và lớp 3 cũ gọi bộ dựng này. `node tests/primary-grades/browser.cjs` chạy kiểm tra giao diện hiện tại với máy chủ cổng 8001; mặc định kiểm tra tải ảnh. `node tests/grade3/browser.cjs` kiểm tra bộ game legacy.
