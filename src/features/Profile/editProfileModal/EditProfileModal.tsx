import { useState, FC, ChangeEvent } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import './editProfileModal.scss';

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
  const [isNameError, setIsNameError] = useState(false);
  const [isAboutMeError, setIsAboutMeError] = useState(false);
  const [isGitError, setIsGitError] = useState(false);

  const onChangeFullNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsNameError(false);
    onChangeFullName(e.currentTarget.value);
  };

  const onChangeAboutMeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAboutMeError(false);
    onChangeAboutMe(e.currentTarget.value);
  };

  const onChangeContactsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsGitError(false);
    onChangeContacts({ github: e.currentTarget.value });
  };

  const validate = (
    data: { [key: string]: { value: string; errorHandler: (isError: boolean) => void } },
    github: { value: string | null; errorHandler: (isError: boolean) => void },
  ) => {
    let isError = true;
    Object.keys(data).forEach(key => {
      if (!data[key].value.trim()) {
        data[key].errorHandler(true);
        isError = false;
      }
    });
    /* eslint-disable no-useless-escape */
    if (github.value !== null) {
      const re = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi;
      if (!re.test(github.value)) {
        github.errorHandler(true);
        isError = false;
      }
    }

    return isError;
  };

  const onSubmitHandler = () => {
    if (
      validate(
        {
          fullName: { value: fullName, errorHandler: setIsNameError },
          aboutMe: { value: aboutMe, errorHandler: setIsAboutMeError },
        },
        { value: contacts.github, errorHandler: setIsGitError },
      )
    ) {
      onSubmit();
    }
  };

  const onCancelHandler = () => {
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="edit-profile-modal">
        <div className="edit-profile-modal__body">
          <TextField
            label={isNameError ? 'Обязательно' : 'Имя'}
            variant="standard"
            value={fullName}
            onChange={onChangeFullNameHandler}
            error={isNameError}
          />
          <TextField
            label={isAboutMeError ? 'Обязательно' : 'О себе'}
            variant="standard"
            value={aboutMe === null ? '' : aboutMe}
            onChange={onChangeAboutMeHandler}
            error={isAboutMeError}
          />
          <TextField
            label="Ссылка"
            variant="standard"
            value={contacts.github === null ? '' : contacts.github}
            onChange={onChangeContactsHandler}
            error={isGitError}
          />
        </div>
        <div className="edit-profile-modal__buttons">
          <Button color="error" variant="outlined" onClick={onCancelHandler}>
            Отменить
          </Button>
          <Button color="success" variant="outlined" onClick={onSubmitHandler}>
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
  contacts: { github: string | null };
  onChangeFullName: (value: string) => void;
  onChangeAboutMe: (value: string) => void;
  onChangeContacts: (contacts: { github: string }) => void;
};

// Alex
// https://github.com/AlexanderLukomsky

// React Front-End Developer
