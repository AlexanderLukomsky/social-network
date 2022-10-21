type FormDataType = {
    newMessageBody: string
}
type PropsType<T> = {
    onSubmit: (formData: T) => void
}

export const AddMessageForm = ({ onSubmit, ...props }: PropsType<FormDataType>) => {
    const composeValidators = (...validators: any[]) => (value: string) =>
        validators.reduce((error, validator) => error || validator(value), undefined)
    return (
        <div></div>
    )
}