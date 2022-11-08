import { apiSlice } from "../../api/apiSlice";
import Config from "../../configuration";
import { BaseResponse } from "../../utils/base/interface";
import { IFormInfo, IFormSignup } from "../Auth/interface";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query<void, void>({
      query: () => "/users/roles",
    }),
    getRole: build.query<string, string>({
      query: (userId) => `/users/${userId}/roles/`,
      transformResponse: (response: BaseResponse) => {
        return response.data;
      },
    }),
    getAvatar: build.query<string, string>({
      query: (userId) => `/users/${userId}/avatar/`,
      transformResponse: (response: string) => {
        response = Config.CloudinaryImageUrl + response;
        return response;
      },
    }),
    getUser: build.query<string, string>({
      query: (userId) => `/users/${userId}/`,
    }),
    register: build.mutation<void, IFormSignup>({
      query: (data) => ({
        url: `/users/register`,
        method: "POST",
        params: data,
      }),
    }),
    updateInfo: build.mutation<IFormInfo, IFormInfo>({
      query: (data) => ({
        url: `/users`,
        method: "PUT",
        params: data,
      }),
    }),
    updateRole: build.mutation<
      BaseResponse,
      { userId: string; roleId: string }
    >({
      query: ({ roleId, userId }) => ({
        url: `/users/${userId}/roles`,
        method: "PUT",
        params: { roleId },
      }),
    }),
    updateAvatar: build.mutation<BaseResponse, { userId: string; url: string }>(
      {
        query: ({ url, userId }) => ({
          url: `/users/${userId}/roles`,
          method: "PUT",
          params: { url },
        }),
        transformResponse: (response: BaseResponse) => {
          response.data = Config.CloudinaryImageUrl + response.data;
          return response;
        },
      }
    ),
  }),
});

export const {
  useRegisterMutation,
  useUpdateAvatarMutation,
  useUpdateInfoMutation,
  useUpdateRoleMutation,
  useGetRoleQuery,
  useGetRolesQuery,
  useGetAvatarQuery,
} = userApiSlice;
