import { apiSlice } from "../../api/apiSlice";
import Config from "../../configuration";
import { BaseResponse } from "../../utils/base/interface";
import { IFormSignin, ILoginResponse, IUserInfoResponse } from "./interface";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ILoginResponse, IFormSignin>({
      query: (data: IFormSignin) => ({
        url: "/auth/login",
        method: "post",
        body: data,
      }),
      transformResponse: (response: ILoginResponse) => {
        localStorage.setItem(
          Config.storageKey.auth,
          JSON.stringify(response.data)
        );
        return response;
      },
    }),

    logout: build.mutation<BaseResponse, void>({
      query: () => ({ url: "/auth/logout", method: "post" }),
      transformResponse: (response: BaseResponse) => {
        localStorage.removeItem(Config.storageKey.auth);
        return response;
      },
    }),

    getMyInfo: build.query<IUserInfoResponse, void>({
      query: () => ({
        url: "/auth/getMyInfo",
      }),
    }),
  }),
});

export const selectAuthResult = authApiSlice.endpoints.login;

export const { useGetMyInfoQuery, useLogoutMutation, useLoginMutation } =
  authApiSlice;
