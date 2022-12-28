import { AppRootStoreType } from '../../redux/redux-store';

export const selectIsAuth = (state: AppRootStoreType) => state.auth.isAuth;
export const selectCaptchaUrl = (state: AppRootStoreType) => state.auth.captchaUrl;
export const selectAuthData = (state: AppRootStoreType) => state.auth.data;

export const selectUsers = (state: AppRootStoreType) => state.users;
export const selectApp = (state: AppRootStoreType) => state.app;
export const selectAuthUserId = (state: AppRootStoreType) => state.auth.data.id;

export const selectAppIsInitialized = (state: AppRootStoreType) =>
  state.app.isInitialized;
export const selectAppStatus = (state: AppRootStoreType) => state.app.appStatus;
// profile
export const selectProfile = (state: AppRootStoreType) => state.profile;
export const selectProfilePosts = (state: AppRootStoreType) => state.profile.posts;
export const selectProfileIsInitialized = (state: AppRootStoreType) =>
  state.profile.isInitialized;
export const selectProfileData = (state: AppRootStoreType) => state.profile.data;
export const selectProfileNotice = (state: AppRootStoreType) => state.profile.notice;

// dialogs

export const selectDialogs = (state: AppRootStoreType) => state.dialogsPage.dialogs;
export const selectMessages = (state: AppRootStoreType) => state.dialogsPage.messages;

export const selectUsersLoadingStatus = (state: AppRootStoreType) => state.users.status;
export const selectFollowedStatus = (state: AppRootStoreType) =>
  state.users.followedStatus;
