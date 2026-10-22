const quizData = [
        // --- LEVEL 1: CƠ BẢN (1-20) ---
        { q: "1. The girl _____ is standing there is my sister. [Cơ bản]", a: "who / that", e: "Thay thế cho 'The girl' (người) làm chủ ngữ, dùng 'who' hoặc 'that'." },
        { q: "2. The book _____ I bought yesterday is very interesting. [Cơ bản]", a: "which / that", e: "Thay thế cho 'The book' (vật) làm tân ngữ, dùng 'which' hoặc 'that'." },
        { q: "3. The man _____ car was stolen is at the police station. [Cơ bản]", a: "whose", e: "Chỉ sự sở hữu (xe của người đàn ông), dùng 'whose' + N." },
        { q: "4. This is the house _____ I was born. [Cơ bản]", a: "where", e: "Chỉ nơi chốn (nhà), dùng 'where' (hoặc in which)." },
        { q: "5. Do you remember the day _____ we first met? [Cơ bản]", a: "when", e: "Chỉ thời gian (ngày), dùng 'when'." },
        { q: "6. The student _____ sits next to me is from Japan. [Cơ bản]", a: "who / that", e: "Thay thế cho 'The student' (người) làm chủ ngữ." },
        { q: "7. I don't know the reason _____ she cried. [Cơ bản]", a: "why", e: "Bổ nghĩa cho 'the reason' (lý do), dùng 'why'." },
        { q: "8. A doctor is a person _____ treats sick people. [Cơ bản]", a: "who / that", e: "'a person' (người) đóng vai trò chủ ngữ của 'treats'." },
        { q: "9. The dog _____ is barking loudly belongs to my neighbor. [Cơ bản]", a: "which / that", e: "'The dog' (động vật) dùng 'which' hoặc 'that'." },
        { q: "10. The woman _____ I saw yesterday is a famous actress. [Cơ bản]", a: "whom / who / that", e: "Thay thế cho người làm tân ngữ (tôi đã nhìn thấy cô ấy)." },
        { q: "11. The computer _____ is on the desk is broken. [Cơ bản]", a: "which / that", e: "'The computer' (vật) làm chủ ngữ." },
        { q: "12. I met a boy _____ father is a pilot. [Cơ bản]", a: "whose", e: "Sở hữu: bố của cậu bé (boy's father) -> whose father." },
        { q: "13. 2020 was the year _____ the pandemic started. [Cơ bản]", a: "when", e: "Bổ nghĩa cho 'the year' (thời gian)." },
        { q: "14. We visited the park _____ we used to play. [Cơ bản]", a: "where", e: "Bổ nghĩa cho 'the park' (nơi chốn)." },
        { q: "15. Please give me the pen _____ is on the table. [Cơ bản]", a: "which / that", e: "'the pen' (vật)." },
        { q: "16. The boy _____ won the prize is very smart. [Cơ bản]", a: "who / that", e: "'The boy' (người) làm chủ ngữ." },
        { q: "17. That is the restaurant _____ they cook Italian food. [Cơ bản]", a: "where", e: "Nhà hàng là nơi chốn -> where." },
        { q: "18. Tell me the reason _____ you were late. [Cơ bản]", a: "why", e: "Chỉ lý do -> why." },
        { q: "19. The movies _____ we watched last night were scary. [Cơ bản]", a: "which / that", e: "'The movies' (vật) làm tân ngữ." },
        { q: "20. I talked to the girl _____ bike was broken. [Cơ bản]", a: "whose", e: "Xe đạp của cô gái -> whose bike." },

        // --- LEVEL 2: TRUNG BÌNH (21-40) - Dấu phẩy & Giới từ ---
        { q: "21. Mr. Smith, _____ is my teacher, is very kind. [Trung bình]", a: "who", e: "Mệnh đề không xác định (có dấu phẩy) -> KHÔNG dùng 'that'. Chỉ người làm chủ ngữ -> 'who'." },
        { q: "22. Paris, _____ is the capital of France, is beautiful. [Trung bình]", a: "which", e: "Có dấu phẩy, chỉ vật -> dùng 'which' (Không dùng that)." },
        { q: "23. The man to _____ I was speaking is the CEO. [Trung bình]", a: "whom", e: "Đứng sau giới từ 'to', chỉ người -> BẮT BUỘC dùng 'whom'." },
        { q: "24. The house in _____ I live is very old. [Trung bình]", a: "which", e: "Đứng sau giới từ 'in', chỉ vật -> BẮT BUỘC dùng 'which' (in which = where)." },
        { q: "25. My mother, _____ I love very much, is a nurse. [Trung bình]", a: "whom / who", e: "Có dấu phẩy, chỉ người làm tân ngữ. (Không dùng that)." },
        { q: "26. This is the chair on _____ I sat yesterday. [Trung bình]", a: "which", e: "Đứng sau giới từ 'on', chỉ vật -> 'which'." },
        { q: "27. John, _____ brother is my classmate, has a new car. [Trung bình]", a: "whose", e: "Chỉ sự sở hữu trong mệnh đề có dấu phẩy." },
        { q: "28. The meeting, _____ I attended yesterday, was long. [Trung bình]", a: "which", e: "Có dấu phẩy, thay cho sự việc." },
        { q: "29. The person from _____ I received this gift is a secret. [Trung bình]", a: "whom", e: "Sau giới từ 'from', chỉ người -> 'whom'." },
        { q: "30. Hanoi, _____ I was born, is a busy city. [Trung bình]", a: "where", e: "Có dấu phẩy, chỉ nơi chốn." },
        { q: "31. The hotel at _____ we stayed was excellent. [Trung bình]", a: "which", e: "Sau giới từ 'at', chỉ vật/nơi -> 'which' (at which = where)." },
        { q: "32. My new phone, _____ cost a lot of money, is already broken. [Trung bình]", a: "which", e: "Mệnh đề không xác định, chỉ vật -> 'which'." },
        { q: "33. The people with _____ I work are very friendly. [Trung bình]", a: "whom", e: "Sau giới từ 'with', chỉ người." },
        { q: "34. Sunflowers, _____ grow towards the sun, are beautiful. [Trung bình]", a: "which", e: "Có dấu phẩy, chỉ sự vật." },
        { q: "35. Dr. Lee, _____ patients love him, is retiring. [Trung bình]", a: "whose", e: "Bệnh nhân của bác sĩ Lee -> 'whose patients'." },
        { q: "36. The day on _____ we met was rainy. [Trung bình]", a: "which", e: "Sau giới từ 'on', chỉ thời gian -> 'which' (on which = when)." },
        { q: "37. My dog, _____ is sleeping on the sofa, is lazy. [Trung bình]", a: "which", e: "Chỉ động vật, có dấu phẩy -> 'which'." },
        { q: "38. The student to _____ you gave the book is here. [Trung bình]", a: "whom", e: "Sau giới từ 'to', chỉ người." },
        { q: "39. Mount Everest, _____ is the highest mountain, is in Asia. [Trung bình]", a: "which", e: "Có dấu phẩy, danh từ riêng." },
        { q: "40. The reason for _____ he resigned is unknown. [Trung bình]", a: "which", e: "Sau giới từ 'for' -> 'which' (for which = why)." },

        // --- LEVEL 3: NÂNG CAO - Rút gọn TOEIC/IELTS (41-60) ---
        // Yêu cầu học viên điền ĐỘNG TỪ đã được rút gọn (V-ing / V-ed / to V)
        { q: "41. (Rút gọn) The man (stand) _____ at the door is my uncle. [Nâng cao]", a: "standing", e: "Chủ động: 'who is standing' rút gọn thành V-ing -> 'standing'." },
        { q: "42. (Rút gọn) The house (build) _____ in 1990 is still beautiful. [Nâng cao]", a: "built", e: "Bị động: 'which was built' rút gọn thành V3/ed -> 'built'." },
        { q: "43. (Rút gọn) He was the last person (leave) _____ the room. [Nâng cao]", a: "to leave", e: "Sau 'the last' rút gọn thành To V -> 'to leave'." },
        { q: "44. (Rút gọn) The boy (play) _____ the piano is a prodigy. [Nâng cao]", a: "playing", e: "Chủ động: đang chơi đàn -> 'playing'." },
        { q: "45. (Rút gọn) Books (write) _____ by Nguyen Nhat Anh are popular. [Nâng cao]", a: "written", e: "Bị động: được viết bởi -> 'written'." },
        { q: "46. (Rút gọn) She is the only student (pass) _____ the exam. [Nâng cao]", a: "to pass", e: "Sau 'the only' rút gọn thành To V -> 'to pass'." },
        { q: "47. (Rút gọn) The road (connect) _____ the two cities is being repaired. [Nâng cao]", a: "connecting", e: "Chủ động: con đường nối liền -> 'connecting'." },
        { q: "48. (Rút gọn) The rules (apply) _____ to this game are simple. [Nâng cao]", a: "applied", e: "Bị động: luật được áp dụng -> 'applied'." },
        { q: "49. (Rút gọn) Yuri Gagarin was the first man (fly) _____ into space. [Nâng cao]", a: "to fly", e: "Sau 'the first' rút gọn thành To V -> 'to fly'." },
        { q: "50. (Rút gọn) Passengers (travel) _____ on this train must buy a ticket. [Nâng cao]", a: "traveling / travelling", e: "Chủ động: hành khách đang di chuyển -> 'traveling'." },
        { q: "51. (Rút gọn) The song (sing) _____ by that girl is my favorite. [Nâng cao]", a: "sung", e: "Bị động: bài hát được hát ('sing' -> 'sang' -> 'sung')." },
        { q: "52. (Rút gọn) Neil Armstrong was the first person (walk) _____ on the moon. [Nâng cao]", a: "to walk", e: "Sau 'the first' -> 'to walk'." },
        { q: "53. (Rút gọn) The students (prepare) _____ for the IELTS test are nervous. [Nâng cao]", a: "preparing", e: "Chủ động: học sinh đang chuẩn bị -> 'preparing'." },
        { q: "54. (Rút gọn) The money (steal) _____ from the bank was found. [Nâng cao]", a: "stolen", e: "Bị động: tiền bị đánh cắp ('steal' -> 'stole' -> 'stolen')." },
        { q: "55. (Rút gọn) This is the second problem (solve) _____ today. [Nâng cao]", a: "to be solved", e: "Sau 'the second' (To V) nhưng mang nghĩa BỊ ĐỘNG (vấn đề ĐƯỢC giải quyết) -> 'to be solved'." },
        { q: "56. (Rút gọn) The woman (wear) _____ the red dress is the manager. [Nâng cao]", a: "wearing", e: "Chủ động: người phụ nữ đang mặc -> 'wearing'." },
        { q: "57. (Rút gọn) Goods (import) _____ from Japan are high quality. [Nâng cao]", a: "imported", e: "Bị động: Hàng hóa được nhập khẩu -> 'imported'." },
        { q: "58. (Rút gọn) I have some letters (write) _____. [Nâng cao]", a: "to write", e: "Chỉ mục đích/bổn phận (có thư CẦN PHẢI viết) -> 'to write'." },
        { q: "59. (Rút gọn) The ideas (present) _____ in the meeting were brilliant. [Nâng cao]", a: "presented", e: "Bị động: ý tưởng được trình bày -> 'presented'." },
        { q: "60. (Rút gọn) Anyone (wish) _____ to join the club must sign here. [Nâng cao]", a: "wishing", e: "Chủ động: bất cứ ai mong muốn -> 'wishing'." }
    ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
        const currentQ = quizData[currentQuestionIndex];
        document.getElementById("progress").innerText = `Câu: ${currentQuestionIndex + 1}/${quizData.length}`;
        
        // Highlight phần trong ngoặc hoặc chỗ trống cho dễ nhìn
        let questionHtml = currentQ.q.replace("_____", "<strong>_____</strong>");
        document.getElementById("question-text").innerHTML = questionHtml;
        
        resetUI();
    }

    function checkAnswer() {
        const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
        const currentQ = quizData[currentQuestionIndex];
        
        // Tách các đáp án đúng bằng dấu "/"
        const correctAnswers = currentQ.a.toLowerCase().split("/").map(item => item.trim());
        
        const feedbackEl = document.getElementById("feedback");
        const explanationEl = document.getElementById("explanation");
        const nextBtn = document.getElementById("next-btn");
        const checkBtn = document.getElementById("check-btn");

        if (userAnswer === "") {
            alert("Vui lòng nhập đáp án của bạn!");
            return;
        }

        if (correctAnswers.includes(userAnswer)) {
            feedbackEl.innerText = "✅ Chính xác!";
            feedbackEl.className = "feedback correct";
        } else {
            feedbackEl.innerText = `❌ Sai rồi! Đáp án đúng có thể là: ${currentQ.a}`;
            feedbackEl.className = "feedback incorrect";
        }

        explanationEl.innerHTML = `<strong>💡 Giải thích:</strong> ${currentQ.e}`;
        explanationEl.style.display = "block";
        nextBtn.style.display = "block";
        checkBtn.style.display = "none";
        document.getElementById("answer-input").disabled = true;
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            document.getElementById("question-text").innerHTML = "<strong>🎉 Tuyệt vời! Bạn đã hoàn thành toàn bộ 60 câu hỏi Mệnh đề quan hệ từ Cơ bản đến Nâng cao!</strong>";
            document.getElementById("input-area").style.display = "none";
            document.getElementById("progress").innerText = "Hoàn thành!";
            resetUI();
            document.getElementById("check-btn").style.display = "none";
        }
    }

    function resetUI() {
        const inputEl = document.getElementById("answer-input");
        if(inputEl) {
            inputEl.value = "";
            inputEl.disabled = false;
            inputEl.focus();
        }
        
        document.getElementById("feedback").innerText = "";
        document.getElementById("explanation").style.display = "none";
        document.getElementById("next-btn").style.display = "none";
        
        const checkBtn = document.getElementById("check-btn");
        if(checkBtn && currentQuestionIndex < quizData.length) {
            checkBtn.style.display = "block";
        }
    }

    // Chạy auto lần đầu khi load trang
    window.onload = loadQuestion;

    // Phím tắt Enter
    document.getElementById("answer-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            if (document.getElementById("check-btn").style.display !== "none") {
                checkAnswer();
            } else {
                nextQuestion();
            }
        }
    });
