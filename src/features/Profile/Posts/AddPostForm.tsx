import { Button } from "@mui/material";
import { Field, Form } from "react-final-form";
import { Textarea } from "../../../common/components/FormsControls/FormsControls";
import { maxLengthCreator, requiredField } from "../../../common/utils/validators/validator";
type FormDataType = {
    addNewPost: string
}
type PropsType<T> = {
    onSubmit: (formData: T) => void
}

export const AddPostForm = ({ onSubmit, ...props }: PropsType<FormDataType>) => {
    const composeValidators = (...validators: any[]) => (value: string) =>
        validators.reduce((error, validator) => error || validator(value), undefined)
    return <Form onSubmit={onSubmit}>
        {
            ({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="addNewPost" component={Textarea}
                        placeholder='add new post'
                        validate={composeValidators(requiredField, maxLengthCreator(10))}
                    />
                    <Button onClick={handleSubmit} > add post</Button>
                </form>
            )
        }
    </Form >
}

