import { AppRootStoreType } from './../../redux/redux-store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { GetUsersParamType, usersAPI } from "../../api/userApi"
import { UsersDataType, UsersPageType } from "../../common/types/StateType"
import { AppThunk } from "../../redux/redux-store"
const initialState: UsersPageType = {
    data: [
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    error: null
}
const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        changeCurrentPage: (state, action: PayloadAction<number>) => { state.currentPage = action.payload },
        toggleFollowingProgress: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsersThunk.fulfilled, (state, action) => {
            state.data = action.payload
        })
    }

})

export const usersReducer = slice.reducer
const { changeCurrentPage } = slice.actions

export const usersReduce2 = (state: any, tion: any) => {
    switch (tion.type) {
        // case 'FOLLOW': return { ...state, users: state.data.map(u => u.id === tion.payload.userID ? { ...u, followed: true } : u) }
        // case 'UNFOLLOW': return { ...state, users: state.data.map(u => u.id === tion.payload.userID ? { ...u, followed: false } : u) }
        case 'SET-USERS': return { ...state, data: [...tion.payload.users] }

        case 'SET-TOTAL-COUNT': return { ...state, totalUsersCount: tion.totalCount }
        case 'TOGGLE-IS-FETCHING': return { ...state, isFetching: tion.payload.isFetching }
        // case 'TOGGLE-IS-FOLLOW-PROGRESS':
        //     return tion.payload.isFetching ? { ...state, followingInProgress: [...state.followingInProgress, tion.payload.userID] } :
        //         { ...state, followingInProgress: state.followingInProgress.filter(id => id !== tion.payload.userID) }
        default: return state
    }
}
export const setUsers = (users: UsersDataType[]) => (
    {
        type: 'SET-USERS',
        payload: { users }
    } as const
)

export const follow = (userID: number) => (
    {
        type: 'FOLLOW',
        payload: { userID }
    } as const
)
export const unfollow = (userID: number) => (
    {
        type: 'UNFOLLOW',
        payload: { userID }
    } as const
)
export const setTotalCount = (totalCount: number) => (
    {
        type: 'SET-TOTAL-COUNT',
        totalCount
    } as const
)
export const toggleIsFetching = (isFetching: boolean) => (
    {
        type: 'TOGGLE-IS-FETCHING',
        payload: { isFetching }
    } as const
)
export const toggleFollowingProgress = (userID: number, isFetching: boolean) => (
    {
        type: 'TOGGLE-IS-FOLLOW-PROGRESS',
        payload: { userID, isFetching }
    } as const
)

export const getUsersThunk = createAsyncThunk(
    'users/getUsers',
    async (_, { rejectWithValue, getState }) => {
        const { users } = getState() as AppRootStoreType
        const params = { currentPage: users.currentPage, pageSize: users.pageSize }
        try {
            const res = await usersAPI.getUsers(params)
            return res.data.items
        } catch {
            return rejectWithValue('')
        }
    }
)


export const getUsersThunk2 = (currentPage: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    const res = await usersAPI.getUsers({ currentPage, pageSize })
    console.log(res)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(res.data.items))
    dispatch(setTotalCount(res.data.totalCount))
    dispatch(changeCurrentPage(currentPage))
}




////!
export const followThunkCreator = (userID: number): AppThunk => (dispatch) => {
    dispatch(toggleFollowingProgress(userID, true))
    usersAPI.follow(userID)
        .then(data => {
            if (data.data.resultCode === 0) {
                dispatch(follow(userID))
            }
            dispatch(toggleFollowingProgress(userID, false))
        })
}
export const unfollowThunkCreator = (userID: number): AppThunk => (dispatch) => {
    dispatch(toggleFollowingProgress(userID, true))
    usersAPI.unFollow(userID)
        .then(data => {
            if (data.data.resultCode === 0) {
                dispatch(unfollow(userID))
            }
            dispatch(toggleFollowingProgress(userID, false))
        })
}