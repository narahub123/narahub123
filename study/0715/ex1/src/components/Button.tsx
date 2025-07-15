import { FC, PropsWithChildren } from "react";

export type ReactButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonProps = ReactButtonProps & {};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ ...props }) => {
  return <button {...props} />;
};
