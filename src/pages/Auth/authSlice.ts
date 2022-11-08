import { createSlice } from "@reduxjs/toolkit";
import Config from "../../configuration";
import { authApiSlice } from "./authApiSlice";

const initialAuth = () => {
  const auth = localStorage.getItem(Config.storageKey.auth);
  if (auth) {
    return { ...JSON.parse(auth) };
  }
  return {};
};

const auth = createSlice({
  name: "auth",
  initialState: initialAuth(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.login.matchFulfilled,
      (state, action) => {
        state.auth = action.payload.data;
        localStorage.setItem(Config.storageKey.auth, JSON.stringify(state));
      }
    );
    builder.addMatcher(authApiSlice.endpoints.logout.matchFulfilled, () => {
      localStorage.removeItem(Config.storageKey.auth);
      return initialAuth();
    });
    builder.addMatcher(
      authApiSlice.endpoints.getMyInfo.matchFulfilled,
      (state, action) => {
        state.info = action.payload.data;
      }
    );
  },
});

const { reducer } = auth;
export default reducer;
