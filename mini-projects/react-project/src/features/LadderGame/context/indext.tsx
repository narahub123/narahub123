import { createContext, ReactNode } from "react";
import { LadderGameContextType } from "../types";

export const LadderGameContext = createContext<LadderGameContextType | null>(
  null
);

type LadderGameProviderProps = {
  children: ReactNode;
  value: LadderGameContextType;
};

export const LadderGameProvider = ({
  children,
  value,
}: LadderGameProviderProps) => {
  return (
    <LadderGameContext.Provider value={value}>
      {children}
    </LadderGameContext.Provider>
  );
};
