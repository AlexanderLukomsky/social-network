import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../redux/redux-store';

import { initializeApp } from './app-reducer';

import { Footer, Header } from 'common/components';
import { AppRoutes } from 'common/routes';
import './app.scss';
import { selectAppIsInitialized } from 'common/selectors';
import { Sidebar } from 'features';

export function App() {
  const dispatch = useAppDispatch();

  const isInitialized = useSelector(selectAppIsInitialized);

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
