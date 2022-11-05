import { apiSlice } from "../../api/apiSlice";
import Config from "../../configuration";
import { IChatData, IChatDataResponse } from "./interface";
import { ChatItem, IChatListResponse } from "./interface";

export const chatSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getChatList: build.query<ChatItem[], void>({
      query: () => ({
        url: "/chat/list",
      }),
      transformResponse: (data: IChatListResponse) => {
        const chatList = data.data.map((chat) => {
          chat.avatar = Config.CloudinaryImageUrl + chat.avatar;
          return chat;
        });

        return chatList;
      },
    }),

    getChatData: build.query<IChatData, string>({
      query: (chatId) => `chat/${chatId}`,
      transformResponse: (data: IChatDataResponse) => {
        const chatData = data.data;

        chatData.receiverAvatar =
          Config.CloudinaryImageUrl + chatData.receiverAvatar;
        chatData.messages.map((msg) => {
          msg.avatar = Config.CloudinaryImageUrl + msg.avatar;
          return msg;
        });

        return chatData;
      },
    }),
  }),
});

export const { useGetChatListQuery, useGetChatDataQuery } = chatSlice;
