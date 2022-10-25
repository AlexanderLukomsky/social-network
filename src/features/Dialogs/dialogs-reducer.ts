import { v1 } from 'uuid';

import { DialogsPageType } from '../../common/types/StateType';

type AddMessageACType = ReturnType<typeof addMessageAC>;
export type DialogsActionType = AddMessageACType;
const dialogsPage: DialogsPageType = {
  dialogs: [
    {
      id: v1(),
      name: 'Alex',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRngVwb85JwgOn247xcWn16PWH9_vF6vbn4rA&usqp=CAU',
    },
    {
      id: v1(),
      name: 'Roma',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc6s275QyZ2fucw7JUjetZniag8_KHEy-Phw&usqp=CAU',
    },
    {
      id: v1(),
      name: 'Jora',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShVzPNAf1Ho_LeMi1RvbyKfHsTwj1iLGY3Dw&usqp=CAU',
    },
    {
      id: v1(),
      name: 'Petya',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoPhc-UqiuZfT4V37eO5MVVvSI3D_tUG5dIQ&usqp=CAU',
    },
  ],
  messages: [
    { id: v1(), message: 'Message 1' },
    { id: v1(), message: 'Message 2' },
    { id: v1(), message: 'Message 3' },
    { id: v1(), message: 'Message 4' },
  ],
};
export const dialogsReducer = (state: DialogsPageType = dialogsPage, action: DialogsActionType) => {
  switch (action.type) {
    case 'ADD-MESSAGE':
      return { ...state, messages: [{ id: v1(), message: action.payload.message }, ...state.messages] };
    default:
      return state;
  }
};

export const addMessageAC = (message: string) =>
  ({
    type: 'ADD-MESSAGE',
    payload: { message },
  } as const);
