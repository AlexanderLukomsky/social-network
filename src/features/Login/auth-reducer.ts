import { authAPI } from "../../api/api"
import { AuthDataType, AuthStateType } from "../../common/types/StateType"

type SetUserDataACType = ReturnType<typeof setAuthUserDataAC>
type LogoutAC = ReturnType<typeof logoutAC>
export type AuthActionType = SetUserDataACType | LogoutAC

const initialState = {
    data: {
    },
    isAuth: false
} as AuthStateType
export const authReducer = (state: AuthStateType = initialState, action: AuthActionType): AuthStateType => {
    console.log(state.isAuth);
    switch (action.type) {
        case 'SET_USER_DATA': return {
            ...state, data: { ...action.data }, isAuth: true
        }
        case 'LOGOUT': return {
            ...state, isAuth: false
        }
        default: return state
    }
}

export const setAuthUserDataAC = (data: AuthDataType) => {
    return {
        type: 'SET_USER_DATA',
        data
    } as const
}
export const logoutAC = () => {
    return {
        type: 'LOGOUT',
    } as const
}
export const authThunkCreator = () => (dispatch: (action: AuthActionType) => void) => {
    authAPI.me()
        .then(data => {
            if (data.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(data.data))
            }
        })
}
export const logoutThunk = () => (dispatch: (action: AuthActionType) => void) => {
    authAPI.logout()
        .then(() => {
            dispatch(logoutAC())
        })
}
