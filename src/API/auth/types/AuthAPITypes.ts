import { CommonResponseType } from 'api/types/CommonAPITypes';

export type AuthResponseType<T = AuthUserDataType> = {
  data: T;
} & CommonResponseType;

export type LoginRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: null | string;
};
export type AuthUserDataType = {
  id: number;
  login: string;
  email: string;
};
