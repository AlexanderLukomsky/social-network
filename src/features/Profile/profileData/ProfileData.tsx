import { useState, FC } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';

import { EditProfileModal } from '../editProfileModal/EditProfileModal';
import { ProfileLink, ProfileLinkPropsType } from '../profile-links/ProfileLinks';
import { updateProfile } from '../profile-reducer';

import { ProfilePhoto } from './profilePhoto/ProfilePhoto';

import { CustomProgress } from 'common/components/custom-progress/CustomProgress';
import { selectAuthUserId, selectProfile } from 'common/selectors/selectors';
import { useAppDispatch } from 'redux/redux-store';

import './profileData.scss';

export const ProfileData: FC<ProfileDataPropsType> = ({ isOwner }) => {
  const dispatch = useAppDispatch();

  const { data, status, profileStatus } = useSelector(selectProfile);
  const authId = useSelector(selectAuthUserId);
  const { github } = data.contacts;
  const { mainLink } = data.contacts;
  const { website } = data.contacts;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [fullName, setFullName] = useState(data.fullName);
  const [aboutMe, setAboutMe] = useState(data.aboutMe);
  const [contacts, setContacts] = useState({
    github,
    website,
    mainLink,
  });

  const onCloseModalHandler = () => {
    setIsOpenModal(false);
  };

  const onOpenModalHandler = () => {
    setIsOpenModal(true);
  };

  const onSubmitHandler = async () => {
    const newContacts = {
      github: contacts.github ? contacts.github.trim() : null,
      website: contacts.website ? contacts.website.trim() : null,
      mainLink: contacts.mainLink ? contacts.mainLink.trim() : null,
    };
    const newData = {
      fullName,
      aboutMe,
      contacts: newContacts,
      userId: authId,
    };
    const action = await dispatch(updateProfile(newData));
    if (updateProfile.fulfilled.match(action)) {
      setIsOpenModal(false);
    }
  };

  if (status === 'pending') {
    return <CustomProgress />;
  }
  const profileLinksProps: ProfileLinkPropsType = {};
  if (github) profileLinksProps.github = { path: github, title: 'Github' };
  if (website) profileLinksProps.website = { path: website, title: 'Portfolio' };
  if (mainLink) profileLinksProps.mainLink = { path: mainLink, title: mainLink };
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

        {isOwner && (
          <ProfileLink
            github={profileLinksProps.github}
            mainLink={profileLinksProps.mainLink}
            website={profileLinksProps.website}
          />
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

type ProfileDataPropsType = {
  isOwner: boolean;
};
