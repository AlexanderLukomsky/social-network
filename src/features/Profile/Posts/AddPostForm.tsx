import { Button } from "@mui/material";

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
    return (
        <div >
            {
                <div></div>
            }
        </div >
    )
}

