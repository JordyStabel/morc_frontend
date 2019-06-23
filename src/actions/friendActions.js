import { GET_FRIENDS, REMOVE_FRIEND, ADD_FRIEND } from "./types";

export const getFriends = () => {
  return {
    type: GET_FRIENDS
  };
};

export const removeFriend = id => {
  return {
    type: REMOVE_FRIEND,
    payload: id
  };
};

export const addFriend = friend => {
  return {
    type: ADD_FRIEND,
    payload: friend
  };
};
