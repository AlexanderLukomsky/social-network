import { FC } from 'react'
import { Preloader } from "../../../common/components/Preloader"
import { ProfileType } from "../../../common/types/StateType"
import { ProfileStatus } from "../ProfileStatus/ProfileStatus"

export const ProfileInfo: FC<ProfileInfoPropsType> = ({ profile, updateStatus }) => {
    if (!profile) return <Preloader />
    return (
        <div className="profile__header">
            <div className="profile__img">
                <img src={profile.photos.large ? profile.photos.large : 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png'} alt="" style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="profile__about">
                <p className="profile__about-title">{profile.fullName}</p>
                <ProfileStatus updateStatus={updateStatus} />
                <p>{profile.aboutMe}</p>
            </div>
        </div>
    )
}
type ProfileInfoPropsType = {
    profile: ProfileType | null
    updateStatus: (status: string) => void
}