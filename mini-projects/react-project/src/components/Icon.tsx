import { CSSProperties, DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { MaterialIconName } from "../types";

type SpanProp = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

type IconProps = SpanProp & {
  iconName: MaterialIconName;
  className?: string;
  style?: CSSProperties;
};

export const Icon: FC<IconProps> = ({
  iconName,
  className: _className,
  style,
  ...props
}) => {
  const className = ["material-icons", _className].join(" ");

  return (
    <span className={className} style={style} {...props}>
      {iconName}
    </span>
  );
};
