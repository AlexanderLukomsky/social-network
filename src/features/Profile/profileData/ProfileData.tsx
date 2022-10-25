import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { useSelector } from 'react-redux';

import { EditProfileModal } from '../editProfileModal/EditProfileModal';
import { updateProfile } from '../profile-reducer';

import { ProfilePhoto } from './profilePhoto/ProfilePhoto';

import { CustomProgress } from 'common/components/custom-progress/CustomProgress';
import { selectAuthUserId, selectProfile } from 'common/selectors/selectors';
import { useAppDispatch } from 'redux/redux-store';

import './profileData.scss';

export const ProfileData = () => {
  const dispatch = useAppDispatch();

  const { data, status, profileStatus } = useSelector(selectProfile);
  const authId = useSelector(selectAuthUserId);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [fullName, setFullName] = useState(data.fullName);
  const [aboutMe, setAboutMe] = useState(data.aboutMe);
  const [contacts, setContacts] = useState({ github: data.contacts.github });

  const isOwner = data.userId === authId;

  const onCloseModalHandler = () => {
    setIsOpenModal(false);
  };

  const onOpenModalHandler = () => {
    setIsOpenModal(true);
  };

  const onSubmitHandler = () => {
    const newData = {
      fullName,
      aboutMe,
      contacts,
      userId: authId,
    };
    dispatch(updateProfile(newData));
  };

  if (status === 'pending') {
    return <CustomProgress />;
  }

  return (
    <Paper elevation={3} className="profile-data">
      <ProfilePhoto photo={data.photos.large} isOwner={isOwner} />

      <div className="profile-data__description description">
        <h4 className="description__name">
          {data.fullName}
          {isOwner && (
            <IconButton size="small" onClick={onOpenModalHandler}>
              <EditIcon fontSize="small" color="primary" />
            </IconButton>
          )}
        </h4>
        {profileStatus && <div>{profileStatus}</div>}
        {data.aboutMe && <div className="description__text">{data.aboutMe}</div>}
        {isOwner && data.contacts.github && (
          <Link target="_blank" href={data.contacts.github}>
            Github
          </Link>
        )}
      </div>
      <EditProfileModal
        isOpen={isOpenModal}
        fullName={fullName}
        aboutMe={aboutMe === null ? '' : aboutMe}
        contacts={contacts}
        onClose={onCloseModalHandler}
        onSubmit={onSubmitHandler}
        onChangeFullName={setFullName}
        onChangeAboutMe={setAboutMe}
        onChangeContacts={setContacts}
      />
    </Paper>
  );
};
