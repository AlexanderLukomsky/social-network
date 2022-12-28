import { useEffect } from 'react';

import Skeleton from '@mui/material/Skeleton';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../redux/redux-store';

import { User } from './user';
import { changePage, getUsersThunk } from './user-reducer';
import { UsersPagination } from './usersPagination';

import './users.scss';
import {
  selectFollowedStatus,
  selectIsAuth,
  selectUsers,
  selectUsersLoadingStatus,
} from 'common/selectors';

export const Users = () => {
  const dispatch = useAppDispatch();

  const usersLoadingStatus = useSelector(selectUsersLoadingStatus);
  const followedStatus = useSelector(selectFollowedStatus);
  const users = useSelector(selectUsers);
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    dispatch(getUsersThunk());
  }, [users.page]);

  const onChangePage = (page: number) => {
    dispatch(changePage(page));
  };

  // eslint-disable-next-line no-undef
  const skeletons: JSX.Element[] = [];
  // eslint-disable-next-line no-magic-numbers
  for (let i = 0; i < users.pageSize; i++) {
    skeletons.push(
      <Skeleton
        variant="rectangular"
        width={500}
        height={120}
        className="user"
        key={i}
      />,
    );
  }

  return (
    <div className="users">
      <div className="users__list">
        {usersLoadingStatus === 'pending'
          ? skeletons
          : users.data.map(u => (
              <User
                isAuth={isAuth}
                key={u.id}
                id={u.id}
                name={u.name}
                followed={u.followed}
                photos={u.photos}
                followedStatus={followedStatus}
              />
            ))}
      </div>
      <UsersPagination
        disabled={usersLoadingStatus === 'pending'}
        onChange={onChangePage}
        page={users.page}
        totalUsersCount={users.totalCount}
        pageSize={users.pageSize}
      />
    </div>
  );
};
