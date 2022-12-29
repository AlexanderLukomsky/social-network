import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

import { profileAPI, UpdateProfileRequestType } from '../../api/profileAPI';
import { setAppStatus } from '../../app/app-reducer';
import { Nullable } from '../../common/types';
import { ProfileType } from '../../common/types/profileTypes';

import { ResultStatus } from 'api/types/CommonAPITypes';
import { StatusesTypes } from 'common/types/commonTypes';

const initialState = {
  data: {} as ProfileType,
  profileStatus: null as Nullable<string>,
  isInitialized: false as boolean,
  posts: [
    { id: v1(), message: 'first post', likesCount: 5 },
    { id: v1(), message: 'second post', likesCount: 8 },
    { id: v1(), message: 'third post', likesCount: 11 },
  ],
  notice: '',
  status: 'idle' as StatusesTypes,
};
const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addNewPost: (state, action: PayloadAction<string>) => {
      state.posts.unshift({ id: v1(), message: action.payload, likesCount: 0 });
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(el => el.id !== action.payload);
    },
    setIsInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    setNotice: (state, action: PayloadAction<string>) => {
      state.notice = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfile.pending, state => {
        state.status = 'pending';
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isInitialized = true;
        state.status = 'succeeded';
      })
      .addCase(updatePhoto.pending, state => {
        state.status = 'pending';
      })
      .addCase(updatePhoto.fulfilled, (state, action) => {
        if (action.payload.resultCode === ResultStatus.OK) {
          state.data.photos = action.payload.data.photos;
        }
        state.status = 'succeeded';
      })
      .addCase(getProfileStatus.fulfilled, (state, action) => {
        state.profileStatus = action.payload;
      });
  },
});

export const profileReducer = slice.reducer;
export const { addNewPost, deletePost, setIsInitialized } = slice.actions;

export const getProfile = createAsyncThunk(
  'profile/get-profile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await profileAPI.getProfile(userId);

      return res.data;
    } catch {
      return rejectWithValue('');
    }
  },
);
export const updatePhoto = createAsyncThunk(
  'profile/updatePhoto',
  async (data: FormData, { rejectWithValue, dispatch }) => {
    dispatch(setAppStatus('pending'));
    try {
      const res = await profileAPI.updatePhoto(data);

      return res.data;
    } catch {
      return rejectWithValue('');
    } finally {
      dispatch(setAppStatus('succeeded'));
    }
  },
);

export const getProfileStatus = createAsyncThunk(
  'profile/get-status',
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await profileAPI.getStatus(id);

      return res.data;
    } catch {
      return rejectWithValue('');
    }
  },
);
export const updateProfile = createAsyncThunk(
  'profile/update-profile',
  async (profile: UpdateProfileRequestType, { rejectWithValue, dispatch }) => {
    try {
      const res = await profileAPI.updateProfile(profile);

      if (res.data.resultCode === ResultStatus.OK) {
        dispatch(getProfile(profile.userId.toString()));

        return res.data;
      }
      if (res.data.resultCode === ResultStatus.FAILED) {
        return rejectWithValue('');
      }

      return res.data;
    } catch {
      return rejectWithValue('');
    }
  },
);

export type PostType = { id: string; message: string; likesCount: number };
export type ProfileStateType = typeof initialState;
