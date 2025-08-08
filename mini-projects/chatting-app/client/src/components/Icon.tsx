import { FC } from "react";

export type IconProps = {
  name: string;
  style?: React.CSSProperties;
  className?: string;
};

const Icon: FC<IconProps> = ({ name, style, className }) => {
  return (
    <span className={`material-icons ${className}`} style={style}>
      {name}
    </span>
  );
};

export default Icon;
