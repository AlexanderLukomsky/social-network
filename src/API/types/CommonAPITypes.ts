const SUCCESSFUL_RESPONSE = 0;
const FAILED_RESPONSE = 1;
const ANTIBOT_RESPONSE = 10;

export type CommonResponseType = {
  resultCode: ResultStatus;
  fieldsErrors: [];
  messages: [];
};
export enum ResultStatus {
  OK = SUCCESSFUL_RESPONSE,
  FAILED = FAILED_RESPONSE,
  ANTIBOTCAPTCHA = ANTIBOT_RESPONSE,
}
