import { Form, Field } from 'react-final-form'
type FormDataType = {
    login: string, password: string
}
type PropsType<T> = {
    onSubmit: (formData: T) => void
    error: string
}
export const LoginForm = ({ onSubmit, ...props }: PropsType<FormDataType>) => {
    const required = (value: any) => (value ? undefined : 'Required')
    return (
        <Form onSubmit={onSubmit} >
            {({ handleSubmit }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <ul>
                            <Field name="login" validate={required}>
                                {({ input, meta }) => (
                                    <li style={{ border: props.error ? '2px solid red' : '2px solid transparent' }}>
                                        <input {...input} type="text" placeholder="login" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </li>
                                )}
                            </Field>
                            <Field name="password" validate={required}>
                                {({ input, meta }) => (
                                    <li style={{ border: props.error ? '2px solid red' : '2px solid transparent' }}>
                                        <input {...input} type="text" placeholder="password" />
                                        {meta.error && meta.touched && <span>{meta.error}</span>}
                                    </li>
                                )}
                            </Field>
                            <div style={{ color: 'red', fontSize: '18px' }}>
                                {props.error}
                            </div>
                            <li>
                                <button type='submit'>
                                    login
                                </button>
                            </li>
                        </ul>
                    </form >
                )
            }}
        </Form>
    )
}