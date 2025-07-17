import { useContext } from "react";
import { useThemeContext } from "../hooks";
// import { ThemeContext } from "../contexts";

// 4. Header 컴포넌트
const Header = () => {
  //   const context = useContext(ThemeContext);
  //   if (!context) throw new Error("ThemeContext not found");
  //   const { theme, toggleTheme } = context;

  const { theme, toggleTheme } = useThemeContext();

  return (
    <header
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
        padding: "1rem",
      }}
      className="w-full space-y-4"
    >
      <h1 className="text-3xl font-bold text-center">내 웹사이트</h1>
      <div className="flex justify-center w-full">
        <button
          onClick={toggleTheme}
          className="p-2 text-white bg-green-400 rounded"
        >
          {theme === "light" ? "다크 모드" : "라이트 모드"}
        </button>
      </div>
    </header>
  );
};

export default Header;
