import { useContext } from "react";
import { ThemeContext } from "../contexts";

const Content = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("Provider 설치 확인해랴");

  const { theme } = context;

  return (
    <main
      style={{
        backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
        color: theme === "light" ? "#333" : "#fff",
        padding: "1rem",
      }}
      className="flex items-center justify-center h-full"
    >
      <p>현재 테마 : {theme}</p>
    </main>
  );
};

export default Content;
