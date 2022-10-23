import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { useSelector } from "react-redux"
import { NavLink, useLocation } from "react-router-dom"
import { logout } from "../../../features/Login/auth-reducer"
import { useAppDispatch } from "../../../redux/redux-store"
import { appPath } from '../../routesPath/appPath'
import { selectAppStatus, selectAuth } from "../../selectors/selectors"
import { LinearProgress } from '@mui/material';
import './header.scss'

export const Header = () => {
   const location = useLocation()
   const appStatus = useSelector(selectAppStatus)
   const auth = useSelector(selectAuth)
   const dispatch = useAppDispatch()
   const logoutHandler = () => {
      dispatch(logout())
   }
   const getLocationText = (path: string) => {
      switch (path) {
         case appPath.PROFILE: return 'Профиль'
         case appPath.DIALOGS: return 'Сообщения'
         case appPath.USERS: return 'Пользователи'
         case appPath.NEWS: return 'Новости'
         case appPath.MUSIC: return 'Музыка'
         case appPath.SETTINGS: return 'Настройки'
         default: return ''
      }
   }
   return (
      <AppBar className='header' >
         <Toolbar >
            {
               auth.isAuth ?
                  <>
                     <Typography variant="h6" component="div" >
                        {getLocationText(location.pathname)}
                     </Typography>
                     <Button disabled={appStatus === 'pending'} onClick={logoutHandler} size="large" component={NavLink} to={appPath.LOGIN} color="inherit" variant="text">
                        Выйти
                     </Button>
                  </>
                  :
                  <Button disabled={appStatus === 'pending'} component={NavLink} to={appPath.LOGIN} size="medium" color="inherit" variant="text">
                     Войти
                  </Button>
            }
         </Toolbar>
         {appStatus === 'pending' && <LinearProgress color='success' />}
      </AppBar>
   );
}