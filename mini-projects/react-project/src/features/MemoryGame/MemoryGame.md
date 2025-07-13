# 🧠 Memory Game (with 3D Flip)

자바스크립트의 `rotateY`를 활용한 **3D 카드 뒤집기 효과**를 중심으로 구현한 메모리 게임입니다.  
게임의 난이도는 레벨을 통해 조정되며, 각 레벨마다 다른 수의 카드 쌍을 매칭해야 합니다.

> 📦 이 프로젝트는 풀스택 학습 과정 중 **개별 기능(3D 회전 등)의 구현 실험**을 위한 **스몰 프로젝트**이며,  
> 전체 스몰 프로젝트를 `Masonry Layout` 페이지에 모아 시각적으로 구성하는 형태로 사용됩니다.

---

## ✨ 주요 기능

- ✅ `3D rotateY`를 활용한 카드 뒤집기 효과
- ✅ 난이도(레벨) 선택 기능
- ✅ 선택된 레벨에 따라 카드 수 동적 생성
- ✅ 뒤집힌 카드 2장이 일치하는지 판별
- ✅ 일치 시 유지 / 불일치 시 다시 닫힘
- ✅ 모든 쌍을 맞추면 다음 레벨 자동 진입
- ✅ 완료한 레벨은 선택 불가 및 `- completed` 표시
- ✅ 반응형 카드 크기 및 폰트 크기 조절

---

## 🧩 사용 기술

- **React** (with TypeScript)
- **Tailwind CSS**
- `rotateY`, `transform-style: preserve-3d` 등 CSS 3D Transform
- 상태 관리: `useState`, `useEffect`, `커스텀 훅`

---

## 🗂️ 폴더 구조

MemoryGame/
├── components/
│ ├── FlipCard.tsx
│ ├── GameBoard.tsx
│ ├── GameControls.tsx
│ ├── LevelSelector.tsx

│ ├── RemainingPairs.tsx
│ └── StartButton.tsx
├── constants/
├── data/
│ └── cardIcons.ts
├── hooks/
│ └── useCardFontSize.ts
├── types/
├── utils/
│ └── cardUtils.ts (카드 생성 로직)
└── MemoryGame.tsx

---

## 🕹️ 게임 규칙

1. 게임 시작 전, 원하는 **레벨**을 선택합니다.
2. 카드가 나타나면 **두 장씩 클릭하여** 같은 그림을 찾습니다.
3. 두 카드의 그림이 **일치하면 유지**, **불일치하면 다시 뒤집힘**.
4. 모든 쌍을 맞추면 해당 레벨은 완료되며, **다음 레벨로 자동 진입**합니다.
5. 완료된 레벨은 다시 선택할 수 없습니다.

---

## 🛠 개발 중 포인트

- 카드 상태 관리를 위해 `openCards`, `remainingPairs`, `completedLevels` 등을 상태로 분리
- 카드 클릭 제한, 중복 클릭 방지, 게임 진행 제한 등의 제어 로직 포함
- flipCard, shuffle, generateCards 등의 유틸 함수 분리
- 카드 폰트 크기를 카드 수에 따라 자동 조절 (반응형 디자인)
- 컴포넌트 역할 분리: `GameControls`, `GameBoard`, `FlipCard`, `StartButton` 등

---

## 💡 향후 개선 사항

- 애니메이션 향상 (카드 뒤집기 시 easing 추가 등)
- 매칭 성공 시 간단한 효과(사운드/색상 변화 등)
- 레벨 별 테마 도입
- 리셋 기능 및 완료 후 리포트 페이지

---
