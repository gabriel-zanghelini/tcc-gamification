import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const DEFAULT_LANGUAGE = "en-US";
export const LANGUAGES = ["en-US", "pt-BR"];
export const EN_DATE_FORMAT = "MM/DD/YYYY";
export const PT_DATE_FORMAT = "DD/MM/YYYY";

export const getDateString = (date) => {
  let day = date.getUTCDate() > 9 ? date.getUTCDate() : "0" + date.getUTCDate();
  let month =
    date.getUTCMonth() > 8
      ? date.getUTCMonth() + 1
      : "0" + (date.getUTCMonth() + 1);
  let year = date.getUTCFullYear();

  if (i18n.language === "pt-BR") {
    return `${day}/${month}/${year}`;
  } else {
    return `${month}/${day}/${year}`;
  }
};

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
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      checkWhitelist: true,
    },

    react: {
      wait: true,
    },
  });

export default i18n;
