import { FC } from "react";

export type IconProps = {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
};

export const Icon: FC<IconProps> = ({ name, style, className, onClick }) => {
  return (
    <span
      className={`material-icons ${className}`}
      style={style}
      onClick={onClick}
    >
      {name}
    </span>
  );
};
