import { FC } from 'react';

export const ProfileStatus: FC<ProfileStatusPropsType> = ({ profileStatus }) => <div>{profileStatus}</div>;
type ProfileStatusPropsType = {
  profileStatus: string | null;
};
