import { IFormSignin } from "../pages/Auth/template/interface";
import axiosClient from "./axiosClient";

const authApi = {
  login: (data: IFormSignin) => {
    const url = "/api/auth/login";
    return axiosClient.post(url, data, { params: data });
  },

  logout: () => {
    const url = "/api/auth/logout";
    return axiosClient.post(url);
  },

  getMyInfo: () => {
    const url = "/api/auth/getMyInfo";
    return axiosClient.get(url);
  },
};

export default authApi;
