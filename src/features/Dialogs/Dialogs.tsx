import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { Messages } from './messages';
import { UsersList } from './users-list';

import { appPath } from 'common/routesPath';
import { selectDialogsUsers, selectIsAuth } from 'common/selectors';

import './dialogs.scss';

export const Dialogs = (): JSX.Element => {
  const dialogsUsers = useSelector(selectDialogsUsers);
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) return <Navigate to={appPath.LOGIN} />;

  return (
    <div className="dialogs">
      <UsersList users={dialogsUsers} />
      <Messages />
    </div>
  );
};
