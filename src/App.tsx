import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './common/components/Footer/Footer';
import { Music } from './features/Music/Music';
import { News } from './features/News/News';
import { Settings } from './features/Settings/Settings';
import { Sidebar } from './features/Sidebar/Sidebar';
import { useEffect } from 'react';
import { HeaderContainer } from './common/components/Header/HeaderContainer';
import { LoginPage } from './features/Login/Login';
import { UsersContainer } from './features/Users/UsersContainer';
import { authThunkCreator } from './redux/auth-reducer';
import { useAppDispatch } from './redux/redux-store';
import { Dialogs } from './features/Dialogs/Dialogs';
import { Profile } from './features/Profile/Profile';
export function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(authThunkCreator())
  }, [])
  return (
    <div className="App">
      <div className='app-wrapper'>
        <HeaderContainer />
        <nav className='sidebar'>
          <Sidebar />
        </nav>
        <div className='body'>
          <Routes>
            <Route path='/profile/:userId' element={<Profile />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/dialogs' element={<Dialogs />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
            <Route path="/" element={<Navigate replace to="/profile" />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>

  );
}
