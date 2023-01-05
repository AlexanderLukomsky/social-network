export type DialogUserType = { id: string; name: string; img: string };
export type MessagesType = {
  [key: string]: MessageType[];
};
export type DialogsPageType = {
  users: DialogUserType[];
  messages: MessagesType;
};

export type MessageType = { id: string; message: string; userId: string };
