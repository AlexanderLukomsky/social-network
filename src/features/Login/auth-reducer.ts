import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { auth } from 'api/auth';
import {
  AuthResponseType,
  AuthUserDataType,
  LoginRequestType,
} from 'api/auth/types/AuthAPITypes';
import { captcha } from 'api/captcha/captcha';
import { ResultStatus } from 'api/types/CommonAPITypes';
import { Nullable } from 'common/types';

const initialState = {
  data: {} as AuthUserDataType,
  isAuth: false,
  captchaUrl: null as Nullable<string>,
};
const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUserData: (state, action: PayloadAction<AuthUserDataType>) => {
      state.data = action.payload;
      state.isAuth = true;
    },
    setCaptchaUrl: (state, action: PayloadAction<string | null>) => {
      state.captchaUrl = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authMe.fulfilled, (state, action) => {
        if (action.payload.resultCode === ResultStatus.OK) {
          state.data = action.payload.data;
          state.isAuth = true;
        }
      })
      .addCase(logout.fulfilled, state => {
        state.isAuth = false;
      })
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
        state.captchaUrl = action.payload.url;
      });
  },
});
export const authReducer = slice.reducer;
export const { setAuthUserData, setCaptchaUrl } = slice.actions;

export const authMe = createAsyncThunk<
  AuthResponseType,
  undefined,
  { rejectValue: string }
>('auth/me', async (_, { rejectWithValue }) => {
  try {
    const res = await auth.me();
    return res.data;
  } catch {
    return rejectWithValue('Some Error');
  }
});
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const res = await auth.logout();
    return res.data.data;
  } catch {
    return rejectWithValue('');
  }
});
export const login = createAsyncThunk<unknown, LoginRequestType, { rejectValue: string }>(
  'auth/login',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await auth.login(data);
      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(authMe());
      } else if (res.data.resultCode === ResultStatus.ANTIBOTCAPTCHA) {
        dispatch(getCaptchaUrl());
      }
    } catch {
      rejectWithValue('');
    }
  },
);
export const getCaptchaUrl = createAsyncThunk('auth/get-captcha', async () => {
  const res = await captcha.getCaptcha();
  return res.data;
});
