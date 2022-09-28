import { createSlice } from "@reduxjs/toolkit";
import Config from "../configuration";
import { LocaleCode } from "../configuration/enum";

const initGlobal = () => {
  const global = localStorage.getItem(Config.storageKey.locale);
  if (global) {
    return { locale: global, isLoading: false, isDarkTheme: false };
  }
  return {
    isLoading: false,
    isDarkTheme: false,
    locale: LocaleCode.VIE,
  };
};

const global = createSlice({
  name: "global",
  initialState: initGlobal(),
  reducers: {
    handleLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },

    toggleTheme: (state) => {
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme,
      };
    },
    changeLocale: (state, action) => {
      return {
        ...state,
        locale: action.payload,
      };
    },
  },
});

const { reducer } = global;
export const { handleLoading, toggleTheme, changeLocale } = global.actions;
export default reducer;
