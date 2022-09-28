import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import Config from "../../configuration";
import { IFormSignin } from "./template/interface";

const initialAuth = () => {
  const auth = localStorage.getItem(Config.storageKey.auth);
  if (auth) {
    return { ...JSON.parse(auth) };
  }
  return {};
};
export const authenticate = createAsyncThunk(
  "auth/login",
  async (data: IFormSignin) => {
    const res = authApi.login(data);
    return res;
  }
);
export const logout = createAsyncThunk("auth/logout", async () => {
  const res = authApi.logout();
  return res;
});
export const getMyInfo = createAsyncThunk("auth/getMyInfo", async () => {
  const res = authApi.getMyInfo();
  return res;
});

const auth = createSlice({
  name: "auth",
  initialState: initialAuth(),
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(authenticate.fulfilled, (state, action) => {
      state.auth = action.payload.data;
      localStorage.setItem(Config.storageKey.auth, JSON.stringify(state));
    });
    buider.addCase(logout.fulfilled, () => {
      localStorage.removeItem(Config.storageKey.auth);
      return initialAuth();
    });
    buider.addCase(getMyInfo.fulfilled, (state, action) => {
      state.info = action.payload.data;
    });
  },
});

const { reducer } = auth;
export default reducer;
