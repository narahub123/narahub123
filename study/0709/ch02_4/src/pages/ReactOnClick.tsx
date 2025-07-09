import { SyntheticEvent } from "react";

const ReactOnClick = () => {
  const onClick = (e: SyntheticEvent) => {
    const { isTrusted, target, bubbles } = e;

    console.log("mouse click occurs on <button>", isTrusted, target, bubbles);
  };
  return (
    <div>
      <p>ReactOnClick</p>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
};

export default ReactOnClick;
