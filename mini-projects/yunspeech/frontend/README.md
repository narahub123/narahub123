# 📌 윤스피치 상담 가능 시간 기록 및 선택 사이트

> 2025.08.22. 면접 특강 중 윤 소윤 강사님이 필요하다고 언급했던 사이트에 대한 실습입니다.

---

## 📆 프로젝트 기간

- 시작일: 2025.08.22
- 종료일: 2025.08.23

## 🎯 주요 목표

- ✅ 관리자의 유연한 시간 선택
- ✅ 관리자가 제공한 시간 내에서 원하는 상담시간 조정 가능

## ⚙️ 사용 기술 스택

| 분류       | 기술명                                      |
| ---------- | ------------------------------------------- |
| 프론트엔드 | TypeScript, React                           |
| 백엔드     | Firebase Authentication, Firebase Firestore |
| 기타       | GitHub                                      |

## 🧱 프로젝트 구조

📁yunspeech/
└── frontend/
├── node_modules/ # 프로젝트 의존성 모듈
├── public/ # 정적 파일 (HTML, favicon 등)
├── src/ # 소스 코드 디렉토리
│ ├── components/ # 공통 UI 컴포넌트
│ ├── configs/ # 설정 관련 파일 (API 설정 등)
│ ├── constants/ # 상수 정의 (문자열, 숫자 등)
│ ├── data/ # 더미 데이터, JSON 또는 목데이터
│ ├── hooks/ # 커스텀 React 훅
│ ├── pages/ # 페이지 컴포넌트 (라우팅 단위)
│ ├── router/ # 라우팅 관련 설정
│ ├── stores/ # 상태 관리 (예: Zustand, Redux 등)
│ ├── theme/ # 테마, 스타일 관련 설정 (Tailwind 포함 가능)
│ ├── types/ # 타입스크립트 타입 정의
│ ├── utils/ # 유틸 함수 모음
│ ├── index.css # 글로벌 스타일 정의
│ ├── index.tsx # 앱 진입점
│ ├── logo.svg # 로고 파일
│ ├── react-app-env.d.ts # React 환경 타입 정의
│ ├── reportWebVitals.ts # 성능 측정 관련 파일
│ └── setupTests.ts # 테스트 설정 파일
├── .env # 환경 변수 설정 파일
├── .gitignore # Git에서 제외할 파일 목록
├── package.json # 프로젝트 정보 및 스크립트 정의
├── package-lock.json # 패키지 버전 고정
├── postcss.config.js # PostCSS 설정
├── tailwind.config.js # Tailwind CSS 설정
└── README.md # 프로젝트 설명 파일

## 💡 주요 기능 설명

### 기능 1 : 캘린더를 이용한 날짜 선택

### 기능 2 : Input:time을 이용한 날짜 선택

### 기능 3 : Firebase Authentication을 이용한 로그인

### 기능 4 : Firebase Firestore를 이용한 데이터 저장

## 데모 화면

| 주요 화면     | 캡처                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------- |
| 관리자 페이지 | ![admin](https://github.com/user-attachments/assets/b18da900-bed0-47ac-9a83-7197182c8872)     |
| 이용자 페이지 | ![yunspeech](https://github.com/user-attachments/assets/92a58169-2cbc-4430-86e1-f6adee785464) |

## 회고 요약

- **어려웠던 점**
- Firebase Authentication 이용이 처음이라 적용하기 어려웠음
- Firestore의 문법이 기존에 배웠던 문법과 달라서 적응이 어려웠음

## 배포 주소

- <a href="https://narahub123.github.io/narahub123/yunspeech" target="_blank">🚀 프로젝트 바로가기</a>
- <a href="https://narahub123.github.io/narahub123/yunspeech/admin" target="_blank">🚀 관리자 페이지</a>
