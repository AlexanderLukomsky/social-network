import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CustomProgress } from '../../common/components/CustomProgress/CustomProgress'
import { selectAuth, selectProfile } from '../../common/selectors/selectors'
import { useAppDispatch } from '../../redux/redux-store'
import { Posts } from './posts/Posts'
import { setUserProfile } from './profile-reducer'
import './profile.scss'
import { ProfileInfo } from './profileInfo/ProfileInfo'
import { updateProfileStatusThunk } from './profileStatus-reducer'
export const Profile = () => {
    const { profile } = useSelector(selectProfile)
    const auth = useSelector(selectAuth)
    const dispatch = useAppDispatch()
    const { userId } = useParams<{ userId: string }>()
    useEffect(() => {
        if (userId) {
            dispatch(setUserProfile(userId))
        } else if (auth.isAuth && auth.data.id) {
            dispatch(setUserProfile(auth.data.id.toString()))
        }

    }, [userId])
    return (
        <div className='profile'>
            {
                Object.keys(profile).length !== 0 ?
                    <>
                        <ProfileInfo
                            profile={profile}
                            updateStatus={updateProfileStatusThunk}
                        />
                        <Posts />
                    </> :
                    <CustomProgress />
            }
        </div>
    )
}