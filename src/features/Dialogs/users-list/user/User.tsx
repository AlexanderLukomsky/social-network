/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';

import { Paper } from '@mui/material';
import { NavLink } from 'react-router-dom';

import './user.scss';
import { appPath } from 'common/routesPath';

export const User: FC<UserPropsType> = ({ img, title, id }): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper className={`dialog-user${isHovered ? ' active' : ' init'}`} elevation={2}>
      <NavLink
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
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
