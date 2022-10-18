import { useSelector } from 'react-redux'
import { CustomProgress } from '../../../common/components/CustomProgress/CustomProgress'
import { selectProfile } from '../../../common/selectors/selectors'
import './profileData.scss'
import { ProfileDescription } from './profileDescription/ProfileDescription'
import { ProfilePhoto } from './profilePhoto/ProfilePhoto'
export const ProfileData = () => {
    const { data, status, profileStatus } = useSelector(selectProfile)

    if (status === 'pending') { return <CustomProgress /> }
    return (
        <div className="profile-data">
            <ProfilePhoto photo={data.photos.large} />
            <ProfileDescription
                profileStatus={profileStatus}
                fullName={data.fullName}
                lookingForAJob={data.lookingForAJob}
                lookingForAJobDescription={data.lookingForAJobDescription}
                gitLink={data.contacts.github}
            />
            <div className="profile-info__about">
            </div>
        </div>
    )
}