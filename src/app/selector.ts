import { RootState } from "./store";

export const authSelector = (state: RootState) => state.auth;

export const userSelector = (state: RootState) => state.user;

export const globalSelector = (state: RootState) => state.global;
