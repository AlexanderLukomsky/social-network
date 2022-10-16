import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { setUserProfileThunkCreator } from '../../redux/profile-reducer'
import { updateProfileStatusThunk } from '../../redux/profileStatus-reducer'
import { useAppDispatch, useAppSelector } from '../../redux/redux-store'
import { ProfileType } from '../types/StateType'
import { UserPostsContainer } from './Posts/UserPostsContainer'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'

export const Profile = () => {
    const profile = useAppSelector(state => state.profilePage.profile)
    const dispatch = useAppDispatch()
    const { userId } = useParams<{ userId: string }>()

    useEffect(() => {
        dispatch(setUserProfileThunkCreator(userId))
    }, [userId])
    if (!profile) { return <div></div> }
    return (
        <div className='profile'>
            <ProfileInfo profile={profile} updateStatus={updateProfileStatusThunk} />
            <UserPostsContainer />

        </div>
    )
}