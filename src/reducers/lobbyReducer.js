import { GET_LOBBIES, ADD_LOBBY } from "../actions/types";

const initialState = {
  lobbies: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LOBBIES:
      return {
        ...state,
        lobbies: JSON.parse(JSON.parse(action.payload.content))
      };
    case ADD_LOBBY:
      console.log("fired");
      return {
        ...state,
        lobbies: [action.payload, ...state.lobbies]
      };
    default:
      return state;
  }
}
