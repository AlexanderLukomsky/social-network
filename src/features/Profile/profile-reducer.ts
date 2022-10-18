import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import { usersAPI } from '../../api/userApi';
import { ProfileType } from '../../common/types/StateType';
import { StatusesTypes } from './../../common/types/commonTypes';
const initialState = {
    profile: null as null | ProfileType,
    posts: [
        { id: v1(), message: 'message-1', likesCount: 5 },
        { id: v1(), message: 'message-2', likesCount: 8 },
        { id: v1(), message: 'message-3', likesCount: 11 },
        { id: v1(), message: 'message-4', likesCount: 14 },
        { id: v1(), message: 'message-5', likesCount: 17 },
    ],
    status: 'idle' as StatusesTypes
}
const slice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addNewPost: (state, action: PayloadAction<string>) => {
            state.posts.unshift({ id: v1(), message: action.payload, likesCount: 0 })
        },
        deletePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter(el => el.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setUserProfile.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(setUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload
                state.status = 'succeeded'
            })
    }
})
export const profileReducer = slice.reducer
export const { addNewPost, deletePost } = slice.actions

export const setUserProfile = createAsyncThunk(
    'profile/setUserProfile',
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await usersAPI.getUserProfile(userId)
            return res.data
        } catch {
            return rejectWithValue('')
        }
    }
)
