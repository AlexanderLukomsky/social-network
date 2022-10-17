import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import { usersAPI } from '../../api/api';
import { ProfileType } from '../../common/types/StateType';
const initialState = {
    profile: null as null | ProfileType,
    posts: [
        { id: v1(), message: 'message-1', likesCount: 5 },
        { id: v1(), message: 'message-2', likesCount: 8 },
        { id: v1(), message: 'message-3', likesCount: 11 },
        { id: v1(), message: 'message-4', likesCount: 14 },
        { id: v1(), message: 'message-5', likesCount: 17 },
    ],
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
        setUserProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
            state.profile = action.payload.profile
        }
    }
})
export const profileReducer = slice.reducer
export const { addNewPost, deletePost, setUserProfile } = slice.actions
export const setUserProfileThunkCreator = (userId: string = '19615') => (dispatch: (action: ReturnType<typeof setUserProfile>) => void) => {
    usersAPI.getUserProfile(userId)
        .then(data => {
            dispatch(setUserProfile({ profile: data.data }))
        })
}