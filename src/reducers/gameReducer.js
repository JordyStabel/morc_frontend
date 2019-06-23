import uuid from "uuid";
import {
  SET_TOPCARD,
  GET_TOPCARD,
  UPDATE_DECK,
  SET_DECKS,
  GET_HAND,
  SET_HAND,
  GET_GAME_STATE,
  SET_ACTIVE_GAME,
  SET_PLAYERS,
  SET_STARTED,
  SET_WEBSOCKET,
  PLAY_CARD,
  SET_PLAYER_ON_TURN,
  GET_STARTED,
  RESET_GAME_STATE,
  SKIP_TURN,
  GAME_WON
} from "../actions/types";

const initialState = {
  gameId: null,
  players: null,
  playerOnTurn: null,
  topcard: {
    value: null,
    suit: null,
    id: uuid.v4(),
    img: `/images/back.svg`
  },
  cards: null,
  decks: null,
  deckOrder: ["hand-1", "play-1"],
  started: false,
  websocket: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  let message;
  let player;
  let playedCard;
  let WSPlayerAction;

  switch (type) {
    case GET_TOPCARD:
      return {
        ...state
      };
    case SET_TOPCARD:
      return {
        ...state,
        topcard: payload
      };
    case UPDATE_DECK:
      const newDecks = state.decks.filter(deck => deck.id !== payload.id);
      newDecks.push(payload);
      console.log(newDecks);
      return {
        ...state,
        decks: newDecks
      };
    case SET_DECKS:
      console.log(payload);
      return {
        ...state,
        cards: payload[0].cards,
        decks: payload
      };
    case SET_ACTIVE_GAME:
      return {
        ...state,
        gameId: payload
      };
    case SET_STARTED:
      return {
        ...state,
        started: payload
      };
    case SET_WEBSOCKET:
      return {
        ...state,
        websocket: payload
      };
    case SKIP_TURN:
      player = payload.player;

      playedCard = null;

      WSPlayerAction = {
        playedCard,
        player
      };

      message = {
        type: "PLAYER_ACTION",
        token: localStorage.getItem("token"),
        content: JSON.stringify(WSPlayerAction)
      };
      state.websocket.send(JSON.stringify(message));
      return {
        ...state
      };
    case PLAY_CARD:
      playedCard = {
        cardType: payload.card.suit,
        cardValue: payload.card.value
      };

      player = payload.player;

      WSPlayerAction = {
        playedCard,
        player
      };

      message = {
        type: "PLAYER_ACTION",
        token: localStorage.getItem("token"),
        content: JSON.stringify(WSPlayerAction)
      };

      console.log(JSON.stringify(message));
      state.websocket.send(JSON.stringify(message));
      return {
        ...state
      };
    case SET_PLAYERS:
      return {
        ...state,
        players: payload
      };
    case SET_PLAYER_ON_TURN:
      return {
        ...state,
        playerOnTurn: payload
      };
    case SET_HAND:
      const newDeckzzz = state.decks.filter(deck => deck.id !== payload.id);
      newDeckzzz.push(payload);
      return {
        ...state,
        decks: newDeckzzz
      };
    case GET_GAME_STATE:
    case GET_STARTED:
    case GET_HAND:
      return {
        ...state
      };
    case GAME_WON:
    case RESET_GAME_STATE:
      return {
        gameId: null,
        players: null,
        playerOnTurn: null,
        topcard: {
          value: null,
          suit: null,
          id: uuid.v4(),
          img: `/images/back.svg`
        },
        cards: null,
        decks: null,
        deckOrder: ["hand-1", "play-1"],
        started: false,
        websocket: null
      };
    default:
      return state;
  }
}
