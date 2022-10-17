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
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/dialogs' element={
              <React.Suspense fallback={<div>loading...</div>}>
                <Dialogs />
              </React.Suspense>
            } />
            <Route path='/users' element={<Users />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={
              <React.Suspense fallback={<div>loading...</div>}>
                <Settings />
              </React.Suspense>
            } />
            <Route path="/" element={<Navigate replace to="/profile" />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>

  );
}
