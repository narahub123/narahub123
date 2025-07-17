import { useContext } from "react";
import { LanguageContext, ThemeContext } from "../contexts";
import { languageData } from "../data";

const Content = () => {
  const context = useContext(ThemeContext);
  const context1 = useContext(LanguageContext);

  if (!context || !context1) throw new Error("Provider 설치 확인해랴");

  const { theme } = context;
  const { language } = context1;

  return (
    <main
      style={{
        backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
        color: theme === "light" ? "#333" : "#fff",
        padding: "1rem",
      }}
      className="flex items-center justify-center h-full"
    >
      <p>{`${languageData[language].curTheme} : ${languageData[language][theme]}`}</p>
    </main>
  );
};

export default Content;
