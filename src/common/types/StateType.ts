import { StatusesTypes } from "./commonTypes"

export type PostsType = { id: string, message: string, likesCount: number }
type DialogsType = { id: string, name: string, img: string }
type MessagesType = { id: string, message: string }



export type ProfilePageType = {
    data: ProfileType
    profileStatus: string | null
    isInitialized: false
    posts: PostsType[]
    status: StatusesTypes
}
export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
}
type SidebarType = { id: string, name: string }
export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SidebarType[]
    usersPage: UsersPageType
}

export type UsersDataType = {
    followed: boolean
    id: number
    name: string
    photos: { small: null, large: null }
    status: null
    uniqueUrlName: null
}
export type UsersPageType = {
    data: UsersDataType[]
    pageSize: number
    totalUsersCount: number
    page: number
    isFetching: boolean
    followingInProgress: number[]
    error: null
}

export type ProfileType = {
    aboutMe: string | null
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    userId: number,
    photos: {
        small: string | null
        large: string | null
    }
}
export type AuthDataType = {
    id: number;
    login: string;
    email: string;
}
export type AuthStateType = {
    data: AuthDataType
    isAuth: boolean
}


type ContactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}