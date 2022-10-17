import { usersAPI } from "../../api/userApi"
import { UsersForUserPageType, UsersPageType } from "../../common/types/StateType"
const initialState: UsersPageType = {
    users: [

    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    error: null
}
type SetUsersACType = ReturnType<typeof setUsersAC>
type FollowACType = ReturnType<typeof followAC>
type UnfollowACType = ReturnType<typeof unfollowAC>
type ChangeCurrentPageACType = ReturnType<typeof changeCurrentPageAC>
type SetTotalCountACType = ReturnType<typeof setTotalCountAC>
type ToggleIsFetchingACType = ReturnType<typeof toggleIsFetchingAC>
type ToggleFollowingProgressACType = ReturnType<typeof toggleFollowingProgressAC>

export type UsersPageActionType = SetUsersACType | FollowACType | UnfollowACType | ChangeCurrentPageACType | SetTotalCountACType | ToggleIsFetchingACType | ToggleFollowingProgressACType

export const usersReducer = (state: UsersPageType = initialState, action: UsersPageActionType) => {
    switch (action.type) {
        case 'FOLLOW': return { ...state, users: state.users.map(u => u.id === action.payload.userID ? { ...u, followed: true } : u) }
        case 'UNFOLLOW': return { ...state, users: state.users.map(u => u.id === action.payload.userID ? { ...u, followed: false } : u) }
        case 'SET-USERS': return { ...state, users: [...action.payload.users] }
        case 'CHANGE-CURRENT-PAGE': return { ...state, currentPage: action.payload.currentPage }
        case 'SET-TOTAL-COUNT': return { ...state, totalUsersCount: action.totalCount }
        case 'TOGGLE-IS-FETCHING': return { ...state, isFetching: action.payload.isFetching }
        case 'TOGGLE-IS-FOLLOW-PROGRESS':
            return action.payload.isFetching ? { ...state, followingInProgress: [...state.followingInProgress, action.payload.userID] } :
                { ...state, followingInProgress: state.followingInProgress.filter(id => id !== action.payload.userID) }
        default: return state
    }
}




//*
export const setUsersAC = (users: UsersForUserPageType[]) => {
    return {
        type: 'SET-USERS',
        payload: { users }
    } as const
}
export const changeCurrentPageAC = (currentPage: number) => {
    return {
        type: 'CHANGE-CURRENT-PAGE',
        payload: { currentPage }
    } as const
}
export const followAC = (userID: number) => {
    return {
        type: 'FOLLOW',
        payload: { userID }
    } as const
}
export const unfollowAC = (userID: number) => {
    return {
        type: 'UNFOLLOW',
        payload: { userID }
    } as const
}
export const setTotalCountAC = (totalCount: number) => {
    return {
        type: 'SET-TOTAL-COUNT',
        totalCount
    } as const
}
export const toggleIsFetchingAC = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        payload: { isFetching }
    } as const
}
export const toggleFollowingProgressAC = (userID: number, isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FOLLOW-PROGRESS',
        payload: { userID, isFetching }
    } as const
}


export const getUsersThunkCreator = (currentPage: number, pageSize: number) => (dispatch: (action: UsersPageActionType) => void) => {
    dispatch(toggleIsFetchingAC(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(data.data.items))
            dispatch(setTotalCountAC(data.data.totalCount))
            dispatch(changeCurrentPageAC(currentPage))
        })
}
export const followThunkCreator = (userID: number) => (dispatch: (action: UsersPageActionType) => void) => {
    dispatch(toggleFollowingProgressAC(userID, true))
    usersAPI.follow(userID)
        .then(data => {
            if (data.data.resultCode === 0) {
                dispatch(followAC(userID))
            }
            dispatch(toggleFollowingProgressAC(userID, false))
        })
}
export const unfollowThunkCreator = (userID: number) => (dispatch: (action: UsersPageActionType) => void) => {
    dispatch(toggleFollowingProgressAC(userID, true))
    usersAPI.unFollow(userID)
        .then(data => {
            if (data.data.resultCode === 0) {
                dispatch(unfollowAC(userID))
            }
            dispatch(toggleFollowingProgressAC(userID, false))
        })
}