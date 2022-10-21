import { AppRootStoreType } from './../../redux/redux-store';

export const selectAuth = (state: AppRootStoreType) => state.auth

export const selectUsers = (state: AppRootStoreType) => state.users
export const selectApp = (state: AppRootStoreType) => state.app


export const selectAuthUserId = (state: AppRootStoreType) => state.auth.data.id

export const selectAppIsInitialized = (state: AppRootStoreType) => state.app.isInitialized
export const selectAppStatus = (state: AppRootStoreType) => state.app.appStatus


//profile
export const selectProfile = (state: AppRootStoreType) => state.profile
export const selectProfileIsInitialized = (state: AppRootStoreType) => state.profile.isInitialized
export const selectProfileData = (state: AppRootStoreType) => state.profile.data
export const selectProfileNotice = (state: AppRootStoreType) => state.profile.notice