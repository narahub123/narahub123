# StartButton 컴포넌트

## 설명

`StartButton` 컴포넌트는 메모리 게임을 시작할 수 있는 버튼입니다.  
버튼은 활성화/비활성화 상태를 지원하며, 클릭 시 게임 시작을 트리거하는 콜백 함수를 호출합니다.

![disabled](https://github.com/user-attachments/assets/d4e07adf-87f6-4065-8534-ad0636812ef1)
![valid](https://github.com/user-attachments/assets/00c9c954-89e6-4178-b31a-72665c6b77cd)

## 주요 기능

- 클릭 이벤트 발생 시 게임 시작 함수 호출
- `disabled` 상태에 따라 활성화/비활성화
- 비활성화 시 시각적 피드백 지원 가능

## Props

| 이름       | 타입         | 설명                            |
| ---------- | ------------ | ------------------------------- |
| `disabled` | `boolean`    | 버튼 활성화 여부 설정           |
| `onClick`  | `() => void` | 버튼 클릭 시 호출되는 콜백 함수 |

## 참고 사항

- disabled가 true일 때 버튼 클릭이 불가능하며, 스타일로 시각적 구분을 하는 것이 좋습니다.

- 필요에 따라 스타일링 클래스나 애니메이션을 추가해 사용자 경험을 향상시킬 수 있습니다.
