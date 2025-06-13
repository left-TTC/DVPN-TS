import i18next from "i18next";
import en from "@/locales/en/translation.json";
import zh from "@/locales/zh/translation.json";
import es from "@/locales/es/translation.json";
import ru from "@/locales/ru/translation.json";
import ar from "@/locales/ar/translation.json";

export const createLocalI18n = async (lang: string) => {
  const instance = i18next.createInstance();
  await instance.init({
    lng: lang,
    fallbackLng: "en",
    debug: false,
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      es: { translation: es },
      ru: { translation: ru },
      ar: { translation: ar },
    },
  });
  return instance;
};