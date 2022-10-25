type PostItemType = {
  message: string;
};
export const PostItem = (props: PostItemType) => <div>{props.message}</div>;
