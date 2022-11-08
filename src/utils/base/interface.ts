export interface BaseResponse {
  data: string;
  success: boolean;
  message: string;
  total: number;
}

export interface BaseUserInfo {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  gender: string;
  birthDate: string;
  address: string;
  imageUrl?: string;
}
