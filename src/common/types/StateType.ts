import { StatusesTypes } from "./commonTypes"
type DialogsType = { id: string, name: string, img: string }
type MessagesType = { id: string, message: string }
export type DialogsPageType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
}




