import type { FC, HTMLAttributes } from "react";

import { Icon } from "./Icon";

export type ModalProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
};
export const Modal: FC<ModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = [
    "modal",
    open ? "modal-open" : "",
    "select-none",
    _className,
  ].join(" ");
  return <div {...props} className={className} />;
};

export type ModalContentProps = HTMLAttributes<HTMLDivElement> & {
  onCloseIconClicked?: () => void;
  closeIconClassName?: string;
};

export const ModalContent: FC<ModalContentProps> = ({
  onCloseIconClicked,
  closeIconClassName: _closeIconClassName,
  className: _className,
  children,
  ...props
}) => {
  const showCloseIcon = onCloseIconClicked ? true : false;
  const className = ["modal-box", showCloseIcon && "relative", _className].join(
    " "
  );
  if (!showCloseIcon)
    return <div {...props} className={className} children={children} />;

  const closeIconClassName =
    _closeIconClassName ??
    "btn text-lg btn-sm bg-transparent border-none hover:bg-gray-100";
  return (
    <div {...props} className={className}>
      <div className="absolute" style={{ right: "0.5rem", top: "0.5rem" }}>
        <Icon
          name="close"
          className={closeIconClassName}
          onClick={onCloseIconClicked}
        />
      </div>
      {children}
    </div>
  );
};

export type ModalActionProps = HTMLAttributes<HTMLDivElement> & {};
export const ModalAction: FC<ModalActionProps> = ({
  className: _className,
  ...props
}) => {
  const className = ["modal-action", _className].join(" ");
  return <div {...props} className={className} />;
};
