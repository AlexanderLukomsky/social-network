import { FC } from 'react'
import { NavLink } from 'react-router-dom';
import usersDefaultPhoto from '../../assets/usersImg.jpg';
import { UsersForUserPageType } from '../../common/types/StateType';

export const Users: FC<UsersPropsType> = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pagesCountArr: number[] = []
    for (let page = 1; page <= pagesCount; page++) {
        pagesCountArr = [...pagesCountArr, page]
    }




    const unfollow = (userID: number) => {
        props.unfollowThunkCreator(userID)
    }
    const follow = (userID: number) => {
        props.followThunkCreator(userID)
    }
    return (
        <div className="users">
            <ul className="users__list_pages">
                {props.currentPage !== 1 && <li onClick={() => { props.changeCurrentPage(1) }}>
                    1
                </li>}
                {
                    pagesCountArr.splice(
                        props.currentPage - 1, props.currentPage + 8 - props.currentPage
                    ).map((p, i) =>
                        <li key={i} className={p === props.currentPage ? 'users__selected' : ''}
                            onClick={() => { props.changeCurrentPage(p) }} >
                            {p}
                        </li>
                    )}
            </ul>
            {props.users.map(u =>
                <div key={u.id}>
                    <div>
                        <NavLink to={`/profile/${u.id}`}><img src={u.photos.small || u.photos.small ? u.photos.small || u.photos.small : usersDefaultPhoto} alt="description" /></NavLink>
                    </div>
                    {u.name}
                    {
                        u.followed ?
                            <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => unfollow(u.id)}>Unfollow</button> :
                            <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => follow(u.id)}>Follow</button>
                    }

                </div>)}
        </div>
    )
}
type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: UsersForUserPageType[]
    changeCurrentPage: (currentPage: number) => void
    unfollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
    followingInProgress: number[]
}