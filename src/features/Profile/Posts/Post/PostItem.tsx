import { FC } from 'react';

import s from '../posts.module.scss';

type PostItemPropsType = {
  message: string;
  id: string;
};
export const PostItem: FC<PostItemPropsType> = ({ message, id }) => (
  <li id={id} className={s.item}>
    {message}
  </li>
);
