// --- DATASET ĐÃ ĐƯỢC CHÈN SẴN LINK HÌNH ẢNH CHUẨN NGHĨA (TRƯỜNG THỨ 6) ---
        const rawData = {
            elementary: [
                "Always|/ˈɔːl.weɪz/|At all times; completely.|Luôn luôn|She always arrives on time.|./assets/images/legacy-vocabulary/6a750aa8808805e2.jpg",
                "Begin|/bɪˈɡɪn/|To start doing something.|Bắt đầu|Let us begin the meeting now.|./assets/images/legacy-vocabulary/df050e7c5062141c.jpg",
                "Clean|/kliːn/|Not dirty; free from soil.|Sạch sẽ|Keep your room clean and tidy.|./assets/images/legacy-vocabulary/c7785b6e38609a98.jpg",
                "Daily|/ˈdeɪ.li/|Happening or done every day.|Hàng ngày|Exercise is part of my daily routine.|./assets/images/legacy-vocabulary/8c3ad260f7888f4c.jpg",
                "Early|/ˈɜː.li/|Near the beginning of a period of time.|Sớm|He woke up early this morning.|./assets/icons/vocabulary-fallback.svg",
                "Friend|/frend/|A person whom one knows well.|Người bạn|A friend in need is a friend indeed.|./assets/images/legacy-vocabulary/e90c0998c14fddd6.jpg",
                "Gather|/ˈɡæð.ər/|To come together or bring things together.|Tập hợp|The children gather flowers in the park.|./assets/images/legacy-vocabulary/93cc8fb0a5fa5f04.jpg",
                "Happy|/ˈhæp.i/|Feeling or showing pleasure.|Hạnh phúc|They lived a very happy life.|./assets/images/legacy-vocabulary/f31dcb7942b21329.jpg",
                "Island|/ˈaɪ.lənd/|A piece of land surrounded by water.|Hòn đảo|We spent our vacation on an island.|grade/lop6/assets/images/pencil/unit5/island-v1.webp",
                "Journey|/ˈdʒɜː.ni/|An act of traveling from one place to another.|Hành trình|Life is a beautiful journey.|./assets/images/legacy-vocabulary/ef32f84814ba86e0.jpg"
            ],
            intermediate: [
                "Achieve|/əˈtʃiːv/|To succeed in finishing something or reaching an aim.|Đạt được|She finally achieved her ambition to become a pilot.|./assets/images/legacy-vocabulary/f5953a35b8e31ccf.jpg",
                "Capable|/ˈkeɪ.pə.bəl/|Having the ability or power necessary for doing something.|Có khả năng|She is capable of handling the entire project.|./assets/images/legacy-vocabulary/76bc1b664eb19479.jpg",
                "Challenge|/ˈtʃæl.ɪndʒ/|Something that needs great mental or physical effort.|Thách thức|Learning a new language is a big challenge.|./assets/images/legacy-vocabulary/5924160765714377.jpg",
                "Damage|/ˈdæm.ɪdʒ/|Harm or injury caused to something.|Thiệt hại|The storm caused severe damage to the building.|shared/assets/vocabulary-reviewed/damage-v1.webp",
                "Manage|/ˈmæn.ɪdʒ/|To succeed in doing or dealing with something.|Quản lý, xoay xở|How do you manage to stay so calm?|shared/assets/vocabulary-reviewed/manage-v1.webp",
                "Provide|/prəˈvaɪd/|To give what is needed; to supply.|Cung cấp|The school provides free books for students.|./assets/images/legacy-vocabulary/ea1e4fcf26877c1a.jpg",
                "Receive|/rɪˈsiːv/|To get or be given something.|Nhận được|I received a beautiful letter this morning.|./assets/images/legacy-vocabulary/6b2d1c1d04e7df22.jpg",
                "Reduce|/rɪˈdʒuːs/|To make something smaller or less in amount.|Giảm bớt|We need to reduce our daily spending.|shared/assets/vocabulary-reviewed/reduce-v1.webp",
                "Support|/səˈpɔːt/|To agree with and give encouragement to someone.|Hỗ trợ, ủng hộ|My family always supports my choices.|./assets/icons/vocabulary-fallback.svg",
                "Various|/ˈveə.ri.əs/|Many different; of several kinds.|Khác nhau, đa dạng|There are various ways to solve this problem.|./assets/images/legacy-vocabulary/ec9813d54eb8d5b6.jpg"
            ],
            advanced: [
                "Analyze|/ˈæn.əl.aɪz/|To study something methodically and in detail.|Phân tích|We need to analyze the results of the survey.|./assets/images/legacy-vocabulary/dc166471757c7b76.jpg",
                "Evaluate|/ɪˈvæl.ju.eɪt/|To judge or calculate the quality or value of something.|Đánh giá|The performance will be evaluated by experts.|./assets/images/legacy-vocabulary/6fbd5496f02e2d4d.jpg",
                "Interpret|/ɪnˈtɜː.prɪt/|To explain the meaning of information or actions.|Giải thích, phiên dịch|How do you interpret this passage?|./assets/images/legacy-vocabulary/956a25916a65b707.jpg",
                "Maintain|/meɪnˈteɪn/|To cause or enable a condition or situation to continue.|Duy trì|It is essential to maintain good relationships.|shared/assets/vocabulary-reviewed/maintain-v1.webp",
                "Objective|/əbˈdʒek.tɪv/|Not influenced by personal feelings or opinions.|Khách quan|Scientists must remain completely objective.|./assets/images/legacy-vocabulary/bf03d361f738430b.jpg",
                "Perceive|/pəˈsiːv/|To become aware or conscious of something; to notice.|Nhận thức, nhìn nhận|Newspapers are perceived as more reliable than blogs.|./assets/images/legacy-vocabulary/914d190d41dfdd34.jpg",
                "Perspective|/pəˈspek.tɪv/|A particular attitude toward or way of regarding something.|Góc nhìn, quan điểm|The trip gave him a new perspective on life.|shared/assets/vocabulary-reviewed/perspective-v1.webp",
                "Precise|/prɪˈsaɪs/|Exact, accurate, and careful about details.|Chính xác, rõ ràng|You need to be precise when measuring ingredients.|./assets/icons/vocabulary-fallback.svg",
                "Sustain|/səˈsteɪn/|To strengthen or support physically or mentally over time.|Duy trì, chống đỡ|The company cannot sustain such heavy financial losses.|./assets/images/legacy-vocabulary/f83d49fa3d846b25.jpg",
                "Theory|/ˈθɪə.ri/|A formal statement of the rules on which a subject is based.|Lý thuyết, giả thuyết|In theory, the project should work perfectly.|./assets/images/legacy-vocabulary/a3eb2cadd9c9d6cf.jpg"
            ],
            toeic: [
                "Agenda|/əˈdʒen.də/|A list of matters to be discussed at a meeting.|Chương trình nghị sự|The next item on the agenda is the budget.|./assets/images/legacy-vocabulary/0e2a79e22d7851c7.jpg",
                "Collaborate|/kəˈlæb.ə.reɪt/|To work jointly on an activity or project.|Hợp tác, cộng tác|The two teams collaborated closely on this product.|./assets/icons/vocabulary-fallback.svg",
                "Compensation|/ˌkɒm.penˈseɪ.ʃən/|Money that is paid to someone in exchange for work.|Tiền lương, bồi thường|The position offers a competitive compensation package.|grade/lop10/assets/images/pencil/unit6/7-v2.webp",
                "Delegate|/ˈdel.ɪ.ɡət/|To give a particular job or duty to someone else.|Ủy thác, giao việc|A good manager knows how to delegate tasks.|./assets/images/legacy-vocabulary/675228e8b4fc11dd.jpg",
                "Enterprise|/ˈen.tə.praɪz/|An organization, a company, or a business.|Doanh nghiệp|This is a private enterprise with local operations.|./assets/images/legacy-vocabulary/d96539e3e940903a.jpg",
                "Fluctuate|/ˈflʌk.tʃu.eɪt/|To change continuously between one level and another.|Dao động, biến động|Vegetable prices fluctuate depending on the season.|./assets/images/legacy-vocabulary/68e4d754864b2f6e.jpg",
                "Negotiate|/nəˈɡəʊ.ʃi.eɪt/|To try to reach an agreement by formal discussion.|Đàm phán, thương lượng|We managed to negotiate a lower price with the client.|shared/assets/vocabulary-reviewed/negotiate-v1.webp",
                "Productivity|/ˌprɒd.ʌkˈtɪv.ə.ti/|The rate at which a company produces goods.|Năng suất, hiệu suất|New training programs helped improve productivity.|./assets/images/legacy-vocabulary/b72bab91eaab6555.jpg",
                "Revenue|/ˈrev.ən.juː/|The total amount of income generated by sales.|Doanh thu|The firm reported a slight decline in quarterly revenue.|./assets/images/legacy-vocabulary/628fe2e05da96186.jpg",
                "Termination|/ˌtɜː.mɪˈneɪ.ʃən/|The act of bringing something to an end.|Sự chấm dứt, kết thúc|The termination of the contract requires a notice period.|shared/assets/vocabulary-reviewed/termination-v1.webp"
            ],
            ielts: [
                "Acquisition|/ˌæk.wɪˈzɪʃ.ən/|The act of obtaining or learning something.|Sự tích lũy, tiếp thu|Language acquisition is easier for young children.|./assets/images/legacy-vocabulary/cb629d0bd6130b54.jpg",
                "Correlation|/ˌkɒr.əˈleɪ.ʃən/|A mutual relationship or connection between two things.|Sự tương quan|There is a correlation between education and income.|./assets/images/legacy-vocabulary/dc166471757c7b76.jpg",
                "Empirical|/ɪmˈpɪr.ɪ.kəl/|Based on testing or experience rather than ideas.|Mang tính thực nghiệm|They gathered empirical data to test their hypothesis.|./assets/images/legacy-vocabulary/9c140a5f93768b64.jpg",
                "Holistic|/həʊˈlɪs.tɪk/|Dealing with the whole of something, not just parts.|Toàn diện, tổng thể|We need a holistic approach to solve urban traffic issues.|./assets/images/legacy-vocabulary/befd91d65c04f032.jpg",
                "Inherent|/ɪnˈhɪə.rənt/|Existing as a natural and permanent part of something.|Vốn có, cố hữu|There are inherent risks in driving too fast on highways.|./assets/icons/vocabulary-fallback.svg",
                "Mitigate|/ˈmɪt.ɪ.ɡeɪt/|To make something less severe or harmful.|Giảm thiểu, làm dịu bớt|Good planning can help mitigate the effects of the crisis.|./assets/images/legacy-vocabulary/76bc1b664eb19479.jpg",
                "Paradigm|/ˈpær.ə.daɪm/|A typical example, pattern, or model of something.|Mô hình, kiểu mẫu|The system represents a new paradigm in education.|./assets/images/legacy-vocabulary/ae00eb1582613662.jpg",
                "Pragmatic|/præɡˈmæt.ɪk/|Solving problems in a practical and sensible way.|Thực tế, thực dụng|She adopted a pragmatic approach to handling the budget cuts.|./assets/images/legacy-vocabulary/6fbd5496f02e2d4d.jpg",
                "Resilience|/rɪˈzɪl.i.əns/|The ability to recover quickly from difficulties.|Khả năng phục hồi|The local economy showed great resilience after the pandemic.|./assets/images/legacy-vocabulary/1a9384949c9dd331.jpg",
                "Significant|/sɪɡˈnɪf.ɪ.kənt/|Important, large, or noticeable enough to have an effect.|Quan trọng, đáng kể|There has been a significant increase in online sales.|./assets/icons/vocabulary-fallback.svg"
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
            window.DanhPictureListen.bind(imgElement.parentElement,data.word,data.meanVi);
            const pictureSpeaker=document.getElementById('btn-speak-icon');
            if(pictureSpeaker){pictureSpeaker.style.visibility='hidden';pictureSpeaker.style.pointerEvents='none';pictureSpeaker.tabIndex=-1;pictureSpeaker.setAttribute('aria-hidden','true');}
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
