import { FC } from 'react'
import usersImg from '../../../common/assets/usersImg.jpg'
import { Preloader } from "../../../common/components/Preloader"
import { ProfileType } from "../../../common/types/StateType"
import { ProfileStatus } from "../profileStatus/ProfileStatus"
import { UploadButton } from '../../../common/components/uploadButton/UploadButton'
import './profileInfo.scss'
export const ProfileInfo: FC<ProfileInfoPropsType> = ({ profile, updateStatus }) => {
    console.log(profile);
    if (!profile) return <Preloader />
    return (
        <div className="profile-info">
            <div className="profile-info__imageBox">
                <img
                    className="profile-info__image"
                    src={profile.photos.large ? profile.photos.large : usersImg}
                    alt=""
                />
                <UploadButton />
            </div>
            <div className="profile-info__about">
                <h4 className="profile-info__name">{profile.fullName}</h4>
                <ProfileStatus updateStatus={updateStatus} />
            </div>
        </div>
    )
}
type ProfileInfoPropsType = {
    fullName?: string
    profile: ProfileType | null
    updateStatus: (status: string) => void
}