 import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import zh from "./locales/zh/translation.json";
import en from "./locales/en/translation.json"


import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)      
  .use(initReactI18next)    
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
    },
    fallbackLng: "en",        
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator", "localStorage", "cookie", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"], 
    },
  });

export default i18n;