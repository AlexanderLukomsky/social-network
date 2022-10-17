import { Preloader } from "../../../common/components/Preloader"
import { ProfileType } from "../../../common/types/StateType"
import { ProfileStatus } from "../ProfileStatus/ProfileStatus"

type ProfileInfoType = {
    profile: ProfileType
    updateStatus: (status: string) => void
}
export const ProfileInfo = ({ profile, ...props }: ProfileInfoType) => {
    if (!profile) return <Preloader />
    return (
        <div className="profile__header">
            <div className="profile__img">
                <img src={profile.photos.large ? profile.photos.large : 'https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png'} alt="" style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="profile__about">
                <p className="profile__about-title">{profile.fullName}</p>
                <ProfileStatus updateStatus={props.updateStatus} />
                <p>{profile.aboutMe}</p>
            </div>
        </div>
    )
}