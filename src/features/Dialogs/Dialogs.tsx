/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { MessagesList } from './messages-list/MessagesList';
import { UsersList } from './users-list';

import { appPath } from 'common/routesPath';
import { selectDialogsUsers, selectIsAuth, selectMessages } from 'common/selectors';

import './dialogs.scss';

export const Dialogs = (): JSX.Element => {
  const messages = useSelector(selectMessages);
  const dialogsUsers = useSelector(selectDialogsUsers);
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) return <Navigate to={appPath.LOGIN} />;

  return (
    <div className="dialogs">
      <UsersList users={dialogsUsers} />
      <Paper className="dialogs__messages">
        <MessagesList messages={messages} />
      </Paper>
    </div>
  );
};
