import { Button, LinearProgress } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { appPath } from 'common/routesPath';
import { selectAppStatus, selectIsAuth } from 'common/selectors';
import { logout } from 'features/login/auth-reducer';
import { useAppDispatch } from 'redux/redux-store';
import './header.scss';

export const Header = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const appStatus = useSelector(selectAppStatus);
  const isAuth = useSelector(selectIsAuth);

  const getLocationText = (path: string) => {
    switch (path) {
      case appPath.PROFILE:
        return 'Профиль';
      case appPath.DIALOGS:
        return 'Сообщения';
      case appPath.USERS:
        return 'Пользователи';
      case appPath.NEWS:
        return 'Новости';
      case appPath.MUSIC:
        return 'Музыка';
      case appPath.SETTINGS:
        return 'Настройки';
      default:
        return '';
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <AppBar className="header">
      <Toolbar>
        {isAuth ? (
          <>
            <Typography variant="h6" component="div">
              {getLocationText(location.pathname)}
            </Typography>
            <Button
              disabled={appStatus === 'pending'}
              onClick={logoutHandler}
              size="large"
              component={NavLink}
              to={appPath.LOGIN}
              color="inherit"
              variant="text"
            >
              Выйти
            </Button>
          </>
        ) : (
          <Button
            disabled={appStatus === 'pending'}
            component={NavLink}
            to={appPath.LOGIN}
            size="medium"
            color="inherit"
            variant="text"
          >
            Войти
          </Button>
        )}
      </Toolbar>
      {appStatus === 'pending' && <LinearProgress color="success" />}
    </AppBar>
  );
};
