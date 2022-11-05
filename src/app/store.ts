import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Auth/authSlice";
import globalReducer from "./globalSlice";
import userReducer from "../pages/Profile/userSlice";
import { chatSlice } from "../pages/Chat/chatSlice";
// import chatReducer from "../pages/Chat/chatSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  global: globalReducer,
  // chat: chatReducer,
  [chatSlice.reducerPath]: chatSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(chatSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
