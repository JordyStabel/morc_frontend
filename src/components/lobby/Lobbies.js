import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLobbies } from "../../actions/lobbyAction";
import {
  setActiveGame,
  setPlayers,
  setWebsocket,
  setDecks,
  setStarted,
  getStarted,
  setTopCard,
  setPlayerOnTurn
} from "../../actions/gameActions";
import { notifyUser } from "../../actions/notifyActions";
import Loading from "../layout/loading";

class Lobbies extends Component {
  constructor(props) {
    super(props);

    let ip;

    localStorage.getItem("morc_ip")
      ? (ip = localStorage.getItem("morc_ip"))
      : (ip = "localhost");

    const webSocket = new WebSocket(`ws://${ip}:8089/communicator/`);

    webSocket.onopen = () => {
      console.log("Connection opened");
    };

    webSocket.onmessage = event => {
      let message = JSON.parse(event.data);
      let content = JSON.parse(message.content);

      console.log(message);

      if (message.content === `"Card can not be played"`) {
        console.log("%c CARD INVALID", "color: orange; font-weight: bold");
        this.props.notifyUser(
          "Can't play that card, please play another one.",
          "warning",
          "Oops, invalid card",
          2500
        );
        return;
      }

      if (message.type === "GAME_WON") {
        console.log("%c GAME WON", "color: green; font-weight: bold");
        console.log(`Game won by: ${content.name}`);

        this.props.notifyUser(
          `The game is over. ${
            content.name
          } won the game. You will be redirected in a few seconds.`,
          "success",
          `Game won by: ${content.name}`,
          10000
        );

        setTimeout(() => window.history.back(), 3000);
      }

      if (message.type === "STATE_UPDATE") {
        this.props.setPlayers(content.players);

        let cardsInHand;

        console.log(this.props.game.players);
        console.log(this.props.auth.user.username);
        cardsInHand = content.players.filter(
          player => player.name === this.props.auth.user.username
        );
        console.log(cardsInHand);

        let cards = [];

        // eslint-disable-next-line
        cardsInHand[0].cards.map((card, index) => {
          console.log(card);
          let newCard = {
            value: card.cardValue,
            suit: card.cardType,
            id: `${index}`,
            img: `/images/${card.cardValue.toUpperCase()}_${card.cardType}.svg`
          };
          cards.push(newCard);
        });

        // 'Empty' card
        let empty = {
          value: null,
          suit: null,
          id: 404,
          img: `/images/back.svg`
        };

        cards.push(empty);
        console.log(cards);

        let decks = [
          {
            id: "hand-1",
            title: "Hand",
            cards: cards
          },
          {
            id: "play-1",
            title: "Play",
            cards: []
          }
        ];

        this.props.setDecks(decks);
      }

      if (content.playerOnTurn) {
        // Set game as active & remove 'start game' button
        if (!this.props.game.started) {
          this.props.setStarted(true);
        }

        let cardOnTable = content.cardOnTable;

        let topCard = {
          value: cardOnTable.cardValue,
          suit: cardOnTable.cardType,
          img: `/images/${cardOnTable.cardValue.toUpperCase()}_${
            cardOnTable.cardType
          }.svg`,
          id: 1337
        };

        this.props.setTopCard(topCard);
        this.props.setPlayerOnTurn(content.playerOnTurn);
      }
    };

    webSocket.onclose = () => {
      console.log("Connection closed");
    };

    this.props.setWebsocket(webSocket);
  }

  onJoinClick = (id, gameName) => {
    this.props.setActiveGame(id);

    let message = {
      type: "JOIN_GAME",
      token: this.props.auth.token,
      content: gameName
    };

    if (this.props.websocket.readyState !== this.props.websocket.OPEN) {
      return;
    }

    this.props.websocket.send(JSON.stringify(message));
    console.log(JSON.stringify(message));
  };

  componentDidMount() {
    this.props.getLobbies();
  }

  componentWillUnmount() {
    console.log("Lobby dismountend");
    //this.state.ws.close();
  }

  render() {
    const { lobbies } = this.props;

    if (lobbies.length !== 0) {
      return (
        <Fragment>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fas fa-list" /> Lobbies
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Total Lobbies:{" "}
                <span className="text-primary">{lobbies.length}</span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Game</th>
                <th>Players</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {lobbies.map((lobby, index) => (
                <tr key={index}>
                  <td>{lobby.gameName}</td>
                  <td>{Math.floor(Math.random() * 11)}</td>
                  {/* lobby.accounts.length */}
                  <td>
                    <Link
                      // Game needs to be set and then redirect to game
                      onClick={this.onJoinClick.bind(
                        this,
                        lobby.id,
                        lobby.gameName
                      )}
                      to={`/game/${lobby.id}/${lobby.gameName}`}
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-sign-in-alt" /> Join Game
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      );
    } else {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loading />
        </div>
      );
    }
  }
}

Lobbies.propTypes = {
  lobbies: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
  websocket: PropTypes.object,
  getLobbies: PropTypes.func.isRequired,
  setActiveGame: PropTypes.func.isRequired,
  setPlayers: PropTypes.func.isRequired,
  setWebsocket: PropTypes.func.isRequired,
  setStarted: PropTypes.func.isRequired,
  getStarted: PropTypes.func.isRequired,
  setTopCard: PropTypes.func.isRequired,
  setPlayerOnTurn: PropTypes.func.isRequired,
  notifyUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lobbies: state.lobby.lobbies,
  auth: state.auth,
  game: state.game,
  websocket: state.game.websocket,
  notify: state.notify
});

export default connect(
  mapStateToProps,
  {
    getLobbies,
    setActiveGame,
    setPlayers,
    setWebsocket,
    setDecks,
    setStarted,
    getStarted,
    setTopCard,
    setPlayerOnTurn,
    notifyUser
  }
)(Lobbies);
