import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/redux-store';

import { getCaptchaUrl, login, setCaptchaUrl } from './auth-reducer';
import './login.scss';
import { LoginForm } from './loogin-form/LoginForm';

import { LoginRequestType } from 'api/auth/types/AuthAPITypes';
import { selectCaptchaUrl, selectIsAuth } from 'common/selectors';

export const Login = () => {
  const dispatch = useAppDispatch();

  const isAuth = useSelector(selectIsAuth);
  const captchaUrl = useSelector(selectCaptchaUrl);
  const handleSubmitFormClick = async (formData: LoginRequestType) => {
    dispatch(login(formData));
  };

  const handleGetCaptchaClick = () => {
    dispatch(getCaptchaUrl());
  };

  const handleCloseCaptchaClick = () => {
    dispatch(setCaptchaUrl(null));
  };

  if (isAuth) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <Paper elevation={3} className="login">
      <LoginForm
        onSubmitFormClick={handleSubmitFormClick}
        captchaUrl={captchaUrl}
        onGetCaptchaClick={handleGetCaptchaClick}
        onCloseCaptchaClick={handleCloseCaptchaClick}
      />
    </Paper>
  );
};
