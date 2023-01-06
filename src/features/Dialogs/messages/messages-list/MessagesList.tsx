import { FC } from 'react';

import { IncomingMessage } from '../incoming-message';
import { OwnerMessage } from '../owner-message';

import { MessagesType } from 'common/types/StateType';
import './messages-list.scss';

export const MessagesList: FC<MessagesListPropsType> = ({
  messages,
  dialogId,
  authId,
}): JSX.Element => {
  return (
    <ul className="messages-list">
      {dialogId &&
        messages[dialogId].map(message => {
          if (message.userId === authId) {
            return (
              <li key={message.id}>
                <OwnerMessage message={message.message} />
              </li>
            );
          }

          return (
            <li key={message.id}>
              <IncomingMessage message={message.message} />
            </li>
          );
        })}
    </ul>
  );
};
type MessagesListPropsType = {
  messages: MessagesType;
  dialogId?: string;
  authId: string;
};
