import { AuthUserDataType } from '../common/types/authTypes';
import { ResultStatus } from "../common/types/commonTypes";
import { CommonResponseType } from './../common/types/commonTypes';
import { instance } from "./instance";

export const authAPI = {
   me() {
      return instance.get<AuthResponseType<AuthUserDataType>>('auth/me')
   },
   login(data: LoginRequestType) {
      return instance.post<AuthResponseType<{ userId: string }>>('auth/login', data)
   },
   logout() {
      return instance.delete<AuthResponseType<{}>>('auth/login')
   },
}

export type AuthResponseType<T = AuthUserDataType> = {
   data: T
} & CommonResponseType

export type LoginRequestType = {
   email: string,
   password: string,
   rememberMe: boolean
}

