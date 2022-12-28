import {
  AuthResponseType,
  AuthUserDataType,
  LoginRequestType,
} from './types/AuthAPITypes';

import { instance } from 'api/instance/instance';

export const auth = {
  me() {
    return instance.get<AuthResponseType<AuthUserDataType>>('auth/me');
  },

  login(data: LoginRequestType) {
    return instance.post<AuthResponseType<{ userId: string }>>('auth/login', data);
  },
  logout() {
    return instance.delete<AuthResponseType<{}>>('auth/login');
  },
};
