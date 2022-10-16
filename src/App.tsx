import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Music } from './components/Music/Music';
import { News } from './components/News/News';
import { Settings } from './components/Settings/Settings';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useEffect } from 'react';
import { HeaderContainer } from './components/Header/HeaderContainer';
import { LoginPage } from './components/Login/Login';
import { UsersContainer } from './components/Users/UsersContainer';
import { authThunkCreator } from './redux/auth-reducer';
import { useAppDispatch } from './redux/redux-store';
import { Profile } from './components/Profile/Profile';
import { Dialogs } from './components/Dialogs/Dialogs';
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
