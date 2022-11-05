import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";
import { RootState } from "../app/store";
import Config from "../configuration";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: Config.apiConfig.endPoint + "/api",
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).auth.auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
    paramsSerializer: (params) => queryString.stringify(params),
  }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({}),
});
