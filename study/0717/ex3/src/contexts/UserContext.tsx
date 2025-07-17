import {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";

export type UserType = {
  name: string;
  age: number;
};

type IUserContext = {
  user: UserType;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
};

export const UserContext = createContext<IUserContext | null>(null);

type UserContextProviderProps = {
  children: ReactNode;
  value: IUserContext;
};

export const UserContextProvider = ({
  children,
  value,
}: UserContextProviderProps) => {
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
