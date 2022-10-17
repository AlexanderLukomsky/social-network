import { profileAPI } from './../../api/profileAPI';
type SetProfileStatusACType = ReturnType<typeof setProfileStatusAC>
type ProfileStatusActionType = SetProfileStatusACType
export type ProfileStatusType = typeof initialState
const initialState = {
    editMode: false,
    status: 'default status'
}
export const profileStatusReducer = (state: ProfileStatusType = initialState, action: ProfileStatusActionType): ProfileStatusType => {
    switch (action.type) {
        case 'SET-STATUS': return { ...state, status: action.status }
        default: return state
    }
}

export const setProfileStatusAC = (status: string) => {
    return {
        type: 'SET-STATUS',
        status
    } as const
}

export const getProfileStatusThunk = (id: string) => (dispatch: (action: ProfileStatusActionType) => void) => {
    profileAPI.getStatus(id)
        .then(data => {
            dispatch(setProfileStatusAC(data.data))
        })
}
export const updateProfileStatusThunk = (status: string) => (dispatch: (action: ProfileStatusActionType) => void) => {
    profileAPI.updateStatus(status)
        .then(data => {
            if (data.data.resultCode === 0) {
                dispatch(setProfileStatusAC(status))
            }

        })
}