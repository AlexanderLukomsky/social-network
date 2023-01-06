import { useState, ChangeEvent, KeyboardEvent, useRef, useEffect, FC } from 'react';

import { TextField, Button } from '@mui/material';

import { addMessageAC } from 'features/dialogs/dialogs-reducer';
import { useAppDispatch } from 'redux/redux-store';
import './addMessage.scss';

export const AddMessage: FC<AddMessagePropsType> = ({ dialogId, userId }) => {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState('');
  const [isError, setError] = useState(false);

  const fieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setError(false);
    setValue(value.trim());
  }, [dialogId]);

  useEffect(() => {
    if (fieldRef.current) {
      fieldRef.current.scrollTop = fieldRef.current.scrollHeight;
    }
  });

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setError(false);
    const newValue = e.currentTarget.value;

    setValue(newValue);
  };

  const handleButtonClick = (): void => {
    const message = value.trim();

    if (!message || !dialogId) {
      setError(true);

      return;
    }

    dispatch(addMessageAC({ message, dialogId, userId }));
    setValue('');
  };

  const handleFieldKeyUp = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.ctrlKey) {
      return;
    }
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleFieldKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }

    if (e.ctrlKey) {
      if (e.key === 'Enter') {
        setValue(`${value}\n`);
      }
    }
  };

  return (
    <div className="add-message">
      <TextField
        disabled={!dialogId}
        error={isError}
        className="add-message__input"
        inputRef={fieldRef}
        onChange={handleValueChange}
        onKeyUp={handleFieldKeyUp}
        onKeyDown={handleFieldKeyDown}
        value={value}
        label="Новое сообщение"
        multiline
        rows={3}
        variant="standard"
      />
      <Button
        variant="outlined"
        color={isError ? 'error' : 'success'}
        onClick={handleButtonClick}
        disabled={isError || !dialogId}
      >
        Отправить
      </Button>
    </div>
  );
};

type AddMessagePropsType = {
  dialogId?: string;
  userId: string;
};
