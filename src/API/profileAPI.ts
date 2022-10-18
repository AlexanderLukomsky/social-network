import { ResultStatus } from "../common/types/commonTypes"
import { instance } from "./instance"

export const profileAPI = {
   getProfile(userId: string) {
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
      }>('profile/status', { status })
   },
   updatePhoto(data: FormData) {
      return instance.put<UpdatePhotoResponseType>('profile/photo', data, {
         headers: {
            'Content-Type': 'multipart/form-data; ',
         },
      })
   }
}
type UpdatePhotoResponseType = {
   data: {
      photos: { small: string, large: string }
   }
   resultCode: ResultStatus
}