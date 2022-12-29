import { FC } from 'react';

export const DialogMessage: FC<DialogMessageType> = ({ id, title }): JSX.Element => (
  <span id={id}>{title}</span>
);

type DialogMessageType = {
  title: string;
  id: string;
};
