import i18n from "i18next";
import ICU from "i18next-icu";
import Backend, { type HttpBackendOptions } from "i18next-http-backend";
import LngDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { GLOBAL_ENV } from "@/constants/index";

i18n
  .use(ICU)
  .use(Backend)
  .use(LngDetector)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    debug: true,
    fallbackLng: ["en", "fr"],
    detection: {
      caches: ['localStorage', 'cookie'],
    },
    backend: {
      loadPath: GLOBAL_ENV.DEV
        ? "public/locales/{{lng}}/{{ns}}.json"
        : "locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
