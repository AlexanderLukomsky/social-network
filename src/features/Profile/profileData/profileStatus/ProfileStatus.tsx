import { FC } from "react"

export const ProfileStatus: FC<ProfileStatusPropsType> = ({ profileStatus }) => {

   return (
      <div>
         {profileStatus}
      </div>
   )
}
type ProfileStatusPropsType = {
   profileStatus: string | null
}