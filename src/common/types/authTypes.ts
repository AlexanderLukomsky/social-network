export type AuthUserDataType = {
  id: number;
  login: string;
  email: string;
};
export type AuthStateType = {
  data: AuthUserDataType;
  isAuth: boolean;
};
