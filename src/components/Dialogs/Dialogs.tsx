import { DialogsPageType } from "../types/StateType"
import { AddMessageForm } from "./AddMessageForm"
import { DialogItem } from "./DialogItem/DialogItem"
import { DialogMessage } from "./DialogMessage/DialogMessage"
import { addMessageAC } from '../../redux/dialogs-reducer'
import { useAppSelector } from "../../redux/redux-store"


export const Dialogs = () => {
    const dialogsPage = useAppSelector(state => state.dialogsPage)
    const addMessageHandler = (newMessageObj: { newMessageBody: string }) => {
        addMessageAC(newMessageObj.newMessageBody)
    }
    return (
        <div className='dialogs'>
            <div className='dialogs__columns'>
                <ul className='dialogs__column column__messages'>
                    {dialogsPage.dialogs.map(el => <li key={el.id} id={el.id}>
                        <DialogItem title={el.name} id={el.id} img={el.img} />
                    </li>)}
                </ul>
                <ul className='dialogs__column'>
                    {dialogsPage.messages.map(el => <li key={el.id} id={el.id}>
                        <DialogMessage title={el.message} id={el.id} />
                    </li>)}
                </ul>
            </div>
            <AddMessageForm
                onSubmit={addMessageHandler}
            />
        </div >
    )

}