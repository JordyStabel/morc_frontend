import { NOTIFY_USER, REMOVE_NOTIFICATION } from "./types";
import uuid from "uuid";

// Generate a custom notify object with a message and messageType
export const notifyUser = (
  message,
  messageType,
  reason,
  timeout = 5000
) => dispatch => {
  console.log("%c NOTIFY_USER", "color: orange; font-weight: bold");

  const id = uuid.v4();
  dispatch({
    type: NOTIFY_USER,
    payload: { message, messageType, reason, id, timeout }
  });

  // Remove the notification after 5 seconds
  setTimeout(
    () => dispatch({ type: REMOVE_NOTIFICATION, payload: id }),
    timeout
  );
};
