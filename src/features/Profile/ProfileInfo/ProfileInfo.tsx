import { FC } from 'react'
import usersImg from '../../../common/assets/usersImg.jpg'
import { UploadPhotoButton } from '../../../common/components/uploadPhotoButton/UploadPhotoButton'
import { ProfileType } from "../../../common/types/StateType"
import { useAppDispatch } from '../../../redux/redux-store'
import { updatePhoto } from '../profile-reducer'
import { ProfileStatus } from "../profileStatus/ProfileStatus"
import './profileInfo.scss'
export const ProfileInfo: FC<ProfileInfoPropsType> = ({ profile, updateStatus }) => {
    const dispatch = useAppDispatch()
    const successUploadHandler = (data: FormData) => {
        dispatch(updatePhoto(data))
    }
    const errorUploadHandler = () => { console.warn('error'); }

    return (
        <div className="profile-info">
            <div className="profile-info__imageBox">
                <img
                    className="profile-info__image"
                    src={profile.photos.large ? profile.photos.large : usersImg}
                    alt=""
                />
                <UploadPhotoButton
                    errorHandler={errorUploadHandler}
                    successHandler={successUploadHandler}
                />
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