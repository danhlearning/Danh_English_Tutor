// --- DATASET ĐÃ ĐƯỢC CHÈN SẴN LINK HÌNH ẢNH CHUẨN NGHĨA (TRƯỜNG THỨ 6) ---
        const rawData = {
            elementary: [
                "Always|/ˈɔːl.weɪz/|At all times; completely.|Luôn luôn|She always arrives on time.|https://images.unsplash.com/photo-1508962914676-134849a727f0?w=500",
                "Begin|/bɪˈɡɪn/|To start doing something.|Bắt đầu|Let us begin the meeting now.|https://images.unsplash.com/photo-1517842645767-c639042777db?w=500",
                "Clean|/kliːn/|Not dirty; free from soil.|Sạch sẽ|Keep your room clean and tidy.|https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500",
                "Daily|/ˈdeɪ.li/|Happening or done every day.|Hàng ngày|Exercise is part of my daily routine.|https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500",
                "Early|/ˈɜː.li/|Near the beginning of a period of time.|Sớm|He woke up early this morning.|https://images.unsplash.com/photo-1516663235222-b52b8214f762?w=500",
                "Friend|/frend/|A person whom one knows well.|Người bạn|A friend in need is a friend indeed.|https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500",
                "Gather|/ˈɡæð.ər/|To come together or bring things together.|Tập hợp|The children gather flowers in the park.|https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500",
                "Happy|/ˈhæp.i/|Feeling or showing pleasure.|Hạnh phúc|They lived a very happy life.|https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=500",
                "Island|/ˈaɪ.lənd/|A piece of land surrounded by water.|Hòn đảo|We spent our vacation on an island.|https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500",
                "Journey|/ˈdʒɜː.ni/|An act of traveling from one place to another.|Hành trình|Life is a beautiful journey.|https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500"
            ],
            intermediate: [
                "Achieve|/əˈtʃiːv/|To succeed in finishing something or reaching an aim.|Đạt được|She finally achieved her ambition to become a pilot.|https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500",
                "Capable|/ˈkeɪ.pə.bəl/|Having the ability or power necessary for doing something.|Có khả năng|She is capable of handling the entire project.|https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
                "Challenge|/ˈtʃæl.ɪndʒ/|Something that needs great mental or physical effort.|Thách thức|Learning a new language is a big challenge.|https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500",
                "Damage|/ˈdæm.ɪdʒ/|Harm or injury caused to something.|Thiệt hại|The storm caused severe damage to the building.|https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=500",
                "Manage|/ˈmæn.ɪdʒ/|To succeed in doing or dealing with something.|Quản lý, xoay xở|How do you manage to stay so calm?|https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500",
                "Provide|/prəˈvaɪd/|To give what is needed; to supply.|Cung cấp|The school provides free books for students.|https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500",
                "Receive|/rɪˈsiːv/|To get or be given something.|Nhận được|I received a beautiful letter this morning.|https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500",
                "Reduce|/rɪˈdʒuːs/|To make something smaller or less in amount.|Giảm bớt|We need to reduce our daily spending.|https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
                "Support|/səˈpɔːt/|To agree with and give encouragement to someone.|Hỗ trợ, ủng hộ|My family always supports my choices.|https://images.unsplash.com/photo-1473643081880-a862c75531ba?w=500",
                "Various|/ˈveə.ri.əs/|Many different; of several kinds.|Khác nhau, đa dạng|There are various ways to solve this problem.|https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500"
            ],
            advanced: [
                "Analyze|/ˈæn.əl.aɪz/|To study something methodically and in detail.|Phân tích|We need to analyze the results of the survey.|https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
                "Evaluate|/ɪˈvæl.ju.eɪt/|To judge or calculate the quality or value of something.|Đánh giá|The performance will be evaluated by experts.|https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=500",
                "Interpret|/ɪnˈtɜː.prɪt/|To explain the meaning of information or actions.|Giải thích, phiên dịch|How do you interpret this passage?|https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500",
                "Maintain|/meɪnˈteɪn/|To cause or enable a condition or situation to continue.|Duy trì|It is essential to maintain good relationships.|https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500",
                "Objective|/əbˈdʒek.tɪv/|Not influenced by personal feelings or opinions.|Khách quan|Scientists must remain completely objective.|https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500",
                "Perceive|/pəˈsiːv/|To become aware or conscious of something; to notice.|Nhận thức, nhìn nhận|Newspapers are perceived as more reliable than blogs.|https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500",
                "Perspective|/pəˈspek.tɪv/|A particular attitude toward or way of regarding something.|Góc nhìn, quan điểm|The trip gave him a new perspective on life.|https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500",
                "Precise|/prɪˈsaɪs/|Exact, accurate, and careful about details.|Chính xác, rõ ràng|You need to be precise when measuring ingredients.|https://images.unsplash.com/photo-1532242117833-b930811a79a2?w=500",
                "Sustain|/səˈsteɪn/|To strengthen or support physically or mentally over time.|Duy trì, chống đỡ|The company cannot sustain such heavy financial losses.|https://images.unsplash.com/photo-1448375240586-882707db888b?w=500",
                "Theory|/ˈθɪə.ri/|A formal statement of the rules on which a subject is based.|Lý thuyết, giả thuyết|In theory, the project should work perfectly.|https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=500"
            ],
            toeic: [
                "Agenda|/əˈdʒen.də/|A list of matters to be discussed at a meeting.|Chương trình nghị sự|The next item on the agenda is the budget.|https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500",
                "Collaborate|/kəˈlæb.ə.reɪt/|To work jointly on an activity or project.|Hợp tác, cộng tác|The two teams collaborated closely on this product.|https://images.unsplash.com/photo-1531535934027-667f687cfe5f?w=500",
                "Compensation|/ˌkɒm.penˈseɪ.ʃən/|Money that is paid to someone in exchange for work.|Tiền lương, bồi thường|The position offers a competitive compensation package.|https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=500",
                "Delegate|/ˈdel.ɪ.ɡət/|To give a particular job or duty to someone else.|Ủy thác, giao việc|A good manager knows how to delegate tasks.|https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500",
                "Enterprise|/ˈen.tə.praɪz/|An organization, a company, or a business.|Doanh nghiệp|This is a private enterprise with local operations.|https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
                "Fluctuate|/ˈflʌk.tʃu.eɪt/|To change continuously between one level and another.|Dao động, biến động|Vegetable prices fluctuate depending on the season.|https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500",
                "Negotiate|/nəˈɡəʊ.ʃi.eɪt/|To try to reach an agreement by formal discussion.|Đàm phán, thương lượng|We managed to negotiate a lower price with the client.|https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500",
                "Productivity|/ˌprɒd.ʌkˈtɪv.ə.ti/|The rate at which a company produces goods.|Năng suất, hiệu suất|New training programs helped improve productivity.|https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
                "Revenue|/ˈrev.ən.juː/|The total amount of income generated by sales.|Doanh thu|The firm reported a slight decline in quarterly revenue.|https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500",
                "Termination|/ˌtɜː.mɪˈneɪ.ʃən/|The act of bringing something to an end.|Sự chấm dứt, kết thúc|The termination of the contract requires a notice period.|https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=500"
            ],
            ielts: [
                "Acquisition|/ˌæk.wɪˈzɪʃ.ən/|The act of obtaining or learning something.|Sự tích lũy, tiếp thu|Language acquisition is easier for young children.|https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500",
                "Correlation|/ˌkɒr.əˈleɪ.ʃən/|A mutual relationship or connection between two things.|Sự tương quan|There is a correlation between education and income.|https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500",
                "Empirical|/ɪmˈpɪr.ɪ.kəl/|Based on testing or experience rather than ideas.|Mang tính thực nghiệm|They gathered empirical data to test their hypothesis.|https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=500",
                "Holistic|/həʊˈlɪs.tɪk/|Dealing with the whole of something, not just parts.|Toàn diện, tổng thể|We need a holistic approach to solve urban traffic issues.|https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
                "Inherent|/ɪnˈhɪə.rənt/|Existing as a natural and permanent part of something.|Vốn có, cố hữu|There are inherent risks in driving too fast on highways.|https://images.unsplash.com/photo-1518173946687-a4c8a383392e?w=500",
                "Mitigate|/ˈmɪt.ɪ.ɡeɪt/|To make something less severe or harmful.|Giảm thiểu, làm dịu bớt|Good planning can help mitigate the effects of the crisis.|https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
                "Paradigm|/ˈpær.ə.daɪm/|A typical example, pattern, or model of something.|Mô hình, kiểu mẫu|The system represents a new paradigm in education.|https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500",
                "Pragmatic|/præɡˈmæt.ɪk/|Solving problems in a practical and sensible way.|Thực tế, thực dụng|She adopted a pragmatic approach to handling the budget cuts.|https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=500",
                "Resilience|/rɪˈzɪl.i.əns/|The ability to recover quickly from difficulties.|Khả năng phục hồi|The local economy showed great resilience after the pandemic.|https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500",
                "Significant|/sɪɡˈnɪf.ɪ.kənt/|Important, large, or noticeable enough to have an effect.|Quan trọng, đáng kể|There has been a significant increase in online sales.|https://images.unsplash.com/photo-1453060113865-968ce1be53d0?w=500"
            ]
        };

        const database = { elementary: [], intermediate: [], advanced: [], toeic: [], ielts: [], custom: [], review: [] };

        function boostDatabase() {
            const categories = ['elementary', 'intermediate', 'advanced', 'toeic', 'ielts'];
            categories.forEach(cat => {
                const baseArr = rawData[cat];
                for (let i = 1; i <= 100; i++) {
                    const template = baseArr[(i - 1) % baseArr.length];
                    const parts = template.split('|');
                    database[cat].push({
                        id: `${cat.substring(0, 2)}_${i}`,
                        word: parts[0],
                        ipa: parts[1],
                        defEn: parts[2],
                        meanVi: parts[3],
                        example: parts[4],
                        image: parts[5] || "" // Đồng bộ dữ liệu ảnh sạch
                    });
                }
            });
        }

        // --- SYSTEM CORE ---
        const learnerStorage = window.DanhLearners?.storage || window.localStorage;
        const readList = key => { try { const v=JSON.parse(learnerStorage.getItem(key)); return Array.isArray(v)?v:[]; } catch { return []; } };
        let reviewList = [];
        let learnedList = [];

        let currentCategory = 'elementary';
        let flashcards = [];
        let currentIndex = 0;
        let correctCount = 0;
        let wrongCount = 0;
        let transitionTimer = null;
        let marking = false;
        const roundRatings = new Map();

        const cardElement = document.getElementById('flashcard');

        function speakWord(text) {
    if(window.DanhListenControls?.isManualRequest())return window.DanhAnswerSpeech.listen(text);
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'en-US';
                utterance.rate = 0.88;
                window.speechSynthesis.speak(utterance);
            }
        }

        function handleCardClick(event) {
            if (!flashcards.length || event.target.closest('.empty-state-text')) return;
            if (event.target.closest('#btn-speak-icon') || event.target.closest('.btn-speaker')) {
                event.stopPropagation();
                if (flashcards[currentIndex]) speakWord(flashcards[currentIndex].word);
                return;
            }
            setCardFlipped(!cardElement.classList.contains('is-flipped'));
        }

        function setCardFlipped(flipped) {
            cardElement.classList.toggle('is-flipped', flipped);
            const front = document.getElementById('card-front-view');
            const back = document.getElementById('card-back-view');
            front.inert = flipped;
            back.inert = !flipped;
            front.setAttribute('aria-hidden', String(flipped));
            back.setAttribute('aria-hidden', String(!flipped));
            const flip = document.getElementById('btn-flip');
            flip.setAttribute('aria-pressed', String(flipped));
            flip.textContent = flipped ? 'Xem lại từ ↻' : 'Lật xem nghĩa ↻';
        }

        function loadUserData() {
            database.custom = readList('c_words_g');
            reviewList = readList('r_list_g');
            learnedList = readList('l_list_g');
            buildReviewCategory();
        }
        function saveDataSync() {
            learnerStorage.setItem('r_list_g', JSON.stringify(reviewList));
            learnerStorage.setItem('l_list_g', JSON.stringify(learnedList));
            buildReviewCategory();
        }
        function buildReviewCategory() {
            const allWords = [...database.elementary, ...database.intermediate, ...database.advanced, ...database.toeic, ...database.ielts, ...database.custom];
            database.review = allWords.filter(item => reviewList.includes(item.id));
            document.getElementById('seg-review').innerText = `Ôn tập (${database.review.length})`;
        }

        function switchCategory(catName) {
            currentCategory = catName;
            document.querySelectorAll('.segment-btn').forEach(b => {
                b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false');
            });
            document.getElementById(`seg-${catName}`).classList.add('is-active');
            document.getElementById(`seg-${catName}`).setAttribute('aria-pressed', 'true');
            document.getElementById(`seg-${catName}`).scrollIntoView({block:'nearest', inline:'nearest'});
            flashcards = [...database[currentCategory]];
            resetGame();
        }

        function updateCard() {
            setCardFlipped(false);
            if (flashcards.length === 0) {
                document.getElementById('card-front-view').innerHTML = currentCategory === 'custom'
                    ? `<div class="empty-state-text"><h2>Sổ tay đang chờ từ đầu tiên 🌱</h2><p>Thêm từ em muốn nhớ cùng nghĩa và câu ví dụ.</p><button class="btn-flip" onclick="event.stopPropagation();openAddWordModal()">Thêm từ đầu tiên</button></div>`
                    : `<div class="empty-state-text"><h2>Chưa có từ cần ôn 🌿</h2><p>Chọn “Cần ôn lại” khi xem thẻ để đưa từ vào đây.</p><button class="btn-flip" onclick="event.stopPropagation();switchCategory('elementary')">Chọn bộ từ sơ cấp</button></div>`;
                document.getElementById('card-index').innerText = "0/0";
                document.getElementById('progress-bar').style.width = '0%';
                setDisabled(true);
                return;
            }

            const checkImg = document.getElementById('img-vocab');
            if (!checkImg) {
                document.getElementById('card-front-view').innerHTML = `
                    <div class="vocab-image-box"><img id="img-vocab" src="./assets/icons/vocabulary-fallback.svg" alt="Hình minh họa từ vựng"></div>
                    <div class="front-info-area">
                        <div class="word-container">
                            <div class="word" id="lbl-word">-</div>
                            <button class="btn-speaker" id="btn-speak-icon" aria-label="Nghe từ tiếng Anh"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg></button>
                        </div>
                        <div class="ipa" id="lbl-ipa">-</div>
                    </div>`;
            }

            setDisabled(false);
            const data = flashcards[currentIndex];

            document.getElementById('lbl-word').innerText = data.word;
            document.getElementById('lbl-ipa').innerText = data.ipa;
            document.getElementById('lbl-def-en').innerText = data.defEn;
            document.getElementById('lbl-mean-vi').innerText = data.meanVi;
            document.getElementById('lbl-example').innerText = data.example;

            // A failed image gets one local fallback, including for custom words.
            const imgElement = document.getElementById('img-vocab');
            imgElement.style.opacity = '0.3';
            imgElement.onload = () => imgElement.style.opacity = '1';
            imgElement.onerror = () => {
                imgElement.onerror = null;
                imgElement.alt = 'Chưa có hình minh họa riêng cho từ này';
                imgElement.style.opacity = '1';
                imgElement.src = './assets/icons/vocabulary-fallback.svg';
            };
            imgElement.alt = data.image ? `Hình minh họa: ${data.word}` : 'Chưa có hình minh họa riêng cho từ này';
            imgElement.src = data.image || './assets/icons/vocabulary-fallback.svg';

            document.getElementById('card-index').innerText = `${currentIndex + 1}/${flashcards.length}`;
            document.getElementById('btn-prev').disabled = currentIndex === 0;
            document.getElementById('btn-next').disabled = currentIndex === flashcards.length - 1;
            document.getElementById('progress-bar').style.width = `${((currentIndex + 1)/flashcards.length)*100}%`;
        }

        function setDisabled(val) {
            document.getElementById('btn-mark-wrong').disabled = val; document.getElementById('btn-mark-correct').disabled = val;
            document.getElementById('btn-shuffle').disabled = val;
            document.getElementById('btn-prev').disabled = val || currentIndex === 0;
            document.getElementById('btn-next').disabled = val || currentIndex === flashcards.length - 1;
            document.getElementById('btn-flip').disabled = val;
        }

        function nextCard() { if (!marking && currentIndex < flashcards.length - 1) { currentIndex++; updateCard(); } }
        function prevCard() { if (!marking && currentIndex > 0) { currentIndex--; updateCard(); } }

        function markCard(isCorrect) {
            if (flashcards.length === 0 || marking) return;
            marking = true;
            setDisabled(true);
            const item = flashcards[currentIndex];
            roundRatings.set(item.id, isCorrect);
            correctCount = [...roundRatings.values()].filter(Boolean).length;
            wrongCount = roundRatings.size - correctCount;
            document.getElementById('correct-count').innerText = correctCount;
            document.getElementById('wrong-count').innerText = wrongCount;
            if (isCorrect) {
                if (!learnedList.includes(item.id)) learnedList.push(item.id);
                reviewList = reviewList.filter(id => id !== item.id);
            } else {
                if (!reviewList.includes(item.id)) reviewList.push(item.id);
                learnedList = learnedList.filter(id => id !== item.id);
            }
            saveDataSync();
            if (currentIndex < flashcards.length - 1) {
                transitionTimer = setTimeout(() => { marking = false; currentIndex++; updateCard(); }, 250);
            } else {
                transitionTimer = setTimeout(() => {
                    alert(`Đã xem hết bộ thẻ!\nTự đánh giá nhớ được: ${correctCount}\nCần ôn lại: ${wrongCount}`);
                    flashcards = [...database[currentCategory]];
                    resetGame();
                }, 350);
            }
        }

        function resetGame() { clearTimeout(transitionTimer); marking = false; roundRatings.clear(); currentIndex = 0; correctCount = 0; wrongCount = 0; document.getElementById('correct-count').innerText = 0; document.getElementById('wrong-count').innerText = 0; updateCard(); }
        function shuffleCards() { flashcards.sort(() => Math.random() - 0.5); resetGame(); }

        // --- POPUPS & AUTH ---
        let activeModal = null;
        let modalTrigger = null;
        let modalBackground = [];
        let previousOverflow = '';
        const modalFocusables = modal => [...modal.querySelectorAll('button:not(:disabled),input:not(:disabled),[href],[tabindex="0"]')]
            .filter(node => node.getClientRects().length);
        function openModal(id, initialFocus) {
            if (activeModal) closeModal(activeModal.id);
            const modal = document.getElementById(id);
            modalTrigger = document.activeElement;
            previousOverflow = document.body.style.overflow;
            modalBackground = [...document.body.children].filter(node => node !== modal)
                .map(node => ({ node, inert: node.inert }));
            modalBackground.forEach(({ node }) => { node.inert = true; });
            activeModal = modal;
            modal.inert = false;
            modal.removeAttribute('aria-hidden');
            modal.classList.add('is-visible');
            document.body.style.overflow = 'hidden';
            (modal.querySelector(initialFocus || 'button') || modal.querySelector('[role="dialog"]')).focus();
        }
        document.addEventListener('keydown', event => {
            if (!activeModal) return;
            if (event.key === 'Escape') {
                event.preventDefault(); closeModal(activeModal.id);
            } else if (event.key === 'Tab') {
                const nodes = modalFocusables(activeModal), first = nodes[0], last = nodes[nodes.length - 1];
                if (!nodes.length) { event.preventDefault(); return; }
                if (event.shiftKey && (document.activeElement === first || !nodes.includes(document.activeElement))) {
                    event.preventDefault(); last.focus();
                } else if (!event.shiftKey && (document.activeElement === last || !nodes.includes(document.activeElement))) {
                    event.preventDefault(); first.focus();
                }
            }
        });
        function openAddWordModal() { openModal('modal-add-word', '#txt-word'); }
        function openStatsModal() {
            const allWords = [...database.elementary, ...database.intermediate, ...database.advanced, ...database.toeic, ...database.ielts, ...database.custom];
            const total = allWords.length;
            const correctTotal = learnedList.filter(id => allWords.some(w => w.id === id)).length;
            const reviewTotal = reviewList.filter(id => allWords.some(w => w.id === id)).length;
            const untouchedTotal = Math.max(0, total - correctTotal - reviewTotal);
            const ratio = total > 0 ? Math.round((correctTotal / total) * 100) : 0;

            document.getElementById('stat-total-vocab').innerText = total;
            document.getElementById('stat-ratio-done').innerText = `${ratio}%`;
            document.getElementById('lbl-stat-c').innerText = correctTotal;
            document.getElementById('lbl-stat-r').innerText = reviewTotal;
            document.getElementById('lbl-stat-u').innerText = untouchedTotal;

            document.getElementById('bar-correct').style.width = `${total > 0 ? (correctTotal/total)*100 : 0}%`;
            document.getElementById('bar-review').style.width = `${total > 0 ? (reviewTotal/total)*100 : 0}%`;
            openModal('modal-stats');
        }
        function resetStatsLog() { if (confirm("Xóa lịch sử để học lại từ đầu?")) { reviewList = []; learnedList = []; saveDataSync(); closeModal('modal-stats'); resetGame(); } }
        function closeModal(id) {
            const modal = document.getElementById(id);
            if (activeModal !== modal) return;
            modal.classList.remove('is-visible');
            modalBackground.forEach(({ node, inert }) => { node.inert = inert; });
            document.body.style.overflow = previousOverflow;
            activeModal = null;
            if (modalTrigger?.isConnected) modalTrigger.focus();
            modal.inert = true;
            modal.setAttribute('aria-hidden', 'true');
        }
        function closeModalViaOverlay(e, id) { if (e.target.classList.contains('modal-overlay')) closeModal(id); }

        function saveNewWord() {
            const w = document.getElementById('txt-word').value.trim();
            const vi = document.getElementById('txt-mean-vi').value.trim();
            if (!w || !vi) return alert("Vui lòng điền từ mới và nghĩa tiếng Việt.");
            const newObj = {
                id: "c_" + Date.now(), word: w, ipa: document.getElementById('txt-ipa').value.trim() || "/.../",
                defEn: document.getElementById('txt-def-en').value.trim() || "No English definition.", meanVi: vi,
                example: document.getElementById('txt-example').value.trim() || "No example provided.",
                image: "" // Dùng ảnh dự phòng nội bộ cho từ tự thêm.
            };
            database.custom.push(newObj); learnerStorage.setItem('c_words_g', JSON.stringify(database.custom));
            loadUserData(); closeModal('modal-add-word'); switchCategory('custom');
        }

        function clearAllCustomWords() {
            if (confirm("Xóa sạch sổ tay từ vựng tự thêm?")) {
                learnerStorage.removeItem('c_words_g');
                saveDataSync(); loadUserData(); closeModal('modal-add-word'); switchCategory('custom');
            }
        }

        // RUN ENGINE
        boostDatabase();
        loadUserData();
        switchCategory('elementary');
