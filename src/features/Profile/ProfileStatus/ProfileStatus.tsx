import { ChangeEvent, useEffect, useState, KeyboardEvent, FocusEvent } from "react"
import { useSelector } from "react-redux"
import { ProfileStatusType, updateProfileStatusThunk } from "../profileStatus-reducer"
import { AppRootStoreType, useAppDispatch } from "../../../redux/redux-store"

export const ProfileStatus = (props: { updateStatus: (status: string) => void }) => {
    const profileStatus = useSelector<AppRootStoreType, ProfileStatusType>(state => state.profilestatus)
    const dispatch = useAppDispatch()
    const [status, setStatus] = useState<string>('')
    const [editMode, setEditMode] = useState<boolean>(false)

    useEffect(() => {
        setStatus(profileStatus.status)
    }, [profileStatus.status])

    const activeEditMode = () => {
        setEditMode(true)
        setStatus(profileStatus.status)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    const deactivateEditMode = () => {
        console.log('object');
        setEditMode(false)
        dispatch(updateProfileStatusThunk(status))

    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            deactivateEditMode()
        }
    }

    return (
        <div >
            <div onDoubleClick={activeEditMode}>
                {editMode ?
                    <input value={status}
                        autoFocus
                        onBlur={deactivateEditMode}
                        onChange={onChangeHandler}
                        onKeyPress={onEnterPressHandler}
                    />
                    : <span style={{ display: 'block', padding: '10px', backgroundColor: 'grey' }}>{profileStatus.status}</span>
                }
            </div>
        </div>
    )
}