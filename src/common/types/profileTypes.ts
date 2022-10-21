import { StatusesTypes } from "./commonTypes"

export type ProfileStateType = {
   data: ProfileType
   profileStatus: string | null
   isInitialized: false
   posts: PostType[]
   status: StatusesTypes
}
export type ProfileType = {
   aboutMe: string | null
   contacts: ContactsType<StringOrNull>
   fullName: string
   lookingForAJob: boolean
   lookingForAJobDescription: string | null
   photos: ProfilePhotosType
   userId: number
}
type ContactsType<T> = {
   facebook: T
   website: T
   vk: T
   twitter: T
   instagram: T
   youtube: T
   github: T
   mainLink: T
}
type StringOrNull = string | null
type PostType = { id: string, message: string, likesCount: number }
export type ProfilePhotosType = {
   small: string | null
   large: string | null
}