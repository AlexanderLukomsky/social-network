type DialogMessageType = {
  title: string;
  id: string;
};
export const DialogMessage = (props: DialogMessageType) => (
  <span id={props.id}>{props.title}</span>
);
