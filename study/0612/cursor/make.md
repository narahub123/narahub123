# 오늘의 영단어 학습 앱

## 프로젝트 개요
영어 단어 학습을 위한 웹 애플리케이션입니다. API를 통해 단어를 가져와 표시하고, 사용자가 단어를 학습하고 관리할 수 있습니다. API 연결 실패 시 기본 단어 목록을 제공합니다.

## 주요 기능
- 20개의 영단어 무작위 표시
- 단어 클릭 시 상세 정보 팝업
- 단어 발음 듣기 기능
- 학습 완료 체크 기능 (체크 시 취소선 표시)
- API 연결 실패 시 기본 단어 목록 제공

## 기술 스택
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5.3.0
- Web Speech API (발음 기능)

## 파일 구조
```
├── index.html      # 메인 HTML 파일
├── script.js       # JavaScript 로직
└── make.md        # 프로젝트 문서
```

## API 정보
- 엔드포인트: `http://work2.junios.net:9001/word?number=20`
- 기능: 20개의 영단어 데이터를 JSON 형식으로 반환
- CORS 지원: API 호출 시 CORS 헤더 포함
- 에러 처리: API 연결 실패 시 기본 단어 목록으로 대체

## 사용된 라이브러리
1. **Bootstrap 5.3.0**
   - 반응형 디자인
   - 모달 컴포넌트
   - 그리드 시스템

2. **Bootstrap Icons**
   - 발음 듣기 버튼 아이콘

## 주요 기능 상세 설명

### 1. 단어 표시
- API를 통해 20개의 단어를 가져옴
- API 연결 실패 시 기본 단어 목록(20개) 제공
- 카드 형태로 단어 목록 표시
- 반응형 그리드 레이아웃 적용

### 2. 단어 상세 정보
- 단어 클릭 시 모달 창 표시
- 단어의 의미 표시
- 발음 듣기 기능 제공

### 3. 학습 관리
- 체크박스를 통한 학습 완료 표시
- 완료된 단어는 취소선으로 표시
- 체크박스 토글 기능

### 4. 에러 처리
- API 연결 실패 감지
- HTTP 상태 코드 확인
- 응답 데이터 유효성 검사
- 기본 단어 목록으로 대체 기능

## 스타일링 특징
- 깔끔하고 모던한 디자인
- 카드 호버 효과
- 부드러운 애니메이션
- 반응형 레이아웃

## 실행 방법
1. 웹 서버를 통해 index.html 파일 실행
2. VS Code Live Server 확장 프로그램 사용 가능
3. 로컬 웹 서버 사용 가능

## 브라우저 지원
- Chrome (권장)
- Firefox
- Safari
- Edge

## 참고사항
- Web Speech API는 브라우저 지원이 필요합니다
- 인터넷 연결이 필요합니다 (API 호출)
- API 연결 실패 시에도 기본 단어 목록으로 학습 가능
- 모바일 환경에서도 최적화되어 있습니다

## 기본 단어 목록
API 연결 실패 시 제공되는 20개의 기본 단어:
- apple (사과)
- banana (바나나)
- computer (컴퓨터)
- dictionary (사전)
- elephant (코끼리)
- flower (꽃)
- garden (정원)
- house (집)
- internet (인터넷)
- jacket (자켓)
- kangaroo (캥거루)
- language (언어)
- mountain (산)
- notebook (노트북)
- orange (오렌지)
- pencil (연필)
- question (질문)
- rainbow (무지개)
- sunshine (햇빛)
- telephone (전화) 