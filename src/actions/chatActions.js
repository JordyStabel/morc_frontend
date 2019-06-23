import { RECEIVE_MESSAGE, SEND_MESSAGE } from "./types";

export const sendMessage = message => {
  return {
    type: SEND_MESSAGE,
    payload: message
  };
};

export const receiveMessage = message => {
  let date = new Date();
  let t = `${date.getHours()}:${date.getMinutes()}`;

  return {
    type: RECEIVE_MESSAGE,
    payload: {
      player: message.username,
      content: message.message,
      time: t
    }
  };
};
