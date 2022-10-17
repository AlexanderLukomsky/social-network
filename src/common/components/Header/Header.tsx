
import { NavLink } from "react-router-dom"
import { AuthStateType } from "../../types/StateType"

type HeaderPropsType = { state: AuthStateType, logout: () => void }
export const Header = (props: HeaderPropsType) => {
    return (
        <header className='header'>
            <img className='header__img' src="https://i.redd.it/yh47wtwmbj961.png" alt="logo" />
            <div>
                {
                    props.state.isAuth ? <div>
                        {props.state.data.login}
                        <div>
                            <button onClick={props.logout}>logout</button>
                        </div>
                    </div> : <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>
    )
}