import { FC } from 'react';

import Link from '@mui/material/Link';

import { Nullable } from 'common/types';

export const ProfileLink: FC<ProfileLinkPropsType> = ({ github, mainLink, website }) => (
  <ul className="profile-data__links links">
    {mainLink && <li className="links__email">{mainLink.title}</li>}
    {website && (
      <li>
        <Link variant="button" href={website.path}>
          {website.title}
        </Link>
      </li>
    )}
    {github && (
      <li>
        <Link variant="button" href={github.path}>
          {github.title}
        </Link>
      </li>
    )}
  </ul>
);

ProfileLink.defaultProps = {
  github: null,
  mainLink: null,
  website: null,
};
export type ProfileLinkPropsType = {
  github?: Nullable<LinkType>;
  mainLink?: Nullable<LinkType>;
  website?: Nullable<LinkType>;
};
type LinkType = {
  path: string;
  title: string;
};
