import { FC } from 'react'
import usersImg from '../../../common/assets/usersImg.jpg'
import { CustomProgress } from '../../../common/components/CustomProgress/CustomProgress'
import { UploadButton } from '../../../common/components/uploadButton/UploadButton'
import { ProfileType } from "../../../common/types/StateType"
import { ProfileStatus } from "../profileStatus/ProfileStatus"
import './profileInfo.scss'
export const ProfileInfo: FC<ProfileInfoPropsType> = ({ profile, updateStatus }) => {

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
    profile: ProfileType
    updateStatus: (status: string) => void
}