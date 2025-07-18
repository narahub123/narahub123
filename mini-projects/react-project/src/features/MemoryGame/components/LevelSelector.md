# LevelSelector 컴포넌트

## 설명

`LevelSelector`는 사용자가 메모리 게임에서 플레이할 난이도(레벨)를 선택할 수 있도록 돕는 드롭다운 컴포넌트입니다.  
완료한 레벨은 선택할 수 없도록 비활성화 처리하고, 완료 상태를 텍스트로 표시합니다.

![LevelSelector](https://github.com/user-attachments/assets/a6c6b896-0e38-4847-9182-c10184eaecf0)

## 주요 기능

- 레벨 선택을 위한 `<select>` UI 제공
- 완료한 레벨은 비활성화(`disabled`) 처리
- 완료한 레벨에 " - completed" 표시
- 초기 안내 문구로 "레벨을 선택해주세요" 표시(선택 불가)

![completed](https://github.com/user-attachments/assets/4b8a1bba-9f97-4e73-9986-203ed4b8cc9e)

## Props

| 이름              | 타입                                                | 설명                                       |
| ----------------- | --------------------------------------------------- | ------------------------------------------ |
| `level`           | `number` \| `""`                                    | 현재 선택된 레벨, 선택 안 됐으면 빈 문자열 |
| `completedLevels` | `number[]`                                          | 사용자가 완료한 레벨 번호들의 배열         |
| `onChange`        | `(e: React.ChangeEvent<HTMLSelectElement>) => void` | 선택 변경 시 호출되는 이벤트 핸들러        |

## 참고 사항

- "레벨을 선택해주세요" 옵션은 disabled로 설정되어 있어 선택할 수 없습니다.

- 완료한 레벨은 선택할 수 없고, 선택 시도 시 UI에서 비활성화되어 표시됩니다.

- 필요에 따라 스타일링을 추가하여 UX를 향상시킬 수 있습니다.
