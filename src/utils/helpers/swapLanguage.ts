import Config from "../../configuration";
import { LocaleCode } from "../../configuration/enum";
import i18n from "../i18n";

export const swapLanguage = (locale: LocaleCode) => {
  localStorage.setItem(Config.storageKey.locale, locale);
  i18n.changeLanguage(locale);
};
