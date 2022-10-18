import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI, MeResponseType } from '../../api/authAPI';
import { ResultStatus } from '../../common/types/commonTypes';
import { AuthDataType } from "../../common/types/StateType"
import { AppThunk } from '../../redux/redux-store';
const initialState = {
    data: {} as AuthDataType,
    isAuth: false
}
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUserData: (state, action: PayloadAction<AuthDataType>) => {
            state.data = action.payload
            state.isAuth = true
        },
        logout: (state) => {
            state.isAuth = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.fulfilled, (state, action) => {
            if (action.payload.resultCode === ResultStatus.OK) {
                state.data = action.payload.data
                state.isAuth = true
            }
        })
    }
})
export const authReducer = slice.reducer
export const { setAuthUserData, logout } = slice.actions

export const authThunk = createAsyncThunk<MeResponseType, undefined, { rejectValue: string }>(
    'auth/me',
    async (_, { rejectWithValue }) => {
        try {
            const res = await authAPI.me()
            return res.data
        } catch {
            return rejectWithValue('Some Error')
        }
    }
)

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