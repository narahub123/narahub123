import { FC } from "react";

export type IconProps = {
  name: string;
  style?: React.CSSProperties;
  className?: string;
  title?: string;
};

const Icon: FC<IconProps> = ({ name, style, className: _className, title }) => {
  const className = `${_className}`;
  return (
    <span className={`material-icons ${className}`} style={style} title={title}>
      {name}
    </span>
  );
};

export default Icon;
