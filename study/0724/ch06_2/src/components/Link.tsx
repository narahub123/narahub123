import { FC } from "react";
import type { LinkProps as RRLinkProps } from "react-router-dom";
import { Link as RRLink, useMatch, useResolvedPath } from "react-router-dom";

export type LinkProps = RRLinkProps & {};

export const Link: FC<LinkProps> = ({
  className: _className,
  to,
  ...props
}) => {
  const resolved = useResolvedPath(to);

  console.log("resolved", resolved);

  // pathname과 라우터 경로를 비교하여 같을 때만 유효한 match 결과를 반환함
  const match = useMatch({ path: resolved.pathname, end: true });

  console.log("match", match);

  const className = [_className, match ? "btn-active" : "no-underline"].join(
    " "
  );

  return <RRLink {...props} to={to} className={className}></RRLink>;
};
