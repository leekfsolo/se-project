import { BaseResponse, BaseUserInfo } from "../../utils/base/interface";

export interface IFormSignup {
  fullname: string;
  email: string;
  username: string;
  password: string;
}

export interface IFormSignin {
  username: string;
  password: string;
}

export interface IFormInfo extends Omit<BaseUserInfo, "birthDate"> {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: string;
  address: string;
}

export interface ILoginInfo {
  token: string;
  userName: string;
  id: string;
  guidId: string;
  validaty: string;
  expired: string;
}

export interface IPersonalInfo {
  label: string;
  id: keyof IFormInfo;
}

export interface ILoginResponse extends Omit<BaseResponse, "data"> {
  data: ILoginInfo;
}

export interface IUserInfoResponse extends Omit<BaseResponse, "data"> {
  data: IFormInfo;
}

export interface IUserRole {
  id: string;
  label: string;
  description: string;
  icon: JSX.Element;
}
