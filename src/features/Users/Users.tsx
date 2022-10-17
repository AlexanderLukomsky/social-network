import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUsers } from '../../common/selectors/selectors';
import { useAppDispatch } from '../../redux/redux-store';
import { requestChangePage, getUsersThunk } from './user-reducer';
import { User } from './user/User';
import './users.scss';
import { UsersPagination } from './usersPagination/UsersPagination';
export const Users = () => {
    const dispatch = useAppDispatch()
    const users = useSelector(selectUsers)
    const onChangePage = (page: number) => { dispatch(requestChangePage(page)) }
    useEffect(() => {
        dispatch(getUsersThunk())
    }, [users.requestPage])
    return (
        <div className="users">
            <div className='users__list'>
                {
                    users.data.map(u =>
                        <User
                            key={u.id}
                            id={u.id}
                            name={u.name}
                            followed={u.followed}
                            photos={u.photos}
                        />
                    )
                }
            </div>
            <UsersPagination
                onChange={onChangePage}
                page={users.page}
                totalUsersCount={users.totalUsersCount}
                pageSize={users.pageSize}
            />
        </div>
    )
}