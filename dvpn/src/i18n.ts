import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import en from "./locales/en/translation.json";
import zh from "./locales/zh/translation.json";
import ru from "./locales/ru/translation.json";
import es from "./locales/es/translation.json";
import ar from "./locales/ar/translation.json";


import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)      
    .use(initReactI18next)    
    .init({
        resources: {
            en: { translation: en },
            zh: { translation: zh },
            ru: { translation: ru },
            es: { translation: es },
            ar: { translation: ar },
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