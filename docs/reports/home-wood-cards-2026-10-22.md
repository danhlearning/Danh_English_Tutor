# Kiểm tra thẻ lớp học vẽ chì

- Thẻ Lớp 1–12 trên trang chủ dùng nền gỗ mật ong nhạt, vân/mắt gỗ SVG vẽ tay, viền lệch nhẹ và cạnh gỗ; chữ Nunito có màu riêng theo lớp.
- Đã lưu nguyên tắc UI tranh vẽ bút chì màu cho toàn repo trong `AGENTS.md` và `docs/NGUYEN_TAC_GAME_HOC_TIENG_ANH.md`.
- Kiểm tra trình duyệt Edge mô phỏng tại 1280 × 1000, 390 × 844 và 320 × 740, chặn mạng ngoài. Đã mở xem trực tiếp cả ba ảnh chụp: vân gỗ hợp lý, không chứa chữ trong tài nguyên trang trí, nhãn lớp rõ, không tràn ngang.
- Đạt: 12 nhãn/URL đúng, 12 trang đích HTTP 200, vùng bấm ít nhất 44 px, focus bàn phím rõ, giảm chuyển động, không có lỗi JavaScript. Kiểm tra glyph thực tế bằng trình duyệt xác nhận chữ trên thẻ dùng Nunito nội bộ khi mạng ngoài bị chặn.
- `node scripts/check-vietnamese-fonts.cjs`: đạt 322 trang.
- Bằng chứng ở `artifacts/home-wood-cards/`: ảnh desktop/mobile/small-mobile và chương trình kiểm tra.
- Chỉ thay kiểu trình bày thẻ và tài liệu nguyên tắc; chưa kiểm tra trên thiết bị vật lý hoặc nghiệm thu lại game/âm thanh vì không thay các phần đó.
