// import "./App.css";
// import { GreetingPage } from "./pages";
// import { ProductListPage } from "./pages";

import { useState } from "react";
import { ApplyScrapPage, QuotationPage } from "./pages";

function App() {
  const [step, setStep] = useState(1);
  // return <GreetingPage />;
  // return <ProductListPage />;
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {step === 0 ? (
        <ApplyScrapPage />
      ) : step === 1 ? (
        <QuotationPage />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
