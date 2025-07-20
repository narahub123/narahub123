import { useContext } from "react";
import { DashboardContext } from "../contexts";

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("Dashboard안에 사용해 주세요.");
  }

  return context;
};
