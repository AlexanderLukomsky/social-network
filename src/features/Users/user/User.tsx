import { FC } from 'react';

import { Button, Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';

import usersDefaultPhoto from '../../../common/assets/usersImg.jpg';
import { useAppDispatch } from '../../../redux/redux-store';
import { followThunk, unfollowThunk } from '../user-reducer';

import './user.scss';
import { StatusesTypes } from 'common/types/commonTypes';

export const User: FC<UserPropsType> = ({
  id,
  name,
  followed,
  photos,
  isAuth,
  followedStatus,
}) => {
  const dispatch = useAppDispatch();

  const onUnfollowButtonClick = () => {
    dispatch(unfollowThunk(id));
  };

  const onFollowButtonClick = () => {
    dispatch(followThunk(id));
  };

  return (
    <Paper elevation={5} className="user">
      <div className="user__imageBox">
        <NavLink to={`/profile/${id}`}>
          <img
            className="user__image"
            src={
              photos.small || photos.small
                ? photos.small || photos.small
                : usersDefaultPhoto
            }
            alt="description"
          />
        </NavLink>
      </div>

      <div className="user__about">
        <NavLink className="user__name" to={`/profile/${id}`}>
          {name}
        </NavLink>

        {followed ? (
          <Button
            disabled={!isAuth || followedStatus === 'pending'}
            color="error"
            onClick={onUnfollowButtonClick}
          >
            Отписаться
          </Button>
        ) : (
          <Button
            disabled={!isAuth || followedStatus === 'pending'}
            color="success"
            onClick={onFollowButtonClick}
          >
            Подписаться
          </Button>
        )}
      </div>
    </Paper>
  );
};
type UserPropsType = {
  id: number;
  name: string;
  followed: boolean;
  photos: { small: null | string; large: null | string };
  isAuth: boolean;
  followedStatus: StatusesTypes;
};
