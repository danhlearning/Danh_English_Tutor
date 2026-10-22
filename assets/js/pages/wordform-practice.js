const quizData = [
        // --- LEVEL 1: CƠ BẢN (1-20) ---
        { q: "1. She is a very (beauty) _____ girl. [Cơ bản]", a: "beautiful", e: "Đứng trước danh từ 'girl' cần một Tính từ. Tính từ của beauty là beautiful." },
        { q: "2. He drives very (care) _____. [Cơ bản]", a: "carefully", e: "Đứng sau động từ thường 'drives' cần một Trạng từ để bổ nghĩa. Trạng từ của care là carefully." },
        { q: "3. Playing with matches is very (danger) _____. [Cơ bản]", a: "dangerous", e: "Sau to be 'is' và trạng từ 'very' cần một Tính từ. Tính từ của danger là dangerous." },
        { q: "4. We need more (inform) _____ about this project. [Cơ bản]", a: "information", e: "Sau 'more' cần một Danh từ. Danh từ của inform là information." },
        { q: "5. They lived (happy) _____ ever after. [Cơ bản]", a: "happily", e: "Bổ nghĩa cho động từ 'lived' cần Trạng từ -> happily." },
        { q: "6. Air (pollute) _____ is a serious problem in big cities. [Cơ bản]", a: "pollution", e: "Cần Danh từ ghép với 'Air' để tạo thành chủ ngữ -> Air pollution (ô nhiễm không khí)." },
        { q: "7. It is (nature) _____ for a child to depend on its parents. [Cơ bản]", a: "natural", e: "Sau to be 'is' cần một Tính từ -> natural (tự nhiên, bình thường)." },
        { q: "8. This dictionary is very (use) _____ for my studies. [Cơ bản]", a: "useful", e: "Sau to be 'is' và 'very' cần Tính từ mang nghĩa tích cực -> useful (hữu ích)." },
        { q: "9. He is a famous (act) _____ in Hollywood. [Cơ bản]", a: "actor", e: "Sau mạo từ 'a' và tính từ 'famous' cần Danh từ chỉ người -> actor." },
        { q: "10. We have to make a quick (decide) _____. [Cơ bản]", a: "decision", e: "Sau mạo từ 'a' và tính từ 'quick' cần Danh từ -> decision." },
        { q: "11. My teacher is very (friend) _____ to everyone. [Cơ bản]", a: "friendly", e: "Sau to be 'is' cần Tính từ. 'Friendly' (thân thiện) là tính từ dù có đuôi -ly." },
        { q: "12. What is the (differ) _____ between these two pictures? [Cơ bản]", a: "difference", e: "Sau mạo từ 'the' cần Danh từ -> difference." },
        { q: "13. He wants to be a successful (music) _____ in the future. [Cơ bản]", a: "musician", e: "Chỉ nghề nghiệp, cần danh từ chỉ người -> musician (nhạc sĩ)." },
        { q: "14. She is (interest) _____ in reading comic books. [Cơ bản]", a: "interested", e: "Cấu trúc: be interested in (thích thú với cái gì)." },
        { q: "15. The children are playing (noise) _____ upstairs. [Cơ bản]", a: "noisily", e: "Bổ nghĩa cho động từ 'playing' cần Trạng từ -> noisily." },
        { q: "16. This is a (tradition) _____ festival in Vietnam. [Cơ bản]", a: "traditional", e: "Đứng trước danh từ 'festival' cần Tính từ -> traditional." },
        { q: "17. You should eat more vegetables to stay (health) _____. [Cơ bản]", a: "healthy", e: "Sau động từ liên kết 'stay' cần Tính từ -> healthy (khỏe mạnh)." },
        { q: "18. The film was so (bore) _____ that I fell asleep. [Cơ bản]", a: "boring", e: "Chỉ tính chất của bộ phim (vật) -> dùng tính từ đuôi -ing: boring." },
        { q: "19. The (develop) _____ of technology makes our lives easier. [Cơ bản]", a: "development", e: "Đứng sau 'The' làm chủ ngữ cần Danh từ -> development." },
        { q: "20. I like her because of her (kind) _____. [Cơ bản]", a: "kindness", e: "Sau tính từ sở hữu 'her' cần Danh từ -> kindness (sự tử tế)." },

        // --- LEVEL 2: TRUNG BÌNH (21-40) ---
        { q: "21. He works (hard) _____ to earn money for his family. [Trung bình]", a: "hard", e: "Trạng từ của 'hard' vẫn là 'hard' (chăm chỉ). 'Hardly' có nghĩa là 'hầu như không'." },
        { q: "22. The new manager is highly (qualify) _____ for the job. [Trung bình]", a: "qualified", e: "Sau trạng từ 'highly' cần Tính từ -> qualified (đủ trình độ/bằng cấp)." },
        { q: "23. Please fill in the (apply) _____ form. [Trung bình]", a: "application", e: "Danh từ ghép: application form (đơn xin việc/nhập học)." },
        { q: "24. Good (communicate) _____ skills are required for this role. [Trung bình]", a: "communication", e: "Danh từ ghép làm chủ ngữ: communication skills (kỹ năng giao tiếp)." },
        { q: "25. We were (surprise) _____ at the news. [Trung bình]", a: "surprised", e: "Chỉ cảm xúc của con người -> Tính từ đuôi -ed: surprised." },
        { q: "26. You must be (care) _____ when you cross the street. [Trung bình]", a: "careful", e: "Sau động từ to be 'be' cần Tính từ -> careful." },
        { q: "27. Thomas Edison was a great (invent) _____. [Trung bình]", a: "inventor", e: "Danh từ chỉ người -> inventor (nhà phát minh)." },
        { q: "28. The company is looking for creative (employ) _____. [Trung bình]", a: "employees", e: "Cần danh từ số nhiều chỉ người (những nhân viên) -> employees." },
        { q: "29. It is (extreme) _____ cold today. [Trung bình]", a: "extremely", e: "Bổ nghĩa cho tính từ 'cold' cần một Trạng từ -> extremely." },
        { q: "30. He is (confide) _____ that he will win the match. [Trung bình]", a: "confident", e: "Sau to be 'is' cần Tính từ -> confident (tự tin)." },
        { q: "31. Smoking is (harm) _____ to your health. [Trung bình]", a: "harmful", e: "Sau to be cần Tính từ. Cấu trúc: be harmful to (có hại cho)." },
        { q: "32. The party was a great (succeed) _____. [Trung bình]", a: "success", e: "Sau mạo từ 'a' và tính từ 'great' cần Danh từ -> success (sự thành công)." },
        { q: "33. We need to find a (solve) _____ to this problem. [Trung bình]", a: "solution", e: "Sau mạo từ 'a' cần Danh từ -> solution (giải pháp)." },
        { q: "34. She smiled (happy) _____ when she saw him. [Trung bình]", a: "happily", e: "Bổ nghĩa cho động từ 'smiled' cần Trạng từ -> happily." },
        { q: "35. Electricity is one of the most important (invent) _____ of all time. [Trung bình]", a: "inventions", e: "Sau 'one of the most...' cần Danh từ số nhiều -> inventions." },
        { q: "36. The teacher gave us a clear (explain) _____ of the lesson. [Trung bình]", a: "explanation", e: "Sau tính từ 'clear' cần Danh từ -> explanation (sự giải thích)." },
        { q: "37. Going by train is more (convenience) _____ than going by bus. [Trung bình]", a: "convenient", e: "Sau 'more' trong cấu trúc so sánh hơn của tính từ dài -> convenient." },
        { q: "38. She is an (act) _____ member of the club. [Trung bình]", a: "active", e: "Đứng trước danh từ 'member' cần Tính từ -> active (năng nổ, tích cực)." },
        { q: "39. Many people lost their homes in the (nature) _____ disaster. [Trung bình]", a: "natural", e: "Trước danh từ 'disaster' cần Tính từ -> natural disaster (thiên tai)." },
        { q: "40. His sudden (appear) _____ surprised everyone. [Trung bình]", a: "appearance", e: "Sau tính từ 'sudden' cần Danh từ -> appearance (sự xuất hiện)." },

        // --- LEVEL 3: NÂNG CAO (TOEIC/IELTS) (41-60) ---
        { q: "41. The board of directors has (approve) _____ the new budget. [Nâng cao]", a: "approved", e: "Sau trợ động từ 'has' cần Động từ ở dạng V3/ed (Thì Hiện tại hoàn thành) -> approved." },
        { q: "42. The new policy will be highly (benefit) _____ to local businesses. [Nâng cao]", a: "beneficial", e: "Sau trạng từ 'highly' cần Tính từ -> beneficial (có lợi)." },
        { q: "43. We apologize for the (convenience) _____ caused by the delay. [Nâng cao]", a: "inconvenience", e: "Dựa vào ngữ cảnh (xin lỗi vì...), cần Danh từ mang nghĩa phủ định -> inconvenience (sự bất tiện)." },
        { q: "44. Please keep your personal belongings (secure) _____ at all times. [Nâng cao]", a: "secure", e: "Cấu trúc: keep + Object + Adj (giữ cho cái gì như thế nào) -> secure (an toàn)." },
        { q: "45. The machine requires regular (maintain) _____ to function properly. [Nâng cao]", a: "maintenance", e: "Sau tính từ 'regular' cần Danh từ -> maintenance (sự bảo trì)." },
        { q: "46. They have made a (signify) _____ contribution to the project. [Nâng cao]", a: "significant", e: "Đứng trước danh từ 'contribution' cần Tính từ -> significant (đáng kể)." },
        { q: "47. The manager evaluated the (perform) _____ of the staff. [Nâng cao]", a: "performance", e: "Sau mạo từ 'the' cần Danh từ -> performance (hiệu suất, phần thể hiện)." },
        { q: "48. You need written (permit) _____ to enter this restricted area. [Nâng cao]", a: "permission", e: "Sau tính từ 'written' (được viết/bằng văn bản) cần Danh từ -> permission (sự cho phép)." },
        { q: "49. (Strategy) _____, the company decided to expand into Asia. [Nâng cao]", a: "strategically", e: "Đứng đầu câu và có dấu phẩy, cần Trạng từ bổ nghĩa cho cả câu -> Strategically (Về mặt chiến lược)." },
        { q: "50. To (strong) _____ your password, add numbers and symbols. [Nâng cao]", a: "strengthen", e: "Sau 'To' chỉ mục đích cần Động từ nguyên thể -> strengthen (tăng cường)." },
        { q: "51. The factory's daily (produce) _____ has increased by 20%. [Nâng cao]", a: "production", e: "Chủ ngữ của câu, đứng sau tính từ 'daily' cần Danh từ -> production (sản lượng/sự sản xuất)." },
        { q: "52. She is entirely (depend) _____ on her parents for financial support. [Nâng cao]", a: "dependent", e: "Sau to be 'is' và trạng từ 'entirely', kết hợp giới từ 'on' -> Tính từ dependent (phụ thuộc)." },
        { q: "53. The new software is easily (access) _____ from any device. [Nâng cao]", a: "accessible", e: "Sau to be và trạng từ 'easily' cần Tính từ -> accessible (có thể truy cập)." },
        { q: "54. His presentation was very (inform) _____ and engaging. [Nâng cao]", a: "informative", e: "Sau 'very' cần Tính từ -> informative (nhiều thông tin hữu ích)." },
        { q: "55. The data must be analyzed (care) _____ before we publish the report. [Nâng cao]", a: "carefully", e: "Bổ nghĩa cho động từ bị động 'analyzed' cần Trạng từ -> carefully." },
        { q: "56. We offer a wide (vary) _____ of products at low prices. [Nâng cao]", a: "variety", e: "Cấu trúc cụm danh từ: a wide variety of (một sự đa dạng lớn các...) -> variety." },
        { q: "57. Customer (satisfy) _____ is our top priority. [Nâng cao]", a: "satisfaction", e: "Cụm danh từ: Customer satisfaction (Sự hài lòng của khách hàng)." },
        { q: "58. The weather here is highly (predict) _____; it can rain at any moment. [Nâng cao]", a: "unpredictable", e: "Ngữ cảnh: có thể mưa bất cứ lúc nào -> Tính từ mang nghĩa phủ định: unpredictable (không thể đoán trước)." },
        { q: "59. Candidates must meet all the minimum (require) _____. [Nâng cao]", a: "requirements", e: "Sau tính từ 'minimum' cần Danh từ số nhiều -> requirements (những yêu cầu)." },
        { q: "60. The CEO announced the (retire) _____ of the marketing director. [Nâng cao]", a: "retirement", e: "Sau mạo từ 'the' cần Danh từ -> retirement (sự nghỉ hưu)." }
    ];

    let currentQuestionIndex = 0;

    function loadQuestion() {
        const currentQ = quizData[currentQuestionIndex];
        document.getElementById("progress").innerText = `Câu: ${currentQuestionIndex + 1}/${quizData.length}`;
        
        let questionHtml = currentQ.q.replace("_____", "<strong>_____</strong>");
        document.getElementById("question-text").innerHTML = questionHtml;
        
        resetUI();
    }

    function checkAnswer() {
        const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
        const currentQ = quizData[currentQuestionIndex];
        
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
            feedbackEl.innerText = `❌ Sai rồi! Đáp án đúng là: ${currentQ.a}`;
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
            document.getElementById("question-text").innerHTML = "<strong>🎉 Xuất sắc! Bạn đã vượt qua 60 câu hỏi thử thách về Word Form!</strong>";
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

    window.onload = loadQuestion;

    document.getElementById("answer-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            if (document.getElementById("check-btn").style.display !== "none") {
                checkAnswer();
            } else {
                nextQuestion();
            }
        }
    });
