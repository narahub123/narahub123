import React, { FC } from "react";

type ButtonProps = {
  onClick: () => void;
  label: string;
};

const Button: FC<ButtonProps> = React.memo(({ onClick, label }) => {
  console.log(`Rsendering: ${label}`);

  return <button onClick={onClick}>{label}</button>;
});

export default Button;
