import { Button, Paper } from '@mui/material';
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import usersDefaultPhoto from '../../../common/assets/usersImg.jpg';
import { useAppDispatch } from '../../../redux/redux-store';
import { followThunk, unfollowThunk } from '../user-reducer';
import './user.scss'
export const User: FC<UserPropsType> = ({ id, name, followed, photos }) => {
   const dispatch = useAppDispatch()
   const unfollow = () => {
      dispatch(unfollowThunk(id))
   }
   const follow = () => {
      dispatch(followThunk(id))
   }
   return (
      <Paper elevation={5} className='user'>
         <div className='user__imageBox'>
            <NavLink to={`/profile/${id}`}>
               <img
                  className='user__image'
                  src={photos.small || photos.small ? photos.small || photos.small : usersDefaultPhoto}
                  alt="description"
               />
            </NavLink>
         </div>

         <div className='user__about'>
            <div className='user__name'>
               {name}
            </div>
            {
               followed ?
                  <Button color='error' onClick={unfollow}>Отписаться</Button> :
                  <Button color='success' onClick={follow}>Подписаться</Button>
            }
         </div>
      </Paper>
   )
}
type UserPropsType = {
   id: number
   name: string
   followed: boolean
   photos: { small: null | string, large: null | string }
}