import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../../features/Login/Login';
import { Music } from '../../features/Music/Music';
import { News } from '../../features/News/News';
import { Profile } from '../../features/profile/Profile';
import { Users } from '../../features/users/Users';
import { appPath } from '../routesPath/appPath';

const Settings = React.lazy(async () => ({ default: (await import('../../features/Settings/Settings')).Settings }));
const Dialogs = React.lazy(async () => ({ default: (await import('../../features/Dialogs/Dialogs')).Dialogs }));
export const AppRoutes = () => (
  <Routes>
    <Route path={`${appPath.PROFILE}/:userId`} element={<Profile />} />
    <Route path={appPath.PROFILE} element={<Profile />} />
    <Route
      path={appPath.DIALOGS}
      element={
        <React.Suspense fallback={<div>loading...</div>}>
          <Dialogs />
        </React.Suspense>
      }
    />
    <Route path={appPath.USERS} element={<Users />} />
    <Route path={appPath.NEWS} element={<News />} />
    <Route path={appPath.MUSIC} element={<Music />} />
    <Route
      path={appPath.SETTINGS}
      element={
        <React.Suspense fallback={<div>loading...</div>}>
          <Settings />
        </React.Suspense>
      }
    />
    <Route path="/" element={<Navigate replace to="/profile" />} />
    <Route path={appPath.LOGIN} element={<LoginPage />} />
  </Routes>
);
