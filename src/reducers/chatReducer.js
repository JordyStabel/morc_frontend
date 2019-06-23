import { SEND_MESSAGE, RECEIVE_MESSAGE } from "../actions/types";

const initialState = {
  messages: [],
  action: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SEND_MESSAGE:
      return {
        ...state,
        action: action
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [
          {
            player: payload.player,
            content: payload.content,
            time: payload.time
          },
          ...state.messages
        ],
        action: action
      };
    default:
      return state;
  }
}
