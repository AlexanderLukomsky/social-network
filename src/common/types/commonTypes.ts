export type StatusesTypes = 'idle' | 'pending' | 'succeeded' | 'failed'
export enum ResultStatus {
   OK = 0,
   FAILED = 1,
   ANTIBOTCAPTCHA = 10
}
export type CommonResponseType = {
   resultCode: ResultStatus
   fieldsErrors: []
   messages: []
}