import React, { createContext, ReactNode, useState } from "react";

type Language = "ko" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

type LanguageProviderProps = {
  children: ReactNode;
};

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("ko");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
