# FlipCard 컴포넌트 및 카드 뒤집기 핸들러

## FlipCard 컴포넌트

### 설명

`FlipCard`는 메모리 게임에서 사용되는 카드 컴포넌트로, 앞면(번호)과 뒷면(아이콘)을 3D 회전 효과로 뒤집어 보여줍니다.  
카드 클릭 시 뒤집히며, 뒤집힌 상태에 따라 스타일과 동작이 달라집니다.

![FlipCard](https://github.com/user-attachments/assets/e56e8ab2-c6ed-4b34-8db6-7c18a6f9ac26)

### 주요 기능

- 카드의 앞면과 뒷면을 3D 회전(rotateY)으로 뒤집는 효과
- 클릭 이벤트를 받아 부모 컴포넌트에 전달
- 카드 크기와 폰트 크기는 레벨에 따라 동적으로 조절
- 접근성 향상을 위해 `aria-pressed` 속성 사용

### Props

| 이름      | 타입                        | 설명                                         |
| --------- | --------------------------- | -------------------------------------------- |
| `card`    | `IFlipCard`                 | 카드 정보 객체 (index, icon, isFlipped 포함) |
| `level`   | `number`                    | 게임 레벨 (카드 크기 조절 용도)              |
| `onClick` | `(card: IFlipCard) => void` | 카드 클릭 시 호출되는 함수                   |

## 카드 뒤집기 핸들러: handleFlipCard

### 설명

게임 상태에서 특정 카드를 뒤집는 동작을 처리하는 함수입니다.
클릭한 카드가 아직 뒤집히지 않은 경우에만 isFlipped 상태를 true로 변경합니다.

### 참고 사항

- card.index를 통해 식별하며, 카드 배열 내 index와 동일해야 합니다.

- 상태 업데이트는 불변성을 유지하며 함수형 업데이트 패턴을 사용합니다.

- 중복 클릭으로 인한 불필요한 상태 변경을 방지합니다.

- 게임 특성상 한 번에 뒤집히는 카드 수 제한 등의 추가 로직과 함께 사용 가능합니다.
