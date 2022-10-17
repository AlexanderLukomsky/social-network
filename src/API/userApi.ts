import { instance } from "./instance"
import { profileAPI } from "./profileAPI"

export const usersAPI = {
   getUsers(currentPage: number = 1, pageSize: number = 5) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`)
   },
   getUserProfile(userId: string) {
      return profileAPI.getUserProfile(userId)
   },
   follow(userID: number) {
      return instance.post(`follow/${userID}`)
   },
   unFollow(userID: number) {
      return instance.delete(`follow/${userID}`)
   }
}