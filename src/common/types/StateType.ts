export type DialogsType = { id: string; name: string; img: string };
export type MessagesType = { id: string; message: string };
export type DialogsPageType = {
  dialogs: DialogsType[];
  messages: MessagesType[];
};
