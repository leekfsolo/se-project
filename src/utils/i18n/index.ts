import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Config from "../../configuration";
import { LocaleCode } from "../../configuration/enum";
import translationEN from "./locales/en.json";
import translationVIE from "./locales/vi.json";

const resources = {
  [LocaleCode.ENG]: {
    translation: translationEN,
  },
  [LocaleCode.VIE]: {
    translation: translationVIE,
  },
};

let lang = localStorage.getItem(Config.storageKey.locale);
if (!lang) lang = LocaleCode.VIE;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang,
    keySeparator: false,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
