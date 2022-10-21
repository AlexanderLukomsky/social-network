import { StatusesTypes } from "./commonTypes"
type DialogsType = { id: string, name: string, img: string }
type MessagesType = { id: string, message: string }
export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
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

export type AuthDataType = {
    id: number;
    login: string;
    email: string;
}
export type AuthStateType = {
    data: AuthDataType
    isAuth: boolean
}


