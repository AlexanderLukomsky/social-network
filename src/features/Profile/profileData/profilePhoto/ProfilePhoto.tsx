import { FC } from 'react'
import { UploadPhotoButton } from "../../../../common/components/uploadPhotoButton/UploadPhotoButton"
import { useAppDispatch } from "../../../../redux/redux-store"
import { updatePhoto } from "../../profile-reducer"
import usersImg from '../../../../common/assets/usersImg.jpg'
import './profilePhoto.scss'
export const ProfilePhoto: FC<ProfilePhotoPropsType> = ({ photo, isOwner }) => {
   const dispatch = useAppDispatch()
   const successUploadHandler = (data: FormData) => {
      dispatch(updatePhoto(data))
   }
   const errorUploadHandler = () => { console.warn('error'); }
   return (
      <div className="profile-photo">
         <img
            className="profile-photo__image"
            src={photo ? photo : usersImg}
            alt=""
         />
         {isOwner && <UploadPhotoButton
            errorHandler={errorUploadHandler}
            successHandler={successUploadHandler}
         />}
      </div>
   )
}
type ProfilePhotoPropsType = {
   photo: null | string
   isOwner: boolean
}