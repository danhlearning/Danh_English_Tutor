# Checkpoint — UI ưu tiên cao và tranh lớp 2

## HOÀN TẤT — trạng thái cuối 19/10/2026

**Không tạo thêm hoặc tạo lại nhóm ảnh.** Toàn bộ phạm vi đã hoàn tất và xác minh:253/253 ảnh,16/16 chủ đề tích hợp, từng ảnh cuối đã mở xem và lưu SHA-256. Cell184 hoàn tất136 ảnh không lỗi; không còn lượt tạo ảnh chạy. `collect-grade2-pencil-results.py --require-complete` và `finalize-grade2-pencil.py` đềuPASS. Bộ prompt cuối ở `artifacts/grade2-pencil/final-prompts.json`.

Lượt trình duyệt cuối chạy riêng **PASS128 trạng thái,253 ảnh**, ID giữ nguyên và ba ngoại lệ giữ nguyên. Bộ16Unit chính cũngPASS. Kiểm tra liên kết198 trang/chân trang192 trang và2 test nội dungPASS. Chi tiết, đường dẫn và giới hạn nghiệm thu trong `docs/reports/grade2-pencil-completion-2026-10-19.md`. Các phần tiến độ dưới đây là lịch sử và không còn mục thiếu.

Đã tắt heartbeat `ti-p-t-c-s-a-ui-v-tranh-l-p-2` bằng automation_update (PAUSED); không archive chat.

## Yêu cầu hiện hành

- Người dùng yêu cầu sửa các lỗi UI ưu tiên cao từ báo cáo `docs/reports/ui-audit-2026-10-19.md`.
- Thay hình minh họa cho **từng từ và các trò chơi** của chủ đề bổ trợ lớp 2 bằng tranh hoạt hình 2D nét bút chì.
- **Giữ nguyên Animals, Colors và Numbers**. Lời mới nhất: “tạm thời bỏ qua bài number”. Phạm vi cuối là **16 chủ đề, 253 mục từ**; không sửa 16 Unit chính.
- Người dùng đã yêu cầu **tự làm tiếp khi reset limit**. Tại lần kiểm tra 19/10/2026: hạn mức 5 giờ dùng 93%, reset dự kiến 16:39:27 giờ Việt Nam; tuần dùng 46%. Không dùng credit reset hay đổi sang API trả phí.
- Đã tạo heartbeat ACTIVE trong chính chat này, mỗi 30 phút: ID `ti-p-t-c-s-a-ui-v-tranh-l-p-2`, tên **Tiếp tục sửa UI và tranh lớp 2**. Tắt lịch này khi hoàn tất; không tạo lịch trùng.
- Đọc AGENTS.md, nguyên tắc game, hồ sơ và skill imagegen. Không tự tạo subagent, không xuất bản/commit/deploy.

## UI P1 đã sửa và kiểm tra

- `flashcard.html`: bỏ khóa phóng to; bỏ ảnh rỗng/onerror lặp trong HTML; nhãn dialog và input; tên nút thống kê.
- `assets/js/pages/flashcard.js`: lỗi ảnh chỉ chuyển một lần sang `assets/icons/vocabulary-fallback.svg`, xóa onerror trước khi chuyển; từ tự thêm dùng ảnh dự phòng nội bộ. Hộp thêm từ/thống kê đưa focus vào hộp, giữ Tab, Escape đóng, trả focus và vô hiệu nền bằng inert; khóa cuộn nền khi mở.
- `assets/css/pages/flashcard.css`: ẩn hộp khỏi bàn phím khi đóng, giới hạn chiều cao/cuộn hộp; input xếp dọc để không cắt nhãn khi chữ 200%; focus rõ và giảm chuyển động.
- `shared/grade-colors.css`: tiêu đề Unit dài co/xuống dòng; ẩn biểu tượng trang trí ở màn hình <=360 px. Đã sửa hai trang tràn: lớp 6 Unit 4, lớp 8 Unit 10.
- `artifacts/ui-audit-2026-10-19/fixes-test.cjs` đã PASS: ảnh lỗi không lặp tải và trang hoàn tất load; cả hai hộp thoại; 40 lượt Tab/Shift+Tab, Escape/trả focus; lưu từ; quyền zoom; hai Unit ở 320/390/760/1280; chữ lớn. Đã xem ảnh chữ lớn và sửa nhãn bị co trước khi nghiệm thu.
- Đây là kiểm tra trình duyệt mô phỏng, chưa kiểm tra điện thoại thật/giọng đọc thực tế.

## Tranh đã có và lựa chọn đã duyệt

Thư mục làm việc: `artifacts/grade2-pencil/`.

- `inventory.json`: dữ liệu gốc 17 chủ đề/353 từ, trước khi bỏ Numbers; đây là baseline ID từ. Khi dùng phải lọc `topic !== 'numbers'`.
- `generation.json`: toàn bộ prompt/slug của baseline; cũng phải lọc Numbers khi tạo danh sách cuối.
- `curated-results.json`: kết quả đã chọn cho 6 chủ đề đầu, **117 khóa ảnh** (có bản lặp của 4 ảnh sửa màu quần áo; bản cuối thắng).
- `remaining-results.json`: checkpoint bền vững của nhóm 10 chủ đề sau, tối đa 136 mục. Mỗi nhóm 4 ảnh ghi lại tệp này; đọc số mục thực tế, không tạo lại mục đã có.
- `quantity-repairs.json`: 20 ảnh sửa đã tạo xong: Family (cả gia đình, không mũi tên chỉ riêng bố), Egg/Cookie (một vật), 17 trái cây trừ Apple (mỗi hình chỉ một biểu tượng quả, không bó/nhiều quả/các lát bên cạnh). Dùng Banana mới của Fruits cho cả Food & Drinks.
- `repairs.json`: 4 ảnh sửa màu quần áo đã hoàn tất: T-shirt đỏ, Shirt trắng, Boots da nâu, Scarf đỏ. Các bản này đã nằm cuối curated-results.
- `school-repairs.json`: 3 ảnh sửa Crayon/Paper/Folder, mỗi hình một vật; có thể đang được tạo ở lượt trước. Phải đọc trạng thái thực tế trước khi tạo lại.
- `results.json`: **tệp tổng hợp**, được tạo lại bằng script collector. Không dùng kết quả trong functions store `g2results`: đó chỉ là bản 20 ảnh quần áo cũ, không phải toàn bộ kết quả!
- Tranh gốc được imagegen lưu dưới `C:/Users/Admin/.codex/generated_images/01a1528d-a23d-7160-be77-2ec172bd7591/`. Các tệp JSON trên giữ đường dẫn nguồn. Không xóa ảnh gốc.

Đã xem trực quan và chấp nhận toàn bộ 117 ảnh của Clothes, Dates, Family & Friends, Feelings, Food & Drinks, Fruits sau các bản sửa. Dates: lịch tuần 7 ô từ trái sang phải, tô đúng một ô; 12 lịch tháng có đúng chữ số 1–12; không có tiếng Việt trong ảnh. Tranh quần áo đã khớp các màu trong câu luyện. Tranh trái cây đã sửa để không làm bài đếm sai.

School Supplies: đã xem 16 ảnh đầu; Crayon có hộp nhiều bút, Paper có nhiều tờ, Folder có nhiều bìa nên đã yêu cầu sửa riêng. Cần xem 3 ảnh sửa và 9 ảnh còn lại. Các tranh khác của nhóm 10 chủ đề sau **chưa được duyệt hết**; không tự đánh dấu đạt trước khi xem.

Một lượt tạo ảnh trước bị dừng khi người dùng bỏ Numbers. Các ảnh không phải Numbers đã được chọn lại trực quan và ghi đầy đủ trong curated-results. Bản nháp Numbers không được đưa vào repo hoặc UI; không tiếp tục tạo Numbers.

## Công việc tạo ảnh có thể vẫn đang chạy

- functions exec cell **184**: tạo nhóm còn lại 136 ảnh cho schoolsupplies, bodyparts, householditems, verbs, adjectives, shapes, toys, weather, rooms, transport; 4 ảnh/lượt, ghi `remaining-results.json` sau mỗi lượt. Thông báo gần nhất đã hoàn tất ít nhất 32/136; kiểm tra tệp để lấy tiến độ mới.
- functions exec cell **198** đã hoàn tất: sửa Crayon, Paper, Folder; kết quả ở `school-repairs.json`, cần xem trực quan trước khi duyệt.
- Cell 188 (20 ảnh sửa số lượng) đã hoàn tất, kết quả đã ở quantity-repairs.json.
- Nếu các cell vẫn tồn tại, chờ hoặc làm phần độc lập; không khởi tạo một nhóm trùng. Nếu cell không còn tồn tại sau reset, dùng checkpoint trên đĩa, chỉ tạo mục thiếu. Lần tiếp tục mới nên ghi kết quả sau mỗi ảnh hoặc nhóm nhỏ để tránh mất ánh xạ.

## Tích hợp đã làm

- Ảnh web: `grade/lop2/assets/images/pencil/<topic>/<slug>-v1.webp`, **768×768**, nền trắng, giữ tỉ lệ. Bản hiện có gồm ít nhất 117 ảnh đã duyệt + một phần School; chưa đủ 253.
- `scripts/collect-grade2-pencil-results.py`: gộp curated + remaining + quantity + school repairs; bản cuối thắng; loại Numbers; dùng Banana của Fruits cho Food. Thêm `--require-complete` để yêu cầu đủ 253.
- `scripts/prepare-grade2-pencil.py`: copy/thu nhỏ ảnh nguồn thành 768×768 WebP và contact sheet `review-<topic>-000.jpg`, School có thêm `020`. Chỉ tối ưu kích thước, không sửa nội dung bằng Python. Đọc results.json.
- `scripts/integrate-grade2-pencil.cjs`: tạo manifest, thêm script/style và thay ảnh runtime cho chủ đề. Mặc định 16 chủ đề, chặn Numbers. Có `--topics` để triển khai từng nhóm.
- Đã tích hợp HTML của **6 chủ đề đầu**: clothes, dates, familyfriends, feeling, fooddrinks, fruits. Chưa tích hợp 10 trang còn lại.
- `pencil-images-data.js`: manifest không có Numbers/Animals/Colors.
- `pencil-illustrations.js`: ảnh SVG wrapper chứa raster WebP nội bộ; thay visual/svg/emoji/icon/photo của từ và câu hỏi phù hợp; lịch tuần có chú giải ở ngoài hình.
- `pencil-illustrations.css`: khung từ vựng 220 px mobile/240 px desktop, ảnh lật thẻ 120 px, câu hỏi/câu luyện 180 px; bài đếm có từng icon 56 px. Lưới đủ rộng để giữ khung vuông. Mọi tệp ảnh đều 768×768.
- `learning-core.js`: ưu tiên tranh mới cho vocab và game 1–3; nếu trang không tải DanhPencil thì giữ luồng cũ. Extended-topic/bodyparts có apply tùy chọn, chưa đổi ID hoặc tiến độ.
- Script integrator thêm apply sau mảng từ trước khi dựng các câu hỏi cũ. Thay `.innerText` bằng `.innerHTML` cho icon SVG trong bài đếm School; Dates dùng lịch mới ở Game 4.
- Giữ URL, ID từ, cấu trúc đáp án và khóa lưu học. Không đổi dữ liệu người học.

## Kiểm tra đã qua

- `artifacts/grade2-pencil/clothes-test.cjs`: khung 20 ảnh mobile 220×220, cả 4 game có tranh mới, desktop; không lỗi trang hoặc tài nguyên. Lưu ý nav lớp 2 có 3 tab chính, muốn chơi phải bấm `.g2-games-tab` rồi `[data-game=...]`.
- Lượt 206 đã phát hiện Game 4 Dates có câu ngày đầy đủ như “November 15th”, không khớp khóa “November”. Đã sửa lookup Dates để dùng tranh tháng từ phần đầu tên, còn ngày cụ thể có trong câu tiếng Việt ngoài ảnh.
- **Lượt chạy lại 6 chủ đề đầu đã PASS**: 48 trạng thái/viewport, 117 ảnh tải đúng 768×768, ID từ giữ nguyên, không lỗi trang/tài nguyên; ba trang ngoại lệ không tải DanhPencil. Kết quả hiện tại trong `browser-results.json` mới chỉ dành cho 6 chủ đề. Khi nghiệm thu toàn bộ phải bỏ biến TOPICS để chạy đủ 16 chủ đề.
- Lần gộp gần nhất đã có **157/253 ảnh, còn 96 ảnh thiếu** (trạng thái này có thể tăng khi nhóm tạo tiếp tục chạy). Session **17789** đang tối ưu 157 ảnh bằng prepare; cần chờ xong trước khi xem contact sheet mới, sau đó đọc lại checkpoint tạo ảnh để lấy tiến độ mới.
- `ONLY_GRADE=2 node tests/vocabulary-3d/browser.cjs`: PASS 16 Unit chính, hình tải và 4 game, không lỗi trang.
- `node --test tests/vocabulary-3d/content.cjs`: 2 test PASS.
- `node scripts/check-local-links.cjs`: 198 trang PASS.
- `node scripts/check-contact-footer.cjs`: 192 trang PASS.
- `git diff` trên HTML/JS của Animals, Colors, Numbers rỗng tại lần kiểm tra gần nhất.

## Bước tiếp theo

### Cập nhật sau khi hạn mức đặt lại ngày 19/10

**Trạng thái mới nhất (ưu tiên các dòng này):**

- **209/253 ảnh đã tạo, tối ưu và mở từng WebP để duyệt**. Danh sách và SHA-256 trong `artifacts/grade2-pencil/individual-review.json` đã ghi đủ 209, bao gồm 4 bản sửa ngữ cảnh Verbs. Còn 44 ảnh của Shapes (5), Toys (12), Weather (8), Rooms (7), Transport (12).
- Cell **184 vẫn đang chạy**, metadata đã có **92/136**. Không tạo trùng; chờ nhóm hoặc nếu cell mất thì chỉ tạo mục chưa có trong `remaining-results.json`.
- Cell 232 hoàn tất: Food & Drinks 20 và sau đó Fruits18 đều đã mở từng ảnh/chấp nhận. Feelings20 đã ghi hash. Không còn cell QA đang chạy.
- Bộ Verbs Play/Listen/Watch/Fly đã tạo lại để khớp ngữ cảnh bóng đá/tai nghe/xem TV/diều bay; nguồn và prompt trong `verb-context-repairs.json`, collector đã đọc tệp này sau các bản sửa khác. Đã xem đúng bản WebP cuối sau khi prepare xong và ghi lại hash. Không cần tạo lại.
- Đã tích hợp **11/16 chủ đề, 206 từ** (thêm Verbs20 và Adjectives12). Shapes chỉ mới3/8 nên chưa tích hợp.
- Kiểm tra 11 chủ đề **PASS 88 trạng thái, 206 ảnh tải đúng768×768**, 4 viewport, 4 game; ID không đổi; Animals/Colors/Numbers không tải plugin và gitdiff sáu tệp HTML/JS ngoại lệ rỗng. `browser-results.json` hiện là kết quả11 chủ đề. Session57926 đã inPASS, có thể chờ đóng process nếu còn.
- Phát hiện và sửa: Game4 Verbs có target dạng run negative/read command/can you swim nên lookup chỉ khớp nguyên tên bị thiếu ảnh. Helper giờ ưu tiên exact rồi tìm từ trong target/answer; câu what can you do dùng tranhPlay. TestVerbs và test11 đãPASS.
- Phát hiện từ screenshot: icon đếm ở School lúc chụp nhỏ do popIn vẫn chạy khi thiết bị yêu cầu giảm chuyển động. CSS đã tắt animation này trong prefers-reduced-motion. Đã mở lại screenshot: 6 bút bi hiển thị rõ trong6khung56px. Đã xem cả4gameSchool vàBody, bố cục/ảnh đạt. Không đổi câu trả lời, tiến độ hoặc cơ chế học.
- Lần prepare209 đã hoàn tất (session20694 exit0). Lần tiếp theo collector+prepare cần đợi prepare kết thúc trước khi xem; script xử lý lại toàn bộ nên có thể mất vài phút. Tránh mở ảnh cũ khi prepare chưa đi đến chủ đề cần xem.

- Hạn mức đã cho phép tiếp tục, không sử dụng credit reset hay API trả phí.
- Nhóm tạo cell 184 vẫn chạy; `remaining-results.json` đã có ít nhất **76/136** ảnh, không tạo lại nhóm này. Tổng đã có ít nhất 193/253 nguồn; lần prepare gần nhất là **185/253** WebP.
- Đã mở trực tiếp từng WebP và chấp nhận Body Parts 16, School Supplies 25 (gồm 3 bản sửa), Household Items 16, Verbs 11 đầu, Clothes 20, Dates 19, Family & Friends 20, Feelings 20. Không có nghĩa tiếng Việt/nhãn chữ trong các hình này. Ký hiệu lịch tháng là chữ số, lịch tuần tô đúng ô; Confused có dấu hỏi biểu cảm.
- `artifacts/grade2-pencil/individual-review.json` lưu danh sách duyệt và hash bằng `scripts/record-grade2-pencil-review.py`; hiện hash đã ghi cho 127 ảnh, cần bổ sung Feelings 20 đã xem (cell 232 đang chạy nên functions store có thể chưa công bố trạng thái mới).
- Cell **232** đang mở 20 ảnh Food & Drinks để duyệt, mới trả tên Pizza chưa trả hình tại lần cập nhật. Chỉ đánh dấu đạt sau khi thực sự nhìn thấy đầu ra. Không dùng detail low khi emitImage: môi trường này bỏ ảnh low nên không tính đã xem.
- Đã tích hợp thêm Body Parts, School Supplies, Household Items vào HTML/JS. Test ba chủ đề mới **PASS 24 trạng thái, 57 ảnh 768×768**, 4 viewport, 4 game; ID giữ nguyên và ba ngoại lệ không tải tranh mới. Tổng đã tích hợp **9/16 chủ đề, 174 từ**. `browser-results.json` bị ghi bởi lượt ba chủ đề, cần chạy đủ16 khi hoàn tất.
- Cần xem trực quan ảnh chụp game ba chủ đề mới; bài test đã lưu ảnh trong artifacts/grade2-pencil.

1. Kiểm tra hạn mức, lịch tự động và hai nhóm tạo ảnh đang chạy; chỉ bổ sung phần thiếu của 253 ảnh.
2. Chạy collector, prepare; xem trực quan tất cả contact sheet còn lại. Kiểm tra bộ phận cơ thể, từng ngón tay, mũi tên đúng chỗ, adjective đúng vế, shape Diamond là hình thoi, Compass là com-pa và không có chữ/nhãn trong ảnh. Sửa bằng imagegen nếu chưa đạt; ghi đường dẫn/prompt sửa bền vững và bổ sung vào collector.
3. Khi đủ và đã duyệt, chạy integrator cho cả 16 chủ đề. Không sửa Animals/Colors/Numbers.
4. Chạy `artifacts/grade2-pencil/browser-check.cjs`: 16 chủ đề × 4 viewport + 64 trạng thái game mobile; kiểm tra đủ 253 ảnh 768×768, khung vuông đồng bộ, ID từ giữ nguyên và ba trang ngoại lệ không tải tranh mới. Script đã được viết, **chưa chạy đạt toàn bộ** vì chưa đủ hình.
5. Xem ảnh chụp các trạng thái trò chơi; sửa lỗi phát hiện được, đặc biệt game viết câu/đếm dùng đúng tranh. Chạy lại kiểm tra liên kết/chân trang sau tích hợp toàn bộ.
6. Ghi manifest duyệt ảnh gồm đường dẫn/hash/kích thước, bộ prompt cuối chỉ 253 từ (không Numbers), báo cáo kết quả và giới hạn kiểm tra. Skill imagegen yêu cầu nêu vị trí lưu, prompt và chế độ built-in; có thể dẫn trong báo cáo cuối.
7. Cập nhật checkpoint, thông báo hoàn tất cho người dùng và tắt lịch tự động khi toàn bộ phạm vi đã đạt. Không archive chat.

## Môi trường và lưu ý

- Repo: `C:/Users/Admin/Documents/Codex/Danh English Tutor`; PowerShell.
- Máy chủ local: `http://127.0.0.1:8001`, session 11596 từ lượt audit; kiểm tra còn chạy trước khi dùng.
- Python: `C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`; đặt `PYTHONIOENCODING=utf-8` khi in tiếng Việt.
- Node/Playwright: đặt `NODE_PATH=C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules`; launch Edge headless. Hồ sơ kiểm tra là context tạm, không đụng dữ liệu trình duyệt người dùng.
- Repo đã có nhiều thay đổi từ lượt trước: lớp 6/7 sửa ảnh, lớp 8/9 mới, tài liệu và thay đổi khác của người dùng. Không reset/clean/ghi đè những phần đó.
- Ảnh mẫu và kết quả QA ở artifacts/grade2-pencil; ảnh P1 ở artifacts/ui-audit-2026-10-19.
