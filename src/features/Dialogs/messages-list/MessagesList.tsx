/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { IncomingMessage } from './incoming-message';
import { OwnerMessage } from './owner-message/OwnerMessage';

import { selectAuthUserId } from 'common/selectors';
import { MessagesType } from 'common/types/StateType';
import './messages-list.scss';

export const MessagesList: FC<MessagesListPropsType> = ({ messages }): JSX.Element => {
  const { id } = useParams<{ id: string | undefined }>();
  const authId = useSelector(selectAuthUserId);

  return (
    <ul className="messages-list">
      {id &&
        messages[id].map(message => {
          if (message.userId === authId.toString()) {
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
};
