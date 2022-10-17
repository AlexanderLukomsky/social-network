import { instance } from "./instance"

export const profileAPI = {

   getUserProfile(userId: string) {
      return instance.get(`profile/${userId ? userId : '19615'}`)
   },

   getStatus(userID: string) {
      return instance.get(`profile/status/${userID}`)
   },
   updateStatus(status: string) {
      return instance.put<{
         resultCode: number
         messages: string[],
         data: {}
      }>(`status`, { status })
   }
}