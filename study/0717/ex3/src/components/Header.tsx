import { useContext } from "react";
import { useThemeContext } from "../hooks";
import { LanguageContext } from "../contexts";
import { languageData } from "../data";
// import { ThemeContext } from "../contexts";

// 4. Header 컴포넌트
const Header = () => {
  //   const context = useContext(ThemeContext);
  //   if (!context) throw new Error("ThemeContext not found");
  //   const { theme, toggleTheme } = context;

  const { theme, toggleTheme } = useThemeContext();
  const context = useContext(LanguageContext);

  if (!context) throw new Error("LanguageProvider 설치 좀 해라");

  const { language, setLanguage } = context;

  return (
    <header
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
        padding: "1rem",
      }}
      className="w-full space-y-4"
    >
      <h1 className="text-3xl font-bold text-center">
        {languageData[language].title}
      </h1>
      <div className="flex justify-center w-full space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-white bg-green-400 rounded"
        >
          {languageData[language][theme]}
        </button>
        <button
          onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
          className="p-2 text-white bg-green-400 rounded"
        >
          {languageData[language].lang}
        </button>
      </div>
    </header>
  );
};

export default Header;
