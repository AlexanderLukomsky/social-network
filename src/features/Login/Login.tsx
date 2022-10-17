import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../../common/selectors/selectors";
import { useAppDispatch } from "../../redux/redux-store";
import { loginThunk } from "./auth-reducer";
import { LoginForm } from "./LoginForm/LoginForm";

export const LoginPage = () => {
    const { isAuth } = useSelector(selectAuth)
    const dispatch = useAppDispatch()
    const auth = (formData: { login: string, password: string }) => {
        dispatch(loginThunk(formData.login, formData.password))
    }
    return (
        isAuth ? <Navigate replace to="/profile" /> :
            <div>
                <h1>Login</h1>
                <LoginForm onSubmit={auth} error={''} />
            </div>
    )
}