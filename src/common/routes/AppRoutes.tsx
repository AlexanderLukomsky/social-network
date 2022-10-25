import React from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { appPath } from 'common/routesPath';
import { Login, Music, News, Profile, Users } from 'features';

const Settings = React.lazy(async () => ({ default: (await import('features')).Settings }));
const Dialogs = React.lazy(async () => ({ default: (await import('features')).Dialogs }));
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
    <Route path={appPath.LOGIN} element={<Login />} />
  </Routes>
);
