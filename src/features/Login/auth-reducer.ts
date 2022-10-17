import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../../api/authAPI';
import { AuthDataType, AuthStateType } from "../../common/types/StateType"
import { AppThunk } from '../../redux/redux-store';
const initialState = {
    data: {
    },
    isAuth: false
} as AuthStateType
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUserData: (state, action: PayloadAction<{ data: AuthDataType }>) => {
            state.data = action.payload.data
            state.isAuth = true
        },
        logout: (state) => {
            state.isAuth = false
        },
    },
})
export const authReducer = slice.reducer
export const { setAuthUserData, logout } = slice.actions

export const authThunk = (): AppThunk => async (dispatch) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setAuthUserData(res.data))
    }
}
export const logoutThunk = (): AppThunk => async (dispatch) => {
    await authAPI.logout()
    dispatch(logout())
}
export const loginThunk = (login: string, password: string): AppThunk => async (dispatch) => {
    const res = await authAPI.login(login, password)
    if (res.data.resultCode === 0) {
        dispatch(authThunk())
    }
}