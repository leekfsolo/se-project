import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";
import Config from "../configuration";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.apiConfig.endPoint + "/api",
    prepareHeaders(headers) {
      const token = localStorage.getItem(Config.storageKey.auth);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    paramsSerializer: (params) => queryString.stringify(params),
  }),
  endpoints: (builder) => ({}),
});
