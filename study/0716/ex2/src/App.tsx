// import "./App.css";
// import { GreetingPage } from "./pages";
// import { ProductListPage } from "./pages";

import { useState } from "react";
import { ApplyScrapPage, QuotationPage, ScrapCompletePage } from "./pages";

function App() {
  const [step, setStep] = useState(2);
  // return <GreetingPage />;
  // return <ProductListPage />;
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {step === 0 ? (
        <ApplyScrapPage />
      ) : step === 1 ? (
        <QuotationPage />
      ) : step === 2 ? (
        <ScrapCompletePage />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
