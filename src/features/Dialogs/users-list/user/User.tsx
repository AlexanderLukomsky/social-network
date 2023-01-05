/* eslint-disable no-magic-numbers */
import { FC, useState } from 'react';

import { Paper } from '@mui/material';
import { NavLink, useParams } from 'react-router-dom';

import './user.scss';
import { appPath } from 'common/routesPath';

export const User: FC<UserPropsType> = ({ img, title, id }): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);
  const params = useParams<{ id: string | undefined }>();
  const activeClassName = params.id === id && ' active';
  const hoveredClassName = isHovered ? ' active' : ' init';

  return (
    <Paper
      className={`dialog-user${activeClassName || hoveredClassName}`}
      elevation={activeClassName ? 5 : 2}
    >
      <NavLink
        onMouseEnter={() => {
          if (activeClassName) {
            return;
          }

          setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (activeClassName) {
            return;
          }

          setIsHovered(false);
        }}
        className="dialog-user__link"
        to={`${appPath.DIALOGS}/${id}`}
      >
        <img className="dialog-user__image" src={img} alt="avatar" />
        <span className="dialog-user__title">{title}</span>
      </NavLink>
    </Paper>
  );
};

type UserPropsType = {
  title: string;
  id: string;
  img: string;
};
