import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Footer } from '../common/components/Footer/Footer';
import { Header } from '../common/components/Header/Header';
import { AppRoutes } from '../common/routes/AppRoutes';
import { selectAppIsInitialized } from '../common/selectors/selectors';
import { Sidebar } from '../features/Sidebar/Sidebar';
import { useAppDispatch } from '../redux/redux-store';

import { initializeApp } from './app-reducer';
import './app.scss';

export function App() {
  const isInitialized = useSelector(selectAppIsInitialized);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeApp());
  }, [dispatch]);
  return (
    <div className="app">
      <div className="container">
        <Header />
        {isInitialized && (
          <div className="body">
            <Sidebar />
            <AppRoutes />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
