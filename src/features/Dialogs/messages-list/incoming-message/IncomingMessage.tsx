import { FC } from 'react';

import './incomingMessage.scss';

export const IncomingMessage: FC<IncomingMessagePropsType> = ({ message }) => {
  return <div className="incoming-message">{message}</div>;
};
type IncomingMessagePropsType = {
  message: string;
};
