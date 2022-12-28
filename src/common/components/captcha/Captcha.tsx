import { FC } from 'react';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button, Paper, TextField } from '@mui/material';

import { useInputHook } from 'common/hooks';
import './captcha.scss';

export const Captcha: FC<CaptchaPropsType> = ({
  onSubmitFormClick,
  captchaUrl,
  onGetCaptchaClick,
  onCloseCaptchaClick,
}) => {
  const { value, onInputChange } = useInputHook();

  const onSubmitButtonClick = () => {
    onSubmitFormClick(value);
  };

  return (
    <div className="captcha-wrapper">
      <Paper className="captcha">
        <button className="captcha__close" type="button" onClick={onCloseCaptchaClick}>
          <HighlightOffIcon color="error" />
        </button>
        <div
          role="presentation"
          className="captcha__imageBox"
          onClick={onGetCaptchaClick}
        >
          <img src={captchaUrl} alt="captcha" />
        </div>
        <TextField value={value} onChange={onInputChange} />
        <Button variant="outlined" onClick={onSubmitButtonClick}>
          Отправить
        </Button>
      </Paper>
      <div
        role="presentation"
        className="captcha-overlay"
        onClick={onCloseCaptchaClick}
      />
    </div>
  );
};
type CaptchaPropsType = {
  captchaUrl: string;
  onSubmitFormClick: (captcha: string) => void;
  onGetCaptchaClick: () => void;
  onCloseCaptchaClick: () => void;
};
