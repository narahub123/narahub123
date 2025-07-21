import { useState } from "react";
import { UseIdExample, UseLayoutEffectExample } from "../components";

const HookTest = () => {
  const [color, setColor] = useState("yellow");

  const handleColor = () => {
    if (color === "yellow") setColor("red");
    else setColor("yellow");
  };

  return (
    <div>
      <h2>useLayoutEffect 예제</h2>
      <UseLayoutEffectExample color={color} />
      <button onClick={handleColor}>색상 변경</button>
      <UseIdExample />
    </div>
  );
};

export default HookTest;
