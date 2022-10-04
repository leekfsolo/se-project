import axiosClient from "./axiosClient";

const chatApi = {
  getChatList: () => {
    const url = "/api/chat/list";
    return axiosClient.get(url);
  },

  getChatData: (chatId: string) => {
    const url = `/api/chat/${chatId}`;
    return axiosClient.get(url);
  },
};

export default chatApi;
