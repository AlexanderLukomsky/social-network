import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { authAPI } from "../../API/api";
import { authThunkCreator } from "./auth-reducer";
import { useAppDispatch } from "../../redux/redux-store";
import { LoginForm } from "./LoginForm/LoginForm"

export const LoginPage = () => {
    const [authMe, setAuthMe] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()
    const auth = (formData: { login: string, password: string }) => {
        authAPI.login(formData.login, formData.password)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(authThunkCreator())
                    setAuthMe(true)
                }
                else {
                    setError(response.data.messages)
                }
            })
    }
    return (
        authMe ? <Navigate replace to="/profile" /> :
            <div>
                <h1>Login</h1>
                <LoginForm onSubmit={auth} error={error} />
            </div>
    )
}