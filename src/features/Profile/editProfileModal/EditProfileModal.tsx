import { useState, FC, ChangeEvent } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import './editProfileModal.scss';
import { Nullable } from 'common/types';
import { ErrorsType, validateProfile } from 'common/utils/validateProfile';

export const EditProfileModal: FC<EditProfileModalPropsType> = ({
  isOpen,
  onClose,
  onSubmit,
  fullName,
  contacts,
  aboutMe,
  onChangeFullName,
  onChangeAboutMe,
  onChangeContacts,
}) => {
  const [errors, setErrors] = useState<Partial<ErrorsType>>({});

  const onChangeFullNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(state => ({ ...state, fullName: false }));
    onChangeFullName(e.currentTarget.value);
  };

  const onChangeAboutMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(state => ({ ...state, aboutMe: false }));
    onChangeAboutMe(e.currentTarget.value);
  };

  const handleGitChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(state => ({ ...state, github: false }));
    const github = e.currentTarget.value;
    onChangeContacts({ ...contacts, github });
  };

  const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(state => ({ ...state, website: false }));
    const website = e.currentTarget.value;
    onChangeContacts({ ...contacts, website });
  };

  const handleMainChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(state => ({ ...state, mainLink: false }));
    const mainLink = e.currentTarget.value;
    onChangeContacts({ ...contacts, mainLink });
  };

  const handleSubmitClick = () => {
    const data = {
      fullName,
      aboutMe,
      github: contacts.github,
      mainLink: contacts.mainLink,
      website: contacts.website,
    };
    const validationErrors = validateProfile(data);

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    onSubmit();
  };

  const onCancelHandler = () => {
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="edit-profile-modal">
        <div className="edit-profile-modal__body">
          <TextField
            label={errors.fullName ? 'Обязательно' : 'Имя'}
            variant="standard"
            value={fullName}
            onChange={onChangeFullNameHandler}
            error={errors.fullName}
          />
          <TextField
            label={errors.aboutMe ? 'Обязательно' : 'О себе'}
            variant="standard"
            value={aboutMe === null ? '' : aboutMe}
            onChange={onChangeAboutMeHandler}
            error={errors.aboutMe}
          />
          <TextField
            label={errors.github ? 'Некорректное значение' : 'GitHub'}
            variant="standard"
            value={contacts.github === null ? '' : contacts.github}
            onChange={handleGitChange}
            error={errors.github}
          />
          <TextField
            label={errors.website ? 'Некорректное значение' : 'Website'}
            variant="standard"
            value={contacts.website === null ? '' : contacts.website}
            onChange={handleWebsiteChange}
            error={errors.website}
          />
          <TextField
            label={errors.mainLink ? 'Некорректное значение' : 'MainLink'}
            variant="standard"
            value={contacts.mainLink === null ? '' : contacts.mainLink}
            onChange={handleMainChange}
            error={errors.mainLink}
          />
        </div>
        <div className="edit-profile-modal__buttons">
          <Button color="error" variant="outlined" onClick={onCancelHandler}>
            Отменить
          </Button>
          <Button color="success" variant="outlined" onClick={handleSubmitClick}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
type EditProfileModalPropsType = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  fullName: string;
  aboutMe: string;
  contacts: {
    github: Nullable<string>;
    website: Nullable<string>;
    mainLink: Nullable<string>;
  };
  onChangeFullName: (value: string) => void;
  onChangeAboutMe: (value: string) => void;
  onChangeContacts: (contacts: {
    github: Nullable<string>;
    mainLink: Nullable<string>;
    website: Nullable<string>;
  }) => void;
};

// Alex
// https://github.com/AlexanderLukomsky

// React Front-End Developer
