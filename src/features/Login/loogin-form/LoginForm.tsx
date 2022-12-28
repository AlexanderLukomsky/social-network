import { FC } from 'react';

import { Paper, TextField, Checkbox, FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';

import './loginForm.scss';

import { Captcha } from '../../../common/components/captcha/Captcha';

import { LoginRequestType } from 'api/auth/types/AuthAPITypes';

const email = 'Нажмите кнопку войти';
const password = 'Нажмите кнопку войти';

export const LoginForm: FC<LoginFormPropsType> = ({
  onSubmitFormClick,
  captchaUrl,
  onCloseCaptchaClick,
  onGetCaptchaClick,
}) => {
  const formik = useFormik({
    initialValues: {
      email,
      password,
      rememberMe: false,
    },
    //   validationSchema: validationSchema,
    onSubmit: values => {
      if (values.email === email && values.password === password) {
        const authData = {
          email: process.env.REACT_APP_LOGIN as string,
          password: process.env.REACT_APP_PASSWORD as string,
          rememberMe: values.rememberMe,
        };
        onSubmitFormClick(authData);
        return;
      }

      onSubmitFormClick(values);
    },
  });
  return (
    <Paper
      elevation={2}
      component="form"
      onSubmit={formik.handleSubmit}
      className="login-form"
    >
      <h2 className="login-form__title">Авторизация</h2>
      <TextField
        sx={{ mb: 4 }}
        fullWidth
        id="email"
        name="email"
        label="Почта"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
      />
      <TextField
        sx={{ mb: 3 }}
        fullWidth
        id="password"
        name="password"
        label="Пароль"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
      />
      <FormControlLabel
        sx={{ mb: 4 }}
        control={
          <Checkbox
            id="rememberMe"
            name="rememberMe"
            checked={formik.values.rememberMe}
            onChange={formik.handleChange}
          />
        }
        label="Запомнить"
      />
      <Button
        className="login-form__button"
        color="primary"
        variant="contained"
        type="submit"
      >
        Войти
      </Button>
      {captchaUrl && (
        <Captcha
          onCloseCaptchaClick={onCloseCaptchaClick}
          onGetCaptchaClick={onGetCaptchaClick}
          onSubmitFormClick={captcha => {
            onSubmitFormClick({ ...formik.values, captcha });
          }}
          captchaUrl={captchaUrl}
        />
      )}
    </Paper>
  );
};
type LoginFormPropsType = {
  onSubmitFormClick: (formData: LoginRequestType) => void;
  captchaUrl: string | null;
  onGetCaptchaClick: () => void;
  onCloseCaptchaClick: () => void;
};
