import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AnyAction, combineReducers } from "redux";
import { dialogsReducer } from '../features/Dialogs/dialogs-reducer';
import { authReducer } from '../features/Login/auth-reducer';
import { profileReducer } from '../features/Profile/profile-reducer';
import { profileStatusReducer } from '../features/Profile/profileStatus-reducer';
import { sidebarReducer } from '../features/Sidebar/sidebar-reducer';
import { usersReducer } from '../features/Users/user-reducer';
const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    profilestatus: profileStatusReducer,
})
export type AppStateType = ReturnType<typeof rootReducer>

export const store = configureStore({ reducer: rootReducer })

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
export type AppRootStoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStoreType> = useSelector
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStoreType, unknown, AnyAction>
export type ActionType = AnyAction


