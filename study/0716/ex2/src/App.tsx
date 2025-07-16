// import "./App.css";
// import { GreetingPage } from "./pages";
// import { ProductListPage } from "./pages";

import { useState } from "react";
import { ApplyScrapPage, QuotationPage, ScrapCompletePage } from "./pages";

function App() {
  const [stage, setStage] = useState(1);

  const prevStage = () => {
    const prev = stage - 1;

    if (prev < 0) {
      setStage(2);
      return;
    }
    setStage(stage - 1);
  };

  const nextStage = () => {
    const next = stage + 1;

    if (next > 2) {
      setStage(0);
      return;
    }
    setStage(stage + 1);
  };

  const stageName = {
    0: "폐차 신청",
    1: "폐차 신청",
    2: "폐차 견적서",
  }[stage];
  // return <GreetingPage />;
  // return <ProductListPage />;
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const stage = Number(e.target.value);

  //   setStage(stage);
  // };
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen">
      {/* <div className="flex justify-center w-full mt-4 ">
        <div className="flex justify-center gap-4 p-4 border-2 ">
          <label htmlFor="stage">단계</label>
          <input
            type="number"
            name="stage"
            id="stage"
            onChange={handleChange}
            min={0}
            max={2}
            value={stage}
          />
        </div>
      </div> */}
      <div>
        <button className="p-4 m-4 bg-blue-500" onClick={prevStage}>
          이전
        </button>
        <button className="p-4 m-4 bg-blue-500" onClick={nextStage}>
          다음
        </button>
      </div>
      <div className="space-x-4">
        <span>현재 스테이지</span>
        <span>{stageName}</span>
      </div>
      <div className="flex items-center justify-center w-full h-full">
        {stage === 0 && <ApplyScrapPage />}
        {stage === 1 && <QuotationPage />}
        {stage === 2 && <ScrapCompletePage />}
        {/* {stage === 0 ? (
          <ApplyScrapPage />
        ) : stage === 1 ? (
          <QuotationPage />
        ) : stage === 2 ? (
          <ScrapCompletePage />
        ) : (
          <div></div>
        )} */}
      </div>
    </div>
  );
}

export default App;
