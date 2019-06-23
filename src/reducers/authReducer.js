import {
  LOGIN,
  LOGOUT,
  REGISTER,
  SET_AUTH,
  LOAD_USER,
  GET_AUTH
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: payload !== null,
        token: payload.token
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false
      };
    case LOAD_USER:
      return {
        ...state,
        user: payload
      };
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        token: payload.token,
        user: payload.user
      };
    case REGISTER:
      return {};
    case GET_AUTH:
    default:
      return state;
  }
}
