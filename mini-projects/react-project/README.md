# 📌 프로젝트명: 반응형 Masonry 프로젝트 갤러리

> 이 프로젝트는 프론트엔드 풀스택 학습 과정 중 Masonry 레이아웃과 다양한 UI 기능을 실습하며 구성한 Small Project 모음입니다.

---

## 📆 프로젝트 기간

- 시작일: 2025.07.11
- 종료일: 2025.08.31 (예정)

---

## 🎯 주요 목표

- ✅ Masonry 레이아웃을 이용한 반응형 웹 페이지 생성
- ✅ 수업 중 배웠던 내용을 기반으로 한 스몰 프로젝트 구성
- ✅ 각 프로젝트별 동작 방식, 레이아웃, 상태 관리 방식 학습
- ✅ 다양한 브라우저 및 해상도 대응을 위한 반응형 UI 구현

---

## ⚙️ 사용 기술 스택

| 분류       | 기술명                                      |
| ---------- | ------------------------------------------- |
| 프론트엔드 | HTML, CSS, JavaScript, TypeScript, React 등 |
| 백엔드     | Node.js, Express, AWS Lambda 등             |
| 기타       | Git, GitHub, Postman, Vercel 등             |

---

## 🧱 프로젝트 구조

    📁 react-project/
    ├── index.html               # 루트 HTML 템플릿 (public 폴더 내)
    ├── App.tsx                  # 앱 진입 컴포넌트
    ├── components/              # 재사용 가능한 UI 컴포넌트들
    ├── data/                    # 정적 데이터 및 mock 데이터 등
    ├── features/                # 기능 단위의 독립적인 모듈/도메인 컴포넌트
    ├── layouts/                 # 페이지 레이아웃 컴포넌트
    ├── pages/                   # 라우팅되는 실제 페이지 컴포넌트
    ├── router/                  # React Router 설정 파일
    ├── types/                   # 전역 타입 정의(TypeScript)
    ├── utils/                   # 유틸 함수들
    ├── index.css                # 전역 스타일
    ├── index.tsx                # 앱 렌더링 시작점
    ├── react-app-env.d.ts       # 타입스크립트 환경 설정
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── README.md

---

## 💡 주요 기능 설명

### ✨ 기능 1: 3D rotate을 이용한 메모리 게임

- `preserve-3d`, `backface-visibility` 속성을 이용한 카드 회전 애니메이션 구현

- [메모리 게임 설명 보러가기](./src/features/MemoryGame/MemoryGame.md)

### 🧮 기능 2: 자바스크립트 함수 및 정규 표현식을 이용한 계산기

- 자바스크립트 이벤트 및 함수 기반의 연산 입력 처리
- 정규 표현식을 이용한 연산자 및 피연산자 분리

### 🖼️ 기능 3: Drag & Drop 방식의 사진 업로드(예정)

- `drag` 이벤트를 활용한 외부 이미지 업로드
- Cloudinary API 연동을 통한 이미지 업로드 기능 실습

### 🪜 기능 4: BFS / DFS를 이용한 사다리 타기(예정)

- DFS/BFS를 이용한 경로 탐색 로직 구현
- `border` 또는 `canvas`를 활용한 시각적 사다리 구현

---

## 🖼️ 데모 화면

| 주요 화면   | 캡처 예시                                                                                       |
| ----------- | ----------------------------------------------------------------------------------------------- |
| 대시보드    | ![dashboard](https://github.com/user-attachments/assets/7dc0be3b-4172-495d-8b8f-a0565b7ba4ca)   |
| 메모리 게임 | ![memory-game](https://github.com/user-attachments/assets/6b401a51-5e9b-40da-a882-5d489da03057) |

---

## 🧠 회고 요약

- **어려웠던 점**

  - 모션 적용 및 렌더링 흐름을 이해하는 데 시간이 걸림

- **배운 점**

  - `requestAnimationFrame`을 활용한 렌더링 흐름 제어
  - 컴포넌트 상태와 애니메이션의 결합 방식에 대한 이해

- **개선하고 싶은 점**
  - UI 디자인을 더 일관성 있게 구성
  - Masonry 카드의 크기 자동 조절 로직 개선

---

## 📦 배포 주소

- 👉 [프로젝트 바로가기](https://narahub123.github.io/narahub123/)

---

## 🙋‍♀️ 개발자

| 이름   | GitHub                                                         |
| ------ | -------------------------------------------------------------- |
| 박나라 | [https://github.com/narahub123](https://github.com/narahub123) |
