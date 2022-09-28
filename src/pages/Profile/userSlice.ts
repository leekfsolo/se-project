import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import Config from "../../configuration";
import { IFormInfo, IFormSignup } from "../Auth/template/interface";

export const updateInfo = createAsyncThunk(
  "users/updateInfo",
  async (data: IFormInfo) => {
    const res = userApi.updateInfo(data);
    return res;
  }
);
export const signup = createAsyncThunk(
  "users/register",
  async (data: IFormSignup) => {
    const res = userApi.register(data);
    return res;
  }
);
export const updateUserRole = createAsyncThunk(
  "users/{id}/updateRole",
  async ({ userId, roleId }: { userId: string; roleId: string }) => {
    const res = userApi.updateUserRole(userId, roleId);
    return res;
  }
);
export const getUserRole = createAsyncThunk(
  "users/{id}/roles",
  async (userId: string) => {
    const res = userApi.getUserRole(userId);
    return res;
  }
);

export const updateUserAvatar = createAsyncThunk(
  "users/{id}/updateAvatar",
  async ({ userId, url }: { userId: string; url: string }) => {
    const res = userApi.updateUserAvatar(userId, url);
    return res;
  }
);
export const getUserAvatar = createAsyncThunk(
  "users/{id}/avatar",
  async (userId: string) => {
    const res = userApi.getUserAvatar(userId);
    return res;
  }
);

export const getRoles = createAsyncThunk("users/roles", async () => {
  const res = userApi.getRoles();
  return res;
});

const user = createSlice({
  name: "user",
  initialState: {
    role: "collector",
    avatar: "",
  },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(getUserRole.fulfilled, (state, action) => {
      state.role = action.payload.data;
    });
    buider.addCase(getUserAvatar.fulfilled, (state, action) => {
      state.avatar = Config.CloudinaryImageUrl + action.payload.data;
    });
    buider.addCase(updateUserAvatar.fulfilled, (state, action) => {
      state.avatar = Config.CloudinaryImageUrl + action.payload.data;
    });
  },
});

const { reducer } = user;
export default reducer;
