import { IFormInfo, IFormSignup } from "../pages/Auth/template/interface";
import axiosClient from "./axiosClient";

const userApi = {
  register: (data: IFormSignup) => {
    const url = "/api/users/register";
    return axiosClient.post(url, data, { params: data });
  },

  updateInfo: (data: IFormInfo) => {
    const url = "/api/users";
    return axiosClient.put(url, data, { params: data });
  },

  getUser: (userId: string) => {
    const url = `/api/users/${userId}`;
    return axiosClient.get(url);
  },

  getRoles: () => {
    const url = "/api/users/roles";
    return axiosClient.get(url);
  },

  getUserRole: (userId: string) => {
    const url = `/api/users/${userId}/roles`;
    return axiosClient.get(url);
  },

  updateUserRole: (userId: string, roleId: string) => {
    const url = `/api/users/${userId}/roles`;
    return axiosClient.put(url, roleId, { params: { roleId } });
  },

  getUserAvatar: (userId: string) => {
    const url = `/api/users/${userId}/avatar`;
    return axiosClient.get(url);
  },

  updateUserAvatar: (userId: string, url: string) => {
    const urlEndpoint = `/api/users/${userId}/avatar`;
    return axiosClient.put(urlEndpoint, url, { params: { url } });
  },
};

export default userApi;
