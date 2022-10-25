import { FC } from 'react';

import usersImg from 'common/assets/usersImg.jpg';
import { UploadPhotoButton } from 'common/components';
import { updatePhoto } from 'features/profile/profile-reducer';
import { useAppDispatch } from 'redux/redux-store';
import './profilePhoto.scss';

export const ProfilePhoto: FC<ProfilePhotoPropsType> = ({ photo, isOwner }) => {
  const dispatch = useAppDispatch();

  const successUploadHandler = (data: FormData) => {
    dispatch(updatePhoto(data));
  };

  const errorUploadHandler = () => {
    console.warn('error');
  };

  return (
    <div className="profile-photo">
      <img className="profile-photo__image" src={photo || usersImg} alt="" />
      {isOwner && <UploadPhotoButton errorHandler={errorUploadHandler} successHandler={successUploadHandler} />}
    </div>
  );
};
type ProfilePhotoPropsType = {
  photo: null | string;
  isOwner: boolean;
};
