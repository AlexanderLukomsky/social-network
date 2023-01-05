import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { appPath } from 'common/routesPath';
import { selectFirstDialogId } from 'common/selectors';

export const Navigation = (): JSX.Element => {
  const firstDialogId = useSelector(selectFirstDialogId);

  return (
    <ul className="nav-list">
      <li className="nav-list__item">
        <Button component={NavLink} to={appPath.PROFILE} variant="contained">
          Профиль
        </Button>
      </li>
      <li className="nav-list__item">
        <Button
          component={NavLink}
          to={firstDialogId ? `${appPath.DIALOGS}/${firstDialogId}` : appPath.DIALOGS}
          variant="contained"
        >
          Сообщения
        </Button>
      </li>
      <li className="nav-list__item">
        <Button component={NavLink} to={appPath.USERS} variant="contained">
          Пользователи
        </Button>
      </li>
      <li className="nav-list__item">
        <Button disabled component={NavLink} to={appPath.NEWS} variant="contained">
          Новости
        </Button>
      </li>
      <li className="nav-list__item">
        <Button disabled component={NavLink} to={appPath.MUSIC} variant="contained">
          Музыки
        </Button>
      </li>
      <li className="nav-list__item">
        <Button disabled component={NavLink} to={appPath.SETTINGS} variant="contained">
          Настройки
        </Button>
      </li>
    </ul>
  );
};
