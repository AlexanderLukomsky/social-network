import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { DialogMessage } from './dialog-message/DialogMessage';
import { DialogItem } from './dialog/Dialog';

import { appPath } from 'common/routesPath';
import { selectDialogs, selectIsAuth, selectMessages } from 'common/selectors';

export const Dialogs = (): JSX.Element => {
  const dialogs = useSelector(selectDialogs);
  const messages = useSelector(selectMessages);
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) return <Navigate to={appPath.LOGIN} />;

  return (
    <div className="dialogs">
      <div className="dialogs__columns">
        <ul className="dialogs__column column__messages">
          {dialogs.map(el => (
            <li key={el.id} id={el.id}>
              <DialogItem title={el.name} id={el.id} img={el.img} />
            </li>
          ))}
        </ul>
        <ul className="dialogs__column">
          {messages.map(el => (
            <li key={el.id} id={el.id}>
              <DialogMessage title={el.message} id={el.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
