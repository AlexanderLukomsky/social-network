import { StatusesTypes } from '../types/commonTypes';
import { Nullable } from '../types/Nullable';

import { AuthUserDataType } from 'api/auth/types/AuthAPITypes';
import { AppStateType } from 'app/app-reducer';
import { ProfileType } from 'common/types/profileTypes';
import { DialogUserType, MessagesType } from 'common/types/StateType';
import { PostType, ProfileStateType } from 'features/profile/profile-reducer';
import { UsersType } from 'features/users/user-reducer';
import { AppRootStoreType } from 'redux/redux-store';

export const selectIsAuth = (state: AppRootStoreType): boolean => state.auth.isAuth;
export const selectCaptchaUrl = (state: AppRootStoreType): Nullable<string> =>
  state.auth.captchaUrl;
export const selectAuthData = (state: AppRootStoreType): AuthUserDataType =>
  state.auth.data;

export const selectUsers = (state: AppRootStoreType): UsersType => state.users;
export const selectApp = (state: AppRootStoreType): AppStateType => state.app;
export const selectAuthUserId = (state: AppRootStoreType): number => state.auth.data.id;

export const selectAppIsInitialized = (state: AppRootStoreType): boolean =>
  state.app.isInitialized;
export const selectAppStatus = (state: AppRootStoreType): StatusesTypes =>
  state.app.appStatus;
// profile
export const selectProfile = (state: AppRootStoreType): ProfileStateType => state.profile;
export const selectProfilePosts = (state: AppRootStoreType): PostType[] =>
  state.profile.posts;
export const selectProfileIsInitialized = (state: AppRootStoreType): boolean =>
  state.profile.isInitialized;
export const selectProfileData = (state: AppRootStoreType): ProfileType =>
  state.profile.data;
export const selectProfileNotice = (state: AppRootStoreType): string =>
  state.profile.notice;

// dialogs

export const selectDialogsUsers = (state: AppRootStoreType): DialogUserType[] =>
  state.dialogsPage.users;
export const selectMessages = (state: AppRootStoreType): MessagesType =>
  state.dialogsPage.messages;

export const selectUsersLoadingStatus = (state: AppRootStoreType): StatusesTypes =>
  state.users.status;
export const selectFollowedStatus = (state: AppRootStoreType): StatusesTypes =>
  state.users.followedStatus;
