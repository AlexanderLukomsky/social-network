type PostItemType = {
    message: string
}
export const PostItem = (props: PostItemType) => {
    return (
        <div>
            {props.message}
        </div>
    )
}