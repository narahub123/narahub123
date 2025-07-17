import { useContext } from "react";
import { ThemeContext } from "../contexts";

const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("");

  return context;
};

export default useThemeContext;
