import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

export type LoggedUser = { email: string; password: string };

type Callback = () => void;

type ContextType = {
  loggedUser?: LoggedUser;
  signup: (email: string, password: string, callback?: Callback) => void;
  login: (email: string, password: string, callback?: Callback) => void;
  logout: (callback?: Callback) => void;
};

export const AuthContext = createContext<ContextType>({
  signup: (email: string, password: string, callback?: Callback) => {},
  login: (email: string, password: string, callback?: Callback) => {},
  logout: (callback?: Callback) => {},
});

type AuthProviderProps = {};

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<LoggedUser | undefined>(
    undefined
  );

  const signup = useCallback(
    (email: string, password: string, callback?: Callback) => {
      setLoggedUser((notUsed) => ({ email, password }));

      callback && callback();
    },
    []
  );

  const login = useCallback(
    (email: string, password: string, callback?: Callback) => {
      setLoggedUser((notUsed) => ({ email, password }));

      callback && callback();
    },
    []
  );

  const logout = useCallback((callback?: Callback) => {
    setLoggedUser(undefined);
    callback && callback();
  }, []);

  const value = {
    loggedUser,
    signup,
    login,
    logout,
  };
  return <AuthContext value={value}>{children}</AuthContext>;
};
