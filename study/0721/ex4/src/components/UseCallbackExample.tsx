import { useState } from "react";
import Child from "./Child";
import { useHandleCount } from "../hooks";

const UseCallbackExample = () => {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(false);

  const handleClick = useHandleCount(setCount);

  return (
    <div className="flex flex-col p-5 m-4 space-y-4 border-2 border-blue-400">
      <h2>useCallback 예제 2</h2>
      <p>Count: {count}</p>
      <div className="space-x-4">
        <button onClick={() => setOther(!other)} className="btn btn-primary">
          Toogle: {other.toString()}
        </button>
        <Child onClick={handleClick} />
      </div>
    </div>
  );
};

export default UseCallbackExample;
