# Tối ưu game và animation — 23/10/2026

Ưu tiên 19 topic lớp 2 và các thành phần game dùng chung trên repo. Giữ ngân hàng bài, cách chấm, hồ sơ, khóa lưu, lượt dở và thời gian nghe đáp án.

## Thay đổi

- Giữ khung thẻ và nút điều hướng khi đổi từ; chỉ cập nhật mặt thẻ. Bỏ thao tác ép trình duyệt tính lại bố cục để khởi động animation. Giữ focus bàn phím.
- Không khởi động lại game khi bấm lại tab đang mở. Gộp bộ theo dõi tab, tránh cập nhật thanh công cụ/lịch sử khi dữ liệu không đổi. Animals khôi phục đúng tab đã lưu.
- Hiệu ứng dùng transform, hủy hiệu ứng trước trên cùng phần tử, dọn khi rời trang hoặc bật giảm chuyển động. Dùng lại bộ đệm âm lật thẻ và giới hạn số nốt âm đồng thời khi bấm nhanh.
- Bộ hiển thị gap bỏ qua sớm văn bản không có placeholder, gộp các vùng cập nhật trùng nhau.
- Bỏ các yêu cầu tải Nunito ngoài dư thừa ở 60 trang/mẫu/bộ dựng đã có font nội bộ. Đổi phiên bản URL script dùng chung và các mẫu để tab tải bản cập nhật.
- Bổ sung danh sách và tệp WAV còn thiếu cho từ vựng topic, gồm số 1–100; sửa kiểm tra Web Speech ở các topic cũ để tránh lỗi khi API không tồn tại. Kế hoạch âm thanh hiện có 4.514 mục duy nhất.
- Thử nghiệm đổi tranh SVG sang ảnh tải sau không cải thiện ổn định nên đã giữ cách hiển thị tranh hiện có.

## Đo trước/sau

Edge headless, màn 390×844, CPU chậm 4 lần, chuyển động bật, chặn mạng ngoài. Cùng kịch bản 30 thao tác đổi tab/thẻ; số dưới đây là TaskDuration trong khoảng đo, không phải thời gian tải trang hay FPS. Đây là một cặp lượt đo, có dao động theo máy.

| Trang | Trước (giây) | Sau (giây) | Giảm |
| --- | ---: | ---: | ---: |
| Animals | 1,376 | 1,141 | 17% |
| Clothes | 1,257 | 1,102 | 12% |
| Verbs | 1,274 | 1,104 | 13% |
| Body parts | 1,221 | 1,106 | 9% |
| Lớp 6 Unit 1 | 2,045 | 1,760 | 14% |
| Lớp 10 Unit 7 | 2,077 | 1,706 | 18% |

Số lần layout giảm ở Animals (33→24), lớp 6 (135→96), lớp 10 (140→103); tăng nhẹ ở ba topic dùng khung thẻ mới. Không suy diễn rằng mọi chỉ số trên mọi trang đều cải thiện.

Dữ liệu: `artifacts/game-performance/baseline.json`, `final.json` và `regression-results.json`. Chạy lại bằng `scripts/audit-game-performance.cjs` và `tests/ui-ux/game-performance.browser.cjs`.

## Đã kiểm tra

- 19 topic: mở bốn game, bấm thẻ liên tục, giữ nút/focus, bấm lại tab, tải lại đúng vị trí; không tự phát âm lúc mở. Không có lỗi JavaScript hay yêu cầu nội bộ thất bại trong lượt kiểm tra cuối.
- Tắt Web Speech: đáp án đúng ngay và tự sửa đúng thực sự phát WAV đến `playing`/`ended`, rồi mới chuyển câu.
- Hiệu ứng dùng chung: 40 lần phản hồi liên tiếp không tích lũy animation; giảm chuyển động và dừng đều dọn hiệu ứng. Lớp 12 qua kiểm tra tùy chọn đã lưu, sửa sau gợi ý và dừng âm.
- Ảnh chụp Animals/Clothes ở 390 và 1280 px đã mở xem trực tiếp. Không tràn ngang.
- Kiểm tra font tĩnh: 322 trang đạt. Kiểm tra glyph trình duyệt với mạng ngoài bị chặn đạt. Kiểm tra gap trình duyệt đạt. 38 kiểm tra lõi lựa chọn/lượt chơi/hồ sơ đạt. Kiểm tra âm thanh Animals đạt.

Hai bộ kiểm tra cũ còn bất đồng với dữ liệu/UI đã có trước đợt tối ưu: `bodyparts-expansion.test.cjs` đối chiếu ảnh mouth-v1 trong hồ sơ cũ trong khi manifest đang dùng mouth-boy-v2; `feedback-browser.cjs` tìm nút âm thanh đã được ẩn theo yêu cầu lớp 6–12. Không đổi ảnh hoặc hiện lại nút để làm các bộ kiểm tra cũ đạt.

Chưa kiểm tra mọi câu của mọi game trên mọi trang, chưa đo trên điện thoại vật lý. Các trang dùng thành phần chung nhận bản tối ưu; nghiệm thu chức năng chi tiết tập trung ở các phạm vi nêu trên.
