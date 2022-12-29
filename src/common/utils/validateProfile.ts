/* eslint-disable no-useless-escape */

import { Nullable } from 'common/types';

export const validateProfile = (
  data: DataType,
): Partial<Record<keyof typeof data, boolean>> => {
  const errors: any = {};

  const keys = Object.keys(data) as (keyof typeof data)[];

  keys.forEach(key => {
    if (key === 'website' || key === 'github') {
      const sitePattern =
        /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/gi;
      const value = data[key];

      if (typeof value === 'string' && value.trim()) {
        if (!sitePattern.test(value)) {
          errors[key] = true;
        }
      }
    }
    if (key === 'mainLink') {
      const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
      const value = data[key];

      if (typeof value === 'string' && value.trim()) {
        if (!pattern.test(value)) {
          errors[key] = true;
        }
      }
    }

    if (key === 'fullName' || key === 'aboutMe') {
      if (!data[key].trim()) {
        errors[key] = true;
      }
    }
  });

  return errors;
};
type DataType = {
  fullName: string;
  aboutMe: string;
  mainLink: Nullable<string>;
  website: Nullable<string>;
  github: Nullable<string>;
};
export type ErrorsType = {
  fullName: boolean;
  aboutMe: boolean;
  mainLink: boolean;
  website: boolean;
  github: boolean;
};
