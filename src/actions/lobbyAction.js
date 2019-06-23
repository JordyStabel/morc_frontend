import { GET_LOBBIES } from "./types";
import axios from "axios";
import querystring from "querystring";

let ip;

localStorage.getItem("morc_ip")
  ? (ip = localStorage.getItem("morc_ip"))
  : (ip = "localhost");

export const getLobbies = () => async dispatch => {
  const response = await axios.get(`http://${ip}:8095/lobby/all_games`);
  dispatch({
    type: GET_LOBBIES,
    payload: response.data
  });
};

export const addLobby = newLobby => async dispatch => {
  let message = {
    token: newLobby.token,
    gameName: newLobby.newLobbyName
  };

  await axios.post(
    `http://${ip}:8095/lobby/create_game`,
    querystring.stringify(message),
    { "Content-Type": "application/x-www-form-urlencoded" }
  );
  dispatch(getLobbies());
  // Can't dispatch because backend doesn't send back the game
  // dispatch({
  //   type: ADD_LOBBY,
  //   payload: response.data
  // });
};
