import "./App.css";
import { useState } from "react";

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  return (
    <main>
      <div>
        <h2>{"뎃셈기"}</h2>
        <div className="flex flex-row items-center">
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(parseInt(e.target.value))}
            className="w-[100px] text-center"
          />
          <span>{"+"}</span>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(parseInt(e.target.value))}
            className="w-[100px] text-center"
          />
        </div>

        <p>{`덧셈 결과는 : ${num1} + ${num2} = ${num1 + num2}`}</p>
      </div>
    </main>
  );
}

export default App;
