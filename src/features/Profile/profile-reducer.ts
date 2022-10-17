import { ActionType } from '../../redux/redux-store';
import { ProfileType } from '../../common/types/StateType';
import { v1 } from 'uuid';
import { ProfilePageType } from '../../common/types/StateType';
import { usersAPI } from '../../API/api';
type AddPostACType = ReturnType<typeof addPostAC>
type SetUserProfileACType = ReturnType<typeof setUserProfileAC>
export type ProfileActionType = AddPostACType | SetUserProfileACType
const profilePage: ProfilePageType = {
    profile: null,
    posts: [
        { id: v1(), message: 'message-1', likesCount: 5 },
        { id: v1(), message: 'message-2', likesCount: 8 },
        { id: v1(), message: 'message-3', likesCount: 11 },
        { id: v1(), message: 'message-4', likesCount: 14 },
        { id: v1(), message: 'message-5', likesCount: 17 },
    ],
}
export const profileReducer = (state: ProfilePageType = profilePage, action: ProfileActionType) => {
    switch (action.type) {
        case 'ADD-POST':
            return { ...state, posts: [{ id: v1(), message: action.payload.newPostText, likesCount: 1 }, ...state.posts] }
        case 'SET-USER-PROFILE': return { ...state, profile: action.profile }
        default: return state
    }
}
export const addPostAC = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        payload: { newPostText }
    } as const
}
export const setUserProfileAC = (profile: ProfileType) => {
    return {
        type: 'SET-USER-PROFILE',
        profile
    } as const
}
export const setUserProfileThunkCreator = (userId: string = '19615') => (dispatch: (action: ProfileActionType) => void) => {
    usersAPI.getUserProfile(userId)
        .then(data => dispatch(setUserProfileAC(data)))
}
