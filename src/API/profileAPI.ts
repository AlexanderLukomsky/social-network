import { CommonResponseType } from "../common/types/commonTypes"
import { ProfilePhotosType, ProfileType } from "../common/types/profileTypes"
import { instance } from "./instance"

export const profileAPI = {
   getProfile(userId: string) {
      return instance.get<ProfileType>(`profile/${userId ? userId : '19615'}`)
   },
   getStatus(userID: string) {
      return instance.get<string | null>(`profile/status/${userID}`)
   },
   updateProfile(data: UpdateProfileRequestType) {
      return instance.put<UpdateProfileResponseType>('profile', { ...data, ...plug })
   },

   //need editing
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
///* clean
const plug = {
   LookingForAJobDescriptionL: 'React',
   LookingForAJobDescription: true
}

type UpdateProfileResponseType = CommonResponseType
type UpdatePhotoResponseType = { data: { photos: ProfilePhotosType } } & CommonResponseType
export type UpdateProfileRequestType = {
   contacts: { github: string | null }
} & Pick<ProfileType, 'userId' | 'fullName' | 'aboutMe'>


