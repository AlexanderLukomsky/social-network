import { FC } from 'react'
import { Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import Button from '@mui/material/Button';
import './loginForm.scss'
const validationSchema = {}

export const LoginForm: FC<LoginFormPropsType> = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
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
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                sx={{ mb: 5 }}
                fullWidth
                id="password"
                name="password"
                label="Пароль"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button className='login-form__button' color="primary" variant="contained" type="submit">
                Войти
            </Button>
        </Paper>
    )
}
type LoginFormPropsType = {
    onSubmit: (formData: { email: string, password: string }) => void
}