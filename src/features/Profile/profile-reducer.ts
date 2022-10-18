import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import { setAppStatus } from '../../app/app-reducer';
import { ProfileType } from '../../common/types/StateType';
import { profileAPI } from './../../api/profileAPI';
import { ResultStatus, StatusesTypes } from './../../common/types/commonTypes';
const initialState = {
    data: {} as ProfileType,
    profileStatus: null as null | string,
    isInitialized: false,
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
        },
        setIsInitialized: (state, action) => {
            state.isInitialized = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, state => {
                state.status = 'pending'
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.data = action.payload
                state.isInitialized = true
                state.status = 'succeeded'
            })
            .addCase(updatePhoto.pending, state => {
                state.status = 'pending'
            })
            .addCase(updatePhoto.fulfilled, (state, action) => {
                if (action.payload.resultCode === ResultStatus.OK) {
                    state.data.photos = action.payload.data.photos
                }
                state.status = 'succeeded'
            })
            .addCase(getProfileStatus.fulfilled, (state, action) => {
                state.profileStatus = action.payload
            })
    }
})
export const profileReducer = slice.reducer
export const { addNewPost, deletePost, setIsInitialized } = slice.actions




export const getProfile = createAsyncThunk(
    'profile/get-profile',
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await profileAPI.getProfile(userId)
            return res.data
        } catch {
            return rejectWithValue('')
        }
    }
)
export const updatePhoto = createAsyncThunk(
    'profile/updatePhoto',
    async (data: FormData, { rejectWithValue, dispatch }) => {
        dispatch(setAppStatus('pending'))
        try {
            const res = await profileAPI.updatePhoto(data)
            return res.data
        } catch {
            return rejectWithValue('')
        } finally {
            dispatch(setAppStatus('succeeded'))
        }
    }
)

export const getProfileStatus = createAsyncThunk(
    'profile/get-status',
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await profileAPI.getStatus(id)
            return res.data
        } catch {
            return rejectWithValue('')
        }
    }
)
