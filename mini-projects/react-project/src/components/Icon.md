# 🎨 Icon 컴포넌트

## 개요

`Icon` 컴포넌트는 Google Material Icons 폰트를 활용하여 텍스트 기반 아이콘을 렌더링하는 React 컴포넌트입니다.  
아이콘 이름은 `MaterialIconName` 타입으로 제한되어 있어, **정해진 아이콘 이름만 사용 가능하며 타입 안정성**을 보장합니다.

---

## ✨ 특징

- `material-icons` 클래스를 사용하여 텍스트 기반 아이콘 표시
- `iconName`은 사전에 정의된 아이콘 이름만 허용
- `className`, `style` 및 기타 HTML 속성(`onClick`, `aria-*` 등) 모두 전달 가능
- Tailwind CSS와 함께 사용하기 용이

---

## 📦 Props

| 이름        | 타입                                      | 설명                                           |
| ----------- | ----------------------------------------- | ---------------------------------------------- |
| `iconName`  | `MaterialIconName`                        | 사용할 머티리얼 아이콘 이름 (필수)             |
| `className` | `string`                                  | Tailwind 등의 추가 클래스                      |
| `style`     | `CSSProperties`                           | 인라인 스타일                                  |
| 기타        | `span` 태그가 받을 수 있는 모든 HTML 속성 | `onClick`, `aria-label` 등 추가 속성 전달 가능 |

---

## 🧱 사용 예시

```tsx
import { Icon } from "./Icon";

<Icon iconName="home" />
<Icon iconName="settings" className="text-blue-500" style={{ fontSize: 24 }} />
<Icon iconName="delete" onClick={() => alert("삭제")} aria-label="삭제 버튼" />
```
