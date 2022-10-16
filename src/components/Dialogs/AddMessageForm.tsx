import { Field, Form } from "react-final-form"
import { maxLengthCreator, requiredField } from "../../utils/validators/validator"
import { Textarea } from "../common/FormsControls/FormsControls"
type FormDataType = {
    newMessageBody: string
}
type PropsType<T> = {
    onSubmit: (formData: T) => void
}

export const AddMessageForm = ({ onSubmit, ...props }: PropsType<FormDataType>) => {
    const composeValidators = (...validators: any[]) => (value: string) =>
        validators.reduce((error, validator) => error || validator(value), undefined)
    return <Form onSubmit={onSubmit}>
        {
            ({ handleSubmit }) => (
                <form
                    onSubmit={handleSubmit}>
                    <Field name="newMessageBody" component={Textarea}
                        placeholder='add message'
                        validate={composeValidators(requiredField, maxLengthCreator(10))}
                    />
                    <button onClick={handleSubmit}>add message</button>
                </form>
            )
        }
    </Form>
}