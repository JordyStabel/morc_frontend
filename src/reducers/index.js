import { combineReducers } from "redux";

// Custom reducers
import notifyReducer from "./notifyReducer";
import friendsReducer from "./friendsReducer";
import authReducer from "./authReducer";
import gameReducer from "./gameReducer";
import lobbyReducer from "./lobbyReducer";
import chatReducer from "./chatReducer";

// Actual name in the state binded the corrosponding reducer
export default combineReducers({
  auth: authReducer,
  notify: notifyReducer,
  friend: friendsReducer,
  game: gameReducer,
  chat: chatReducer,
  lobby: lobbyReducer
});
