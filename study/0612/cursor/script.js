let words = [];
let currentWord = null;
const wordModal = new bootstrap.Modal(document.getElementById('wordModal'));

// 단어 목록 가져오기
async function fetchWords() {
    try {
        const response = await fetch('http://work2.junios.net:9001/word?number=20', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        words = await response.json();
        if (!Array.isArray(words) || words.length === 0) {
            throw new Error('No words received from API');
        }
        
        displayWords();
    } catch (error) {
        console.error('단어를 가져오는데 실패했습니다:', error);
        // 에러 발생 시 더미 데이터로 대체
        words = [
            { word: "apple", meaning: "사과" },
            { word: "banana", meaning: "바나나" },
            { word: "computer", meaning: "컴퓨터" },
            { word: "dictionary", meaning: "사전" },
            { word: "elephant", meaning: "코끼리" },
            { word: "flower", meaning: "꽃" },
            { word: "garden", meaning: "정원" },
            { word: "house", meaning: "집" },
            { word: "internet", meaning: "인터넷" },
            { word: "jacket", meaning: "자켓" },
            { word: "kangaroo", meaning: "캥거루" },
            { word: "language", meaning: "언어" },
            { word: "mountain", meaning: "산" },
            { word: "notebook", meaning: "노트북" },
            { word: "orange", meaning: "오렌지" },
            { word: "pencil", meaning: "연필" },
            { word: "question", meaning: "질문" },
            { word: "rainbow", meaning: "무지개" },
            { word: "sunshine", meaning: "햇빛" },
            { word: "telephone", meaning: "전화" }
        ];
        displayWords();
    }
}

// 단어 목록 표시
function displayWords() {
    const wordList = document.getElementById('wordList');
    wordList.innerHTML = '';

    words.forEach((word, index) => {
        const wordCard = document.createElement('div');
        wordCard.className = 'col-md-4 col-sm-6';
        wordCard.innerHTML = `
            <div class="word-card" data-index="${index}">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="check${index}">
                    <label class="form-check-label" for="check${index}">
                        ${word.word}
                    </label>
                </div>
            </div>
        `;

        // 체크박스 이벤트 리스너
        const checkbox = wordCard.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', (e) => {
            const card = e.target.closest('.word-card');
            if (e.target.checked) {
                card.classList.add('completed');
            } else {
                card.classList.remove('completed');
            }
        });

        // 단어 카드 클릭 이벤트
        wordCard.querySelector('.word-card').addEventListener('click', (e) => {
            if (!e.target.matches('input[type="checkbox"]')) {
                showWordDetail(index);
            }
        });

        wordList.appendChild(wordCard);
    });
}

// 단어 상세 정보 표시
function showWordDetail(index) {
    currentWord = words[index];
    document.getElementById('modalWord').textContent = currentWord.word;
    document.getElementById('modalMeaning').textContent = currentWord.meaning;
    wordModal.show();
}

// 단어 발음
function speakWord() {
    if (currentWord) {
        const utterance = new SpeechSynthesisUtterance(currentWord.word);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
}

// 페이지 로드 시 단어 가져오기
document.addEventListener('DOMContentLoaded', fetchWords); 