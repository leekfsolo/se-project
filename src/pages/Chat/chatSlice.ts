import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import chatApi from "../../api/chatApi";
import Config from "../../configuration";
import { Message } from "../../utils/interface";

export const getChatList = createAsyncThunk("chat/list", async () => {
  const res = chatApi.getChatList();
  return res;
});

export const getChatData = createAsyncThunk(
  "chat/{chatId}/data",
  async (chatId: string, { rejectWithValue }) => {
    const res: any = await chatApi.getChatData(chatId);
    if (res.success) return res;

    return rejectWithValue(res);
  }
);

const chat = createSlice({
  name: "chat",
  initialState: {
    chatList: Array<any>(),
    data: {
      receiverAvatar: "",
      receiverUsername: "",
      messages: Array<Message>(),
    },
  },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(getChatList.fulfilled, (state, action) => {
      state.chatList = action.payload.data.map((chat: any) => {
        chat.avatar = Config.CloudinaryImageUrl + chat.avatar;
        return chat;
      });
    });
    buider.addCase(getChatData.fulfilled, (state, action) => {
      const data = action.payload.data;
      const receiverAvatarSrc = Config.CloudinaryImageUrl + data.receiverAvatar;
      data.receiverAvatar = receiverAvatarSrc;
      data.messages.map((msg: Message, idx: number) => {
        // generate image src
        if (idx < data.messages.length - 1) {
          if (msg.userId === data.messages[idx + 1].userId) {
            msg.avatar = "";
            return msg;
          }
        }
        msg.avatar = Config.CloudinaryImageUrl + msg.avatar;

        return msg;
      });

      state.data = data;
    });
  },
});

const { reducer } = chat;
export default reducer;
