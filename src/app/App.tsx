import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from '../common/components/Footer/Footer';
import { Music } from '../features/Music/Music';
import { News } from '../features/News/News';
import { Sidebar } from '../features/Sidebar/Sidebar';
import { useEffect } from 'react';
import { LoginPage } from '../features/Login/Login';
import { authThunk } from '../features/Login/auth-reducer';
import { useAppDispatch } from '../redux/redux-store';
import { Profile } from '../features/Profile/Profile';
import { Header } from '../common/components/Header/Header';
import { Users } from '../features/users/Users';
import './app.scss'
import { appPath } from '../common/routesPath/appPath';
const Settings = React.lazy(async () => ({ default: (await import('../features/Settings/Settings')).Settings }))
const Dialogs = React.lazy(async () => ({ default: (await import('../features/Dialogs/Dialogs')).Dialogs }))

export function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authThunk())
  }, [])
  return (
    <div className="app">
      <div className='container'>
        <Header />
        <div className='body'>
          <Sidebar />
          <Routes>
            <Route path={`${appPath.PROFILE}/:userId`} element={<Profile />} />
            <Route path={appPath.PROFILE} element={<Profile />} />
            <Route path={appPath.DIALOGS} element={
              <React.Suspense fallback={<div>loading...</div>}>
                <Dialogs />
              </React.Suspense>
            } />
            <Route path={appPath.USERS} element={<Users />} />
            <Route path={appPath.NEWS} element={<News />} />
            <Route path={appPath.MUSIC} element={<Music />} />
            <Route path={appPath.SETTINGS} element={
              <React.Suspense fallback={<div>loading...</div>}>
                <Settings />
              </React.Suspense>
            } />
            <Route path="/" element={<Navigate replace to="/profile" />} />
            <Route path={appPath.LOGIN} element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>

  );
}
