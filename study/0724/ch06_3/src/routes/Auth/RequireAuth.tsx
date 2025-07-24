import { FC, PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../contexts";
import { useNavigate } from "react-router-dom";

type RequireAuthProps = {};

export const RequireAuth: FC<PropsWithChildren<RequireAuthProps>> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { loggedUser } = useAuth();

  useEffect(() => {
    if (!loggedUser) navigate(-1);
  }, [loggedUser, navigate]);

  return <>{children}</>; // 허가된 사용자: chilren이 element가 되도록 함
};
