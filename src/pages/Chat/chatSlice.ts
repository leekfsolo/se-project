import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatApi from "../../api/chatApi";
import { DefaultUser } from "../../assets";
import Config from "../../configuration";
import checkIfImageExists from "../../utils/helpers/checkIfImageExists";

export const getChatList = createAsyncThunk("chat/list", async () => {
  const res = chatApi.getChatList();
  return res;
});

export const getChatData = createAsyncThunk(
  "chat/{chatId}/data",
  async (chatId: string, { rejectWithValue }) => {
    const res = await chatApi.getChatData(chatId);
    if (res.status === 200) return res;

    return rejectWithValue(res);
  }
);

const chat = createSlice({
  name: "chat",
  initialState: { users: Array<any>(), data: Array<any>() },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(getChatList.fulfilled, (state, action) => {
      state.users = action.payload.data.map((user: any) => {
        const avatarSrc = Config.CloudinaryImageUrl + user.avatar;
        let userAvatar = DefaultUser;

        checkIfImageExists(avatarSrc, (exists) => {
          if (exists) userAvatar = avatarSrc;
        });

        user.avatar = userAvatar;
        return user;
      });
    });
    buider.addCase(getChatData.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

const { reducer } = chat;
export default reducer;
