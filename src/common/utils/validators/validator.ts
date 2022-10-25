export const requiredField = (value: string) => (value ? undefined : 'Field is required');

export const maxLengthCreator = (maxLength: number) => (value: string) =>
  value.length > maxLength ? `Max length cannot be more than ${maxLength} symbols` : undefined;
