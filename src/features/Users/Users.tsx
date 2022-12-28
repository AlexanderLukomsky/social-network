import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { selectIsAuth, selectUsers } from '../../common/selectors/selectors';
import { useAppDispatch } from '../../redux/redux-store';

import { User } from './user';
import { requestChangePage, getUsersThunk } from './user-reducer';
import { UsersPagination } from './usersPagination';
import './users.scss';

export const Users = () => {
  const dispatch = useAppDispatch();

  const users = useSelector(selectUsers);
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    dispatch(getUsersThunk());
  }, [users.requestPage]);

  const onChangePage = (page: number) => {
    dispatch(requestChangePage(page));
  };

  return (
    <div className="users">
      <div className="users__list">
        {users.data.map(u => (
          <User
            isAuth={isAuth}
            key={u.id}
            id={u.id}
            name={u.name}
            followed={u.followed}
            photos={u.photos}
          />
        ))}
      </div>
      <UsersPagination
        onChange={onChangePage}
        page={users.page}
        totalUsersCount={users.totalCount}
        pageSize={users.pageSize}
      />
    </div>
  );
};
