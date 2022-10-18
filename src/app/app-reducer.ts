import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '../api/authAPI';
import { setAuthUserData } from '../features/Login/auth-reducer';
import { ResultStatus, StatusesTypes } from './../common/types/commonTypes';
const slice = createSlice({
   name: 'app',
   initialState: {
      appStatus: 'idle' as StatusesTypes,
      isInitialized: false
   },
   reducers: {
      setAppStatus: (state, action: PayloadAction<StatusesTypes>) => {
         state.appStatus = action.payload
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(initializeApp.pending, state => { state.appStatus = 'pending' })
         .addCase(initializeApp.fulfilled, state => {
            state.appStatus = 'succeeded'
            state.isInitialized = true
         })
         .addCase(initializeApp.rejected, state => {
            state.appStatus = 'failed'
            state.isInitialized = true
         })
   }
})

export const appReducer = slice.reducer

export const initializeApp = createAsyncThunk(
   'app/initialized',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         const res = await authAPI.me()
         if (res.data.resultCode === ResultStatus.OK) {
            dispatch(setAuthUserData(res.data.data))
         }
      } catch (e) {
         return rejectWithValue('')
      }
   }
)