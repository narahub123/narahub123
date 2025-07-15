# 🖱️ React Drag & Drop Image Uploader

드래그 앤 드롭으로 이미지를 업로드하고, 미리보기를 제공하는 **React 기반 이미지 업로더**입니다.  
추가 라이브러리 없이 **HTML5 Drag & Drop API**와 **React**만으로 구현되었습니다.

---

## 📦 주요 기능

- ✅ 드래그 앤 드롭으로 이미지 업로드
- ✅ 클릭하여 파일 선택 가능
- ✅ 허용 확장자 및 MIME 타입 필터링
- ✅ 최대 업로드 개수 제한
- ✅ 파일 용량 제한 (MB 단위)
- ✅ 잘못된 파일에 대한 경고 메시지 표시
- ✅ 업로드된 이미지 미리보기

---

## 🗂️ 폴더 구조

<pre>
components/
├── DropBox.tsx            // 드래그 앤 드롭 영역 + 유효성 검사
├── ImagePreviewGrid.tsx   // 이미지 미리보기 그리드
├── InvalidMessage.tsx     // 잘못된 입력 메시지 출력
DragAndDrop.tsx             // 상위 컨테이너 컴포넌트
types.ts                    // 타입 정의
</pre>

---

## 🛠️ 사용 기술

- React
- HTML5 Drag & Drop API
- FileReader API

---

## 💻 사용 예시

<pre>
<code>
// App.tsx 예시
import { DragAndDrop } from "./DragAndDrop";

function App() {
  return (
    &lt;div className="p-4"&gt;
      &lt;DragAndDrop /&gt;
    &lt;/div&gt;
  );
}

export default App;
</code>
</pre>

---

## ⚙️ DropBox 주요 Props

| Prop      | Type                                    | 기본값      | 설명                          |
| --------- | --------------------------------------- | ----------- | ----------------------------- |
| images    | `ImageType[]`                           | —           | 업로드된 이미지 배열          |
| setImages | `Dispatch<SetStateAction<ImageType[]>>` | —           | 이미지 상태 변경 함수         |
| quantity  | `number`                                | `4`         | 업로드 가능한 최대 개수       |
| accept    | `string`                                | `"image/*"` | 허용되는 MIME 타입/확장자     |
| size      | `number`                                | `5`         | 최대 허용 파일 크기 (MB 단위) |

---

## 🖼️ 미리보기 기능

업로드된 이미지는 `ImagePreviewGrid`를 통해  
**2열 그리드 형태**로 화면에 미리보기가 표시됩니다.

---

## ❗ 유효성 메시지 처리

- 파일 개수 초과, 허용되지 않는 확장자, 용량 초과 시 경고 메시지 표시
- 메시지는 **1.5초 후 자동으로 사라짐**

---

## 🎨 기타 기능

- `getRandomColor`를 사용해 랜덤 배경색 설정
- `useResponsiveSize` 훅을 활용해 반응형 크기 지원

---

## 🖥️ 예시 이미지
드래그 앤 드롭을 했을 때 미리보기 구현 
![Image](https://github.com/user-attachments/assets/c1d05cfc-c4ab-4b44-85be-e0fa39b1224f)

파일 개수가 정해진 개수를 초과한 경우 메시지 
![Image](https://github.com/user-attachments/assets/02479081-d85e-4827-87fb-9e5731b00db1)

파일 형식에 맞지 않을 때의 메시지
![Image](https://github.com/user-attachments/assets/bbc04d53-4491-4692-a5cf-ceb717ef59ea)

파일 크기가 정해진 크기보다 큰 경우의 메시지
![Image](https://github.com/user-attachments/assets/c008efcf-38fc-4255-afee-f1b8db803fdd)
---
