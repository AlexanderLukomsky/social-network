import { instance } from "./instance"
import { profileAPI } from "./profileAPI"

export const usersAPI = {
   getUsers(param: GetUsersParamType) {
      return instance.get(`users?page=${param.currentPage}&count=${param.pageSize}`)
   },
   follow(userID: number) {
      return instance.post(`follow/${userID}`)
   },
   unFollow(userID: number) {
      return instance.delete(`follow/${userID}`)
   }
}
export type GetUsersParamType = { currentPage: number, pageSize: number }