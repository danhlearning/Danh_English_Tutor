function speakWord(word) {
        if ('speechSynthesis' in window) {
            // Hủy các giọng đọc cũ để tránh đè âm thanh
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(word);
            
            // Thiết lập ngôn ngữ tiếng Anh và tốc độ đọc thật chậm
            utterance.lang = 'en-US'; 
            utterance.rate = 0.6; 
            
            // Ép trình duyệt tìm giọng chuẩn tiếng Anh
            const voices = window.speechSynthesis.getVoices();
            const englishVoice = voices.find(voice => voice.lang.includes('en-') && (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('Samantha') || voice.name.includes('Daniel')));
            
            if (englishVoice) {
                utterance.voice = englishVoice;
            }

            window.speechSynthesis.speak(utterance);
        } else {
            alert('Trình duyệt của bạn không hỗ trợ tính năng phát âm.');
        }
    }

    // Tải danh sách giọng đọc sớm để trình duyệt sẵn sàng
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
