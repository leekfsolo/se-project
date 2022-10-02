import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Auth/authSlice";
import globalReducer from "./globalSlice";
import userReducer from "../pages/Profile/userSlice";
import chatReducer from "../pages/Chat/chatSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  global: globalReducer,
  chat: chatReducer,
};

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
