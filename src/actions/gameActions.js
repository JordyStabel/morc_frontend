import {
  GET_TOPCARD,
  SET_TOPCARD,
  UPDATE_DECK,
  SET_DECKS,
  GET_HAND,
  SET_HAND,
  GET_GAME_STATE,
  SET_ACTIVE_GAME,
  SET_PLAYERS,
  SET_STARTED,
  GET_STARTED,
  SET_WEBSOCKET,
  PLAY_CARD,
  SET_PLAYER_ON_TURN,
  RESET_GAME_STATE,
  SKIP_TURN,
  GAME_WON
} from "./types";

export const setWebsocket = websocket => {
  return {
    type: SET_WEBSOCKET,
    payload: websocket
  };
};

export const playCard = (card, player) => {
  return {
    type: PLAY_CARD,
    payload: {
      card,
      player
    }
  };
};

export const gameWon = () => {
  return {
    type: GAME_WON
  };
};

export const skipTurn = (card, player) => {
  return {
    type: SKIP_TURN,
    payload: {
      card,
      player
    }
  };
};

export const resetGameState = () => {
  return {
    type: RESET_GAME_STATE
  };
};

export const setPlayerOnTurn = player => {
  return {
    type: SET_PLAYER_ON_TURN,
    payload: player
  };
};

export const getTopCard = () => {
  return {
    type: GET_TOPCARD
  };
};

export const setTopCard = card => {
  return {
    type: SET_TOPCARD,
    payload: card
  };
};

export const setStarted = boolean => {
  return {
    type: SET_STARTED,
    payload: boolean
  };
};

export const getStarted = () => {
  return {
    type: GET_STARTED
  };
};

export const updateDeck = deck => {
  return {
    type: UPDATE_DECK,
    payload: deck
  };
};

export const setDecks = decks => {
  return {
    type: SET_DECKS,
    payload: decks
  };
};

export const getHand = () => {
  return {
    type: GET_HAND
  };
};

export const setHand = () => {
  return {
    type: SET_HAND
  };
};

export const getGameState = () => {
  return {
    type: GET_GAME_STATE
  };
};

export const setActiveGame = gameId => {
  return {
    type: SET_ACTIVE_GAME,
    payload: gameId
  };
};

export const setPlayers = players => {
  return {
    type: SET_PLAYERS,
    payload: players
  };
};
