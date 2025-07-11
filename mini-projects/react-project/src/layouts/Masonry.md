# 🧱 Masonry 컴포넌트 구현 문서

## 📌 목적

`Masonry` 컴포넌트는 **Pinterest 스타일의 유동적인 카드 레이아웃**을 Tailwind CSS 기반으로 구현하기 위한 컴포넌트입니다.  
카드들의 높이가 다를 수 있으며, 화면 너비에 따라 컬럼 수가 반응형으로 변화합니다.

---

## ✅ 구현 목표

- 화면 너비에 따라 반응형 컬럼 수 조절
- 각 카드의 콘텐츠에 따라 **서로 다른 높이** 적용
- Tailwind CSS만을 활용한 `pseudo-Masonry` 방식
- 퍼포먼스를 위해 외부 라이브러리 없이 구현

---

## 📋 구현 체크리스트

- [x] **Masonry 컴포넌트 전체가 가로/세로로 화면에 꽉 차도록 구현**
- [x] **반응형 레이아웃**
  - 브라우저 너비에 따라 `grid-cols` 유틸리티로 컬럼 수 변경
- [x] **기본 grid 레이아웃 적용**
  - `display: grid`, `gap-*`, `grid-cols-*` 사용
- [x] **다양한 카드 높이 표현**
  - `grid-auto-rows`로 기본 row 단위 높이 설정
  - 카드 내부에서 `row-span-*` 또는 `grid-row-end`로 높이 지정
- [ ] **카드 콘텐츠에 따라 자동 row-span 계산 기능 (추후 구현)**  
  → 카드 렌더링 후 `offsetHeight`를 기준으로 `row-span`을 계산

---

## 🛠️ 구현 기술

| 기술 요소          | 설명                                                                 |
|-------------------|----------------------------------------------------------------------|
| **Tailwind CSS**   | 레이아웃 구현 전반 (`grid`, `auto-rows`, `row-span`, `columns`)        |
| **CSS Grid**       | 반응형 레이아웃 구조화 (`grid-cols`, `gap`, `auto-rows`)               |
| **grid-auto-rows** | grid row의 기본 높이 설정 → `row-span`과 곱해서 최종 높이 결정         |
| **row-span-*`**    | 카드별로 높이를 조절하기 위해 사용 (`row-span-10`, `row-span-15` 등)    |
| (추후) JS 측정     | 카드의 실제 높이를 계산하여 `row-span` 자동 적용 예정 (`offsetHeight`) |


