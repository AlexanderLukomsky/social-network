import { TextareaHTMLAttributes } from "react"
import { defaultStyle } from "./FormControlStyle"

type finalyProps = TextareaHTMLAttributes<{}> & {
    input: TextareaHTMLAttributes<HTMLTextAreaElement>
    meta: any
}
export const Textarea = ({ meta, ...props }: finalyProps) => {
    const hasError = meta.touched && meta.error
    return (
        <div style={{ ...defaultStyle({ type: 'div' }) }}>
            <textarea style={{ ...defaultStyle({ type: 'textarea', hasError }), resize: 'none' }}
                {...props.input}
            />
            <div>
                {
                    hasError && <span>{meta.error}</span>
                }
            </div>
        </div>
    )
}

export const FormControl = ({ meta, ...props }: finalyProps) => {
    return (
        <div>

        </div>
    )
}