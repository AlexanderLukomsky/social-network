
type DialogMessageType = {
    title: string
    id: string
}
export const DialogMessage = (props: DialogMessageType) => {
    return (
        <span id={props.id}>
            {props.title}
        </span>
    )
}