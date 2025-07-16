// import "./App.css";
// import { GreetingPage } from "./pages";
// import { ProductListPage } from "./pages";

import { useState } from "react";
import { ApplyScrapPage, QuotationPage, ScrapCompletePage } from "./pages";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [dark, setDark] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState({ name: "", age: 0 });
  const [tab, setTab] = useState<"home" | "about" | "contact">("home");
  const [num, setNum] = useState(0);

  const countUp = () => {
    setCount(count + 1);
  };

  const countDown = () => {
    setCount(count - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <div>
        <button className="p-4 m-4 bg-blue-500" onClick={countUp}>
          카운트 증가
        </button>
        <span>{count}</span>
        <button className="p-4 m-4 bg-blue-500" onClick={countDown}>
          카운트 증가
        </button>
      </div>
      <div>
        <input
          type="text"
          onChange={handleChange}
          value={name}
          className="border-2"
        />
      </div>
      <div>
        <button
          onClick={() => {
            setDark(!dark);
          }}
        >
          테마 : {dark ? "밝은 모드" : "다크 모드"}
        </button>
      </div>
      <div>
        <input
          type="text"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              setItems([...items, e.currentTarget.value]);
            }
          }}
        />
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="checkbox"
          name=""
          id=""
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label>{checked ? "체크됨" : "체크 안됨"}</label>
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="number"
          onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
        />
        <p>
          {user.name} {user.age}
        </p>
      </div>
      <div>
        <button onClick={() => setTab("home")}>홈</button>
        <button onClick={() => setTab("about")}>소개</button>
        <button onClick={() => setTab("contact")}>연락처</button>
        <div>현재 탭 : {tab}</div>
      </div>
      <div>
        <button onClick={() => setNum(Math.floor(Math.random() * 10))}>
          난수 발생기
        </button>
        <p>숫자 : {num}</p>
      </div>
      <div>
        <button onClick={() => setCount(0)}>초기화</button>
      </div>
    </div>
  );
}

// function App() {
//   const [stage, setStage] = useState(1);

//   const prevStage = () => {
//     const prev = stage - 1;

//     if (prev < 0) {
//       setStage(2);
//       return;
//     }
//     setStage(stage - 1);
//   };

//   const nextStage = () => {
//     const next = stage + 1;

//     if (next > 2) {
//       setStage(0);
//       return;
//     }
//     setStage(stage + 1);
//   };

//   const stageName = {
//     0: "폐차 신청",
//     1: "폐차 신청",
//     2: "폐차 견적서",
//   }[stage];
//   // return <GreetingPage />;
//   // return <ProductListPage />;
//   // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const stage = Number(e.target.value);

//   //   setStage(stage);
//   // };
//   return (
//     <div className="relative flex flex-col items-center justify-center w-screen h-screen">
//       {/* <div className="flex justify-center w-full mt-4 ">
//         <div className="flex justify-center gap-4 p-4 border-2 ">
//           <label htmlFor="stage">단계</label>
//           <input
//             type="number"
//             name="stage"
//             id="stage"
//             onChange={handleChange}
//             min={0}
//             max={2}
//             value={stage}
//           />
//         </div>
//       </div> */}
//       <div>
//         <button className="p-4 m-4 bg-blue-500" onClick={prevStage}>
//           이전
//         </button>
//         <button className="p-4 m-4 bg-blue-500" onClick={nextStage}>
//           다음
//         </button>
//       </div>
//       <div className="space-x-4">
//         <span>현재 스테이지</span>
//         <span>{stageName}</span>
//       </div>
//       <div className="flex items-center justify-center w-full h-full">
//         {stage === 0 && <ApplyScrapPage />}
//         {stage === 1 && <QuotationPage />}
//         {stage === 2 && <ScrapCompletePage />}
//         {/* {stage === 0 ? (
//           <ApplyScrapPage />
//         ) : stage === 1 ? (
//           <QuotationPage />
//         ) : stage === 2 ? (
//           <ScrapCompletePage />
//         ) : (
//           <div></div>
//         )} */}
//       </div>
//     </div>
//   );
// }

export default App;
