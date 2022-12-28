import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { usersAPI } from '../../api/userApi';
import { UserType } from '../../common/types/userTypes';
import { AppRootStoreType } from '../../redux/redux-store';

import { ResultStatus } from 'api/types/CommonAPITypes';

const initialState = {
  data: [] as UserType[],
  page: 1,
  pageSize: 5,
  totalCount: 0,
  error: null,
  requestPage: 1,
};
const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    requestChangePage: (state, action: PayloadAction<number>) => {
      state.requestPage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUsersThunk.fulfilled, (state, action) => {
        state.data = action.payload.items;
        state.totalCount = action.payload.totalCount;
        state.page = state.requestPage;
      })
      .addCase(followThunk.fulfilled, (state, action) => {
        if (action.payload.resultCode === ResultStatus.OK) {
          const user = state.data.find(u => u.id === action.payload.userID);
          if (user) {
            user.followed = true;
          }
        }
      })
      .addCase(unfollowThunk.fulfilled, (state, action) => {
        if (action.payload.resultCode === ResultStatus.OK) {
          const user = state.data.find(u => u.id === action.payload.userID);
          if (user) {
            user.followed = false;
          }
        }
      });
  },
});

export const usersReducer = slice.reducer;
export const { requestChangePage } = slice.actions;

export const getUsersThunk = createAsyncThunk(
  'users/getUsers',
  async (_, { rejectWithValue, getState }) => {
    const { users } = getState() as AppRootStoreType;
    const params = { currentPage: users.page, pageSize: users.pageSize };
    try {
      const res = await usersAPI.getUsers(params);
      return res.data;
    } catch {
      return rejectWithValue('');
    }
  },
);
export const followThunk = createAsyncThunk(
  'users/follow',
  async (userID: number, { rejectWithValue }) => {
    try {
      const res = await usersAPI.follow(userID);
      return { userID, resultCode: res.data.resultCode };
    } catch {
      return rejectWithValue('');
    }
  },
);
export const unfollowThunk = createAsyncThunk(
  'users/unfollow',
  async (userID: number, { rejectWithValue }) => {
    try {
      const res = await usersAPI.unFollow(userID);
      return { userID, resultCode: res.data.resultCode };
    } catch {
      return rejectWithValue('');
    }
  },
);
