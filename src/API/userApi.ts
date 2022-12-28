import { UsersStateType, UserType } from '../common/types/userTypes';

import { instance } from './instance/instance';
import { CommonResponseType } from './types/CommonAPITypes';

export const usersAPI = {
  getUsers(param: GetUsersParamType) {
    return instance.get<GetUsersResponseType>(
      `users?page=${param.currentPage}&count=${param.pageSize}`,
    );
  },
  follow(userID: number) {
    return instance.post<SubscribeResponseType>(`follow/${userID}`);
  },
  unFollow(userID: number) {
    return instance.delete<SubscribeResponseType>(`follow/${userID}`);
  },
};
export type GetUsersParamType = { currentPage: number; pageSize: number };

type GetUsersResponseType = {
  items: UserType[];
} & Pick<UsersStateType, 'totalCount' | 'error'>;
type SubscribeResponseType = { data: {} } & CommonResponseType;
