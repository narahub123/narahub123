import { FC } from "react";

type LinkProps = {
  text: string;
  onClick: () => void;
};

const Link: FC<LinkProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="text-blue-300 hover:underline">
      {text}
    </button>
  );
};

export default Link;
