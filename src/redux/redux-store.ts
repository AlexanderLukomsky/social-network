import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { AnyAction, combineReducers } from "redux";
import { AuthActionType, authReducer } from '../features/Login/auth-reducer';
import { DialogsActionType, dialogsReducer } from '../features/Dialogs/dialogs-reducer';
import { profileReducer } from '../features/Profile/profile-reducer';
import { profileStatusReducer } from '../features/Profile/profileStatus-reducer';
import { sidebarReducer } from '../features/Sidebar/sidebar-reducer';
import { UsersPageActionType, usersReducer } from '../features/Users/user-reducer';
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
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
export type ActionType = DialogsActionType | UsersPageActionType | AuthActionType | AnyAction


