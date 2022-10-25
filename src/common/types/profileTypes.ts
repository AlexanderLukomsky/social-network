import { StatusesTypes } from './commonTypes';
import { Nullable } from './Nullable';

export type ProfileStateType = {
  data: ProfileType;
  profileStatus: Nullable<string>;
  isInitialized: false;
  posts: PostType[];
  status: StatusesTypes;
  notice: string;
};
export type ProfileType = {
  aboutMe: string | null;
  contacts: ContactsType<StringOrNull>;
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: Nullable<string>;
  photos: ProfilePhotosType;
  userId: number;
};
type ContactsType<T> = {
  facebook: T;
  website: T;
  vk: T;
  twitter: T;
  instagram: T;
  youtube: T;
  github: T;
  mainLink: T;
};
type StringOrNull = Nullable<string>;
type PostType = { id: string; message: string; likesCount: number };
export type ProfilePhotosType = {
  small: Nullable<string>;
  large: Nullable<string>;
};
