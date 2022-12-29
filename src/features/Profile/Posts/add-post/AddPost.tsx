import { useState, ChangeEvent } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import s from '../posts.module.scss';

import { addNewPost } from 'features/profile/profile-reducer';
import { useAppDispatch } from 'redux/redux-store';

export const AddPost = (): JSX.Element => {
  const [post, setPost] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleButtonClick = (): void => {
    if (!post.trim()) {
      setError(true);

      return;
    }
    dispatch(addNewPost(post));
    setPost('');
  };

  const handlePostChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setError(false);
    const { value } = e.currentTarget;

    setPost(value);
  };

  return (
    <div className={s.new_post}>
      <TextField
        error={error}
        value={post}
        onChange={handlePostChange}
        className={s.new_post_form}
        label="Пост"
        multiline
        rows={2}
        fullWidth
      />

      <Button
        onClick={handleButtonClick}
        className={s.new_post_button}
        variant="contained"
      >
        Добавить пост
      </Button>
    </div>
  );
};
