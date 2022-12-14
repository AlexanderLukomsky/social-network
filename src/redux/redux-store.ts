import { configureStore, ThunkAction } from '@reduxjs/toolkit';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { AnyAction, combineReducers } from 'redux';

import { appReducer } from '../app/app-reducer';
import { dialogsReducer } from '../features/dialogs/dialogs-reducer';
import { authReducer } from '../features/login/auth-reducer';
import { profileReducer } from '../features/profile/profile-reducer';
import { usersReducer } from '../features/users/user-reducer';

const rootReducer = combineReducers({
  app: appReducer,
  profile: profileReducer,
  dialogsPage: dialogsReducer,
  users: usersReducer,
  auth: authReducer,
});

export const store = configureStore({ reducer: rootReducer });
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppRootStoreType = ReturnType<typeof rootReducer>;
// export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStoreType,
  unknown,
  AnyAction
>;
export type ActionType = AnyAction;
