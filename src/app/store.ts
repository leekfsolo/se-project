import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Auth/authSlice";
import globalReducer from "./globalSlice";
import userReducer from "../pages/Profile/userSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  global: globalReducer,
};

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
