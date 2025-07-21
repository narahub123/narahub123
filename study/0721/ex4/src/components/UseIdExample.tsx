import { useId, useState } from "react";

const UseIdExample = () => {
  const [name, setName] = useState("");

  const id = useId();

  return (
    <div className="space-x-4">
      <label htmlFor={id}>이름 : </label>
      <span>{id}</span>
      <input
        type="text"
        id={id}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border"
      />
    </div>
  );
};

export default UseIdExample;
