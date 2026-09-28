const quizData = [
        // --- LEVEL 1: LOẠI 0 & 1 (Cơ bản) ---
        { q: "1. If it (rain) _____ tomorrow, we will stay at home.", a: "rains", e: "Điều kiện loại 1: If + Hiện tại đơn, Tương lai đơn. 'it' số ít -> rains." },
        { q: "2. If you heat ice, it (melt) _____.", a: "melts", e: "Điều kiện loại 0 (sự thật hiển nhiên): If + HTĐ, HTĐ." },
        { q: "3. I will call you if I (have) _____ time.", a: "have", e: "Mệnh đề If loại 1 chia Hiện tại đơn." },
        { q: "4. If she (not/study) _____ hard, she will fail the exam.", a: "does not study / doesn't study", e: "Phủ định HTĐ với 'she' -> doesn't + V." },
        { q: "5. What will you do if you (miss) _____ the bus?", a: "miss", e: "Mệnh đề If loại 1 đi với 'you' -> động từ giữ nguyên." },
        { q: "6. If you mix red and blue, you (get) _____ purple.", a: "get", e: "Loại 0: pha màu luôn ra kết quả cố định -> Hiện tại đơn." },
        { q: "7. We will go to the beach if the weather (be) _____ nice.", a: "is", e: "Động từ 'to be' ở HTĐ đi với 'the weather' -> is." },
        { q: "8. If he (come) _____ late, the teacher will be angry.", a: "comes", e: "Chủ ngữ 'he' -> comes." },
        { q: "9. They (not/let) _____ you in if you don't have a ticket.", a: "will not let / won't let", e: "Mệnh đề chính loại 1: will not + V." },
        { q: "10. If water reaches 100 degrees, it (boil) _____.", a: "boils", e: "Sự thật khoa học (Loại 0)." },
        { q: "11. If I see him, I (give) _____ him your message.", a: "will give", e: "Sự việc có thể xảy ra ở tương lai (Loại 1)." },
        { q: "12. Plants die if they (not/get) _____ enough water.", a: "do not get / don't get", e: "Chân lý (Loại 0), 'they' mượn 'do'." },
        { q: "13. I (be) _____ very happy if you pass the test.", a: "will be", e: "Mệnh đề chính loại 1." },
        { q: "14. If you press this button, the machine (start) _____.", a: "starts", e: "Chức năng máy móc (Loại 0) -> Hiện tại đơn." },
        { q: "15. We will save money if we (eat) _____ at home.", a: "eat", e: "Mệnh đề If loại 1." },
        { q: "16. If the sun sets, it (get) _____ dark.", a: "gets", e: "Sự thật hiển nhiên." },
        { q: "17. She (not/go) _____ to the party if she is tired.", a: "will not go / won't go", e: "Mệnh đề chính loại 1 phủ định." },
        { q: "18. If you don't hurry, you (miss) _____ the train.", a: "will miss", e: "Dự đoán kết quả tương lai (Loại 1)." },
        { q: "19. If babies are hungry, they usually (cry) _____.", a: "cry", e: "Thói quen, bản năng (Loại 0)." },
        { q: "20. I will help you with your homework if I (finish) _____ mine early.", a: "finish", e: "Mệnh đề If loại 1." },

        // --- LEVEL 2: LOẠI 2 & 3 (Trung bình) ---
        { q: "21. If I (be) _____ you, I would study harder.", a: "were", e: "Điều kiện loại 2 (không có thật ở hiện tại). To be thường dùng 'were' cho mọi ngôi." },
        { q: "22. If I had a lot of money, I (travel) _____ around the world.", a: "would travel", e: "Mệnh đề chính loại 2: would + V." },
        { q: "23. If she (know) _____ his number, she would call him.", a: "knew", e: "Mệnh đề If loại 2: V quá khứ đơn (knew)." },
        { q: "24. We would have won the match if we (play) _____ better.", a: "had played", e: "Điều kiện loại 3 (không có thật trong QK). Mệnh đề If dùng Quá khứ hoàn thành (had + V3)." },
        { q: "25. If you had told me about the problem, I (help) _____ you.", a: "would have helped", e: "Mệnh đề chính loại 3: would have + V3/ed." },
        { q: "26. I would buy that house if it (not/be) _____ so expensive.", a: "were not / weren't", e: "Loại 2 (thực tế nhà rất đắt). To be -> weren't." },
        { q: "27. If he had driven carefully, he (not/have) _____ the accident.", a: "would not have had / wouldn't have had", e: "Loại 3: would not have + V3 (had)." },
        { q: "28. If they (invite) _____ me, I would have gone to the party.", a: "had invited", e: "Mệnh đề If loại 3: had + V3/ed." },
        { q: "29. What would you do if you (see) _____ a ghost?", a: "saw", e: "Giả định không có thật (Loại 2) -> Quá khứ đơn." },
        { q: "30. If it had rained yesterday, we (stay) _____ at home.", a: "would have stayed", e: "Loại 3 (thực tế hôm qua không mưa)." },
        { q: "31. She (pass) _____ the exam if she had studied harder.", a: "would have passed", e: "Mệnh đề chính loại 3." },
        { q: "32. If I spoke English perfectly, I (get) _____ a good job.", a: "would get", e: "Loại 2 (hiện tại tôi nói chưa hoàn hảo)." },
        { q: "33. If you (go) _____ to bed earlier, you wouldn't be so tired now.", a: "went", e: "Loại 2 -> V(QKĐ)." },
        { q: "34. He would not have missed the flight if he (wake) _____ up on time.", a: "had woken", e: "Loại 3 -> had + V3 (wake -> woke -> woken)." },
        { q: "35. If I (have) _____ wings, I would fly to you.", a: "had", e: "Giả định không tưởng (Loại 2) -> Quá khứ đơn." },
        { q: "36. I (not/do) _____ that if I were you.", a: "would not do / wouldn't do", e: "Câu khuyên nhủ dùng Điều kiện loại 2." },
        { q: "37. If she had worn a coat, she (not/catch) _____ a cold.", a: "would not have caught / wouldn't have caught", e: "Loại 3: Thực tế cô ấy đã bị cảm." },
        { q: "38. If we lived in a city, we (go) _____ to the cinema more often.", a: "would go", e: "Loại 2: Thực tế chúng tôi không sống ở TP." },
        { q: "39. If I (know) _____ you were in hospital, I would have visited you.", a: "had known", e: "Loại 3: Thực tế QK tôi không biết." },
        { q: "40. You would have enjoyed the movie if you (come) _____ with us.", a: "had come", e: "Loại 3: come -> came -> come." },

        // --- LEVEL 3: NÂNG CAO & ĐẢO NGỮ (TOEIC/IELTS) ---
        { q: "41. (Câu đk Hỗn hợp) If I had eaten breakfast, I (not/be) _____ hungry right now.", a: "would not be / wouldn't be", e: "Mix 3-2: Mệnh đề If loại 3 (QK), Mệnh đề chính loại 2 (có 'now')." },
        { q: "42. (Câu đk Hỗn hợp) If he were a good student, he (pass) _____ the exam yesterday.", a: "would have passed", e: "Mix 2-3: Bản chất anh ấy học dở (Loại 2), kết quả rớt bài kiểm tra hôm qua (Loại 3)." },
        { q: "43. (Đảo ngữ loại 1) _____ you need any further information, please contact us.", a: "should", e: "Đảo ngữ loại 1: Đưa 'Should' lên đầu, bỏ If. (Should + S + V)." },
        { q: "44. (Đảo ngữ loại 2) _____ I you, I would accept the offer.", a: "were", e: "Đảo ngữ loại 2: Đưa 'Were' lên đầu, bỏ If. (Were + S + ...)." },
        { q: "45. (Đảo ngữ loại 3) _____ I known the truth, I wouldn't have trusted him.", a: "had", e: "Đảo ngữ loại 3: Đưa 'Had' lên đầu, bỏ If. (Had + S + V3)." },
        { q: "46. I won't go to the party _____ you come with me.", a: "unless", e: "Unless = If...not (Trừ khi)." },
        { q: "47. You can borrow my car _____ long as you drive carefully.", a: "as", e: "As long as = So long as = Provided that (Miễn là)." },
        { q: "48. (Đảo ngữ loại 1) _____ it rain tomorrow, we will cancel the picnic.", a: "should", e: "Đảo ngữ loại 1 (Should + it + rain nguyên thể)." },
        { q: "49. (Đảo ngữ loại 2) _____ he to study harder, he would pass the exam.", a: "were", e: "Đảo ngữ loại 2 với động từ thường: Were + S + TO V." },
        { q: "50. (Mix 3-2) If she had taken the medicine last night, she (feel) _____ better now.", a: "would feel", e: "Mix 3-2: Hành động QK ảnh hưởng hiện tại (now) -> would + V." },
        { q: "51. (Unless) Unless he (apologize) _____, I will never speak to him again.", a: "apologizes", e: "Sau Unless dùng mệnh đề khẳng định (HTĐ) giống If loại 1." },
        { q: "52. _____ that you win the lottery, what will you buy first?", a: "provided / supposing", e: "Provided that / Supposing that = Giả sử như, miễn là." },
        { q: "53. (Đảo ngữ loại 3) _____ we arrived earlier, we would have seen the opening performance.", a: "had", e: "Đảo 'Had' lên trước chủ ngữ." },
        { q: "54. _____ condition that you return it by Friday, you can borrow the book.", a: "on", e: "Cụm 'On condition that' = Với điều kiện là." },
        { q: "55. (Mix 2-3) If I (not/be) _____ afraid of spiders, I would have picked it up.", a: "were not / weren't", e: "Bản chất tôi luôn sợ nhện (Loại 2), sự việc nhặt nhện ở QK (Loại 3)." },
        { q: "56. We will go hiking tomorrow _____ it rains.", a: "unless", e: "Trừ khi trời mưa." },
        { q: "57. (Đảo ngữ loại 1) _____ anyone call, tell them I'm busy.", a: "should", e: "Đảo 'Should' -> Động từ 'call' giữ nguyên thể." },
        { q: "58. But _____ his help, I would have failed the project.", a: "for", e: "Cụm 'But for + N' = Nếu không có (Dùng trong đk loại 2, 3)." },
        { q: "59. (Đảo ngữ loại 3) _____ the police not arrived in time, the thieves would have escaped.", a: "had", e: "Đảo ngữ câu phủ định: Had + S + NOT + V3." },
        { q: "60. You will fail the test _____ you study harder.", a: "unless", e: "Bạn sẽ trượt TRỪ KHI bạn học chăm hơn." }
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
            document.getElementById("question-text").innerHTML = "<strong>🎉 Tuyệt vời! Bạn đã hoàn thành 60 câu chuyên sâu về Câu điều kiện!</strong>";
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
