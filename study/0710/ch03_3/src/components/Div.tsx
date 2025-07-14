import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { WidthHeight } from "./WidthHeight";

export type ReactDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type DivProps = ReactDivProps & WidthHeight;

export const Div: FC<DivProps> = ({
  width,
  height,
  style: _style,
  ...props
}) => {
  const style = { ..._style, width, height };
  return <div {...props} style={style} />;
};
