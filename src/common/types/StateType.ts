export type DialogUserType = { id: string; name: string; img: string };
export type MessagesType = {
  [key: string]: { id: string; message: string; userId: string }[];
};
export type DialogsPageType = {
  users: DialogUserType[];
  messages: MessagesType;
};
