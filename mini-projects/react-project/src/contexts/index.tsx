import { createContext, ReactNode } from "react";
import { IDashboard } from "../types";

export const DashboardContext = createContext<IDashboard | null>(null);

type DashboardProviderProps = {
  children: ReactNode;
  value: IDashboard;
};

export const DashboardProvider = ({
  children,
  value,
}: DashboardProviderProps) => {
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
