import { FC } from 'react';

import { User } from './user';

import { DialogUserType } from 'common/types/StateType';

import './users-list.scss';

export const UsersList: FC<UsersListPropsType> = ({ users }): JSX.Element => {
  return (
    <ul className="dialogs-users-list">
      {users.map(user => (
        <li className="dialogs-users-list__item" key={user.id}>
          <User title={user.name} id={user.id} img={user.img} />
        </li>
      ))}
    </ul>
  );
};
type UsersListPropsType = {
  users: DialogUserType[];
};
