import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { AddMessage } from './add-message';
import { MessagesList } from './messages-list';

import { selectAuthUserId, selectMessages } from 'common/selectors';
import './messages.scss';

export const Messages = (): JSX.Element => {
  const { id } = useParams<{ id: string | undefined }>();
  const authId = useSelector(selectAuthUserId).toString();
  const messages = useSelector(selectMessages);

  return (
    <Paper className="messages">
      <MessagesList dialogId={id} authId={authId} messages={messages} />
      <AddMessage dialogId={id} userId={authId} />
    </Paper>
  );
};
