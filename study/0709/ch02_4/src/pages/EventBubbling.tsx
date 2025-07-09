import { SyntheticEvent } from "react";

const EventBubbling = () => {
  const onDivClick = (e: SyntheticEvent) => {
    const { isTrusted, target, bubbles, currentTarget } = e;

    console.log(
      "click event bubbles on <div>",
      isTrusted,
      target,
      bubbles,
      currentTarget
    );
  };

  const onButtonClick = (e: SyntheticEvent) => {
    const { isTrusted, target, bubbles } = e;

    console.log("click event bubbles on <button>", isTrusted, target, bubbles);
  };
  return (
    <div onClick={onDivClick}>
      <p>EventBubbling</p>
      <button onClick={onButtonClick}>Click Button</button>
    </div>
  );
};

export default EventBubbling;
