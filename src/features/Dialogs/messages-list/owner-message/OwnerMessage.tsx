import { FC } from 'react';

import './ownerMessage.scss';

export const OwnerMessage: FC<OwnerMessagePropsType> = ({ message }) => {
  return <div className="owner-message">{message}</div>;
};
type OwnerMessagePropsType = {
  message: string;
};
