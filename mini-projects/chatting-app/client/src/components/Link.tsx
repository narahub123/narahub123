import { FC } from "react";

type LinkProps = {
  text: string;
  onClick: () => void;
  className?: string;
};

const Link: FC<LinkProps> = ({ text, onClick, className: _className }) => {
  const className = `text-blue-300 hover:underline select-none ${_className}`;

  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

export default Link;
