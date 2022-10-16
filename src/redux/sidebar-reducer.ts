import { v1 } from "uuid"

export type SidebarType = { id: string, name: string }[]
const sidebar: SidebarType = [
    { id: v1(), name: 'Alex' },
    { id: v1(), name: 'Roma' },
    { id: v1(), name: 'Jora' },
]
export const sidebarReducer = (state: SidebarType = sidebar, action: any) => {
    return state
}