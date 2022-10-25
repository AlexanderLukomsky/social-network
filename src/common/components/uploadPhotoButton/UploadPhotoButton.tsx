import { ChangeEvent, FC } from 'react';

import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IconButton } from '@mui/material';
import './uploadPhotoButton.scss';

export const UploadPhotoButton: FC<UploadPhotoButtonPropsType> = ({ errorHandler, successHandler }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const photo = e.target.files[0];
      const converterPhoto = URL.createObjectURL(photo);
      const image = new Image();
      image.src = converterPhoto;
      image.onload = () => {
        const formData = new FormData();
        formData.append('photo', photo);
        successHandler(formData);
      };
      image.onerror = () => {
        errorHandler();
      };
    }
  };
  return (
    <div className="upload-button">
      <IconButton color="secondary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={onChangeHandler} />
        <PhotoCamera fontSize="large" />
      </IconButton>
    </div>
  );
};
type UploadPhotoButtonPropsType = {
  errorHandler: () => void;
  successHandler: (data: FormData) => void;
};
