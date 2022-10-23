import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI, AuthResponseType, LoginRequestType, securityAPI } from '../../api/authAPI';
import { AuthUserDataType } from '../../common/types/authTypes';
import { ResultStatus } from '../../common/types/commonTypes';
const initialState = {
    data: {} as AuthUserDataType,
    isAuth: false,
    captchaUrl: null as null | string
}
const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUserData: (state, action: PayloadAction<AuthUserDataType>) => {
            state.data = action.payload
            state.isAuth = true
        },
        setCaptchaUrl: (state, action: PayloadAction<string | null>) => {
            state.captchaUrl = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authMe.fulfilled, (state, action) => {
                if (action.payload.resultCode === ResultStatus.OK) {
                    state.data = action.payload.data
                    state.isAuth = true
                }
            })
            .addCase(logout.fulfilled, state => {
                state.isAuth = false
            })
            .addCase(getCaptchaUrl.fulfilled, (state, action) => {
                state.captchaUrl = action.payload.url
            })
    }
})
export const authReducer = slice.reducer
export const { setAuthUserData, setCaptchaUrl } = slice.actions

export const authMe = createAsyncThunk<AuthResponseType, undefined, { rejectValue: string }>(
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
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authAPI.logout()
        } catch {
            return rejectWithValue('')
        }
    }
)
export const login = createAsyncThunk<unknown, LoginRequestType, { rejectValue: string }>(
    'auth/login',
    async (data, { rejectWithValue, dispatch }) => {
        try {
            const res = await authAPI.login(data)
            if (res.data.resultCode === ResultStatus.OK) {
                dispatch(authMe())
            } else if (res.data.resultCode === ResultStatus.ANTIBOTCAPTCHA) {
                dispatch(getCaptchaUrl())
            }

        } catch {
            rejectWithValue('')
        }
    }
)
export const getCaptchaUrl = createAsyncThunk(
    'auth/get-captcha',
    async () => {
        const res = await securityAPI.getCaptcha()
        return res.data
    }
)