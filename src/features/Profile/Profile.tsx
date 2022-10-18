import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectProfile } from '../../common/selectors/selectors'
import { useAppDispatch } from '../../redux/redux-store'
import { Posts } from './posts/Posts'
import { setUserProfileThunkCreator } from './profile-reducer'
import { ProfileInfo } from './profileInfo/ProfileInfo'
import { updateProfileStatusThunk } from './profileStatus-reducer'

export const Profile = () => {

    const profile = useSelector(selectProfile)
    const dispatch = useAppDispatch()
    const { userId } = useParams<{ userId: string }>()

    useEffect(() => {
        dispatch(setUserProfileThunkCreator(userId))
    }, [userId])

    if (!profile) { return <div></div> }
    return (
        <div className='profile'>
            <ProfileInfo profile={profile.profile} updateStatus={updateProfileStatusThunk} />
            <Posts />

        </div>
    )
}