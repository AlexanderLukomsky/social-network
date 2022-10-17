import { AppRootStoreType } from './../../redux/redux-store';

export const selectAuth = (state: AppRootStoreType) => state.auth
export const selectProfile = (state: AppRootStoreType) => state.profile
export const selectUsers = (state: AppRootStoreType) => state.users
