import { ResultStatus } from "../common/types/commonTypes"
import { AuthDataType } from "../common/types/StateType"
import { instance } from "./instance"

export const authAPI = {
   me() {
      return instance.get<MeResponseType>('auth/me')
   },
   login(data: LoginRequestType) {
      return instance.post<{ resultCode: ResultStatus }>('auth/login', data)
   },
   logout() {
      return instance.delete('auth/login')
   },
}

export type LoginRequestType = {
   email: string,
   password: string,
   rememberMe: boolean
}

export type MeResponseType = {
   data: AuthDataType,
   resultCode: ResultStatus
}

