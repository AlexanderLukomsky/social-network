import { FC } from 'react'
import { Paper, TextField, Checkbox, FormControlLabel } from '@mui/material'
import { useFormik } from 'formik'
import Button from '@mui/material/Button';
import './loginForm.scss'
import { Captcha } from '../../../common/components/captcha/Captcha';
import { LoginRequestType } from '../../../api/authAPI';
const validationSchema = {}

export const LoginForm: FC<LoginFormPropsType> = ({ onSubmit, captchaUrl, onClose, onChangeCaptcha }) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        //   validationSchema: validationSchema,
        onSubmit: (values) => {
            onSubmit(values)
        },
    });
    return (
        <Paper elevation={2} component={'form'} onSubmit={formik.handleSubmit} className='login-form'>
            <h2 className='login-form__title'>Авторизация</h2>
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
                    />}
                label="Запомнить"
            />
            <Button className='login-form__button' color="primary" variant="contained" type="submit">
                Войти
            </Button>
            {
                captchaUrl &&
                <Captcha
                    onClose={onClose}
                    onChangeCaptcha={onChangeCaptcha}
                    onSubmit={(captcha) => { onSubmit({ ...formik.values, captcha }) }}
                    captchaUrl={captchaUrl}
                />
            }
        </Paper>
    )
}
type LoginFormPropsType = {
    onSubmit: (formData: LoginRequestType) => void
    captchaUrl: string | null
    onChangeCaptcha: () => void
    onClose: () => void
}