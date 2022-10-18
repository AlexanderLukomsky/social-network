import { ResultStatus } from "../common/types/commonTypes"
import { AuthDataType } from "../common/types/StateType"
import { instance } from "./instance"

export const authAPI = {
   me() {
      return instance.get<MeResponseType>('auth/me')
   },
   login(email: string, password: string, rememberMe: boolean = true) {
      return instance.post('auth/login', { email, password, rememberMe })
   },
   logout() {
      return instance.delete('auth/login')
   },
}
export type MeResponseType = {
   data: AuthDataType,
   resultCode: ResultStatus
}