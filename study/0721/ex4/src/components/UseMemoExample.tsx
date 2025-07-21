import { useState } from "react";
import { useExpensiveResult } from "../hooks";

export default function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(false);

  const expensiveResult = useExpensiveResult(count);

  return (
    <div className="p-5">
      <h2>useMemo 예제</h2>
      <p>Count: {count}</p>
      <div className="space-x-4">
        <button onClick={() => setCount(count + 1)} className="btn btn-primary">
          +1 증가
        </button>
        <button onClick={() => setCount(count)} className="btn btn-primary">
          +0 증가
        </button>
        <button onClick={() => setOther((t) => !t)} className="btn btn-info">
          Toggle : {other.toString()}
        </button>
      </div>

      <p>계산 결과 : {expensiveResult.toFixed(2)}</p>
      <span className="material-icons">app_badging</span>
    </div>
  );
}
