import { ProfilePhotosType } from './profileTypes';

export type UserType = {
  followed: boolean;
  id: number;
  name: string;
  photos: ProfilePhotosType;
  status: null | string;
  uniqueUrlName: null | string;
};
export type UsersStateType = {
  data: UserType[];
  error: null;
  totalCount: number;
  page: number;
  pageSize: number;
  requestPage: number;
};
