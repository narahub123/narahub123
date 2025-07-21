import { useState, useTransition } from "react";
import { useChangeHandler } from "../hooks";

const UseTransitionExample = () => {
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = useChangeHandler(setInput, startTransition, setList);

  return (
    <div>
      <input type="text" value={input} onChange={handleChange} />
      <div>
        {isPending ? <span>로딩...</span> : <span>총 {list.length}개</span>}
      </div>
    </div>
  );
};

export default UseTransitionExample;
