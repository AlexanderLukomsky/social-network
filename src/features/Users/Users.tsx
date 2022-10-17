import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import usersDefaultPhoto from '../../assets/usersImg.jpg';
import { selectUsers } from '../../common/selectors/selectors';
import { useAppDispatch } from '../../redux/redux-store';
import { followThunkCreator, getUsersThunk, unfollowThunkCreator } from './user-reducer';
import { UsersPagination } from './usersPagination/UsersPagination';

export const Users = () => {
    const dispatch = useAppDispatch()
    const users = useSelector(selectUsers)
    let pagesCount = Math.ceil(users.totalUsersCount / users.pageSize)
    let pagesCountArr: number[] = []
    for (let page = 1; page <= pagesCount; page++) {
        pagesCountArr = [...pagesCountArr, page]
    }
    const unfollow = (userID: number) => {
        unfollowThunkCreator(userID)
    }
    const follow = (userID: number) => {
        followThunkCreator(userID)
    }

    const changeCurrentPage = (page: number) => {
        getUsersThunk()
    }

    useEffect(() => {
        dispatch(getUsersThunk())
    }, [])
    return (
        <div className="users">
            <UsersPagination />
            <ul className="users__list_pages">
                {users.currentPage !== 1 && <li onClick={() => { changeCurrentPage(1) }}>
                    1
                </li>}
                {
                    pagesCountArr.splice(
                        users.currentPage - 1, users.currentPage + 8 - users.currentPage
                    ).map((p, i) =>
                        <li key={i} className={p === users.currentPage ? 'users__selected' : ''}
                            onClick={() => { changeCurrentPage(p) }} >
                            {p}
                        </li>
                    )}
            </ul>
            {users.data.map(u =>
                <div key={u.id}>
                    <div>
                        <NavLink to={`/profile/${u.id}`}><img src={u.photos.small || u.photos.small ? u.photos.small || u.photos.small : usersDefaultPhoto} alt="description" /></NavLink>
                    </div>
                    {u.name}
                    {
                        u.followed ?
                            <button disabled={users.followingInProgress.some(id => id === u.id)} onClick={() => unfollow(u.id)}>Unfollow</button> :
                            <button disabled={users.followingInProgress.some(id => id === u.id)} onClick={() => follow(u.id)}>Follow</button>
                    }

                </div>)}
        </div>
    )
}