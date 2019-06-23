import { NOTIFY_USER, REMOVE_NOTIFICATION } from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NOTIFY_USER:
      console.log("%c notifyReducer", "color: orange; font-weight: bold");
      console.log(`Message: ${payload.message} & Type: ${payload.messageType}`);

      return [...state, payload];
    case REMOVE_NOTIFICATION:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
