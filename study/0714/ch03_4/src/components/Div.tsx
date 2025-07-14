import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { WidthHeight } from "./WidthHeight";
import { MinMaxWidthHeight } from "./MinMaxWidthHeight";
import { LeftRightTopBottom } from "./LeftRightTopBottom";

export type ReactDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type DivProps = ReactDivProps &
  WidthHeight &
  LeftRightTopBottom &
  MinMaxWidthHeight;

export const Div: FC<DivProps> = ({
  width,
  height,
  left,
  right,
  top,
  bottom,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  style: _style,
  ...props
}) => {
  const style = {
    ..._style,
    width,
    height,
    left,
    right,
    top,
    bottom,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
  };

  return <div {...props} style={style} />;
};
