import { FC, useState } from 'react';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, Paper, TextField } from '@mui/material';

import './captcha.scss';

export const Captcha: FC<CaptchaPropsType> = ({ onSubmit, captchaUrl, onChangeCaptcha, onClose }) => {
  const [value, setValue] = useState('');
  const onSubmitHandler = () => {
    onSubmit(value);
  };
  return (
    <div className="captcha-wrapper">
      <Paper className="captcha">
        <button className="captcha__close" type="button" onClick={onClose}>
          <HighlightOffIcon color="error" />
        </button>
        <div className="captcha__imageBox" onClick={onChangeCaptcha}>
          <img src={captchaUrl} alt="captcha" />
        </div>
        <TextField
          value={value}
          onChange={e => {
            setValue(e.currentTarget.value);
          }}
        />
        <Button variant="outlined" onClick={onSubmitHandler}>
          Отправить
        </Button>
      </Paper>
      <div className="captcha-overlay" onClick={onClose} />
    </div>
  );
};
type CaptchaPropsType = {
  captchaUrl: string;
  onSubmit: (captcha: string) => void;
  onChangeCaptcha: () => void;
  onClose: () => void;
};
