import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CustomProgress } from '../../common/components/CustomProgress/CustomProgress'
import { selectAuth, selectProfileIsInitialized } from '../../common/selectors/selectors'
import { useAppDispatch } from '../../redux/redux-store'
import { Posts } from './posts/Posts'
import { getProfile, getProfileStatus, setIsInitialized } from './profile-reducer'
import './profile.scss'
import { ProfileData } from './profileData/ProfileData'
export const Profile = () => {
    const isInitialized = useSelector(selectProfileIsInitialized)
    const { isAuth, data } = useSelector(selectAuth)
    const dispatch = useAppDispatch()
    const { userId } = useParams<{ userId: string }>()
    useEffect(() => {
        if (userId) {
            dispatch(getProfile(userId))
            dispatch(getProfileStatus(userId))
        }
        else if (isAuth && data.id) {
            dispatch(getProfile(data.id.toString()))
            dispatch(getProfileStatus(data.id.toString()))
        }
        return () => { dispatch(setIsInitialized(false)) }
    }, [dispatch, userId, data.id, isAuth])
    if (!isInitialized) { return <CustomProgress /> }
    return (
        <div className='profile'>
            <ProfileData />
            <Posts />
        </div>
    )
}