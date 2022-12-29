import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setAuthUserData } from '../features/login/auth-reducer';

import { auth } from 'api/auth';
import { ResultStatus } from 'api/types/CommonAPITypes';
import { StatusesTypes } from 'common/types/commonTypes';

const initialState = {
  appStatus: 'idle' as StatusesTypes,
  isInitialized: false,
};
const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<StatusesTypes>) => {
      state.appStatus = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initializeApp.pending, state => {
        state.appStatus = 'pending';
      })
      .addCase(initializeApp.fulfilled, state => {
        state.appStatus = 'succeeded';
        state.isInitialized = true;
      })
      .addCase(initializeApp.rejected, state => {
        state.appStatus = 'failed';
        state.isInitialized = true;
      });
  },
});

export const appReducer = slice.reducer;
export const { setAppStatus } = slice.actions;
export const initializeApp = createAsyncThunk(
  'app/initialized',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const res = await auth.me();

      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(setAuthUserData(res.data.data));
      }

      return res.data.data;
    } catch (e) {
      return rejectWithValue('');
    }
  },
);

export type AppStateType = typeof initialState;
