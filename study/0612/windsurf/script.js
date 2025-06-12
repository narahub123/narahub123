// 기본 단어 목록
const DEFAULT_WORDS = [
    { word: 'apple', meaning: '사과' },
    { word: 'banana', meaning: '바나나' },
    { word: 'computer', meaning: '컴퓨터' },
    { word: 'dictionary', meaning: '사전' },
    { word: 'elephant', meaning: '코끼리' },
    { word: 'flower', meaning: '꽃' },
    { word: 'garden', meaning: '정원' },
    { word: 'house', meaning: '집' },
    { word: 'internet', meaning: '인터넷' },
    { word: 'jacket', meaning: '자켓' },
    { word: 'kangaroo', meaning: '캥거루' },
    { word: 'language', meaning: '언어' },
    { word: 'mountain', meaning: '산' },
    { word: 'notebook', meaning: '노트북' },
    { word: 'orange', meaning: '오렌지' },
    { word: 'pencil', meaning: '연필' },
    { word: 'question', meaning: '질문' },
    { word: 'rainbow', meaning: '무지개' },
    { word: 'sunshine', meaning: '햇빛' },
    { word: 'telephone', meaning: '전화' }
];

// 현재 학습 완료된 단어들을 저장할 객체
const completedWords = {};

// API 엔드포인트
const API_ENDPOINT = 'http://work2.junios.net:9001/word?number=20';

// 단어 카드 생성 함수
function createWordCard(word, meaning, index) {
    // Create the outer column div
    const colDiv = document.createElement('div');
    colDiv.className = 'col-md-3 mb-4';
    
    // Create the card div
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card word-card';
    
    // Create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    // Create header with word and checkbox
    const headerDiv = document.createElement('div');
    headerDiv.className = 'd-flex justify-content-between align-items-center';
    
    const wordTitle = document.createElement('h5');
    wordTitle.className = 'card-title mb-0';
    wordTitle.textContent = word;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input ms-2';
    checkbox.dataset.index = index;
    
    headerDiv.appendChild(wordTitle);
    headerDiv.appendChild(checkbox);
    
    // Create meaning paragraph
    const meaningP = document.createElement('p');
    meaningP.className = 'card-text mt-2';
    meaningP.textContent = meaning;
    
    // Assemble card
    cardBody.appendChild(headerDiv);
    cardBody.appendChild(meaningP);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);
    
    return colDiv;
}

// 단어 카드 클릭 이벤트 핸들러
function handleWordClick(event) {
    const word = event.currentTarget.querySelector('.card-title').textContent;
    const meaning = event.currentTarget.querySelector('.card-text').textContent;
    
    document.getElementById('wordTitle').textContent = word;
    document.getElementById('wordMeaning').textContent = meaning;
    
    // 모달 표시
    const modal = new bootstrap.Modal(document.getElementById('wordModal'));
    modal.show();
}

// 발음 듣기 기능
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// 체크박스 변경 이벤트 핸들러
function handleCheckboxChange(event) {
    const index = event.target.dataset.index;
    const wordCard = event.target.closest('.card');
    
    if (event.target.checked) {
        wordCard.classList.add('completed');
        completedWords[index] = true;
    } else {
        wordCard.classList.remove('completed');
        delete completedWords[index];
    }
}

// 단어 목록 표시 함수
function displayWords(words) {
    console.log('Displaying words:', words);
    const wordContainer = document.getElementById('wordContainer');
    wordContainer.innerHTML = '';
    
    words.forEach((wordObj, index) => {
        console.log('Creating card for word:', wordObj);
        const card = createWordCard(wordObj.word, wordObj.meaning, index);
        
        // Add a unique ID to each card for debugging
        card.querySelector('.word-card').id = `wordCard-${index}`;
        
        wordContainer.appendChild(card);
        
        // 이벤트 리스너 추가
        const wordCard = card.querySelector('.word-card');
        wordCard.addEventListener('click', handleWordClick);
        
        const checkbox = card.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', (e) => handleCheckboxChange(e));
        } else {
            console.error('Checkbox not found in card:', wordCard);
        }
    });
}

// API 호출 함수
async function fetchWords() {
    const loading = document.getElementById('loading');
    const errorDiv = document.getElementById('error');
    
    // 로딩 표시
    loading.classList.remove('d-none');
    errorDiv.classList.add('d-none');
    
    try {
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // API 응답 데이터 유효성 검사
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error('API에서 유효한 데이터를 받지 못했습니다');
        }
        
        displayWords(data);
    } catch (error) {
        console.error('API 호출 실패:', error);
        errorDiv.textContent = error.message;
        errorDiv.classList.remove('d-none');
        // 기본 단어 목록으로 대체
        displayWords(DEFAULT_WORDS);
    } finally {
        loading.classList.add('d-none');
    }
}

// 초기화 함수
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Get required elements
        const wordContainer = document.getElementById('wordContainer');
        const loading = document.getElementById('loading');
        const errorDiv = document.getElementById('error');
        const modal = document.getElementById('wordModal');
        const pronounceBtn = document.getElementById('pronounceBtn');
        const wordTitle = document.getElementById('wordTitle');
        const wordMeaning = document.getElementById('wordMeaning');

        // Check if all required elements exist
        if (!wordContainer || !loading || !errorDiv || !modal || !pronounceBtn || !wordTitle || !wordMeaning) {
            throw new Error('Required HTML elements not found');
        }

        // Show loading state
        loading.classList.remove('d-none');
        errorDiv.classList.add('d-none');

        // API 호출
        fetchWords();

        // 발음 듣기 버튼 이벤트 리스너
        pronounceBtn.addEventListener('click', () => {
            const word = wordTitle.textContent;
            if (word) {
                pronounceWord(word);
            }
        });

        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Initialization error:', error);
        // Display error message
        if (errorDiv) {
            errorDiv.textContent = error.message;
            errorDiv.classList.remove('d-none');
        }
        // Display default words
        displayWords(DEFAULT_WORDS);
    }
});
