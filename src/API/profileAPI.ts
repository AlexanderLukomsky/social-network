import { ResultStatus } from "../common/types/commonTypes"
import { instance } from "./instance"

export const profileAPI = {
   getProfile(userId: string) {
      return instance.get(`profile/${userId ? userId : '19615'}`)
   },
   getStatus(userID: string) {
      return instance.get<string | null>(`profile/status/${userID}`)
   },
   updateProfile(data: UpdateProfileType) {
      return instance.put('profile', { ...data, ...plug })
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
export type UpdateProfileType = {
   userId: number
   fullName: string
   aboutMe: string | null
   contacts: { github: string | null }
}
const plug = {
   LookingForAJobDescriptionL: 'React',
   LookingForAJobDescription: true
}