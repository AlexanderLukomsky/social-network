import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI, LoginRequestType, MeResponseType } from '../../api/authAPI';
import { ResultStatus } from '../../common/types/commonTypes';
import { AuthDataType } from "../../common/types/StateType";
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
    },
    extraReducers: (builder) => {
        builder.addCase(authThunk.fulfilled, (state, action) => {
            if (action.payload.resultCode === ResultStatus.OK) {
                state.data = action.payload.data
                state.isAuth = true
            }
        })
        builder.addCase(logoutThunk.fulfilled, state => {
            state.isAuth = false
        })
    }
})
export const authReducer = slice.reducer
export const { setAuthUserData } = slice.actions

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
export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authAPI.logout()
        } catch {
            return rejectWithValue('')
        }
    }
)
export const loginThunk = createAsyncThunk<unknown, LoginRequestType, { rejectValue: string }>(
    'auth/login',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === ResultStatus.OK) {
                const action = await dispatch(authThunk())
                if (authThunk.rejected.match(action))
                    throw new Error(action.payload)
            }
        } catch {
            rejectWithValue('')
        }
    }
)