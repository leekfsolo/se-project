import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Auth/authSlice";
import globalReducer from "./globalSlice";
import userReducer from "../pages/Profile/userSlice";
import { chatApiSlice } from "../pages/Chat/chatApiSlice";
import { authApiSlice } from "../pages/Auth/authApiSlice";
import { apiSlice } from "../api/apiSlice";
import { userApiSlice } from "../pages/Profile/userApiSlice";

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  global: globalReducer,
  [authApiSlice.reducerPath]: authApiSlice.reducer,
  [chatApiSlice.reducerPath]: chatApiSlice.reducer,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
