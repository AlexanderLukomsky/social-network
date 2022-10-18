import { FC } from 'react'
import { ProfileStatus } from '../../profileStatus/ProfileStatus'
import './profileDescription.scss'
export const ProfileDescription: FC<ProfileDescriptionPropsType> = (
   { fullName, lookingForAJob, lookingForAJobDescription, gitLink, profileStatus }
) => {
   return (
      <div className='profile-description description'>
         <h4 className="description__name">{fullName}</h4>
         <ProfileStatus profileStatus={profileStatus} />
         {lookingForAJob && lookingForAJobDescription && <div> {lookingForAJobDescription}</div>}
         {gitLink && <div>{gitLink}</div>}
      </div>
   )
}
type ProfileDescriptionPropsType = {
   profileStatus: string | null
   fullName: string
   lookingForAJob: boolean
   lookingForAJobDescription: string | null
   gitLink: string | null
}