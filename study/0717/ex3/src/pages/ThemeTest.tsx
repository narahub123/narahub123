import React from "react";
import { LanguageProvider, ThemeProvider } from "../contexts";
import { Content, Header } from "../components";
import { useThemeContext } from "../hooks";

const ThemeTest = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div>
          <h2>테마 테스트</h2>
          <Header />
          <Content />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default ThemeTest;
