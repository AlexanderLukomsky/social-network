import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { logoutThunk } from "../../../features/Login/auth-reducer"
import { useAppDispatch } from "../../../redux/redux-store"
import { selectAuth } from "../../selectors/selectors"

export const Header = () => {
    const auth = useSelector(selectAuth)
    const dispatch = useAppDispatch()
    const logout = () => {
        dispatch(logoutThunk())
    }
    return (
        <header className='header'>
            <img className='header__img' src="https://i.redd.it/yh47wtwmbj961.png" alt="logo" />
            <div>
                {
                    auth.isAuth ? <div>
                        {auth.data.login}
                        <div>
                            <button onClick={logout}>logout</button>
                        </div>
                    </div> : <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    )
}