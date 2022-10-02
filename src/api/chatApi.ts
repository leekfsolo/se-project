import axiosClient from "./axiosClient";

const chatApi = {
  getUsers: (userId: string) => {
    const url = "/api/chat/users";
    return axiosClient.get(url, { params: { userId } });
  },
};

export default chatApi;
