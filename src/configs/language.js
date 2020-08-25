import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const DEFAULT_LANGUAGE = "en-US";
export const LANGUAGES = ["en-US", "pt-BR"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    fallbackNS: "translation",

    load: "languageOnly",
    cleanCode: true,

    interpolation: {
      escapeValue: false
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      checkWhitelist: true
    },

    react: {
      wait: true
    }
  });

export default i18n;
