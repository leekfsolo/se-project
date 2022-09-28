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

export interface IFormInfo {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: string;
  address: string;
}

export interface PersonalInfo {
  label: string;
  id: keyof IFormInfo;
}

export interface ResponseData {
  success: boolean;
  message: string;
  data: string;
}

export interface UserRole {
  id: string;
  label: string;
  description: string;
  icon: JSX.Element;
}
