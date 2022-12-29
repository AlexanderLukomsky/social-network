import { FC } from 'react';

import { NavLink } from 'react-router-dom';

export const DialogItem: FC<DialogItemType> = ({ img, title, id }): JSX.Element => (
  <div>
    <span>
      <img src={img} alt="avka" />
    </span>
    <NavLink end to={`/dialogs/${id}`} id={id}>
      {title}
    </NavLink>
  </div>
);
type DialogItemType = {
  title: string;
  id: string;
  img: string;
};
