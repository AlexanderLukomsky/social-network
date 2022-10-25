import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { LoginRequestType } from '../../api/authAPI';
import { selectAuth } from '../../common/selectors/selectors';
import { useAppDispatch } from '../../redux/redux-store';

import { getCaptchaUrl, login, setCaptchaUrl } from './auth-reducer';
import './login.scss';
import { LoginForm } from './LoginForm/LoginForm';

export const LoginPage = () => {
  const { isAuth, captchaUrl } = useSelector(selectAuth);
  const dispatch = useAppDispatch();
  const loginHandler = async (formData: LoginRequestType) => {
    dispatch(login(formData));
  };
  const onChangeCaptchaHandler = () => {
    dispatch(getCaptchaUrl());
  };
  const onCloseHandler = () => {
    dispatch(setCaptchaUrl(null));
  };
  if (isAuth) {
    return <Navigate replace to="/profile" />;
  }
  return (
    <Paper elevation={3} className="login">
      <LoginForm
        onSubmit={loginHandler}
        captchaUrl={captchaUrl}
        onChangeCaptcha={onChangeCaptchaHandler}
        onClose={onCloseHandler}
      />
    </Paper>
  );
};
