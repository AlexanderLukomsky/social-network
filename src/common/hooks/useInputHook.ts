import { ChangeEvent, useState } from 'react';

import { EMPTY_STRING } from 'common/constants';

export const useInputHook = (): UseInputHookType => {
  const [value, setValue] = useState(EMPTY_STRING);

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return { value, onInputChange };
};
type UseInputHookType = {
  value: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
