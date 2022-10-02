import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatApi from "../../api/chatApi";
import Config from "../../configuration";

export const getChatUsers = createAsyncThunk(
  "chat/users",
  async (userId: string) => {
    const res = chatApi.getUsers(userId);
    return res;
  }
);

const chat = createSlice({
  name: "chat",
  initialState: { users: Array<any>() },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(getChatUsers.fulfilled, (state, action) => {
      state.users = action.payload.data.map((user: any) => {
        user.avatar = Config.CloudinaryImageUrl + user.avatar;
        return user;
      });
    });
  },
});

const { reducer } = chat;
export default reducer;
