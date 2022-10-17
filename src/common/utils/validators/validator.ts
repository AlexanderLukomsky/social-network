export const requiredField = (value: string) => {
    return value ? undefined : 'Field is required'
}

export const maxLengthCreator = (maxLength: number) => (value: string) => {
    return value.length > maxLength ? `Max length cannot be more than ${maxLength} symbols` : undefined

}