import { useState } from "react";
import Button from "./Button";
import { useHandleClick } from "../hooks";

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useHandleClick(setCount);

  return (
    <div>
      <p>Count : {count}</p>
      <Button onClick={handleClick} label="increment" />
    </div>
  );
};

export default Parent;
