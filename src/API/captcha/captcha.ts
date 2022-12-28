import { instance } from 'api/instance/instance';

export const captcha = {
  getCaptcha() {
    return instance.get<{ url: string }>('security/get-captcha-url');
  },
};
