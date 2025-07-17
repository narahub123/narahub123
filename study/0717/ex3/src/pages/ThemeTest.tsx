import React from "react";
import { ThemeProvider } from "../contexts";
import { Content, Header } from "../components";
import { useThemeContext } from "../hooks";

const ThemeTest = () => {
  return (
    <ThemeProvider>
      <div>
        <h2>테마 테스트</h2>
        <Header />
        <Content />
      </div>
    </ThemeProvider>
  );
};

export default ThemeTest;
