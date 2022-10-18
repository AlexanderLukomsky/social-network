import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { selectAuth, selectProfile } from '../../common/selectors/selectors'
import { useAppDispatch } from '../../redux/redux-store'
import { Posts } from './posts/Posts'
import { setUserProfile } from './profile-reducer'
import { ProfileInfo } from './profileInfo/ProfileInfo'
import { updateProfileStatusThunk } from './profileStatus-reducer'
import './profile.scss'
import { appPath } from '../../common/routesPath/appPath'
export const Profile = () => {
    const profile = useSelector(selectProfile)
    const auth = useSelector(selectAuth)
    const dispatch = useAppDispatch()
    const { userId } = useParams<{ userId: string }>()
    useEffect(() => {
        if (userId) {
            dispatch(setUserProfile(userId))
        }

    }, [userId])
    // if (!auth.isAuth && !userId) { return <Navigate to={appPath.LOGIN} /> }
    if (!profile) { return <div></div> }
    return (
        <div className='profile'>
            <ProfileInfo
                profile={profile.profile}
                updateStatus={updateProfileStatusThunk}
            />
            {/* <Posts /> */}
        </div>
    )
}