import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../../common/selectors/selectors";
import { useAppDispatch } from "../../redux/redux-store";
import { loginThunk } from "./auth-reducer";
import { LoginForm } from "./LoginForm/LoginForm";
import './login.scss'
import { Paper } from "@mui/material";
export const LoginPage = () => {
    const { isAuth } = useSelector(selectAuth)
    const dispatch = useAppDispatch()
    const auth = (formData: { email: string, password: string }) => {
        dispatch(loginThunk({ email: formData.email, password: formData.password, rememberMe: true }))
    }
    if (isAuth) { return <Navigate replace to="/profile" /> }
    return (
        <Paper elevation={3} className='login'>
            <LoginForm onSubmit={auth} />
        </Paper>
    )
}