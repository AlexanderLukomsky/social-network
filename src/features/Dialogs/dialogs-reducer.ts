import { v1 } from 'uuid';

import { DialogsPageType } from 'common/types/StateType';

const FIRST_USER_ID = 'FIRST_USER_ID';
const SECOND_USER_ID = 'SECOND_USER_ID';
const THIRD_USER_ID = 'THIRD_USER_ID';
const FOURTH_USER_ID = 'FOURTH_USER_ID';
const AUTH_USER_ID = 19615;

type AddMessageACType = ReturnType<typeof addMessageAC>;
export type DialogsActionType = AddMessageACType;
const dialogsPage: DialogsPageType = {
  users: [
    {
      id: FIRST_USER_ID,
      name: 'Alex',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRngVwb85JwgOn247xcWn16PWH9_vF6vbn4rA&usqp=CAU',
    },
    {
      id: SECOND_USER_ID,
      name: 'Roma',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQc6s275QyZ2fucw7JUjetZniag8_KHEy-Phw&usqp=CAU',
    },
    {
      id: THIRD_USER_ID,
      name: 'Jora',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShVzPNAf1Ho_LeMi1RvbyKfHsTwj1iLGY3Dw&usqp=CAU',
    },
    {
      id: FOURTH_USER_ID,
      name: 'Petya',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoPhc-UqiuZfT4V37eO5MVVvSI3D_tUG5dIQ&usqp=CAU',
    },
  ],
  messages: {
    [FIRST_USER_ID]: [
      { id: v1(), message: 'hi', userId: FIRST_USER_ID },
      { id: v1(), message: 'hi', userId: `${AUTH_USER_ID}` },
      { id: v1(), message: "I'll be home for dinner", userId: FIRST_USER_ID },
      { id: v1(), message: 'around 8 PM', userId: FIRST_USER_ID },
    ],
    [SECOND_USER_ID]: [
      { id: v1(), message: "What's up?", userId: SECOND_USER_ID },
      { id: v1(), message: 'Why are you silent', userId: SECOND_USER_ID },
      { id: v1(), message: "I'm ok", userId: `${AUTH_USER_ID}` },
      { id: v1(), message: 'busy', userId: `${AUTH_USER_ID}` },
    ],
    [THIRD_USER_ID]: [
      { id: v1(), message: 'Hello', userId: `${AUTH_USER_ID}` },
      { id: v1(), message: 'Hello', userId: THIRD_USER_ID },
      { id: v1(), message: 'Call me', userId: `${AUTH_USER_ID}` },
      { id: v1(), message: 'in 5 minutes', userId: THIRD_USER_ID },
    ],
    [FOURTH_USER_ID]: [
      { id: v1(), message: 'Hi', userId: `${AUTH_USER_ID}` },
      { id: v1(), message: 'what are you doing?', userId: `${AUTH_USER_ID}` },
      { id: v1(), message: 'Hi', userId: FOURTH_USER_ID },
      { id: v1(), message: 'waiting for you message )', userId: FOURTH_USER_ID },
    ],
  },
};

export const dialogsReducer = (
  // eslint-disable-next-line default-param-last
  state: DialogsPageType = dialogsPage,
  action: DialogsActionType,
): DialogsPageType => {
  switch (action.type) {
    case 'ADD-MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.dialogId]: [
            ...state.messages[action.payload.dialogId],
            { id: v1(), message: action.payload.message, userId: action.payload.userId },
          ],
        },
      };
    default:
      return state;
  }
};

export const addMessageAC = (payload: AddMessagePayload) =>
  ({
    type: 'ADD-MESSAGE',
    payload,
  } as const);

type AddMessagePayload = {
  message: string;
  dialogId: string;
  userId: string;
};
