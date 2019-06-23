import React, { Component } from "react";
import styled from "styled-components";
import Chat from "../chat/Chat";
import Pile from "../game/Pile";
import Table from "../game/Table";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setTopCard,
  getHand,
  setHand,
  updateDeck,
  setDecks,
  setStarted,
  setPlayers,
  playCard,
  skipTurn,
  resetGameState
} from "../../actions/gameActions";
import { notifyUser } from "../../actions/notifyActions";
import Loading from "../layout/loading";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: green;
  overflow-x: auto;
`;

class Board extends Component {
  handleStartGame = event => {
    event.preventDefault();
    //this.props.setActiveGame(id);

    let message = {
      type: "START_GAME",
      token: this.props.auth.token,
      content: ""
    };

    if (this.props.websocket.readyState !== this.props.websocket.OPEN) {
      return;
    }

    this.props.websocket.send(JSON.stringify(message));
    console.log(JSON.stringify(message));

    // this.props.websocket.onmessage = event => {
    //   let message = JSON.parse(event.data);
    //   let content = JSON.parse(message.content);

    //   if (message.type === "STATE_UPDATE") {
    //     this.props.setPlayers(content.players);
    //   }
    // };
  };

  componentDidMount() {
    // Prevent the game from trying to load and crash because there is nothing to load
    setTimeout(() => this.check(), 2500);
  }

  check = () => {
    let urlID = window.location.href.split("/")[4];
    console.log(window.location.href);
    console.log(urlID);

    if (
      this.props.game.players == null ||
      this.props.game.gameId !== parseInt(urlID)
    ) {
      this.props.history.push("/lobby");
      this.props.notifyUser(
        "Failed to join game, please try again. Make sure to enter a game via 'lobby'.",
        "danger",
        "Error"
      );
      this.props.resetGameState();
      return;
    }
  };

  onDragStart = start => {
    console.log(this.props.game);
    // Get the index of the 'starting' Deck (the Deck a draggable came from)

    console.log(start);
    // const homeIndex = this.props.game.deckOrder.indexOf(
    //   start.source.droppableId
    // );
    // this.setState({
    //   homeIndex
    // });
    // document.body.style.color = "orange";
    // document.body.style.transition = "background-color 0.2s ease";
  };

  onDragUpdate = update => {
    // const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(this.props.game.cards).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  onDragEnd = result => {
    // Reset the homeIndex again
    // this.setState({
    //   homeIndex: null
    // });

    console.log("Drag ended");
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId } = result;

    console.log(draggableId);
    // The card that's being dragged
    const card = this.props.game.cards.find(c => {
      return c.id === draggableId;
    });
    console.log(card);

    // No valid drop location
    if (!destination) {
      return;
    }

    // Item dropped on the same location as before
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If cards is being dragged, but in the same deck
    const startDeck = this.props.game.decks.find(deck => {
      return deck.id === source.droppableId;
    });
    const finishDeck = this.props.game.decks.find(deck => {
      return deck.id === destination.droppableId;
    });
    const newCards = startDeck.cards;

    if (startDeck === finishDeck) {
      // Remove the selected item form the array
      console.log(source.index);
      newCards.splice(source.index, 1);

      console.log(destination.index);
      console.log(card);
      // Insert the draggableId at the destination index
      newCards.splice(destination.index, 0, card);

      // Create a 'clone' of the Deck but with updated taskIds array
      const updatedDeck = {
        ...startDeck,
        cards: newCards
      };

      // Update the deck
      console.log(updatedDeck);
      this.props.updateDeck(updatedDeck);
      return;
    }

    // Moving object from one Deck to another
    const startCards = startDeck.cards;
    startCards.splice(source.index, 1);
    const newStartDeck = {
      ...startDeck,
      cards: startCards
    };

    const finishCards = finishDeck.cards;
    finishCards.splice(destination.index, 0, card);
    const newFinishDeck = {
      ...finishDeck,
      cards: finishCards
    };

    if (destination.droppableId === "play-1") {
      //this.props.setTopCard(card);
      console.log("%c PLAYED CARD", "color: orange; font-weight: bold");
      console.log(card);
      if (card.id === 404) {
        this.props.skipTurn(card, this.props.game.playerOnTurn);
      } else {
        this.props.playCard(card, this.props.game.playerOnTurn);
      }
    }

    this.props.setDecks([newStartDeck, newFinishDeck]);
  };

  deleteCard = id => {
    this.setState(preState => {
      const cards = preState.cards;

      console.log("Delete");

      const index = cards.findIndex(card => card.id === id);

      cards.splice(index, 1);
      return { cards };
    });
  };

  render() {
    const { decks, deckOrder, gameId, started, playerOnTurn } = this.props.game;

    if (decks && gameId) {
      return (
        <DragDropContext
          onDragStart={this.onDragStart}
          onDragUpdate={this.onDragUpdate}
          onDragEnd={this.onDragEnd}
        >
          <div
            style={{
              display: "flex",
              height: "calc(100vh - 56px)"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
                height: "100%"
              }}
            >
              <div style={{ height: "70%" }}>
                {/* Create a 'Start game' button only when a game hasn't started yet */}
                {this.props.game.started ? null : (
                  <form
                    onSubmit={this.handleStartGame}
                    style={{ width: "50%", margin: "auto" }}
                  >
                    <button className="btn btn-success btn-block">
                      Start game
                    </button>
                  </form>
                )}
                <Table />
              </div>
              <div style={{ height: "30%" }}>
                <Droppable
                  droppableId="all-columns"
                  direction="horizontal"
                  type="column"
                >
                  {provided => (
                    <Container
                      {...provided.droppabeProps}
                      ref={provided.innerRef}
                    >
                      {deckOrder.map((id, index) => {
                        const deck = decks.find(deck => {
                          return deck.id === id;
                        });

                        // Only allow item to get dropped into columns with a higher index (columns to the right)
                        //const isDropDisabled = index < this.state.homeIndex;
                        return (
                          <Pile
                            key={deck.id}
                            deck={deck}
                            cards={deck.cards}
                            index={index}
                            isDropDisabled={false} // Change depending on game rules
                            started={started}
                            myTurn={
                              started &&
                              playerOnTurn !== null &&
                              playerOnTurn.name ===
                                this.props.auth.user.username
                            }
                          />
                        );
                      })}
                      {provided.placeholder}
                    </Container>
                  )}
                </Droppable>
              </div>
            </div>
            <div
              style={{
                width: "20%",
                height: "100%"
              }}
            >
              <Chat />
            </div>
          </div>
        </DragDropContext>
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

Board.propTypes = {
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  websocket: PropTypes.object.isRequired,
  setTopCard: PropTypes.func.isRequired,
  updateDeck: PropTypes.func.isRequired,
  setDecks: PropTypes.func.isRequired,
  getHand: PropTypes.func.isRequired,
  setHand: PropTypes.func.isRequired,
  playCard: PropTypes.func.isRequired,
  skipTurn: PropTypes.func.isRequired,
  setStarted: PropTypes.func.isRequired,
  setPlayers: PropTypes.func.isRequired,
  notifyUser: PropTypes.func.isRequired,
  resetGameState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game,
  auth: state.auth,
  websocket: state.game.websocket,
  notify: state.notify
});

export default connect(
  mapStateToProps,
  {
    setTopCard,
    updateDeck,
    setDecks,
    getHand,
    setHand,
    setStarted,
    setPlayers,
    notifyUser,
    playCard,
    skipTurn,
    resetGameState
  }
)(Board);
