import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from "redux";
import { AuthActionType, authReducer } from './auth-reducer';
import { DialogsActionType, dialogsReducer } from './dialogs-reducer';
import { ProfileActionType, profileReducer } from './profile-reducer';
import { profileStatusReducer } from './profileStatus-reducer';
import { sidebarReducer } from './sidebar-reducer';
import { UsersPageActionType, usersReducer } from './user-reducer';
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
export type ActionType = ProfileActionType | DialogsActionType | UsersPageActionType | AuthActionType


